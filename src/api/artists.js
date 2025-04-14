import axios from "axios";

// Base URL is read from an environment variable with a default fallback.
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Fetch all artists.
export const fetchArtists = async () => {
  const response = await axios.get(`${BASE_URL}/artists`);
  return response.data;
};

// Fetch a single artist by ID.
export const fetchArtistById = async (id) => {
  const response = await axios.get(`${BASE_URL}/artists/${id}`);
  return response.data;
};

// Create a new artist.
export const createArtist = async (artistData) => {
  const response = await axios.post(`${BASE_URL}/artists`, artistData);
  return response.data;
};

// Update an existing artist.
export const updateArtist = async (id, artistData) => {
  const response = await axios.put(`${BASE_URL}/artists/${id}`, artistData);
  return response.data;
};

// Fetch events for a specific artist.
export const fetchEventsForArtist = async (artistId) => {
  const response = await axios.get(`${BASE_URL}/artists/${artistId}/events`);
  return response.data;
};
