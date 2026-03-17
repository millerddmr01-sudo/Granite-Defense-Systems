'use client';

import Link from "next/link";
import { useState } from "react";
import { X, Menu, ChevronDown } from "lucide-react";

export default function NavMenu() {
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

    const productCategories = [
        { name: 'All Inventory', href: '/shop' },
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

    const navLinks = [
        { name: 'Build Days', href: '/build-days' },
        { name: 'Gunsmithing', href: '/gunsmithing' },
        { name: 'Training', href: '/training' },
        { name: 'Partners', href: '/partners' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'FAQ', href: '/faq' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <>
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 font-bold text-sm tracking-wide text-white">
                {/* Products Dropdown */}
                <div
                    className="relative group h-20 flex items-center"
                    onMouseEnter={() => setIsProductMenuOpen(true)}
                    onMouseLeave={() => setIsProductMenuOpen(false)}
                >
                    <Link href="/shop" className="hover:text-black transition-colors py-2 flex items-center gap-1 uppercase">
                        Products
                        <ChevronDown className={`w-4 h-4 transition-transform ${isProductMenuOpen ? 'rotate-180' : ''}`} />
                    </Link>
                    <div className={`absolute top-20 left-0 w-64 bg-white text-black border-t-4 border-black shadow-2xl rounded-b-sm overflow-hidden transition-all duration-200 z-50 ${isProductMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                        <div className="py-2">
                            {productCategories.map((cat) => (
                                <Link key={cat.name} href={cat.href} className="block px-6 py-3 hover:bg-zinc-100 hover:text-primary transition-colors border-b border-zinc-100 last:border-0 font-medium normal-case">
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="hover:text-black transition-colors uppercase">
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="lg:hidden text-white p-2 focus:outline-none"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
            >
                <Menu className="w-7 h-7" />
            </button>

            {/* Mobile Overlay Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-[200] flex flex-col bg-zinc-900 text-white overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 h-20 border-b border-zinc-700 shrink-0">
                        <span className="text-lg font-black uppercase tracking-widest" style={{ fontFamily: 'Impact, sans-serif' }}>
                            Granite Defense Systems
                        </span>
                        <button onClick={() => setIsMobileOpen(false)} aria-label="Close menu">
                            <X className="w-7 h-7" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-col px-6 py-6 gap-1 text-base font-bold uppercase tracking-wider">
                        {/* Products Accordion */}
                        <button
                            className="flex items-center justify-between w-full py-4 border-b border-zinc-700 text-left"
                            onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                        >
                            Products
                            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMobileProductsOpen && (
                            <div className="flex flex-col pl-4 pb-2">
                                {productCategories.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        href={cat.href}
                                        className="py-3 border-b border-zinc-800 text-zinc-300 hover:text-white transition-colors normal-case font-medium"
                                        onClick={() => setIsMobileOpen(false)}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="py-4 border-b border-zinc-700 hover:text-zinc-300 transition-colors"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}

