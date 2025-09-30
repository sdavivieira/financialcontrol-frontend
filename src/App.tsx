import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </AuthProvider>
    </Router>
  );
}

export default App;
