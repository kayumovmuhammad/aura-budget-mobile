import React, { useRef, useEffect } from 'react';
import {
    IonModal,
} from '@ionic/react';
import useTransactionsState, { Transaction } from '../states/transactionsState';
import EditTransaction from './EditTransaction';

interface EditTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ isOpen, onClose, transaction }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const updateTransaction = useTransactionsState(state => state.updateTransaction);
    const deleteTransaction = useTransactionsState(state => state.deleteTransaction);

    const [editData, setEditData] = React.useState<Partial<Transaction>>({});

    useEffect(() => {
        if (transaction) {
            setEditData(transaction);
        }
    }, [transaction]);

    const handleSave = () => {
        if (transaction && editData) {
            const updatedTransaction = {
                ...transaction,
                ...editData,
                money_amount: Number(editData.money_amount) || 0,
                start_date: editData.payment_type === 'once' ? (editData.day || '') : (editData.start_date || ''),
            };
            updateTransaction(transaction.id, updatedTransaction as Transaction);
            onClose();
        }
    };

    const handleDelete = () => {
        if (transaction) {
            deleteTransaction(transaction.id);
            onClose();
        }
    };

    const handleUpdate = (data: Partial<Transaction>) => {
        setEditData(prev => ({ ...prev, ...data }));
    };

    return (
        <IonModal
            id="edit-modal"
            ref={modal}
            isOpen={isOpen}
            onDidDismiss={onClose}
            initialBreakpoint={0.6}
            breakpoints={[0, 0.6, 0.95]}
            handleBehavior="cycle"
            keepContentsMounted={true}
            keyboardClose={false}
            className="action-sheet-modal"
        >
            <div className="ion-padding" style={{ background: 'var(--card-bg)', height: '100%', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '40px', height: '4px', background: 'var(--border-color)', borderRadius: '10px', margin: '10px auto 20px', flexShrink: 0 }}></div>

                {transaction && (
                    <EditTransaction 
                        transaction={editData}
                        onUpdate={handleUpdate}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        title="Edit Transaction"
                    />
                )}
            </div>
        </IonModal>
    );
};

export default EditTransactionModal;
