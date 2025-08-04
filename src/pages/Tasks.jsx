import { useEffect, useState } from "react";
import TaskChart from "../components/TaskChart";
import api from "../lib/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    dueDate: "",
    status: "todo",
  });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch {
      setError("Failed to load projects");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      project: task.project,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      status: task.status,
    });
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        // Update task
        await api.patch(`/tasks/${editingTaskId}`, form);
        setEditingTaskId(null);
      } else {
        // Create new task
        await api.post("/tasks", form);
      }
      setForm({
        title: "",
        description: "",
        project: "",
        dueDate: "",
        status: "todo",
      });
      fetchTasks();
    } catch {
      setError(editingTaskId ? "Failed to update task" : "Failed to create task");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingTaskId ? "Edit Task" : "Add Task"}
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <input
          type="text"
          name="title"
          placeholder="Task title"
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
          name="project"
          value={form.project}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        >
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
        {editingTaskId && (
          <button
            type="button"
            onClick={() => {
              setEditingTaskId(null);
              setForm({
                title: "",
                description: "",
                project: "",
                dueDate: "",
                status: "todo",
              });
              setError("");
            }}
            className="ml-4 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <TaskChart tasks={tasks} />

      <ul className="space-y-3 mt-6">
        {tasks.map((t) => (
          <li key={t._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{t.title}</h2>
              <p className="text-sm text-gray-600">{t.description}</p>
              <p className="text-sm text-gray-400">Due: {t.dueDate?.slice(0, 10)}</p>
              <p className="text-xs font-semibold mt-1">{t.project?.title || "No Project"}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(t)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
