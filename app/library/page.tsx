'use client';

import { useState, useEffect } from 'react';
import { MathEvent, getEvents } from '@/lib/events';
import EventCard from '@/components/EventCard';
import Calendar from '@/components/Calendar';

export default function LibraryPage() {
  const [scrappedEvents, setScrappedEvents] = useState<MathEvent[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    async function init() {
      const allEvents = await getEvents();
      const scraps = JSON.parse(localStorage.getItem('math_radar_scraps') || '[]');
      setScrappedEvents(allEvents.filter(e => scraps.includes(e.id)));
    }
    init();
  }, []);

  const handleScrapToggle = (id: string, isScrapped: boolean) => {
    if (!isScrapped) {
      setScrappedEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="animate-fade-in" style={{ marginTop: '40px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📚 내 서재</h1>
        <p style={{ opacity: 0.7 }}>스크랩한 행사들을 관리하고 일정을 확인하세요.</p>
      </header>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button 
          className={`btn ${viewMode === 'list' ? 'btn-primary' : 'glass'}`}
          onClick={() => setViewMode('list')}
        >
          리스트 보기
        </button>
        <button 
          className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'glass'}`}
          onClick={() => setViewMode('calendar')}
        >
          캘린더 보기
        </button>
      </div>

      {scrappedEvents.length > 0 ? (
        viewMode === 'list' ? (
          <div className="feed-list">
            {scrappedEvents.map(event => (
              <EventCard key={event.id} event={event} variant="list" onScrapToggle={handleScrapToggle} />
            ))}
          </div>

        ) : (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Calendar events={scrappedEvents} />
          </div>
        )
      ) : (
        <div className="glass-card flex-center" style={{ height: '400px', flexDirection: 'column', opacity: 0.6 }}>
          <span style={{ fontSize: '4rem', marginBottom: '20px' }}>📌</span>
          <h3>스크랩한 행사가 없습니다.</h3>
          <p style={{ marginTop: '10px' }}>메인 화면에서 마음에 드는 행사의 하트를 눌러보세요!</p>
          <a href="/" className="btn btn-primary" style={{ marginTop: '30px' }}>행사 보러가기</a>
        </div>
      )}
    </div>
  );
}
