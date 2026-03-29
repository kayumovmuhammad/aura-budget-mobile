import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Transaction {
    id: string;
    description?: string;
    money_amount: number;
    type: "waste" | "income";
    category: string;
    payment_type: "once" | "monthly" | "annual" | "weekly" | "daily";
    day: string | number | null;
    start_date: string;
    finish_date?: string;
}

interface TransactionsState {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (id: string, transaction: Transaction) => void;
}

const transactionsState = create<TransactionsState>()(
    persist(
        (set) => ({
            transactions: [],
            addTransaction: (transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
            deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
            updateTransaction: (id, transaction) => set((state) => ({ transactions: state.transactions.map((t) => t.id === id ? transaction : t) })),
        }),
        {
            name: "transactions",
        }
    )
);

export type { Transaction }
export default transactionsState