import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TicketDetail from "./pages/TicketDetail";
import CreateTicket from "./pages/CreateTicket";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Components
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Header with navigation links */}
      <Header />

      {/* Page Routes */}
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Tickets */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
        <Route path="/create-ticket" element={<CreateTicket />} />

        {/* Dashboards */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Default Route */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
