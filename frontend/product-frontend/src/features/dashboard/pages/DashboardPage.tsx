import { useState, useEffect } from "react";
import axios from "axios";

const SERVICE_ENDPOINTS = [
  {
    key: "auth",
    name: "Auth Service",
    port: "7092",
    url: "https://localhost:7092/api/auth/login",
  },
  {
    key: "product",
    name: "Product Service",
    port: "7007",
    url: "https://localhost:7007/api/product",
  },
];

const pingServices = async () => {
  return await Promise.all(
    SERVICE_ENDPOINTS.map(async (svc) => {
      try {
        await axios.get(svc.url, { timeout: 3000 });
        return { ...svc, isLive: true };
      } catch (error: any) {
        // Nếu server bật nhưng trả về 401 (Chưa đăng nhập) -> Vẫn là ONLINE
        if (error.response) return { ...svc, isLive: true };
        // Nếu không có response -> Server tắt (OFFLINE)
        return { ...svc, isLive: false };
      }
    }),
  );
};

export default function DashboardPage() {
  const [isPinging, setIsPinging] = useState(true);
  const [services, setServices] = useState(() =>
    SERVICE_ENDPOINTS.map((svc) => ({ ...svc, isLive: false })),
  );

  useEffect(() => {
    let isMounted = true; // Cờ an toàn chống rò rỉ bộ nhớ

    const checkOnMount = async () => {
      const results = await pingServices();
      if (isMounted) {
        setServices(results);
        setIsPinging(false);
      }
    };

    checkOnMount();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleManualCheck = async () => {
    setIsPinging(true);
    const results = await pingServices();
    setServices(results);
    setIsPinging(false);
  };

  const activeServicesCount = services.filter((s) => s.isLive).length;

  return (
    <div className="space-y-4 font-mono text-gray-900">
      {/* Header Tool */}
      <div className="border border-gray-300 bg-white p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
          <div>
            <div className="text-[11px] text-gray-500 uppercase tracking-wider">
              Hệ thống quản lý sản phẩm
            </div>
            <h2 className="text-base font-bold mt-0.5">
              BẢNG ĐIỀU KHIỂN & GIÁM SÁT MICROSERVICES
            </h2>
          </div>

          <button
            onClick={handleManualCheck}
            disabled={isPinging}
            className="px-3 py-1.5 border border-gray-900 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold disabled:opacity-50 transition-colors"
          >
            {isPinging ? "[Đang quét mạng...]" : "[Kiểm tra kết nối SOA]"}
          </button>
        </div>
        <div className="pt-2 text-xs text-gray-600 font-sans">
          Trạng thái cụm Server:
          <span
            className={`font-mono ml-2 font-bold px-1.5 py-0.5 ${activeServicesCount === services.length ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}
          >
            [{activeServicesCount}/{services.length} ONLINE]
          </span>
        </div>
      </div>

      {/* Ma trận Services */}
      <div className="border border-gray-300 bg-white mt-4">
        <div className="p-3 border-b border-gray-300 bg-gray-50 text-xs flex justify-between items-center">
          <span className="font-bold">MA TRẬN KẾT NỐI (CONNECTION MATRIX)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase border-b border-gray-300 text-[11px]">
              <tr>
                <th className="px-3 py-2 border-r border-gray-200">
                  Tên dịch vụ
                </th>
                <th className="px-3 py-2 border-r border-gray-200">
                  Cổng Port
                </th>
                <th className="px-3 py-2 border-r border-gray-200">
                  Endpoint Kiểm thử
                </th>
                <th className="px-3 py-2">Trạng thái (Real-time)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((svc) => (
                <tr key={svc.key} className="hover:bg-gray-50">
                  <td className="px-3 py-2.5 font-bold border-r border-gray-200">
                    {svc.name}
                  </td>
                  <td className="px-3 py-2.5 font-bold border-r border-gray-200">
                    :{svc.port}
                  </td>
                  <td className="px-3 py-2.5 text-gray-600 border-r border-gray-200">
                    {svc.url}
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold border ${svc.isLive ? "bg-emerald-50 text-emerald-800 border-emerald-400" : "bg-red-50 text-red-800 border-red-400"}`}
                    >
                      {isPinging
                        ? "[PINGING...]"
                        : svc.isLive
                          ? "[ONLINE]"
                          : "[OFFLINE]"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
