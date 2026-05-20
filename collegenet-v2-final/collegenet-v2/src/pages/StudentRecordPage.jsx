// src/pages/StudentRecordPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Shell from '../components/Shell';
import client, { BASE } from '../api/client';
import { ALL_STUDENTS } from '../hooks/useStudents';

export default function StudentRecordPage() {
  const { id } = useParams();
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const student = ALL_STUDENTS.find(s => s.id === Number(id)) || {
    name: `Student #${id}`, roll: `ID${id}`,
    dept: 'Unknown', year: '-', cgpa: '-', hostel: '-', status: '-',
  };

  useEffect(() => {
    setLoading(true);
    setResult(null);
    setError(null);

    client.get(`/challenge/8/documents/${id}`)
      .then(res => { setResult(res.data); setLoading(false); })
      .catch(err => {
        setError(err.response?.data ?? String(err));
        setLoading(false);
      });
  }, [id]);

  const fields = [
    ['Full Name',   student.name],
    ['Roll No.',    student.roll],
    ['Department',  student.dept],
    ['Year',        student.year],
    ['CGPA',        student.cgpa],
    ['Hostel',      student.hostel],
    ['Status',      student.status],
  ];

  return (
    <Shell
      title={`Student Record — ${student.name}`}
      subtitle={`Roll: ${student.roll}`}
    >
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        {/* Personal info */}
        <div className="card">
          <div className="card-title">Personal Information</div>
          <div className="info-grid">
            {fields.map(([label, val]) => (
              <div className="info-item" key={label}>
                <label>{label}</label>
                <div className="info-value">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* API document */}
        <div className="card">
          <div className="card-title">Academic Documents</div>
          {loading ? (
            <div style={{ color:'var(--text-dim)', fontSize:12 }}>Fetching document record…</div>
          ) : error ? (
            <div style={{ color:'var(--red)', fontSize:12 }}>
              Error: {typeof error === 'object' ? JSON.stringify(error) : error}
            </div>
          ) : result ? (
            <div>
              {result.content && (
                <div className="info-item" style={{ marginBottom:10 }}>
                  <label>Content</label>
                  <div className="info-value">
                    {typeof result.content === 'string'
                      ? result.content
                      : JSON.stringify(result.content)}
                  </div>
                </div>
              )}
              {result.classification && (
                <div className="info-item" style={{ marginBottom:10 }}>
                  <label>Classification</label>
                  <span className="badge badge-red">{result.classification}</span>
                </div>
              )}
              {result.author && (
                <div className="info-item">
                  <label>Author</label>
                  <div className="info-value">{result.author}</div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ color:'var(--text-dim)', fontSize:12 }}>No document data returned.</div>
          )}
        </div>
      </div>


    </Shell>
  );
}