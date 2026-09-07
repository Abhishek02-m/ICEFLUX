// Thin data-access layer.
//
// Every page currently imports its data straight from `src/data/*.js`
// (the same hardcoded prototype values that lived inline in the original
// HTML/JS). Nothing here calls a real network endpoint yet.
//
// When the Python/FastAPI backend exists, swap the bodies of these
// functions for real `fetch('/api/...')` calls (the Vite dev server
// already proxies `/api` to `http://localhost:8000`, see vite.config.js)
// and the page components will not need to change, since they only ever
// call these functions and `await`/read the result.
//
// Example of what a real implementation will look like:
//
//   export async function getFleet() {
//     const res = await fetch('/api/fleet');
//     if (!res.ok) throw new Error('Failed to load fleet');
//     return res.json();
//   }

import { currentMission, dashboardInsights, iceOutlookSparkline } from '../data/missionData.js';
import { routeProfiles } from '../data/routeProfiles.js';
import { forecastStats, forecastVsActual } from '../data/forecastData.js';
import { trackedIceberg, movementTimeline, routeProximityPct } from '../data/icebergData.js';
import { routeComparisonRows, whyThisRoute } from '../data/routeAnalysisData.js';
import { fleetStats, fleetVessels, vesselDetails } from '../data/fleetData.js';

export async function getDashboardData() {
  const res = await fetch('/api/dashboard');

  if (!res.ok) {
    throw new Error('Failed to load dashboard data');
  }

  return res.json();
}
export async function generateRoute(priority) {
  const res = await fetch('/api/routes/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priority,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate route');
  }

  return res.json();
}

export async function getForecastData() {
  return { forecastStats, forecastVsActual };
}

export async function getIcebergWatchData() {
  return { trackedIceberg, movementTimeline, routeProximityPct };
}

export async function getRouteAnalysisData() {
  return { routeComparisonRows, whyThisRoute };
}

export async function getFleetData() {
  return { fleetStats, fleetVessels };
}

export async function getVesselDetails(key) {
  return vesselDetails[key];
}
