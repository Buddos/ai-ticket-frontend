import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await axios.get("/api/dashboard/admin");
      setStats(res.data);
    }
    fetchStats();
  }, []);

  if (!stats) return <p>Loading admin dashboard...</p>;

  const statusData = [
    { name: "Open", value: stats.open },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
    { name: "Closed", value: stats.closed },
  ];

  const priorityData = [
    { name: "High", value: stats.priorities.highPriority },
    { name: "Medium", value: stats.priorities.mediumPriority },
    { name: "Low", value: stats.priorities.lowPriority },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56"];

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Ticket Status Overview</h3>
      <PieChart width={400} height={300}>
        <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100}>
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h3>Priority Distribution</h3>
      <PieChart width={400} height={300}>
        <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={100}>
          {priorityData.map((entry, index) => (
            <Cell key={`cell-pr-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
