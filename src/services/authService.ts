import api from './api';
import type { LoginRequest, RegisterRequest, TokenResponse, User } from '../types';

export const authService = {
    async login(data: LoginRequest): Promise<TokenResponse> {
        const response = await api.post<TokenResponse>('/auth/login', data);
        return response.data;
    },

    async register(data: RegisterRequest): Promise<TokenResponse> {
        const response = await api.post<TokenResponse>('/auth/register', data);
        return response.data;
    },

    async getMe(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },
};
