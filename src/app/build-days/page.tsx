
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function BuildDaysPage() {
    const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

    const buildClasses = [
        {
            title: "Custom 10/22 Build Day",
            description: "Bring your stock 10/22 semi-automatic .22 LR rifle—or buy one and build a customized, general-purpose setup for plinking, target shooting, and small-game hunting. Configure it with an integral or direct-thread suppressor to keep things quiet, and add a night-vision or thermal optic to take this long-standing .22 LR semi-auto standard to a whole new level.",
            image: "/assets/build-days/10-22.jpg"
        },
        {
            title: "AR-9 (PCC) Build Day",
            description: "Build a reliable, soft-shooting AR-9 pistol caliber carbine from the ground up. You’ll assemble the lower and upper, learn PCC-specific parts (bolt, buffer/spring tuning, mags/feed geometry), then function-check and set up your optic and controls for fast, consistent performance.",
            image: "/assets/build-days/AR9.jpg"
        },
        {
            title: "AR-15 Build Day",
            description: "Assemble an AR-15 tailored to your purpose—home defense, range, or general use. You’ll build the lower and upper, torque and align key components, learn proper lubrication and maintenance, and leave with a rifle configured to your preferred barrel length, handguard, trigger, and optic setup.",
            image: "/assets/build-days/AR15.jpg"
        },
        {
            title: "AR-10 Build Day",
            description: "Build a .308/6.5 platform with an emphasis on reliability and recoil management. You’ll assemble the AR-10 upper and lower, learn the key compatibility considerations (pattern/parts fit, gas system, buffer system), perform a full function check, and set up your rifle for hunting, distance, or duty-style use.",
            image: "/assets/build-days/AR10.jpg"
        },
        {
            title: "Precision Rifle Build Day",
            description: "Build or refine a bolt-action precision rifle system focused on accuracy and repeatability. You’ll learn component selection and setup (action/barrel interface concepts, trigger, stock/chassis fit), properly mount and level an optic, and configure the rifle for your intended distance/role with a clear maintenance and upgrade path.",
            image: "/assets/build-days/Precision_Rifle.jpg"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4 relative">
            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full max-h-[90vh] bg-transparent rounded-lg overflow-hidden flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Build Days</h1>
                <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                    Join our expert armorers for hands-on build classes. Learn to assemble, maintain, and customize your platform.  You can follow our expert armorer’s recommendations or create your own custom component list for your build. Build with a group of friends or family, or on your own.
                </p>
            </div>

            {/* Class Cards */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
                {buildClasses.map((cls, idx) => (
                    <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 hover:shadow-lg transition-shadow flex flex-col">
                        <div className="flex-grow">
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">{cls.title}</h2>
                            <p className="text-secondary leading-relaxed mb-6">
                                {cls.description}
                            </p>
                        </div>
                        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
                            <button
                                onClick={() => setSelectedImage({ src: cls.image, alt: cls.title })}
                                className="inline-flex items-center gap-2 px-6 py-2 border-2 border-foreground text-foreground font-bold uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors rounded-sm"
                            >
                                View Build Example
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Sections */}
            <div className="max-w-4xl mx-auto space-y-12">
                <section className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
                    <h3 className="text-2xl font-bold uppercase mb-4 text-center">Included Items</h3>
                    <p className="text-center text-secondary leading-relaxed">
                        Granite Defense Systems provides the tools and the know-how. Once you have selected your platform and component list, we place the orders, and once everything has arrived, we schedule your build day.
                    </p>
                </section>

                <section className="text-center">
                    <h3 className="text-2xl font-bold uppercase mb-4">Schedule Your Build</h3>
                    <p className="text-secondary mb-8 max-w-xl mx-auto">
                        Call or email us today to schedule your build class. <br />
                        <span className="text-sm italic opacity-75">*Available dates will depend on the availability of the selected components.</span><br />
                        <span className="text-sm italic opacity-75">*The overall cost of the build will depend on the selected components.</span>
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block py-4 px-12 bg-foreground text-background font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
                    >
                        Contact Us to Book
                    </Link>
                </section>
            </div>
        </div>
    );
}
