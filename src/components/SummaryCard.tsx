import React, { useState } from 'react';
import { IonCard, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

import PieChart from './PieChart';
import { formatCurrency } from '../utils/formatCurrency';
import { useTranslation } from 'react-i18next';

interface SummaryCardProps {
    income: number;
    waste: number;
    incomeByCategory: Record<string, number>;
    wasteByCategory: Record<string, number>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ income, waste, incomeByCategory, wasteByCategory }) => {
    const [segment, setSegment] = useState<'income' | 'wastes'>('wastes');
    const { t } = useTranslation();

    return (
        <IonCard className="ion-padding summary-card">
            <IonSegment
                value={segment}
                mode="ios"
                className="summary-segment"
                onIonChange={(e) => setSegment(e.detail.value as 'income' | 'wastes')}
            >
                <IonSegmentButton value="income" className="summary-segment-btn">
                    <IonLabel>{t('Income')}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="wastes" className="summary-segment-btn">
                    <IonLabel>{t('Wastes')}</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            <div className="chart-placeholder" style={{ padding: '20px 0 10px' }}>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>
                        {t('ALL-TIME')}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.2rem' }}>
                        {formatCurrency(segment === 'income' ? income : waste)}
                    </div>
                </div>
                
                <PieChart data={segment === 'income' ? incomeByCategory : wasteByCategory} />
            </div>
        </IonCard>
    );
};

export default SummaryCard;
