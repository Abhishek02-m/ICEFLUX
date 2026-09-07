// Hardcoded prototype data, ported as-is from the Route Analysis page.
// TODO(api): replace with GET /api/routes/{missionId}/comparison

export const routeComparisonRows = [
  { metric: 'Distance', recommended: '412 nm', fastest: '388 nm', fuelEfficient: '446 nm', num: true },
  { metric: 'Est. time', recommended: '29h', fastest: '24h', fuelEfficient: '34h', num: true },
  { metric: 'Ice exposure', recommended: 'Moderate', fastest: 'High', fuelEfficient: 'Low', num: false },
  { metric: 'Iceberg risk', recommended: 'Low', fastest: 'Medium', fuelEfficient: 'Low', num: false },
  { metric: 'Est. fuel', recommended: '38.6 t', fastest: '44.1 t', fuelEfficient: '31.2 t', num: true },
  { metric: 'Safety score', recommended: '8.6 / 10', fastest: '6.9 / 10', fuelEfficient: '8.1 / 10', num: true },
];

export const whyThisRoute =
  "It carries the lowest combined probability of an iceberg intersection and avoids the forecast ice-concentration surge near 68°S. Against the alternatives, it balances fuel cost with transit time and posts the highest overall safety score of the three candidates.";
