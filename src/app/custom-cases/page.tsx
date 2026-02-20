import Link from "next/link";

export default function CustomCasesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="bg-zinc-900 text-white py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl uppercase tracking-widest whitespace-nowrap mb-6" style={{ fontFamily: 'Impact, sans-serif' }}>
                        Custom Foam Inserts
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-3xl mx-auto mb-10">
                        Protect Your Gear with Precision
                    </p>

                    <a
                        href="https://www.gds-foam.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
                    >
                        Visit GDS-Foam.com
                    </a>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-700">
                        <img
                            src="/custom-cases-showcase.png"
                            alt="Custom Foam Case Showcase"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-black uppercase tracking-tight">Precision Protection</h2>
                        <p className="text-lg text-secondary leading-relaxed">
                            Granite Defense Systems partners with GDS Foam to provide the highest quality custom foam inserts on the market. Using advanced scanning and cutting technology, we ensure a perfect fit for every piece of your kit.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span className="font-medium">Custom Layout Design</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span className="font-medium">High-Density Closed Cell Foam</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <span className="font-medium">Precision CNC Cutting</span>
                            </li>
                        </ul>

                        <div className="pt-4">
                            <a
                                href="https://www.gds-foam.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-bold uppercase tracking-wide hover:underline underline-offset-4"
                            >
                                Start Your Custom Build &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
