export default function GunsmithingPage() {
    const services = [
        {
            category: "Inspection / Cleaning",
            description: "Professional firearm inspection and cleaning services.",
            items: [
                {
                    title: "Firearm Inspection",
                    description: "10+ item checklist to verify status of firearm (semi-auto handguns, revolvers, rifles & shotguns).",
                    price: 50
                },
                {
                    title: "Field Strip and Clean",
                    description: "Basic cleaning and oiling for maintenance and reliability.",
                    price: 35
                },
                {
                    title: "Deep Clean Service",
                    description: "Total disassembly, ultra-sonic cleaning with commercial solvent, reassembly, and oiling.",
                    price: 80
                }
            ]
        },
        {
            category: "Sights & Optics",
            description: "Precision sight work for pistols and rifles.",
            items: [
                {
                    title: "Sight Installation",
                    description: "Front/Rear installation of customer supplied sights.",
                    price: 35
                },
                {
                    title: "Bore Sight",
                    description: "Pre-align the barrel's bore axis with scope/sight crosshairs using laser and VizMax technology.",
                    price: 25
                },
                {
                    title: "Scope Mount & Leveling",
                    description: "Precise positioning for correct eye relief, leveling verification, and torque-spec mounting.",
                    price: 40
                }
            ]
        },
        {
            category: "NFA Services",
            description: "Compliance and customization for regulated items.",
            items: [
                {
                    title: "Pin & Weld",
                    description: "Permanent attachment of muzzle devices to reach 16\" barrel length compliance.",
                    price: 120
                },
                {
                    title: "Suppressor Alignment Check",
                    description: "Verify concentricity of suppressor and bore to prevent baffle strikes.",
                    price: 50
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Gunsmithing Services</h1>
                <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                    Our certified armorers provide professional maintenance and customization services to keep your platform performing at its peak.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {services.map((service, idx) => (
                    <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-2">{service.category}</h2>
                        <p className="text-secondary mb-8">{service.description}</p>

                        <div className="space-y-6">
                            {service.items.map((item, i) => (
                                <div key={i} className="pb-6 border-b border-zinc-200 dark:border-zinc-800 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-primary">{item.title}</h3>
                                        <span className="font-bold text-lg text-foreground bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-sm">
                                            ${item.price}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="text-secondary mb-6">Need a custom quote or service not listed here?</p>
                <a
                    href="/contact"
                    className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
                >
                    Contact Our Armorers
                </a>
            </div>
        </div>
    );
}
