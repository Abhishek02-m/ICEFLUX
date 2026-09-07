import { useEffect, useState } from 'react';
import InstrumentPanel from '../components/InstrumentPanel.jsx';
import AntarcticMap from '../components/map/AntarcticMap.jsx';
import Meter from '../components/Meter.jsx';
import { getForecastData } from '../services/api.js';

export default function IceForecast() {
  const [data, setData] = useState(null);
  const [sliderValue, setSliderValue] = useState(5);

  useEffect(() => {
    let alive = true;
    getForecastData().then((d) => { if (alive) setData(d); });
    return () => { alive = false; };
  }, []);

  if (!data) return null;
  const { forecastStats, forecastVsActual } = data;

  return (
    <section className="page active" id="page-forecast">
      <div className="page-head">
        <div><h1>Ice forecast</h1><p>Sea-ice concentration projection for the selected region and horizon</p></div>
      </div>
      <div className="layout-2col">
        <div>
          <InstrumentPanel title="Sea-ice concentration" sub={`+${sliderValue} days`}>
            <AntarcticMap variant="forecast" />
          </InstrumentPanel>
          <div style={{ marginTop: 16 }}>
            <div className="toggle-row">
              <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--slate-700)' }}>Date / time</label>
            </div>
            <input
              type="range" min="0" max="10" value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>
              <span>05 Sep</span><span>15 Sep</span>
            </div>
          </div>
          <div className="toggle-row" style={{ marginTop: 16 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--slate-700)' }}>Forecast horizon</label>
            <select style={{ padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 3 }} defaultValue="10 days">
              <option>7 days</option>
              <option>10 days</option>
              <option>14 days</option>
            </select>
          </div>
          <div style={{ marginTop: 14 }}>
            <div className="legend-gradient" />
            <div className="legend-labels"><span>Low</span><span>Ice concentration</span><span>High</span></div>
          </div>
        </div>
        <div>
          <div className="card">
            <h3>Forecast statistics</h3>
            <div className="quick-insight"><div className="qi-label">Mean concentration</div><div className="stat-value">{forecastStats.meanConcentration}</div></div>
            <div className="quick-insight">
              <div className="qi-label">Trend</div>
              <div className="stat-value" style={{ color: '#93641A' }}>{forecastStats.trend}</div>
              <div className="stat-sub">{forecastStats.trendWindow}</div>
            </div>
            <div className="quick-insight"><div className="qi-label">Coverage change</div><div className="stat-value">{forecastStats.coverageChange}</div></div>
          </div>
          <div className="card">
            <h3>Prediction confidence</h3>
            <div className="qi-label">Model confidence</div>
            <Meter pct={forecastStats.modelConfidence} tone="good" />
          </div>
          <div className="card">
            <h3>Forecast vs. actual</h3>
            <svg viewBox="0 0 240 70" width="100%" height="70">
              <polyline points={forecastVsActual.forecast} fill="none" stroke="#1B8FA3" strokeWidth="2" />
              <polyline points={forecastVsActual.actual} fill="none" stroke="#87A0AC" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
            <p className="map-caption" style={{ marginTop: 2 }}>Historical comparison for selected date range</p>
          </div>
        </div>
      </div>
    </section>
  );
}
