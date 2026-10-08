import { useState } from "react";
import { Link } from "react-router-dom";
import type { RegisterCredentials } from "../types";

interface RegisterFormProps {
  onSubmit: (data: RegisterCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

export default function RegisterForm({
  onSubmit,
  isLoading,
  error,
}: RegisterFormProps) {
  const [form, setForm] = useState<
    RegisterCredentials & { confirmPassword: string }
  >({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    // Đã xóa fullName
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setValidationError("Mã khóa xác nhận không khớp. Yêu cầu kiểm tra lại.");
      return;
    }

    const registerData: RegisterCredentials = {
      username: form.username,
      password: form.password,
      email: form.email,
    };

    onSubmit(registerData);
  };

  const displayError = validationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {displayError && (
        <div className="border border-red-500 bg-red-50 text-red-700 text-[11px] font-bold px-3 py-2 uppercase tracking-wider">
          [CẢNH BÁO] {displayError}
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
          placeholder="Chọn username..."
        />
      </div>

      {/* <div>
        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
          Địa chỉ Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors"
          placeholder="example@soa.system..."
        />
      </div> */}

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

      <div>
        <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
          Xác nhận mã khóa *
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 bg-white text-xs font-mono focus:border-gray-900 focus:outline-none transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold uppercase transition-colors disabled:bg-gray-400 border border-gray-900 cursor-pointer mt-4"
      >
        {isLoading ? "[ĐANG TẠO HỒ SƠ...]" : "[GHI NHẬN TÀI KHOẢN]"}
      </button>

      <div className="text-center text-[11px] text-gray-500 mt-4 border-t border-gray-200 pt-4 uppercase">
        Đã có hồ sơ hệ thống?{" "}
        <Link
          to="/auth/login"
          className="text-gray-900 font-bold hover:bg-gray-100 px-1 border border-transparent hover:border-gray-300 transition-colors"
        >
          [ĐĂNG NHẬP]
        </Link>
      </div>
    </form>
  );
}
