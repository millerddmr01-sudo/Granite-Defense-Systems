-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS (Inventory)
create type product_status as enum ('active', 'sold', 'draft', 'hidden');
create type product_category as enum ('firearm', 'upper', 'lower', 'optic', 'accessory', 'gear');

create table products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price decimal(10,2) not null,
  compare_at_price decimal(10,2), -- For sales
  category product_category not null default 'accessory',
  status product_status not null default 'draft',
  condition text default 'New', -- New, Used, Blems
  images text[] default '{}', -- Array of image URLs
  manufacturer text,
  model text,
  sku text,
  stock_quantity integer default 1,
  
  -- SEO / Metadata
  slug text unique, 
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS
create type order_status as enum ('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled');

create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users, -- can be null for guest checkout
  guest_email text, -- captured if guest
  
  status order_status default 'pending',
  total decimal(10,2) not null,
  subtotal decimal(10,2) not null,
  tax decimal(10,2) default 0,
  shipping_cost decimal(10,2) default 0,
  
  shipping_address jsonb, -- Store full address snapshot
  billing_address jsonb,
  
  stripe_payment_intent_id text,
  tracking_number text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ORDER ITEMS
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders on delete cascade not null,
  product_id uuid references products, -- Keep reference even if product deleted? Maybe set null.
  
  quantity integer default 1,
  price_at_purchase decimal(10,2) not null, -- Snapshot price
  title_snapshot text, -- Snapshot title
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- RLS POLICIES (Row Level Security)

-- PROFILES
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- PRODUCTS
alter table products enable row level security;
create policy "Active products are viewable by everyone." on products for select using ( status = 'active' OR status = 'sold' );
-- Only admins can insert/update/delete (We'll handle admin checks via App metadata or distinct role later, for now allow if service role or specific email)
create policy "Admins can manage products." on products for all using ( 
  auth.jwt() ->> 'email' = 'admin@granitedefense.com' -- REPLACE WITH YOUR ADMIN EMAIL LATER
  OR 
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- ORDERS
alter table orders enable row level security;
create policy "Users can view own orders." on orders for select using ( auth.uid() = user_id );
create policy "Users can insert own orders." on orders for insert with check ( auth.uid() = user_id ); 
-- (Guests? We might need service role for guest checkout or public insert if not authenticated. usually safer to use service role in API route)

-- TRIGGER: Handle New User -> Profile
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

