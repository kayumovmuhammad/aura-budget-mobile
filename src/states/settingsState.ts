import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import capacitorStorage from '../storage/capasitorStorage';

interface SettingsState {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    currency: string;
    setCurrency: (currency: string) => void;
    language: string;
    setLanguage: (language: string) => void;
}

const useSettingsState = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => set({ theme }),
            currency: 'USD',
            setCurrency: (currency) => set({ currency }),
            language: 'en',
            setLanguage: (language) => set({ language }),
        }),
        {
            name: 'settings',
            storage: createJSONStorage(() => capacitorStorage),
        }
    )
);

export default useSettingsState;
