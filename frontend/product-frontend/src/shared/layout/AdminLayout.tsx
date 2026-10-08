import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../features/auth/hooks/useAuth';

// HÀM GIẢI MÃ TOKEN ĐỂ LẤY TÊN (Không cần cài thêm thư viện)
const getUsernameFromToken = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return 'KHÁCH';
        
        // Bóc tách phần Payload ở giữa của JWT Token
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const decoded = JSON.parse(jsonPayload);
        
        // .NET thường lưu username vào claim có tên rất dài này, hoặc 'sub', 'unique_name'
        return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] 
            || decoded.unique_name 
            || decoded.sub 
            || 'ADMIN';
    } catch (e) {
        return 'KHÁCH';
    }
};

export default function AdminLayout() {
    const location = useLocation();
    const { logout } = useAuth();

    // Menu đúng với dự án hiện tại của bạn
    const navItems = [
        { path: '/', label: '[BẢNG ĐIỀU KHIỂN]', icon: '⚡' },
        { path: '/products', label: '[QUẢN LÝ SẢN PHẨM]', icon: '📦' },
    ];

    // Lấy tên thật từ Token
    const displayName = getUsernameFromToken();

    // =========================================================
    // LOGIC TRẠNG THÁI THẬT (REAL-TIME STATUS)
    // =========================================================
    const [systemStatus, setSystemStatus] = useState<'CHECKING' | 'ONLINE' | 'OFFLINE'>('CHECKING');

    useEffect(() => {
        let isMounted = true;

        const checkSystemHealth = async () => {
            try {
                // Ping cổng Auth (Trỏ vào API /health bạn vừa tạo)
                await axios.get('https://localhost:7092/api/health', { timeout: 3000 });
                if (isMounted) setSystemStatus('ONLINE');
            } catch (error: any) {
                // Nếu server bật nhưng trả về 401/405 -> Vẫn là ONLINE
                if (error.response) {
                    if (isMounted) setSystemStatus('ONLINE');
                } else {
                    // Mất mạng hoàn toàn -> OFFLINE
                    if (isMounted) setSystemStatus('OFFLINE');
                }
            }
        };

        // Chạy ngay khi mở web
        checkSystemHealth();

        // Tự động quét lại mỗi 30 giây
        const interval = setInterval(checkSystemHealth, 30000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    // Hiệu ứng màu sắc động
    const statusConfig = {
        CHECKING: { text: '[ĐANG QUÉT MẠNG...]', color: 'text-blue-400', border: 'border-blue-500' },
        ONLINE: { text: '[HỆ THỐNG ONLINE]', color: 'text-emerald-400', border: 'border-emerald-500' },
        OFFLINE: { text: '[MẤT KẾT NỐI SOA]', color: 'text-red-500 animate-pulse', border: 'border-red-600' }
    };
    const currentStatus = statusConfig[systemStatus];

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
            {/* Sidebar Phong cách Kỹ thuật */}
            <aside className="w-64 bg-white border-r border-gray-300 flex flex-col z-20">
                <div className="h-12 flex items-center justify-center border-b border-gray-300 bg-gray-200">
                    <span className="text-sm font-black text-gray-800 tracking-widest font-mono">
                        SOA.SYSTEM
                    </span>
                </div>
                
                <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto font-mono text-xs">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-2 mt-2">
                        Danh mục Dịch vụ
                    </div>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 border font-bold transition-colors ${
                                    isActive 
                                    ? 'bg-gray-900 text-white border-gray-900' 
                                    : 'bg-white text-gray-600 border-transparent hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <span className="text-sm grayscale">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Thanh Status Bar Real-time */}
                <div className={`border-l-4 ${currentStatus.border} bg-gray-900 text-white p-2.5 font-mono text-xs flex justify-between items-center z-10 shadow-sm transition-colors duration-500`}>
                    <div>
                        <span className="text-gray-400">Trạng thái: </span>
                        <span className={`font-bold ${currentStatus.color}`}>
                            {currentStatus.text}
                        </span>
                        <span className="ml-3 text-gray-500">| User: </span>
                        {/* HIỂN THỊ USERNAME BÓC TỪ TOKEN */}
                        <span className="font-bold text-white uppercase">{displayName}</span>
                    </div>
                    <button 
                        onClick={logout}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider cursor-pointer transition-colors border border-red-500"
                    >
                        [ĐĂNG XUẤT]
                    </button>
                </div>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet /> 
                    </div>
                </main>
            </div>
        </div>
    );
}