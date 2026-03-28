import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('apiwatch_token');

  const handleLogout = () => {
    localStorage.removeItem('apiwatch_token');
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: 56,
      background: 'var(--bg-base)',
      borderBottom: '1px solid var(--border-default)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link to="/dashboard" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <img src="/icon.png" alt="APIWatch" width="30" height="35" style={{ borderRadius: 8 }} />
          <span style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            APIWatch
          </span>
        </Link>

        {isLoggedIn && location.pathname !== '/dashboard' && (
          <>
            <span style={{ color: 'var(--border-subtle)', fontSize: 18, fontWeight: 300 }}>/</span>
            <Link to="/dashboard" style={{
              textDecoration: 'none',
              color: 'var(--text-muted)',
              fontSize: 13,
              fontWeight: 400,
              transition: 'color 150ms ease',
            }}
              onMouseOver={e => e.target.style.color = 'var(--text-secondary)'}
              onMouseOut={e => e.target.style.color = 'var(--text-muted)'}
            >
              Projects
            </Link>
            <span style={{ color: 'var(--border-subtle)', fontSize: 18, fontWeight: 300 }}>/</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Analytics</span>
          </>
        )}
      </div>

      {isLoggedIn && (
        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '6px 14px', fontSize: 12 }}>
          Log out
        </button>
      )}
    </nav>
  );
}
