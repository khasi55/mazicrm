"use client";

import { useState, useEffect } from "react";
import { Check, Info, CreditCard, ChevronDown, ChevronUp, Lock, Loader2, Copy, X, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { fetchFromBackend } from "@/lib/backend-api";
import { useAccount } from "@/contexts/AccountContext";

// --- Data ---
const ACCOUNT_TYPES = [
    { id: "standard", label: "Standard", desc: "Classic execution with tight spreads" },
    { id: "commission-free", label: "Commission Free", desc: "Zero commissions on all pairs" },
    { id: "swap-free", label: "Swap Free", desc: "Islamic account, no overnight fees", recommended: true }
];

const TRADING_MODELS = [
    { id: "raw", label: "Raw Spreads", desc: "Direct market access spreads" },
    { id: "fixed", label: "Fixed Spreads", desc: "Predictable trading costs" }
];

const DEFAULT_SIZE = 10000;
const MIN_SIZE = 1000;
const MAX_SIZE = 1000000;

const PLATFORMS = [
    { id: "mt5", label: "MetaTrader 5" }
];

const PAYMENT_GATEWAYS = [
    { id: "sharkpay", label: "SharkPay", currency: "INR", desc: "Pay in Indian Rupees (₹)", icon: "🇮🇳" },
    { id: "paymid", label: "Paymid", currency: "USD", desc: "Pay in US Dollars ($)", icon: "🇺🇸" }
];

// --- Utility Components ---
const RadioPill = ({
    active,
    label,
    onClick,
    subLabel = ""
}: {
    active: boolean;
    label: string;
    onClick: () => void;
    subLabel?: string
}) => (
    <div
        onClick={onClick}
        className={cn(
            "relative flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none",
            active
                ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(var(--primary),1)]"
                : "bg-card border-border hover:border-gray-600"
        )}
    >
        {/* Radio Circle */}
        <div className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
            active ? "border-primary bg-primary" : "border-gray-500"
        )}>
            {active && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>

        <div className="flex flex-col">
            <span className={cn("text-sm font-bold", active ? "text-primary" : "text-foreground")}>{label}</span>
            {subLabel && <span className="text-[10px] text-muted-foreground">{subLabel}</span>}
        </div>
    </div>
);

const SectionHeader = ({ title, sub }: { title: string, sub: string }) => (
    <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
);

// --- Success Modal ---
const SuccessModal = ({ credentials, onClose }: { credentials: any, onClose: () => void }) => {
    const CopyButton = ({ text }: { text: string }) => {
        const [copied, setCopied] = useState(false);
        const handleCopy = () => {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };
        return (
            <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="relative p-6 pt-12 text-center bg-gradient-to-b from-primary/20 to-transparent">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <Check size={32} strokeWidth={3} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h2>
                    <p className="text-gray-400 text-sm px-4">Your account has been created instantly. Save these credentials carefully.</p>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                        {[
                            { label: "Login", value: credentials.login },
                            { label: "Password", value: credentials.masterPassword },
                            { label: "Server", value: credentials.server },
                            { label: "Platform", value: PLATFORMS.find(p => p.id === credentials.platform)?.label || credentials.platform },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <span className="text-sm text-gray-400">{item.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono font-medium text-white">{item.value}</span>
                                    <CopyButton text={String(item.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex gap-3">
                        <Info className="shrink-0 text-yellow-500" size={18} />
                        <p className="text-xs text-yellow-200/80">
                            We have also sent these details to your email. You can find them later in your dashboard under "Credentials".
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all active:scale-95"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function AccountConfigurator() {
    const router = useRouter();
    const supabase = createClient();
    const { createDemoAccount } = useAccount();

    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const initialMode = (searchParams?.get('mode') === 'demo' ? 'demo' : 'real') as 'real' | 'demo';
    const [mode, setMode] = useState<'real' | 'demo'>(initialMode);
    const [type, setType] = useState("swap-free");
    const [model, setModel] = useState("raw");
    const [size, setSize] = useState(DEFAULT_SIZE);
    const [customAmount, setCustomAmount] = useState(String(DEFAULT_SIZE));
    const [platform, setPlatform] = useState("mt5");
    const [gateway, setGateway] = useState("sharkpay");
    const [showRules, setShowRules] = useState(true);
    const [leverage, setLeverage] = useState("1:500");
    const [accountCurrency, setAccountCurrency] = useState("USD");

    const [isPurchasing, setIsPurchasing] = useState(false);
    const [purchasedCredentials, setPurchasedCredentials] = useState<any>(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);


    // Price Calculation
    // Base prices in USD hardcoded for simplicity
    const getBasePrice = () => {
        // Simple 1:1 pricing: payment amount = deposit amount
        return Number(size) || 0;
    };

    let priceUSD = getBasePrice();
    if (model === "pro") priceUSD = Math.round(priceUSD * 1.2);

    const basePriceUSD = Math.round(priceUSD);
    const finalPriceUSD = basePriceUSD;
    const finalPriceINR = Math.round(finalPriceUSD * 84); // Simple fixed rate: 84

    const selectedGateway = PAYMENT_GATEWAYS.find(g => g.id === gateway);
    const displayPrice = mode === 'real' ? (gateway === 'sharkpay' ? finalPriceINR : finalPriceUSD) : 0;
    const displayCurrency = selectedGateway?.currency || 'USD';


    const handlePurchase = async () => {
        setIsPurchasing(true);
        try {
            // Check authentication
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                setIsPurchasing(false);
                return;
            }

            // Use new payment flow
            if (mode === 'real') {
                const data = await fetchFromBackend('/api/payment/create-order', {
                    method: 'POST',
                    body: JSON.stringify({
                        account_type: type,
                        model,
                        size,
                        platform,
                        gateway // User selected gateway
                    })
                });

                if (data.checkout_url) {
                    window.location.href = data.checkout_url;
                } else if (data.order_id) {
                    setPurchasedCredentials(data);
                } else {
                    alert(data.error || 'Failed to create order');
                }
            } else {
                // Demo Mode: Call context method
                await createDemoAccount();
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Order creation error:', error);
            alert('Failed to connect to server');
        } finally {
            setIsPurchasing(false);
        }
    };

    return (
        <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 font-sans text-foreground">

            <AnimatePresence>
                {purchasedCredentials && (
                    <SuccessModal
                        credentials={purchasedCredentials}
                        onClose={() => router.push('/dashboard')}
                    />
                )}
            </AnimatePresence>

            {/* Page Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h1 className="text-3xl font-black tracking-tight text-black">
                        {mode === 'real' ? 'New Real Account' : 'New Demo Account'}
                    </h1>
                </div>

                {/* Mode Switcher (Tab style) */}
                <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit">
                    <button
                        onClick={() => setMode('real')}
                        className={cn(
                            "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                            mode === 'real' ? "bg-white text-black shadow-sm border border-slate-200" : "text-slate-500 hover:text-black"
                        )}
                    >
                        REAL
                    </button>
                    <button
                        onClick={() => setMode('demo')}
                        className={cn(
                            "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                            mode === 'demo' ? "bg-white text-black shadow-sm border border-slate-200" : "text-slate-500 hover:text-black"
                        )}
                    >
                        DEMO
                    </button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-12">

                {/* --- Left Column: Configuration --- */}
                <div className="flex-1 space-y-10">

                    {/* 1. Account Type */}
                    <section>
                        <SectionHeader title="Account Type" sub="Choose the trading conditions that suit your style" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {ACCOUNT_TYPES.map(t => (
                                <RadioPill
                                    key={t.id}
                                    active={type === t.id}
                                    label={t.label}
                                    subLabel={t.desc}
                                    onClick={() => setType(t.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* 2. Model */}
                    <section>
                        <SectionHeader title="Spread Type" sub="Choose how you want to pay for spreads" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {TRADING_MODELS.map(m => (
                                <RadioPill
                                    key={m.id}
                                    active={model === m.id}
                                    label={m.label}
                                    subLabel={m.desc}
                                    onClick={() => setModel(m.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* 3. Trading Conditions (Accordion) */}
                    <section className="rounded-xl border border-border bg-card/50 overflow-hidden">
                        <div
                            onClick={() => setShowRules(!showRules)}
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-primary/10 text-primary">
                                    <Info size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Review Account Conditions</h4>
                                    <p className="text-[10px] text-muted-foreground">Detailed trading parameters for your selection</p>
                                </div>
                            </div>
                            {showRules ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                        <AnimatePresence>
                            {showRules && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-border px-4 py-6 bg-card"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-xs font-bold mb-3 text-muted-foreground uppercase tracking-wider">Leverage limit</p>
                                            <div className="flex gap-2">
                                                {["1:100", "1:200", "1:500"].map(l => (
                                                    <button
                                                        key={l}
                                                        onClick={() => setLeverage(l)}
                                                        className={cn(
                                                            "flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all",
                                                            leverage === l
                                                                ? "border-primary bg-primary/10 text-primary shadow-sm"
                                                                : "border-border text-muted-foreground hover:bg-white/5"
                                                        )}
                                                    >
                                                        {l}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold mb-3 text-muted-foreground uppercase tracking-wider">Account Currency</p>
                                            <div className="flex gap-2">
                                                {["USD", "EUR", "GBP"].map(curr => (
                                                    <button
                                                        key={curr}
                                                        onClick={() => setAccountCurrency(curr)}
                                                        className={cn(
                                                            "flex-1 py-2.5 text-xs font-bold rounded-lg border transition-all",
                                                            accountCurrency === curr
                                                                ? "border-primary bg-primary/10 text-primary shadow-sm"
                                                                : "border-border text-muted-foreground hover:bg-white/5"
                                                        )}
                                                    >
                                                        {curr}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Execution</p>
                                                    <p className="text-xs font-bold text-slate-700">Market Execution</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Min Lot Size</p>
                                                    <p className="text-xs font-bold text-slate-700">0.01 Lots</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Commission</p>
                                                    <p className="text-xs font-bold text-slate-700">{type === 'commission-free' ? '$0 / Lot' : '$7 / Lot'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Swap Fees</p>
                                                    <p className="text-xs font-bold text-slate-700">{type === 'swap-free' ? 'Zero Swaps' : 'Standard'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* 4. Account Balance */}
                    <section>
                        <SectionHeader title="Initial Account Balance" sub="Enter the starting balance for your broker account" />
                        <div className="relative max-w-sm">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                            <input
                                type="number"
                                value={customAmount}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setCustomAmount(val);
                                    const num = Number(val);
                                    if (!isNaN(num)) setSize(num);
                                }}
                                onBlur={() => {
                                    let num = Number(customAmount);
                                    if (isNaN(num) || num < MIN_SIZE) num = MIN_SIZE;
                                    if (num > MAX_SIZE) num = MAX_SIZE;
                                    setSize(num);
                                    setCustomAmount(String(num));
                                }}
                                className="w-full bg-card border border-border rounded-xl py-4 pl-10 pr-4 text-lg font-bold text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                placeholder="E.g. 50,000"
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 ml-1">
                            Min: ${MIN_SIZE.toLocaleString()} | Max: ${MAX_SIZE.toLocaleString()}
                        </p>
                    </section>

                    {/* 5. Platform */}
                    <section>
                        <SectionHeader title="Trading Platform" sub="Your account will be created on MetaTrader 5" />
                        <div className="flex gap-4">
                            <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-primary bg-primary/5 text-primary">
                                <Monitor size={20} />
                                <span className="font-bold">MetaTrader 5</span>
                            </div>
                        </div>
                    </section>

                    {/* 6. Payment Gateway (Only for Real) */}
                    {mode === 'real' && (
                        <section>
                            <SectionHeader title="Payment Gateway" sub="Choose your preferred payment method" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {PAYMENT_GATEWAYS.map(g => (
                                    <div
                                        key={g.id}
                                        onClick={() => setGateway(g.id)}
                                        className={cn(
                                            "relative flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none",
                                            gateway === g.id
                                                ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(var(--primary),1)]"
                                                : "bg-card border-border hover:border-gray-600"
                                        )}
                                    >
                                        {/* Radio Circle */}
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                            gateway === g.id ? "border-primary bg-primary" : "border-gray-500"
                                        )}>
                                            {gateway === g.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>

                                        <div className="flex-1 flex items-center gap-3">
                                            <span className="text-2xl">{g.icon}</span>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className={cn("text-sm font-bold", gateway === g.id ? "text-primary" : "text-foreground")}>
                                                        {g.label}
                                                    </span>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono">
                                                        {g.currency}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground">{g.desc}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>


                {/* --- Right Column: Summary --- */}
                <div className="w-full xl:w-[450px] shrink-0 xl:sticky xl:top-8 space-y-6">

                    {/* Step-by-step summary */}
                    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden p-6">
                        <h3 className="font-bold text-lg mb-4">{mode === 'real' ? 'Initial Deposit' : 'Demo Funding'}</h3>
                        <p className="text-sm text-muted-foreground">
                            {mode === 'real'
                                ? "The amount you enter as your initial balance is the exact amount you will pay to fund your real broker account."
                                : "Demo accounts are funded instantly with the amount specified. No payment is required for demo accounts."}
                        </p>
                    </div>

                    {/* Order Summary Card */}
                    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-border bg-muted/10">
                            <h3 className="font-bold text-lg">Order Summary</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-start text-sm">
                                <span className="text-muted-foreground">
                                    {ACCOUNT_TYPES.find(t => t.id === type)?.label} Account {mode === 'real' ? 'Deposit' : 'Demo Funding'}
                                </span>
                                <div className="text-right">
                                    <span className="font-bold font-mono">
                                        {mode === 'real'
                                            ? (displayCurrency === 'INR' ? '₹' : '$') + (gateway === 'sharkpay' ? Math.round(size * 84) : size).toLocaleString()
                                            : `$${size.toLocaleString()} (FREE)`}
                                    </span>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                                Platform: {PLATFORMS.find(p => p.id === platform)?.label}
                                <br />
                                Leverage: {leverage} | {accountCurrency} {mode === 'real' ? 'Real' : 'Demo'}
                                {mode === 'real' && (
                                    <>
                                        <br />
                                        Payment: {selectedGateway?.label} ({displayCurrency})
                                    </>
                                )}
                            </div>

                            <div className="h-px bg-border" />

                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold">Total</span>
                                <div className="text-right">
                                    <span className="text-3xl font-black tracking-tight">
                                        {displayCurrency === 'INR' ? '₹' : '$'}{displayPrice.toLocaleString()}
                                    </span>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {displayCurrency}
                                    </div>
                                </div>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="bg-white/5 rounded-lg p-4 text-[11px] text-muted-foreground space-y-2">
                                <label className="flex gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="mt-0.5"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    />
                                    <span>I agree with all the following terms:</span>
                                </label>
                                <ul className="list-disc pl-5 space-y-1 opacity-80">
                                    <li>I have read and agreed to the Terms of Use.</li>
                                    <li>All information matches government ID.</li>
                                </ul>
                            </div>

                            <button
                                onClick={handlePurchase}
                                disabled={isPurchasing || !agreedToTerms}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
                            >
                                {isPurchasing ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Creating Order...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={20} />
                                        {mode === 'real' ? 'Proceed to Payment' : 'Create Demo Account'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
