import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Fetch all venues.
export const fetchVenues = async () => {
  const response = await axios.get(`${BASE_URL}/venues`);
  return response.data;
};

// Fetch a single venue by ID.
export const fetchVenueById = async (id) => {
  const response = await axios.get(`${BASE_URL}/venues/${id}`);
  return response.data;
};

// Create a new venue.
export const createVenue = async (venueData) => {
  const response = await axios.post(`${BASE_URL}/venues`, venueData);
  return response.data;
};

// Update an existing venue.
export const updateVenue = async (id, venueData) => {
  const response = await axios.put(`${BASE_URL}/venues/${id}`, venueData);
  return response.data;
};

// Fetch artists associated with a venue.
export const fetchArtistsForVenue = async (venueId) => {
  const response = await axios.get(`${BASE_URL}/venues/${venueId}/artists`);
  return response.data;
};

// Fetch upcoming events for a venue.
export const fetchUpcomingEventsForVenue = async (venueId) => {
  const response = await axios.get(
    `${BASE_URL}/venues/${venueId}/upcoming-events`
  );
  return response.data;
};
