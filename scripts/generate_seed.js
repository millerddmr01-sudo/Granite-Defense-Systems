const fs = require('fs');
const path = require('path');

const csvPath = 'c:/Users/mille/OneDrive/Documents/Website/assets/inventory.csv';
const outputPath = 'c:/Users/mille/OneDrive/Documents/Website/granite-defense-systems/seed_full_inventory.sql';

// Mappings
const categoryMap = {
    'Rifle': 'rifle',
    'RIFLE': 'rifle',
    'Pistol': 'pistol',
    'PISTOL': 'pistol',
    'NFA/Silencer': 'nfa', // Will treat as 'nfa' category, maybe append type to description
    'NFA': 'nfa'
};

function escapeSql(str) {
    if (!str) return 'NULL';
    return `'${str.replace(/'/g, "''")}'`;
}

try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

    // Headers: Manufacturer,Model,Type,Caliber,Price,Description,Pic Name

    let sql = `-- Auto-generated seed file from inventory.csv
-- Deletes existing items with matching titles to avoid duplicates (optional, or use ON CONFLICT)

`;

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        // Simple CSV parser (handles quoted strings roughly)
        // Note: The provided CSV has quoted strings like "$2,452.32". 
        // A simple split(',') won't work well if descriptions have commas.
        // Let's use a regex to match CSV fields.
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

        // Better regex for CSV:
        const parts = [];
        let current = '';
        let inQuote = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                parts.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        parts.push(current.trim());

        if (parts.length < 7) continue;

        let [manufacturer, model, type, caliber, priceRaw, description, picName] = parts;

        // Clean fields
        manufacturer = manufacturer.replace(/^"|"$/g, '');
        model = model.replace(/^"|"$/g, '');
        type = type.replace(/^"|"$/g, '');
        caliber = caliber.replace(/^"|"$/g, '');
        description = description.replace(/^"|"$/g, '');
        picName = picName.replace(/^"|"$/g, '');

        // Clean Price
        let price = priceRaw.replace(/[$,"]/g, '');
        if (isNaN(parseFloat(price))) price = '0.00';

        // Map Category
        let category = categoryMap[type] || 'accessory'; // Default fallback

        // Clean Image path
        // Assume images are copied to /assets/inventory/
        // If csv has "Kriss Vector.jpg", path is "/assets/inventory/Kriss Vector.jpg"
        // Note: URL encoding might be needed for spaces? Browsers handle spaces usually, but %20 is safer.
        // Filesystem is Windows, case insensitive, but web is case sensitive often. 
        // We will stick to the filename as is for now, hoping exact match.
        const imagePath = `/assets/inventory/${picName}`;

        // Generate INSERT
        const insert = `
INSERT INTO products (title, description, price, category, status, manufacturer, model, stock_quantity, images, caliber)
SELECT 
    ${escapeSql(`${manufacturer} ${model}`)}, 
    ${escapeSql(description)}, 
    ${price}, 
    ${escapeSql(category)}, 
    'active', 
    ${escapeSql(manufacturer)}, 
    ${escapeSql(model)}, 
    5, 
    ARRAY[${escapeSql(imagePath)}], 
    ${escapeSql(caliber)}
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = ${escapeSql(`${manufacturer} ${model}`)});
`;
        sql += insert;
    }

    fs.writeFileSync(outputPath, sql);
    console.log(`Generated SQL at ${outputPath}`);

} catch (err) {
    console.error('Error:', err);
}
