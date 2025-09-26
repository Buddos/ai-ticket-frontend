// src/pages/CreateTicket.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    category: "General",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/tickets`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // redirect back to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating ticket:", err);
      setError("Failed to create ticket. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Ticket</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Priority: </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label>Category: </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Create Ticket
        </button>
      </form>
    </div>
  );
}

export default CreateTicket;
