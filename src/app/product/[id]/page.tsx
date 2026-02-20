"use client";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";
import { Database } from "@/types/database.types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = Database['public']['Tables']['products']['Row'];

// Note: In a real app with SSG, we might use generateStaticParams
// For simplicity with client-side fetching pattern established:
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // Unwrapping params Promise
    const [productId, setProductId] = useState<string | null>(null);
    const { addItem } = useCart();

    useEffect(() => {
        params.then(unwrapped => setProductId(unwrapped.id));
    }, [params]);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            const supabase = createClient();

            // Try fetching by ID first, if we implemented slugs we'd check that too
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error || !data) {
                // If using slugs, logic would go here
                console.error("Product not found", error);
                // setProduct(null); // handled by initial state
            } else {
                setProduct(data);
                if (data.images && data.images.length > 0) {
                    setSelectedImage(data.images[0]);
                }
            }
            setLoading(false);
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-xl font-bold text-secondary">Loading Gear...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <Link href="/shop" className="text-primary hover:underline">Return to Inventory</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-secondary mb-8">
                    <Link href="/shop" className="hover:text-primary transition-colors">Inventory</Link>
                    <span className="mx-2">/</span>
                    <span className="uppercase">{product.category}</span>
                    <span className="mx-2">/</span>
                    <span className="text-foreground font-medium">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 relative">
                            {product.status === 'sold' && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 font-black uppercase tracking-widest z-10 rounded-sm">
                                    Sold Out
                                </div>
                            )}

                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt={product.title}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-400">No Image</div>
                            )}
                        </div>
                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-zinc-300'}`}
                                    >
                                        <img src={img} alt={`${product.title} - view ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-2 text-secondary uppercase tracking-widest text-sm font-bold">
                            {product.manufacturer} {product.model}
                        </div>
                        <h1 className="text-4xl font-black mb-4 leading-tight">{product.title}</h1>

                        <div className="flex items-end gap-4 mb-8">
                            <div className="text-3xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </div>
                            {product.compare_at_price && product.compare_at_price > product.price && (
                                <div className="text-xl text-zinc-500 line-through mb-1">
                                    ${product.compare_at_price.toFixed(2)}
                                </div>
                            )}
                        </div>

                        <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 mb-8">
                            <p>{product.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-8 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                            <div>
                                <span className="block text-secondary text-xs uppercase font-bold">Category</span>
                                <span className="capitalize">{product.category}</span>
                            </div>
                            <div>
                                <span className="block text-secondary text-xs uppercase font-bold">Condition</span>
                                {product.condition || 'New'}
                            </div>
                            <div>
                                <span className="block text-secondary text-xs uppercase font-bold">UPC</span>
                                {product.upc || 'N/A'}
                            </div>
                            <div>
                                <span className="block text-secondary text-xs uppercase font-bold">Stock</span>
                                {product.stock_quantity > 0 ? (
                                    <span className="text-green-600 font-bold">{product.stock_quantity} Available</span>
                                ) : (
                                    <span className="text-red-500 font-bold">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {product.status === 'active' && product.stock_quantity > 0 ? (
                                <button
                                    onClick={() => addItem(product)}
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-sm hover:opacity-90 transition-opacity text-center block uppercase tracking-wider"
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <button disabled className="w-full py-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-400 font-bold text-lg rounded-sm cursor-not-allowed">
                                    Unavailable
                                </button>
                            )}

                            <a
                                href={`mailto:info@granitedefensesystems.com?subject=Question about ${product.title}&body=I have a question about the ${product.title} (UPC: ${product.upc || 'N/A'})...`}
                                className="w-full py-4 border-2 border-primary text-primary font-bold text-lg rounded-sm hover:bg-primary/5 transition-colors text-center block"
                            >
                                Ask a Question
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
