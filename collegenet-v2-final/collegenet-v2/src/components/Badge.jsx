// src/components/Badge.jsx
export function StatusBadge({ status }) {
  const map = {
    Active:        'badge badge-green',
    Completed:     'badge badge-green',
    Pending:       'badge badge-yellow',
    'Under review':'badge badge-yellow',
    'On leave':    'badge badge-blue',
    Inactive:      'badge badge-red',
  };
  return (
    <span className={map[status] || 'badge badge-blue'}>{status}</span>
  );
}

export function PriorityBadge({ priority }) {
  const map = {
    High:   'badge badge-red',
    Medium: 'badge badge-yellow',
    Low:    'badge badge-blue',
  };
  return (
    <span className={map[priority] || 'badge badge-blue'}>{priority}</span>
  );
}
