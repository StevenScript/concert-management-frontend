import React from "react";
import { useParams } from "react-router";

function EventDetails() {
  const { eventId } = useParams();

  return (
    <section>
      <h1>Event Details</h1>
      <p>Event ID: {eventId}</p>
    </section>
  );
}

export default EventDetails;
