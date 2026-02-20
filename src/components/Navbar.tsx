import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NavMenu from "./NavMenu";
import CartButton from "./CartButton";

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="w-full h-20 border-b border-black bg-primary text-primary-foreground flex items-center justify-between px-6 sticky top-0 z-50 shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-white rounded-full p-1 overflow-hidden border-2 border-black shrink-0">
                    <img src="/granite-logo.png" alt="Granite Defense Systems" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-normal uppercase tracking-wide leading-none pt-1" style={{ fontFamily: 'Impact, sans-serif' }}>
                        Granite Defense Systems
                    </span>
                    <div className="w-full flex flex-col gap-[2px] mt-1">
                        <div className="w-full h-[1px] bg-white"></div>
                        <div className="w-full h-[1px] bg-white"></div>
                        <div className="w-full h-[1px] bg-white"></div>
                    </div>
                </div>
            </Link>

            {/* Navigation Links */}
            <NavMenu />

            {/* Cart / Account */}
            <div className="flex items-center gap-4">
                {user ? (
                    <Link href="/account" className="text-sm font-bold hover:text-black transition-colors">
                        ACCOUNT
                    </Link>
                ) : (
                    <Link href="/login" className="text-sm font-bold hover:text-black transition-colors">
                        SIGN IN
                    </Link>
                )}

                <CartButton />
            </div>
        </nav>
    );
}
