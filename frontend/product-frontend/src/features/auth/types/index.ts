export interface User {
    id: string;
    username: string;
    fullName?: string;
    role?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
    email?: string;
    fullName?: string;
}

export interface AuthResponse {
    token: string;
    refreshToken?: string;
    user: User;
}