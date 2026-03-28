import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSummary, getEndpoints, getTimeseries } from '../services/api';
import socket from '../services/socket';
import Navbar from '../components/Navbar';
import StatCards from '../components/StatCards';
import LatencyChart from '../components/LatencyChart';
import EndpointTable from '../components/EndpointTable';
import LiveFeed from '../components/LiveFeed';

const TIME_RANGES = [
  { label: '1h', hours: 1 },
  { label: '6h', hours: 6 },
  { label: '24h', hours: 24 },
  { label: '7d', hours: 168 },
  { label: '30d', hours: 720 },
];

export default function ProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState({});
  const [endpoints, setEndpointData] = useState([]);
  const [timeseries, setTimeseries] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(24);

  const fetchData = useCallback(async () => {
    if (!localStorage.getItem('apiwatch_token')) { navigate('/login'); return; }
    const to = new Date().toISOString();
    const from = new Date(Date.now() - selectedRange * 60 * 60 * 1000).toISOString();
    const params = { projectId: id, from, to };
    try {
      const [sumRes, epRes, tsRes] = await Promise.all([
        getSummary(params), getEndpoints(params), getTimeseries(params),
      ]);
      setSummary(sumRes.data);
      setEndpointData(epRes.data);
      setTimeseries(tsRes.data);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('apiwatch_token'); navigate('/login'); }
    } finally { setLoading(false); }
  }, [id, selectedRange, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    socket.emit('join_project', id);
    const handler = (events) => setLiveEvents(prev => [...prev, ...events].slice(-100));
    socket.on('new_events', handler);
    return () => socket.off('new_events', handler);
  }, [id]);

  useEffect(() => {
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24,
        }} className="animate-in">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 2 }}>Analytics</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              {id}
            </p>
          </div>

          {/* Time Range Selector */}
          <div style={{
            display: 'flex', gap: 2,
            background: 'var(--bg-raised)',
            padding: 3,
            borderRadius: 6,
            border: '1px solid var(--border-default)',
          }}>
            {TIME_RANGES.map(range => (
              <button key={range.hours}
                onClick={() => { setSelectedRange(range.hours); setLoading(true); }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 4,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  background: selectedRange === range.hours ? 'var(--accent)' : 'transparent',
                  color: selectedRange === range.hours ? '#fff' : 'var(--text-muted)',
                }}>
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)', fontSize: 13 }}>
            Loading analytics...
          </div>
        ) : (
          <>
            <StatCards {...summary} />
            <LatencyChart timeseries={timeseries} />
            <EndpointTable endpoints={endpoints} />
            <LiveFeed events={liveEvents} />
          </>
        )}
      </div>
    </div>
  );
}
