import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
    const { login, isLoading, error } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Đăng nhập hệ thống</h2>
                    <p className="text-sm text-slate-500 mt-1">SOA Management System</p>
                </div>
                <LoginForm onSubmit={login} isLoading={isLoading} error={error} />
            </div>
        </div>
    );
}