import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product, ProductFormData } from "../types";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleFormSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      addProduct(data);
    }
  };

  return (
    <div className="space-y-4 font-mono text-gray-900">
      {/* Header Module */}
      <div className="border border-gray-300 bg-white p-4 shadow-sm">
        <div className="text-[11px] text-gray-500 uppercase tracking-wider">
          Phân hệ Quản trị (Product Module)
        </div>
        <h2 className="text-base font-bold text-gray-900 mt-0.5 uppercase">
          BẢNG ĐIỀU KHIỂN & QUẢN LÝ SẢN PHẨM
        </h2>
        <div className="pt-2 text-xs text-gray-600 font-sans">
          Hỗ trợ thêm, sửa, xóa và giám sát kho hàng theo thời gian thực.
        </div>
      </div>

      <ProductForm
        key={editingProduct ? editingProduct.id : "form-new-product"}
        initialData={editingProduct}
        onSubmit={handleFormSubmit}
        onCancel={() => setEditingProduct(null)}
      />

      <ProductTable
        products={products}
        onEdit={(product) => setEditingProduct(product)}
        onDelete={deleteProduct}
      />
    </div>
  );
}
