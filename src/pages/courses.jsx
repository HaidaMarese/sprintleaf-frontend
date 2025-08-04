import { useEffect, useState } from "react";
import api from "../lib/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "draft",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch {
      setError("Failed to load courses");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/courses", form);
      setForm({
        title: "",
        description: "",
        status: "draft",
        startDate: "",
        endDate: "",
      });
      fetchCourses();
    } catch {
      setError("Failed to create course");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <input
          type="text"
          name="title"
          placeholder="Course title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Course
        </button>
      </form>

      <ul className="space-y-3">
        {courses.map((c) => (
          <li key={c._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <span className="text-sm text-gray-600">{c.status}</span>
            </div>
            <p className="text-sm text-gray-600">{c.description}</p>
            <p className="text-xs text-gray-500">
              {c.startDate?.slice(0, 10)} to {c.endDate?.slice(0, 10)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
