// src/pages/LoginPage.jsx
// FLAG{html_source_inspector_1}
// Admin credentials: admin / admin123 (temporary, change after login)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser]       = useState('');
  const [pass, setPass]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!user || !pass) { setError('Enter credentials to continue.'); return; }
  //   setError('');
  //   setLoading(true);
  //   setTimeout(() => {
  //     sessionStorage.setItem('ctf_authed', 'true');
  //     navigate('/dashboard');
  //   }, 600);
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !pass) { setError('Enter credentials to continue.'); return; }
    setError('');
    
    if (user !== 'LeelaMehta' || pass !== 'leela123') {
      setError('Invalid credentials.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('ctf_authed', 'true');
      navigate('/dashboard');
    }, 600);
  };

  
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo">
          <div className="app-name">{import.meta.env.VITE_APP_NAME || 'COLLEGENET'}</div>
          <div className="app-tagline">Enterprise Resource Planning System</div>
        </div>
        <div className="login-title">Sign in</div>
        <div className="login-sub">Use your institutional credentials to continue.</div>

        {error && <div className="alert alert-warn" style={{ marginBottom: 14 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              placeholder="username"
              value={user}
              onChange={e => setUser(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            disabled={loading}
          >
            {loading ? 'Authenticating…' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          CollegeNet ERP © 2024 — IT Department<br />
          <span>For support, contact helpdesk@collegenet.internal</span>
        </div>
      </div>
    </div>
  );
}
