'use client';

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();

        // 1. Attempt Login
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
            return;
        }

        // 2. Strict Check: Ensure Email is Confirmed
        // Supabase might allow login even if unconfirmed depending on project settings,
        // but we want to ENFORCE it explicitly + refreshing user state ensures accuracy.
        const { data: { user } } = await supabase.auth.getUser();

        if (user && !user.email_confirmed_at) {
            setError("Please verify your email address before logging in. Check your inbox.");
            await supabase.auth.signOut(); // Force logout
            setLoading(false);
            return;
        }

        // 3. Success
        router.push('/');
        router.refresh(); // Refresh server components (Navbar state)
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-black uppercase tracking-tight">Welcome Back</h1>
                        <p className="text-secondary mt-2">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-sm border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-secondary">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold uppercase tracking-wider text-secondary">Password</label>
                                <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="text-center text-sm text-secondary">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary font-bold hover:underline">
                            Register Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Branding/Image */}
            <div className="hidden lg:block relative bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                {/* Placeholder background - could use a tactical image later */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-60"></div>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-12">
                    <div className="text-5xl font-black uppercase tracking-tighter mb-4">Granite Defense</div>
                    <p className="text-xl max-w-md text-zinc-300">Premium Firearms. Uncompromising Quality. Built for the mission.</p>
                </div>
            </div>
        </div>
    );
}
