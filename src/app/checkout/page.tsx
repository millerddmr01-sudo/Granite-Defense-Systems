import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Checkout | Granite Defense Systems',
    description: 'Securely checkout your order at Granite Defense Systems.',
};

const CheckoutClient = dynamic(() => import("./CheckoutClient"), {
    ssr: false,
});

export default function CheckoutPage() {
    return <CheckoutClient />;
}
