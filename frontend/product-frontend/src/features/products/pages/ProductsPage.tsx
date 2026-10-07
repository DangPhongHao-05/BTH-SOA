import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product, ProductFormData } from "../types";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

export default function ProductsPage() {
    // 1. Gọi logic từ Hook
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    
    // 2. State quản lý việc đang sửa sản phẩm nào
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // 3. Hàm xử lý khi người dùng bấm Submit ở Form
    const handleFormSubmit = (data: ProductFormData) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, data);
            setEditingProduct(null); // Thoát chế độ sửa
        } else {
            addProduct(data);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Quản lý Sản phẩm</h1>
                <p className="text-slate-500 mt-1 text-sm">Thêm, sửa, xóa và xem danh sách sản phẩm trong kho.</p>
            </div>

            {/* Gọi Component Form */}
            <ProductForm 
                initialData={editingProduct} 
                onSubmit={handleFormSubmit} 
                onCancel={() => setEditingProduct(null)} 
            />

            {/* Gọi Component Table */}
            <ProductTable 
                products={products} 
                onEdit={(product) => setEditingProduct(product)} 
                onDelete={deleteProduct} 
            />
        </div>
    );
}