import React, { useEffect, useRef } from 'react';

const statusColor = (code) => {
  if (code >= 500) return 'var(--red)';
  if (code >= 400) return 'var(--yellow)';
  return 'var(--green)';
};

const methodColor = {
  GET: 'var(--green)',
  POST: '#7c3aed',
  PUT: 'var(--orange)',
  DELETE: 'var(--red)',
  PATCH: '#a78bfa',
};

export default function LiveFeed({ events = [] }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div className="card animate-in" style={{ overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <h3 style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Live Feed
        </h3>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--green)',
            boxShadow: '0 0 4px var(--green)',
          }} />
          Connected
        </span>
      </div>

      <div ref={scrollRef} style={{ maxHeight: 300, overflowY: 'auto', background: 'var(--bg-base)' }}>
        {events.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            Waiting for requests...
          </div>
        ) : (
          events.slice(-100).map((ev, i) => {
            const isError = ev.statusCode >= 400;
            const opacity = Math.max(0.4, 1 - ((events.length - 1 - i) * 0.015));
            return (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '80px 50px 1fr 50px 60px',
                gap: 8,
                padding: '8px 20px',
                borderBottom: '1px solid #1a1a1a',
                fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
                fontSize: 12,
                opacity,
                background: isError ? 'rgba(239,68,68,0.04)' : 'transparent',
              }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  {ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'}) : '-'}
                </span>
                <span style={{ color: methodColor[ev.method] || '#888', fontWeight: 600, fontSize: 11 }}>
                  {ev.method}
                </span>
                <span style={{
                  color: 'var(--text-secondary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {ev.endpoint}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: statusColor(ev.statusCode),
                  }} />
                  <span style={{ color: statusColor(ev.statusCode), fontWeight: 500 }}>
                    {ev.statusCode}
                  </span>
                </span>
                <span style={{
                  color: ev.duration > 500 ? 'var(--orange)' : 'var(--text-muted)',
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {ev.duration}ms
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
