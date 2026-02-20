-- apply_all_updates.sql
-- Safely applies all pending schema changes. Run this in Supabase SQL Editor.
-- Updated to include missing ENUM types (event_type, registration_status).

--------------------------------------------------------------------------------
-- 1. ENUMS (Create if not exist first)
--------------------------------------------------------------------------------
DO $$ 
BEGIN 
    -- event_type
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
        CREATE TYPE event_type AS ENUM ('training', 'build_day', 'workshop');
    END IF;
    
    -- registration_status
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'registration_status') THEN
        CREATE TYPE registration_status AS ENUM ('pending', 'confirmed', 'waitlist', 'cancelled');
    END IF;

    -- discount_type
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'discount_type') THEN
        CREATE TYPE discount_type AS ENUM ('percent', 'fixed');
    END IF;
END $$;

--------------------------------------------------------------------------------
-- 2. UPDATE PRODUCTS: Add 'specs' column
--------------------------------------------------------------------------------
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'specs') THEN
        ALTER TABLE products ADD COLUMN specs JSONB DEFAULT '{}'::jsonb;
    END IF;
END $$;

--------------------------------------------------------------------------------
-- 3. SCHEMA ADDITIONS: Events, Sessions, Registrations, Services
--------------------------------------------------------------------------------

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type event_type not null,
  price decimal(10,2),
  duration_hours decimal(4,1),
  image_url text,
  is_recurring boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sessions
CREATE TABLE IF NOT EXISTS event_sessions (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events on delete cascade not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  location text default 'Riverton, UT',
  capacity integer default 10,
  instructor text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Registrations
CREATE TABLE IF NOT EXISTS registrations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  session_id uuid references event_sessions,
  status registration_status default 'pending',
  payment_intent_id text,
  amount_paid decimal(10,2),
  guest_info jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid default uuid_generate_v4() primary key,
  category text not null,
  name text not null,
  description text,
  price decimal(10,2),
  is_hourly boolean default false,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

--------------------------------------------------------------------------------
-- 4. PROMO CODES
--------------------------------------------------------------------------------

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

--------------------------------------------------------------------------------
-- 5. RLS POLICIES (Idempotent Apply)
--------------------------------------------------------------------------------

-- Helper macro not available, so we just run enable RLS (it's idempotent)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them safely (or use strictly different names, 
-- but dropping if exists is cleaner for updates)

-- Events
DROP POLICY IF EXISTS "Public events are viewable by everyone." ON events;
CREATE POLICY "Public events are viewable by everyone." ON events FOR SELECT USING ( true );

-- Sessions
DROP POLICY IF EXISTS "Public sessions are viewable by everyone." ON event_sessions;
CREATE POLICY "Public sessions are viewable by everyone." ON event_sessions FOR SELECT USING ( true );

-- Registrations
DROP POLICY IF EXISTS "Users can view own registrations." ON registrations;
CREATE POLICY "Users can view own registrations." ON registrations FOR SELECT USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can register." ON registrations;
CREATE POLICY "Users can register." ON registrations FOR INSERT WITH CHECK ( auth.uid() = user_id );

-- Services
DROP POLICY IF EXISTS "Public services are viewable by everyone." ON services;
CREATE POLICY "Public services are viewable by everyone." ON services FOR SELECT USING ( active = true );

-- Promo Codes
DROP POLICY IF EXISTS "Admins can manage promo codes." ON promo_codes;
CREATE POLICY "Admins can manage promo codes." ON promo_codes FOR ALL USING ( 
  auth.jwt() ->> 'email' = 'admin@granitedefense.com'
  OR 
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- Admin write policies for Events
DROP POLICY IF EXISTS "Admins can manage events." ON events;
CREATE POLICY "Admins can manage events." ON events FOR ALL USING (
  auth.jwt() ->> 'email' = 'admin@granitedefense.com' OR exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);
