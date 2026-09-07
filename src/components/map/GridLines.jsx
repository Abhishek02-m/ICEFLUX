// Reimplementation of the original `gridLines()` string-builder as JSX.
// Same coordinates, same step sizes, same coordinate-label formatting.
export default function GridLines() {
  const verticals = [];
  for (let x = 90; x < 600; x += 110) {
    verticals.push(
      <g key={`v-${x}`}>
        <line
          x1={x} y1={0} x2={x} y2={380}
          stroke="#1B4A5F" strokeWidth="1" strokeDasharray="2 5" opacity="0.55"
        />
        <text x={x + 4} y={14} fill="#3C6A80" fontSize="9" fontFamily="JetBrains Mono">
          {(64 + x / 55).toFixed(0)}°E
        </text>
      </g>
    );
  }

  const horizontals = [];
  for (let y = 70; y < 380; y += 95) {
    horizontals.push(
      <g key={`h-${y}`}>
        <line
          x1={0} y1={y} x2={600} y2={y}
          stroke="#1B4A5F" strokeWidth="1" strokeDasharray="2 5" opacity="0.55"
        />
        <text x={4} y={y - 4} fill="#3C6A80" fontSize="9" fontFamily="JetBrains Mono">
          {(60 + y / 45).toFixed(0)}°S
        </text>
      </g>
    );
  }

  return (
    <>
      {verticals}
      {horizontals}
    </>
  );
}
