// Hardcoded prototype route profiles, ported as-is from the original
// `routeProfiles` object in the HTML prototype's <script> tag.
// TODO(api): replace with a POST to /api/routes/generate on the FastAPI
// backend, sending { start, destination, vessel, forecastDate, horizon,
// priority } and receiving back the same shape as one of these profiles.

export const routeProfiles = {
  Safest: {
    distance: '437 nm',
    time: '33h',
    ice: 'Low',
    risk: 'Low',
    fuel: '41.0 t',
    score: 91,
    chipIce: 'chip-teal',
    chipRisk: 'chip-teal',
  },
  Fastest: {
    distance: '388 nm',
    time: '24h',
    ice: 'High',
    risk: 'Medium',
    fuel: '44.1 t',
    score: 69,
    chipIce: 'chip-red',
    chipRisk: 'chip-amber',
  },
  'Most fuel efficient': {
    distance: '446 nm',
    time: '34h',
    ice: 'Low',
    risk: 'Low',
    fuel: '31.2 t',
    score: 81,
    chipIce: 'chip-teal',
    chipRisk: 'chip-teal',
  },
  Balanced: {
    distance: '412 nm',
    time: '29h',
    ice: 'Moderate',
    risk: 'Low–Med',
    fuel: '38.6 t',
    score: 86,
    chipIce: 'chip-amber',
    chipRisk: 'chip-blue',
  },
};

export const priorityOptions = ['Safest', 'Fastest', 'Most fuel efficient', 'Balanced'];

export const vesselOptions = [
  'MV Sagar Kanya',
  'MV Polar Sentinel',
  'MV Antarctic Star',
  'MV Ross Voyager',
];
