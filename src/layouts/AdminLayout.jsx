export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 text-2xl font-bold text-gray-800">LantasID</div>
        <nav className="px-4">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium">
            Kelola Pelatihan
          </button>
        </nav>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-medium">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">admin@lantas.id</p>
            </div>
          </div>
          <button className="mt-4 text-sm text-gray-600 hover:text-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* Konten */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
