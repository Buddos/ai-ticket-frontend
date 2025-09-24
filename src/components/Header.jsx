import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link> | 
      <Link to="/create-ticket">Create Ticket</Link> | 
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Header;
