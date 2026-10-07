import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
    const { register, isLoading, error } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tạo tài khoản mới</h2>
                    <p className="text-sm text-slate-500 mt-1">SOA Management System</p>
                </div>
                <RegisterForm onSubmit={register} isLoading={isLoading} error={error} />
            </div>
        </div>
    );
}