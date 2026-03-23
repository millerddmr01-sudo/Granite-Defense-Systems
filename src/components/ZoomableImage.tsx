"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div 
                className="relative w-full h-80 mt-8 cursor-zoom-in group"
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm p-4 cursor-zoom-out"
                    onClick={() => setIsOpen(false)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white hover:text-zinc-300 transition-colors p-2"
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative w-full max-w-5xl aspect-video cursor-default" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
