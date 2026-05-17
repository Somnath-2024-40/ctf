// src/pages/AdminPage.jsx
import Shell from '../components/Shell';

export default function AdminPage() {
  return (
    <Shell title="Admin Panel" subtitle="Restricted system access">
      <div className="card">
        <div className="locked-panel">
          <div className="lock-icon">🔒</div>
          <div className="locked-title">Elevated Access Required</div>
          <div className="locked-sub">
            This panel requires a valid administrator token. Contact your system
            administrator if you require access.
          </div>
        </div>
      </div>
    </Shell>
  );
}
