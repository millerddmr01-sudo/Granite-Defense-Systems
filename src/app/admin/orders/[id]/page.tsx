"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { updateOrderStatus } from "@/app/actions/orders";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const [orderId, setOrderId] = useState<string | null>(null);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [newStatus, setNewStatus] = useState<string>('');

    useEffect(() => {
        params.then(unwrapped => setOrderId(unwrapped.id));
    }, [params]);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single();

            if (error) {
                console.error("Fetch Error:", error);
            } else {
                setOrder(data);
                setNewStatus(data.status);
            }
            setLoading(false);
        };
        fetchOrder();
    }, [orderId]);

    const handleUpdateStatus = async () => {
        if (!order || updating || newStatus === order.status) return;
        setUpdating(true);
        const result = await updateOrderStatus(order.id, newStatus);

        if (result.success) {
            setOrder({ ...order, status: newStatus });
            alert("Status updated and email sent!");
        } else {
            alert("Failed to update status: " + result.error);
        }
        setUpdating(false);
    };

    if (loading) return <div className="p-8">Loading Order...</div>;
    if (!order) return <div className="p-8">Order not found.</div>;

    const customer = order.customer_details as any;
    const items = order.items as any[];

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/orders" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-black uppercase tracking-tight">Order {order.id}</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {/* Main Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-background rounded-lg border border-border overflow-hidden">
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-b border-border font-bold uppercase text-xs text-secondary">
                            Items ({items.length})
                        </div>
                        <div className="divide-y divide-border">
                            {items.map((item, idx) => (
                                <div key={idx} className="p-4 flex gap-4">
                                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden relative shrink-0 border border-border">
                                        {item.images && item.images[0] ? (
                                            <Image
                                                src={item.images[0]}
                                                alt={item.title}
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-secondary">No Img</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{item.title}</div>
                                        <div className="text-xs text-secondary">
                                            {item.quantity} x ${item.price.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="ml-auto font-bold">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-border flex justify-between items-center font-bold">
                            <span>Total</span>
                            <span className="text-lg">${order.total_amount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6 h-fit">

                    {/* Status Card */}
                    <div className="bg-background rounded-lg border border-border p-6 shadow-sm">
                        <h3 className="font-bold uppercase text-xs text-secondary mb-4">Order Status</h3>

                        <div className="space-y-4">
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                                onClick={handleUpdateStatus}
                                disabled={updating || newStatus === order.status}
                                className="w-full py-2 bg-primary text-primary-foreground font-bold text-sm rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {updating ? 'Updating...' : 'Update Status'}
                            </button>
                            <p className="text-xs text-secondary text-center">
                                Customer will receive an email notification.
                            </p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-background rounded-lg border border-border p-6 shadow-sm">
                        <h3 className="font-bold uppercase text-xs text-secondary mb-4">Customer Details</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="block text-xs font-bold text-secondary uppercase">Name</span>
                                {customer.fullName}
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-secondary uppercase">Email</span>
                                {customer.email}
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-secondary uppercase">Phone</span>
                                {customer.phone}
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-background rounded-lg border border-border p-6 shadow-sm">
                        <h3 className="font-bold uppercase text-xs text-secondary mb-4">Shipping Address</h3>
                        <div className="text-sm leading-relaxed">
                            {customer.address}<br />
                            {customer.city}, {customer.state} {customer.zip}
                        </div>
                        {customer.notes && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <span className="block text-xs font-bold text-secondary uppercase mb-1">Notes</span>
                                <p className="text-sm italic text-zinc-500">{customer.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
