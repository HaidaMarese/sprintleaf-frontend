import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-8 py-6 flex justify-between items-center">
     
      <div className="font-extrabold text-3xl">
        <Link to={token ? "/dashboard" : "/"}>SprintLeaf</Link>
      </div>

      <div className="space-x-6 flex items-center text-lg">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {token ? (
          <>
            <span className="italic hidden sm:inline">Hi, {user?.name}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
