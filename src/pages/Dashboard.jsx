import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, deleteProject } from '../services/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(null);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('apiwatch_token')) { navigate('/login'); return; }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('apiwatch_token'); navigate('/login'); }
    } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true); setError('');
    try {
      const res = await createProject({ name: newName.trim() });
      setProjects([res.data, ...projects]);
      setShowModal(false); setNewName('');
      setShowKeyModal(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create project');
    } finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project and all its data?')) return;
    try { await deleteProject(id); setProjects(projects.filter(p => p._id !== id)); }
    catch { alert('Failed to delete project'); }
  };

  const maskKey = (key) => key ? key.substring(0, 12) + '...' + key.substring(key.length - 4) : '';
  const copyKey = (key) => navigator.clipboard.writeText(key);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28,
        }} className="animate-in">
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 2 }}>Projects</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Manage your API monitoring</p>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)} id="create-project-btn">
            New project
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)', fontSize: 13 }}>
            Loading...
          </div>
        ) : projects.length === 0 ? (
          <div className="card animate-in" style={{ textAlign: 'center', padding: '60px 24px' }}>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, color: 'var(--text-secondary)' }}>
              No projects yet
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              Create a project to start monitoring
            </p>
            <button className="btn-primary" onClick={() => setShowModal(true)}>Create project</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {projects.map((project, i) => (
              <div key={project._id} className="card animate-in" style={{
                padding: 20,
                animationDelay: `${i * 40}ms`,
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600 }}>{project.name}</h3>
                  <button className="btn-danger" onClick={() => handleDelete(project._id)} style={{ padding: '3px 8px', fontSize: 11 }}>
                    Delete
                  </button>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500 }}>
                    API Key
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="code-block" style={{ flex: 1 }}>{maskKey(project.apiKey)}</span>
                    <button className="btn-secondary" onClick={() => copyKey(project.apiKey)}
                      style={{ padding: '6px 10px', fontSize: 11, lineHeight: 1 }} title="Copy">
                      Copy
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </div>

                <button className="btn-primary" onClick={() => navigate(`/project/${project._id}`)}
                  style={{ width: '100%', marginTop: 'auto', fontSize: 13 }}>
                  View analytics
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>New project</h2>
            <form onSubmit={handleCreate}>
              {error && (
                <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid #3a1c1c', borderRadius: 6, padding: '8px 12px', marginBottom: 12, color: 'var(--red)', fontSize: 13 }}>
                  {error}
                </div>
              )}
              <input type="text" className="input-field" placeholder="Project name" value={newName}
                onChange={e => setNewName(e.target.value)} autoFocus id="project-name-input" style={{ marginBottom: 14 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={creating || !newName.trim()} id="create-project-submit" style={{ flex: 1 }}>
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="modal-overlay" onClick={() => setShowKeyModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Project created</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
              Save your API key — you'll need it to configure the SDK.
            </p>
            <div className="code-block" style={{
              whiteSpace: 'normal', wordBreak: 'break-all',
              padding: '12px 14px', marginBottom: 16,
              color: 'var(--accent)', fontSize: 13,
            }}>
              {showKeyModal.apiKey}
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => { copyKey(showKeyModal.apiKey); setShowKeyModal(null); }}>
              Copy and close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
