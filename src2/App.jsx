import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Logins';
import Dashboard from './Components/Dashboard';
import ProtectedRoute from './Components/ProtectedRoutes';

function App() {
  return (
  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/potatoes" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      </Routes>
   
  );
}

export default App;
