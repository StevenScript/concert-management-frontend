import axios from "axios";
import {
  fetchEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  addArtistToEvent,
  fetchTicketsForEvent,
  fetchTicketCountForEvent,
} from "../events";

jest.mock("axios");

describe("Events API Service", () => {
  it("should fetch all events", async () => {
    const events = [{ id: 1, eventDate: "2025-05-10" }];
    axios.get.mockResolvedValue({ data: events });

    const data = await fetchEvents();
    expect(data).toEqual(events);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/events"));
  });

  it("should fetch an event by id", async () => {
    const event = { id: 1, eventDate: "2025-05-10" };
    axios.get.mockResolvedValue({ data: event });

    const data = await fetchEventById(1);
    expect(data).toEqual(event);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/events/1")
    );
  });

  it("should create a new event", async () => {
    const newEvent = { eventDate: "2025-06-20", ticketPrice: 99.99 };
    const createdEvent = { id: 2, ...newEvent };
    axios.post.mockResolvedValue({ data: createdEvent });

    const data = await createEvent(newEvent);
    expect(data).toEqual(createdEvent);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/events"),
      newEvent
    );
  });

  it("should update an event", async () => {
    const updatedData = { eventDate: "2025-06-15", ticketPrice: 60.0 };
    const updatedEvent = { id: 1, ...updatedData };
    axios.put.mockResolvedValue({ data: updatedEvent });

    const data = await updateEvent(1, updatedData);
    expect(data).toEqual(updatedEvent);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/events/1"),
      updatedData
    );
  });

  it("should add an artist to an event", async () => {
    const responseEvent = {
      id: 1,
      artists: [{ id: 2, stageName: "Artist 2" }],
    };
    axios.post.mockResolvedValue({ data: responseEvent });

    const data = await addArtistToEvent(1, 2);
    expect(data).toEqual(responseEvent);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/events/1/artists/2")
    );
  });

  it("should fetch tickets for an event", async () => {
    const tickets = [{ id: 5, buyerName: "John Doe" }];
    axios.get.mockResolvedValue({ data: tickets });

    const data = await fetchTicketsForEvent(1);
    expect(data).toEqual(tickets);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/events/1/tickets")
    );
  });

  it("should fetch ticket count for an event", async () => {
    const count = { count: 100 };
    axios.get.mockResolvedValue({ data: count });

    const data = await fetchTicketCountForEvent(1);
    expect(data).toEqual(count);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/events/1/ticket-count")
    );
  });
});
