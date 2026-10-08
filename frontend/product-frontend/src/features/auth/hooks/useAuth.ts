import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";
import type { LoginCredentials, RegisterCredentials, User } from "../types";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser !== "undefined") {
      try {
        return JSON.parse(savedUser);
      } catch (err) {
        console.error("Lỗi đọc user từ localStorage:", err);
        return null;
      }
    }
    return null;
  });

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);

      localStorage.setItem("token", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    credentials: RegisterCredentials,
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      // Gọi API đăng ký
      const responseData = await authApi.register(credentials);
      return responseData.message;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Đăng ký thất bại. Định danh có thể đã tồn tại.",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth/login");
  };

  return { user, isLoading, error, login, register, logout };
};
