import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import useSettingsState from '../states/settingsState';
import NoScrollbarContainer from '../components/NoScrollbarContainer';

const Settings: React.FC = () => {
    const { theme, setTheme } = useSettingsState();

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
                            Settings
                        </h1>

                        <div className="balance-label" style={{ marginBottom: '12px', textAlign: 'left', marginLeft: '8px' }}>
                            Appearance
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
                                    <IonLabel style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>Light</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="system" className="summary-segment-btn">
                                    <IonLabel style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>Auto</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="dark" className="summary-segment-btn">
                                    <IonLabel style={{ fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>Dark</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </div>
                    </div>
                </NoScrollbarContainer>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
