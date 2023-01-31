import React from "react";
import FeacheredPost from "../FeacheredPost/FeacheredPost";
import Hero from "../Hero/Hero";
import MarqueeData from "../Marquee/MarqueeData";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <MarqueeData></MarqueeData>
      <FeacheredPost></FeacheredPost>
    </div>
  );
};

export default Home;
