import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import api from "../lib/api";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [patch, setPatch] = useState({ title: "", description: "" });

  const load = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data);
      setPatch({ title: data.title, description: data.description || "" });
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load course");
    }
  };
  useEffect(() => {
    load();
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    await api.patch(`/courses/${id}`, patch);
    load();
  };

  const remove = async () => {
    await api.delete(`/courses/${id}`);
    window.history.back();
  };

  return (
    <div className="min-h-[80vh] flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {error && <p className="text-red-600">{error}</p>}
        {!course ? (
          <p>Loading…</p>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Course Detail</h2>
            <form onSubmit={save} className="bg-white rounded-2xl shadow p-5">
              <input
                className="border rounded w-full p-2 mb-2"
                value={patch.title}
                onChange={(e) =>
                  setPatch((s) => ({ ...s, title: e.target.value }))
                }
              />
              <textarea
                className="border rounded w-full p-2 mb-3"
                rows={4}
                value={patch.description}
                onChange={(e) =>
                  setPatch((s) => ({ ...s, description: e.target.value }))
                }
              />
              <div className="flex gap-2">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-4 py-2">
                  Save
                </button>
                <button
                  type="button"
                  onClick={remove}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
export default CourseDetail;
