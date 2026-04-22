import React, { useRef, useState } from 'react';
import { IonLabel, IonLoading, IonModal, useIonToast } from '@ionic/react';
import { Transaction } from '../data/types';
import DescribeTransaction from './DescribeTransaction';
import EditTransaction from './EditTransaction';
import fetcher from '../utils/fetcher';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTranslation } from 'react-i18next';

interface AddTransactionModalProps {
    triggerId: string;
    onSave: (transaction: Transaction) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ triggerId, onSave }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const { t } = useTranslation();
    const [step, setStep] = useState<1 | 2>(1);
    const [transaction, setTransaction] = useState<Partial<Transaction>>({
        description: '',
        type: 'waste',
        payment_type: 'once',
    });
    const [presentToast] = useIonToast();
    const [loading, setLoading] = useState<boolean>(false);

    const showError = (message: string) => {
        presentToast({
            message,
            swipeGesture: "vertical",
            duration: 5000,
            color: 'danger',
            position: 'top'
        });
    };

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

    const handleNext = () => {
        const description = transaction.description;

        if (!description || description.trim() === '') {
            showError(t("Please enter a description before continuing."));
            return;
        }

        setLoading(true);
        fetcher(`${import.meta.env.VITE_API_URL}/transaction/annotate`, {
            method: 'POST',
            body: JSON.stringify({ user_description: description }),
        }).then(res => {
            if (!res.ok) {
                throw new Error(t('Failed to annotate transaction'));
            }
            return res.json()
        }).then(data => {
            if (data.message != "ok") {
                throw new Error(data.message);
            }
            console.log(data);
            setTransaction(prev => ({ ...prev, ...data }));
            setStep(2);
        }).catch(err => {
            showError(err instanceof Error ? err.message : String(err));
        }).finally(() => {
            setLoading(false);
        });
    }

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

                {loading ?
                    <div>
                        <DotLottieReact
                            src="/assets/animations/loading.lottie"
                            autoplay
                            loop
                            style={{ width: '250px', height: '250px', marginLeft: "auto", marginRight: "auto" }}
                        />
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "var(--text-color)",
                            letterSpacing: "0.5px",
                            fontFamily: "var(--font-family)",
                            marginTop: "-20px"
                        }}>{t('Analyzing...')}</div>
                    </div> :
                    step === 1 ? (
                        <DescribeTransaction
                            description={transaction.description || ''}
                            setDescription={(val) => handleUpdate({ description: val })}
                            onNext={handleNext}
                        />
                    ) : (
                        <EditTransaction
                            transaction={transaction}
                            onUpdate={handleUpdate}
                            onSave={handleSave}
                            onBack={() => setStep(1)}
                        />
                    )
                }
            </div>
        </IonModal>
    );
};

export default AddTransactionModal;
