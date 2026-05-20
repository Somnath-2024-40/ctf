// src/components/Shell.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';

const NAV = [
  { group: 'Main', items: [
    { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { to: '/students',  icon: 'students',  label: 'Student Records' },
    { to: '/search',    icon: 'search',    label: 'Employee Search' },
  ]},
  { group: 'Communication', items: [
    { to: '/notices',   icon: 'notice',    label: 'Notice Board' },
  ]},
  { group: 'System', items: [
    { to: '/admin',     icon: 'admin',     label: 'Admin Panel' },
    // { to: '/classified',icon: 'classified',label: 'Classified Docs' },
    { to: '/stego',     icon: 'stego',     label: 'Media Lab' },
  ]},
];

export default function Shell({ title, subtitle, children }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem('ctf_authed');
    sessionStorage.removeItem('ctf_token');
    navigate('/');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-name">{import.meta.env.VITE_APP_NAME || 'COLLEGENET'}</div>
          <div className="logo-sub">
            Administration Portal v{import.meta.env.VITE_VERSION || '4.2'}
          </div>
        </div>

        {NAV.map(({ group, items }) => (
          <div key={group}>
            <div className="sidebar-section-label">{group}</div>
            <nav className="sidebar-nav">
              {items.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  <Icon name={icon} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}

        <div className="sidebar-footer">
          <div>Session: admin@collegenet</div>
          <div style={{ marginTop: 4 }}>
            AY {import.meta.env.VITE_YEAR || '2024–25'}
          </div>
          <button
            style={{ marginTop: 10, width: '100%' }}
            className="btn btn-secondary btn-sm"
            onClick={handleSignOut}
          >
            <Icon name="logout" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="main-area">
        <div className="topbar">
          <div className="topbar-breadcrumb">
            CollegeNet › <span>{title}</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-user">
              <div className="user-dot" />
              admin
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="page-header">
            <div className="page-title">{title}</div>
            {subtitle && <div className="page-subtitle">{subtitle}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
