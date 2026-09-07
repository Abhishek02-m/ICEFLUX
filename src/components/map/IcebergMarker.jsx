// Reimplementation of the original `iceberg(x,y,r,label,dim)` helper.
export default function IcebergMarker({ x, y, r, label, dim }) {
  const opacity = dim ? 0.55 : 1;
  const points = [
    [x - r, y + r * 0.3],
    [x - r * 0.4, y - r],
    [x + r * 0.5, y - r * 0.7],
    [x + r, y + r * 0.2],
    [x + r * 0.2, y + r],
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(' ');

  return (
    <g opacity={opacity}>
      <polygon points={points} fill="#E7F2F7" stroke="#7C97A3" strokeWidth="1.2" />
      {label ? (
        <text x={x} y={y + r + 13} textAnchor="middle" fill="#7DD8E8" fontSize="10" fontFamily="JetBrains Mono">
          {label}
        </text>
      ) : null}
    </g>
  );
}
