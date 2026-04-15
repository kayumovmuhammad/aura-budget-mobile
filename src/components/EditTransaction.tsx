import React from 'react';
import {
    IonIcon,
    IonItem,
    IonInput,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import { arrowBackOutline, trashOutline, saveOutline } from 'ionicons/icons';
import confirmData from '../data/confirmData';
import { Transaction } from '../states/transactionsState';

interface EditTransactionProps {
    transaction: Partial<Transaction>;
    onUpdate: (data: Partial<Transaction>) => void;
    onSave: () => void;
    onBack?: () => void;
    onDelete?: () => void;
    title?: string;
}

const EditTransaction: React.FC<EditTransactionProps> = ({ 
    transaction, 
    onUpdate, 
    onSave, 
    onBack, 
    onDelete,
    title = "Details"
}) => {
    const paymentType = transaction.payment_type || 'once';

    const renderDynamicInputs = () => {
        const fields = confirmData[paymentType as keyof typeof confirmData];
        if (!fields) return null;

        return fields.map((field, idx) => {
            const value = (transaction as any)[field.name] || '';
            const handleChange = (e: any) => onUpdate({ [field.name]: e.detail.value! });

            const labelText = field.name.charAt(0).toUpperCase() + field.name.slice(1).replace('_', ' ');

            if (field.inputType === "input" || field.inputType === "input:number") {
                const inputType = field.inputType === "input:number" ? "number" : "text";
                return (
                    <IonItem key={idx} mode="md" style={{ borderRadius: '12px', marginTop: '12px' }}>
                        <IonInput type={inputType} label={labelText} labelPlacement="floating" value={value} onIonInput={handleChange} />
                    </IonItem>
                );
            }
            if (field.inputType === "input:date") {
                return (
                    <IonItem key={idx} mode="md" style={{ borderRadius: '12px', marginTop: '12px' }}>
                        <IonInput type="date" label={labelText} labelPlacement="stacked" value={value} onIonInput={handleChange} />
                    </IonItem>
                );
            }
            if (field.inputType === "input:weekday") {
                return (
                    <IonItem key={idx} mode="md" style={{ borderRadius: '12px', marginTop: '12px' }}>
                        <IonSelect label={labelText} labelPlacement="floating" value={value} onIonChange={handleChange}>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                <IonSelectOption key={d} value={d}>{d}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                );
            }
            if (field.inputType === "input:day_of_month") {
                return (
                    <IonItem key={idx} mode="md" style={{ borderRadius: '12px', marginTop: '12px' }}>
                        <IonInput type="number" min="1" max="31" label={`${labelText} (1-31)`} labelPlacement="floating" value={value} onIonInput={handleChange} />
                    </IonItem>
                );
            }
            if (field.inputType === "input:day_of_year") {
                return (
                    <IonItem key={idx} mode="md" style={{ borderRadius: '12px', marginTop: '12px' }}>
                        <IonInput type="text" placeholder="MM-DD" label={labelText} labelPlacement="floating" value={value} onIonInput={handleChange} />
                    </IonItem>
                );
            }
            return null;
        });
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                {onBack && (
                    <IonButton fill="clear" onClick={onBack} color="dark">
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton>
                )}
                <h2 style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0, flex: 1, textAlign: 'center' }}>
                    {title}
                </h2>
                {onBack && <div style={{ width: '48px' }}></div>}
            </div>

            <IonSegment value={transaction.type || 'waste'} onIonChange={e => onUpdate({ type: e.detail.value as any })} mode="ios" style={{ marginBottom: '16px' }}>
                <IonSegmentButton value="waste">
                    <IonLabel>Waste</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="income">
                    <IonLabel>Income</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            <IonItem style={{ borderRadius: '12px', marginBottom: '16px' }}>
                <IonSelect label="Payment Mode" labelPlacement="floating" value={paymentType} onIonChange={e => {
                    onUpdate({ payment_type: e.detail.value as any });
                }}>
                    <IonSelectOption value="once">Once</IonSelectOption>
                    <IonSelectOption value="daily">Daily</IonSelectOption>
                    <IonSelectOption value="weekly">Weekly</IonSelectOption>
                    <IonSelectOption value="monthly">Monthly</IonSelectOption>
                    <IonSelectOption value="annual">Annual</IonSelectOption>
                </IonSelect>
            </IonItem>

            {renderDynamicInputs()}

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                {onDelete && (
                    <IonButton expand="block" color="danger" fill="outline" style={{ flex: 1, borderRadius: '12px' }} onClick={onDelete}>
                        <IonIcon slot="start" icon={trashOutline} />
                        Delete
                    </IonButton>
                )}
                <IonButton expand="block" color="primary" style={{ flex: 1, borderRadius: '12px', '--border-radius': '12px' }} onClick={onSave}>
                    <IonIcon slot="start" icon={saveOutline} />
                    Save
                </IonButton>
            </div>
        </>
    );
};

export default EditTransaction;
