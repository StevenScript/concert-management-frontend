import React from "react";
import HeroSection from "../components/HeroSection";
import HeroBanner from "../components/HeroBanner";
import LandingSections from "../components/LandingSections";

function Home() {
  return (
    <>
      <HeroSection />

      {/* animated stats sections */}
      <LandingSections limit={8} />

      <HeroBanner />

      {/* the rest of your home content or cards */}
    </>
  );
}

export default Home;
