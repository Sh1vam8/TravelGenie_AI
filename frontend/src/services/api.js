import axios from 'axios';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
).replace(/\/+$/, '');

export const planTripAPI = async (formData) => {
  const payload = {
    destination: formData.destination,
    days: Number(formData.days),
    budget: Number(formData.budget),
    travelers: Number(formData.travelers),
    interests: Array.isArray(formData.interests)
      ? formData.interests.join(', ')
      : String(formData.interests ?? ''),
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/plan-trip`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 120000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'TravelGenie API request failed:',
      error.response?.data || error.message
    );
    throw error;
  }
};
