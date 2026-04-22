import React from 'react';
import {
    IonIcon,
    IonItem,
    IonButton,
    IonTextarea
} from '@ionic/react';
import { mic } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

interface DescribeTransactionProps {
    description: string;
    setDescription: (val: string) => void;
    onNext: () => void;
}

const DescribeTransaction: React.FC<DescribeTransactionProps> = ({ description, setDescription, onNext }) => {
    const { t } = useTranslation();
    return (
        <>
            <h2 style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('Annotate Transaction', 'Annotate Transaction')}
            </h2>

            <div className="voice-mic-btn" style={{ margin: '20px auto' }}>
                <IonIcon icon={mic}></IonIcon>
            </div>

            <IonItem mode="md" style={{ borderRadius: '12px', marginTop: '24px' }}>
                <IonTextarea
                    autoFocus
                    placeholder={t('E.g., Bought groceries for $50 at Walmart today')}
                    autoGrow
                    value={description}
                    onIonInput={e => setDescription(e.detail.value!)}
                />
            </IonItem>

            <IonButton expand="block" className="confirm-btn" style={{ marginTop: '24px' }} onClick={onNext}>
                {t('Next', 'Next')}
            </IonButton>
        </>
    );
};

export default DescribeTransaction;
