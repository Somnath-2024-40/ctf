// src/hooks/useStudents.js
import { useState, useMemo, useCallback } from 'react';

// ── Generate 150+ realistic student records ──────────────────────────────────
const DEPTS = [
  'Computer Science', 'Electronics', 'Mechanical Engg.',
  'Civil Engg.', 'Chemistry', 'Mathematics', 'Physics',
  'Biotechnology', 'Electrical Engg.', 'Information Tech.',
];
const FIRST = [
  'Aarav','Aditi','Akash','Ananya','Arjun','Arnav','Ayesha',
  'Deepa','Farhan','Gaurav','Ishaan','Kiran','Kunal','Leela',
  'Mehul','Neha','Nikhil','Pooja','Priya','Rahul','Raj','Riya',
  'Rohan','Sakshi','Sana','Siddharth','Sneha','Tanvi','Uday',
  'Varun','Vikram','Yash','Zara','Amrita','Chirag','Divya',
  'Harsha','Isha','Jatin','Kavya','Manish','Nandini','Om',
  'Pallavi','Qasim','Radhika','Sameer','Trisha','Vivek',
];
const LAST = [
  'Sharma','Mehta','Das','Iyer','Bose','Roy','Nair','Krishnan',
  'Patel','Gupta','Singh','Kumar','Joshi','Malhotra','Rao',
  'Chandra','Verma','Mishra','Ghosh','Pillai','Rajan','Sinha',
  'Dubey','Agarwal','Bhatt','Chatterjee','Mukherjee','Pandey',
  'Desai','Shah','Reddy','Saxena','Tiwari','Banerjee','Kapoor',
];
const STATUSES = ['Active','Active','Active','Active','On leave','Inactive'];
const DEPT_CODES = {
  'Computer Science':'CS','Electronics':'EC','Mechanical Engg.':'ME',
  'Civil Engg.':'CE','Chemistry':'CH','Mathematics':'MA','Physics':'PH',
  'Biotechnology':'BT','Electrical Engg.':'EL','Information Tech.':'IT',
};

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateStudents(count = 158) {
  const rand = seededRandom(0xc0ffee);
  return Array.from({ length: count }, (_, i) => {
    const dept = DEPTS[Math.floor(rand() * DEPTS.length)];
    const year = 1 + Math.floor(rand() * 4);
    const admYear = 2020 + (4 - year);
    const rollSuffix = String(Math.floor(rand() * 900) + 100).padStart(3, '0');
    const roll = `${DEPT_CODES[dept]}${admYear % 100}${rollSuffix}`;
    const first = FIRST[Math.floor(rand() * FIRST.length)];
    const last  = LAST[Math.floor(rand() * LAST.length)];
    const cgpa  = (6.0 + rand() * 4.0).toFixed(2);
    const status = STATUSES[Math.floor(rand() * STATUSES.length)];
    return {
      id: i + 1,
      name: `${first} ${last}`,
      roll,
      dept,
      year,
      cgpa,
      status,
      hostel: `${['A','B','C','G','H'][Math.floor(rand()*5)]}-Block ${100 + Math.floor(rand()*200)}`,
    };
  });
}

const ALL_STUDENTS = generateStudents(158);

export function useStudents() {
  const [query, setQuery]   = useState('');
  const [sortKey, setSortKey]     = useState('id');
  const [sortDir, setSortDir]     = useState('asc');
  const [deptFilter, setDeptFilter] = useState('');

  const toggleSort = useCallback((key) => {
    setSortKey(prev => {
      if (prev === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      else { setSortDir('asc'); }
      return key;
    });
  }, []);

  const filtered = useMemo(() => {
    let list = ALL_STUDENTS;
    if (deptFilter) list = list.filter(s => s.dept === deptFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        s => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = typeof av === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [query, deptFilter, sortKey, sortDir]);

  return {
    students: filtered,
    total: ALL_STUDENTS.length,
    query, setQuery,
    sortKey, sortDir, toggleSort,
    deptFilter, setDeptFilter,
    depts: DEPTS,
  };
}

export { ALL_STUDENTS };
