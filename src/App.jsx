import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Courses from "./pages/courses";
import Notes from "./pages/Notes";
import CalendarPage from "./pages/CalendarPage";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import LearningResources from "./pages/LearningResources";
import Discussions from "./pages/Discussions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="courses" element={<Courses />} />
          <Route path="notes" element={<Notes />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="learning-resources" element={<LearningResources />} />
          <Route path="discussions" element={<Discussions />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
