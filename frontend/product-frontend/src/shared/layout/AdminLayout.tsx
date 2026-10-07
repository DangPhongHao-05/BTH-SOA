import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Bảng điều khiển', icon: '📊' },
        { path: '/products', label: 'Quản lý sản phẩm', icon: '📦' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
            {/* Sidebar Sạch sẽ, Hiện đại */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col transition-all z-20">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <span className="text-xl font-extrabold text-blue-600 tracking-tight">SOA System</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 mt-2 px-3">
                        Menu chính
                    </div>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                                    isActive 
                                    ? 'bg-blue-50 text-blue-700' 
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                
                {/* Thông tin User */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            H
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-slate-700">Đặng Phong Hào</p>
                            <p className="text-xs text-slate-500">Quản trị viên</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Khu vực Nội dung */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header thanh thoát */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {navItems.find(n => n.path === location.pathname)?.label || 'Tổng quan'}
                    </h2>
                    
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Thông báo">
                            🔔
                        </button>
                    </div>
                </header>

                {/* Khu vực render trang con */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet /> 
                    </div>
                </main>
            </div>
        </div>
    );
}