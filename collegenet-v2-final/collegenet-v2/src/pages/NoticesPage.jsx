// src/pages/NoticesPage.jsx
import { useState } from 'react';
import Shell from '../components/Shell';
import { PriorityBadge } from '../components/Badge';
import client from '../api/client';

const NOTICES = [
  { id:'NOT-112', title:'Semester End Examination Schedule',      date:'2024-11-20', dept:'Examination Cell', priority:'High'   },
  { id:'NOT-111', title:'Campus Placement Drive — TCS & Infosys', date:'2024-11-18', dept:'T&P Cell',         priority:'Medium' },
  { id:'NOT-110', title:'Library Timing Change for November',     date:'2024-11-15', dept:'Library',           priority:'Low'    },
  { id:'NOT-109', title:'Annual Sports Day Registration Open',    date:'2024-11-10', dept:'Sports Dept.',      priority:'Low'    },
];

export default function NoticesPage() {
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotice = async () => {
    setLoading(true);
    try {
      const res = await client.get('/challenge/5');
      setResult({ ok:true, data:res.data, headers:res.headers });
    } catch (err) {
      setResult({ ok:false, data:err.response?.data ?? null, headers:{} });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Shell title="Notice Board" subtitle="Official institutional communications">
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Notice ID</th><th>Title</th><th>Department</th>
                <th>Date</th><th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {NOTICES.map(n => (
                <tr key={n.id}>
                  <td style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--text-dim)' }}>{n.id}</td>
                  <td style={{ fontWeight:500 }}>{n.title}</td>
                  <td style={{ color:'var(--text-dim)' }}>{n.dept}</td>
                  <td style={{ fontFamily:'var(--mono)', fontSize:12 }}>{n.date}</td>
                  <td><PriorityBadge priority={n.priority} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Live Feed</div>
        <p style={{ fontSize:12, color:'var(--text-dim)', marginBottom:14 }}>
          Fetch the latest notice from the notification service.
        </p>
        <button className="btn btn-primary" onClick={fetchNotice} disabled={loading}>
          {loading ? 'Fetching…' : 'Fetch Latest Notice'}
        </button>

        {result && (
          <div className="response-area">
            <div className="pre-label" style={{ marginBottom:8 }}>Response Body</div>
            <pre style={{ marginBottom:16 }}>{JSON.stringify(result.data, null, 2)}</pre>

            <div className="pre-label" style={{ marginBottom:8 }}>Response Headers</div>
            <div className="card" style={{ padding:0, overflow:'hidden' }}>
              <div className="table-wrap">
                <table className="header-table">
                  <tbody>
                    {Object.entries(result.headers).map(([k, v]) => {
                      const isFlag = k.toLowerCase() === 'x-secret-flag';
                      return (
                        <tr key={k} style={isFlag ? { background:'rgba(234,179,8,0.06)' } : {}}>
                          <td style={{
                            padding:'8px 14px', borderBottom:'1px solid var(--border)',
                            fontFamily:'var(--mono)', fontSize:11,
                            color: isFlag ? 'var(--yellow)' : 'var(--text-dim)',
                          }}>{k}</td>
                          <td style={{
                            padding:'8px 14px', borderBottom:'1px solid var(--border)',
                            fontFamily:'var(--mono)', fontSize:11,
                            color: isFlag ? 'var(--yellow)' : 'var(--text)',
                          }}>{String(v)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
