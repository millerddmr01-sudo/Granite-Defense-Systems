-- Insert Dummy Products
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images)
VALUES 
('GDS Precision Upper Receiver', 'Complete upper receiver with 16" barrel and MLOK handguard.', 599.99, 'upper', 'active', 'Granite Defense', 'GDS-15', 5, '{
  "https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}'),
('Magpul PMAG 30 Gen M3', '30-round polymer magazine for AR15/M4 platforms.', 14.95, 'accessory', 'active', 'Magpul', 'PMAG M3', 100, '{
  "https://images.unsplash.com/photo-1583096164478-435e95589c30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}'),
('Vortex Strike Eagle 1-6x24', 'Low power variable optic (LPVO) optimized for speed and versatility.', 299.00, 'optic', 'active', 'Vortex', 'Strike Eagle', 3, '{
  "https://images.unsplash.com/photo-1625841445788-518833956c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}'),
('GDS Billet Lower Receiver (Stripped)', 'Machined from 7075-T6 billet aluminum.', 149.99, 'lower', 'sold', 'Granite Defense', 'GDS-15 Billet', 0, '{
  "https://images.unsplash.com/photo-1599368545802-985117904e21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
}');

-- Insert Promo Codes
INSERT INTO promo_codes (code, discount_type, discount_value, is_active, usage_limit)
VALUES 
('WELCOME10', 'percent', 10, true, null),
('FREESHIP', 'fixed', 0, true, 100), -- Logic for free shipping usually handled in app, but fixed 0 could track it
('GDS2024', 'fixed', 25, true, 50);

-- Insert Knife with Specs
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, specs)
VALUES 
('GDS Tactical Fixed Blade', 'Durable S35VN steel fixed blade with G10 handles.', 189.99, 'knife', 'active', 'Granite Defense', 'TFB-1', 15, '{
  "https://images.unsplash.com/photo-1589139265292-6f296d9d1502?auto=format&fit=crop&q=80&w=1000"
}', '{"blade_length": "4.5 inches", "steel": "S35VN", "handle_material": "G10", "sheath": "Kydex"}');
