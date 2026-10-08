import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';
import type { RegisterCredentials } from '../types';

export default function RegisterPage() {
    const { register, isLoading, error } = useAuth();
    
    // Biến này sẽ hứng câu thông báo từ Backend
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleRegister = async (data: RegisterCredentials) => {
        const msg = await register(data);
        if (msg) {
            setSuccessMessage(msg); // Lưu message lại để show lên
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-mono">
            <div className="max-w-sm w-full bg-white border border-gray-300 shadow-sm">
                <div className="p-3 border-b border-gray-300 bg-gray-200 text-center">
                    <h2 className="text-sm font-black text-gray-900 tracking-widest uppercase">
                        SOA.SYSTEM // REGISTER
                    </h2>
                </div>
                
                <div className="p-6">
                    {successMessage ? (
                        /* KHI CÓ MESSAGE THÌ ẨN FORM ĐI, HIỆN HỘP XANH CHỨA MESSAGE */
                        <div className="text-center">
                            <div className="border border-emerald-500 bg-emerald-50 p-4 mb-6">
                                <h3 className="text-emerald-700 font-bold text-sm uppercase tracking-wider">
                                    [+] THÀNH CÔNG
                                </h3>
                                {/* HIỂN THỊ CHÍNH XÁC MESSAGE CỦA BACKEND Ở ĐÂY */}
                                <p className="text-xs text-emerald-700 mt-2 font-mono font-bold">
                                    {successMessage}
                                </p>
                            </div>
                            
                            <Link 
                                to="/auth/login"
                                className="block w-full py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold uppercase transition-colors border border-gray-900 cursor-pointer"
                            >
                                [CHUYỂN TỚI ĐĂNG NHẬP]
                            </Link>
                        </div>
                    ) : (
                        /* CHƯA THÌ HIỆN FORM BÌNH THƯỜNG */
                        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
                    )}
                </div>
            </div>
        </div>
    );
}