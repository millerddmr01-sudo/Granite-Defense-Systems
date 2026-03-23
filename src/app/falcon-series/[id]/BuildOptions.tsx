"use client";

import { useState } from "react";
import Link from "next/link";

type ComponentOption = {
    name: string;
    choices: string[];
};

type SilencerOption = {
    label: string;
    value: string;
    price: number;
};

type OpticOption = {
    label: string;
    value: string;
    price: number;
};

type OptionsProps = {
    basePrice?: number;
    silencer?: SilencerOption[];
    optics?: OpticOption[];
    components?: ComponentOption[];
};

export default function BuildOptions({ options, modelName }: { options: OptionsProps, modelName: string }) {
    const [silencer, setSilencer] = useState(options.silencer?.[0]?.value || "");
    const [optic, setOptic] = useState(options.optics?.[0]?.value || "");
    
    // Initialize default selections safely
    const initialSelections = options.components ? options.components.reduce((acc, comp) => {
        acc[comp.name] = comp.choices[0];
        return acc;
    }, {} as Record<string, string>) : {};
    
    const [selections, setSelections] = useState<Record<string, string>>(initialSelections);

    const handleComponentChange = (name: string, value: string) => {
        setSelections((prev) => ({ ...prev, [name]: value }));
    };

    const base = options.basePrice || 0;
    const silencerPrice = options.silencer?.find((s) => s.value === silencer)?.price || 0;
    const opticPrice = options.optics?.find((o) => o.value === optic)?.price || 0;
    const selectedPrice = base + silencerPrice + opticPrice;

    const inquiryParams = new URLSearchParams({
        model: modelName,
        ...(silencer && { silencer }),
        ...(optic && { optic }),
        ...selections
    });

    return (
        <div className="bg-zinc-50 p-8 rounded-lg border border-zinc-200 shadow-sm mt-4">
            <div className="space-y-8">
                {/* Optic Options */}
                {options.optics && options.optics.length > 0 && (
                    <div>
                        <h5 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-widest border-b border-zinc-200 pb-2">Optic Options</h5>
                        <div className="flex flex-col gap-3">
                            {options.optics.map((opt) => (
                                <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input 
                                            type="radio" 
                                            name="optic" 
                                            value={opt.value} 
                                            checked={optic === opt.value} 
                                            onChange={() => setOptic(opt.value)}
                                            className="appearance-none w-5 h-5 border-2 border-zinc-300 rounded-full checked:border-zinc-900 transition-colors cursor-pointer group-hover:border-zinc-500"
                                        />
                                        {optic === opt.value && (
                                            <div className="absolute w-2.5 h-2.5 bg-zinc-900 rounded-full pointer-events-none" />
                                        )}
                                    </div>
                                    <span className={`text-zinc-700 transition-colors ${optic === opt.value ? 'font-bold text-zinc-900' : 'group-hover:text-zinc-900'}`}>
                                        {opt.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Silencer Options */}
                {options.silencer && options.silencer.length > 0 && (
                    <div>
                        <h5 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-widest border-b border-zinc-200 pb-2">Suppressor Package</h5>
                        <div className="flex flex-col gap-3">
                            {options.silencer.map((opt) => (
                                <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input 
                                            type="radio" 
                                            name="silencer" 
                                            value={opt.value} 
                                            checked={silencer === opt.value} 
                                            onChange={() => setSilencer(opt.value)}
                                            className="appearance-none w-5 h-5 border-2 border-zinc-300 rounded-full checked:border-zinc-900 transition-colors cursor-pointer group-hover:border-zinc-500"
                                        />
                                        {silencer === opt.value && (
                                            <div className="absolute w-2.5 h-2.5 bg-zinc-900 rounded-full pointer-events-none" />
                                        )}
                                    </div>
                                    <span className={`text-zinc-700 transition-colors ${silencer === opt.value ? 'font-bold text-zinc-900' : 'group-hover:text-zinc-900'}`}>
                                        {opt.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Component Options */}
                {options.components && options.components.length > 0 && (
                    <div>
                        <h5 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-widest border-b border-zinc-200 pb-2">Component Finishes</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {options.components.map((comp) => (
                                <div key={comp.name}>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                        {comp.name}
                                    </label>
                                    <select 
                                        value={selections[comp.name]} 
                                        onChange={(e) => handleComponentChange(comp.name, e.target.value)}
                                        className="w-full bg-white border border-zinc-300 rounded p-3 text-zinc-900 font-medium focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all cursor-pointer shadow-sm hover:border-zinc-400"
                                    >
                                        {comp.choices.map((choice) => (
                                            <option key={choice} value={choice}>{choice}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Total & Checkout Block */}
            <div className="mt-8 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Total Build Cost</span>
                    <div className="text-3xl font-black text-zinc-900 font-serif">
                        ${selectedPrice.toLocaleString()}
                    </div>
                </div>
                <Link 
                    href={`/contact?${inquiryParams.toString()}`} 
                    className="inline-block bg-zinc-900 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg w-full sm:w-auto text-center"
                >
                    Add to Cart
                </Link>
            </div>
        </div>
    );
}
