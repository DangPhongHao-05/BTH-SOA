import apiClient, { SERVICES } from "../../../config/apiClient";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Đè baseURL sang cổng của Auth Service
    return apiClient.post("/auth/login", credentials, {
      baseURL: SERVICES.AUTH,
    });
  },

  register: async (data: RegisterCredentials): Promise<AuthResponse> => {
    return apiClient.post("/auth/register", data, {
      baseURL: SERVICES.AUTH,
    });
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    return apiClient.post("/auth/refresh-token", `"${token}"`, {
      baseURL: SERVICES.AUTH,
      headers: { "Content-Type": "application/json" },
    });
  },
};
