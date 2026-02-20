-- check_db_status.sql
-- Run this in Supabase SQL Editor to verify what's already applied.

-- A) Check 'products' table for 'specs' column
SELECT 'products.specs' as check_item, exists (
  SELECT 1 FROM information_schema.columns 
  WHERE table_name = 'products' AND column_name = 'specs'
) as exists_status;

-- B) Check if 'events' table exists (from schema_additions.sql)
SELECT 'events table' as check_item, exists (
  SELECT 1 FROM information_schema.tables 
  WHERE table_name = 'events'
) as exists_status;

-- C) Check if 'promo_codes' table exists (from promo_codes.sql)
SELECT 'promo_codes table' as check_item, exists (
  SELECT 1 FROM information_schema.tables 
  WHERE table_name = 'promo_codes'
) as exists_status;

-- D) Check if 'services' table exists (from schema_additions.sql)
SELECT 'services table' as check_item, exists (
  SELECT 1 FROM information_schema.tables 
  WHERE table_name = 'services'
) as exists_status;

-- E) Check if 'product_category' enum has 'nfa' (Already confirmed, but good not to forget)
-- SELECT enum_range(NULL::product_category);
