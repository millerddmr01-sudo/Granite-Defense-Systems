-- Rename sku column to upc
ALTER TABLE products RENAME COLUMN sku TO upc;

-- Add mpn column
ALTER TABLE products ADD COLUMN mpn text;

-- Add comment to explain the change (optional but good practice)
COMMENT ON COLUMN products.upc IS 'Universal Product Code';
COMMENT ON COLUMN products.mpn IS 'Manufacturer Part Number';
