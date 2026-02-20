'use client';

import { useState } from "react";
import { updateStock, updatePrice, deleteProduct } from "@/app/actions/inventory";
import { Loader2, Check, X, Trash2, Pencil } from "lucide-react";
import { Database } from "@/types/database.types";
import Link from "next/link";

type Product = Database['public']['Tables']['products']['Row'];

export default function InventoryRow({ product }: { product: Product }) {
    const [stock, setStock] = useState(product.stock_quantity);
    const [price, setPrice] = useState(product.price);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStock(parseInt(e.target.value) || 0);
        setIsDirty(true);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseFloat(e.target.value) || 0);
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsUpdating(true);

        // Parallel updates if needed
        const promises = [];
        if (stock !== product.stock_quantity) promises.push(updateStock(product.id, stock));
        if (price !== product.price) promises.push(updatePrice(product.id, price));

        await Promise.all(promises);

        setIsUpdating(false);
        setIsDirty(false);
    };

    const handleCancel = () => {
        setStock(product.stock_quantity);
        setPrice(product.price);
        setIsDirty(false);
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;

        setIsDeleting(true);
        const res = await deleteProduct(product.id);
        if (!res.success) {
            alert("Failed to delete product");
            setIsDeleting(false);
        }
        // If success, router refresh happens automatically via server action revalidatePath,
        // but row might persist until refresh. Usually UI optimistically updates or waits.
        // For simple admin, waiting for revalidate is fine.
    };

    if (isDeleting) {
        return (
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-red-50 dark:bg-red-900/10">
                <td colSpan={6} className="p-4 text-center text-red-500">
                    <Loader2 className="animate-spin inline mr-2" size={16} /> Deleting...
                </td>
            </tr>
        );
    }

    return (
        <tr className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
            <td className="p-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden relative">
                    {product.images?.[0] && (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                    )}
                </div>
            </td>
            <td className="p-4">
                <div className="font-bold text-foreground">{product.title}</div>
                <div className="text-xs text-secondary">
                    {product.upc && <span className="mr-2">UPC: {product.upc}</span>}
                    {product.mpn && <span>MPN: {product.mpn}</span>}
                    {!product.upc && !product.mpn && 'No ID'}
                </div>
            </td>
            <td className="p-4">
                <span className={`text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full text-secondary ${product.category === 'nfa' ? 'uppercase' : 'capitalize'}`}>
                    {product.category === 'nfa' ? 'NFA' : product.category.replace('_', ' ')}
                </span>
            </td>
            <td className="p-4">
                <div className="flex items-center gap-1">
                    <span className="text-secondary">$</span>
                    <input
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                        className="w-24 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 text-right font-mono focus:border-primary outline-none"
                    />
                </div>
            </td>
            <td className="p-4">
                <input
                    type="number"
                    value={stock}
                    onChange={handleStockChange}
                    className="w-20 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 text-right font-mono focus:border-primary outline-none"
                />
            </td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    {isUpdating ? (
                        <Loader2 className="animate-spin text-primary" size={20} />
                    ) : isDirty ? (
                        <>
                            <button onClick={handleSave} className="text-green-500 hover:text-green-600 p-1 hover:bg-green-100 rounded" title="Save Changes">
                                <Check size={20} />
                            </button>
                            <button onClick={handleCancel} className="text-red-500 hover:text-red-600 p-1 hover:bg-red-100 rounded" title="Cancel">
                                <X size={20} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href={`/admin/inventory/${product.id}`} className="text-zinc-400 hover:text-primary p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded opacity-0 group-hover:opacity-100 transition-opacity" title="Edit Item">
                                <Pencil size={20} />
                            </Link>

                            <button onClick={handleDelete} className="text-zinc-400 hover:text-red-500 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded opacity-0 group-hover:opacity-100 transition-opacity" title="Delete Item">
                                <Trash2 size={20} />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}
