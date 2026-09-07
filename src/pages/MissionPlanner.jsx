import { useState } from 'react';
import InstrumentPanel from '../components/InstrumentPanel.jsx';
import AntarcticMap from '../components/map/AntarcticMap.jsx';
import Chip from '../components/Chip.jsx';
import Meter from '../components/Meter.jsx';
import { generateRoute } from '../services/api.js';
import { priorityOptions, vesselOptions } from '../data/routeProfiles.js';

const chipToneFromClass = {
  'chip-teal': 'teal',
  'chip-red': 'red',
  'chip-amber': 'amber',
  'chip-blue': 'blue',
};

export default function MissionPlanner() {
  const [priority, setPriority] = useState('Balanced');
  const [status, setStatus] = useState('Recommended route');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    distance: '412 nm',
    time: '29h',
    ice: 'Moderate',
    iceTone: 'amber',
    risk: 'Low–Med',
    riskTone: 'blue',
    fuel: '38.6 t',
    score: 82,
  });

  async function handleGenerate() {
    setLoading(true);
    setStatus('Recalculating…');
    const p = await generateRoute(priority);
    setSummary({
      distance: p.distance,
      time: p.time,
      ice: p.ice,
      iceTone: chipToneFromClass[p.chipIce] ?? 'grey',
      risk: p.risk,
      riskTone: chipToneFromClass[p.chipRisk] ?? 'grey',
      fuel: p.fuel,
      score: p.score,
    });
    setStatus(`${priority} route`);
    setLoading(false);
  }

  return (
    <section className="page active" id="page-planner">
      <div className="page-head">
        <div>
          <h1>Plan a mission</h1>
          <p>Set a route and ICEFLUX will score it against ice and iceberg conditions</p>
        </div>
      </div>
      <div className="layout-3col">
        <div>
          <div className="form-group">
            <label>Starting location</label>
            <input value="Bharati Station" readOnly />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input value="Larsemann Hills" readOnly />
          </div>
          <div className="form-group">
            <label>Vessel</label>
            <select defaultValue={vesselOptions[0]}>
              {vesselOptions.map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Forecast date</label>
            <input value="05 Sep 2026" readOnly />
          </div>
          <div className="form-group">
            <label>Forecast horizon</label>
            <select defaultValue="7 days">
              <option>3 days</option>
              <option>7 days</option>
              <option>10 days</option>
              <option>14 days</option>
            </select>
          </div>
          <div className="form-group">
            <label>Route priority</label>
            <div className="priority-list">
              {priorityOptions.map((opt) => (
                <label
                  key={opt}
                  className={`priority-opt${priority === opt ? ' selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === opt}
                    onChange={() => setPriority(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ marginTop: 6 }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Calculating optimal route…' : 'Generate route'}
          </button>
        </div>

        <InstrumentPanel
          title="Antarctic route map"
          sub={status}
          caption="Sea-ice forecast · iceberg positions · vessel start · destination · recommended route · alternatives"
        >
          <AntarcticMap variant="planner" />
        </InstrumentPanel>

        <div className="card">
          <h3>Route summary</h3>
          <div className="quick-insight"><div className="qi-label">Distance</div><div className="stat-value">{summary.distance}</div></div>
          <div className="quick-insight"><div className="qi-label">Est. travel time</div><div className="stat-value">{summary.time}</div></div>
          <div className="quick-insight"><div className="qi-label">Ice exposure</div><Chip tone={summary.iceTone}>{summary.ice}</Chip></div>
          <div className="quick-insight"><div className="qi-label">Risk level</div><Chip tone={summary.riskTone}>{summary.risk}</Chip></div>
          <div className="quick-insight"><div className="qi-label">Est. fuel</div><div className="stat-value">{summary.fuel}</div></div>
          <div className="quick-insight">
            <div className="qi-label">Overall route score</div>
            <Meter pct={summary.score} />
          </div>
        </div>
      </div>
    </section>
  );
}
