import React from 'react';
import { formatCurrency, formatDelta } from '../utils/formatCurrency';
import { useTranslation } from 'react-i18next';

interface BalanceStatsProps {
    balance: number;
    incomeDelta: number;
    expenseDelta: number;
}

const BalanceStats: React.FC<BalanceStatsProps> = ({ balance, incomeDelta, expenseDelta }) => {
    const { t } = useTranslation();
    return (
        <div className="balance-container">
            <div className="balance-label">{t('Current Balance')}</div>
            <div className="balance-amount">{formatCurrency(balance)}</div>
            <div style={{ fontSize: '0.9rem' }}>
                <span style={{ color: '#8eac8e' }}>↑ +{formatDelta(incomeDelta)}</span>&nbsp;
                <span style={{ color: '#d17b7b' }}>↓ -{formatDelta(expenseDelta)}</span>
            </div>
        </div>
    );
};

export default BalanceStats;
