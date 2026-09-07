import { useEffect, useState } from 'react';
import Chip from '../components/Chip.jsx';
import { getFleetData, getVesselDetails } from '../services/api.js';

export default function Fleet() {
  const [data, setData] = useState(null);
  const [selectedKey, setSelectedKey] = useState('sagar');
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let alive = true;
    getFleetData().then((d) => { if (alive) setData(d); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    let alive = true;
    getVesselDetails(selectedKey).then((d) => { if (alive) setDetail(d); });
    return () => { alive = false; };
  }, [selectedKey]);

  if (!data || !detail) return null;
  const { fleetStats, fleetVessels } = data;

  return (
    <section className="page active" id="page-fleet">
      <div className="page-head">
        <div><h1>Fleet overview</h1><p>Status and ice risk across all vessels</p></div>
      </div>

      <div className="fleet-stats">
        {fleetStats.map((s) => (
          <div className="fleet-stat" key={s.label}>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="fleet-toolbar">
        <select defaultValue="All vessels">
          <option>All vessels</option>
          <option>En route</option>
          <option>In port</option>
          <option>Ice risk</option>
        </select>
        <button className="btn-solid">+ Add vessel</button>
      </div>

      <div className="layout-2col">
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table" style={{ padding: '6px 6px 0' }}>
            <thead>
              <tr>
                <th style={{ paddingLeft: 18 }}>Vessel</th>
                <th>Status</th>
                <th>Current mission</th>
                <th>Ice risk</th>
                <th>Fuel</th>
              </tr>
            </thead>
            <tbody>
              {fleetVessels.map((v) => (
                <tr
                  key={v.key}
                  className={`vessel-row${selectedKey === v.key ? ' selected' : ''}`}
                  onClick={() => setSelectedKey(v.key)}
                >
                  <td style={{ paddingLeft: 18 }}><span className="vessel-name">⛴ {v.name}</span></td>
                  <td><Chip tone={v.statusChip.replace('chip-', '')}>{v.status}</Chip></td>
                  <td className="num">{v.mission}</td>
                  <td><Chip tone={v.iceRiskChip.replace('chip-', '')}>{v.iceRisk}</Chip></td>
                  <td className="num">{v.fuel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="instrument" style={{ marginBottom: 14 }}>
            <div className="bracket tl" /><div className="bracket tr" />
            <div className="bracket bl" /><div className="bracket br" />
            <div className="instrument-label"><span>Fleet distribution</span></div>
            <svg viewBox="0 0 240 90" width="100%" height="90">
              <rect x="0" y="10" width="240" height="16" rx="2" fill="#1B4A5F" />
              <rect x="0" y="10" width="160" height="16" rx="2" fill="#39C2D9" />
              <rect x="160" y="10" width="53" height="16" fill="#2E9C82" />
              <rect x="213" y="10" width="27" height="16" rx="2" fill="#D2534B" />
              <text x="0" y="50" fill="#AFC2CA" fontSize="10" fontFamily="JetBrains Mono">Active 6</text>
              <text x="70" y="50" fill="#AFC2CA" fontSize="10" fontFamily="JetBrains Mono">In port 3</text>
              <text x="150" y="50" fill="#AFC2CA" fontSize="10" fontFamily="JetBrains Mono">Ice risk 2</text>
              <text x="0" y="68" fill="#AFC2CA" fontSize="10" fontFamily="JetBrains Mono">Maintenance 1</text>
            </svg>
          </div>
          <div className="card">
            <h3>Vessel details — <span>{detail.name}</span></h3>
            <div className="quick-insight"><div className="qi-label">Type</div><div className="stat-value" style={{ fontSize: 14 }}>{detail.type}</div></div>
            <div className="quick-insight"><div className="qi-label">Capacity</div><div className="stat-value" style={{ fontSize: 14 }}>{detail.cap}</div></div>
            <div className="quick-insight"><div className="qi-label">Current speed</div><div className="stat-value" style={{ fontSize: 14 }}>{detail.speed}</div></div>
            <div className="quick-insight"><div className="qi-label">Hull rating</div><div className="stat-value" style={{ fontSize: 14 }}>{detail.hull}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
