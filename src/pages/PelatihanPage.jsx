import { useState } from "react";
import TrainingForm from "../components/TrainingForm";
import TrainingTable from "../components/TrainingTable";
import AdminLayout from "../layouts/AdminLayout";

export default function PelatihanPage() {
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
      skills: "Content Strategy, Copywriting, Analytics",
      video: "",
    },
    {
      id: 3,
      title: "Fullstack Web Development",
      description: "Bangun aplikasi web modern dari frontend hingga backend",
      wilayah: "Jakarta",
      durasi: "12 minggu",
      level: "Menengah",
      skills: "HTML, CSS, JavaScript, React, Node.js, MongoDB",
      video: "",
    },
    {
      id: 4,
      title: "Data Analyst",
      description: "Analisis data untuk mendukung pengambilan keputusan bisnis",
      wilayah: "Surabaya",
      durasi: "10 minggu",
      level: "Menengah",
      skills: "Excel, SQL, Python, Data Visualization",
      video: "",
    },
    {
      id: 5,
      title: "Public Speaking & Presentasi",
      description: "Tingkatkan kemampuan komunikasi dan presentasi profesional",
      wilayah: "Yogyakarta",
      durasi: "4 minggu",
      level: "Pemula",
      skills: "Storytelling, Body Language, Voice Control",
      video: "",
    },
  ];

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
    e.preventDefault();
    if (!form.title || !form.wilayah) {
      return alert("Isi minimal Judul dan Wilayah");
    }

    if (form.id) {
      setTrainings((prev) =>
        prev.map((t) => (t.id === form.id ? { ...form } : t))
      );
    } else {
      setTrainings((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }
    handleReset();
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = (id) => {
    if (!confirm("Hapus pelatihan ini?")) return;
    setTrainings((prev) => prev.filter((t) => t.id !== id));
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
    <AdminLayout>
      <div className="w-full space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Kelola Pelatihan
        </h1>

        <div className="bg-white shadow rounded-xl p-6 max-w-3xl mx-auto w-full">
          <TrainingForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden max-w-5xl mx-auto w-full">
          <TrainingTable
            data={trainings}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
