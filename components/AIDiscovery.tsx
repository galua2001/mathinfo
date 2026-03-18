'use client';

import { useState, useEffect } from 'react';
import { MathEvent } from '@/lib/events';

// AI가 새롭게 찾은 데이터 리스트
const INITIAL_DISCOVERED: MathEvent[] = [
  {
    id: 'ai-kmo-1',
    title: '제40회 KMO 1차 시험 원서접수',
    organization: '대한수학회',
    startDate: '2026-03-19',
    endDate: '2026-04-15',
    category: '경시대회',
    target: ['학생'],
    region: '전국',
    image: '',
    link: 'https://www.kmo.or.kr/',
  },
  {
    id: 'ai-nctm-1',
    title: 'NCTM 2026 Annual Meeting (New Orleans)',
    organization: 'NCTM',
    startDate: '2026-03-16',
    endDate: '2026-03-18',
    category: '교육/연수',
    target: ['교사 및 일반'],
    region: '해외',
    image: '',
    link: 'https://www.nctm.org/',
  },
  {
    id: 'ai-kang-1',
    title: 'World Maths Day 2026',
    organization: '3P Learning',
    startDate: '2026-03-25',
    endDate: '2026-03-25',
    category: '경시대회',
    target: ['학생'],
    region: '해외',
    image: '',
    link: 'https://www.3plearning.com/world-maths-day/',
  },
  {
    id: 'ai-kms-80',
    title: '대한수학회 창립 80주년 국제학술대회',
    organization: '대한수학회',
    startDate: '2026-06-22',
    endDate: '2026-06-25',
    category: '학술대회',
    target: ['교사 및 일반'],
    region: '서울',
    image: '',
    link: 'http://www.kms.or.kr/',
  },
  {
    id: 'ai-momath-pi',
    title: 'MoMath Pi Day 2026 Celebration',
    organization: 'MoMath',
    startDate: '2026-03-14',
    endDate: '2026-03-14',
    category: '경시대회',
    target: ['학생', '교사 및 일반'],
    region: '해외',
    image: '',
    link: 'https://momath.org/',
  }
];

export default function AIDiscovery() {
  const [events, setEvents] = useState<MathEvent[]>([]);
  const [viewedIds, setViewedIds] = useState<string[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 확인한 아이디 목록 가져오기
    const saved = JSON.parse(localStorage.getItem('math_radar_viewed') || '[]');
    setViewedIds(saved);
    setEvents(INITIAL_DISCOVERED);
  }, []);

  const markAsRead = (id: string) => {
    if (!viewedIds.includes(id)) {
      const newViewed = [...viewedIds, id];
      setViewedIds(newViewed);
      localStorage.setItem('math_radar_viewed', JSON.stringify(newViewed));
    }
  };

  return (
    <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(6, 182, 212, 0.3)', maxHeight: '80vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', position: 'sticky', top: 0, background: 'var(--card-bg)', zIndex: 1, paddingBottom: '10px' }}>
        <span style={{ fontSize: '1.5rem' }}>🤖</span>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>AI 레이더 포착</h3>
          <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>매일 검색된 새로운 소식</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map(event => {
          const isNew = !viewedIds.includes(event.id);
          return (
            <div 
              key={event.id} 
              onClick={() => markAsRead(event.id)}
              style={{ 
                padding: '16px', 
                borderRadius: '16px', 
                background: isNew ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255,255,255,0.02)',
                border: isNew ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {isNew && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-8px', 
                  right: '12px', 
                  background: 'var(--accent-tertiary)', 
                  color: '#000', 
                  fontSize: '0.65rem', 
                  fontWeight: 900, 
                  padding: '2px 8px', 
                  borderRadius: '10px',
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                }}>
                  NEW
                </span>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: isNew ? 'var(--accent-tertiary)' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  {event.category}
                </span>
                <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{event.startDate}</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', lineHeight: '1.4', marginBottom: '6px' }}>{event.title}</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>🏢 {event.organization}</p>
              
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gradient"
                  style={{ fontSize: '0.8rem', fontWeight: 700 }}
                >
                  상세 보기 →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', fontSize: '0.75rem', opacity: 0.6 }}>
        <p>🎯 <strong>포착 기준:</strong></p>
        <ul style={{ paddingLeft: '15px', marginTop: '5px' }}>
          <li>공신력 있는 수학교육 기관 공지</li>
          <li>2026년 상반기 주요 경시/공모/연수</li>
          <li>실시간 웹 검색 엔진 기반 최신 소식</li>
        </ul>
      </div>
    </div>
  );
}
