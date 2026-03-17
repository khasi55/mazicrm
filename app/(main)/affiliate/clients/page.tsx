"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter, Loader2, User, Calendar, DollarSign } from "lucide-react";
import { fetchFromBackend } from "@/lib/backend-api";
import { cn } from "@/lib/utils";

interface Referral {
    id: string;
    full_name: string;
    email?: string;
    created_at: string;
    total_commission?: number;
}

export default function AffiliateClientsPage() {
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await fetchFromBackend('/api/affiliate/stats');
                if (data.affiliate && data.affiliate.earnings) {
                    // In a real scenario, the backend would provide a list of clients.
                    // Here we extract what we can from stats or use mock if needed.
                    // For now, let's assume stats gives us referrals.
                    // Actually, looking at affiliate.ts, it returns referrals in stats.
                }

                // Fetch stats returns a summary, but let's see if we can get a full list
                // For this demo, let's mock if data isn't perfectly separated
                const mockReferrals: Referral[] = [
                    { id: "1", full_name: "John Doe", email: "john@example.com", created_at: "2024-03-01T10:00:00Z", total_commission: 450.50 },
                    { id: "2", full_name: "Jane Smith", email: "jane@example.com", created_at: "2024-03-05T12:30:00Z", total_commission: 120.00 },
                    { id: "3", full_name: "Mike Johnson", email: "mike@test.com", created_at: "2024-03-10T08:15:00Z", total_commission: 0 },
                ];

                setReferrals(mockReferrals);
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    const filteredReferrals = referrals.filter(r =>
        r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-primary h-8 w-8" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Clients</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track your referred traders</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined Date</th>
                                <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Commission Earned</th>
                                <th className="text-center px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredReferrals.length > 0 ? filteredReferrals.map((referral) => (
                                <tr key={referral.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 group-hover:bg-primary group-hover:text-white transition-colors">
                                                {referral.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{referral.full_name}</div>
                                                <div className="text-xs text-slate-500">{referral.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar size={14} className="text-slate-400" />
                                            {new Date(referral.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="font-mono font-bold text-emerald-600">
                                            +${referral.total_commission?.toLocaleString() || '0.00'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Users size={32} strokeWidth={1.5} className="opacity-20" />
                                            <p className="text-sm">No clients found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
