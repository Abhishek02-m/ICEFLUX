import { currentMission, dashboardInsights, iceOutlookSparkline } from '../data/missionData.js';
import { routeProfiles } from '../data/routeProfiles.js';
import { forecastStats, forecastVsActual } from '../data/forecastData.js';
import { trackedIceberg, movementTimeline, routeProximityPct } from '../data/icebergData.js';
import { routeComparisonRows, whyThisRoute } from '../data/routeAnalysisData.js';
import { fleetStats, fleetVessels, vesselDetails } from '../data/fleetData.js';

export async function getDashboardData() {
  return {
    currentMission,
    dashboardInsights,
    iceOutlookSparkline,
  };
}

export async function generateRoute(priority) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(routeProfiles[priority]);
    }, 700);
  });
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