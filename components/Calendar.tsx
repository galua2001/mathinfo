'use client';

import { useState } from 'react';
import { MathEvent } from '@/lib/events';

interface Props {
  events: MathEvent[];
}

export default function Calendar({ events }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayEvents = events.filter(e => {
      return dateStr >= e.startDate && dateStr <= e.endDate;
    });

    days.push(
      <div key={d} className={`calendar-day ${dayEvents.length > 0 ? 'has-event' : ''}`}>
        <span className="day-number">{d}</span>
        <div className="day-events">
          {dayEvents.map(e => (
            <div key={e.id} className="event-dot" title={e.title}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card calendar-container" style={{ padding: '20px' }}>
      <style jsx>{`
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          marginBottom: 20px;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        .day-label {
          text-align: center;
          font-weight: 700;
          font-size: 0.8rem;
          opacity: 0.5;
          padding: 10px 0;
        }
        .calendar-day {
          aspect-ratio: 1;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          position: relative;
          background: rgba(255,255,255,0.02);
        }
        .calendar-day.has-event {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
        }
        .day-number {
          font-size: 0.9rem;
          font-weight: 500;
        }
        .day-events {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
          margin-top: auto;
        }
        .event-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
        }
      `}</style>
      
      <div className="calendar-header">
        <h3>{year}년 {month + 1}월</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={prevMonth} className="btn glass" style={{ padding: '4px 12px' }}>◀</button>
          <button onClick={nextMonth} className="btn glass" style={{ padding: '4px 12px' }}>▶</button>
        </div>
      </div>

      <div className="calendar-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="day-label">{d}</div>
        ))}
        {days}
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>
        * 스크랩한 행사의 기간이 달력에 파란색으로 표시됩니다.
      </div>
    </div>
  );
}
