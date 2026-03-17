"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AffiliateRoot() {
    const router = useRouter();

    useEffect(() => {
        router.push('/affiliate/dashboard');
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <div className="animate-pulse text-slate-400 font-medium">Redirecting to IB Dashboard...</div>
        </div>
    );
}
