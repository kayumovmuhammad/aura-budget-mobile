import React, { useState, useRef, useEffect } from 'react';
import {
    IonModal, IonContent, IonList, IonItem, IonLabel, IonIcon,
    IonButton, IonInput, useIonAlert
} from '@ionic/react';
import { checkmarkCircle, addOutline, pencilOutline, removeCircleOutline, trash } from 'ionicons/icons';

import { Budget } from '../data/types';

interface BudgetSelectionModalProps {
    isOpen: boolean;
    onDidDismiss: () => void;
    budgets: Budget[];
    selectedBudget: number;
    onSelectBudget: (id: number) => void;
    onAddBudget: (title: string) => number;
    onEditBudget: (id: number, title: string) => void;
    onDeleteBudget: (id: number) => void;
}

const BudgetSelectionModal: React.FC<BudgetSelectionModalProps> = ({
    isOpen,
    onDidDismiss,
    budgets,
    selectedBudget,
    onSelectBudget,
    onAddBudget,
    onEditBudget,
    onDeleteBudget,
}) => {
    const [isManageMode, setIsManageMode] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const inputRef = useRef<HTMLIonInputElement>(null);

    const [editingBudget, setEditingBudget] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const editInputRef = useRef<HTMLIonInputElement>(null);

    const [presentAlert] = useIonAlert();

    useEffect(() => {
        if (isAdding) {
            setTimeout(() => {
                inputRef.current?.setFocus();
            }, 100);
        } else {
            setNewTitle('');
        }
    }, [isAdding]);

    useEffect(() => {
        if (editingBudget !== null) {
            setTimeout(() => {
                editInputRef.current?.setFocus();
            }, 100);
        }
    }, [editingBudget]);

    useEffect(() => {
        if (!isOpen) {
            setIsAdding(false);
            setNewTitle('');
            setEditingBudget(null);
            setEditTitle('');
            setIsManageMode(false);
        }
    }, [isOpen]);

    const handleSaveNewBudget = () => {
        const title = newTitle.trim();
        if (title) {
            const newId = onAddBudget(title);
            onSelectBudget(newId);
            setIsAdding(false);
            setNewTitle('');
            onDidDismiss();
        } else {
            setIsAdding(false);
        }
    };

    const handleSaveEdit = () => {
        if (editingBudget !== null && editTitle.trim()) {
            onEditBudget(editingBudget, editTitle.trim());
        }
        setEditingBudget(null);
    };

    const startEditing = (b: Budget, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditTitle(b.title);
        setEditingBudget(b.id);
    };

    const confirmDelete = (b: Budget, e: React.MouseEvent) => {
        e.stopPropagation();
        if (budgets.length <= 1) {
            presentAlert({
                header: 'Cannot Delete',
                message: 'You must have at least one budget.',
                buttons: ['OK'],
            });
            return;
        }
        presentAlert({
            header: 'Delete Budget?',
            message: `Are you sure you want to delete "${b.title}" and all its associated transactions?`,
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        onDeleteBudget(b.id);
                        if (editingBudget === b.id) setEditingBudget(null);
                    }
                }
            ],
        });
    };

    return (
        <IonModal
            id="budget-modal"
            isOpen={isOpen}
            onDidDismiss={onDidDismiss}
            handleBehavior="cycle"
            keepContentsMounted={true}
            keyboardClose={false}
            initialBreakpoint={0.5}
            breakpoints={[0, 0.5, 0.75]}
            className="action-sheet-modal"
        >
            <div className="ion-padding" style={{ background: 'var(--card-bg)', height: '100%', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '40px', height: '4px', background: 'var(--border-color)', borderRadius: '10px', margin: '0 auto 16px', flexShrink: 0 }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                        Select Budget
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonButton
                            fill="clear"
                            onClick={() => {
                                setIsManageMode(!isManageMode);
                                setEditingBudget(null);
                                setIsAdding(false);
                            }}
                            style={{ margin: 0, textTransform: 'none', fontWeight: 600 }}
                        >
                            {isManageMode ? 'Done' : 'Edit'}
                        </IonButton>
                        {!isManageMode && (
                            <IonButton fill="clear" onClick={() => setIsAdding(true)} style={{ margin: 0, '--padding-end': 0 }}>
                                <IonIcon slot="icon-only" icon={addOutline} color="primary" />
                            </IonButton>
                        )}
                    </div>
                </div>

                <IonList lines="none">
                    {isAdding && !isManageMode && (
                        <IonItem style={{ '--background': 'var(--chip-bg)', borderRadius: '12px', marginBottom: '8px' }}>
                            <IonInput
                                ref={inputRef}
                                value={newTitle}
                                placeholder="New budget name"
                                onIonInput={(e) => setNewTitle(e.detail.value!)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') handleSaveNewBudget();
                                }}
                                onIonBlur={() => {
                                    if (newTitle.trim()) handleSaveNewBudget();
                                    else setIsAdding(false);
                                }}
                            />
                        </IonItem>
                    )}
                    {budgets.map(b => {
                        const isEditingThis = b.id === editingBudget;
                        return (
                            <IonItem
                                key={b.id}
                                button={!isManageMode && !isEditingThis}
                                onClick={() => {
                                    if (!isManageMode && !isEditingThis) {
                                        onSelectBudget(b.id);
                                        onDidDismiss();
                                    }
                                }}
                                style={b.id === selectedBudget || isEditingThis
                                    ? { '--background': 'var(--chip-bg)', borderRadius: '12px', marginBottom: '8px' }
                                    : { borderRadius: '12px', marginBottom: '8px' }}
                            >
                                {isManageMode && !isEditingThis && (
                                    <IonButton
                                        slot="start"
                                        fill="clear"
                                        color="danger"
                                        onClick={(e) => confirmDelete(b, e)}
                                        style={{ margin: 0, '--padding-start': '0', '--padding-end': '8px' }}
                                    >
                                        <IonIcon slot="icon-only" icon={removeCircleOutline} />
                                    </IonButton>
                                )}

                                {isEditingThis ? (
                                    <IonInput
                                        ref={editInputRef}
                                        value={editTitle}
                                        onIonInput={(e) => setEditTitle(e.detail.value!)}
                                        onKeyUp={(e) => {
                                            if (e.key === 'Enter') handleSaveEdit();
                                        }}
                                        onIonBlur={() => {
                                            if (editTitle.trim()) handleSaveEdit();
                                            else setEditingBudget(null);
                                        }}
                                    />
                                ) : (
                                    <IonLabel style={{ color: 'var(--text-main)', opacity: isManageMode && budgets.length <= 1 ? 0.6 : 1 }}>
                                        {b.title}
                                    </IonLabel>
                                )}

                                {!isManageMode && b.id === selectedBudget && !isEditingThis && (
                                    <IonIcon icon={checkmarkCircle} slot="end" color="primary" />
                                )}

                                {isManageMode && !isEditingThis && (
                                    <IonButton
                                        slot="end"
                                        fill="clear"
                                        color="medium"
                                        onClick={(e) => startEditing(b, e)}
                                        style={{ margin: 0, '--padding-start': '8px', '--padding-end': '0' }}
                                    >
                                        <IonIcon slot="icon-only" icon={pencilOutline} />
                                    </IonButton>
                                )}
                            </IonItem>
                        );
                    })}
                </IonList>
            </div>
        </IonModal>
    );
};

export default BudgetSelectionModal;
