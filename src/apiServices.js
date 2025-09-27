// src/services/apiService.js
import { API_BASE_URL } from "../config";

export const fetchTickets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};
