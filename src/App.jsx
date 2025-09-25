import { useState } from "react";
import SidebarLayout from "./layouts/SidebarLayout";
import TrainingForm from "./components/TrainingForm";
import TrainingTable from "./components/TrainingTable";

const initialData = [
  {
    id: 1,
    title: "Desain Grafis Profesional",
    description: "Pelajari desain grafis untuk industri kreatif",
    wilayah: "Bandung",
    durasi: "8 minggu",
    level: "Pemula-Menengah",
    skills: "Adobe Photoshop, Branding, Typography",
    video: "",
  },
  {
    id: 2,
    title: "Manajemen Media Sosial",
    description: "Strategi pemasaran digital untuk UMKM",
    wilayah: "Bogor & Depok",
    durasi: "6 minggu",
    level: "Pemula",
    skills: "",
    video: "",
  },
];

function App() {
  const [trainings, setTrainings] = useState(initialData);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    wilayah: "",
    durasi: "",
    level: "",
    skills: "",
    video: "",
  });

  const handleChange = (name, value) =>
    setForm((f) => ({ ...f, [name]: value }));

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!form.title || !form.wilayah)
      return alert("Isi minimal Judul dan Wilayah");

    if (form.id) {
      setTrainings((prev) =>
        prev.map((p) => (p.id === form.id ? { ...form } : p))
      );
    } else {
      setTrainings((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }
    handleReset();
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = (id) => {
    if (!confirm("Hapus pelatihan ini?")) return;
    setTrainings((prev) => prev.filter((p) => p.id !== id));
    if (form.id === id) handleReset();
  };

  const handleReset = () =>
    setForm({
      id: null,
      title: "",
      description: "",
      wilayah: "",
      durasi: "",
      level: "",
      skills: "",
      video: "",
    });

  return (
    <SidebarLayout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Judul Halaman */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Kelola Pelatihan
        </h1>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Tambah Pelatihan Baru
          </h2>
          <TrainingForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>


        {/* Tabel Data */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <TrainingTable
            data={trainings}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </SidebarLayout>
  );
}

export default App;
