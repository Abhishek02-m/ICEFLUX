import GridLines from './GridLines.jsx';

// Same coastline path as the original `COAST` constant.
const COAST = 'M0,0 L128,0 C108,36 150,66 118,104 C88,142 138,172 106,208 C78,244 128,272 98,312 C78,342 55,362 0,380 Z';

// Reimplementation of the original `baseMap(inner, opts)` string builder.
// `radar` toggles the rotating radar-sweep wedge (CSS-animated, same as
// the prototype's `.radar-sweep` class).
export default function BaseMap({ radar = false, gradientId, children }) {
  return (
    <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12374A" />
          <stop offset="100%" stopColor="#081821" />
        </linearGradient>
      </defs>
      <rect width="600" height="380" fill={`url(#${gradientId})`} />
      <GridLines />
      <path d={COAST} fill="#0A1F29" stroke="#265E76" strokeWidth="1.5" />
      <path d={COAST} fill="none" stroke="#87A0AC" strokeWidth="0.6" opacity="0.5" />
      {children}
      {radar ? (
        <g className="radar-sweep" opacity="0.16">
          <path d="M300,190 L300,40 A150,150 0 0,1 430,265 Z" fill="#39C2D9" />
        </g>
      ) : null}
    </svg>
  );
}
