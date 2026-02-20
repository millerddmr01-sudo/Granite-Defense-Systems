import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import InventoryRow from "@/components/InventoryRow";

export default async function AdminInventoryPage() {
    const supabase = await createClient();

    const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="max-w-7xl mx-auto">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Inventory Management</h1>
                    <p className="text-secondary">Manage {products?.length || 0} items</p>
                </div>
                <Link href="/admin/inventory/new" className="px-4 py-2 bg-primary text-black font-bold text-sm rounded-sm hover:opacity-90 transition-opacity flex items-center">
                    <span className="mr-2">+</span> Add Product
                </Link>
            </header>

            <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="p-4 font-semibold text-secondary w-20">Image</th>
                                <th className="p-4 font-semibold text-secondary">Product</th>
                                <th className="p-4 font-semibold text-secondary">Category</th>
                                <th className="p-4 font-semibold text-secondary w-32">Price</th>
                                <th className="p-4 font-semibold text-secondary w-24">Stock</th>
                                <th className="p-4 font-semibold text-secondary w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product) => (
                                <InventoryRow key={product.id} product={product} />
                            )) || (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-secondary">No products found</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
