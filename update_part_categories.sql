-- Rename 'part' to 'new_part' within the enum (Postgres approach)
-- Note: 'ALTER TYPE ... RENAME VALUE' is available in Postgres 10+
ALTER TYPE products_category RENAME VALUE 'part' TO 'new_part';

-- Add 'used_part' to the enum
ALTER TYPE products_category ADD VALUE 'used_part';

-- Update any existing rows that might have been 'parts-new' or 'parts-used' if they were stored as text (unlikely given it's an enum, but cleaning up just in case)
-- Since we renamed 'part' to 'new_part', all existing 'part' items are now 'new_part'.
-- If we had any logic that relied on 'part', it now needs to rely on 'new_part'.
