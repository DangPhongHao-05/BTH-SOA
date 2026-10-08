import { useState } from "react";
import { Link } from "react-router-dom";
import type { LoginCredentials } from "../types";

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

export default function LoginForm({
  onSubmit,
  isLoading,
  error,
}: LoginFormProps) {
  const [form, setForm] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="border border-red-500 bg-red-50 text-red-700 text-[11px] font-bold px-3 py-2 uppercase tracking-wider">
          [LỖI] {error}
        </div>
      )}

      <div>
        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
          Định danh (Username) *
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors"
          placeholder="Nhập username..."
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
          Mã khóa (Password) *
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold uppercase transition-colors disabled:bg-gray-400 border border-gray-900 cursor-pointer mt-2"
      >
        {isLoading ? "[ĐANG KẾT NỐI...]" : "[ĐĂNG NHẬP HỆ THỐNG]"}
      </button>

      <div className="text-center text-[11px] text-gray-500 mt-4 border-t border-gray-200 pt-4 uppercase">
        Chưa được cấp quyền?{" "}
        <Link
          to="/auth/register"
          className="text-gray-900 font-bold hover:bg-gray-100 px-1 border border-transparent hover:border-gray-300 transition-colors"
        >
          [TẠO TÀI KHOẢN]
        </Link>
      </div>
    </form>
  );
}
