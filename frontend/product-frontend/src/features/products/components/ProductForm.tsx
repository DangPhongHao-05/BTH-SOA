import { useState } from "react"; 
import type { Product, ProductFormData } from "../types";

interface ProductFormProps {
    initialData?: Product | null;
    onSubmit: (data: ProductFormData) => void;
    onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
    // Khởi tạo State một lần duy nhất dựa trên initialData truyền vào
    const [formData, setFormData] = useState<ProductFormData>(() => {
        if (initialData) {
            return {
                name: initialData.name,
                description: initialData.description || "",
                price: initialData.price,
                quantity: initialData.quantity
            };
        }
        return { name: "", description: "", price: 0, quantity: 0 };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "price" || name === "quantity" ? Number(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        
        // Chỉ reset form nếu đang ở chế độ thêm mới. 
        // Ở chế độ sửa, Component cha sẽ tự lo việc ẩn form/reset.
        if (!initialData) {
            setFormData({ name: "", description: "", price: 0, quantity: 0 }); 
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            {/* ... Giữ nguyên toàn bộ phần giao diện return (các thẻ input, button) như cũ ... */}
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                {initialData ? "✏️ Cập nhật sản phẩm" : "✨ Thêm sản phẩm mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                 {/* Khối input của bạn giữ nguyên không thay đổi gì */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tên sản phẩm *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Giá bán *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Số lượng *</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700" />
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        {initialData ? "Lưu thay đổi" : "Thêm mới"}
                    </button>
                    {initialData && (
                        <button type="button" onClick={onCancel} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium py-2 px-6 rounded-lg transition-colors">
                            Hủy bỏ
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}