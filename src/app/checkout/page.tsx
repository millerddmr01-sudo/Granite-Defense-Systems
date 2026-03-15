import { Metadata } from "next";
import CheckoutWrapper from "./CheckoutWrapper";

export const metadata: Metadata = {
    title: 'Checkout | Granite Defense Systems',
    description: 'Securely checkout your order at Granite Defense Systems.',
};

export default function CheckoutPage() {
    return <CheckoutWrapper />;
}
