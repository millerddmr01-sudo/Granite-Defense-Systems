-- Create promo_codes table
create type discount_type as enum ('percent', 'fixed');

create table promo_codes (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  discount_type discount_type not null,
  discount_value decimal(10,2) not null,
  is_active boolean default true,
  usage_limit integer, -- NULL means unlimited
  usage_count integer default 0,
  expiration_date timestamp with time zone,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for promo_codes
alter table promo_codes enable row level security;

-- Admins can do everything
create policy "Admins can manage promo codes." on promo_codes for all using ( 
  auth.jwt() ->> 'email' = 'admin@granitedefense.com'
  OR 
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- Public/Service Role can read (for verification)
-- Note: 'verify-promo' API usually uses service role, but we can allow public read of specific fields if needed.
-- For now, we restrict to admins and service role (implicit bypass) or specific API usage.
-- Let's allow public read for now to simplify client-side validation if we ever do it, 
-- but strictly speaking backend verification is better. 
-- For safety, let's keep it restricted to admins. Service role in API will bypass this.
