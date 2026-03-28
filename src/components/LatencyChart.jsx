import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: 6,
      padding: '10px 14px',
      fontSize: 12,
    }}>
      <p style={{ color: '#888', marginBottom: 6 }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color, marginBottom: 2 }}>
          {entry.name}: <strong style={{ color: '#f0f0f0' }}>{entry.value}ms</strong>
        </p>
      ))}
    </div>
  );
};

export default function LatencyChart({ timeseries = [] }) {
  const data = timeseries.map((item) => ({
    ...item,
    hour: item.hour ? new Date(item.hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
  }));

  return (
    <div className="card animate-in" style={{ padding: 20, marginBottom: 20 }}>
      <h3 style={{
        fontSize: 13,
        fontWeight: 500,
        marginBottom: 20,
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>
        Latency Over Time
      </h3>

      {data.length === 0 ? (
        <div style={{
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: 13,
        }}>
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={{ top: 5, right: 16, left: -10, bottom: 5 }}>
            <CartesianGrid stroke="#1f1f1f" strokeDasharray="none" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#555"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1f1f1f' }}
            />
            <YAxis
              stroke="#555"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}ms`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8, color: '#888' }}
              iconType="plainline"
            />
            <Line
              type="monotone"
              dataKey="avgDuration"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3, fill: '#7c3aed', stroke: '#7c3aed' }}
              name="Avg Latency"
            />
            <Line
              type="monotone"
              dataKey="errorCount"
              stroke="#ef4444"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 3, fill: '#ef4444', stroke: '#ef4444' }}
              name="Errors"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
