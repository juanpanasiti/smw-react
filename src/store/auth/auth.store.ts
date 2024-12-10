import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AuthStore, UserData } from '../../types';

export const useAuthStore = create<AuthStore>()(
    devtools(
        (set, get) => ({
            userData: undefined,

            setUserData: (userData: UserData) => {
                set({ userData });
            },
            deleteUserData: () => set({ userData: undefined }),
            isLoggedIn: () => get().userData !== undefined,
        }),
        { name: 'AuthStore' }
    )
);
