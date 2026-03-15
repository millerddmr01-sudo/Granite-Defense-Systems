import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

// Adding Next.js 15+ correct handling of params as a Promise
export default async function FalconDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const falconData: Record<string, { numeral: string, description: string, role: string }> = {
        "i": { numeral: "I", role: "Foundation", description: "The starting point of the system. A reliable, general-purpose rifle built to master the fundamentals of marksmanship and manual of arms." },
        "ii": { numeral: "II", role: "Close Quarters", description: "Optimized for speed and maneuverability. A shorter platform designed for tight spaces and rapid engagements within 100 yards." },
        "iii": { numeral: "III", role: "Extended Range", description: "A precision-focused build pushing out beyond 500 yards. Featuring enhanced optics, heavier barrels, and refined trigger systems." },
        "iv": { numeral: "IV", role: "Night Operations", description: "Dedicated night-vision setup. Integrated IR lasers, illuminators, and passive aiming solutions for complete capability after dark." },
        "v": { numeral: "V", role: "The Generalist", description: "The do-all platform. A mid-length setup balancing weight, velocity, and maneuverability for maximum versatility in any environment." },
        "vi": { numeral: "VI", role: "Suppressed Platform", description: "Built specifically to be run suppressed 100% of the time. Tuned gas systems and optimized buffer weights for a peerless shooting experience." },
        "vii": { numeral: "VII", role: "Backpack & Mobility", description: "Extreme portability. A folding, breakdown, or ultra-compact setup designed to be discreetly carried and rapidly deployed." },
        "viii": { numeral: "VIII", role: "Heavy Hitter", description: "Stepping up in caliber. A platform built for barrier penetration and maximum ballistic effect on target." },
        "ix": { numeral: "IX", role: "The Lightweight", description: "Stripped of all excess. Ounces equal pounds, and this build is meticulously crafted to be carried all day without fatigue." },
        "x": { numeral: "X", role: "The Capstone", description: "The supreme manifestation of the Falcon Series. A no-compromise, bespoke build that integrates every lesson learned from I through IX." },
    };

    const data = falconData[id.toLowerCase()];

    if (!data) {
        notFound();
    }

    return (
        <div className="bg-zinc-50 min-h-screen text-zinc-900 pb-20">
            {/* Header */}
            <section className="bg-zinc-900 border-b-4 border-zinc-700">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <nav className="flex text-sm text-zinc-400 font-medium tracking-wide">
                        <Link href="/build-days" className="hover:text-white transition-colors">Build Days</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link href="/falcon-series" className="hover:text-white transition-colors">Falcon Series</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-white">Falcon {data.numeral}</span>
                    </nav>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 bg-white p-12 rounded-2xl shadow-xl border border-zinc-200">
                    <div className="flex-1 w-full flex flex-col items-center justify-center bg-zinc-50 rounded-xl p-8 border border-zinc-100">
                        <div className="relative w-48 h-48 mb-6">
                            <Image
                                src="/assets/Falcon_Fund_Logo.png"
                                alt={`Falcon ${data.numeral}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-5xl font-black font-serif text-zinc-900 tracking-tighter uppercase">
                            Falcon {data.numeral}
                        </h1>
                        <span className="inline-block mt-4 px-4 py-1 bg-zinc-900 text-white font-bold uppercase tracking-widest text-sm rounded-full">
                            {data.role}
                        </span>
                    </div>

                    <div className="flex-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold uppercase tracking-widest text-zinc-500 mb-4 border-b border-zinc-200 pb-2">Mission Parameters</h2>
                            <p className="text-xl text-zinc-700 leading-relaxed font-light">
                                {data.description}
                            </p>
                        </div>
                        
                        <div className="pt-8">
                            <p className="text-zinc-500 italic mb-6">Component selection and armorer guidance will be tailored exclusively to this mission profile.</p>
                            <Link href="/contact" className="inline-block bg-zinc-900 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg">
                                Inquire About Build
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
