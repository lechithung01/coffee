import React, { useState, useEffect, useRef } from 'react';
import { menuData, newsData } from '../data/menuData';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import OrderModal from '../components/OrderModal';
import './Home.css';

const fmt = (p) => p.toLocaleString('vi-VN') + 'đ';

export default function Home() {
  const [activeTab, setActiveTab] = useState(Object.keys(menuData)[0]);
  const [orderOpen, setOrderOpen] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-dots" />
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Specialty Coffee · TP. Hồ Chí Minh</span>
          </div>
          <h1 className="hero-h1">
            Mỗi ngụm là<br />một <em>câu chuyện</em><br />cà phê
          </h1>
          <p className="hero-desc">
            Hạt specialty tuyển chọn từ cao nguyên Việt Nam, rang tươi hàng tuần,
            pha chế tỉ mỉ bởi barista SCA. TL Coffee — không chỉ là cà phê.
          </p>
         
        </div>
        <div className="hero-visual">
          <div className="hero-ring r1" />
          <div className="hero-ring r2" />
          <div className="hero-ring r3" />
          <div className="hero-float-card fc1"><span>⭐</span> 4.9/5 đánh giá</div>
          <div className="hero-float-card fc2"><span>🛵</span> Giao trong 30 phút</div>
          <div className="hero-float-card fc3"><span>🌱</span> Hạt specialty VN</div>
          <div className="hero-main-emoji">☕</div>
        </div>
        <div className="hero-stats">
          <div className="hstat"><div className="hstat-num">5K+</div><div className="hstat-label">Khách hàng</div></div>
          <div className="hstat"><div className="hstat-num">15+</div><div className="hstat-label">Loại hạt</div></div>
          <div className="hstat"><div className="hstat-num">3</div><div className="hstat-label">Năm kinh nghiệm</div></div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, r) =>
            ['Specialty Coffee','Rang tươi hàng tuần','Barista SCA','Giao trong 30 phút','TL Coffee Sài Gòn','Hạt cao nguyên Việt Nam'].map((t, i) => (
              <React.Fragment key={`${r}-${i}`}>
                <span className="marquee-item">{t}</span>
                <span className="marquee-sep">·</span>
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {/* ── MENU ── */}
      <section id="menu" className="menu-section">
        <div className="container">
          <div className="reveal section-header">
            <div className="eyebrow">Thực đơn</div>
            <h2 className="section-title">Chọn thức uống của bạn</h2>
            <p className="section-sub">Tất cả có thể tuỳ chỉnh — nóng, đá, size S/M/L</p>
          </div>
          <div className="tabs">
            {Object.keys(menuData).map(tab => (
              <button key={tab} className={`tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>
          <div className="products-grid">
            {menuData[activeTab].map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="promo-banner">
        <div className="promo-inner">
          <div className="promo-left">
            <div className="promo-tag">🎁 Ưu đãi đặc biệt</div>
            <h2>Mua 2 tặng 1<br />mỗi thứ 3 hàng tuần</h2>
            <p>Áp dụng cho tất cả đồ uống trong menu · Không giới hạn số lần</p>
            <div className="promo-badges">
              <span className="promo-badge">🕖 7:00 – 22:00</span>
              <span className="promo-badge">🛵 Freeship Q.1–Q.3</span>
              <span className="promo-badge">📱 0386 798 519</span>
            </div>
          </div>
          <div className="promo-right">
            <div className="promo-big">BUY<br />2+1</div>
            <div className="promo-sub">Thứ 3 hàng tuần</div>
            <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setOrderOpen(true)}>Đặt hàng ngay →</button>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="news-section">
        <div className="container">
          <div className="reveal section-header">
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>Tin tức & Sự kiện</div>
            <h2 className="section-title">Mới từ TL Coffee</h2>
            <p className="section-sub">Cập nhật menu mới, sự kiện đặc biệt và câu chuyện cà phê</p>
          </div>
          <div className="news-grid">
            {newsData.map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div className="container about-inner">
          <div className="about-visual reveal">
            <div className="about-big-emoji">☕</div>
            <div className="about-accent-box">
              <div className="aab-num">★ 4.9</div>
              <div className="aab-label">Đánh giá khách hàng</div>
            </div>
          </div>
          <div className="about-text reveal">
            <div className="eyebrow">Câu chuyện của chúng tôi</div>
            <h2 className="section-title">TL Coffee — nơi <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>đam mê</em><br />gặp gỡ hương vị</h2>
            <p className="about-p">TL Coffee ra đời từ tình yêu với cà phê Việt Nam. Chúng tôi tin rằng mỗi tách cà phê là một hành trình — từ hạt được thu hái trên cao nguyên Đà Lạt, Buôn Ma Thuột đến khi tách cà phê chạm môi bạn.</p>
            <p className="about-p">Mỗi mẻ rang được kiểm soát tỉ mỉ, mỗi ly được pha chế cẩn thận. Đó là cách TL Coffee cam kết mang đến trải nghiệm cà phê tốt nhất.</p>
            <div className="about-features">
              {[
                { icon: '🌱', title: 'Nguồn gốc rõ ràng', desc: 'Nhập trực tiếp từ nông dân cao nguyên' },
                { icon: '🔥', title: 'Rang thủ công', desc: 'Kiểm soát nhiệt độ từng mẻ rang' },
                { icon: '⚗️', title: 'Barista SCA', desc: 'Chứng nhận quốc tế chuyên nghiệp' },
                { icon: '🛵', title: 'Giao siêu tốc', desc: '30 phút nội thành, đóng gói giữ nhiệt' },
              ].map(f => (
                <div key={f.title} className="af-item">
                  <div className="af-icon">{f.icon}</div>
                  <div>
                    <div className="af-title">{f.title}</div>
                    <div className="af-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          {[
            { icon: '📍', title: 'Địa chỉ', val: '42 Lê Lợi, Quận 1', sub: 'TP. Hồ Chí Minh' },
            { icon: '☎', title: 'Hotline', val: '0386 798 519', sub: '7:00 – 22:00 mỗi ngày' },
            { icon: '🕐', title: 'Giờ mở cửa', val: '7:00 – 22:00', sub: 'Tất cả các ngày trong tuần' },
            { icon: '📱', title: 'Mạng xã hội', val: '@tlcoffee.vn', sub: 'Facebook · Instagram · TikTok' },
          ].map(c => (
            <div key={c.title} className="contact-item">
              <div className="ci-icon">{c.icon}</div>
              <div className="ci-title">{c.title}</div>
              <div className="ci-val">{c.val}</div>
              <div className="ci-sub">{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">TL Coffee</div>
            <p>Mang đến trải nghiệm cà phê specialty đích thực từ cao nguyên Việt Nam. Mỗi ly là một câu chuyện, mỗi hớp là một kỷ niệm.</p>
          </div>
          <div className="footer-col">
            <h4>Khám phá</h4>
            <button onClick={() => scrollTo('menu')}>Thực đơn</button>
            <button onClick={() => scrollTo('news')}>Tin tức</button>
            <button onClick={() => scrollTo('about')}>Về chúng tôi</button>
            <button onClick={() => setOrderOpen(true)}>Đặt hàng</button>
          </div>
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <span>42 Lê Lợi, Quận 1</span>
            <span>TP. Hồ Chí Minh</span>
            <span>☎ 0386 798 519</span>
            <span>7:00 – 22:00 mỗi ngày</span>
          </div>
        </div>
        <div className="footer-bottom">© 2025 TL Coffee · Tất cả quyền được bảo lưu · Made with ☕ in Sài Gòn</div>
      </footer>

      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </div>
  );
}
