import { useState, useEffect } from "react";
import { X, Settings, Check, Loader2, Edit3, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAccount } from "@/contexts/AccountContext";

interface ManageAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    account: any;
}

export default function ManageAccountModal({ isOpen, onClose, account }: ManageAccountModalProps) {
    const { updateAccount } = useAccount();
    const [nickname, setNickname] = useState("");
    const [leverage, setLeverage] = useState(100);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (account) {
            setNickname(account.nickname || "");
            setLeverage(account.leverage || 100);
        }
    }, [account, isOpen]);

    if (!isOpen || !account) return null;

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateAccount(account.id, { nickname, leverage });
            onClose();
        } catch (err) {
            console.error("Failed to update account", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl shadow-slate-200/50 overflow-hidden"
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white relative">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/20 text-white">
                            <Settings size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Manage Account</h2>
                            <p className="text-xs text-slate-500 font-medium">SF-#{account.login}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div>
                        <label className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 block">Account Nickname</label>
                        <div className="relative">
                            <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="E.g. Main Scaling Account"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 ml-1 italic">Visible only to you in your dashboard list.</p>
                    </div>

                    <div>
                        <label className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 block">Leverage Setting</label>
                        <div className="relative">
                            <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <select
                                value={leverage}
                                onChange={(e) => setLeverage(Number(e.target.value))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                            >
                                <option value={50}>High Risk (1:50)</option>
                                <option value={100}>Balanced (1:100)</option>
                                <option value={200}>Active Trader (1:200)</option>
                                <option value={500}>Hyper Growth (1:500)</option>
                            </select>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 ml-1">Changes the purchasing power of your trading capital.</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
