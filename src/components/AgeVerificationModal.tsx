"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export default function AgeVerificationModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [age, setAge] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [status, setStatus] = useState<"input" | "denied">("input");
    const [error, setError] = useState("");

    useEffect(() => {
        // Check local storage on mount
        const verified = localStorage.getItem("age_verified");
        if (!verified) {
            setIsVisible(true);
            // Prevent scrolling when modal is open
            document.body.style.overflow = "hidden";
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!age) {
            setError("Please enter your age to continue.");
            return;
        }

        if (!agreed) {
            setError("You must agree to the Terms and Conditions.");
            return;
        }

        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum)) {
            setError("Please enter a valid number.");
            return;
        }

        if (ageNum < 18) {
            setStatus("denied");
        } else {
            // Success
            localStorage.setItem("age_verified", "true");
            setIsVisible(false);
            document.body.style.overflow = "unset";
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
            <div className="bg-white text-black border-2 border-[#00AEEF] rounded-lg shadow-2xl max-w-md w-full p-8 relative overflow-hidden">

                {status === "input" ? (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <ShieldCheck className="w-12 h-12 mx-auto text-[#00AEEF]" />
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Age Verification</h2>
                            <p className="text-zinc-600 text-sm">
                                Please confirm your age to enter.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="age" className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Enter your age
                                </label>
                                <input
                                    id="age"
                                    type="number"
                                    placeholder="e.g. 21"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    min="0"
                                    max="120"
                                />
                            </div>

                            <div className="flex items-start space-x-2 pt-2">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="h-4 w-4 rounded border-[#00AEEF] text-[#00AEEF] focus:ring-[#00AEEF] mt-1"
                                />
                                <label htmlFor="terms" className="text-sm text-zinc-600 cursor-pointer select-none">
                                    I agree to the <span className="underline decoration-dotted underline-offset-2 hover:text-[#00AEEF]">Terms and Conditions</span> of this website and certify that I am accessing this site in accordance with local laws.
                                </label>
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm font-medium flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-zinc-800 h-10 px-4 py-2 uppercase tracking-wider"
                            >
                                Enter Website
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold uppercase text-red-600 dark:text-red-500">Access Denied</h2>
                        <p className="text-muted-foreground">
                            You must be at least 18 years of age to access this website.
                        </p>
                        <div className="pt-4">
                            <Link href="https://google.com" className="text-sm text-primary underline hover:text-primary/80">
                                Leave Website
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
