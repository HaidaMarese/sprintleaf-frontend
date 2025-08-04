import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#46777c]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Create Your Account 
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          name="name"
          onChange={handleChange}
          value={form.name}
          required
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="email"
          onChange={handleChange}
          value={form.email}
          required
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 underline">
            Sign In
          </Link>
        </p>
        <p className="mt-2 text-sm text-center">
          <Link to="/" className="text-gray-600 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
