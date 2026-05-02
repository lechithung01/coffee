import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Home />
      <ToastContainer
        position="bottom-center"
        autoClose={1800}
        hideProgressBar
        theme="dark"
        style={{ fontSize: '0.85rem' }}
      />
    </CartProvider>
  );
}
