import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import CartSheet from "@/components/CartSheet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Granite Defense Systems",
  description: "Premium Firearms, Parts, and Tactical Gear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <AgeVerificationModal />
          <CartSheet />
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
