// Reimplementation of the original `ship(x,y,heading)` helper, including
// the animated pulsing halo (kept as native SMIL <animate>, same as the
// original inline SVG string).
export default function ShipMarker({ x, y, heading }) {
  return (
    <>
      <g transform={`translate(${x},${y}) rotate(${heading})`}>
        <polygon points="0,-9 6,7 0,4 -6,7" fill="#39C2D9" stroke="#0D2836" strokeWidth="1" />
      </g>
      <circle cx={x} cy={y} r="16" fill="none" stroke="#39C2D9" strokeWidth="1" opacity="0.5">
        <animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </>
  );
}
