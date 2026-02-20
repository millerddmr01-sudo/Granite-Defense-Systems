-- create_promo_codes.sql
-- Run this in Supabase SQL Editor.

-- 1. Create discount_type enum if missing
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'discount_type') THEN
        CREATE TYPE discount_type AS ENUM ('percent', 'fixed');
    END IF;
END $$;

-- 2. Create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  discount_type discount_type not null,
  discount_value decimal(10,2) not null,
  is_active boolean default true,
  usage_limit integer,
  usage_count integer default 0,
  expiration_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies (Drop first to avoid conflicts)
DROP POLICY IF EXISTS "Admins can manage promo codes." ON promo_codes;

CREATE POLICY "Admins can manage promo codes." ON promo_codes FOR ALL USING ( 
  auth.jwt() ->> 'email' = 'admin@granitedefense.com'
  OR 
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);
