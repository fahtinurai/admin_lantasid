export default function TrainingForm({ form, onChange, onSubmit, onReset }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Baris 1: Judul & Wilayah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Judul Pelatihan
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Judul Pelatihan"
            className="w-full border rounded-lg px-3 py-2 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Wilayah
          </label>
          <select
            value={form.wilayah}
            onChange={(e) => onChange("wilayah", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-black"
          >
            <option value="">Pilih Wilayah</option>
            <option value="Bandung">Bandung</option>
            <option value="Bogor & Depok">Bogor & Depok</option>
            <option value="Sukabumi & Cianjur">Sukabumi & Cianjur</option>
            <option value="Garut & Tasikmalaya">Garut & Tasikmalaya</option>
          </select>
        </div>
      </div>

      {/* Baris 2: Durasi & Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Durasi
          </label>
          <input
            type="text"
            value={form.durasi}
            onChange={(e) => onChange("durasi", e.target.value)}
            placeholder="Contoh: 8 minggu"
            className="w-full border rounded-lg px-3 py-2 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Level
          </label>
          <select
            value={form.level}
            onChange={(e) => onChange("level", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-black"
          >
            <option value="">Pilih Level</option>
            <option value="Pemula">Pemula</option>
            <option value="Menengah">Menengah</option>
            <option value="Pemula-Menengah">Pemula-Menengah</option>
          </select>
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Deskripsi
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full border rounded-lg px-3 py-2 resize-none text-black"
          rows={4}
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Skills (pisahkan dengan koma)
        </label>
        <input
          type="text"
          value={form.skills}
          onChange={(e) => onChange("skills", e.target.value)}
          placeholder="Adobe Photoshop, Branding, Typography"
          className="w-full border rounded-lg px-3 py-2 text-black"
        />
      </div>

      {/* URL Video */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          URL Video
        </label>
        <input
          type="text"
          value={form.video}
          onChange={(e) => onChange("video", e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full border rounded-lg px-3 py-2 text-black"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          Update Pelatihan
        </button>
        <button
          type="button"
          onClick={onReset}
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 w-full sm:w-auto"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
