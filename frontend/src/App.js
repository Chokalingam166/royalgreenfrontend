import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import PaymentResult from './pages/PaymentResult';
import './App.css';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/home" 
            element={token ? <Home /> : <Navigate to="/" />} 
          />
          <Route
            path="/checkout"
            element={token ? <Checkout /> : <Navigate to="/" />}
          />
          <Route
            path="/payment-success"
            element={token ? <PaymentResult status="success" /> : <Navigate to="/" />}
          />
          <Route
            path="/payment-failure"
            element={token ? <PaymentResult status="failure" /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
