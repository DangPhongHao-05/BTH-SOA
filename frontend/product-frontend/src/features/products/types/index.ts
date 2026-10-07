export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    quantity: number;
}