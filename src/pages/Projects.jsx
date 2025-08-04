import { useEffect, useState } from "react";
import api from "../lib/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", form);
      setForm({ title: "", description: "" });
      fetchProjects();
    } catch (err) {
      setError("Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Project
        </button>
      </form>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-gray-600 text-sm">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
