import React from 'react';

interface BalanceStatsProps {
    balance: number;
    incomeDelta: number;
    expenseDelta: number;
}

const BalanceStats: React.FC<BalanceStatsProps> = ({ balance, incomeDelta, expenseDelta }) => {
    // A simple formatter
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    const formatDelta = (val: number) => {
        if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
        return `$${val}`;
    };

    return (
        <div className="balance-container">
            <div className="balance-label">Current Balance</div>
            <div className="balance-amount">{formatCurrency(balance)}</div>
            <div style={{ fontSize: '0.9rem' }}>
                <span style={{ color: '#8eac8e' }}>↑ +{formatDelta(incomeDelta)}</span> &nbsp;
                <span style={{ color: '#d17b7b' }}>↓ -{formatDelta(expenseDelta)}</span>
            </div>
        </div>
    );
};

export default BalanceStats;
