import React, { useState } from 'react';
import { IonCard, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

const SummaryCard: React.FC = () => {
    const [segment, setSegment] = useState<'income' | 'wastes'>('wastes');

    return (
        <IonCard className="ion-padding summary-card">
            <IonSegment
                value={segment}
                mode="ios"
                className="summary-segment"
                onIonChange={(e) => setSegment(e.detail.value as 'income' | 'wastes')}
            >
                <IonSegmentButton value="income" className="summary-segment-btn">
                    <IonLabel>Income</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="wastes" className="summary-segment-btn">
                    <IonLabel>Wastes</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            <div className="chart-placeholder">
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>
                        FEBRUARY
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                        $850.40
                    </div>
                </div>
            </div>
        </IonCard>
    );
};

export default SummaryCard;
