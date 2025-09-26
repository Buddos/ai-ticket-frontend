import React, { useState } from "react";
import API_BASE_URL from "../config"; // ✅ import your backend base URL

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        // Example: save token for authenticated requests
        localStorage.setItem("token", data.token);
        // Redirect to dashboard or home
        window.location.href = "/dashboard";
      } else {
        setMessage(`❌ Login failed: ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      setMessage("⚠️ Server error. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
