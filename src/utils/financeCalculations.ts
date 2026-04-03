import { Transaction } from '../data/types';

/**
 * Pure calculation engine — no Zustand, no side effects.
 * Simulates every day in [start, end] and accumulates transaction amounts.
 */
export const calculateTotalsInRange = (transactions: Transaction[], start: Date, end: Date) => {
    let totalIncome = 0;
    let totalWaste = 0;
    const incomeByCategory: Record<string, number> = {};
    const wasteByCategory: Record<string, number> = {};

    // Helper: Safely convert mixed date formats to midnight local timestamp
    const getMidnightTimestamp = (d: string | Date | null | undefined): number | null => {
        if (!d) return null;
        if (typeof d === 'string') {
            if (d.trim() === '') return null;
            const parts = d.split('T')[0].split('-');
            if (parts.length === 3) {
                return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 0, 0, 0, 0).getTime();
            }
        }
        const date = new Date(d);
        if (isNaN(date.getTime())) return null;
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    };

    const startTs = getMidnightTimestamp(start);
    const endTs = getMidnightTimestamp(end);

    if (startTs === null || endTs === null || startTs > endTs) {
        return { income: 0, waste: 0, incomeByCategory: {}, wasteByCategory: {} };
    }

    let currentTs = startTs;
    let loops = 0;
    while (currentTs <= endTs && loops < 3650) {
        loops++;
        const current = new Date(currentTs);

        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        const currentDateStr = `${yyyy}-${mm}-${dd}`;
        const dayIdx = current.getDay();
        const currentWeekdayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
        const currentMonthDay = `${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;

        transactions.forEach(tx => {
            const txStartTs = getMidnightTimestamp(tx.start_date);
            const txFinishTs = getMidnightTimestamp(tx.finish_date);
            const withinRange = (!txStartTs || currentTs >= txStartTs) && (!txFinishTs || currentTs <= txFinishTs);

            let occursToday = false;
            const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            switch (tx.payment_type) {
                case 'once':
                    if (tx.day === currentDateStr) occursToday = true;
                    break;
                case 'daily':
                    if (withinRange) occursToday = true;
                    break;
                case 'weekly':
                    const txWeekdayIdx = weekdays.indexOf(String(tx.day));
                    if (withinRange && txWeekdayIdx === currentWeekdayIdx) occursToday = true;
                    break;
                case 'monthly':
                    if (withinRange && Number(tx.day) === current.getDate()) occursToday = true;
                    break;
                case 'annual':
                    if (withinRange && typeof tx.day === 'string') {
                        const parts = tx.day.split('-');
                        if (parts.length === 2) {
                            const txMonth = String(Number(parts[0])).padStart(2, '0');
                            const txDate = String(Number(parts[1])).padStart(2, '0');
                            if (`${txMonth}-${txDate}` === currentMonthDay) occursToday = true;
                        } else if (tx.day === currentMonthDay) {
                            occursToday = true;
                        }
                    }
                    break;
            }

            if (occursToday) {
                const amount = Number(tx.money_amount) || 0;
                const cat = tx.category || 'Uncategorized';
                if (tx.type === 'income') {
                    totalIncome += amount;
                    incomeByCategory[cat] = (incomeByCategory[cat] || 0) + amount;
                } else {
                    totalWaste += amount;
                    wasteByCategory[cat] = (wasteByCategory[cat] || 0) + amount;
                }
            }
        });

        // Advance to next midnight without DST drift
        const nextDay = new Date(current);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        currentTs = nextDay.getTime();
    }

    return {
        income: Number(totalIncome.toFixed(2)),
        waste: Number(totalWaste.toFixed(2)),
        incomeByCategory,
        wasteByCategory,
    };
};
