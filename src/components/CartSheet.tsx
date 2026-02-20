"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartSheet() {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, subtotal } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-zinc-50 dark:bg-zinc-900">
                    <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-secondary">
                            <ShoppingBag className="w-16 h-16 opacity-20" />
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <button
                                onClick={toggleCart}
                                className="text-primary hover:underline font-bold"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                {/* Image */}
                                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden relative shrink-0 border border-border">
                                    {item.images && item.images[0] ? (
                                        <Image
                                            src={item.images[0]}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-secondary">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm line-clamp-2 leading-tight mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-secondary font-mono">
                                            UPC: {item.upc || 'N/A'}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 border border-border rounded-sm px-2 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="hover:text-primary disabled:opacity-50"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="hover:text-primary"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-600 p-1"
                                                title="Remove Item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-border bg-zinc-50 dark:bg-zinc-900 space-y-4">
                        <div className="flex items-center justify-between text-lg font-bold">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-secondary text-center">
                            Tax and shipping calculated at checkout.
                        </p>
                        <Link
                            href="/checkout"
                            onClick={toggleCart}
                            className="block w-full py-4 bg-primary text-primary-foreground font-black text-center uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
