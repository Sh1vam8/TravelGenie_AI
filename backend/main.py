
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from services.gemini_service import generate_itinerary

load_dotenv()

app = FastAPI(title="TravelGenie AI")

frontend_urls = os.getenv("FRONTEND_URL", "")

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

allowed_origins.extend(
    url.strip().rstrip("/")
    for url in frontend_urls.split(",")
    if url.strip()
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(allowed_origins)),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Model
class TripRequest(BaseModel):
    destination: str
    days: int
    budget: int
    travelers: int
    interests: str


# Basic Routes
@app.get("/")
def home():
    return {
        "message": "TravelGenie AI Backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# AI Travel Planner Endpoint
@app.post("/plan-trip")
def plan_trip(trip: TripRequest):
    itinerary = generate_itinerary(
        destination=trip.destination,
        days=trip.days,
        budget=trip.budget,
        travelers=trip.travelers,
        interests=trip.interests,
    )

    return {
        "agent": "Travel Planner Agent",
        "destination": trip.destination,
        "response": itinerary,
    }
