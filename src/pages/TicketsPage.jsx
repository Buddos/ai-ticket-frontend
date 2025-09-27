// src/pages/TicketsPage.jsx
import React, { useEffect, useState } from "react";
import { fetchTickets } from "../services/apiService";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTickets();
  }, []);

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsPage;
