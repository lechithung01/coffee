import React, { useState } from 'react';
import './NewsCard.css';

export default function NewsCard({ article }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="news-card" onClick={() => setOpen(true)}>
        <div className="news-img" style={{ background: article.bg }}>
          <span className="news-emoji">{article.emoji}</span>
          <span className="news-tag">{article.tag}</span>
        </div>
        <div className="news-body">
          <div className="news-date">{article.date}</div>
          <div className="news-title">{article.title}</div>
          <div className="news-excerpt">{article.excerpt.substring(0, 100)}...</div>
          <div className="news-read">Đọc tiếp →</div>
        </div>
      </div>

      {open && (
        <div className="news-modal-overlay" onClick={() => setOpen(false)}>
          <div className="news-modal" onClick={e => e.stopPropagation()}>
            <button className="news-modal-close" onClick={() => setOpen(false)}>✕</button>
            <div className="news-modal-img" style={{ background: article.bg }}>
              <span style={{ fontSize: '5rem', position: 'relative', zIndex: 1 }}>{article.emoji}</span>
            </div>
            <div className="news-modal-body">
              <span className="news-tag news-modal-tag">{article.tag}</span>
              <h3 className="news-modal-title">{article.title}</h3>
              <div className="news-modal-meta">{article.date} · TL Coffee</div>
              <p className="news-modal-content">{article.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
