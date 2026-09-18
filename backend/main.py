from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ICEFLUX API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "ICEFLUX backend is running"}


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "ICEFLUX API"
    }


# -------------------------
# Dashboard
# -------------------------

@app.get("/api/dashboard")
def dashboard():
    return {
        "currentMission": {
            "id": "IF-2026-014",
            "route": "Bharati → Larsemann Hills",
            "eta": "09 Sep, 06:40 UTC",
            "iceRisk": "Moderate",
            "routeStatus": "On track"
        },
        "dashboardInsights": {
            "icebergsNearRoute": "3 within 40 nm",
            "routeSafetyScore": 8.6,
            "fuelSaving": "−5.4 t",
            "activeAlert": "Iceberg intersect risk in 6h"
        }
    }
from pydantic import BaseModel


class RouteRequest(BaseModel):
    priority: str


@app.post("/api/routes/generate")
def generate_route(request: RouteRequest):
    routes = {
        "Safest": {
            "distance": "437 nm",
            "time": "33h",
            "ice": "Low",
            "risk": "Low",
            "fuel": "41.0 t",
            "score": 91,
            "chipIce": "chip-teal",
            "chipRisk": "chip-teal",
        },
        "Fastest": {
            "distance": "388 nm",
            "time": "24h",
            "ice": "High",
            "risk": "Medium",
            "fuel": "44.1 t",
            "score": 69,
            "chipIce": "chip-red",
            "chipRisk": "chip-amber",
        },
        "Most fuel efficient": {
            "distance": "446 nm",
            "time": "34h",
            "ice": "Low",
            "risk": "Low",
            "fuel": "31.2 t",
            "score": 81,
            "chipIce": "chip-teal",
            "chipRisk": "chip-teal",
        },
        "Balanced": {
            "distance": "412 nm",
            "time": "29h",
            "ice": "Moderate",
            "risk": "Low–Med",
            "fuel": "38.6 t",
            "score": 86,
            "chipIce": "chip-amber",
            "chipRisk": "chip-blue",
        },
    }

    return routes.get(request.priority, routes["Balanced"])