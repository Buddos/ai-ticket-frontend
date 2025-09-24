import React, { useState } from "react";
import { createTicket } from "../api/tickets";

export default function CreateTicket() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Bug",
    priority: "Low",
    attachment: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));

      await createTicket(formData);
      alert("Ticket created successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        category: "Bug",
        priority: "Low",
        attachment: null,
      });
    } catch (err) {
      console.error("Error creating ticket:", err);
      alert("Failed to create ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option>Bug</option>
          <option>Feature</option>
          <option>Support</option>
        </select>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
        <input
          type="file"
          name="attachment"
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
