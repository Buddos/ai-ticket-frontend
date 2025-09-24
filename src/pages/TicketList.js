import React, { useEffect, useState } from "react";
import { getTickets } from "../api/tickets";
import TicketCard from "../components/TicketCard";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await getTickets();
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
