'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { MathEvent, getEvents } from '@/lib/events';
import EventCard from '@/components/EventCard';

import AIDiscovery from '@/components/AIDiscovery';

export default function Home() {
  const [allEvents, setAllEvents] = useState<MathEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<MathEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeTarget, setActiveTarget] = useState('전체');

  useEffect(() => {
    async function init() {
      const data = await getEvents();
      setAllEvents(data);
      setFilteredEvents(data);
    }
    init();
  }, []);

  const [activeTab, setActiveTab] = useState<'domestic' | 'foreign'>('domestic');

  useEffect(() => {
    let result = allEvents;

    // 국내/해외 탭 필터
    result = result.filter(e => activeTab === 'domestic' ? !e.isForeign : e.isForeign);

    // 카테고리 필터
    if (activeCategory !== '전체') {
      result = result.filter(e => e.category === activeCategory);
    }

    // 대상 필터
    if (activeTarget !== '전체') {
      result = result.filter(e => e.target.includes(activeTarget));
    }

    // 검색어 필터
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(term) || 
        e.organization.toLowerCase().includes(term)
      );
    }

    setFilteredEvents(result);
  }, [searchTerm, activeCategory, activeTarget, activeTab, allEvents]);

  return (
    <div className="animate-fade-in">
      <section className="hero">
        <Image 
          src="/banner.png" 
          alt="Math Radar Banner" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="card-tag" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#fff' }}>New Update</span>
          <h1>수학의 모든 소식,<br/>한눈에 <span className="text-gradient">포착</span>하세요.</h1>
          
          <div style={{ position: 'relative', marginTop: '30px', maxWidth: '500px' }}>
            <input 
              type="text" 
              placeholder="행사명, 기관명으로 검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass"
              style={{ 
                width: '100%', 
                padding: '15px 25px', 
                borderRadius: '30px', 
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1.1rem',
                outline: 'none'
              }}
            />
            <span style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔍</span>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '20px', marginTop: '40px', marginBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
        <button 
          onClick={() => setActiveTab('domestic')}
          style={{ 
            padding: '15px 30px', 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'domestic' ? 'var(--accent-primary)' : '#fff',
            borderBottom: activeTab === 'domestic' ? '2px solid var(--accent-primary)' : 'none',
            fontSize: '1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            opacity: activeTab === 'domestic' ? 1 : 0.6
          }}
        >
          🇰🇷 국내 소식
        </button>
        <button 
          onClick={() => setActiveTab('foreign')}
          style={{ 
            padding: '15px 30px', 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'foreign' ? 'var(--accent-primary)' : '#fff',
            borderBottom: activeTab === 'foreign' ? '2px solid var(--accent-primary)' : 'none',
            fontSize: '1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            opacity: activeTab === 'foreign' ? 1 : 0.6
          }}
        >
          🌐 해외 소식
        </button>
      </div>

      <div className="main-grid" style={{ marginTop: '0' }}>
        <aside className="sidebar">
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '20px' }}>행사 유형</h3>
            {['전체', '공모전', '경시대회', '캠프', '학술대회', '교육/연수'].map(cat => (
              <div 
                key={cat}
                className={`filter-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </div>
            ))}
            
            <h3 style={{ marginTop: '30px', marginBottom: '20px' }}>참가 대상</h3>
            {['전체', '학생', '교사 및 일반'].map(target => (
              <div 
                key={target}
                className={`filter-item ${activeTarget === target ? 'active' : ''}`}
                onClick={() => setActiveTarget(target)}
              >
                {target}
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' }}>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '10px' }}>💡 검색 TIP</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              '교사 및 일반' 필터를 선택하면 수학교사 대상 로젠탈상이나 연수 정보를 빠르게 볼 수 있습니다.
            </p>
          </div>
        </aside>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>🚀 {activeTab === 'domestic' ? '국내' : '해외'} 행사 소식 ({filteredEvents.length})</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select className="glass" style={{ padding: '8px 16px', borderRadius: '8px', color: '#fff', outline: 'none' }}>
                <option>최신순</option>
                <option>마감임박순</option>
              </select>
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="feed-list">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} variant="list" />
              ))}
            </div>

          ) : (
            <div className="glass-card flex-center" style={{ height: '300px', flexDirection: 'column', opacity: 0.6 }}>
              <span style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</span>
              <p>검색 결과가 없습니다. 다른 검색어를 입력해 보세요.</p>
            </div>
          )}
        </section>

        <aside className="discovery-sidebar">
          <AIDiscovery />
          
          <div className="glass-card" style={{ marginTop: '20px', padding: '20px', background: 'rgba(6, 182, 212, 0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>📢 AI Search Log</h4>
            <ul style={{ fontSize: '0.75rem', paddingLeft: '15px', opacity: 0.7 }}>
              <li>2026-03-14: KMO 1차 접수 시작 포착</li>
              <li>2026-03-14: MoMath MATRIX 학회 소식 탐색됨</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
