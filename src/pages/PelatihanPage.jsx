import { useEffect, useState } from "react";
import TrainingForm from "../components/TrainingForm";
import TrainingTable from "../components/TrainingTable";
import AdminLayout from "../layouts/AdminLayout";

export default function PelatihanPage() {
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

        // The example response shows `data` is a single object. Normalize to array.
        let items = [];
        if (Array.isArray(body.data)) items = body.data;
        else if (body && body.data) items = [body.data];

        // Map backend fields to the local UI shape used in the table/form
        const mapped = items.map((it) => ({
          id: it._id || it.id || Date.now().toString(),
          title: it.title || "",
          description: it.description || "",
          wilayah: it.wilayah || it.wilayah || "",
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
    e.preventDefault();
    if (!form.title || !form.wilayah) {
      return alert("Isi minimal Judul dan Wilayah");
    }

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

          setTrainings((prev) => prev.map((t) => (t.id === form.id ? mapped : t)));
          handleReset();
          alert("Pelatihan berhasil diupdate");
        } catch (err) {
          console.error(err);
          alert("Gagal mengupdate pelatihan: " + (err.message || err));
        }
      })();
      return;
    }

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

        setTrainings((prev) => prev.filter((t) => t.id !== id));
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
    <AdminLayout>
      <div className="w-full space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Kelola Pelatihan
        </h1>
        {loading && (
          <div className="text-center text-sm text-gray-600">Memuat data...</div>
        )}
        {error && (
          <div className="text-center text-sm text-red-600">Error: {error}</div>
        )}
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
