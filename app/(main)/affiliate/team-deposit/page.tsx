"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users } from 'lucide-react';

const data = [
    { name: 'Jan', amount: 45000 },
    { name: 'Feb', amount: 52000 },
    { name: 'Mar', amount: 48000 },
    { name: 'Apr', amount: 61000 },
    { name: 'May', amount: 55000 },
    { name: 'Jun', amount: 67000 },
];

const pieData = [
    { name: 'Direct', value: 400 },
    { name: 'Tier 1', value: 300 },
    { name: 'Tier 2', value: 200 },
];

const COLORS = ['#3b82f6', '#818cf8', '#c7d2fe'];

export default function AffiliateTeamDepositPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Deposit Report</h1>
                    <p className="text-slate-500 text-sm mt-1">Aggregate deposit volume across your entire tree</p>
                </div>

                <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl shadow-black/10 hover:scale-[1.02] transition-all">
                    <Download size={16} />
                    Download CSV
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-slate-900">Monthly Volume</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Team Performance</p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center">
                    <h3 className="font-bold text-slate-900 mb-8 self-start">Deposit Split</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full space-y-3 mt-8">
                        {pieData.map((item, i) => (
                            <div key={item.name} className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-slate-900">{Math.round((item.value / 900) * 100)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#eff6ff] rounded-3xl p-8 border border-blue-100">
                    <div className="flex items-start justify-between">
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-500 text-white rounded-2xl w-fit">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-blue-900">$328,450</h4>
                                <p className="text-sm font-bold text-blue-700/60 uppercase tracking-widest mt-1">Cumulative Team Funding</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200">
                    <div className="flex items-start justify-between">
                        <div className="space-y-4">
                            <div className="p-3 bg-slate-900 text-white rounded-2xl w-fit">
                                <Users size={24} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-900">421</h4>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Total Contributing Traders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
