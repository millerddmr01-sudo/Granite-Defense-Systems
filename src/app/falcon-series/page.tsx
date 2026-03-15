import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function FalconSeriesPage() {
    const panels = [
        { id: "i", numeral: "I" },
        { id: "ii", numeral: "II" },
        { id: "iii", numeral: "III" },
        { id: "iv", numeral: "IV" },
        { id: "v", numeral: "V" },
        { id: "vi", numeral: "VI" },
        { id: "vii", numeral: "VII" },
        { id: "viii", numeral: "VIII" },
        { id: "ix", numeral: "IX" },
        { id: "x", numeral: "X" }
    ];

    return (
        <div className="bg-white min-h-screen text-zinc-900 pb-20">
            {/* Header */}
            <section className="bg-zinc-900 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="w-full flex justify-start mb-8">
                        <Link href="/build-days" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Build Days
                        </Link>
                    </div>
                    <div className="relative w-48 h-48 mb-8">
                        <Image
                            src="/assets/Falcon_Fund_Logo.png"
                            alt="The Falcon Series"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">The Falcon Series</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Built, Not Bought. A disciplined progression—a modern fighting armory assembled with intent, purpose, and mastery.
                    </p>
                </div>
            </section>

            {/* Panels Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {panels.map((panel) => (
                        <Link href={`/falcon-series/${panel.id}`} key={panel.id} className="group cursor-pointer">
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                                <div className="p-8 pb-4 flex flex-col items-center text-center grow">
                                    <div className="relative w-32 h-32 mb-6 group-hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src="/assets/Falcon_Fund_Logo.png"
                                            alt={`Falcon ${panel.numeral}`}
                                            fill
                                            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold font-serif uppercase text-zinc-900">
                                        Falcon {panel.numeral}
                                    </h2>
                                </div>
                                <div className="bg-zinc-100 items-center justify-center p-4 border-t border-zinc-200 text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white transition-colors flex">
                                    View Intel
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
