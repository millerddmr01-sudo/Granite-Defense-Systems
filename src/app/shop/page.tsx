"use client";

import { createClient } from "@/lib/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Database } from "@/types/database.types";
import { useEffect, useState } from "react";

type Product = Database['public']['Tables']['products']['Row'];

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('status', 'active')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground py-12">
            <div className="container mx-auto px-4">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Inventory</h1>
                    <p className="text-secondary max-w-2xl mx-auto">
                        Browse our current selection of premium firearms and parts.
                    </p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-96 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        {products.length === 0 ? (
                            <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-xl font-bold mb-2">Inventory Updating</h3>
                                <p className="text-secondary">Check back soon for new arrivals.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
