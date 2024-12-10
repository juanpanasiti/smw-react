export interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    spentAlert: number;
    monthlyPaymentAlert: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthStore {
    // Properties
    userData?: UserData;

    // Methods
    setUserData: (userData: UserData) => void;
    deleteUserData: () => void;
    isLoggedIn: () => boolean;
}
