'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Check if user is admin helper
async function checkAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

    if (!profile || !profile.is_admin) throw new Error("Forbidden");

    return supabase;
}

export async function updateStock(id: string, quantity: number) {
    try {
        const supabase = await checkAdmin();

        const { error } = await supabase
            .from("products")
            .update({ stock_quantity: quantity })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Update Stock Error:", error);
        return { success: false, error: "Failed to update stock" };
    }
}

export async function updatePrice(id: string, price: number) {
    try {
        const supabase = await checkAdmin();

        const { error } = await supabase
            .from("products")
            .update({ price: price })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Update Price Error:", error);
        return { success: false, error: "Failed to update price" };
    }
}

export async function deleteProduct(id: string) {
    try {
        const supabase = await checkAdmin();

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Delete Product Error:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

export async function createProduct(formData: FormData) {
    try {
        const supabase = await checkAdmin();

        const title = formData.get("title") as string;
        const upc = formData.get("upc") as string;
        const mpn = formData.get("mpn") as string;
        const manufacturer = formData.get("manufacturer") as string;
        const model = formData.get("model") as string;
        const category = formData.get("category") as string;
        const caliber = formData.get("caliber") as string;
        const price = parseFloat(formData.get("price") as string);
        const stock_quantity = parseInt(formData.get("stock_quantity") as string);
        const description = formData.get("description") as string;
        const imageFile = formData.get("image") as File;

        // Validation
        if (!title || !price || !category) {
            return { success: false, error: "Missing required fields" };
        }

        let imageUrl = "";

        // Handle Image Upload
        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `products/${fileName}`; // Clean path

            const { error: uploadError } = await supabase.storage
                .from('inventory')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error("Upload Error:", uploadError);
                // Continue without image or throw? Let's throw for now to warn user.
                throw new Error("Failed to upload image: " + uploadError.message);
            }

            const { data: { publicUrl } } = supabase.storage
                .from('inventory')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const { error } = await supabase
            .from("products")
            .insert({
                title,
                upc,
                mpn,
                manufacturer,
                model,
                category: category as any, // Cast to enum
                caliber,
                price,
                stock_quantity,
                description,
                images: imageUrl ? [imageUrl] : [],
                status: 'active'
            });

        if (error) throw error;

        revalidatePath("/admin/inventory");
        revalidatePath("/shop"); // Revalidate shop pages roughly
        return { success: true };
    } catch (error: any) {
        console.error("Create Product Error:", error);
        return { success: false, error: error.message || "Failed to create product" };
    }
}

export async function updateProduct(formData: FormData) {
    try {
        const supabase = await checkAdmin();

        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const upc = formData.get("upc") as string;
        const mpn = formData.get("mpn") as string;
        const manufacturer = formData.get("manufacturer") as string;
        const model = formData.get("model") as string;
        const category = formData.get("category") as string;
        const caliber = formData.get("caliber") as string;
        const price = parseFloat(formData.get("price") as string);
        const stock_quantity = parseInt(formData.get("stock_quantity") as string);
        const description = formData.get("description") as string;
        const imageFile = formData.get("image") as File;

        if (!id || !title || !price || !category) {
            return { success: false, error: "Missing required fields" };
        }

        const updates: any = {
            title,
            upc,
            mpn,
            manufacturer,
            model,
            category: category as any,
            caliber,
            price,
            stock_quantity,
            description,
        };

        // Handle Image Upload
        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `products/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('inventory')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error("Upload Error:", uploadError);
                throw new Error("Failed to upload image: " + uploadError.message);
            }

            const { data: { publicUrl } } = supabase.storage
                .from('inventory')
                .getPublicUrl(filePath);

            updates.images = [publicUrl]; // Overwrite image array with new one
        }

        const { error } = await supabase
            .from("products")
            .update(updates)
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        return { success: true };
    } catch (error: any) {
        console.error("Update Product Error:", error);
        return { success: false, error: error.message || "Failed to update product" };
    }
}
