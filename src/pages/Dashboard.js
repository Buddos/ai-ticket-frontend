// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTickets() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/"); // redirect to login if no token
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets", err);

        // if unauthorized, redirect
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [navigate]);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ticket Dashboard</h2>
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "10px" }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.category}</td>
                <td>
                  <Link to={`/ticket/${ticket.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/create-ticket">+ Create New Ticket</Link>
      </div>
    </div>
  );
}

export default Dashboard;
