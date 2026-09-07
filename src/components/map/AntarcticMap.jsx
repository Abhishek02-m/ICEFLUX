import BaseMap from './BaseMap.jsx';
import IcebergMarker from './IcebergMarker.jsx';
import ShipMarker from './ShipMarker.jsx';

// Reimplementation of the original per-page map drawing code
// (`renderAllMaps()` and `drawPlannerMap()`). Each variant renders the
// exact same shapes/coordinates as the original inline-SVG strings, just
// expressed as JSX instead of template-literal HTML.
export default function AntarcticMap({ variant }) {
  switch (variant) {
    case 'dashboard':
      return (
        <BaseMap radar gradientId="ocean-dashboard">
          <IcebergMarker x={300} y={120} r={14} />
          <IcebergMarker x={340} y={180} r={10} dim />
          <IcebergMarker x={270} y={230} r={9} dim />
          <path d="M180,300 L540,90" stroke="#39C2D9" strokeWidth="2" strokeDasharray="6 5" fill="none" />
          <circle cx={540} cy={90} r={5} fill="#39C2D9" />
          <ShipMarker x={190} y={296} heading={-58} />
          <circle cx={300} cy={120} r={30} fill="#D2534B" className="risk-pulse" opacity="0.25" />
        </BaseMap>
      );

    case 'planner':
      return (
        <BaseMap gradientId="ocean-planner">
          <IcebergMarker x={300} y={130} r={13} />
          <IcebergMarker x={350} y={190} r={10} dim />
          <path d="M190,300 L540,95" stroke="#39C2D9" strokeWidth="2.4" strokeDasharray="6 5" fill="none" />
          <ShipMarker x={200} y={296} heading={-55} />
          <circle cx={540} cy={95} r={5} fill="#39C2D9" />
          <text x={150} y={318} fill="#AFC2CA" fontSize="10" fontFamily="JetBrains Mono">Bharati Station</text>
          <text x={475} y={82} fill="#AFC2CA" fontSize="10" fontFamily="JetBrains Mono">Larsemann Hills</text>
        </BaseMap>
      );

    case 'forecast':
      return (
        <BaseMap gradientId="ocean-forecast">
          <ellipse cx={230} cy={150} rx={120} ry={80} fill="#39C2D9" opacity="0.16" />
          <ellipse cx={330} cy={220} rx={140} ry={90} fill="#1B8FA3" opacity="0.22" />
          <ellipse cx={420} cy={130} rx={90} ry={60} fill="#7DD8E8" opacity="0.14" />
          <ellipse cx={250} cy={260} rx={70} ry={50} fill="#0D2836" opacity="0.35" />
        </BaseMap>
      );

    case 'iceberg':
      return (
        <BaseMap gradientId="ocean-iceberg">
          <circle cx={330} cy={150} r={14} fill="#D2534B" className="risk-pulse" opacity="0.3" />
          <circle cx={330} cy={150} r={34} fill="none" stroke="#D2534B" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
          <IcebergMarker x={330} y={150} r={15} label="B-42F" />
          <defs>
            <marker id="iceberg-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#E2A23B" />
            </marker>
          </defs>
          <path
            d="M330,150 L365,105"
            stroke="#E2A23B" strokeWidth="1.6" strokeDasharray="4 4"
            markerEnd="url(#iceberg-arrow)"
          />
          <path d="M200,300 L470,80" stroke="#39C2D9" strokeWidth="2" strokeDasharray="6 5" fill="none" opacity="0.7" />
          <ShipMarker x={215} y={295} heading={-56} />
        </BaseMap>
      );

    case 'analysis':
      return (
        <BaseMap gradientId="ocean-analysis">
          <path d="M190,300 L540,95" stroke="#39C2D9" strokeWidth="2.4" strokeDasharray="6 5" fill="none" />
          <path d="M190,300 L500,60" stroke="#E2A23B" strokeWidth="1.8" strokeDasharray="2 3" fill="none" opacity="0.85" />
          <path d="M190,300 Q330,260 430,190 T560,120" stroke="#2E9C82" strokeWidth="1.8" strokeDasharray="1 4" fill="none" opacity="0.85" />
          <IcebergMarker x={320} y={150} r={11} />
          <IcebergMarker x={380} y={210} r={9} dim />
          <ShipMarker x={200} y={296} heading={-55} />
          <circle cx={540} cy={95} r={5} fill="#39C2D9" />
        </BaseMap>
      );

    case 'live':
      return (
        <BaseMap radar gradientId="ocean-live">
          <path d="M170,310 L540,90" stroke="#39C2D9" strokeWidth="2" strokeDasharray="6 5" fill="none" opacity="0.5" />
          <path d="M170,310 L400,180" stroke="#39C2D9" strokeWidth="2.6" fill="none" />
          <IcebergMarker x={430} y={150} r={12} label="B-42F" />
          <circle cx={430} cy={150} r={12} fill="#D2534B" className="risk-pulse" opacity="0.25" />
          <circle cx={540} cy={90} r={5} fill="#7DD8E8" />
          <ShipMarker x={400} y={180} heading={-40} />
        </BaseMap>
      );

    default:
      return null;
  }
}
