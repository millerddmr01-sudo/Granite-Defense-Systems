-- seed_data_safe.sql
-- Safely inserts seed data without duplicates.

-- 1. Insert Products (Check by title since slug might be null in original seed)
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
SELECT 'GDS Precision Upper Receiver', 'Complete upper receiver with 16" barrel and MLOK handguard.', 599.99, 'upper', 'active', 'Granite Defense', 'GDS-15', 5, '{
  "https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'GDS Precision Upper Receiver');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
SELECT 'Magpul PMAG 30 Gen M3', '30-round polymer magazine for AR15/M4 platforms.', 14.95, 'accessory', 'active', 'Magpul', 'PMAG M3', 100, '{
  "https://images.unsplash.com/photo-1583096164478-435e95589c30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Magpul PMAG 30 Gen M3');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
SELECT 'Vortex Strike Eagle 1-6x24', 'Low power variable optic (LPVO) optimized for speed and versatility.', 299.00, 'optic', 'active', 'Vortex', 'Strike Eagle', 3, '{
  "https://images.unsplash.com/photo-1625841445788-518833956c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Vortex Strike Eagle 1-6x24');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
SELECT 'GDS Billet Lower Receiver (Stripped)', 'Machined from 7075-T6 billet aluminum.', 149.99, 'lower', 'sold', 'Granite Defense', 'GDS-15 Billet', 0, '{
  "https://images.unsplash.com/photo-1599368545802-985117904e21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'GDS Billet Lower Receiver (Stripped)');

-- Insert Knife with Specs
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, specs)
SELECT 'GDS Tactical Fixed Blade', 'Durable S35VN steel fixed blade with G10 handles.', 189.99, 'knife', 'active', 'Granite Defense', 'TFB-1', 15, '{
  "https://images.unsplash.com/photo-1589139265292-6f296d9d1502?auto=format&fit=crop&q=80&w=1000"
}', '{"blade_length": "4.5 inches", "steel": "S35VN", "handle_material": "G10", "sheath": "Kydex"}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'GDS Tactical Fixed Blade');

-- 2. Insert Promo Codes (Check by code)
INSERT INTO promo_codes (code, discount_type, discount_value, is_active, usage_limit)
VALUES 
('WELCOME10', 'percent', 10, true, null)
ON CONFLICT (code) DO NOTHING;

INSERT INTO promo_codes (code, discount_type, discount_value, is_active, usage_limit)
VALUES 
('FREESHIP', 'fixed', 0, true, 100)
ON CONFLICT (code) DO NOTHING;

INSERT INTO promo_codes (code, discount_type, discount_value, is_active, usage_limit)
VALUES 
('GDS2024', 'fixed', 25, true, 50)
ON CONFLICT (code) DO NOTHING;
