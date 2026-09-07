// Hardcoded prototype data, ported as-is from the Iceberg Watch page.
// TODO(api): replace with GET /api/icebergs/B-42F (or a list endpoint).

export const trackedIceberg = {
  id: 'B-42F',
  size: '1.8 km²',
  position: '66.4°S, 76.2°E',
  drift: 'NE, 0.6 kn',
};

export const movementTimeline = [
  { label: 'Now', value: '14.8 nm', warn: false },
  { label: '+6h', value: '9.1 nm', warn: false },
  { label: '+12h', value: '2.4 nm', warn: true },
  { label: '+24h', value: '8.7 nm', warn: false },
];

export const routeProximityPct = 82;
