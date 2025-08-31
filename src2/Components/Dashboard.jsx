import React from 'react';
import { logout } from '../Services/authService';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Log out by removing the token
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
