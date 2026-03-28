import React from 'react';

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num?.toLocaleString() || '0';
}

export default function StatCards({ totalRequests = 0, errorRate = 0, avgDuration = 0, p95Duration = 0 }) {
  const cards = [
    { label: 'Total Requests', value: formatNumber(totalRequests), color: 'var(--text-primary)' },
    { label: 'Error Rate', value: `${errorRate}%`, color: errorRate > 5 ? 'var(--red)' : 'var(--green)' },
    { label: 'Avg Latency', value: `${avgDuration}ms`, color: 'var(--text-primary)' },
    { label: 'P95 Latency', value: `${p95Duration}ms`, color: p95Duration > 500 ? 'var(--orange)' : 'var(--text-primary)' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      marginBottom: 20,
    }}>
      {cards.map((card, i) => (
        <div key={i} className="card animate-in" style={{
          padding: '20px 20px 18px',
          animationDelay: `${i * 60}ms`,
        }}>
          <div style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            {card.label}
          </div>
          <div style={{
            fontSize: 28,
            fontWeight: 700,
            color: card.color,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
