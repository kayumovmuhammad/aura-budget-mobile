import React, { useState, useEffect, useRef, useMemo } from 'react';
import { IonList, IonItemSliding, IonItem, IonLabel, IonIcon, IonButton } from '@ionic/react';
import { flashOutline, cashOutline, calendarOutline, syncOutline, todayOutline } from 'ionicons/icons';
import { Transaction } from '../data/types';
import EditTransactionModal from './EditTransactionModal';
import { formatCurrency } from '../utils/formatCurrency';
import { useTranslation } from 'react-i18next';

const getPaymentIcon = (paymentType: string) => {
    switch (paymentType) {
        case 'once': return flashOutline;
        case 'daily': return todayOutline;
        case 'weekly': return syncOutline;
        case 'monthly': return calendarOutline;
        case 'annual': return calendarOutline;
        default: return cashOutline;
    }
};

const formatTransactionDate = (tx: Transaction, t: any, language: string) => {
    if (tx.payment_type === 'daily') {
        return t('Daily');
    }
    if (tx.payment_type === 'weekly') {
        return `${t(String(tx.day))}`;
    }
    if (tx.payment_type === 'monthly') {
        return `${tx.day} ${t("day of month")}`;
    }
    if (tx.payment_type === 'annual') {
        if (typeof tx.day === 'string' && tx.day.includes('-')) {
            const [month, day] = tx.day.split('-');
            const date = new Date(2000, Number(month) - 1, Number(day));
            if (!isNaN(date.getTime())) {
                const formatted = date.toLocaleDateString(language, { day: 'numeric', month: 'long' });
                return `${formatted}`;
            }
        }
        return `${tx.day}`;
    }
    if (tx.payment_type === 'once') {
        if (typeof tx.day === 'string' && tx.day) {
            const date = new Date(tx.day);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' });
            }
        }
        return tx.day || '';
    }
    return tx.day || '';
};

interface TransactionListProps {
    transactions: Transaction[];
    onUpdate: (id: string, tx: Transaction) => void;
    onDelete: (id: string) => void;
}

const PAGE_SIZE = 10;

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onUpdate, onDelete }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const { t, i18n } = useTranslation();
    const observerTarget = useRef<HTMLDivElement>(null);

    // Sort transactions so the newest are at the top
    const sortedTransactions = useMemo(() => {
        return [...transactions].reverse();
    }, [transactions]);

    const visibleTransactions = useMemo(() => {
        return sortedTransactions.slice(0, visibleCount);
    }, [sortedTransactions, visibleCount]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setVisibleCount(prev => prev + PAGE_SIZE);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleTxClick = (tx: Transaction) => {
        setSelectedTransaction(tx);
        setIsEditModalOpen(true);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                    {t('Transactions')}
                </h2>
            </div>

            <IonList lines="none">
                {visibleTransactions.map(tx => (
                    <IonItemSliding key={tx.id}>
                        <IonItem className="tx-item" onClick={() => handleTxClick(tx)} button detail={false}>
                            <div className="cat-icon" slot="start" title={tx.payment_type}>
                                <IonIcon icon={getPaymentIcon(tx.payment_type)} />
                            </div>
                            <IonLabel>
                                <h3 style={{ fontWeight: 600 }}>{tx.category}</h3>
                                <p style={{ color: 'var(--text-sub)' }}>{formatTransactionDate(tx, t, i18n.language)}</p>
                            </IonLabel>
                            <div slot="end" className={tx.type === 'waste' ? 'amt-expense' : 'amt-income'}>
                                {tx.type === 'waste' ? '-' : '+'}{formatCurrency(tx.money_amount).replace('-', '')}
                            </div>
                        </IonItem>
                    </IonItemSliding>
                ))}
            </IonList>

            {visibleCount < sortedTransactions.length && (
                <div ref={observerTarget} style={{ height: '20px', margin: '10px 0' }}></div>
            )}

            <EditTransactionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                transaction={selectedTransaction}
                onSave={(id, tx) => { onUpdate(id, tx); setIsEditModalOpen(false); }}
                onDelete={(id) => { onDelete(id); setIsEditModalOpen(false); }}
            />
        </>
    );
};

export default TransactionList;
