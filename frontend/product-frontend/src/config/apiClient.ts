import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

// Định nghĩa các Port của từng Microservice trong hệ thống của bạn
export const SERVICES = {
    AUTH: 'https://localhost:7092/api',
    PRODUCT: 'https://localhost:7007/api',
    // ORDER: 'https://localhost:7002/api', 
};

const apiClient = axios.create({
    // Mặc định lấy Product hoặc Gateway làm gốc, nhưng ta có thể override linh hoạt
    baseURL: SERVICES.PRODUCT, 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Interceptor Request: Tự động đính kèm Token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor Response: Tự động bóc data và xử lý lỗi 401
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Hết hạn token hoặc chưa đăng nhập!");
            localStorage.clear();
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;