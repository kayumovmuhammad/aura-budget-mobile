import React, { useState } from 'react';
import { IonPage, IonContent, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonLabel, IonFooter } from '@ionic/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSettingsState from '../states/settingsState';
import useTransactionsState from '../states/transactionsState';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { CURRENCIES, LANGUAGES } from '../data/constants';

const Welcome: React.FC = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const { language, setLanguage, theme, setTheme, currency, setCurrency, setUserID } = useSettingsState();
    const addBudget = useTransactionsState(state => state.addBudget);

    const handleLanguageChange = (lng: string) => {
        setLanguage(lng);
        i18n.changeLanguage(lng);
    };

    const handleFinish = () => {

        const newUserId = uuidv4();
        addBudget(t('Personal Budget'));
        
        setUserID(newUserId);
        history.replace('/home');
    };

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding" scrollY={false} style={{ '--background': 'var(--app-bg)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ padding: '0 8px' }}
                    >
                        {/* Logo & Header */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.5 }}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '30px',
                                    background: 'var(--ion-color-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px',
                                    boxShadow: '0 20px 40px rgba(var(--ion-color-primary-rgb), 0.3)'
                                }}
                            >
                                <span style={{ fontSize: '48px', color: '#fff', fontWeight: 'bold' }}>A</span>
                            </motion.div>
                            <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                                {t('Welcome')}
                            </h1>
                            <p style={{ fontSize: '16px', color: 'var(--text-muted)', margin: 0 }}>
                                {t('Personalize your experience')}
                            </p>
                        </div>

                        {/* Settings Form exactly matching Settings.tsx */}
                        <div>
                            <div className="balance-label" style={{ marginBottom: '12px', textAlign: 'left', marginLeft: '8px' }}>
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
                                    onIonChange={e => handleLanguageChange(e.detail.value)}
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

                            <div className="balance-label" style={{ marginBottom: '12px', marginTop: '24px', textAlign: 'left', marginLeft: '8px' }}>
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
                        </div>

                    </motion.div>
                </div>
            </IonContent>

            <IonFooter className="ion-no-border" style={{ background: 'transparent' }}>
                <div style={{ padding: '16px 24px 40px 24px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 25 }}
                        onClick={handleFinish}
                        style={{
                            width: '100%',
                            height: '64px',
                            background: 'var(--ion-color-primary)',
                            color: '#ffffff',
                            fontSize: '20px',
                            fontWeight: 700,
                            border: 'none',
                            borderRadius: '32px',
                            boxShadow: '0 12px 28px rgba(var(--ion-color-primary-rgb), 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        {t('Get Started')}
                    </motion.button>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default Welcome;
