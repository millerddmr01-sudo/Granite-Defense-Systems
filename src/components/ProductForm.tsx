'use client';

import { createProduct, updateProduct } from "@/app/actions/inventory";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Database } from "@/types/database.types";

type Product = Database['public']['Tables']['products']['Row'];

interface ProductFormProps {
    initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const isEditMode = !!initialData;

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError("");

        let res;

        if (isEditMode && initialData) {
            // Append ID for update
            formData.append("id", initialData.id);
            res = await updateProduct(formData);
        } else {
            res = await createProduct(formData);
        }

        if (res.success) {
            router.push("/admin/inventory");
            router.refresh(); // Ensure the list updates
        } else {
            setError(res.error || "Something went wrong");
            setIsLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="bg-white dark:bg-zinc-950 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold mb-2">Title *</label>
                    <input
                        name="title"
                        required
                        defaultValue={initialData?.title}
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold mb-2">UPC</label>
                    <input
                        name="upc"
                        defaultValue={initialData?.upc || ""}
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold mb-2">MPN</label>
                    <input
                        name="mpn"
                        defaultValue={initialData?.mpn || ""}
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Category *</label>
                    <select
                        name="category"
                        required
                        defaultValue={initialData?.category || ""}
                        className="w-full px-4 py-2 bg-black text-white border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    >
                        <option value="">Select a Category</option>
                        <option value="rifle">Rifle</option>
                        <option value="pistol">Pistol</option>
                        <option value="shotgun">Shotgun</option>
                        <option value="nfa">NFA/Silencer</option>
                        <option value="upper">Upper</option>
                        <option value="lower">Lower</option>
                        <option value="optic">Optic</option>
                        <option value="accessory">Accessory</option>
                        <option value="gear">Gear</option>
                        <option value="part">Part</option>
                        <option value="new_part">New Part</option>
                        <option value="used_part">Used Part</option>
                        <option value="knife">Knife</option>
                        <option value="case">Case</option>
                        <option value="merch">Merch</option>
                        <option value="service">Service</option>
                        <option value="training">Training</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Price *</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-zinc-400">$</span>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            required
                            defaultValue={initialData?.price}
                            className="w-full pl-8 pr-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Stock Quantity *</label>
                    <input
                        name="stock_quantity"
                        type="number"
                        defaultValue={initialData?.stock_quantity ?? 1}
                        required
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Caliber</label>
                    <input
                        name="caliber"
                        placeholder="e.g. 9mm"
                        defaultValue={initialData?.caliber || ""}
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Manufacturer</label>
                    <input
                        name="manufacturer"
                        defaultValue={initialData?.manufacturer || ""}
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Model</label>
                    <input
                        name="model"
                        defaultValue={initialData?.model || ""}
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-bold mb-2">Product Image</label>

                    {initialData?.images?.[0] && (
                        <div className="mb-4">
                            <p className="text-xs text-secondary mb-2">Current Image:</p>
                            <img src={initialData.images[0]} alt="Current" className="h-32 w-auto object-contain rounded border border-zinc-200" />
                        </div>
                    )}

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    <p className="text-xs text-secondary mt-1">
                        {isEditMode ? "Upload a new image to replace the current one." : "Upload a product image (JPG, PNG, WebP). Leave blank to use a placeholder."}
                    </p>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        defaultValue={initialData?.description || ""}
                        className="w-full px-4 py-2 bg-transparent border border-zinc-200 dark:border-zinc-700 rounded focus:border-primary outline-none"
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" disabled={isLoading} className="bg-primary text-black font-bold px-8 py-3 rounded-sm hover:opacity-90 transition-opacity flex items-center">
                    {isLoading && <Loader2 className="animate-spin mr-2" size={20} />}
                    {isEditMode ? "Update Product" : "Create Product"}
                </button>
            </div>

        </form>
    );
}
