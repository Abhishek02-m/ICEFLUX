// Hardcoded prototype data, ported as-is from the Ice Forecast page.
// TODO(api): replace with GET /api/forecast?region=...&horizon=...

export const forecastStats = {
  meanConcentration: '58%',
  trend: '+4%',
  trendWindow: 'over 10 days',
  coverageChange: '+1,200 km²',
  modelConfidence: 88,
};

// Two polylines: modeled forecast vs. the historical actuals it is
// compared against, identical points to the original inline SVG.
export const forecastVsActual = {
  forecast: '0,50 24,44 48,46 72,32 96,36 120,22 144,26 168,14 192,18 216,10 240,12',
  actual: '0,52 24,48 48,42 72,38 96,30 120,28 144,20',
};
