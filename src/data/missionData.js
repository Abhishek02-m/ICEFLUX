// Hardcoded prototype data, ported as-is from the original HTML mission
// strip / quick-insights panel on the Dashboard page.
// TODO(api): replace with a GET to something like /api/missions/current
// on the FastAPI backend once it exists.

export const currentMission = {
  id: 'IF-2026-014',
  route: 'Bharati → Larsemann Hills',
  eta: '09 Sep, 06:40 UTC',
  iceRisk: 'Moderate',
  routeStatus: 'On track',
};

export const dashboardInsights = {
  icebergsNearRoute: '3 within 40 nm',
  routeSafetyScore: 8.6,
  fuelSaving: '−5.4 t',
  activeAlert: 'Iceberg intersect risk in 6h',
};

// Points for the little 7-day ice outlook sparkline (kept identical to the
// original inline polyline coordinates).
export const iceOutlookSparkline =
  '0,34 30,30 60,32 90,22 120,24 150,14 180,16 210,8 240,10';
