// src/pages/StudentsPage.jsx
import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import Shell from '../components/Shell';
import { StatusBadge } from '../components/Badge';
import Icon from '../components/Icon';
import { useStudents } from '../hooks/useStudents';

const ROW_HEIGHT = 46;

// Column definitions
const COLS = [
  { key: 'id',     label: '#',           width: '48px',  mono: true,  dim: true  },
  { key: 'name',   label: 'Name',        width: '1fr',   bold: true               },
  { key: 'roll',   label: 'Roll No.',    width: '110px', mono: true               },
  { key: 'dept',   label: 'Department',  width: '1fr',   dim: true                },
  { key: 'year',   label: 'Year',        width: '60px'                            },
  { key: 'cgpa',   label: 'CGPA',        width: '70px',  mono: true               },
  { key: 'status', label: 'Status',      width: '100px'                           },
  // { key: '_action',label: '',            width: '90px'                            },
];

const GRID = COLS.map(c => c.width).join(' ');

function SortIcon({ col, sortKey, sortDir }) {


  // if (col.key === '_action' || col.key === 'status') return null;
  if (col.key === 'status') return null;



  if (sortKey !== col.key) return <span style={{ opacity: 0.3, fontSize: 10 }}>↕</span>;
  return <span style={{ fontSize: 10 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>;
}

function StudentRow({ index, style, data }) {
  const s = data[index];
  return (
    <div
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: GRID,
        alignItems: 'center',
        gap: 0,
        borderBottom: '1px solid var(--border)',
        padding: '0 16px',
        background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)',
        transition: 'background 0.12s',
      }}
      className="vrow"
    >
      <div style={{ fontFamily:'var(--mono)', fontSize:11, color:'var(--text-dim)' }}>{s.id}</div>
      <div style={{ fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:8 }}>{s.name}</div>
      <div style={{ fontFamily:'var(--mono)', fontSize:11 }}>{s.roll}</div>
      <div style={{ color:'var(--text-dim)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:8 }}>{s.dept}</div>
      <div>{s.year}</div>
      <div style={{ fontFamily:'var(--mono)', fontSize:11 }}>{s.cgpa}</div>
      <div><StatusBadge status={s.status} /></div>
      {/* <div>
        <Link to={`/students/${s.id}`} className="btn btn-secondary btn-sm">
          View
        </Link>
      </div> */}
    </div>
  );
}

export default function StudentsPage() {
  const {
    students, total,
    query, setQuery,
    sortKey, sortDir, toggleSort,
    deptFilter, setDeptFilter,
    depts,
  } = useStudents();

  const listRef = useRef();

  const handleQueryChange = useCallback((e) => {
    setQuery(e.target.value);
    listRef.current?.scrollTo(0);
  }, [setQuery]);

  // const exportCSV = () => {
  //   const header = 'ID,Name,Roll,Dept,Year,CGPA,Status\n';
  //   const rows = students.map(s =>
  //     `${s.id},"${s.name}",${s.roll},"${s.dept}",${s.year},${s.cgpa},${s.status}`
  //   ).join('\n');
  //   const blob = new Blob([header + rows], { type: 'text/csv' });
  //   const a = document.createElement('a');
  //   a.href = URL.createObjectURL(blob);
  //   a.download = 'students.csv';
  //   a.click();
  // };

  return (
    <Shell
      title="Student Records"
      subtitle={`${students.length} of ${total} students — AY 2024–25`}
    >





    <div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '12px 18px',
  marginBottom: 16,
}}>
  <div>
    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Your Student Record</div>
    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
      View your personal academic details and documents.
    </div>
  </div>
  <Link to="/students/37" className="btn btn-primary btn-sm">
    Check Your Details
  </Link>
</div>















      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center',
          padding: '14px 16px', borderBottom: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, flex:1, minWidth:200 }}>
            <Icon name="search" />
            <input
              className="form-input"
              placeholder="Filter by name or roll…"
              value={query}
              onChange={handleQueryChange}
              style={{ margin:0, height:32 }}
            />
          </div>

          <select
            className="form-input"
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            style={{ height:32, margin:0, width:'auto', minWidth:160 }}
          >
            <option value="">All Departments</option>
            {depts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
{/* 
          <button className="btn btn-secondary btn-sm" onClick={exportCSV}>
            <Icon name="download" /> Export CSV
          </button> */}

          <div style={{
            marginLeft:'auto', fontFamily:'var(--mono)', fontSize:11,
            color:'var(--text-dim)', whiteSpace:'nowrap',
          }}>
            {students.length} result{students.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: GRID,
          padding: '0 16px',
          height: 38,
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface2)',
          position: 'sticky', top: 0, zIndex: 1,
        }}>
          {COLS.map(col => (
            <div
              key={col.key}
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing:'0.06em',
                textTransform:'uppercase', color:'var(--text-dim)',




                // cursor: col.key !== '_action' && col.key !== 'status' ? 'pointer' : 'default',
                cursor: col.key !== 'status' ? 'pointer' : 'default',



                display:'flex', alignItems:'center', gap:5, userSelect:'none',
              }}




              // onClick={() => col.key !== '_action' && col.key !== 'status' && toggleSort(col.key)}
              onClick={() => col.key !== 'status' && toggleSort(col.key)}




            >
              {col.label}
              <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
            </div>
          ))}
        </div>

        {/* Virtualized rows */}
        {students.length === 0 ? (
          <div style={{ padding: 40, textAlign:'center', color:'var(--text-dim)', fontSize:13 }}>
            No students match your filters.
          </div>
        ) : (
          <List
            ref={listRef}
            height={Math.min(students.length * ROW_HEIGHT, 540)}
            itemCount={students.length}
            itemSize={ROW_HEIGHT}
            itemData={students}
            width="100%"
          >
            {StudentRow}
          </List>
        )}
      </div>
    </Shell>
  );
}
