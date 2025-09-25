import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-gray-100"> {/* pastikan full width & min-h-screen */}
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 px-6 h-16 border-b">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
            <span className="text-sm">▲</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">LantasID</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-blue-600 bg-blue-50"
              >
                <span>📝</span>
                <span>Kelola Pelatihan</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer (Admin Info) */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">Admin</span>
              <span className="text-xs text-gray-500">admin@lantas.id</span>
            </div>
          </div>

          <button
            onClick={() => alert("Logout dulu")}
            className="mt-3 mx-auto flex items-center justify-center gap-2 text-sm text-black hover:text-gray-700"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
