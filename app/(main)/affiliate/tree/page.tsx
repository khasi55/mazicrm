"use client";

import { motion } from "framer-motion";
import { Network, User, ChevronRight, Share2, Info } from "lucide-react";

export default function AffiliateTreePage() {
    // This would ideally be dynamic from the backend
    const mockTree = {
        name: "You (IB)",
        referrals: [
            {
                name: "Level 1 Team",
                count: 12,
                children: [
                    { name: "Trader Alpha", volume: "$45k" },
                    { name: "Trader Beta", volume: "$12k" },
                    { name: "Sub-IB Mike", subCount: 4 }
                ]
            },
            {
                name: "Level 2 Team",
                count: 45,
                children: []
            }
        ]
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">IB Tree Chart</h1>
                    <p className="text-slate-500 text-sm mt-1">Visualize your referral network hierarchy</p>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                    <Share2 size={16} />
                    Export Map
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-8 min-h-[600px] relative overflow-hidden flex items-center justify-center">
                    {/* Visual Placeholder for Tree */}
                    <div className="relative flex flex-col items-center gap-12 z-10 w-full">
                        <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-white border-4 border-slate-100 shadow-2xl">
                            <User size={32} />
                        </div>

                        <div className="w-px h-12 bg-slate-200" />

                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="relative flex flex-col items-center gap-6">
                                    <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                                        <Network size={24} />
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-slate-900 text-sm">Zone {i}</div>
                                        <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">1{i} ACTIVE</div>
                                    </div>

                                    <div className="w-px h-8 bg-slate-200" />

                                    <div className="flex gap-4">
                                        {[1, 2].map(j => (
                                            <div key={j} className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                                                <User size={14} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Background Grid Decoration */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Info size={16} className="text-primary" />
                            Hierarchy Tips
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                <p className="text-xs text-slate-600 leading-relaxed">Level 1 referrals provide <span className="font-bold text-primary">15%</span> commission.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                <p className="text-xs text-slate-600 leading-relaxed">Indirect referrals (Level 2) contribute <span className="font-bold">5%</span> override.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-black rounded-2xl p-6 text-white shadow-xl shadow-black/10">
                        <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest mb-1">Total Network</div>
                        <div className="text-3xl font-black">1,248</div>
                        <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-bold">
                            +12% this month <ChevronRight size={12} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
