'use client';

import Link from "next/link";
import { useState } from "react";

export default function NavMenu() {
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

    // Categories mapping for URL friendly slugs
    // Categories mapping for URL friendly slugs
    const productCategories = [
        { name: 'Rifles', href: '/shop/rifles' },
        { name: 'Pistols', href: '/shop/pistols' },
        { name: 'Shotguns', href: '/shop/shotguns' },
        { name: 'NFA Items', href: '/shop/nfa' },
        { name: 'Optics', href: '/shop/optics' },
        { name: 'New Parts', href: '/shop/parts-new' },
        { name: 'Used Parts', href: '/shop/parts-used' },
        { name: 'Knives', href: '/knives' },
        { name: 'Custom Cases', href: '/custom-cases' },
        { name: 'Merch', href: '/shop/merch' },
    ];

    return (
        <div className="hidden lg:flex items-center gap-6 font-bold text-sm tracking-wide text-white">
            {/* Products Dropdown */}
            <div
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setIsProductMenuOpen(true)}
                onMouseLeave={() => setIsProductMenuOpen(false)}
            >
                <Link href="/shop" className="hover:text-black transition-colors py-2 flex items-center gap-1 uppercase">
                    Products
                    <svg className={`w-4 h-4 transition-transform ${isProductMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </Link>

                {/* Dropdown Panel */}
                <div className={`absolute top-20 left-0 w-64 bg-white text-black border-t-4 border-black shadow-2xl rounded-b-sm overflow-hidden transition-all duration-200 z-50 ${isProductMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                    <div className="py-2">
                        {productCategories.map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="block px-6 py-3 hover:bg-zinc-100 hover:text-primary transition-colors border-b border-zinc-100 last:border-0 font-medium normal-case"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Link href="/build-days" className="hover:text-black transition-colors uppercase">Build Days</Link>
            <Link href="/gunsmithing" className="hover:text-black transition-colors uppercase">Gunsmithing</Link>
            <Link href="/training" className="hover:text-black transition-colors uppercase">Training</Link>
            <Link href="/partners" className="hover:text-black transition-colors uppercase">Partners</Link>
            <Link href="/gallery" className="hover:text-black transition-colors uppercase">Gallery</Link>
            <Link href="/faq" className="hover:text-black transition-colors uppercase">FAQ</Link>
            <Link href="/about" className="hover:text-black transition-colors uppercase">About Us</Link>
            <Link href="/contact" className="hover:text-black transition-colors uppercase">Contact Us</Link>
        </div>
    );
}
