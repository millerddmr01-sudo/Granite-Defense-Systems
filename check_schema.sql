-- check_schema.sql
-- Run this in your Supabase SQL Editor to see current DB state

-- 1. Check if 'specs' column exists in 'products'
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'specs';

-- 2. Check the values in 'product_category' enum
SELECT enum_range(NULL::product_category);
