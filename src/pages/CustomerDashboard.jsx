import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    async function fetchStats() {
      try {
        const res = await axios.get(`/api/dashboard/customer/${userId}`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [userId]);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>No stats available.</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">My Ticket Summary</h2>
      <div className="space-y-2">
        <p>📂 Open: <strong>{stats.open}</strong></p>
        <p>✅ Resolved: <strong>{stats.resolved}</strong></p>
        <p>🔒 Closed: <strong>{stats.closed}</strong></p>
      </div>
    </div>
  );
}
