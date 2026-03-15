import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

// Adding Next.js 15+ correct handling of params as a Promise
export default async function FalconDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const falconData: Record<string, { numeral: string, title: string, platform: string, caliber: string, mission: string, whySeries: string, buildDetails: string }> = {
        "i": { numeral: "I", title: "The Threshold", platform: "TBA", caliber: "TBA", mission: "The starting point of the system. A reliable, general-purpose rifle built to master the fundamentals of marksmanship and manual of arms.", whySeries: "TBA", buildDetails: "TBA" },
        "ii": { numeral: "II", title: "The Reach", platform: "TBA", caliber: "TBA", mission: "Optimized for speed and maneuverability. A shorter platform designed for tight spaces and rapid engagements within 100 yards.", whySeries: "TBA", buildDetails: "TBA" },
        "iii": { numeral: "III", title: "The Duty Carbine", platform: "TBA", caliber: "TBA", mission: "A precision-focused build pushing out beyond 500 yards. Featuring enhanced optics, heavier barrels, and refined trigger systems.", whySeries: "TBA", buildDetails: "TBA" },
        "iv": { numeral: "IV", title: "The Generalist", platform: "TBA", caliber: "TBA", mission: "Dedicated night-vision setup. Integrated IR lasers, illuminators, and passive aiming solutions for complete capability after dark.", whySeries: "TBA", buildDetails: "TBA" },
        "v": { numeral: "V", title: "The Shadow", platform: "TBA", caliber: "TBA", mission: "The do-all platform. A mid-length setup balancing weight, velocity, and maneuverability for maximum versatility in any environment.", whySeries: "TBA", buildDetails: "TBA" },
        "vi": { numeral: "VI", title: "The Sidearm", platform: "TBA", caliber: "TBA", mission: "Built specifically to be run suppressed 100% of the time. Tuned gas systems and optimized buffer weights for a peerless shooting experience.", whySeries: "TBA", buildDetails: "TBA" },
        "vii": { numeral: "VII", title: "The Precision Rifle", platform: "TBA", caliber: "TBA", mission: "Extreme portability. A folding, breakdown, or ultra-compact setup designed to be discreetly carried and rapidly deployed.", whySeries: "TBA", buildDetails: "TBA" },
        "viii": { numeral: "VIII", title: "The Breacher", platform: "TBA", caliber: "TBA", mission: "Stepping up in caliber. A platform built for barrier penetration and maximum ballistic effect on target.", whySeries: "TBA", buildDetails: "TBA" },
        "ix": { numeral: "IX", title: "The Sentinel", platform: "TBA", caliber: "TBA", mission: "Stripped of all excess. Ounces equal pounds, and this build is meticulously crafted to be carried all day without fatigue.", whySeries: "TBA", buildDetails: "TBA" },
        "x": { numeral: "X", title: "The Interceptor", platform: "TBA", caliber: "TBA", mission: "The supreme manifestation of the Falcon Series. A no-compromise, bespoke build that integrates every lesson learned from I through IX.", whySeries: "TBA", buildDetails: "TBA" },
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
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 bg-white p-12 rounded-2xl shadow-xl border border-zinc-200">
                    <div className="flex-1 w-full max-w-sm flex flex-col items-center justify-center bg-zinc-50 rounded-xl p-8 border border-zinc-100 shrink-0">
                        <div className="relative w-64 h-64 mb-6">
                            <Image
                                src={`/assets/falcon/Falcon_${data.numeral}_Logo.png`}
                                alt={`Falcon ${data.numeral}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-black font-serif text-zinc-900 tracking-tighter uppercase text-center mt-2 border-t border-zinc-200 pt-6 w-full">
                            {data.title}
                        </h1>
                    </div>

                    <div className="flex-[2] w-full space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-zinc-200">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-1">Platform</h3>
                                <p className="text-xl font-medium text-zinc-900">{data.platform}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-1">Caliber</h3>
                                <p className="text-xl font-medium text-zinc-900">{data.caliber}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">Mission</h3>
                            <p className="text-lg text-zinc-700 leading-relaxed font-light">
                                {data.mission}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">Why it's in the series</h3>
                            <p className="text-lg text-zinc-700 leading-relaxed font-light">
                                {data.whySeries}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">Build Details</h3>
                            <p className="text-lg text-zinc-700 leading-relaxed font-light bg-zinc-50 p-6 rounded-lg border border-zinc-100">
                                {data.buildDetails}
                            </p>
                        </div>
                        
                        <div className="pt-6">
                            <Link href="/contact" className="inline-block bg-zinc-900 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg w-full sm:w-auto text-center">
                                Inquire About Build
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
