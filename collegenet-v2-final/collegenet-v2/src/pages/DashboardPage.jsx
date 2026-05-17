// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import Shell from '../components/Shell';
import { StatusBadge } from '../components/Badge';
import client from '../api/client';

const STATS = [
  { label: 'Enrolled Students', value: '158',  change: '+3.2% from last semester' },
  { label: 'Departments',        value: '10',   change: '2 under review' },
  { label: 'Active Notices',     value: '7',    change: 'Last updated: today' },
];

const RECENT = [
  { id:'ADM-0041', action:'Grade submission',      dept:'Computer Science', status:'Completed',    time:'09:14' },
  { id:'ADM-0040', action:'Hostel allotment',      dept:'Administration',   status:'Pending',      time:'08:52' },
  { id:'ADM-0039', action:'Fee waiver request',    dept:'Finance',          status:'Under review', time:'08:31' },
  { id:'ADM-0038', action:'Library access update', dept:'Library',          status:'Completed',    time:'07:58' },
  { id:'ADM-0037', action:'Course registration',   dept:'Registrar',        status:'Completed',    time:'07:11' },
];

export default function DashboardPage() {
  const [sessionStatus, setSessionStatus] = useState('Initializing…');

  useEffect(() => {
    client.get('/challenge/2')
      .then(() => setSessionStatus('Session token acquired'))
      .catch(() => setSessionStatus('Backend offline — running in demo mode'));
  }, []);

  return (
    <Shell title="Dashboard" subtitle="Academic Year 2024–25 overview">
      <div className="alert alert-info" style={{ fontSize: 11 }}>
        System: {sessionStatus}
      </div>

      <div className="stat-cards">
        {STATS.map((s, i) => (
          <div className="card" key={i}>
            <div className="card-title">{s.label}</div>
            <div className="stat-number">{s.value}</div>
            <div className="stat-change">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Recent Activity Log</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Action</th>
                <th>Department</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map(r => (
                <tr key={r.id}>
                  <td style={{ fontFamily:'var(--mono)', fontSize:12 }}>{r.id}</td>
                  <td>{r.action}</td>
                  <td style={{ color:'var(--text-dim)' }}>{r.dept}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--text-dim)' }}>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
