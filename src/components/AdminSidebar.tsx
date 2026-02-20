'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, PlusCircle, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Orders', href: '/admin/orders', icon: Package },
        { name: 'Inventory', href: '/admin/inventory', icon: Package },
        // { name: 'Add Product', href: '/admin/inventory/new', icon: PlusCircle }, // Future
        // { name: 'Settings', href: '/admin/settings', icon: Settings }, // Future
    ];

    return (
        <aside className="w-64 bg-zinc-900 text-white flex-shrink-0 min-h-screen hidden md:flex flex-col">
            <div className="p-6 border-b border-zinc-800">
                <h1 className="text-xl font-bold uppercase tracking-wider">GDS Admin</h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                                ? 'bg-primary text-black font-bold'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                >
                    <LogOut size={20} />
                    <span>Exit to Store</span>
                </Link>
            </div>
        </aside>
    );
}
