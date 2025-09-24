import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
  withCredentials: true, // important for cookies (JWT refresh tokens)
});

// Tickets
export const createTicket = (data) => API.post("/tickets", data);
export const getTickets = () => API.get("/tickets");
export const getTicketById = (id) => API.get(`/tickets/${id}`);
export const updateTicketStatus = (id, status) =>
  API.patch(`/tickets/${id}`, { status });
export const addComment = (id, comment) =>
  API.post(`/tickets/${id}/comments`, comment);

export default API;
