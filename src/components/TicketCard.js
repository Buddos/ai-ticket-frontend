import React from "react";
import { Link } from "react-router-dom";

export default function TicketCard({ ticket }) {
  return (
    <div style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Category: {ticket.category}</p>
      <Link to={`/tickets/${ticket.id}`}>View Details</Link>
    </div>
  );
}
