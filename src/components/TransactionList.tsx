import React, { useState } from 'react';
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

interface TransactionListProps {
    transactions: Transaction[];
    onUpdate: (id: string, tx: Transaction) => void;
    onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onUpdate, onDelete }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { t } = useTranslation();

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
                <IonButton fill="clear" color="primary" size="small">
                    {t('See All')}
                </IonButton>
            </div>

            <IonList lines="none">
                {transactions.map(tx => (
                    <IonItemSliding key={tx.id}>
                        <IonItem className="tx-item" onClick={() => handleTxClick(tx)} button detail={false}>
                            <div className="cat-icon" slot="start" title={tx.payment_type}>
                                <IonIcon icon={getPaymentIcon(tx.payment_type)} />
                            </div>
                            <IonLabel>
                                <h3 style={{ fontWeight: 600 }}>{tx.category}</h3>
                                <p style={{ color: 'var(--text-sub)' }}>{tx.day}</p>
                            </IonLabel>
                            <div slot="end" className={tx.type === 'waste' ? 'amt-expense' : 'amt-income'}>
                                {tx.type === 'waste' ? '-' : '+'}{formatCurrency(tx.money_amount).replace('-', '')}
                            </div>
                        </IonItem>
                    </IonItemSliding>
                ))}
            </IonList>

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
