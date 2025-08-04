import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import Sidebar from "../components/Sidebar";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`);
        setProject(data);
      } catch (e) {
        setErr(e.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) 
      return;
    try {
      await api.delete(`/projects/${id}`);
      navigate("/projects");
    } catch (e) {
      alert("Error deleting project");
    }
  };

  const handleEdit = () => {
    navigate(`/projects/${id}/edit`);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (err) return <div className="p-6 text-red-500">{err}</div>;
  if (!project) return <div className="p-6">Project not found.</div>;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
        <p className="text-gray-600 mb-4">{project.description || "No description provided."}</p>

        <div className="flex gap-4">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
