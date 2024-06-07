import { User, Profile, Settings } from '.';

export interface AuthData {
    user: User;
    profile: Profile;
    settings: Settings;
    token: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData extends LoginData {
    email: string;
    firstname: string;
    lastname: string;
}
