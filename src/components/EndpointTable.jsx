import React, { useState } from 'react';

const methodColors = {
  GET: 'var(--green)',
  POST: '#7c3aed',
  PUT: 'var(--orange)',
  DELETE: 'var(--red)',
  PATCH: '#a78bfa',
};

export default function EndpointTable({ endpoints = [] }) {
  const [sortBy, setSortBy] = useState('count');
  const [sortDir, setSortDir] = useState('desc');

  const sorted = [...endpoints].sort((a, b) =>
    sortDir === 'desc' ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
  );

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortBy(field); setSortDir('desc'); }
  };

  const Arrow = ({ field }) => (
    <span style={{ marginLeft: 3, opacity: sortBy === field ? 0.8 : 0.2, fontSize: 10 }}>
      {sortBy === field && sortDir === 'asc' ? '\u2191' : '\u2193'}
    </span>
  );

  return (
    <div className="card animate-in" style={{ marginBottom: 20, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 0' }}>
        <h3 style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Endpoints
        </h3>
      </div>

      {endpoints.length === 0 ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
          No endpoint data
        </div>
      ) : (
        <div style={{ overflowX: 'auto', padding: '12px 0 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Endpoint', 'Method', 'Calls', 'Avg Time', 'Error Rate'].map((h, i) => {
                  const field = ['endpoint', 'method', 'count', 'avgDuration', 'errorRate'][i];
                  const sortable = i >= 2;
                  return (
                    <th key={h} onClick={sortable ? () => toggleSort(field) : undefined} style={{
                      textAlign: 'left',
                      padding: '8px 20px',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid #1a1a1a',
                      cursor: sortable ? 'pointer' : 'default',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                    }}>
                      {h}{sortable && <Arrow field={field} />}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sorted.map((ep, i) => (
                <tr key={i} style={{ transition: 'background 150ms' }}
                  onMouseOver={e => e.currentTarget.style.background = '#141414'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 20px', borderBottom: '1px solid #1a1a1a' }}>
                    <span className="code-block" style={{ display: 'inline-block' }}>
                      {ep.endpoint}
                    </span>
                  </td>
                  <td style={{ padding: '12px 20px', borderBottom: '1px solid #1a1a1a' }}>
                    <span style={{
                      color: methodColors[ep.method] || '#888',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}>
                      {ep.method}
                    </span>
                  </td>
                  <td style={{
                    padding: '12px 20px',
                    borderBottom: '1px solid #1a1a1a',
                    fontWeight: 600,
                    fontSize: 13,
                    color: 'var(--text-primary)',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {ep.count?.toLocaleString()}
                  </td>
                  <td style={{
                    padding: '12px 20px',
                    borderBottom: '1px solid #1a1a1a',
                    color: ep.avgDuration > 500 ? 'var(--orange)' : 'var(--text-secondary)',
                    fontSize: 13,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {ep.avgDuration}ms
                  </td>
                  <td style={{
                    padding: '12px 20px',
                    borderBottom: '1px solid #1a1a1a',
                    fontSize: 13,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: ep.errorRate > 5 ? 'var(--red)' : ep.errorRate > 0 ? 'var(--yellow)' : 'var(--green)',
                      }} />
                      <span style={{ color: ep.errorRate > 5 ? 'var(--red)' : 'var(--text-secondary)' }}>
                        {ep.errorRate}%
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
