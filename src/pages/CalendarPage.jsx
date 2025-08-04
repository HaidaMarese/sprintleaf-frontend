import { useEffect, useState } from "react";
import api from "../lib/api";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; 

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
   
    const fetchCalendarItems = async () => {
      try {
        const [taskRes, courseRes] = await Promise.all([
          api.get("/tasks"),
          api.get("/courses"),
        ]);
        setTasks(taskRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        console.error("Calendar load failed:", err);
      }
    };
    fetchCalendarItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">📅 Calendar Overview</h1>

      <Calendar
        onChange={setDate}
        value={date}
      />
    </div>
  );
}

export default CalendarPage;
