import useUtcClock from '../hooks/useUtcClock.js';

const TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'planner', label: 'Mission planner' },
  { key: 'forecast', label: 'Ice forecast' },
  { key: 'iceberg', label: 'Iceberg watch' },
  { key: 'analysis', label: 'Route analysis' },
  { key: 'live', label: 'Live mission' },
  { key: 'fleet', label: 'Fleet' },
  { key: 'insights', label: 'Insights' },
  { key: 'settings', label: 'Settings' },
];

export default function TopBar({ activeTab, onSelectTab }) {
  const utcClock = useUtcClock();

  return (
    <header className="topbar">
      <div className="brandmark topbar-brand">
        <svg width="24" height="24" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="15.5" stroke="#39C2D9" strokeWidth="1.6" />
          <path d="M17 2 L17 32 M2 17 L32 17 M6 6 L28 28 M28 6 L6 28" stroke="#39C2D9" strokeWidth="1" opacity="0.55" />
          <circle cx="17" cy="17" r="4" fill="#39C2D9" />
        </svg>
        <span className="brand-name">ICE<b>FLUX</b></span>
      </div>
      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => onSelectTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="topbar-right">
        <span className="utc-clock">{utcClock}</span>
        <div className="avatar-btn">DU</div>
      </div>
    </header>
  );
}
