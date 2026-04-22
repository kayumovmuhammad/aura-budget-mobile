import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSegment, IonSegmentButton, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import useSettingsState from '../states/settingsState';
import NoScrollbarContainer from '../components/NoScrollbarContainer';
import { useTranslation } from 'react-i18next';

const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar' },
    { code: 'CNY', symbol: 'CN¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
    { code: 'TJS', symbol: 'SM', name: 'Tajikistani Somoni' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
    { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
    { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
    { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },
    { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
    { code: 'COP', symbol: '$', name: 'Colombian Peso' },
    { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
    { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
];

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'es', name: 'Español' }
];

const Settings: React.FC = () => {
    const { theme, setTheme, currency, setCurrency, language, setLanguage } = useSettingsState();
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar style={{ paddingBottom: '10px' }}>
                    <IonButtons slot="start">
                        <IonButton routerLink="/home" routerDirection="back" color="primary">
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen scrollY={false} forceOverscroll={false} style={{ '--background': 'var(--app-bg)' }}>
                <NoScrollbarContainer>
                    <div className="ion-padding">
                        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: '8px 0 32px 0', letterSpacing: '-0.5px' }}>
                            {t('Settings')}
                        </h1>

                        <div className="balance-label" style={{ marginBottom: '12px', textAlign: 'left', marginLeft: '8px' }}>
                            {t('Appearance')}
                        </div>

                        <div style={{
                            background: 'var(--card-bg)',
                            borderRadius: '24px',
                            padding: '8px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                        }}>
                            <IonSegment
                                mode="ios"
                                value={theme}
                                onIonChange={e => setTheme(e.detail.value as any)}
                                className="summary-segment"
                                style={{ margin: 0, width: '100%', padding: '2px' }}
                            >
                                <IonSegmentButton value="light" className="summary-segment-btn">
                                    <IonLabel style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>{t('Light')}</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="system" className="summary-segment-btn">
                                    <IonLabel style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>{t('Auto')}</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="dark" className="summary-segment-btn">
                                    <IonLabel style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>{t('Dark')}</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </div>

                        <div className="balance-label" style={{ marginBottom: '12px', marginTop: '24px', textAlign: 'left', marginLeft: '8px' }}>
                            {t('Currency')}
                        </div>

                        <div style={{
                            background: 'var(--card-bg)',
                            borderRadius: '24px',
                            padding: '8px 16px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                        }}>
                            <IonSelect
                                value={currency}
                                onIonChange={e => setCurrency(e.detail.value)}
                                interface="action-sheet"
                                style={{ width: '100%', color: 'var(--text-main)', fontWeight: 500 }}
                            >
                                {CURRENCIES.map(curr => (
                                    <IonSelectOption key={curr.code} value={curr.code}>
                                        {curr.code} - {curr.name} ({curr.symbol})
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </div>

                        <div className="balance-label" style={{ marginBottom: '12px', marginTop: '24px', textAlign: 'left', marginLeft: '8px' }}>
                            {t('Language')}
                        </div>

                        <div style={{
                            background: 'var(--card-bg)',
                            borderRadius: '24px',
                            padding: '8px 16px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                        }}>
                            <IonSelect
                                value={language}
                                onIonChange={e => setLanguage(e.detail.value)}
                                interface="action-sheet"
                                style={{ width: '100%', color: 'var(--text-main)', fontWeight: 500 }}
                            >
                                {LANGUAGES.map(lang => (
                                    <IonSelectOption key={lang.code} value={lang.code}>
                                        {lang.name}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </div>
                    </div>
                </NoScrollbarContainer>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
