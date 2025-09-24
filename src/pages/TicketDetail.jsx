import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getTicketById, updateTicketStatus, addComment } from "../api/tickets";

// Initialize socket once
const socket = io("http://localhost:5000");

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Fetch ticket details
  useEffect(() => {
    async function fetchTicket() {
      try {
        const res = await getTicketById(id);
        setTicket(res.data);
      } catch (err) {
        console.error("Failed to fetch ticket:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  // WebSocket for real-time comments
  useEffect(() => {
    if (!id) return;
    socket.emit("joinRoom", id);

    socket.on("new_message", (msg) => {
      if (msg.ticketId.toString() === id.toString()) {
        setTicket((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), { id: Date.now(), text: msg.message }],
        }));
      }
    });

    return () => socket.off("new_message");
  }, [id]);

  // Handle status update
  const handleStatusChange = async (e) => {
    try {
      const res = await updateTicketStatus(id, e.target.value);
      setTicket(res.data);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handle comment submission
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    setSubmittingComment(true);
    try {
      await addComment(id, { text: comment });

      socket.emit("sendMessage", {
        ticketId: id,
        message: comment,
        sender: "You", // replace with logged-in user info
      });

      setTicket((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), { id: Date.now(), text: comment }],
      }));

      setComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return <p>Loading ticket...</p>;
  if (!ticket) return <p>Ticket not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold">{ticket.title}</h2>
      <p className="text-gray-700">{ticket.description}</p>

      <div className="flex items-center gap-4">
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>
        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>
        {ticket.userRole !== "Customer" && (
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className="border rounded p-1"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <ul className="space-y-1 max-h-64 overflow-y-auto border rounded p-2">
          {ticket.comments?.map((c, idx) => (
            <li key={c.id || idx} className="p-1 border-b last:border-b-0">
              {c.text}
            </li>
          ))}
        </ul>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full border rounded p-2 mt-2"
        />
        <button
          onClick={handleAddComment}
          disabled={submittingComment}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {submittingComment ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
