import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../shared/layout/AdminLayout";
import ProductsPage from "../features/products/pages/ProductsPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../features/dashboard/pages/DashboardPage";

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
            <Route path="/" element={<DashboardPage />} />
            {/* Trang quản lý sản phẩm */}
            <Route path="/products" element={<ProductsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
