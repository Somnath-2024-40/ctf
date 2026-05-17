// src/pages/SearchPage.jsx
import { useState, useRef } from 'react';
import Shell from '../components/Shell';
import Icon from '../components/Icon';
import client from '../api/client';

export default function SearchPage() {
  const [query, setQuery]   = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    try {
      const res = await client.get('/challenge/9/search', { params: { q } });
      setResult({ ok: true, data: res.data, headers: res.headers });
    } catch (err) {
      setResult({ ok: false, data: err.response?.data ?? null, headers: {} });
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSearch(); };

  return (
    <Shell title="Employee Search" subtitle="Search faculty and staff directory">
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Directory Search</div>
        <div style={{ display:'flex', gap:10, alignItems:'flex-end' }}>
          <div className="form-group" style={{ flex:1, margin:0 }}>
            <label className="form-label">Search by name</label>
            <input
              ref={inputRef}
              className="form-input"
              placeholder="e.g. Sharma, Kumar, Singh…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching…' : <><Icon name="search" /> Search</>}
          </button>
        </div>
      </div>

      {result && (
        <>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-title">Query Executed</div>
            <pre>{result.data?.query ?? '—'}</pre>
          </div>
          <div className="card">
            <div className="card-title">Results</div>
            {Array.isArray(result.data?.results) && result.data.results.length > 0 ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>{Object.keys(result.data.results[0]).map(k => <th key={k}>{k}</th>)}</tr>
                  </thead>
                  <tbody>
                    {result.data.results.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((v, j) => (
                          <td key={j} style={{ fontFamily:'var(--mono)', fontSize:12 }}>{String(v)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <pre>{JSON.stringify(result.data, null, 2)}</pre>
            )}
          </div>
        </>
      )}
    </Shell>
  );
}
