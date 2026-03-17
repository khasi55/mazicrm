"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import { fetchFromBackend } from '@/lib/backend-api';
import { MOCK_ACCOUNTS, Account as MockAccount } from '@/lib/mock-data';

interface Account {
    id: string;
    challenge_id: string;
    user_id: string;
    login: number;
    nickname?: string;
    leverage?: number;
    password?: string;
    server?: string;
    account_number: string;
    account_type: string;
    balance: number;
    equity: number;
    initial_balance: number;
    status: string;
}

interface AccountContextType {
    selectedAccount: Account | null;
    setSelectedAccount: (account: Account | null) => void;
    accounts: Account[];
    loading: boolean;
    refreshAccounts: () => Promise<void>;
    updateAccount: (id: string, data: { nickname?: string; leverage?: number }) => Promise<void>;
    createDemoAccount: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Realtime Subscription for Account Updates
        const supabase = createClient();

        // Skip subscription if we are using placeholder keys (prevents console errors)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
            // Attempt to fetch once but don't subscribe
            fetchAccounts();
            return;
        }

        fetchAccounts();

        const channel = supabase
            .channel('realtime-accounts')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'challenges',
                },
                (payload) => {

                    fetchAccounts(); // Refresh accounts when any change happens
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchAccounts = async () => {
        try {
            // Auth check handled by middleware and backend
            const supabase = createClient();


            const data = await fetchFromBackend('/api/dashboard/accounts');


            let accountsData: Account[] = [];

            if (data && data.accounts && data.accounts.length > 0) {
                accountsData = data.accounts.map((challenge: any) => ({
                    id: challenge.id,
                    challenge_id: challenge.id,
                    user_id: challenge.user_id,
                    login: challenge.login,
                    nickname: challenge.nickname || '',
                    leverage: challenge.leverage || 100,
                    password: challenge.master_password,
                    server: challenge.server,
                    account_number: challenge.challenge_number || `SF-${challenge.id.slice(0, 8)}`,
                    account_type: challenge.challenge_type || 'Phase 1',
                    balance: Number(challenge.current_balance),
                    equity: Number(challenge.current_equity),
                    initial_balance: Number(challenge.initial_balance),
                    status: challenge.status || 'active',
                }));
            } else {
                // FALLBACK TO MOCK DATA FOR UI DESIGN
                console.log('No backend accounts found, using mock data for UI design.');
                accountsData = MOCK_ACCOUNTS as Account[];
            }

            if (accountsData.length > 0) {
                // Optimize: Only update state if data actually changed
                // This prevents the whole dashboard from re-rendering every 15s if data is same
                setAccounts(prev => {
                    const isSame = JSON.stringify(prev) === JSON.stringify(accountsData);
                    return isSame ? prev : accountsData;
                });

                // Auto-select first account if none selected
                if (!selectedAccount) {
                    setSelectedAccount(accountsData[0]);
                } else {
                    // Update currently selected account with fresh data
                    const updatedCurrent = accountsData.find((a: any) => a.id === selectedAccount.id);
                    if (updatedCurrent) {
                        // Only update if data changed to prevent excessive re-renders
                        // We compare key metrics: balance, equity, status
                        if (
                            updatedCurrent.balance !== selectedAccount.balance ||
                            updatedCurrent.equity !== selectedAccount.equity ||
                            updatedCurrent.status !== selectedAccount.status
                        ) {
                            setSelectedAccount(updatedCurrent);
                        }
                    } else {
                        // If selected account is no longer in the list (e.g. switched from mock to real), select the first one
                        setSelectedAccount(accountsData[0]);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching accounts, falling back to mock data:', error);
            // FALLBACK TO MOCK DATA ON ERROR
            setAccounts(MOCK_ACCOUNTS as Account[]);
            if (!selectedAccount) {
                setSelectedAccount(MOCK_ACCOUNTS[0] as Account);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateAccount = async (id: string, updateData: { nickname?: string; leverage?: number }) => {
        try {
            await fetchFromBackend(`/api/dashboard/accounts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updateData),
            });
            await fetchAccounts();
        } catch (error) {
            console.error('Error updating account:', error);
            throw error;
        }
    };

    const createDemoAccount = async () => {
        try {
            setLoading(true);
            await fetchFromBackend('/api/dashboard/accounts/demo', {
                method: 'POST',
            });
            await fetchAccounts();
        } catch (error) {
            console.error('Error creating demo account:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AccountContext.Provider value={{
            selectedAccount,
            setSelectedAccount,
            accounts,
            loading,
            refreshAccounts: fetchAccounts,
            updateAccount,
            createDemoAccount
        }}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccount() {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
}
