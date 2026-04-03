import React, { useRef, useEffect } from 'react';
import { IonModal } from '@ionic/react';
import { Transaction } from '../data/types';
import EditTransaction from './EditTransaction';

interface EditTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
    onSave: (id: string, transaction: Transaction) => void;
    onDelete: (id: string) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
    isOpen,
    onClose,
    transaction,
    onSave,
    onDelete,
}) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const [editData, setEditData] = React.useState<Partial<Transaction>>({});

    useEffect(() => {
        if (transaction) setEditData(transaction);
    }, [transaction]);

    const handleSave = () => {
        if (transaction && editData) {
            const updated: Transaction = {
                ...transaction,
                ...editData,
                money_amount: Number(editData.money_amount) || 0,
                start_date: editData.payment_type === 'once'
                    ? (editData.day as string || '')
                    : (editData.start_date || ''),
            };
            onSave(transaction.id, updated);
        }
    };

    const handleDelete = () => {
        if (transaction) onDelete(transaction.id);
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
