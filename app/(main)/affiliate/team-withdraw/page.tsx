"use client";

import { Download, History, ArrowDownRight, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function AffiliateTeamWithdrawPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Withdraw Report</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor withdrawal requests and compliance across your network</p>
                </div>

                <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl shadow-black/10 hover:scale-[1.02] transition-all">
                    <Download size={16} />
                    Download CSV
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-slate-900">Request Pipeline</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Compliance Review</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">
                        <ShieldCheck size={12} />
                        All Clear
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="text-left px-8 py-4 text-xs font-bold text-slate-500 uppercase">Trader</th>
                                <th className="text-left px-8 py-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
                                <th className="text-left px-8 py-4 text-xs font-bold text-slate-500 uppercase">Method</th>
                                <th className="text-center px-8 py-4 text-xs font-bold text-slate-500 uppercase">Risk Level</th>
                                <th className="text-right px-8 py-4 text-xs font-bold text-slate-500 uppercase">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-slate-100">
                                                S
                                            </div>
                                            <div className="text-xs font-bold text-slate-900">Shark#{i}2{i}9</div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 font-mono font-bold text-slate-900 text-sm">
                                        $1,200.00
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-1 rounded">Crypto</span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <div className="flex justify-center">
                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="bg-emerald-400 h-full w-[15%]" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right text-[10px] font-bold text-slate-400 uppercase">
                                        {i}H AGO
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <ArrowUpRight size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-black text-slate-900">98%</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Approval Rate</div>
                    </div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <ArrowDownRight size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-black text-slate-900">1.2H</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Avg. Processing</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
