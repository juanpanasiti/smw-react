import { create } from 'zustand';
import { AuthStore, UserData } from '../../types';

export const useAuthStore = create<AuthStore>((set) => ({
    userData: undefined,
    get isLoggedIn(): boolean {
        return !!this.userData;
    },
    setUserData: (userData: UserData) => set({ userData }),
    deleteUserData: () => set({ userData: undefined }),
}));
