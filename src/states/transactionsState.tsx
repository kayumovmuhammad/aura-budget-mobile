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
    transactions: Record<string, Transaction[]>;
    budget: Budget[];
    activeBudget: string;
    setActiveBudget: (title: string) => void;
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (id: string, transaction: Transaction) => void;
}

interface Budget {
    id: number;
    title: string;
}

const transactionsState = create<TransactionsState>()(
    persist(
        (set) => ({
            transactions: {},
            budget: [
                { id: 0, title: "Personal" },
                { id: 1, title: "Vacation Fund" }
            ],
            activeBudget: "Personal",
            setActiveBudget: (title) => set({ activeBudget: title }),
            addTransaction: (transaction) => set((state) => {
                const currentTxs = state.transactions[state.activeBudget] || [];
                return {
                    transactions: {
                        ...state.transactions,
                        [state.activeBudget]: [...currentTxs, transaction]
                    }
                };
            }),
            deleteTransaction: (id) => set((state) => {
                const currentTxs = state.transactions[state.activeBudget] || [];
                return {
                    transactions: {
                        ...state.transactions,
                        [state.activeBudget]: currentTxs.filter((t) => t.id !== id)
                    }
                };
            }),
            updateTransaction: (id, transaction) => set((state) => {
                const currentTxs = state.transactions[state.activeBudget] || [];
                return {
                    transactions: {
                        ...state.transactions,
                        [state.activeBudget]: currentTxs.map((t) => t.id === id ? transaction : t)
                    }
                };
            }),
        }),
        {
            name: "transactions",
        }
    )
);

export type { Transaction }
export default transactionsState