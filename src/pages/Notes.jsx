import { useEffect, useState } from "react";
import api from "../lib/api";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ content: "", project: "", course: "" });
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const query = form.project
        ? `?project=${form.project}`
        : form.course
        ? `?course=${form.course}`
        : "";
      const res = await api.get(`/notes${query}`);
      setNotes(res.data);
    } catch {
      setError("Failed to load notes");
    }
  };

  const fetchProjectsAndCourses = async () => {
    try {
      const [projRes, courseRes] = await Promise.all([
        api.get("/projects"),
        api.get("/courses"),
      ]);
      setProjects(projRes.data);
      setCourses(courseRes.data);
    } catch {
      setError("Failed to load data");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/notes", form);
      setForm({ content: "", project: "", course: "" });
      fetchNotes();
    } catch {
      setError("Failed to create note");
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchProjectsAndCourses();
    fetchNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <select
          name="project"
          value={form.project}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Link to project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Link to course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Save Note
        </button>
      </form>

      <ul className="space-y-3">
        {notes.map((n) => (
          <li
            key={n._id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <p>{n.content}</p>
              <p className="text-xs text-gray-400">
                {n.project && <>📁 Project | </>}
                {n.course && <>🎓 Course</>}
              </p>
            </div>
            <button
              onClick={() => handleDelete(n._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
