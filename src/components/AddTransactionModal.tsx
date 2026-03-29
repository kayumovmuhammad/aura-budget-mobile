import React, { useRef, useState } from 'react';
import {
    IonModal,
} from '@ionic/react';
import useTransactionsState, { Transaction } from '../states/transactionsState';
import DescribeTransaction from './DescribeTransaction';
import EditTransaction from './EditTransaction';

interface AddTransactionModalProps {
    triggerId: string;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ triggerId }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const addTransaction = useTransactionsState(state => state.addTransaction);

    const [step, setStep] = useState<1 | 2>(1);
    const [transaction, setTransaction] = useState<Partial<Transaction>>({
        description: '',
        type: 'waste',
        payment_type: 'once',
    });

    const handleDismiss = () => {
        setStep(1);
        setTransaction({
            description: '',
            type: 'waste',
            payment_type: 'once',
        });
        modal.current?.dismiss();
    };

    const handleSave = () => {
        const newTransaction = {
            ...transaction,
            id: Date.now().toString(),
            money_amount: Number(transaction.money_amount) || 0,
            category: transaction.category || '',
            day: transaction.day || '',
            start_date: transaction.payment_type === 'once' ? (transaction.day || '') : (transaction.start_date || ''),
            finish_date: transaction.finish_date || '',
        };
        addTransaction(newTransaction as any);
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
