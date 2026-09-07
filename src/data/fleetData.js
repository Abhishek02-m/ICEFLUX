// Hardcoded prototype data, ported as-is from the Fleet page.
// TODO(api): replace with GET /api/fleet and GET /api/vessels/{id}

export const fleetStats = [
  { num: 6, label: 'Vessels active' },
  { num: 3, label: 'In port' },
  { num: 2, label: 'On ice-risk route' },
  { num: 1, label: 'Maintenance due' },
];

export const fleetVessels = [
  {
    key: 'sagar',
    name: 'MV Sagar Kanya',
    status: 'En route',
    statusChip: 'chip-blue',
    mission: 'IF-2026-014',
    iceRisk: 'Moderate',
    iceRiskChip: 'chip-amber',
    fuel: '72%',
  },
  {
    key: 'polar',
    name: 'MV Polar Sentinel',
    status: 'In port',
    statusChip: 'chip-teal',
    mission: '—',
    iceRisk: 'N/A',
    iceRiskChip: 'chip-grey',
    fuel: '98%',
  },
  {
    key: 'antarctic',
    name: 'MV Antarctic Star',
    status: 'Ice risk',
    statusChip: 'chip-red',
    mission: 'IF-2026-012',
    iceRisk: 'High',
    iceRiskChip: 'chip-red',
    fuel: '41%',
  },
  {
    key: 'ross',
    name: 'MV Ross Voyager',
    status: 'Maintenance due',
    statusChip: 'chip-amber',
    mission: '—',
    iceRisk: 'N/A',
    iceRiskChip: 'chip-grey',
    fuel: '55%',
  },
];

export const vesselDetails = {
  sagar: { name: 'MV Sagar Kanya', type: 'Ice-class research vessel', cap: '42 crew', speed: '14.2 kn', hull: 'PC5' },
  polar: { name: 'MV Polar Sentinel', type: 'Polar supply icebreaker', cap: '28 crew', speed: '0 kn (in port)', hull: 'PC4' },
  antarctic: { name: 'MV Antarctic Star', type: 'Ice-class research vessel', cap: '36 crew', speed: '9.6 kn', hull: 'PC6' },
  ross: { name: 'MV Ross Voyager', type: 'Logistics and resupply vessel', cap: '22 crew', speed: '0 kn (maintenance)', hull: 'PC5' },
};
