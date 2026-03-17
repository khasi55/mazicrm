"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export default function AffiliateCommissionPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Commission</h1>
                    <p className="text-slate-500 text-sm mt-1">Historical view of your IB earnings</p>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">
                        7 Days
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold">
                        30 Days
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">
                        All Time
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Earned</p>
                        <h3 className="text-2xl font-black text-slate-900">$12,450.00</h3>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <DollarSign size={24} />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Average / Month</p>
                        <h3 className="text-2xl font-black text-slate-900">$1,850.00</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Activity size={24} />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Unpaid Balance</p>
                        <h3 className="text-2xl font-black text-primary">$450.25</h3>
                    </div>
                    <div className="p-3 bg-primary/5 text-primary rounded-xl">
                        <TrendingUp size={24} />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">Earning Events</h4>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 uppercase">Live Log</span>
                </div>
                <div className="p-0">
                    <table className="w-full">
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-500">
                                                <ArrowUpRight size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">Commission from Trader #566{i}</div>
                                                <div className="text-[10px] text-slate-400 font-medium">Standard MT5 Account - Payout Ref {i}9283</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-xs text-slate-500">2 hours ago</div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="text-sm font-black text-slate-900">+$25.00</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
