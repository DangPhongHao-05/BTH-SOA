import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

// Định nghĩa các Port của từng Microservice
export const SERVICES = {
    AUTH: 'https://localhost:7092/api',
    PRODUCT: 'https://localhost:7007/api',
    // ORDER: 'https://localhost:7002/api', 
};

const apiClient = axios.create({
    // Mặc định lấy Product làm gốc (vì phần lớn tính năng sẽ gọi vào đây)
    baseURL: SERVICES.PRODUCT, 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Interceptor Request: Tự động đính kèm Token bảo vệ
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
    (response: AxiosResponse) => {
        // Trả về data luôn để bên ngoài không cần gọi response.data nữa
        return response.data;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Hết hạn token hoặc chưa đăng nhập!");
            localStorage.clear();
            // Đá về trang login ngay lập tức
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;