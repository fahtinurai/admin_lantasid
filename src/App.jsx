import { useEffect, useState } from "react";
import SidebarLayout from "./layouts/SidebarLayout";
import TrainingForm from "./components/TrainingForm";
import TrainingTable from "./components/TrainingTable";


function App() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/api/v1/courses");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();

        let items = [];
        if (Array.isArray(body.data)) items = body.data;
        else if (body && body.data) items = [body.data];

        const mapped = items.map((it) => ({
          id: it._id || it.id || Date.now().toString(),
          title: it.title || "",
          description: it.description || "",
          wilayah: it.wilayah || "",
          durasi: it.durasi || "",
          level: it.level || "",
          skills: it.skills || "",
          video: it.videoUrl || it.video || "",
        }));

        setTrainings(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load trainings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
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

    // If editing existing item, send PUT to backend
    if (form.id) {
      (async () => {
        try {
          const payload = {
            title: form.title,
            description: form.description,
            category: "Pelatihan",
            wilayah: form.wilayah,
            durasi: form.durasi,
            level: form.level,
            skills: form.skills,
            videoUrl: form.video,
          };

          const res = await fetch(`http://localhost:5000/api/v1/courses/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text}`);
          }

          const body = await res.json();
          const it = body?.data;
          if (!it) throw new Error("Invalid response from server");

          const mapped = {
            id: it._id || it.id || form.id,
            title: it.title || form.title,
            description: it.description || form.description,
            wilayah: it.wilayah || form.wilayah,
            durasi: it.durasi || form.durasi,
            level: it.level || form.level,
            skills: it.skills || form.skills,
            video: it.videoUrl || form.video,
          };

          setTrainings((prev) => prev.map((p) => (p.id === form.id ? mapped : p)));
          handleReset();
          alert("Pelatihan berhasil diupdate");
        } catch (err) {
          console.error(err);
          alert("Gagal mengupdate pelatihan: " + (err.message || err));
        }
      })();
      return;
    }

    // Creating new item -> POST to backend
    (async () => {
      try {
        const payload = {
          title: form.title,
          description: form.description,
          category: "Pelatihan",
          wilayah: form.wilayah,
          durasi: form.durasi,
          level: form.level,
          skills: form.skills,
          videoUrl: form.video,
        };

        const res = await fetch("http://localhost:5000/api/v1/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const body = await res.json();
        // backend returns created item in body.data (example)
        const it = body?.data;
        if (!it) throw new Error("Invalid response from server");

        const mapped = {
          id: it._id || it.id || Date.now().toString(),
          title: it.title || form.title,
          description: it.description || form.description,
          wilayah: it.wilayah || form.wilayah,
          durasi: it.durasi || form.durasi,
          level: it.level || form.level,
          skills: it.skills || form.skills,
          video: it.videoUrl || form.video,
        };

        setTrainings((prev) => [mapped, ...prev]);
        handleReset();
        alert("Pelatihan berhasil dibuat");
      } catch (err) {
        console.error(err);
        alert("Gagal membuat pelatihan: " + (err.message || err));
      }
    })();
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = (id) => {
    if (!confirm("Hapus pelatihan ini?")) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/courses/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const body = await res.json();
        if (!body.success) throw new Error(body.message || "Gagal menghapus");

        // remove from UI state
        setTrainings((prev) => prev.filter((p) => p.id !== id));
        if (form.id === id) handleReset();
        alert("Pelatihan berhasil dihapus");
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus pelatihan: " + (err.message || err));
      }
    })();
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

        {loading && (
          <div className="text-center text-sm text-gray-600">Memuat data...</div>
        )}
        {error && (
          <div className="text-center text-sm text-red-600">Error: {error}</div>
        )}

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
