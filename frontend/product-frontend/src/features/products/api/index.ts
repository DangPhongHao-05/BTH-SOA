import type { Product, ProductFormData } from '../types';
import apiClient from '../../../config/apiClient';

export const productApi = {
    getAll: async (): Promise<Product[]> => {
        return apiClient.get('/product');
    },
    
    create: async (data: ProductFormData): Promise<Product> => {
        return apiClient.post('/product', data);
    },
    
    update: async (id: number, data: ProductFormData): Promise<void> => {
        return apiClient.put(`/product/${id}`, data);
    },
    
    delete: async (id: number): Promise<void> => {
        return apiClient.delete(`/product/${id}`);
    }
};