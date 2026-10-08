import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-mono">
      <div className="max-w-sm w-full bg-white border border-gray-300 shadow-sm">
        {/* Header thanh tiêu đề */}
        <div className="p-3 border-b border-gray-300 bg-gray-200 text-center">
          <h2 className="text-sm font-black text-gray-900 tracking-widest uppercase">
            SOA.SYSTEM // AUTH
          </h2>
        </div>

        {/* Body Form */}
        <div className="p-6">
          <div className="mb-6">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest text-center">
              Phân hệ Xác thực Người dùng
            </div>
          </div>
          <LoginForm onSubmit={login} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}
