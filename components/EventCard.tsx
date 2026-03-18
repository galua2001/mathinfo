'use client';

import { useState, useEffect } from 'react';
import { MathEvent } from '@/lib/events';

interface Props {
  event: MathEvent;
  onScrapToggle?: (id: string, isScrapped: boolean) => void;
  variant?: 'card' | 'list';
}

export default function EventCard({ event, onScrapToggle, variant = 'card' }: Props) {
  const [isScrapped, setIsScrapped] = useState(false);

  useEffect(() => {
    const scraps = JSON.parse(localStorage.getItem('math_radar_scraps') || '[]');
    setIsScrapped(scraps.includes(event.id));
  }, [event.id]);

  const toggleScrap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const scraps = JSON.parse(localStorage.getItem('math_radar_scraps') || '[]');
    let newScraps;
    if (scraps.includes(event.id)) {
      newScraps = scraps.filter((id: string) => id !== event.id);
      setIsScrapped(false);
    } else {
      newScraps = [...scraps, event.id];
      setIsScrapped(true);
    }
    localStorage.setItem('math_radar_scraps', JSON.stringify(newScraps));
    if (onScrapToggle) onScrapToggle(event.id, !isScrapped);
  };

  const calculateDDay = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? 'D-Day' : diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
  };

  if (variant === 'list') {
    return (
      <div className="list-item animate-fade-in" onClick={() => window.open(event.link, '_blank')}>
        <div className="list-item-image" style={{ backgroundImage: `url(${event.image || '/banner.png'})` }}></div>
        <div className="list-item-info">
          <div className="list-item-title" title={event.title}>{event.title}</div>
          <div className="list-item-org" title={event.organization}>🏢 {event.organization}</div>
          <div className="list-item-date">📅 {event.endDate}</div>
          <div className="list-item-tag">{event.category}</div>
        </div>
        <button 
          onClick={toggleScrap}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer',
            marginLeft: '10px',
            flexShrink: 0
          }}
        >
          {isScrapped ? '❤️' : '🤍'}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div 
        className="card-image" 
        style={{ backgroundImage: `url(${event.image})`, position: 'relative' }}
      >
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <span style={{ 
            background: 'rgba(239, 68, 68, 0.9)', 
            padding: '4px 10px', 
            borderRadius: '6px', 
            fontSize: '0.8rem', 
            fontWeight: 800,
            color: '#fff'
          }}>
            {calculateDDay(event.endDate)}
          </span>
        </div>
      </div>
      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <span className="card-tag">{event.category}</span>
          {event.target.map(t => (
            <span key={t} className="card-tag" style={{ background: 'rgba(255,255,255,0.05)', color: '#ccc' }}>{t}</span>
          ))}
        </div>
        <h3 className="card-title" style={{ fontSize: '1.1rem' }}>{event.title}</h3>
        <div className="card-info">
          <span>🏢 {event.organization}</span>
        </div>
        <div className="card-info" style={{ marginTop: '5px' }}>
          <span>📍 {event.region}</span>
        </div>
        <div className="card-info" style={{ marginTop: '5px', color: 'var(--accent-primary)' }}>
          <span>📅 {event.startDate} ~ {event.endDate}</span>
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn glass" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            상세보기
          </a>
          <button 
            onClick={toggleScrap}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '1.4rem', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              transform: isScrapped ? 'scale(1.2)' : 'scale(1)'
            }}
          >
            {isScrapped ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}

