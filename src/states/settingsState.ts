import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import capacitorStorage from '../storage/capasitorStorage';

interface SettingsState {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const useSettingsState = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'settings',
            storage: createJSONStorage(() => capacitorStorage),
        }
    )
);

export default useSettingsState;
