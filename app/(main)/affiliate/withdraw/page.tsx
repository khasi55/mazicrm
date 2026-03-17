"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, CreditCard, ChevronRight, AlertCircle, CheckCircle2, History } from "lucide-react";

export default function AffiliateWithdrawPage() {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("crypto");

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">IB Withdraw</h1>
                    <p className="text-slate-500 text-sm mt-1">Convert your commission balance to cash</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <div className="max-w-md mx-auto space-y-8 py-4">
                            <div className="text-center space-y-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available to Withdraw</p>
                                <h3 className="text-5xl font-black text-black">$4,250.00</h3>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Enter Amount</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-2xl">$</div>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-12 pr-6 py-6 text-2xl font-black focus:outline-none focus:border-primary/30 focus:bg-white transition-all transition-duration-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Select Method</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setMethod('crypto')}
                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${method === 'crypto' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50/50 text-slate-400'}`}
                                    >
                                        <Wallet size={32} strokeWidth={method === 'crypto' ? 2.5 : 1.5} />
                                        <span className="text-sm font-bold uppercase tracking-tight">Crypto (USDT)</span>
                                    </button>
                                    <button
                                        onClick={() => setMethod('bank')}
                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${method === 'bank' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50/50 text-slate-400'}`}
                                    >
                                        <CreditCard size={32} strokeWidth={method === 'bank' ? 2.5 : 1.5} />
                                        <span className="text-sm font-bold uppercase tracking-tight">Bank Wire</span>
                                    </button>
                                </div>
                            </div>

                            <button className="w-full py-6 bg-black text-white rounded-3xl font-black text-lg shadow-xl shadow-black/10 hover:-translate-y-1 transition-all active:scale-95">
                                Confirm Payout
                            </button>

                            <p className="text-center text-[10px] text-slate-400 font-medium">Standard processing time: 24-48 hours</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-4">IB Status: <span className="text-emerald-400">Master IB</span></h4>
                            <div className="space-y-4 opacity-80">
                                <div className="flex justify-between text-sm">
                                    <span>Payout Limit</span>
                                    <span className="font-bold">Unlimited</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Withdrawal Fee</span>
                                    <span className="font-bold">0% (Elite Benefit)</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className="bg-emerald-400 h-full w-[85%]" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
                        <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
                            <History size={16} />
                            Recent Status
                        </h4>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors p-2 rounded-lg -mx-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <div className="text-xs font-bold text-slate-900">$1,500.00</div>
                                    </div>
                                    <CheckCircle2 size={14} className="text-emerald-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
