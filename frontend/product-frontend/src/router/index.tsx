import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../shared/layout/AdminLayout";
import ProductsPage from "../features/products/pages/ProductsPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nhóm Route Công khai (Không cần đăng nhập) */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Nhóm Route Bảo mật (Bắt buộc phải đăng nhập) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {/* Trang chủ: Demo giao diện Card thống kê */}
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium">
                      Tổng doanh thu
                    </h3>
                    <p className="text-2xl font-bold text-slate-800 mt-2">
                      12,500,000 đ
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium">
                      Sản phẩm hiện có
                    </h3>
                    <p className="text-2xl font-bold text-slate-800 mt-2">
                      124
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-medium">
                      Đơn hàng mới
                    </h3>
                    <p className="text-2xl font-bold text-slate-800 mt-2">18</p>
                  </div>
                </div>
              }
            />

            {/* Trang quản lý sản phẩm */}
            <Route path="/products" element={<ProductsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
