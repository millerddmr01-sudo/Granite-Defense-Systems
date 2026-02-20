-- Add specs column to products table for storing category-specific attributes
alter table products add column if not exists specs jsonb default '{}'::jsonb;

-- Example usage:
-- update products set specs = '{"blade_length": "3.5 inches", "steel": "S35VN"}' where category = 'knife';
