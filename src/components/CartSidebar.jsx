import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import OrderModal from './OrderModal';
import './CartSidebar.css';

const fmt = (p) => p.toLocaleString('vi-VN') + 'đ';

export default function CartSidebar({ open, onClose }) {
  const { cart, updateQty, removeItem, total } = useCart();
  const [orderOpen, setOrderOpen] = useState(false);

  const handleCheckout = () => {
    if (!cart.length) return;
    onClose();
    setOrderOpen(true);
  };

  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-panel${open ? ' open' : ''}`}>
        <div className="cart-head">
          <h3>Giỏ hàng của bạn</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">☕</div>
              <p>Giỏ hàng đang trống</p>
              <small>Thêm món yêu thích nhé!</small>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="ci-icon">{item.emoji}</div>
              <div className="ci-info">
                <div className="ci-name">{item.name}</div>
                <div className="ci-price">{fmt(item.price)}</div>
                <div className="ci-qty-row">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  <button className="ci-remove" onClick={() => removeItem(item.id)}>✕ Xoá</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total-row">
              <span className="cart-total-label">Tổng cộng</span>
              <span className="cart-total-amt">{fmt(total)}</span>
            </div>
            <p className="cart-note-txt">Freeship nội thành Q.1–Q.3 · Giao trong 30 phút</p>
            <button className="checkout-btn" onClick={handleCheckout}>Tiến hành đặt hàng →</button>
          </div>
        )}
      </div>

      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}
