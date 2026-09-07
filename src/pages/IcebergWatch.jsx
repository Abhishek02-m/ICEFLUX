import { useEffect, useState } from 'react';
import InstrumentPanel from '../components/InstrumentPanel.jsx';
import AntarcticMap from '../components/map/AntarcticMap.jsx';
import { getIcebergWatchData } from '../services/api.js';

export default function IcebergWatch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    getIcebergWatchData().then((d) => { if (alive) setData(d); });
    return () => { alive = false; };
  }, []);

  if (!data) return null;
  const { trackedIceberg, movementTimeline, routeProximityPct } = data;

  return (
    <section className="page active" id="page-iceberg">
      <div className="page-head">
        <div><h1>Iceberg watch</h1><p>Tracked drift and intersection risk for icebergs near active routes</p></div>
      </div>
      <div className="layout-2col">
        <div>
          <InstrumentPanel
            title="Antarctic map"
            sub={`${trackedIceberg.id} tracked`}
            caption="Historical positions · predicted trajectory · risk zone"
          >
            <AntarcticMap variant="iceberg" />
          </InstrumentPanel>
          <div className="banner banner-red">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M8 6v3.2M8 11.6v.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Warning: iceberg {trackedIceberg.id} may intersect the planned route in 6 hours
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Iceberg information</h3>
            <div className="quick-insight"><div className="qi-label">ID</div><div className="stat-value mono">{trackedIceberg.id}</div></div>
            <div className="quick-insight"><div className="qi-label">Size</div><div className="stat-value">{trackedIceberg.size}</div></div>
            <div className="quick-insight"><div className="qi-label">Current position</div><div className="stat-value mono" style={{ fontSize: 15 }}>{trackedIceberg.position}</div></div>
            <div className="quick-insight"><div className="qi-label">Drift</div><div className="stat-value">{trackedIceberg.drift}</div></div>
          </div>
          <div className="card">
            <h3>Predicted movement timeline</h3>
            <div className="timeline">
              {movementTimeline.map((t) => (
                <div key={t.label} className={`tpoint${t.warn ? ' warn' : ''}`}>
                  <div className="dot" />
                  <div className="tlabel">{t.label}</div>
                  <div className="tval">{t.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Proximity to planned route</h3>
            <div className="meter" style={{ background: 'var(--red-100)' }}>
              <i style={{ width: `${routeProximityPct}%`, background: 'var(--red-500)' }} />
            </div>
            <div className="stat-sub" style={{ marginTop: 6 }}>Closing distance — reroute recommended within 4h</div>
          </div>
        </div>
      </div>
    </section>
  );
}
