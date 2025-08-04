import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TaskChart({ tasks }) {
  const counts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const data = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "Task Count",
        data: [counts.todo, counts.inProgress, counts.done],
        backgroundColor: ["#cbd5e1", "#facc15", "#4ade80"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-4 shadow rounded mt-8">
      <h2 className="text-lg font-bold mb-2">Task Progress Overview</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TaskChart;
