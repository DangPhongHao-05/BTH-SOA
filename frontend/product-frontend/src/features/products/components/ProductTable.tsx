import type { Product } from "../types";

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    return (
        <div className="border border-gray-300 bg-white mt-4">
            <div className="p-3 border-b border-gray-300 bg-gray-50 text-xs flex justify-between items-center">
                <span className="font-bold uppercase text-gray-900">
                    SỔ ĐĂNG KÝ SẢN PHẨM (PRODUCT REGISTRY)
                </span>
                <span className="text-[11px] text-gray-500 font-sans">
                    Tổng số: {products.length} bản ghi
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-[11px] uppercase border-b border-gray-300">
                        <tr>
                            <th className="px-3 py-2 border-r border-gray-200">ID</th>
                            <th className="px-3 py-2 border-r border-gray-200">Tên định danh</th>
                            <th className="px-3 py-2 border-r border-gray-200">Mức giá (VND)</th>
                            <th className="px-3 py-2 border-r border-gray-200 text-center">Tồn kho</th>
                            <th className="px-3 py-2 text-right">Điều lệnh</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-3 py-6 text-center text-gray-500 font-sans">
                                    [HỆ THỐNG TRỐNG] Chưa có dữ liệu sản phẩm.
                                </td>
                            </tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 py-2.5 font-bold text-gray-500 border-r border-gray-200">
                                        #{p.id}
                                    </td>
                                    <td className="px-3 py-2.5 font-bold text-gray-900 border-r border-gray-200">
                                        {p.name}
                                    </td>
                                    <td className="px-3 py-2.5 text-blue-700 font-bold border-r border-gray-200">
                                        {p.price.toLocaleString()} ₫
                                    </td>
                                    <td className="px-3 py-2.5 text-center border-r border-gray-200">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold border ${
                                            p.quantity > 10 
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-400' 
                                            : 'bg-amber-50 text-amber-800 border-amber-400'
                                        }`}>
                                            {p.quantity > 10 ? `[TỐT: ${p.quantity}]` : `[CẠN: ${p.quantity}]`}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2.5 text-right space-x-2">
                                        <button 
                                            onClick={() => onEdit(p)} 
                                            className="px-2 py-0.5 border border-gray-300 hover:border-gray-900 bg-white text-gray-700 text-[10px] font-bold uppercase transition-colors cursor-pointer"
                                        >
                                            [SỬA]
                                        </button>
                                        <button 
                                            onClick={() => onDelete(p.id)} 
                                            className="px-2 py-0.5 border border-gray-300 hover:border-red-500 hover:text-red-700 bg-white text-gray-700 text-[10px] font-bold uppercase transition-colors cursor-pointer"
                                        >
                                            [XÓA]
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}