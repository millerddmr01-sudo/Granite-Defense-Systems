-- fix_inventory_images.sql
-- 1. Remove items created by the OLD seed script which might have broken Unsplash URLs
DELETE FROM products WHERE title IN (
    'GDS-15 Recon Rifle',
    'GDS-9 Combat Pistol',
    'GDS Socom 556 Suppressor'
);

-- 2. Update existing items from the NEW seed script to ensure they have the correct local path AND caliber
-- (In case they were inserted with a different path previously)
UPDATE products 
SET images = ARRAY['/assets/inventory/rifle.jpg'],
    caliber = '5.56 NATO'
WHERE title = 'GDS Precision Rifle';

UPDATE products 
SET images = ARRAY['/assets/inventory/pistol.jpg'],
    caliber = '9mm'
WHERE title = 'Glock 43 Custom';

UPDATE products 
SET images = ARRAY['/assets/inventory/nfa.jpg'],
    caliber = '.22 LR'
WHERE title = 'SilencerCo Sparrow 22';


-- 3. Re-insert items if they don't exist (Just to be safe, same as seed_inventory_preview.sql)
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 'GDS Precision Rifle', 'Custom built precision rifle with advanced chassis system and match grade barrel.', 2499.99, 'rifle', 'active', 'Granite Defense', 'Precision-1', 3, ARRAY['/assets/inventory/rifle.jpg'], '5.56 NATO'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'GDS Precision Rifle');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 'Glock 43 Custom', 'Customized Glock 43 with stippled grip, slide cuts, and upgraded sights.', 599.99, 'pistol', 'active', 'Glock', '43', 5, ARRAY['/assets/inventory/pistol.jpg'], '9mm'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Glock 43 Custom');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 'SilencerCo Sparrow 22', 'The market-leading .22 LR suppressor. Easy to clean and incredibly quiet.', 399.00, 'nfa', 'active', 'SilencerCo', 'Sparrow 22', 10, ARRAY['/assets/inventory/nfa.jpg'], '.22 LR'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SilencerCo Sparrow 22');
