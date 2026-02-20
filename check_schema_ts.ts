import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

// Load directly from .env.local because standard nextjs env loading might not work in standalone script
// actually let's try to just use process.env assuming user runs with dotenv or similar, 
// OR just hardcode for this one-off check if needed, but let's try reading .env.local manually if needed.
// Better: use the existing lib if possible, but that might have 'use server' directives or next/headers which fail in standalone.

// Let's just use supabase-js directly and try to read env vars.
// If dotenv is not installed as dev dep, we might need a different approach.
// But nextjs projects usually have dotenv.

// Actually, simplest way if we can't run node scripts easily is to TRUST THE USER that "No ID" is showing,
// which confirms the migration didn't run or data is empty.
// But let's try one more robust way: a Next.js API route that prints the schema? 
// No, that's too invasive.

// Let's try to read .env.local manually.
const fs = require('fs');
const path = require('path');

try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    for (const line of envFile.split('\n')) {
        const match = line.match(/^(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY)=(.*)$/);
        if (match) {
            process.env[match[1]] = match[2].trim();
        }
    }
} catch (e) {
    console.log('Could not read .env.local');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(1);

    if (error) {
        // If column doesn't exist, selecting * might still work but return object without it.
        // Actually if we select a specific column that doesn't exist, it errors.
        // But verify if 'upc' is in the returned object keys.
        console.error('Error fetching products:', error);
    } else if (data && data.length > 0) {
        const keys = Object.keys(data[0]);
        console.log('Product columns:', keys);
        if (keys.includes('upc')) console.log('✅ UPC column exists');
        else console.log('❌ UPC column missing');

        if (keys.includes('mpn')) console.log('✅ MPN column exists');
        else console.log('❌ MPN column missing');
    } else {
        console.log('No products found.');
    }
}

checkSchema();
