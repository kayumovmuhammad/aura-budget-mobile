// All shared domain types and interfaces live here.
// Import from this file in stores, utils, and components — never define types inline elsewhere.

export type PaymentType = 'once' | 'daily' | 'weekly' | 'monthly' | 'annual';
export type TransactionType = 'income' | 'waste';

export interface Transaction {
    id: string;
    description?: string;
    money_amount: number;
    type: TransactionType;
    category: string;
    payment_type: PaymentType;
    day: string | number | null;
    start_date: string;
    finish_date?: string;
}

export interface Budget {
    id: number;
    title: string;
}

export interface FinancialSummary {
    balance: number;
    income: number;
    waste: number;
    incomeByCategory: Record<string, number>;
    wasteByCategory: Record<string, number>;
}
