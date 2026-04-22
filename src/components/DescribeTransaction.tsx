import React, { useState, useEffect } from 'react';
import {
    IonIcon,
    IonItem,
    IonButton,
    IonTextarea,
    useIonToast
} from '@ionic/react';
import { mic, square } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Capacitor } from "@capacitor/core";
import useSettingsState from '../states/settingsState';

interface DescribeTransactionProps {
    description: string;
    setDescription: (val: string) => void;
    onNext: () => void;
}

const DescribeTransaction: React.FC<DescribeTransactionProps> = ({ description, setDescription, onNext }) => {
    const { t } = useTranslation();
    const [isListening, setIsListening] = useState(false);
    const { language } = useSettingsState();
    const [presentToast] = useIonToast();

    useEffect(() => {
        return () => {
            SpeechRecognition.removeAllListeners();
            SpeechRecognition.stop().catch(() => {});
        };
    }, []);

    const toggleListening = async () => {
        try {
            if (Capacitor.getPlatform() === 'web') {
                presentToast({
                    message: t("Speech recognition is not supported on the web browser."),
                    duration: 3000,
                    color: 'warning'
                });
                return;
            }

            if (isListening) {
                await SpeechRecognition.stop();
                setIsListening(false);
                return;
            }

            const { available } = await SpeechRecognition.available();
            if (!available) {
                presentToast({
                    message: t("Speech recognition is not available on this device."),
                    duration: 3000,
                    color: 'warning'
                });
                return;
            }

            let perm = await SpeechRecognition.checkPermissions();
            if (perm.speechRecognition !== 'granted') {
                perm = await SpeechRecognition.requestPermissions();
                if (perm.speechRecognition !== 'granted') {
                    presentToast({
                        message: t("Microphone permission denied."),
                        duration: 3000,
                        color: 'danger'
                    });
                    return;
                }
            }

            await SpeechRecognition.removeAllListeners();
            
            SpeechRecognition.addListener("partialResults", (data: any) => {
                if (data.matches && data.matches.length > 0) {
                    setDescription(data.matches[0]);
                }
            });

            // Android listener might fire listeningState
            SpeechRecognition.addListener("listeningState", (data: { status: 'started' | 'stopped' }) => {
                setIsListening(data.status === 'started');
            });

            let langCode = "en-US";
            if (language === 'ru') langCode = "ru-RU";
            else if (language === 'es') langCode = "es-ES";

            await SpeechRecognition.start({
                language: langCode,
                maxResults: 1,
                prompt: t("Say something..."),
                partialResults: true,
                popup: false,
            });
            
            setIsListening(true);
        } catch (error: any) {
            console.error("Speech Recognition Error:", error);
            setIsListening(false);
            presentToast({
                message: t("Speech recognition error.") + " " + (error?.message || ""),
                duration: 3000,
                color: 'danger'
            });
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('Annotate Transaction')}
            </h2>

            <div 
                className="voice-mic-btn" 
                style={{ 
                    margin: '20px auto', 
                    background: isListening ? 'rgba(255, 59, 48, 0.1)' : 'var(--chip-bg)',
                    color: isListening ? '#ff3b30' : 'var(--ion-color-primary)',
                    boxShadow: isListening ? '0 0 0 4px rgba(255, 59, 48, 0.2)' : 'none',
                    transition: 'all 0.3s ease'
                }}
                onClick={toggleListening}
            >
                <IonIcon icon={isListening ? square : mic}></IonIcon>
            </div>

            {isListening && (
                <p style={{ textAlign: 'center', color: '#ff3b30', fontSize: '0.9rem', marginTop: '-10px', marginBottom: '10px', fontWeight: 600 }}>
                    {t('Listening...')}
                </p>
            )}

            <IonItem mode="md" style={{ borderRadius: '12px', marginTop: '24px' }}>
                <IonTextarea
                    autoFocus
                    placeholder={t('E.g., Bought groceries for $50 at Walmart today')}
                    autoGrow
                    value={description}
                    onIonInput={e => setDescription(e.detail.value!)}
                />
            </IonItem>

            <IonButton expand="block" className="confirm-btn" style={{ marginTop: '24px' }} onClick={onNext}>
                {t('Next')}
            </IonButton>
        </>
    );
};

export default DescribeTransaction;
