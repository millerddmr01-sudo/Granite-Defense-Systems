import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <main className="flex flex-col items-center gap-8 text-center px-4">

        {/* Placeholder for Logo */}
        {/* Hero Title */}
        <div className="flex flex-col items-center w-full px-4">
          <div className="flex flex-col w-fit items-center">
            <h1 className="text-4xl sm:text-6xl md:text-8xl uppercase tracking-widest text-foreground text-center whitespace-nowrap" style={{ fontFamily: 'Impact, sans-serif' }}>
              Granite Defense Systems
            </h1>

            {/* 3 Blue Lines */}
            <div className="flex flex-col gap-1 w-full mt-2">
              <div className="w-full h-1 bg-primary"></div>
              <div className="w-full h-1 bg-primary"></div>
              <div className="w-full h-1 bg-primary"></div>
            </div>
          </div>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-secondary font-light uppercase tracking-wide whitespace-nowrap">
          Quality Custom Guns - Gunsmithing Services - Training
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/inventory-preview"
            className="px-8 py-3 bg-primary text-background font-bold text-lg rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            View Inventory
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border-2 border-primary text-primary font-bold text-lg rounded-sm hover:bg-primary/5 transition-colors flex items-center justify-center"
          >
            Contact Sales
          </Link>
        </div>

      </main>

      <footer className="absolute bottom-8 text-sm text-secondary">
        &copy; {new Date().getFullYear()} Granite Defense Systems. All Rights Reserved.
      </footer>
    </div>
  );
}
