
import { useState } from 'react';
import Shell from '../components/Shell';
import client from '../api/client';

export default function ClassifiedPage() {
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await client.get('/challenge/classified/flag');
      setResult({ ok:true, data:res.data });
    } catch (err) {
      setResult({ ok:false, data:err.response?.data ?? String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Shell title="Classified Documents" subtitle="Restricted archive access">
      <div className="alert alert-warn">
        Access to this section is logged. Unauthorized access is subject to
        disciplinary action under the institution's IT Policy §7.3.
      </div>
      <div className="card">
        <div className="card-title">Document Archive</div>
        <p style={{ fontSize:12, color:'var(--text-dim)', marginBottom:16 }}>
          Retrieve the classified document archive from the secure storage
          endpoint. You must have the appropriate clearance level.
        </p>
        <button className="btn btn-primary" onClick={fetchDocs} disabled={loading}>
          {loading ? 'Retrieving…' : 'Access Classified Archive'}
        </button>
        {result && (
          <div className="response-area">
            <div className="pre-label">Raw Response</div>
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </Shell>
  );
}
