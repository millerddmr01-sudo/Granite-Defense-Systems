-- seed_inventory_preview.sql
-- Inserts 1 Rifle, 1 Pistol, and 1 NFA item for the inventory preview page.
-- Uses local assets for images to ensure reliability.

-- 1. Insert Rifle
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
SELECT 'GDS Precision Rifle', 'Custom built precision rifle with advanced chassis system and match grade barrel.', 2499.99, 'rifle', 'active', 'Granite Defense', 'Precision-1', 3, '{
  "/assets/inventory/rifle.jpg"
}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'GDS Precision Rifle');

-- 2. Insert Pistol
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
SELECT 'Glock 43 Custom', 'Customized Glock 43 with stippled grip, slide cuts, and upgraded sights.', 599.99, 'pistol', 'active', 'Glock', '43', 5, '{
  "/assets/inventory/pistol.jpg"
}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Glock 43 Custom');

-- 3. Insert NFA Item (Suppressor)
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
SELECT 'SilencerCo Sparrow 22', 'The market-leading .22 LR suppressor. Easy to clean and incredibly quiet.', 399.00, 'nfa', 'active', 'SilencerCo', 'Sparrow 22', 10, '{
  "/assets/inventory/nfa.jpg"
}'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SilencerCo Sparrow 22');
