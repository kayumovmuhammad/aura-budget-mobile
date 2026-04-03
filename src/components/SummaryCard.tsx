import React, { useState } from 'react';
import { IonCard, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

import PieChart from './PieChart';

interface SummaryCardProps {
    income: number;
    waste: number;
    incomeByCategory: Record<string, number>;
    wasteByCategory: Record<string, number>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ income, waste, incomeByCategory, wasteByCategory }) => {
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

            <div className="chart-placeholder" style={{ padding: '20px 0 10px' }}>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>
                        ALL-TIME
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.2rem' }}>
                        ${segment === 'income' ? income.toFixed(2) : waste.toFixed(2)}
                    </div>
                </div>
                
                <PieChart data={segment === 'income' ? incomeByCategory : wasteByCategory} />
            </div>
        </IonCard>
    );
};

export default SummaryCard;
