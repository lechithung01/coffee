import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './OrderModal.css';

const fmt = (p) => p.toLocaleString('vi-VN') + 'đ';

export default function OrderModal({ open, onClose }) {
  const { cart, total, clearCart } = useCart();
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    name: '', phone: '', address: '',
    delivery: 'Giao hàng tận nơi',
    payment: 'Tiền mặt (COD)',
    note: '',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const orderId = 'TL' + Math.floor(Math.random() * 90000 + 10000);
    setSuccess({ orderId, ...form, items: [...cart], total });
    clearCart();
  };

  const handleClose = () => {
    setSuccess(null);
    setForm({ name: '', phone: '', address: '', delivery: 'Giao hàng tận nơi', payment: 'Tiền mặt (COD)', note: '' });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {!success ? (
          <>
            <div className="modal-head">
              <h3>Đặt hàng online</h3>
              <button className="modal-close" onClick={handleClose}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input className="form-input" placeholder="Nguyễn Văn A" value={form.name} onChange={set('name')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Số điện thoại *</label>
                  <input className="form-input" placeholder="0386 798 519" value={form.phone} onChange={set('phone')} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Địa chỉ giao hàng *</label>
                <input className="form-input" placeholder="123 Nguyễn Huệ, Q.1, TP.HCM" value={form.address} onChange={set('address')} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phương thức</label>
                  <select className="form-input" value={form.delivery} onChange={set('delivery')}>
                    <option>Giao hàng tận nơi</option>
                    <option>Đến lấy tại quán</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Thanh toán</label>
                  <select className="form-input" value={form.payment} onChange={set('payment')}>
                    <option>Tiền mặt (COD)</option>
                    <option>Chuyển khoản</option>
                    <option>Momo / ZaloPay</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Ghi chú</label>
                <textarea className="form-input form-textarea" placeholder="Ít đường, nhiều đá..." value={form.note} onChange={set('note')} />
              </div>
              <div className="order-summary">
                <div className="order-summary-title">Tóm tắt đơn hàng</div>
                {cart.map(i => (
                  <div key={i.id} className="order-summary-item">
                    <span>{i.emoji} {i.name} ×{i.qty}</span>
                    <span>{fmt(i.price * i.qty)}</span>
                  </div>
                ))}
                <div className="order-summary-total">
                  <span>Tổng</span><strong>{fmt(total)}</strong>
                </div>
              </div>
              <button className="modal-submit" onClick={handleSubmit}>Xác nhận đặt hàng ✓</button>
            </div>
          </>
        ) : (
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h3>Đặt hàng thành công!</h3>
            <p>Cảm ơn bạn đã tin tưởng TL Coffee.<br />Chúng tôi sẽ gọi xác nhận sớm nhất.<br /><strong style={{ color: 'var(--warm)' }}>☎ 0386 798 519</strong></p>
            <div className="success-info">
              <div className="srow"><span>Mã đơn</span><strong style={{ color: 'var(--warm)' }}>#{success.orderId}</strong></div>
              <div className="srow"><span>Khách hàng</span><span>{success.name}</span></div>
              <div className="srow"><span>SĐT</span><span>{success.phone}</span></div>
              <div className="srow"><span>Địa chỉ</span><span style={{ maxWidth: 180, textAlign: 'right', fontSize: '0.78rem' }}>{success.address}</span></div>
              <div className="srow"><span>Thanh toán</span><span>{success.payment}</span></div>
              <div className="srow total"><span>Tổng thanh toán</span><strong style={{ color: 'var(--warm)' }}>{fmt(success.total)}</strong></div>
            </div>
            <button className="success-btn" onClick={handleClose}>Tiếp tục mua sắm →</button>
          </div>
        )}
      </div>
    </div>
  );
}
