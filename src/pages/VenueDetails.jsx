import React from "react";
import { useParams } from "react-router";

function VenueDetails() {
  const { venueId } = useParams();

  return (
    <section>
      <h1>Venue Details</h1>
      <p>Venue ID: {venueId}</p>
    </section>
  );
}

export default VenueDetails;
