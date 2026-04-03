import React from 'react';
import { IonModal, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

interface BudgetSelectionModalProps {
    isOpen: boolean;
    onDidDismiss: () => void;
    budgets: string[];
    selectedBudget: string;
    onSelectBudget: (budget: string) => void;
}

const BudgetSelectionModal: React.FC<BudgetSelectionModalProps> = ({
    isOpen,
    onDidDismiss,
    budgets,
    selectedBudget,
    onSelectBudget,
}) => {
    return (
        <IonModal
            id="budget-modal"
            isOpen={isOpen}
            onDidDismiss={onDidDismiss}
            initialBreakpoint={0.4}
            breakpoints={[0, 0.4]}
            className="action-sheet-modal"
        >
            <IonContent className="ion-padding" style={{ '--background': 'var(--card-bg)' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                    Select Budget
                </h3>
                <IonList lines="none">
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
                                : { borderRadius: '12px' }}
                        >
                            <IonLabel>{b}</IonLabel>
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
