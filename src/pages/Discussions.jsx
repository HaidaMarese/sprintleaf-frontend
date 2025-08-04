import { useEffect, useState } from "react";
import api from "../lib/api";

function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/discussions");
      setDiscussions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error loading discussions:", e);
      setErr("Failed to load discussions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/discussions/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post("/discussions", form);
      }
      setForm({ title: "", content: "" });
      load();
    } catch (e) {
      setErr(e.response?.data?.message || "Error submitting discussion");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/discussions/${id}`);
      load();
    } catch (e) {
      console.error("Failed to delete discussion:", e);
    }
  };

  const edit = (d) => {
    setForm({ title: d.title, content: d.content });
    setEditingId(d._id);
  };

  const cancelEdit = () => {
    setForm({ title: "", content: "" });
    setEditingId(null);
  };

  return (
    <div className="min-h-[80vh] flex">
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Discussions</h1>

        <form
          onSubmit={submit}
          className="bg-white border rounded p-4 space-y-3"
        >
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <input
            className="border p-2 rounded w-full"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="border p-2 rounded w-full"
            placeholder="What's on your mind?"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              {editingId ? "Update" : "Post"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm underline text-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : discussions.length === 0 ? (
            <p>No discussions yet.</p>
          ) : (
            <ul className="space-y-4">
              {discussions.map((d) => (
                <li key={d._id} className="bg-white border rounded p-4">
                  <h2 className="font-semibold">{d.title}</h2>
                  <p className="text-gray-600 mt-1">{d.content}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    By {d.owner?.name || "Someone"} ·{" "}
                    {new Date(d.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => edit(d)}
                      className="text-blue-600 text-sm underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(d._id)}
                      className="text-red-600 text-sm underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Discussions;
