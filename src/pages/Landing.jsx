import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldAlert, Zap, Box, LineChart, Code2, Copy, Check, ArrowRight } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Landing() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('npm install apiwatch-sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{ background: '#0a0a0a', color: '#f0f0f0', fontFamily: 'Inter, sans-serif' }}
      className="min-h-screen overflow-x-hidden"
    >

      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 48px',
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/icon.png" alt="APIWatch" style={{ width: 24, height: 24, borderRadius: 6 }} />
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.03em', color: '#fff' }}>APIWatch</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['#problem', '#how'].map((href, i) => (
              <a key={i} href={href} style={{ fontSize: 13, color: '#777', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#777'}
              >
                {i === 0 ? 'The Problem' : 'How it works'}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/login')}
            style={{ fontSize: 13, color: '#777', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >Sign In</button>
          <button
            onClick={() => navigate('/register')}
            style={{ padding: '8px 18px', borderRadius: 8, background: '#fff', color: '#000', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >Get Started</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: '180px 24px 120px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 700, height: 360, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <FadeUp delay={0.05}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px', borderRadius: 999,
            border: '1px solid rgba(124,58,237,0.35)', background: 'rgba(124,58,237,0.1)',
            color: '#c4b5fd', fontSize: 12, fontWeight: 500, marginBottom: 28, letterSpacing: '0.01em',
          }}>
            <Zap size={12} />  API monitoring, re-imagined.
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <h1 style={{
            fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 700,
            lineHeight: 1.04, letterSpacing: '-0.04em',
            color: '#fff', maxWidth: 900, margin: '0 0 20px',
          }}>
            API monitoring tailored<br />
            <span style={{ color: '#555' }}>for your codebase.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p style={{ fontSize: 20, color: '#666', maxWidth: 560, lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
            One line of code captures every request — streams real-time latency,
            error rates and endpoint health to your dashboard automatically.
          </p>
        </FadeUp>

        <FadeUp delay={0.28} className="flex flex-col sm:flex-row gap-4">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/register')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '13px 24px', borderRadius: 10, background: '#fff', color: '#000',
                fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              }}
            >
              Get Started <ArrowRight size={15} />
            </button>
            <button
              onClick={copyToClipboard}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '13px 24px', borderRadius: 10, background: '#111',
                border: '1px solid #222', color: '#aaa', fontSize: 14,
                fontFamily: 'monospace', fontWeight: 400, cursor: 'pointer',
              }}
            >
              {copied ? <Check size={15} style={{ color: '#4ade80' }} /> : <Copy size={15} style={{ color: '#555' }} />}
              npm i apiwatch-sdk
            </button>
          </div>
        </FadeUp>
      </section>

      {/* ── The Problem ── */}
      <section id="problem" style={{ padding: '96px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>The Problem</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 60 }}>
              Bad observability = bad experience.
            </h2>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Without */}
            <FadeUp delay={0.1}>
              <div style={{ padding: '48px 40px', borderRadius: 16, background: '#111', border: '1px solid #1f1f1f', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#666', margin: 0 }}>Without APIWatch</h3>
                </div>
                <p style={{ color: '#444', fontSize: 14, marginBottom: 36, lineHeight: 1.7 }}>Blind to performance issues, stale logs, and untracked errors.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    ['Silent regressions', '500s go unnoticed until users complain.'],
                    ['Missing context', "Logs don't show full latency or path details."],
                    ['Siloed data', 'Every developer reads raw console outputs locally.'],
                  ].map(([title, desc]) => (
                    <li key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#333', flexShrink: 0, marginTop: 7 }} />
                      <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        <strong style={{ color: '#777', fontWeight: 600 }}>{title}</strong> — {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* With */}
            <FadeUp delay={0.2}>
              <div style={{ padding: '48px 40px', borderRadius: 16, background: '#111', border: '1px solid rgba(124,58,237,0.25)', height: '100%', boxShadow: '0 0 40px rgba(124,58,237,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', boxShadow: '0 0 8px rgba(124,58,237,0.6)' }} />
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>With APIWatch</h3>
                </div>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 36, lineHeight: 1.7 }}>Full visibility, always fresh, zero config across environments.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    ['Real-time tracking', 'Every request streamed live to your dashboard.'],
                    ['Automated metrics', 'P95 latency and avg response times plotted instantly.'],
                    ['Network effect', 'First dev sets it up — everyone shares the dashboard.'],
                  ].map(([title, desc]) => (
                    <li key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', flexShrink: 0, marginTop: 5, boxShadow: '0 0 10px rgba(124,58,237,0.5)' }} />
                      <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                        <strong style={{ color: '#fff', fontWeight: 600 }}>{title}</strong> — {desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── The Challenge Bento ── */}
      <section style={{ padding: '96px 24px', background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>The Challenge</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', maxWidth: 600, lineHeight: 1.1, marginBottom: 56 }}>
              Why is it hard to have perfect observability?
            </h2>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: <ShieldAlert size={26} />, title: 'Setup takes hours', desc: 'Configuring Prometheus, Grafana, or Datadog takes a full sprint. You just want to see if `/api/users` is slow.', delay: 0.1 },
              { icon: <Activity size={26} />, title: 'Heavy performance costs', desc: 'Traditional APMs hook deep into the v8 engine and visibly slow your app. Last month\'s logging is today\'s tech debt.', delay: 0.2 },
              { icon: <Box size={26} />, title: 'Fragmented truth', desc: 'One dev checks CloudWatch, another checks PM2 logs. No single source of truth — until now.', delay: 0.3 },
            ].map(({ icon, title, desc, delay }) => (
              <FadeUp key={title} delay={delay}>
                <div style={{ padding: 32, borderRadius: 16, background: '#111', border: '1px solid #1f1f1f' }}>
                  <div style={{ color: '#555', marginBottom: 20 }}>{icon}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{title}</h4>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.75, margin: 0 }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet APIWatch (Code + Features) ── */}
      <section id="how" style={{ padding: '112px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
          <div style={{ flex: '1 1 340px' }}>
            <FadeUp>
              <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Meet APIWatch</p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
                Best practices, generated for your codebase.
              </h2>
              <p style={{ fontSize: 16, color: '#666', lineHeight: 1.75, marginBottom: 40 }}>
                Curated analytics, non-blocking ingestion, and an automatic event queue — fully transparent inside your Express app.
              </p>
            </FadeUp>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[
                { icon: <Code2 size={15} />, title: 'Zero Dependency', desc: 'No agents. Just pure Node.js native `https` and `http` modules — keeps your bundle feather-light.' },
                { icon: <Zap size={15} />, title: 'Background Queuing', desc: 'APIWatch intercepts responses silently and flushes metrics in the background — never blocks your critical path.' },
                { icon: <LineChart size={15} />, title: 'Automatic Metric Math', desc: 'P95, averages, error rates, top endpoints — using native MongoDB aggregation pipelines in real-time.' },
              ].map(({ icon, title, desc }, i) => (
                <FadeUp key={title} delay={0.1 * (i + 1)}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ padding: 8, borderRadius: 8, background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#aaa', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>{title}</h4>
                      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Code block */}
          <FadeUp delay={0.3} style={{ flex: '1 1 380px' }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #1f1f1f', background: '#0d0d0d', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', background: '#111', borderBottom: '1px solid #1f1f1f' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <span style={{ margin: '0 auto', fontSize: 12, fontFamily: 'monospace', color: '#444' }}>server.js</span>
              </div>
              <pre style={{ padding: '24px 28px', margin: 0, fontSize: 13, fontFamily: 'monospace', lineHeight: 1.9, overflowX: 'auto', color: '#ccc' }}>
                <span style={{ color: '#ff7b72' }}>const </span>
                <span>express = </span>
                <span style={{ color: '#79c0ff' }}>require</span>
                <span>(</span><span style={{ color: '#a5d6ff' }}>'express'</span><span>);</span>{'\n'}
                <span style={{ color: '#ff7b72' }}>const </span>
                <span>apiwatch = </span>
                <span style={{ color: '#79c0ff' }}>require</span>
                <span>(</span><span style={{ color: '#a5d6ff' }}>'apiwatch-sdk'</span><span>);</span>{'\n\n'}
                <span style={{ color: '#ff7b72' }}>const </span>
                <span>app = </span>
                <span style={{ color: '#d2a8ff' }}>express</span>
                <span>();</span>{'\n\n'}
                <span style={{ color: '#555' }}>{'// ✦ The magic happens here'}</span>{'\n'}
                <span>app.</span>
                <span style={{ color: '#d2a8ff' }}>use</span>
                <span>(apiwatch(</span>
                <span style={{ color: '#a5d6ff' }}>'apw_live_xxxxxxxx'</span>
                <span>));</span>{'\n\n'}
                <span>app.</span>
                <span style={{ color: '#d2a8ff' }}>get</span>
                <span>(</span><span style={{ color: '#a5d6ff' }}>'/api/users'</span>
                <span>, (req, res) {'=> {'}</span>{'\n'}
                <span>{'  '}res.</span>
                <span style={{ color: '#d2a8ff' }}>json</span>
                <span>({'({ users: [] })'});</span>{'\n'}
                <span>{'}'});</span>{'\n\n'}
                <span>app.</span>
                <span style={{ color: '#d2a8ff' }}>listen</span>
                <span>(</span><span style={{ color: '#79c0ff' }}>3000</span><span>);</span>
              </pre>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Steps / Get Started ── */}
      <section style={{ padding: '96px 24px', background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Quick Start</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>
              Try it in 30 seconds.
            </h2>
            <p style={{ fontSize: 18, color: '#555', marginBottom: 64, fontWeight: 300 }}>Three steps. No config files. No dashboards to assemble.</p>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', maxWidth: 640, margin: '0 auto 64px' }}>
            {[
              { step: '01', title: 'Create an account', desc: `Go to apiwatch404.vercel.app → Register → Create a new project → copy your API key (apw_live_...).` },
              { step: '02', title: 'Install the SDK', desc: 'npm install apiwatch-sdk' },
              { step: '03', title: 'Add one line to your Express app', desc: `app.use(apiwatch('apw_live_YOUR_KEY'));` },
            ].map(({ step, title, desc }, i) => (
              <FadeUp key={step} delay={0.1 * (i + 1)}>
                <div style={{ display: 'flex', gap: 20, padding: '24px 28px', borderRadius: 12, background: '#111', border: '1px solid #1f1f1f', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#7c3aed', fontWeight: 700, minWidth: 24, paddingTop: 2 }}>{step}</span>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>{title}</h4>
                    <p style={{ fontSize: 13, fontFamily: step !== '01' ? 'monospace' : 'inherit', color: '#666', margin: 0, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '16px 28px', borderRadius: 12, background: '#111', border: '1px solid #1f1f1f', fontFamily: 'monospace', fontSize: 14, color: '#ccc', marginBottom: 32, display: 'inline-flex' }}>
              <span style={{ color: '#7c3aed' }}>npm</span> install apiwatch-sdk
              <button
                onClick={copyToClipboard}
                style={{ marginLeft: 12, padding: 8, borderRadius: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}
              >
                {copied ? <Check size={15} style={{ color: '#4ade80' }} /> : <Copy size={15} />}
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <button
              onClick={() => navigate('/register')}
              style={{ padding: '14px 32px', borderRadius: 10, background: '#fff', color: '#000', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Create Free Account
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '32px 48px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/icon.png" alt="APIWatch" style={{ width: 16, height: 16, borderRadius: 4, opacity: 0.4, filter: 'grayscale(1)' }} />
          <span style={{ fontSize: 12, color: '#555', fontWeight: 500 }}>APIWatch © {new Date().getFullYear()}</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['GitHub', 'npm', 'Terms'].map(link => (
            <a key={link} href="#" style={{ fontSize: 12, color: '#555', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#555'}
            >{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
