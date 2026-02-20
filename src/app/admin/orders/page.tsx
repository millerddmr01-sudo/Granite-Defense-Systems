import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminOrdersPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Check if user is admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

    if (!profile || !profile.is_admin) {
        redirect('/');
    }

    const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        return <div>Error loading orders</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tight">Orders</h1>

            <div className="bg-background rounded-lg border border-border overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-100 dark:bg-zinc-900 border-b border-border uppercase text-xs font-bold text-secondary">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Total</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {orders.map((order) => {
                            const customer = order.customer_details as any;
                            return (
                                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                                    <td className="p-4 font-mono font-bold">{order.id}</td>
                                    <td className="p-4 text-secondary">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold">{customer.fullName}</div>
                                        <div className="text-xs text-secondary">{customer.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-zinc-200 text-zinc-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-bold">
                                        ${order.total_amount.toFixed(2)}
                                    </td>
                                    <td className="p-4 text-center">
                                        <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline font-bold text-xs uppercase">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-8 text-center text-secondary">No orders found.</div>
                )}
            </div>
        </div>
    );
}
