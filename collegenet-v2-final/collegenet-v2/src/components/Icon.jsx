// src/components/Icon.jsx
export default function Icon({ name }) {
  const icons = {
    dashboard: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    students: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 13c0-3.038 2.462-5.5 5.5-5.5S13 9.962 13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    search: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    notice: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="2" y="2" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 5.5h5M5 7.5h5M5 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    admin: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1L9.5 5h4l-3.25 2.5 1.25 4L7.5 9l-4 2.5 1.25-4L1.5 5h4L7.5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
    classified: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="2" y="6" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="7.5" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    stego: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 6l4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M10.5 6l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    logout: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M6 2H3a1 1 0 00-1 1v9a1 1 0 001 1h3M10 10l3-2.5L10 5M13 7.5H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chevron: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    filter: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    sort: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 4l3-3 3 3M6 1v12M11 10l-3 3-3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    download: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return <span className="icon">{icons[name] ?? null}</span>;
}
