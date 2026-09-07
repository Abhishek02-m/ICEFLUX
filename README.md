# ICEFLUX — React + Vite frontend

This is a React + Vite conversion of the original ICEFLUX HTML/JS prototype.
Same UI, same interactions, same hardcoded prototype data — restructured so a
Python/FastAPI backend can be dropped in later without touching the page
components.

## Requirements

- Node.js 18+ and npm

## Getting started

```bash
npm install
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check it
```

The build output goes to `dist/`.

## Project structure

```
src/
  index.css                 Global stylesheet, ported from the prototype
  App.jsx                   Login gate + tab navigation + page switcher
  main.jsx                  React root

  components/
    LoginScreen.jsx
    TopBar.jsx               Tabs + live UTC clock
    Chip.jsx, Meter.jsx      Small shared UI primitives
    InstrumentPanel.jsx      The bracket-cornered map/chart frame
    map/
      AntarcticMap.jsx       Picks a map "variant" per page
      BaseMap.jsx            Ocean gradient, coastline, grid, radar sweep
      GridLines.jsx          Coordinate ruler lines/labels
      IcebergMarker.jsx      Iceberg polygon marker
      ShipMarker.jsx         Vessel marker + pulsing halo (SMIL <animate>)

  pages/
    Dashboard.jsx
    MissionPlanner.jsx       Interactive: priority selection + "Generate route"
    IceForecast.jsx          Interactive: date/time slider
    IcebergWatch.jsx
    RouteAnalysis.jsx
    LiveMission.jsx
    Fleet.jsx                Interactive: vessel row selection
    Insights.jsx, Settings.jsx   Placeholders (same as prototype)

  data/                      Hardcoded prototype data, unchanged from the
                             original inline JS objects (routeProfiles,
                             vesselData, fleet rows, forecast stats, etc.)

  services/
    api.js                   Thin async wrapper around the data/ files.
                             Every function has a `// TODO(api)` comment
                             showing the FastAPI endpoint it should call
                             once the backend exists.

  hooks/
    useUtcClock.js           Ticking UTC clock, same as the original
                             tickClock()/setInterval pairing.
```

## Connecting the FastAPI backend later

1. Implement the endpoints noted in the `TODO(api)` comments inside
   `src/services/api.js` (e.g. `GET /api/fleet`, `POST /api/routes/generate`,
   `GET /api/forecast`, ...).
2. Replace each function body in `api.js` with a real `fetch()` call, e.g.:

   ```js
   export async function getFleetData() {
     const res = await fetch('/api/fleet');
     if (!res.ok) throw new Error('Failed to load fleet');
     return res.json();
   }
   ```

3. `vite.config.js` already proxies `/api/*` requests to
   `http://localhost:8000` during development, so relative fetch URLs work
   without CORS configuration. Update the `target` there if the backend runs
   elsewhere.
4. No changes should be needed in `pages/` or `components/` — they only ever
   call the functions exported from `services/api.js`.

## Notes on the map visuals

The Antarctic maps (sea-ice concentration, iceberg markers, vessel position,
routes, radar sweep) are reimplemented as React components rather than
innerHTML strings, but every coordinate, path, and color value was carried
over from the original prototype so the visuals are unchanged. The
`.risk-pulse` and `.radar-sweep` CSS animations (in `index.css`) still drive
the pulsing iceberg-risk rings and rotating radar wedge.
