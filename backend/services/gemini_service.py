import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

MODEL_NAME = "gemini-3.5-flash-lite"


def generate_itinerary(
    destination: str,
    days: int,
    budget: int,
    travelers: int,
    interests: str,
) -> str:
    """Generate an itinerary using the existing Gemini model."""

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured.")

    client = genai.Client(api_key=api_key)

    prompt = f"""
You are TravelGenie, an AI Travel Planning Agent.

Create a practical travel itinerary based on the user's requirements.

Destination: {destination}
Number of days: {days}
Budget: ₹{budget}
Number of travelers: {travelers}
Interests: {interests}

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
        model=MODEL_NAME,
        contents=prompt,
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty itinerary.")

    return response.text
