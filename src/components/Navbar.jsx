import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';
import './Navbar.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-logo" href="/">TL <em>Coffee</em></a>

        <div className="nav-links">
          <button onClick={() => scrollTo('menu')}>Menu</button>
          <button onClick={() => scrollTo('news')}>Tin tức</button>
          <button onClick={() => scrollTo('about')}>Về chúng tôi</button>
          <button onClick={() => scrollTo('contact')}>Liên hệ</button>
        </div>

        <div className="nav-right">
          <span className="nav-phone">☎ <strong>0386 798 519</strong></span>
          <button className="nav-cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Giỏ hàng
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
        </div>
      </nav>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
