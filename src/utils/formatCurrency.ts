// Pure formatting helpers — no side effects, no imports from stores.

/**
 * Formats a number as USD currency string (e.g. $1,234.56)
 */
export const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
};

/**
 * Compact format for delta indicators (e.g. $1.2k for values >= 1000)
 */
export const formatDelta = (val: number): string => {
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
    return `$${val.toFixed(2)}`;
};
