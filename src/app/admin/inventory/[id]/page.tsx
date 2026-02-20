import { createClient } from "@/lib/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/ProductForm";

interface EditProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/inventory" className="flex items-center text-secondary hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Inventory
            </Link>

            <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

            <ProductForm initialData={product} />
        </div>
    );
}
