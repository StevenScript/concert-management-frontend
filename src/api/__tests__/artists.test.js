import axios from "axios";
import {
  fetchArtists,
  fetchArtistById,
  createArtist,
  updateArtist,
  fetchEventsForArtist,
} from "../artists";

jest.mock("axios");

describe("Artists API Service", () => {
  it("should fetch all artists", async () => {
    const artists = [{ id: 1, stageName: "Artist 1" }];
    axios.get.mockResolvedValue({ data: artists });

    const data = await fetchArtists();
    expect(data).toEqual(artists);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/artists"));
  });

  it("should fetch an artist by id", async () => {
    const artist = { id: 1, stageName: "Artist 1" };
    axios.get.mockResolvedValue({ data: artist });

    const data = await fetchArtistById(1);
    expect(data).toEqual(artist);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/artists/1")
    );
  });

  it("should create a new artist", async () => {
    const newArtist = { stageName: "New Artist", genre: "Rock" };
    const createdArtist = { id: 2, ...newArtist };
    axios.post.mockResolvedValue({ data: createdArtist });

    const data = await createArtist(newArtist);
    expect(data).toEqual(createdArtist);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/artists"),
      newArtist
    );
  });

  it("should update an existing artist", async () => {
    const updatedData = { stageName: "Updated Artist", genre: "Pop" };
    const updatedArtist = { id: 1, ...updatedData };
    axios.put.mockResolvedValue({ data: updatedArtist });

    const data = await updateArtist(1, updatedData);
    expect(data).toEqual(updatedArtist);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/artists/1"),
      updatedData
    );
  });

  it("should fetch events for a specific artist", async () => {
    const events = [{ id: 10, eventDate: "2025-05-10" }];
    axios.get.mockResolvedValue({ data: events });

    const data = await fetchEventsForArtist(1);
    expect(data).toEqual(events);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/artists/1/events")
    );
  });
});
