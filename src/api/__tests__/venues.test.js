import axios from "axios";
import {
  fetchVenues,
  fetchVenueById,
  createVenue,
  updateVenue,
  fetchArtistsForVenue,
  fetchUpcomingEventsForVenue,
} from "../venues";

jest.mock("axios");

describe("Venues API Service", () => {
  it("should fetch all venues", async () => {
    const venues = [{ id: 1, name: "Venue 1" }];
    axios.get.mockResolvedValue({ data: venues });

    const data = await fetchVenues();
    expect(data).toEqual(venues);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/venues"));
  });

  it("should fetch a venue by id", async () => {
    const venue = { id: 1, name: "Venue 1" };
    axios.get.mockResolvedValue({ data: venue });

    const data = await fetchVenueById(1);
    expect(data).toEqual(venue);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/venues/1")
    );
  });

  it("should create a new venue", async () => {
    const newVenue = { name: "New Venue", location: "City", capacity: 500 };
    const createdVenue = { id: 2, ...newVenue };
    axios.post.mockResolvedValue({ data: createdVenue });

    const data = await createVenue(newVenue);
    expect(data).toEqual(createdVenue);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/venues"),
      newVenue
    );
  });

  it("should update an existing venue", async () => {
    const updatedData = {
      name: "Updated Venue",
      location: "New City",
      capacity: 600,
    };
    const updatedVenue = { id: 1, ...updatedData };
    axios.put.mockResolvedValue({ data: updatedVenue });

    const data = await updateVenue(1, updatedData);
    expect(data).toEqual(updatedVenue);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/venues/1"),
      updatedData
    );
  });

  it("should fetch artists for a venue", async () => {
    const artists = [{ id: 1, stageName: "Artist 1" }];
    axios.get.mockResolvedValue({ data: artists });

    const data = await fetchArtistsForVenue(1);
    expect(data).toEqual(artists);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/venues/1/artists")
    );
  });

  it("should fetch upcoming events for a venue", async () => {
    const events = [{ id: 10, eventDate: "2025-05-10" }];
    axios.get.mockResolvedValue({ data: events });

    const data = await fetchUpcomingEventsForVenue(1);
    expect(data).toEqual(events);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/venues/1/upcoming-events")
    );
  });
});
