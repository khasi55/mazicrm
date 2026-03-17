export interface Account {
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

export const MOCK_ACCOUNTS: Account[] = [
    {
        id: 'acc_1',
        challenge_id: 'acc_1',
        user_id: 'user_1',
        login: 566919,
        nickname: 'Main Trading',
        leverage: 100,
        account_number: 'SF-566919',
        account_type: 'Phase 1',
        balance: 105420.50,
        equity: 106200.75,
        initial_balance: 100000,
        status: 'active',
    },
    {
        id: 'acc_2',
        challenge_id: 'acc_2',
        user_id: 'user_1',
        login: 566920,
        nickname: 'Scalping Demo',
        leverage: 200,
        account_number: 'SF-566920',
        account_type: 'Phase 2',
        balance: 48900.00,
        equity: 47500.20,
        initial_balance: 50000,
        status: 'active',
    },
    {
        id: 'acc_3',
        challenge_id: 'acc_3',
        user_id: 'user_1',
        login: 566921,
        nickname: 'Aggressive Test',
        leverage: 50,
        account_number: 'SF-566921',
        account_type: 'Master Account',
        balance: 215300.25,
        equity: 215300.25,
        initial_balance: 200000,
        status: 'active',
    },
];
