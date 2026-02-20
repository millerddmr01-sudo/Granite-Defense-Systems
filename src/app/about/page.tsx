export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="bg-zinc-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                    Granite Defense Systems
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    Dedicated to providing premium firearms, components, and expert knowledge to the responsible community.
                </p>
            </div>

            {/* Core Pillars */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-12">Who We Are</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Pillar 1 */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-primary rounded-sm mb-6 flex items-center justify-center text-primary-foreground font-bold text-xl">1</div>
                        <h3 className="text-xl font-bold uppercase mb-3">Custom Builds & Retail</h3>
                        <p className="text-secondary leading-relaxed">
                            Check our inventory to see all the firearms we have in stock or our products page to see everything we offer. We also do custom builds, conversions, or help you assemble your own gun.
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-primary rounded-sm mb-6 flex items-center justify-center text-primary-foreground font-bold text-xl">2</div>
                        <h3 className="text-xl font-bold uppercase mb-3">Expert Gunsmithing</h3>
                        <p className="text-secondary leading-relaxed">
                            Full service from inspection and cleaning to trigger jobs, sight installation, and A2 front sight conversions. Our expert armorers ensure your firearm is safe and reliable.
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-primary rounded-sm mb-6 flex items-center justify-center text-primary-foreground font-bold text-xl">3</div>
                        <h3 className="text-xl font-bold uppercase mb-3">Customized Training</h3>
                        <p className="text-secondary leading-relaxed">
                            We understand that every student has different needs. We offer customized training programs tailored to your specific goals, from beginner safety to advanced tactical applications.
                        </p>
                    </div>
                </div>
            </div>

            {/* Location & Contact Info Section */}
            <div className="bg-zinc-100 dark:bg-zinc-900 py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Visit Us</h2>

                    <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                        <div>
                            <h4 className="font-bold uppercase text-sm text-zinc-500 mb-2">Location</h4>
                            <p className="text-lg font-medium">12172 S Aspen Brook Cir</p>
                            <p className="text-lg font-medium">Riverton, Utah 84065</p>
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-sm text-zinc-500 mb-2">Contact</h4>
                            <p className="text-lg font-medium">480-241-4522</p>
                            <p className="text-lg font-medium text-primary">derek@granitedefensesystems.com</p>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-background rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 inline-block">
                        <h4 className="font-bold uppercase mb-2">Hours of Operation</h4>
                        <p className="text-secondary">By Appointment Only</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
