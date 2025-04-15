import React from "react";
import { useParams } from "react-router";

function ArtistDetails() {
  const { artistId } = useParams();

  return (
    <section>
      <h1>Artist Details</h1>
      <p>Artist ID: {artistId}</p>
    </section>
  );
}

export default ArtistDetails;
