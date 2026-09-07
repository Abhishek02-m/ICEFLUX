import { useEffect, useState } from 'react';
import InstrumentPanel from '../components/InstrumentPanel.jsx';
import AntarcticMap from '../components/map/AntarcticMap.jsx';
import Chip from '../components/Chip.jsx';
import Meter from '../components/Meter.jsx';
import { getDashboardData } from '../services/api.js';

export default function Dashboard({ onNavigate }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    getDashboardData().then((d) => { if (alive) setData(d); });
    return () => { alive = false; };
  }, []);

  if (!data) return null;
  const { currentMission, dashboardInsights, iceOutlookSparkline } = data;

  return (
    <section className="page active" id="page-dashboard">
      <div className="page-head">
        <div>
          <h1>Operations overview</h1>
          <p>Bharati Station region · fleet and route conditions at a glance</p>
        </div>
      </div>

      <div className="layout-2col">
        <InstrumentPanel
          title="Antarctic operations map"
          sub="66.4°S 76.2°E"
          caption="Vessel position · sea-ice concentration · iceberg markers"
        >
          <AntarcticMap variant="dashboard" />
        </InstrumentPanel>

        <div>
          <div className="card">
            <div className="quick-insight">
              <div className="qi-label">7-day ice outlook</div>
              <svg viewBox="0 0 240 46" width="100%" height="46">
                <polyline points={iceOutlookSparkline} fill="none" stroke="#1B8FA3" strokeWidth="2.2" />
              </svg>
            </div>
            <div className="quick-insight">
              <div className="qi-label">Icebergs near route</div>
              <Chip tone="amber">{dashboardInsights.icebergsNearRoute}</Chip>
            </div>
            <div className="quick-insight">
              <div className="qi-label">Route safety score</div>
              <div className="stat-value">
                {dashboardInsights.routeSafetyScore}
                <span style={{ fontSize: 13, color: 'var(--slate-500)' }}>/10</span>
              </div>
              <Meter pct={dashboardInsights.routeSafetyScore * 10} tone="good" />
            </div>
            <div className="quick-insight">
              <div className="qi-label">Estimated fuel saving</div>
              <div className="stat-value" style={{ color: '#1D6E5A' }}>{dashboardInsights.fuelSaving}</div>
              <div className="stat-sub">vs. baseline route</div>
            </div>
            <div className="quick-insight">
              <div className="qi-label">Active alerts</div>
              <Chip tone="red">{dashboardInsights.activeAlert}</Chip>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-strip">
        <div>
          <div className="k">Current mission</div>
          <div className="v mono">{currentMission.id} · {currentMission.route}</div>
        </div>
        <div>
          <div className="k">ETA</div>
          <div className="v mono">{currentMission.eta}</div>
        </div>
        <div>
          <div className="k">Ice risk</div>
          <Chip tone="amber">{currentMission.iceRisk}</Chip>
        </div>
        <div>
          <div className="k">Route status</div>
          <Chip tone="blue">{currentMission.routeStatus}</Chip>
        </div>
      </div>

      <div className="quick-actions">
        <button className="btn-action primary" onClick={() => onNavigate('planner')}>Plan mission</button>
        <button className="btn-action" onClick={() => onNavigate('forecast')}>View ice forecast</button>
        <button className="btn-action" onClick={() => onNavigate('iceberg')}>Track icebergs</button>
        <button className="btn-action" onClick={() => onNavigate('analysis')}>Analyze route</button>
        <button className="btn-action" onClick={() => onNavigate('live')}>View live mission</button>
      </div>
    </section>
  );
}
