import type { Product } from "../types";

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">ID</th>
                            <th className="px-6 py-4 font-medium">Tên sản phẩm</th>
                            <th className="px-6 py-4 font-medium">Giá bán</th>
                            <th className="px-6 py-4 font-medium text-center">Tồn kho</th>
                            <th className="px-6 py-4 font-medium text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Chưa có sản phẩm nào.</td></tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-500">#{p.id}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{p.name}</td>
                                    <td className="px-6 py-4 font-semibold text-blue-600">{p.price.toLocaleString()} đ</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.quantity > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {p.quantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => onEdit(p)} className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md font-medium transition-colors">Sửa</button>
                                        <button onClick={() => onDelete(p.id)} className="text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md font-medium transition-colors">Xóa</button>
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