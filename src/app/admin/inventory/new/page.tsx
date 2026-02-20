'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductForm from "@/components/ProductForm";

export default function AddProductPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/inventory" className="flex items-center text-secondary hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Inventory
            </Link>

            <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

            <ProductForm />
        </div>
    );
}
