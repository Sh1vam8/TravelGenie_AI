import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

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

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


# -----------------------------
# Request Model
# -----------------------------

class TripRequest(BaseModel):
    destination: str
    days: int
    budget: int
    travelers: int
    interests: str


# -----------------------------
# Basic Routes
# -----------------------------

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


# -----------------------------
# AI Travel Planner Agent
# -----------------------------

@app.post("/plan-trip")
def plan_trip(trip: TripRequest):

    prompt = f"""
You are TravelGenie, an AI Travel Planning Agent.

Create a practical travel itinerary based on the user's requirements.

Destination: {trip.destination}
Number of days: {trip.days}
Budget: ₹{trip.budget}
Number of travelers: {trip.travelers}
Interests: {trip.interests}

Your task:

1. Understand the user's requirements.
2. Create a day-by-day itinerary.
3. Suggest suitable activities.
4. Provide approximate daily expenses.
5. Calculate an approximate total cost.
6. Keep the total estimated cost within the user's budget.
7. Clearly mention that prices are estimates.

Return the answer in a clean and easy-to-read format.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return {
        "agent": "Travel Planner Agent",
        "destination": trip.destination,
        "response": response.text
    }