import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const token = localStorage.getItem('token');

    // Nếu không có token, điều hướng sang trang đăng nhập
    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    // Nếu đã đăng nhập, cho phép hiển thị nội dung bên trong
    return <Outlet />;
}