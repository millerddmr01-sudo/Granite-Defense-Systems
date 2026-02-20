const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching products:', error);
    } else if (data && data.length > 0) {
        const keys = Object.keys(data[0]);
        console.log('Product columns:', keys);
        if (keys.includes('upc')) console.log('✅ UPC column exists');
        else console.log('❌ UPC column missing');

        if (keys.includes('mpn')) console.log('✅ MPN column exists');
        else console.log('❌ MPN column missing');

        if (keys.includes('sku')) console.log('ℹ️ SKU column still exists');
    } else {
        console.log('No products found to check columns.');
    }
}

checkSchema();
