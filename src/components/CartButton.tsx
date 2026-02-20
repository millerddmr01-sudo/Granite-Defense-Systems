"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function CartButton() {
    const { items, toggleCart } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <button
            onClick={toggleCart}
            className="px-4 py-2 bg-black text-white text-sm font-bold rounded-sm hover:bg-zinc-800 transition-colors uppercase tracking-wider flex items-center gap-2"
        >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart ({itemCount})</span>
        </button>
    );
}
