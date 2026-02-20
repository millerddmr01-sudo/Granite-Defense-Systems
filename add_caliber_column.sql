-- add_caliber_column.sql
ALTER TABLE products ADD COLUMN IF NOT EXISTS caliber text;
