import Link from "next/link";
import { Package } from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/inventory" className="block group">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all group-hover:border-primary">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Inventory</h2>
                            <Package className="text-primary" size={24} />
                        </div>
                        <p className="text-secondary">Manage products, stock levels, and prices.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
