"use client";

import { useCart } from "@/context/CartContext";
import { createOrder } from "@/app/actions/checkout";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function CheckoutPageWrapper() {
    const { items, subtotal } = useCart();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [paymentIntentId, setPaymentIntentId] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (subtotal > 0) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: subtotal,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setClientSecret(data.clientSecret);
                    setPaymentIntentId(data.paymentIntentId);
                })
                .catch(err => {
                    console.error("Failed to fetch payment intent:", err);
                });
        }
    }, [subtotal]);

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-4 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                    <h1 className="text-4xl font-black uppercase mb-2">Order Received!</h1>
                    <p className="text-zinc-600 max-w-md mx-auto">
                        Thank you for your order! We have sent a confirmation email to your provided email address with your order details.
                    </p>
                </div>
                <Link href="/" className="px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity">
                    Return Home
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-4">
                <h1 className="text-3xl font-black uppercase text-secondary">Cart Empty</h1>
                <p className="text-zinc-500">You have no items in your cart to checkout.</p>
                <Link href="/shop" className="text-primary hover:underline font-bold">Return to Shop</Link>
            </div>
        );
    }

    if (!clientSecret || !stripePromise) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                {!stripeKey && (
                    <p className="mt-4 text-red-500 font-bold max-w-md text-center">
                        Stripe Configuration Error: Missing Publishable Key. Please check your environment variables (.env.local).
                    </p>
                )}
            </div>
        );
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
        },
    };

    return (
        <Elements key={clientSecret} options={options} stripe={stripePromise}>
            <CheckoutPage paymentIntentId={paymentIntentId} onSuccess={() => setIsSuccess(true)} />
        </Elements>
    );
}

function CheckoutPage({ paymentIntentId, onSuccess }: { paymentIntentId: string | null, onSuccess: () => void }) {
    const { items, subtotal, clearCart } = useCart();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        notes: ''
    });

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Pre-fill user data if logged in
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    email: user.email || '',
                }));
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe is not yet loaded
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            if (items.length === 0) {
                throw new Error("Your cart is empty.");
            }

            // 1. Confirm Card Payment via Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required',
                confirmParams: {
                    payment_method_data: {
                        billing_details: {
                            name: formData.fullName,
                            email: formData.email,
                            phone: formData.phone,
                            address: {
                                line1: formData.address,
                                city: formData.city,
                                state: formData.state,
                                postal_code: formData.zip,
                                country: 'US',
                            }
                        }
                    }
                },
            });

            if (stripeError) {
                setStatus('error');
                setErrorMessage(stripeError.message || "Payment failed.");
                return;
            }

            // 2. If Payment succeeded, create the record in our DB
            if (paymentIntent && paymentIntent.status === "succeeded") {
                const result = await createOrder({
                    items,
                    customer: formData,
                    total: subtotal
                });

                if (!result.success) {
                    throw new Error(result.error || "Failed to save order record.");
                }

                clearCart();
                setStatus('success');
                onSuccess(); // Trigger wrapper to show success state
            }

        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

                {/* Form Section */}
                <div className="bg-background p-8 rounded-lg shadow-sm border border-border h-fit">
                    <h2 className="text-2xl font-black uppercase mb-6 pb-4 border-b border-border">Customer Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold uppercase mb-1">Full Name *</label>
                                <input
                                    name="fullName"
                                    required
                                    className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold uppercase mb-1">Email *</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold uppercase mb-1">Phone *</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-1">Shipping Address *</label>
                                <input
                                    name="address"
                                    required
                                    className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold uppercase mb-1">City *</label>
                                    <input
                                        name="city"
                                        required
                                        className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold uppercase mb-1">State *</label>
                                    <input
                                        name="state"
                                        required
                                        className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold uppercase mb-1">ZIP *</label>
                                    <input
                                        name="zip"
                                        required
                                        className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                        value={formData.zip}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-1">Order Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    rows={3}
                                    className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-sm bg-transparent"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Payment Method Display */}
                        <div className="pt-6 border-t border-border mt-6">
                            <h3 className="text-xl font-bold uppercase mb-4">Payment Information</h3>
                            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                <PaymentElement id="payment-element" />
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="p-4 bg-red-100 text-red-700 text-sm rounded-sm font-bold">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading' || !stripe || !elements}
                            className="w-full py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-lg rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Processing...' : 'Pay & Submit Order'}
                        </button>
                        <p className="text-xs text-secondary text-center">
                            By clicking submit, you agree to our Terms of Service. Payment is collected securely via Stripe.
                        </p>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-background p-8 rounded-lg shadow-sm border border-border h-fit">
                    <h2 className="text-2xl font-black uppercase mb-6 pb-4 border-b border-border">Order Summary</h2>
                    <div className="space-y-6 mb-6 max-h-[500px] overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4">
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
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm line-clamp-2">{item.title}</h3>
                                    <div className="flex justify-between text-sm text-secondary mt-1">
                                        <span>Qty: {item.quantity}</span>
                                        <span className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <p className="text-[10px] text-zinc-400 font-mono mt-0.5">UPC: {item.upc || 'N/A'}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 border-t border-border pt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-secondary">Subtotal</span>
                            <span className="font-bold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-secondary">Shipping</span>
                            <span className="font-mono text-xs text-zinc-400">Calculated later</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-secondary">Tax</span>
                            <span className="font-mono text-xs text-zinc-400">Calculated later</span>
                        </div>
                        <div className="flex justify-between text-xl font-black border-t border-border pt-4 mt-2">
                            <span>Total (Est.)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
