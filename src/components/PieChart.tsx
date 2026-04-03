import React from 'react';

interface PieChartProps {
    data: Record<string, number>;
}

// Sophisticated, muted, warm-neutral palette matching the app's stone/earth aesthetic
const colors = [
    '#918b76', // Primary Olive/Stone
    '#b87a62', // Muted Rust/Terra Cotta
    '#687a6d', // Muted Sage Green
    '#c4ad7a', // Warm Sand/Gold
    '#7f736b', // Warm Taupe
    '#a86b6b', // Muted Rose
    '#5c6e7a', // Slate Blue
    '#8a825e', // Dark Mustard
];

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const total = Object.values(data).reduce((acc, val) => acc + (Number(val) || 0), 0);
    
    if (total === 0 || Object.keys(data).length === 0) {
        return (
            <div style={{ textAlign: 'center', opacity: 0.5, padding: '30px 0' }}>
                <div style={{
                    width: '160px', height: '160px', borderRadius: '50%', background: 'transparent', border: '12px solid var(--border-color)', margin: '0 auto 15px'
                }}></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>No data to show</div>
            </div>
        );
    }

    let currentAngle = 0;
    // Sort array by value so largest wedges appear first
    const slices = Object.entries(data)
        .filter(([_, val]) => val > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([category, value], index) => {
            const percentage = (value / total) * 100;
            const color = colors[index % colors.length];
            const slice = `${color} ${currentAngle}% ${currentAngle + percentage}%`;
            currentAngle += percentage;
            return { category, value, percentage, color, slice };
        });

    const gradient = `conic-gradient(${slices.map(s => s.slice).join(', ')})`;

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
            {/* Elegant Donut Chart */}
            <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '35px' }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    borderRadius: '50%',
                    background: gradient,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}></div>
                
                {/* Donut Hole overlay */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '110px', height: '110px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.05)'
                }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-sub)', letterSpacing: '1px' }}>TOTAL</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>${total.toFixed(0)}</span>
                </div>
            </div>
            
            {/* Minimalist Legend */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', padding: '0 10px' }}>
                {slices.map((slice, i) => (
                    <div key={i} style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                        padding: '12px 16px', background: 'var(--chip-bg)', borderRadius: '16px',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: slice.color }}></div>
                            <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' }}>{slice.category}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>${slice.value.toFixed(2)}</span>
                            <span style={{ 
                                color: 'var(--text-sub)', 
                                background: 'rgba(0,0,0,0.1)',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                width: '48px',
                                textAlign: 'center'
                            }}>{Math.round(slice.percentage)}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
