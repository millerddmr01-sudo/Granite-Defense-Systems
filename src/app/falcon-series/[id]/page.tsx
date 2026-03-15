import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

// Adding Next.js 15+ correct handling of params as a Promise
export default async function FalconDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const falconData: Record<string, { numeral: string, title: string, platform: string, caliber: string, mission: string, whySeries: string, buildDetails: string }> = {
        "i": { numeral: "I", title: "The Threshold", platform: "AR-9", caliber: "9×19mm", mission: "CQB fundamentals\nRepetition & muscle memory\nHigh-volume drills\nCost-efficient sustainment training", whySeries: "The Falcon I is the entry weapon to the Falcon Series. It allows operators to train AR manual-of-arms at high tempo without the cost or wear of rifle calibers. Same controls. Same feel. Maximum reps. Every serious armory starts with a trainer.", buildDetails: "Effective Range: 0–100 yards (optimized for CQB)" },
        "ii": { numeral: "II", title: "The Reach", platform: "AR-10", caliber: "6.5 Creedmoor", mission: "Long-range interdiction\nPrecision overwatch\nCounter-sniper capability\nOpen-terrain dominance", whySeries: "No modern fighting armory is complete without true standoff capability. The Falcon II extends the Falcon operator’s reach well beyond standard infantry distance, delivering precision, ballistic efficiency, and authority at range.", buildDetails: "Effective Range: 100–1,000 yards+" },
        "iii": { numeral: "III", title: "The Duty Carbine", platform: "MK18-inspired Carbine", caliber: "5.56×45", mission: "Primary fighting rifle\nCQB / urban operations\nVehicle deployment\nRapid target transition", whySeries: "The Falcon III is the workhorse. Proven. Compact. Indestructible. This is the rifle you grab when everything goes sideways. Modeled after one of the most battle-tested carbines in modern Special Operations history.", buildDetails: "Effective Range: 0–300 yards" },
        "iv": { numeral: "IV", title: "The Generalist", platform: "AR-15 (16\")", caliber: "5.56×45", mission: "General Purpose Rifle (GPR)\nMid-range dominance\nMulti-optic flexibility\nRural / mixed-terrain ops", whySeries: "Where the Duty Carbine excels up close, the Falcon IV owns the middle ground. With dual-optic capability, it transitions seamlessly from CQB to distance. This is the do-everything rifle every serious armory needs.", buildDetails: "Effective Range: 0–600 yards" },
        "v": { numeral: "V", title: "The Shadow", platform: "AR-15", caliber: ".300 Blackout", mission: "Suppressed operations\nLow-signature engagements\nCQB with enhanced terminal effect\nNight operations", whySeries: "The Falcon V is built for discretion. Optimized for suppressed use, it delivers authority in close quarters while minimizing blast and signature. This is the rifle for working in the dark.", buildDetails: "Effective Range: 0–300 yards (mission-dependent)" },
        "vi": { numeral: "VI", title: "The Sidearm", platform: "Duty Pistol (Full Kit)", caliber: "9×19mm", mission: "Secondary weapon system\nClose-contact defense\nWeapon transition under stress\nLast-line survivability", whySeries: "A rifle may fail. A pistol is always there. Falcon VI is built as a true fighting sidearm, fully equipped with battle belt integration. This is not a range gun — it’s a lifeline.", buildDetails: "Effective Range: 0–50 yards" },
        "vii": { numeral: "VII", title: "The Precision Rifle", platform: "Precision Bolt Gun", caliber: "6mm GT or 6.5 PRC", mission: "Precision engagement\nLong-range reconnaissance support\nCounter-sniper overwatch\nFirst-round hit capability", whySeries: "When precision matters more than speed, Falcon VII steps forward. This rifle teaches patience, discipline, and mastery of external ballistics — a hallmark of elite marksmanship.", buildDetails: "Effective Range: 300–1,600 yards+" },
        "viii": { numeral: "VIII", title: "The Breacher", platform: "Tactical Shotgun", caliber: "12 Gauge", mission: "Close-quarters dominance\nBreaching capability\nMaximum terminal effect\nIndoor / confined-space ops", whySeries: "No weapon delivers immediate authority like a shotgun in close quarters. Falcon VIII fills the shock-and-awe role in the armory — devastating, decisive, and purpose-built.", buildDetails: "Effective Range: 0–50 yards" },
        "ix": { numeral: "IX", title: "The Sentinel", platform: "Defensive Pistol Setup", caliber: "9×19mm", mission: "Home defense\nLow-light engagements\nRapid target acquisition\nImmediate response weapon", whySeries: "The Falcon IX is the final layer of defense — the weapon closest at hand when seconds matter. Lights, optics, and setup prioritize speed, clarity, and control under stress.", buildDetails: "Effective Range: 0–25 yards" },
        "x": { numeral: "X", title: "The Interceptor", platform: "Raider Chassis PDW (SIG P320–based)", caliber: "9×19mm", mission: "Personal Defense Weapon (PDW)\nVehicle-based response\nDiscreet carry in non-permissive environments\nRapid deployment from bag or vehicle\nClose-contact dominance beyond pistol capability", whySeries: "TBA", buildDetails: "TBA" },
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
                            <p className="text-lg text-zinc-700 leading-relaxed font-light whitespace-pre-line">
                                {data.mission}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">Why it's in the series</h3>
                            <p className="text-lg text-zinc-700 leading-relaxed font-light whitespace-pre-line">
                                {data.whySeries}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3">Build Details</h3>
                            <p className="text-lg text-zinc-700 leading-relaxed font-light bg-zinc-50 p-6 rounded-lg border border-zinc-100 whitespace-pre-line">
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
