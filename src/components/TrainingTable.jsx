import { Pencil, Trash2 } from "lucide-react";

export default function TrainingTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-blue-600 text-white text-sm uppercase">
            <th className="text-left px-6 py-3 font-semibold">Judul</th>
            <th className="text-left px-6 py-3 font-semibold">Wilayah</th>
            <th className="text-left px-6 py-3 font-semibold">Durasi</th>
            <th className="text-left px-6 py-3 font-semibold">Level</th>
            <th className="text-left px-6 py-3 font-semibold">Aksi</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="text-gray-700 text-sm">
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Belum ada data pelatihan
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b last:border-b-0`}
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.description}</div>
                </td>
                <td className="px-6 py-4">{item.wilayah}</td>
                <td className="px-6 py-4">{item.durasi}</td>
                <td className="px-6 py-4">{item.level}</td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-gray-600 hover:text-blue-600"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-gray-600 hover:text-red-600"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
