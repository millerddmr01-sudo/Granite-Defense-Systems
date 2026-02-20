-- Rename old values if needed or just add new ones.
-- Since Supabase/Postgres Enums are strict, we'll add the new values.
-- Note: 'firearm' was the old generic. We will likely migrate those to specific types later.

ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'rifle';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'pistol';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'shotgun';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'silencer';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'part'; 
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'knife';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'case';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'merch';

-- 'optic' and 'accessory' already exist.
