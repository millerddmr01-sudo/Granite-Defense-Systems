
-- 5. EVENTS / CLASSES (Training & Build Days)
create type event_type as enum ('training', 'build_day', 'workshop');

create table events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type event_type not null,
  price decimal(10,2),
  duration_hours decimal(4,1),
  image_url text,
  
  -- If standardized class (like Basic Pistol)
  is_recurring boolean default false,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. EVENT SESSIONS (Specific Dates)
create table event_sessions (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events on delete cascade not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  location text default 'Riverton, UT',
  capacity integer default 10,
  instructor text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. REGISTRATIONS
create type registration_status as enum ('pending', 'confirmed', 'waitlist', 'cancelled');

create table registrations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  session_id uuid references event_sessions,
  
  status registration_status default 'pending',
  payment_intent_id text,
  amount_paid decimal(10,2),
  
  guest_info jsonb, -- { name, email, phone } if guest checkout
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. SERVICES (Gunsmithing)
create table services (
  id uuid default uuid_generate_v4() primary key,
  category text not null, -- e.g., 'AR-15', 'Pistol', 'General'
  name text not null,
  description text,
  price decimal(10,2),
  is_hourly boolean default false,
  
  active boolean default true,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- EVENTS (Public Read, Admin Write)
alter table events enable row level security;
create policy "Public events are viewable by everyone." on events for select using ( true );
-- Add admin write policies similar to products

-- SESSIONS (Public Read)
alter table event_sessions enable row level security;
create policy "Public sessions are viewable by everyone." on event_sessions for select using ( true );

-- REGISTRATIONS (User Read Own)
alter table registrations enable row level security;
create policy "Users can view own registrations." on registrations for select using ( auth.uid() = user_id );
create policy "Users can register." on registrations for insert with check ( auth.uid() = user_id );

-- SERVICES (Public Read)
alter table services enable row level security;
create policy "Public services are viewable by everyone." on services for select using ( active = true );
