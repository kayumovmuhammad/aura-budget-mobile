import useSettingsState from '../states/settingsState';

/**
 * Formats a number as a currency string based on user settings
 */
export const formatCurrency = (val: number): string => {
    const currency = useSettingsState.getState().currency || 'USD';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val);
};

/**
 * Compact format for delta indicators (e.g. $1.2k for values >= 1000)
 */
export const formatDelta = (val: number): string => {
    const currency = useSettingsState.getState().currency || 'USD';
    if (val >= 1000) {
        // format to 1 decimal place without the currency symbol first, then append 'k'
        const parts = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 1 }).formatToParts(val / 1000);
        return parts.map(p => p.value).join('') + 'k';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val);
};
