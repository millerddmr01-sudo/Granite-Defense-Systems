-- Add 'nfa' category. 
-- We will migrate existing 'silencer' items to 'nfa' later if needed, or just support both.
-- The user requested the menu item change, so we should likely use a broad 'nfa' category.

ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'nfa';
