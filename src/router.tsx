import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
