-- Auto-generated seed file from inventory.csv
-- Deletes existing items with matching titles to avoid duplicates (optional, or use ON CONFLICT)


INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Kriss USA Vector CRB G2', 
    'KRISS Vector CRB G2: Civilian carbine version of the KRISS Vector with the brand’s distinctive delayed-blowback-inspired recoil system and a modern, modular pistol-caliber carbine layout.  EO Tech', 
    2452.32, 
    'rifle', 
    'active', 
    'Kriss USA', 
    'Vector CRB G2', 
    5, 
    ARRAY['/assets/inventory/Kriss Vector.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Kriss USA Vector CRB G2');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'SIG SAUER P365XL', 
    'SIG SAUER – P365XL: Slim, high-capacity micro-compact 9mm with a longer slide/barrel and extended grip for improved control while staying easy to conceal.', 
    715.53, 
    'pistol', 
    'active', 
    'SIG SAUER', 
    'P365XL', 
    5, 
    ARRAY['/assets/inventory/sig sauer p365xl.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SIG SAUER P365XL');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Kinetic Suppressor Wizard', 
    'Kinetic Suppressor – WizardTi 9mm: Compact suppressor option aimed at balancing size and sound reduction, typically positioned for lightweight, general-purpose use.', 
    600.00, 
    'nfa', 
    'active', 
    'Kinetic Suppressor', 
    'Wizard', 
    5, 
    ARRAY['/assets/inventory/wizardti9mm.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Kinetic Suppressor Wizard');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Ruger 10/22', 
    'Ruger – 10/22: Iconic semi-automatic .22 LR rifle known for reliability, huge aftermarket support, and use as a go-to platform for plinking, training, and small-game use.', 
    668.00, 
    'rifle', 
    'active', 
    'Ruger', 
    '10/22', 
    5, 
    ARRAY['/assets/inventory/03-25-19-01-Ruger-10-22.jpg'], 
    '22 LR'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Ruger 10/22');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'SIG SAUER INC. P365', 
    'SIG SAUER INC. – P365: The original high-capacity micro-compact 9mm that packs double-stack capacity into a very small concealed-carry footprint.', 
    1124.00, 
    'pistol', 
    'active', 
    'SIG SAUER INC.', 
    'P365', 
    5, 
    ARRAY['/assets/inventory/sig sauer p365.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SIG SAUER INC. P365');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'DIAMONDBACK FIREARMS, LLC DB10 8.6 BLACKOUT', 
    'Diamondback Firearms – DB10 8.6 Blackout: AR-10–pattern large-frame rifle chambered in 8.6 Blackout, built around heavy .338-caliber projectiles and commonly paired with suppressor use.  Trijicon Credo 1-8x24 optic installed.', 
    2053.00, 
    'rifle', 
    'active', 
    'DIAMONDBACK FIREARMS, LLC', 
    'DB10 8.6 BLACKOUT', 
    5, 
    ARRAY['/assets/inventory/DB86blackout.jpg'], 
    '8.6 BLK'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'DIAMONDBACK FIREARMS, LLC DB10 8.6 BLACKOUT');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Carl Walther pdp', 
    'Carl Walther – PDP: Modern striker-fired pistol with an optics-ready emphasis, strong ergonomics, and a trigger designed for fast, consistent shooting.', 
    625.00, 
    'pistol', 
    'active', 
    'Carl Walther', 
    'pdp', 
    5, 
    ARRAY['/assets/inventory/walther PDP.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Carl Walther pdp');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Glock G43', 
    'Glock – G43: Ultra-slim, single-stack 9mm designed for deep concealment with Glock’s straightforward, durability-first design.', 
    473.00, 
    'pistol', 
    'active', 
    'Glock', 
    'G43', 
    5, 
    ARRAY['/assets/inventory/Glock43.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Glock G43');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Smith & Wesson SW22 Victory', 
    'Smith & Wesson – SW22 Victory: Target-style .22 LR pistol known for easy takedown, a stable sight radius, and strong accuracy potential for range and competition use.', 
    980.00, 
    'nfa', 
    'active', 
    'Smith & Wesson', 
    'SW22 Victory', 
    5, 
    ARRAY['/assets/inventory/SW22Vic.jpg'], 
    '22 LR'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Smith & Wesson SW22 Victory');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Carl Walther PPQ', 
    'Carl Walther – PPQ: Striker-fired pistol recognized for excellent ergonomics and a notably crisp trigger feel, often favored as a range or duty-style handgun.', 
    410.00, 
    'pistol', 
    'active', 
    'Carl Walther', 
    'PPQ', 
    5, 
    ARRAY['/assets/inventory/walther ppq.jpg'], 
    '22 LR'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Carl Walther PPQ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Kinetic Suppressor Mojo', 
    'Kinetic Suppressor – Mojo22: Rimfire-oriented suppressor designed to reduce .22-class report with a compact form factor and user-serviceable internal baffles for cleaning.', 
    150.00, 
    'nfa', 
    'active', 
    'Kinetic Suppressor', 
    'Mojo', 
    5, 
    ARRAY['/assets/inventory/Kinetic-Suppressor-MOJO-22-1.jpg'], 
    '22 LR'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Kinetic Suppressor Mojo');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Kinetic Suppressor Racket', 
    'Kinetic Suppressor – Racket: Centerfire rifle suppressor model geared toward durable, hard-use shooting with a focus on repeatable mounting and consistent performance.', 
    850.00, 
    'nfa', 
    'active', 
    'Kinetic Suppressor', 
    'Racket', 
    5, 
    ARRAY['/assets/inventory/KINETIC-SUPPRESSOR-RACKET-762-SUPPRESSOR-2.jpg'], 
    '7.62'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Kinetic Suppressor Racket');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Canik Rival-S', 
    'Canik – Rival-S: Steel-frame competition-oriented striker-fired pistol tuned for speed—heavier for flatter recoil, with features aimed at USPSA-style shooting.', 
    1050.00, 
    'pistol', 
    'active', 
    'Canik', 
    'Rival-S', 
    5, 
    ARRAY['/assets/inventory/canik rival s.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Canik Rival-S');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Kinetic Suppressor Racket 7.62 Ti', 
    'Kinetic Suppressor – Racket 7.62 Ti: Titanium 7.62 suppressor variant prioritizing weight savings while maintaining centerfire rifle suppression for .30-caliber-class hosts.', 
    800.00, 
    'nfa', 
    'active', 
    'Kinetic Suppressor', 
    'Racket 7.62 Ti', 
    5, 
    ARRAY['/assets/inventory/KINETIC-SUPPRESSOR-RACKET-762-SUPPRESSOR-6.jpg'], 
    '7.62'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Kinetic Suppressor Racket 7.62 Ti');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'GIRSAN WITNESS2311S', 
    'GIRSAN – WITNESS2311S: 2011/“double-stack 1911”-style handgun platform with a competition-leaning feature set and a straight-to-the-point, high-capacity layout.', 
    990.00, 
    'pistol', 
    'active', 
    'GIRSAN', 
    'WITNESS2311S', 
    5, 
    ARRAY['/assets/inventory/girsan.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'GIRSAN WITNESS2311S');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'Huxwrx Flow 556', 
    'HUXWRX – Flow 556: 5.56 suppressor built around a flow-through design to reduce backpressure, helping keep gas and fouling down on many semi-auto rifles.', 
    1099.00, 
    'nfa', 
    'active', 
    'Huxwrx', 
    'Flow 556', 
    5, 
    ARRAY['/assets/inventory/huxwrx flow 556.jpg'], 
    '556NATO'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Huxwrx Flow 556');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'DeadAir Wolfman', 
    'Dead Air – Wolfman: Modular 9mm suppressor that can run short or long, commonly used on PCCs and some pistol hosts with an emphasis on versatility.', 
    720.00, 
    'nfa', 
    'active', 
    'DeadAir', 
    'Wolfman', 
    5, 
    ARRAY['/assets/inventory/deadair wolfman.jpg'], 
    '9MM'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'DeadAir Wolfman');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'DeadAir Mask', 
    'Dead Air – Mask: Popular .22 LR suppressor known for strong suppression, solid build quality, and easy user-serviceable cleaning.', 
    175.00, 
    'nfa', 
    'active', 
    'DeadAir', 
    'Mask', 
    5, 
    ARRAY['/assets/inventory/deadair mask.jpg'], 
    '22 LR'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'DeadAir Mask');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'DeadAir SANDMAN K', 
    'Dead Air – Sandman K: Short, rugged .30-caliber suppressor focused on compact length and durability—typically a “minimum added length” rifle can.', 
    700.00, 
    'nfa', 
    'active', 
    'DeadAir', 
    'SANDMAN K', 
    5, 
    ARRAY['/assets/inventory/deadair sandman k.jpg'], 
    '7.62'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'DeadAir SANDMAN K');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'DeadAir SANDMAN S', 
    'Dead Air – Sandman S: Mid-length .30-caliber suppressor positioned as a balance between suppression, length, and backpressure for general-purpose rifle use.', 
    800.00, 
    'nfa', 
    'active', 
    'DeadAir', 
    'SANDMAN S', 
    5, 
    ARRAY['/assets/inventory/deadair sandman s.jpg'], 
    '7.62'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'DeadAir SANDMAN S');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    'SilencerCo LLC 22SPARROWSS', 
    'SilencerCo – 22 Sparrow SS: Stainless .22 LR suppressor designed for easy maintenance (notably simple disassembly after heavy rimfire fouling) with a long track record in rimfire use.', 
    200.00, 
    'nfa', 
    'active', 
    'SilencerCo LLC', 
    '22SPARROWSS', 
    5, 
    ARRAY['/assets/inventory/silencerco sparrow 22.jpg'], 
    '22 LR'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SilencerCo LLC 22SPARROWSS');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');

INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ' ', 
    NULL, 
    0.00, 
    'accessory', 
    'active', 
    NULL, 
    NULL, 
    5, 
    ARRAY['/assets/inventory/'], 
    NULL
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ' ');
