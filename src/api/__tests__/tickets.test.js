import axios from "axios";
import {
  fetchTickets,
  fetchTicketById,
  createTicket,
  updateTicket,
} from "../tickets";

jest.mock("axios");

describe("Tickets API Service", () => {
  it("should fetch all tickets", async () => {
    const tickets = [{ id: 1, buyerName: "John Doe" }];
    axios.get.mockResolvedValue({ data: tickets });

    const data = await fetchTickets();
    expect(data).toEqual(tickets);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/tickets"));
  });

  it("should fetch a ticket by id", async () => {
    const ticket = { id: 1, buyerName: "John Doe" };
    axios.get.mockResolvedValue({ data: ticket });

    const data = await fetchTicketById(1);
    expect(data).toEqual(ticket);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/tickets/1")
    );
  });

  it("should create a new ticket", async () => {
    const newTicket = { buyerName: "Alice", ticketType: "VIP" };
    const createdTicket = { id: 2, ...newTicket };
    axios.post.mockResolvedValue({ data: createdTicket });

    const data = await createTicket(newTicket);
    expect(data).toEqual(createdTicket);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/tickets"),
      newTicket
    );
  });

  it("should update an existing ticket", async () => {
    const updatedData = { buyerName: "Alice Updated", ticketType: "GA" };
    const updatedTicket = { id: 1, ...updatedData };
    axios.put.mockResolvedValue({ data: updatedTicket });

    const data = await updateTicket(1, updatedData);
    expect(data).toEqual(updatedTicket);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/tickets/1"),
      updatedData
    );
  });
});
