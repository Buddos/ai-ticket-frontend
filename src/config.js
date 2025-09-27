// src/config.js

// Determine API base URL based on environment
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://support-system-backend.onrender.com"
    : "http://localhost:5000";

// Additional config variables
export const APP_NAME = "AI Ticket Support";
export const REQUEST_TIMEOUT = 5000; // milliseconds
