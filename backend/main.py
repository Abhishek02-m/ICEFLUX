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
# =========================
# MODEL 2 — ICEBERG PREDICTION
# =========================

import os
import joblib
import numpy as np
from pydantic import BaseModel

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "models",
    "iceberg_trajectory_rf.joblib"
)

iceberg_model_data = joblib.load(MODEL_PATH)
iceberg_model = iceberg_model_data["model"]
iceberg_features = iceberg_model_data["features"]


class IcebergPredictionRequest(BaseModel):
    latitude: float
    longitude: float
    prev_lat: float
    prev_lon: float
    dlat: float
    dlon: float
    prev_dlat: float
    prev_dlon: float


@app.post("/api/icebergs/predict")
def predict_iceberg(request: IcebergPredictionRequest):

    X = np.array([[
        request.latitude,
        request.longitude,
        request.prev_lat,
        request.prev_lon,
        request.dlat,
        request.dlon,
        request.prev_dlat,
        request.prev_dlon
    ]])

    prediction = iceberg_model.predict(X)[0]

    return {
        "predicted_latitude": float(prediction[0]),
        "predicted_longitude": float(prediction[1])
    }