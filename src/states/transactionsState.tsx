import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Transaction, Budget, FinancialSummary } from '../data/types';
import { calculateTotalsInRange } from '../utils/financeCalculations';
import capacitorStorage from '../storage/capasitorStorage';
export type { Transaction };

interface TransactionsState {
    transactions: Record<number, Transaction[]>;
    budget: Budget[];
    activeBudget: number;
    setActiveBudget: (id: number) => void;
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    updateTransaction: (id: string, transaction: Transaction) => void;
    addBudget: (title: string) => number;
    editBudget: (id: number, title: string) => void;
    deleteBudget: (id: number) => void;
}

const useTransactionsState = create<TransactionsState>()(
    persist(
        (set) => ({
            transactions: {},
            budget: [],
            activeBudget: 0,
            setActiveBudget: (id) => set({ activeBudget: id }),
            addBudget: (title) => {
                const newId = Date.now();
                set((state) => ({
                    budget: [{ id: newId, title }, ...state.budget],
                    activeBudget: newId,
                }));
                return newId;
            },
            editBudget: (id, title) =>
                set((state) => ({
                    budget: state.budget.map((b) => (b.id === id ? { ...b, title } : b)),
                })),
            deleteBudget: (id) =>
                set((state) => {
                    const newBudgets = state.budget.filter((b) => b.id !== id);
                    if (newBudgets.length === 0) return {}; // Prevent deleting the last budget

                    const newState: Partial<TransactionsState> = { budget: newBudgets };
                    if (state.activeBudget === id) {
                        newState.activeBudget = newBudgets[0].id;
                    }

                    const newTransactions = { ...state.transactions };
                    delete newTransactions[id];
                    newState.transactions = newTransactions;

                    return newState;
                }),
            addTransaction: (transaction) =>
                set((state) => {
                    const currentTxs = state.transactions[state.activeBudget] || [];
                    return {
                        transactions: {
                            ...state.transactions,
                            [state.activeBudget]: [...currentTxs, transaction],
                        },
                    };
                }),
            deleteTransaction: (id) =>
                set((state) => {
                    const currentTxs = state.transactions[state.activeBudget] || [];
                    return {
                        transactions: {
                            ...state.transactions,
                            [state.activeBudget]: currentTxs.filter((t) => t.id !== id),
                        },
                    };
                }),
            updateTransaction: (id, transaction) =>
                set((state) => {
                    const currentTxs = state.transactions[state.activeBudget] || [];
                    return {
                        transactions: {
                            ...state.transactions,
                            [state.activeBudget]: currentTxs.map((t) => (t.id === id ? transaction : t)),
                        },
                    };
                }),
        }),
        {
            name: 'transactions',
            storage: createJSONStorage(() => capacitorStorage),
        }
    )
);

/**
 * Reactive hook — lives here because it reads Zustand state.
 * Derives all financial totals from the active budget's transactions.
 */
export const useFinances = (): FinancialSummary => {
    const state = useTransactionsState();
    const transactions = state.transactions[state.activeBudget] || [];
    const now = new Date();

    // Find earliest transaction start date
    let earliestDate = now;
    transactions.forEach((tx) => {
        if (tx.start_date) {
            let d: Date;
            if (typeof tx.start_date === 'string') {
                const parts = tx.start_date.split('T')[0].split('-');
                if (parts.length === 3) {
                    d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                } else {
                    d = new Date(tx.start_date);
                    d.setHours(0, 0, 0, 0);
                }
            } else {
                d = new Date(tx.start_date);
                d.setHours(0, 0, 0, 0);
            }
            if (d < earliestDate) earliestDate = d;
        }
    });

    const totals = calculateTotalsInRange(transactions, earliestDate, now);

    return {
        balance: totals.income - totals.waste,
        income: totals.income,
        waste: totals.waste,
        incomeByCategory: totals.incomeByCategory,
        wasteByCategory: totals.wasteByCategory,
    };
};

export default useTransactionsState;