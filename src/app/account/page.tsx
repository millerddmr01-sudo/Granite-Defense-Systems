import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AccountPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    // Fetch Profile Data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // Check if user is admin - derek@granitedefensesystems.com
    const isAdmin = profile?.email === 'derek@granitedefensesystems.com' || profile?.is_admin;

    // Fetch Orders
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-border">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">My Account</h1>
                        <p className="text-secondary">Welcome back, {profile?.full_name || user.email}</p>
                    </div>
                    <form action="/auth/signout" method="post">
                        <button className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold text-sm">
                            Sign Out
                        </button>
                    </form>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar / Menu */}
                    <div className="space-y-4">
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                            <h3 className="uppercase text-xs font-bold text-secondary mb-4 tracking-wider">Account Details</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-bold">Email:</span> {user.email}</p>
                                <p><span className="font-bold">Name:</span> {profile?.full_name || 'Not set'}</p>
                                <p><span className="font-bold">Phone:</span> {profile?.phone || 'Not set'}</p>
                            </div>
                        </div>

                        {isAdmin && (
                            <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
                                <h3 className="uppercase text-xs font-bold text-primary mb-4 tracking-wider">Admin Panel</h3>
                                <p className="text-sm text-secondary mb-4">You have administrator access.</p>
                                <Link href="/admin/inventory" className="block w-full text-center py-2 bg-primary text-white text-sm font-bold rounded-sm hover:opacity-90">
                                    Manage Inventory
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Main Content - Orders */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold uppercase">Order History</h2>
                            <span className="text-sm text-secondary">
                                {orders && orders.length > 0 ? `${orders.length} Order(s)` : 'No Orders'}
                            </span>
                        </div>

                        {!orders || orders.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                                <p className="text-secondary font-medium">You haven't placed any orders yet.</p>
                                <Link href="/shop" className="mt-4 inline-block text-primary font-bold hover:underline">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-700">
                                            <div>
                                                <div className="font-bold text-lg">{order.id}</div>
                                                <div className="text-sm text-secondary">
                                                    Placed on {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-black text-xl">${order.total_amount.toFixed(2)}</div>
                                                <div className={`text-xs font-bold uppercase px-2 py-1 rounded-full inline-block mt-1 ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-zinc-200 text-zinc-600'
                                                    }`}>
                                                    {order.status}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items Summary */}
                                        <div className="space-y-2">
                                            {(order.items as any[]).map((item: any, idx: number) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span className="text-zinc-600 dark:text-zinc-300">
                                                        {item.quantity} x {item.title}
                                                    </span>
                                                    <span className="font-mono text-xs text-secondary">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
