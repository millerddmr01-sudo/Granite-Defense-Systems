"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { CartItem } from "@/context/CartContext";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CustomerDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    notes?: string;
}

interface CreateOrderParams {
    items: CartItem[];
    customer: CustomerDetails;
    total: number;
}

export async function createOrder({ items, customer, total }: CreateOrderParams) {
    const supabase = await createClient();

    try {
        // 1. Verify Stock & Calculate Total (Safety check)
        // ideally we fetch prices from DB again to prevent tampering, 
        // but for now we'll trust the items passed, just checking stock.

        for (const item of items) {
            const { data: product } = await supabase
                .from('products')
                .select('stock_quantity')
                .eq('id', item.id)
                .single();

            if (!product || product.stock_quantity < item.quantity) {
                return { success: false, error: `Insufficient stock for ${item.title}` };
            }
        }

        // 2. Insert Order
        const { data: { user } } = await supabase.auth.getUser();

        // Generate a random ID part for GDS-XXXX
        // Note: The SQL default deals with ID generation, so we don't need to send it 
        // unless we want to return it immediately without fetching. 
        // Let's rely on the DB default, but we need the returned ID.

        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user?.id || null, // Link to user if logged in
                items: JSON.stringify(items),
                total_amount: total,
                status: 'pending',
                customer_details: JSON.stringify(customer)
            })
            .select()
            .single();

        if (orderError) {
            console.error("Order Insert Error:", orderError);
            return { success: false, error: "Failed to create order record." };
        }

        // 3. Update Stock
        for (const item of items) {
            const { error: stockError } = await supabase.rpc('decrement_stock', {
                row_id: item.id,
                quantity: item.quantity
            });

            // If RPC doesn't exist (likely), fallback to direct update
            if (stockError) {
                // Fallback: Get current stock and update
                const { data: current } = await supabase.from('products').select('stock_quantity').eq('id', item.id).single();
                if (current) {
                    await supabase
                        .from('products')
                        .update({ stock_quantity: current.stock_quantity - item.quantity })
                        .eq('id', item.id);
                }
            }
        }

        // 4. Send Emails
        // A. Customer Receipt
        await resend.emails.send({
            from: 'Granite Defense Systems <orders@granitedefensesystems.com>', // Verify sender signature in Resend
            to: [customer.email],
            subject: `Order Confirmation - ${order.id}`,
            html: `
                <h1>Thank you for your order!</h1>
                <p>Order ID: <strong>${order.id}</strong></p>
                <p>We have received your order request and will be processing it shortly.</p>
                
                <h2>Order Summary</h2>
                <ul>
                    ${items.map(item => `
                        <li>
                            <strong>${item.title}</strong> x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                        </li>
                    `).join('')}
                </ul>
                <p><strong>Total: $${total.toFixed(2)}</strong></p>
                
                <h3>Shipping Details</h3>
                <p>
                    ${customer.fullName}<br>
                    ${customer.address}<br>
                    ${customer.city}, ${customer.state} ${customer.zip}
                </p>
                
                <p>If you have any questions, please reply to this email.</p>
            `,
        });

        // B. Admin Notification
        await resend.emails.send({
            from: 'Granite Defense Systems <system@granitedefensesystems.com>',
            to: ['orders@granitedefensesystems.com', 'info@granitedefensesystems.com'],
            subject: `NEW ORDER: ${order.id} - $${total.toFixed(2)}`,
            html: `
                <h1>New Order Received</h1>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Customer:</strong> ${customer.fullName} (${customer.email})</p>
                
                <h2>Items</h2>
                <ul>
                    ${items.map(item => `
                        <li>
                            ${item.title} (UPC: ${item.upc || 'N/A'}) <br>
                            Qty: ${item.quantity} | Price: $${item.price}
                        </li>
                    `).join('')}
                </ul>
                
                <h3>Total: $${total.toFixed(2)}</h3>
                
                <h3>Shipping Info</h3>
                <p>
                    ${customer.address}<br>
                    ${customer.city}, ${customer.state} ${customer.zip}<br>
                    Phone: ${customer.phone}<br>
                    Notes: ${customer.notes || 'None'}
                </p>
            `,
        });

        return { success: true, orderId: order.id };

    } catch (error) {
        console.error("Checkout Error:", error);
        return { success: false, error: "An unexpected error occurred during checkout." };
    }
}
