import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const fmt = (p) => p.toLocaleString('vi-VN') + 'đ';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e?.stopPropagation();
    addToCart(product);
    toast.success(`Đã thêm ${product.name}!`, { icon: product.emoji, autoClose: 1800 });
  };

  return (
    <div className="product-card" onClick={handleAdd}>
      <div className="product-img">
        <div className="product-img-bg" style={{ background: product.bg }} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <div className="product-overlay" />
        <div className="product-emoji">{product.emoji}</div>
        <button className="product-quick" onClick={handleAdd}>+ Thêm vào giỏ</button>
      </div>
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.desc}</div>
        <div className="product-footer">
          <div>
            <div className="product-price">{fmt(product.price)}</div>
            <div className="product-sizes">
              {product.sizes.map(s => <span key={s} className="size-tag">{s}</span>)}
            </div>
          </div>
          <button className="add-btn" onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
}
