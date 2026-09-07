import { useEffect, useState } from 'react';
import InstrumentPanel from '../components/InstrumentPanel.jsx';
import AntarcticMap from '../components/map/AntarcticMap.jsx';
import { getRouteAnalysisData } from '../services/api.js';

export default function RouteAnalysis() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    getRouteAnalysisData().then((d) => { if (alive) setData(d); });
    return () => { alive = false; };
  }, []);

  if (!data) return null;
  const { routeComparisonRows, whyThisRoute } = data;

  return (
    <section className="page active" id="page-analysis">
      <div className="page-head">
        <div><h1>Route analysis</h1><p>Comparing the recommended route against fastest and most fuel-efficient alternatives</p></div>
      </div>
      <div className="layout-2col">
        <div className="card" style={{ padding: '20px 22px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th className="col-recommended">Recommended</th>
                <th>Alt. fastest</th>
                <th>Alt. fuel-efficient</th>
              </tr>
            </thead>
            <tbody>
              {routeComparisonRows.map((row) => (
                <tr key={row.metric}>
                  <td>{row.metric}</td>
                  <td className={row.num ? 'num col-recommended' : 'col-recommended'}>{row.recommended}</td>
                  <td className={row.num ? 'num' : ''}>{row.fastest}</td>
                  <td className={row.num ? 'num' : ''}>{row.fuelEfficient}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="why-block">
            <h3>Why ICEFLUX selected this route</h3>
            <p>{whyThisRoute}</p>
          </div>
        </div>
        <InstrumentPanel
          title="Route map"
          footer={
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 10, padding: '0 4px', fontSize: 11, color: 'var(--slate-300)' }}>
              <span><svg width="14" height="4"><line x1="0" y1="2" x2="14" y2="2" stroke="#39C2D9" strokeWidth="2" /></svg> Recommended</span>
              <span><svg width="14" height="4"><line x1="0" y1="2" x2="14" y2="2" stroke="#E2A23B" strokeWidth="2" strokeDasharray="2 2" /></svg> Fastest</span>
              <span><svg width="14" height="4"><line x1="0" y1="2" x2="14" y2="2" stroke="#2E9C82" strokeWidth="2" strokeDasharray="1 3" /></svg> Fuel-efficient</span>
            </div>
          }
        >
          <AntarcticMap variant="analysis" />
        </InstrumentPanel>
      </div>
    </section>
  );
}
