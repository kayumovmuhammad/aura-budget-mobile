import React, { useState, useRef, useEffect } from 'react';
import { IonModal, IonContent, IonList, IonItem, IonLabel, IonIcon, IonButton, IonInput } from '@ionic/react';
import { checkmarkCircle, addOutline } from 'ionicons/icons';

interface BudgetSelectionModalProps {
    isOpen: boolean;
    onDidDismiss: () => void;
    budgets: string[];
    selectedBudget: string;
    onSelectBudget: (budget: string) => void;
    onAddBudget: (budget: string) => void;
}

const BudgetSelectionModal: React.FC<BudgetSelectionModalProps> = ({
    isOpen,
    onDidDismiss,
    budgets,
    selectedBudget,
    onSelectBudget,
    onAddBudget,
}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const inputRef = useRef<HTMLIonInputElement>(null);

    useEffect(() => {
        if (isAdding) {
            setTimeout(() => {
                inputRef.current?.setFocus();
            }, 100);
        } else {
            setNewTitle(''); // reset when closed
        }
    }, [isAdding]);

    // Also reset when modal closes completely
    useEffect(() => {
        if (!isOpen) {
            setIsAdding(false);
            setNewTitle('');
        }
    }, [isOpen]);

    const handleSaveNewBudget = () => {
        const title = newTitle.trim();
        if (title) {
            onAddBudget(title);
            onSelectBudget(title);
            setIsAdding(false);
            setNewTitle('');
            onDidDismiss();
        } else {
            setIsAdding(false);
        }
    };

    return (
        <IonModal
            id="budget-modal"
            isOpen={isOpen}
            onDidDismiss={onDidDismiss}
            initialBreakpoint={0.5}
            breakpoints={[0, 0.5, 0.75]}
            className="action-sheet-modal"
        >
            <IonContent className="ion-padding" style={{ '--background': 'var(--card-bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                        Select Budget
                    </h3>
                    <IonButton fill="clear" onClick={() => setIsAdding(true)} style={{ margin: 0, '--padding-end': 0 }}>
                        <IonIcon slot="icon-only" icon={addOutline} color="primary" />
                    </IonButton>
                </div>
                
                <IonList lines="none">
                    {isAdding && (
                        <IonItem style={{ '--background': 'var(--chip-bg)', borderRadius: '12px', marginBottom: '8px' }}>
                            <IonInput
                                ref={inputRef}
                                value={newTitle}
                                placeholder="Budget name"
                                onIonInput={(e) => setNewTitle(e.detail.value!)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSaveNewBudget();
                                    }
                                }}
                                onIonBlur={() => {
                                    if (newTitle.trim()) {
                                        handleSaveNewBudget();
                                    } else {
                                        setIsAdding(false);
                                    }
                                }}
                            />
                        </IonItem>
                    )}
                    {budgets.map(b => (
                        <IonItem
                            key={b}
                            button
                            onClick={() => {
                                onSelectBudget(b);
                                onDidDismiss();
                            }}
                            style={b === selectedBudget
                                ? { '--background': 'var(--chip-bg)', borderRadius: '12px', marginBottom: '8px' }
                                : { borderRadius: '12px', marginBottom: '8px' }}
                        >
                            <IonLabel style={{ color: 'var(--text-main)' }}>{b}</IonLabel>
                            {b === selectedBudget && (
                                <IonIcon icon={checkmarkCircle} slot="end" color="primary" />
                            )}
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonModal>
    );
};

export default BudgetSelectionModal;
