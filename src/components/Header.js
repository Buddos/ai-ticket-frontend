import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "10px 20px", borderBottom: "1px solid #ddd", marginBottom: "20px" }}>
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-ticket">Create Ticket</Link>
        <Link to="/customer-dashboard">My Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
