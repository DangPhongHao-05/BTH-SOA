import { useState } from "react"; 
import type { Product, ProductFormData } from "../types";

interface ProductFormProps {
    initialData?: Product | null;
    onSubmit: (data: ProductFormData) => void;
    onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
    // 1. CHỈ CẦN KHỞI TẠO STATE Ở ĐÂY LÀ ĐỦ (XÓA BỎ HẲN useEffect)
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
        if (!initialData) {
            setFormData({ name: "", description: "", price: 0, quantity: 0 }); 
        }
    };

    return (
        <div className="border border-gray-300 bg-white mt-4">
            <div className="p-3 border-b border-gray-300 bg-gray-50 text-xs flex justify-between items-center">
                <span className="font-bold uppercase text-gray-900">
                    {initialData ? "[*] CẬP NHẬT THÔNG TIN SẢN PHẨM" : "[+] THÊM SẢN PHẨM MỚI BÀN GIAO"}
                </span>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Tên sản phẩm *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                               className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Mô tả đặc tả</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} 
                               className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Giá niêm yết *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" 
                               className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Tồn kho *</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="0" 
                               className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors" />
                    </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-200 mt-4 pt-4">
                    <button type="submit" className="px-4 py-1.5 bg-gray-900 border border-gray-900 hover:bg-gray-800 text-white text-xs font-bold uppercase transition-colors cursor-pointer">
                        {initialData ? "[LƯU THAY ĐỔI]" : "[GHI NHẬN MỚI]"}
                    </button>
                    {initialData && (
                        <button type="button" onClick={onCancel} className="px-4 py-1.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase transition-colors cursor-pointer">
                            [HỦY BỎ LỆNH]
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}