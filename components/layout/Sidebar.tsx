"use client";

import Image from "next/image";
import {
    LayoutGrid,
    Home,
    Swords,
    UserCheck,
    Medal,
    BarChart3,
    Wallet,
    Settings,
    Users,
    Network,
    DollarSign,
    PieChart,
    ChevronLeft,
    ChevronRight,
    LogOut,
    MessageCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
    { icon: LayoutGrid, label: "Overview", href: "/overview" },
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Swords, label: "Competitions", href: "/competitions" },
    { icon: UserCheck, label: "KYC", href: "/kyc" },
    { icon: Medal, label: "Certificates", href: "/certificates" },
    { icon: BarChart3, label: "Ranking", href: "/ranking" },
    { icon: Wallet, label: "Payouts", href: "/payouts" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

const ibMenuItems = [
    { icon: BarChart3, label: "IB Dashboard", href: "/affiliate/dashboard" },
    { icon: Users, label: "My Clients", href: "/affiliate/clients" },
    { icon: Network, label: "IB Tree Chart", href: "/affiliate/tree" },
    { icon: DollarSign, label: "My Commission", href: "/affiliate/commission" },
    { icon: Wallet, label: "IB Withdraw", href: "/affiliate/withdraw" },
    { icon: PieChart, label: "Deposit Report", href: "/affiliate/team-deposit" },
    { icon: BarChart3, label: "Withdraw Report", href: "/affiliate/team-withdraw" },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        onClose();
    }, [pathname]);

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-50 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed ? "100px" : "280px"
                }}
                className={cn(
                    "fixed z-50 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    // Mobile: full height
                    "inset-y-0 left-0 h-screen",
                    // Desktop: floating, rounded
                    "md:relative md:h-[calc(100vh-2rem)] md:m-4 md:rounded-[2rem] md:w-auto",
                    "bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Logo Area */}
                <div className={cn(
                    "h-24 flex items-center shrink-0 border-b border-slate-50",
                    isCollapsed ? "justify-center" : "px-8"
                )}>
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="relative w-10 h-10 shrink-0 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                            <Image
                                src="/mazilogo.svg"
                                alt="Mazi Finance"
                                fill
                                className="object-contain p-1"
                                priority
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                                    Mazi Finance
                                </span>
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">
                                    Broker Portal
                                </span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto scrollbar-hide py-6 px-4 flex flex-col gap-8">

                    {/* Primary Menu */}
                    <div className="space-y-1.5">
                        {!isCollapsed && (
                            <h4 className="px-4 mb-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                Menu
                            </h4>
                        )}
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div className={cn(
                                        "group flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all relative",
                                        isCollapsed ? "justify-center px-0" : "",
                                        isActive ? "bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] text-white shadow-lg shadow-purple-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    )}>
                                        <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} strokeWidth={isActive ? 2.5 : 1.5} />
                                        {!isCollapsed && (
                                            <span className="text-[14px] font-bold tracking-tight">{item.label}</span>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* IB Section */}
                    <div className="space-y-1.5">
                        {!isCollapsed && (
                            <h4 className="px-4 mb-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                Affiliate (IB)
                            </h4>
                        )}
                        {ibMenuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div className={cn(
                                        "group flex items-center gap-3.5 px-4 py-2 rounded-xl transition-all relative",
                                        isCollapsed ? "justify-center px-0" : "",
                                        isActive ? "bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] text-white shadow-lg shadow-purple-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    )}>
                                        <item.icon size={18} className={cn(isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} strokeWidth={isActive ? 2.5 : 1.5} />
                                        {!isCollapsed && (
                                            <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t border-slate-50 space-y-2">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex items-center gap-3.5 w-full px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all text-sm font-semibold"
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        {!isCollapsed && "Collapse"}
                    </button>

                    <a
                        href="#"
                        className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all text-sm font-semibold"
                    >
                        <MessageCircle size={18} />
                        {!isCollapsed && "Support"}
                    </a>

                    <button className="flex items-center gap-3.5 w-full px-4 py-2.5 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-all text-sm font-bold">
                        <LogOut size={18} />
                        {!isCollapsed && "Logout"}
                    </button>
                </div>

                {/* Collapse Toggle Handle - Removed as we have button now */}
            </motion.aside>
        </>
    );
}
