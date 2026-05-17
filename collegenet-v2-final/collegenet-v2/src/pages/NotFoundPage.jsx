// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import Shell from '../components/Shell';

export default function NotFoundPage() {
  return (
    <Shell title="404 — Not Found">
      <div className="card" style={{ textAlign:'center', padding:'48px' }}>
        <div style={{ fontSize:40, marginBottom:16, opacity:0.3 }}>⚠</div>
        <div style={{ fontWeight:600, marginBottom:8 }}>Page not found</div>
        <div style={{ fontSize:12, color:'var(--text-dim)', marginBottom:20 }}>
          The requested resource does not exist on this server.
        </div>
        <Link to="/dashboard" className="btn btn-secondary btn-sm">
          Return to Dashboard
        </Link>
      </div>
    </Shell>
  );
}
