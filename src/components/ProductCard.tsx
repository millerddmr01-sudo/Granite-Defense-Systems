import Link from "next/link";
import { Database } from "@/types/database.types";

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Determine status badge
    let badge = null;
    if (product.status === 'sold') {
        badge = <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Sold Out</span>;
    } else if (product.compare_at_price && product.compare_at_price > product.price) {
        badge = <span className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">Sale</span>;
    }

    return (
        <Link href={`/product/${product.slug || product.id}`} className="group block h-full">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 h-full flex flex-col relative">

                {/* Image Placeholder */}
                <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                    {/* Badge Overlay */}
                    {badge}

                    {product.images?.[0] ? (
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-400">
                            <span className="text-sm">No Image</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <div className="text-xs text-secondary uppercase tracking-wider mb-1 font-semibold">
                        {product.manufacturer} {product.model}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-tight group-hover:text-primary/80 transition-colors">
                        {product.title}
                    </h3>

                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                            {product.compare_at_price && product.compare_at_price > product.price && (
                                <span className="text-xs text-zinc-500 line-through">
                                    ${product.compare_at_price.toFixed(2)}
                                </span>
                            )}
                            <span className="text-xl font-black text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {product.status === 'active' && (
                            <button className="bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
