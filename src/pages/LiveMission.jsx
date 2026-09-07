import InstrumentPanel from '../components/InstrumentPanel.jsx';
import AntarcticMap from '../components/map/AntarcticMap.jsx';
import Chip from '../components/Chip.jsx';
import Meter from '../components/Meter.jsx';

export default function LiveMission() {
  return (
    <section className="page active" id="page-live">
      <div className="page-head">
        <div><h1>Live mission — IF-2026-014</h1><p>MV Sagar Kanya · Bharati Station to Larsemann Hills</p></div>
        <Chip tone="blue">In progress</Chip>
      </div>
      <div className="layout-2col">
        <div>
          <InstrumentPanel title="Live vessel position" sub="Updated 14s ago">
            <AntarcticMap variant="live" />
          </InstrumentPanel>
          <div style={{ marginTop: 14 }}>
            <div className="qi-label">Route progress · 64%</div>
            <Meter pct={64} />
          </div>
        </div>
        <div className="card">
          <div className="quick-insight"><div className="qi-label">Destination</div><div className="stat-value" style={{ fontSize: 15 }}>Larsemann Hills</div></div>
          <div className="quick-insight"><div className="qi-label">Current route</div><div className="stat-value" style={{ fontSize: 15 }}>Recommended (balanced)</div></div>
          <div className="quick-insight"><div className="qi-label">Upcoming ice conditions</div><div className="stat-sub" style={{ fontSize: 13, color: 'var(--slate-900)' }}>Ice concentration rising to 71% in the next 12h</div></div>
          <div className="quick-insight"><div className="qi-label">Nearby iceberg warnings</div><Chip tone="amber">B-42F · 5.2 nm ahead</Chip></div>
          <div className="quick-insight"><div className="qi-label">Estimated arrival</div><div className="stat-value mono" style={{ fontSize: 15 }}>09 Sep 2026, 06:40 UTC</div></div>
          <div className="quick-insight"><div className="qi-label">Current risk level</div><Chip tone="amber">Moderate</Chip></div>
          <div className="quick-insight"><div className="qi-label">Important alerts</div><Chip tone="red">Iceberg intersect risk in 6h</Chip></div>
        </div>
      </div>
    </section>
  );
}
