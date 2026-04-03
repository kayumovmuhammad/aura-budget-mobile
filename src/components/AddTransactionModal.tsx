import React, { useRef, useState } from 'react';
import { IonModal } from '@ionic/react';
import { Transaction } from '../data/types';
import DescribeTransaction from './DescribeTransaction';
import EditTransaction from './EditTransaction';

interface AddTransactionModalProps {
    triggerId: string;
    onSave: (transaction: Transaction) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ triggerId, onSave }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const [step, setStep] = useState<1 | 2>(1);
    const [transaction, setTransaction] = useState<Partial<Transaction>>({
        description: '',
        type: 'waste',
        payment_type: 'once',
    });

    const handleDismiss = () => {
        setStep(1);
        setTransaction({ description: '', type: 'waste', payment_type: 'once' });
        modal.current?.dismiss();
    };

    const handleSave = () => {
        const newTransaction: Transaction = {
            ...transaction,
            id: Date.now().toString(),
            money_amount: Number(transaction.money_amount) || 0,
            category: transaction.category || '',
            day: transaction.day || '',
            start_date: transaction.payment_type === 'once'
                ? (transaction.day as string || '')
                : (transaction.start_date || ''),
            finish_date: transaction.finish_date || '',
        } as Transaction;
        onSave(newTransaction);
        handleDismiss();
    };

    const handleUpdate = (data: Partial<Transaction>) => {
        setTransaction(prev => ({ ...prev, ...data }));
    };

    return (
        <IonModal
            id="add-modal"
            ref={modal}
            trigger={triggerId}
            initialBreakpoint={0.6}
            breakpoints={[0, 0.6, 0.95]}
            handleBehavior="cycle"
            keepContentsMounted={true}
            keyboardClose={false}
            className="action-sheet-modal"
            onDidDismiss={handleDismiss}
        >
            <div className="ion-padding" style={{ background: 'var(--card-bg)', height: '100%', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '40px', height: '4px', background: 'var(--border-color)', borderRadius: '10px', margin: '10px auto 20px', flexShrink: 0 }}></div>

                {step === 1 ? (
                    <DescribeTransaction
                        description={transaction.description || ''}
                        setDescription={(val) => handleUpdate({ description: val })}
                        onNext={() => setStep(2)}
                    />
                ) : (
                    <EditTransaction
                        transaction={transaction}
                        onUpdate={handleUpdate}
                        onSave={handleSave}
                        onBack={() => setStep(1)}
                    />
                )}
            </div>
        </IonModal>
    );
};

export default AddTransactionModal;
