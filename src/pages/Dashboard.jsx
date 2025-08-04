import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name} 👋</h1>
      <p className="text-lg text-gray-700 mb-6">
        Manage your projects, tasks, courses, notes, and more all from one
        place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/projects"
          className="bg-white p-6 shadow rounded hover:bg-blue-50"
        >
          <h2 className="font-semibold text-lg">📁 Projects</h2>
          <p className="text-sm text-gray-600">
            Create and collaborate on projects.
          </p>
        </Link>

        <Link
          to="/dashboard/tasks"
          className="bg-white p-6 shadow rounded hover:bg-green-50"
        >
          <h2 className="font-semibold text-lg">✅ Tasks</h2>
          <p className="text-sm text-gray-600">
            Track progress and manage deadlines.
          </p>
        </Link>

        <Link
          to="/dashboard/courses"
          className="bg-white p-6 shadow rounded hover:bg-yellow-50"
        >
          <h2 className="font-semibold text-lg">🎓 Courses</h2>
          <p className="text-sm text-gray-600">
            Organize and follow your learning path.
          </p>
        </Link>

        <Link
          to="/dashboard/notes"
          className="bg-white p-6 shadow rounded hover:bg-purple-50"
        >
          <h2 className="font-semibold text-lg">📝 Notes</h2>
          <p className="text-sm text-gray-600">
            Keep track of your thoughts and ideas.
          </p>
        </Link>

        <Link
          to="/dashboard/calendar"
          className="bg-white p-6 shadow rounded hover:bg-red-50"
        >
          <h2 className="font-semibold text-lg">📅 Calendar</h2>
          <p className="text-sm text-gray-600">
            View all your deadlines and course dates.
          </p>
        </Link>

        <Link
          to="/dashboard/learning-resources"
          className="bg-white p-6 shadow rounded hover:bg-emerald-50"
        >
          <h2 className="font-semibold text-lg">📚 Learning Resources</h2>
          <p className="text-sm text-gray-600">
            Curated links and references for learning.
          </p>
        </Link>

        <Link
          to="/dashboard/discussions"
          className="bg-white p-6 shadow rounded hover:bg-indigo-50"
        >
          <h2 className="font-semibold text-lg">💬 Discussions</h2>
          <p className="text-sm text-gray-600">
            Join discussions and share knowledge.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
