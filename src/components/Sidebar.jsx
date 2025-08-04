import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Sidebar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const Item = ({ to, icon, bgColor, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 font-semibold ${
          isActive ? "bg-gray-100" : ""
        }`
      }
    >
      <span
        className={`w-8 h-8 flex items-center justify-center rounded ${bgColor} text-white`}
      >
        {icon}
      </span>
      {children}
    </NavLink>
  );

  const handleLogout = () => {
    logout();
    nav("/signin");
  };

  const username =
    user?.name ||
    JSON.parse(localStorage.getItem("springleaf_user") || "{}")?.name ||
    "User";

  return (
    <aside className="w-64 bg-white shadow h-full p-5">
      {/* user */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800">
          👤
        </div>
        <div>
          <p className="text-sm text-gray-500 font-semibold">Welcome</p>
          <p className="font-semibold truncate max-w-[10rem]">{username}</p>
        </div>
      </div>

      {/* nav links with colored icons */}
      <nav className="space-y-2">
        <Item to="/dashboard/projects" icon="📁" bgColor="bg-blue-500">
          Projects
        </Item>
        <Item to="/dashboard/tasks" icon="✅" bgColor="bg-green-500">
          Tasks
        </Item>
        <Item to="/dashboard/courses" icon="📚" bgColor="bg-purple-500">
          Courses
        </Item>
        <Item to="/dashboard/notes" icon="📝" bgColor="bg-yellow-500">
          Notes
        </Item>
        <Item to="/dashboard/calendar" icon="📆" bgColor="bg-pink-500">
          Calendar
        </Item>
        <Item
          to="/dashboard/learning-resources"
          icon="🎓"
          bgColor="bg-indigo-500"
        >
          Learning Resources
        </Item>
        <Item to="/dashboard/discussions" icon="💬" bgColor="bg-orange-500">
          Discussions
        </Item>
      </nav>

      <div className="mt-8 pt-6 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded font-semibold"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
