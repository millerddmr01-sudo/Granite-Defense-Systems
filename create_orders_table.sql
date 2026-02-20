-- Create orders table
create table if not exists public.orders (
  id text primary key default 'GDS-' || floor(random() * 1000000)::text,
  user_id uuid references auth.users(id),
  items jsonb not null,
  total_amount numeric not null,
  status text default 'pending',
  customer_details jsonb not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- Policies

-- Admins can do everything
create policy "Admins can do everything on orders"
  on public.orders
  for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

-- Users can view their own orders
create policy "Users can view their own orders"
  on public.orders
  for select
  to authenticated
  using ( auth.uid() = user_id );

-- Anyone can insert (public checkout)
create policy "Anyone can insert orders"
  on public.orders
  for insert
  with check ( true );
