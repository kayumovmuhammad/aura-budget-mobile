import { Transaction } from '../states/transactionsState';
import useTransactionsState from '../states/transactionsState';

/**
 * Calculates the total income and waste by simulating each day within a range.
 */
export const calculateTotalsInRange = (transactions: Transaction[], start: Date, end: Date) => {
    let totalIncome = 0;
    let totalWaste = 0;

    // Helper: Normalize date to midnight for comparison
    const normalizeDate = (d: string | Date) => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const startDate = normalizeDate(start);
    const endDate = normalizeDate(end);

    // Iterate through each day in the range
    for (let current = new Date(startDate); current <= endDate; current.setDate(current.getDate() + 1)) {
        const currentDateStr = current.toISOString().split('T')[0];
        const currentDayOfMonth = String(current.getDate()).padStart(2, '0');
        // Map native getDay (0 is Sunday) to 0-6 where 0 is Monday (user specification)
        // Sunday: 0 -> 6, Monday: 1 -> 0, Tuesday: 2 -> 1, etc.
        const dayIdx = current.getDay();
        const currentWeekdayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
        const currentMonthDay = `${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;

        transactions.forEach(tx => {
            const txStart = tx.start_date ? normalizeDate(tx.start_date) : null;
            const txFinish = tx.finish_date ? normalizeDate(tx.finish_date) : null;

            // Check if current date is within the transaction's lifetime
            const withinRange = (!txStart || current >= txStart) && (!txFinish || current <= txFinish);

            let occursToday = false;

            switch (tx.payment_type) {
                case 'once':
                    if (tx.day === currentDateStr) occursToday = true;
                    break;
                case 'daily':
                    if (withinRange) occursToday = true;
                    break;
                case 'weekly':
                    if (withinRange && Number(tx.day) === currentWeekdayIdx) occursToday = true;
                    break;
                case 'monthly':
                    if (withinRange && tx.day === currentDayOfMonth) occursToday = true;
                    break;
                case 'annual':
                    if (withinRange && tx.day === currentMonthDay) occursToday = true;
                    break;
            }

            if (occursToday) {
                if (tx.type === 'income') {
                    totalIncome += tx.money_amount;
                } else {
                    totalWaste += tx.money_amount;
                }
            }
        });
    }

    return {
        income: Number(totalIncome.toFixed(2)),
        waste: Number(totalWaste.toFixed(2))
    };
};

/**
 * Returns financial totals for the current month.
 */
export const getFinances = () => {
    const transactions = useTransactionsState.getState().transactions;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return calculateTotalsInRange(transactions, startOfMonth, endOfMonth);
};
