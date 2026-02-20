import Image from "next/image";
import Link from "next/link";

export default function PartnersPage() {
    const partners = [
        { name: "Rise Armament", url: "https://risearmament.com/", logo: "/images/partners/risearmament.webp" },
        { name: "Hogue", url: "https://www.hogueinc.com/", logo: "/images/partners/hogue_inc_icon_black.png" },
        { name: "Quentin Defense / Kinetic Suppressors", url: "https://quentindefense.com/", logo: "/images/partners/Quentin_Defense.png" },
        { name: "Ballistic Advantage", url: "https://www.ballisticadvantage.com/", logo: "/images/partners/Ballistic_Advantage.png" },
        { name: "Black Scorpion Outdoor Gear", url: "https://www.blackscorpiongear.com/", logo: "/images/partners/Black_Scorpion_Outdoor_Gear.jpg" },
        { name: "Primary Arms", url: "https://www.primaryarms.com/", logo: "/images/partners/Primary_Arms.png" },
        { name: "ToolCraft", url: "https://www.toolcraftinc.com/", logo: "/images/partners/Toolcraft_logo.jpg" },
        { name: "Aero Precision", url: "https://www.aeroprecisionusa.com/", logo: "/images/partners/Aero Precision.jpg" },
        { name: "Mid State Firearms", url: "https://midstatefirearms.com/", logo: "/images/partners/MSF_Logo.png" },
        { name: "Phase 5", url: "https://phase5wsi.com/", logo: "/images/partners/Phase_5_Logo.jpg" },
        { name: "Geissele Automatic Systems", url: "https://geissele.com/", logo: "/images/partners/Geissele_Logo.png" },
        { name: "Angstadt Arms", url: "https://angstadtarms.com/", logo: "/images/partners/Angstadt_Arms_Logo.png" },
        { name: "Aegis Cerakote & Gunworks", url: "https://www.aegiscerakote.com/", logo: "/images/partners/Aeigis_Cerakote_logo.jpg" },
        { name: "MGM Targets", url: "https://mgmtargets.com/", logo: "/images/partners/MGM_Targets.png" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Our Partners</h1>
                <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                    We proudly work with the industry's best manufacturers to bring you top-tier components and gear.
                </p>
            </div>

            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {partners.map((partner) => (
                        <Link
                            key={partner.name}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-all group aspect-[3/2]"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={partner.logo}
                                    alt={`${partner.name} Logo`}
                                    fill
                                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
