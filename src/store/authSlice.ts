import { StateCreator } from 'zustand';
import { StoreType } from './store';
import { AuthData } from '../auth/interfaces';

export interface AuthSlice {
    authData?: AuthData;
    setAuthData: (authData: AuthData) => void;
    // TODO: updateAuthData
    deleteAuthData: () => void;
}

export const createAuthSlice: StateCreator<StoreType, [], [], AuthSlice> = (set) => ({
    authData: undefined,
    setAuthData: (authData: AuthData) => set({ authData }),
    deleteAuthData: () => set({ authData: undefined }),
});
