import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Define strict category mapping
const CATEGORY_MAP: Record<string, Database['public']['Tables']['products']['Row']['category']> = {
    'rifles': 'rifle',
    'pistols': 'pistol',
    'shotguns': 'shotgun',
    'silencers': 'silencer',
    'nfa': 'nfa',
    'optics': 'optic',
    'parts': 'new_part', // Default parts to new_part if just 'parts' accessed? Or maybe map parts->new_part
    'knives': 'knife',
    'cases': 'case',
    'merch': 'merch',
};

type Product = Database['public']['Tables']['products']['Row'];

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    // Await params first (Next.js 15 requirement)
    const { category } = await params;

    // Custom mapping for special sub-categories
    let dbCategory = CATEGORY_MAP[category.toLowerCase()] || null;
    let conditionFilter: string | null = null;

    // Logic for new/used parts
    if (category === 'parts-new') {
        dbCategory = 'new_part';
    } else if (category === 'parts-used') {
        dbCategory = 'used_part';
    }

    if (!dbCategory) {
        return notFound();
    }

    const supabase = createClient();

    // Build query
    let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .eq('category', dbCategory);

    if (conditionFilter) {
        query = query.eq('condition', conditionFilter); // Requires 'condition' column in DB to be populated!
    }

    const { data: products } = await query.order('created_at', { ascending: false });

    const titleMap: Record<string, string> = {
        'rifles': 'Rifles',
        'pistols': 'Pistols',
        'shotguns': 'Shotguns',
        'silencers': 'Silencers',
        'nfa': 'NFA Items',
        'optics': 'Optics',
        'parts': 'Parts & Accessories',
        'parts-new': 'New Parts',
        'parts-used': 'Parts (Used)',
        'knives': 'Edged Weapons',
        'cases': 'Custom Cases',
        'merch': 'Apparel & Merch',
    };

    const subtitleMap: Record<string, React.ReactNode> = {
        'pistols': "Check out our inventory, or contact us to purchase any pistol - from any manufacturer",
        'shotguns': "Check out our inventory or contact us to purchase any shotgun - from any manufacturer",
        'optics': (
            <>
                <span className="block">Precision starts with clear glass</span>
                <span className="block mt-1">Check out our inventory or contact us for Optics recommendations</span>
            </>
        ),
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12">
            <div className="container mx-auto px-4">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
                        {category === 'nfa' ? 'NFA Made Simple' : (titleMap[category] || category)}
                    </h1>
                    {category !== 'parts-new' && (
                        <div className="text-secondary max-w-2xl mx-auto">
                            {category === 'nfa'
                                ? (
                                    <>
                                        <span className="text-xl font-bold text-foreground">
                                            From Application to Approval, we handle all the details
                                        </span>
                                        <span className="block mt-1 font-medium text-secondary">
                                            (eforms, fingerprints, photos, submittal)
                                        </span>
                                    </>
                                )
                                : (subtitleMap[category] || `High-performance ${category === 'nfa' ? 'NFA Items' : category.replace('-', ' ')} for the discerning shooter.`)}
                        </div>
                    )}
                </header>

                {category === 'optics' && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">We proudly sell optics from the following manufacturers</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center max-w-6xl mx-auto">
                            {[
                                { name: 'ATN', img: '/assets/reseller/ATN.png', url: 'https://www.atncorp.com/' },
                                { name: 'Burris', img: '/assets/reseller/Burris.png', url: 'https://www.burrisoptics.com/' },
                                { name: 'Bushnell', img: '/assets/reseller/Bushnell.png', url: 'https://www.bushnell.com/' },
                                { name: 'DNT Optics', img: '/assets/reseller/DNTOptics.png', url: 'https://dntoptics.com/' },
                                { name: 'EOTECH', img: '/assets/reseller/EOtech.png', url: 'https://www.eotechinc.com/' },
                                { name: 'Leupold', img: '/assets/reseller/Leupold.jpg', url: 'https://www.leupold.com/' },
                                { name: 'Pulsar', img: '/assets/reseller/Pulsar.jpg', url: 'https://pulsarnv.com/' },
                                { name: 'Sig Sauer', img: '/assets/reseller/SigSauer.png', url: 'https://www.sigsauer.com/' },
                                { name: 'Trijicon', img: '/assets/reseller/Trijicon.png', url: 'https://www.trijicon.com/' },
                            ].map((brand) => (
                                <a
                                    key={brand.name}
                                    href={brand.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full max-w-[150px] opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                >
                                    <div className="relative aspect-[3/2] w-full">
                                        <Image
                                            src={brand.img}
                                            alt={brand.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Inventory Header (for Optics) */}
                {category === 'optics' && (
                    <div className="mb-8 border-b border-border pb-4">
                        <h2 className="text-3xl font-black uppercase tracking-tight">Inventory</h2>
                    </div>
                )}

                {category === 'nfa' && (
                    <div className="mb-16 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-center">How to Buy NFA Items</h2>
                        <div className="space-y-4 text-secondary leading-relaxed">
                            <p>
                                NFA Items include Short-Barreled Rifles (SBR), Short-Barreled Shotguns (SBS), Machine Guns (MG), Silencers (Suppressors/SUP), Destructive Devices (DD), and Any Other Weapons (AOW).
                            </p>
                            <p>
                                To legally buy and own NFA Items, you must go through a federal registration process with the Bureau of Alcohol, Tobacco, Firearms and Explosives (BATF). Depending on what you want, you will submit either a <strong>Form 1</strong> (make and register your own NFA Item) or <strong>Form 4</strong> (Buy or Transfer an NFA Item).
                            </p>
                        </div>
                    </div>
                )}

                {products && products.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="flex flex-col md:flex-row bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {/* Image Section */}
                                <div className="w-full md:w-1/3 lg:w-1/4 aspect-square md:aspect-auto relative bg-zinc-100 dark:bg-zinc-900 min-h-[250px]">
                                    {/* Sale/Sold Badges */}
                                    {product.status === 'sold' && (
                                        <span className="absolute top-2 right-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Sold Out</span>
                                    )}
                                    {product.compare_at_price && product.compare_at_price > product.price && (
                                        <span className="absolute top-2 right-2 z-10 bg-accent text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Sale</span>
                                    )}

                                    {product.images?.[0] ? (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Details Section */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                                                <Link href={`/product/${product.slug || product.id}`}>
                                                    {product.title}
                                                </Link>
                                            </h3>
                                            <span className="text-2xl font-black text-primary whitespace-nowrap ml-4">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Specific Fields Requested by User */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm mb-6 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md">
                                            <div className="flex justify-between border-b pb-1 border-dotted border-zinc-300">
                                                <span className="font-bold text-secondary">Manufacturer:</span>
                                                <span className="text-foreground">{product.manufacturer || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-1 border-dotted border-zinc-300">
                                                <span className="font-bold text-secondary">Model:</span>
                                                <span className="text-foreground">{product.model || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-1 border-dotted border-zinc-300">
                                                <span className="font-bold text-secondary">Type:</span>
                                                <span className="text-foreground capitalize">{product.category}</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-1 border-dotted border-zinc-300">
                                                <span className="font-bold text-secondary">Caliber:</span>
                                                <span className="text-foreground">{product.caliber || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="prose prose-sm dark:prose-invert max-w-none text-secondary line-clamp-3 mb-4">
                                            {product.description}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end pt-4 border-t border-border mt-2">
                                        <Link
                                            href={`/product/${product.slug || product.id}`}
                                            className="px-6 py-2 bg-primary text-primary-foreground text-sm font-bold uppercase rounded-sm hover:opacity-90 transition-opacity"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-xl font-bold mb-2">No items found</h3>
                        <p className="text-secondary">We are currently restocking this category. Check back soon.</p>
                    </div>
                )}
            </div>
        </div >
    );
}
