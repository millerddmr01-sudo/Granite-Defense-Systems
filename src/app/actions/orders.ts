"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const supabase = await createClient();

    try {
        // 1. Check Admin Auth
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Unauthorized");

        const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();

        if (!profile || !profile.is_admin) throw new Error("Unauthorized");

        // 2. Update Order Status
        const { data: order, error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId)
            .select() // Select to get customer info
            .single();

        if (error) throw new Error(error.message);

        // 3. Send Email Notification
        const customer = order.customer_details as any;

        if (customer && customer.email) {
            await resend.emails.send({
                from: 'Granite Defense Systems <orders@granitedefensesystems.com>',
                to: [customer.email],
                subject: `Order Update: ${orderId} is now ${newStatus.toUpperCase()}`,
                html: `
                    <h1>Order Update</h1>
                    <p>Hello ${customer.fullName},</p>
                    <p>The status of your order <strong>${orderId}</strong> has been updated to:</p>
                    <h2 style="color: #2563eb; text-transform: uppercase;">${newStatus}</h2>
                    <p>If you have any questions, please reply to this email.</p>
                    <br>
                    <p>Thank you,<br>Granite Defense Systems</p>
                `,
            });
        }

        revalidatePath('/admin/orders');
        return { success: true };

    } catch (error) {
        console.error("Update Order Error:", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}
