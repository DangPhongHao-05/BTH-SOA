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
    fullName: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationError(null); // Xóa lỗi validation khi người dùng gõ lại
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu khớp nhau không
    if (form.password !== form.confirmPassword) {
      setValidationError(
        "Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại!",
      );
      return;
    }

    const registerData: RegisterCredentials = {
      username: form.username,
      password: form.password,
      email: form.email,
      fullName: form.fullName,
    };

    onSubmit(registerData);
  };

  // Gộp lỗi từ server (error) và lỗi do kiểm tra mật khẩu (validationError)
  const displayError = validationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {displayError && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100 text-center">
          {displayError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tên đăng nhập *
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          placeholder="Chọn username..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Họ và tên
        </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          placeholder="Nguyễn Văn A..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Mật khẩu *
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Xác nhận mật khẩu *
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm disabled:bg-blue-300 mt-2"
      >
        {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
      </button>

      <p className="text-center text-sm text-slate-500 mt-4">
        Đã có tài khoản?{" "}
        <Link
          to="/auth/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
