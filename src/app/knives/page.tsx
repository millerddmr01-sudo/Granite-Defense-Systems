import Link from "next/link";
import Image from "next/image";

export default function KnivesPage() {
    const manufacturers = [
        { name: 'Browning', url: 'https://www.browning.com', logo: '/logos/browning.png' },
        { name: 'Camillus', url: 'https://www.camillusknives.com', logo: '/logos/camillus.png' },
        { name: 'Case', url: 'https://caseknives.com', logo: '/logos/case.png' },
        { name: 'Cobra Tec', url: 'https://cobratecknives.com', logo: '/logos/cobratec.png' },
        { name: 'Cold Steel', url: 'https://www.coldsteel.com', logo: '/logos/cold_steel.jpg' },
        { name: 'CRKT', url: 'https://www.crkt.com', logo: '/logos/crkt.png' },
        { name: 'Hogue', url: 'https://www.hogueinc.com', logo: '/logos/hogue.jpg' },
        { name: 'KA-BAR', url: 'https://www.ka-bar.com', logo: '/logos/ka-bar.png' },
        { name: 'Kershaw', url: 'https://kershaw.kaiusa.com', logo: '/logos/kershaw.png' },
        { name: 'Mantis', url: 'https://mantis-knives.com', logo: '/logos/mantis.jpg' },
        { name: 'Schrade', url: 'https://www.schrade.com', logo: '/logos/schrade.png' },
        { name: 'SOG', url: 'https://sogknives.com', logo: '/logos/sog.png' },
        { name: 'Spyderco', url: 'https://www.spyderco.com', logo: '/logos/spyderco.png' },
        { name: 'Stroup Knives', url: 'https://stroupknives.com', logo: '/logos/stroup.png' },
        { name: 'Templar', url: 'https://templarknife.com', logo: '/logos/templar.png' },
        { name: 'Xcaliber', url: 'https://xcalibertactical.com', logo: '/logos/xcaliber.jpg' },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <div className="bg-zinc-900 text-white py-16 text-center">
                <h1 className="text-5xl md:text-7xl uppercase tracking-widest whitespace-nowrap mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>
                    Edged Weapons
                </h1>
                <p className="text-xl text-zinc-400 font-light uppercase tracking-wide">
                    Premier Blades for Every Mission
                </p>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Spotlight Section */}
                <h2 className="text-3xl font-black uppercase tracking-tight mb-8 border-b-4 border-primary inline-block pr-8">
                    Featured Spotlights
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Spotlight 1: Kershaw */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div className="h-64 bg-white flex items-center justify-center relative overflow-hidden p-4">
                            <img
                                src="/spotlight/kershaw_7550.jpg"
                                alt="Kershaw 7550 Launch 11"
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-8 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-primary font-bold uppercase tracking-wider text-sm">Kershaw</div>
                                <div className="text-xl font-black text-foreground">$150.00</div>
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3 leading-none">7550 Launch 11</h3>
                            <p className="text-secondary mb-6 text-sm leading-relaxed flex-grow">
                                Automatic 2.75" Folding Drop Point Plain Black Oxide Blackwash CPM 154 SS Blade, Black Anodized Aluminum Handle. Includes Pocket Clip.
                            </p>
                            <button className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wide rounded-sm hover:bg-zinc-800 transition-colors w-full">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Spotlight 2: Hogue */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div className="h-64 bg-white flex items-center justify-center relative overflow-hidden p-4">
                            <img
                                src="/spotlight/hogue_ex-f02.jpg"
                                alt="Hogue Knives EX-F02"
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-8 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-primary font-bold uppercase tracking-wider text-sm">Hogue Knives</div>
                                <div className="text-xl font-black text-foreground">$129.95</div>
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3 leading-none">EX-F02 Fixed Blade</h3>
                            <p className="text-secondary mb-6 text-sm leading-relaxed flex-grow">
                                4.5" Clip Point Blade - Stone Tumbled. Black Polymer Frame & Black OverMolded® Rubber Insert.
                            </p>
                            <button className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wide rounded-sm hover:bg-zinc-800 transition-colors w-full">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Manufacturers Grid */}
                < h2 className="text-3xl font-black uppercase tracking-tight mb-8 border-b-4 border-primary inline-block pr-8" >
                    Our Partners
                </h2 >

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {manufacturers.map((brand) => (
                        <a
                            key={brand.name}
                            href={brand.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-primary transition-colors duration-300 aspect-video relative"
                        >
                            {brand.logo ? (
                                <div className="relative w-full h-full p-4">
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                    />
                                </div>
                            ) : (
                                <span className="text-xl font-black uppercase tracking-tighter text-zinc-400 group-hover:text-primary transition-colors text-center">
                                    {brand.name}
                                </span>
                            )}

                            <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-primary uppercase tracking-widest">
                                Visit Website &rarr;
                            </div>
                        </a>
                    ))}
                </div>
            </div >
        </div >
    );
}
