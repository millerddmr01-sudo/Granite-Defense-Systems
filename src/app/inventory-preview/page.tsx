import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getPreviewItem(category: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .limit(1)
        .maybeSingle();
    return data;
}

export default async function InventoryPreviewPage() {
    const rifle = await getPreviewItem("rifle");
    const pistol = await getPreviewItem("pistol");

    // Try fetching 'nfa' category. Also try 'silencer' if 'nfa' is empty, just in case.
    let nfa = await getPreviewItem("nfa");
    if (!nfa) {
        const { data: silencer } = await (await createClient())
            .from("products")
            .select("*")
            .eq("category", "silencer")
            .limit(1)
            .maybeSingle();
        nfa = silencer;
    }

    const items = [
        { title: "Rifles", item: rifle, link: "/shop/rifles" },
        { title: "Pistols", item: pistol, link: "/shop/pistols" },
        { title: "NFA Items", item: nfa, link: "/shop/nfa" },
    ];

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Inventory Preview</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A small selection of our premium inventory. Visit the full shop to see everything we offer.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {items.map((section) => (
                        <div key={section.title} className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between border-b pb-2 border-border">
                                <h2 className="text-2xl font-bold uppercase tracking-tight">{section.title}</h2>
                                <Link href={section.link} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                                    View All <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {section.item ? (
                                <div className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow">
                                    <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900">
                                        {section.item.images?.[0] ? (
                                            <Image
                                                src={section.item.images[0]}
                                                alt={section.item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <h3 className="text-xl font-bold line-clamp-1">{section.item.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2 min-h-[2.5em]">
                                            {section.item.description || "No description available."}
                                        </p>
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-lg font-bold text-primary">
                                                ${section.item.price.toFixed(2)}
                                            </span>
                                            <Link
                                                href={`/products/${section.item.slug || section.item.id}`} // Fallback to ID if no slug
                                                className="px-4 py-2 bg-foreground text-background text-sm font-bold uppercase rounded-sm hover:opacity-90 transition-opacity"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg text-muted-foreground">
                                    No items in this category yet.
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center pt-8">
                    <Link
                        href="/shop"
                        className="px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider text-lg rounded-sm hover:opacity-90 transition-opacity shadow-lg"
                    >
                        Enter Full Shop
                    </Link>
                </div>
            </div>
        </div>
    );
}
