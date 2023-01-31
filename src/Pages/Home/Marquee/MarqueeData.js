import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeData = () => {
  return (
    <Marquee
      pauseOnHover="true"
      pauseOnClick="true"
      speed={25}
      gradient="false"
      className="font-semibold"
    >
      Hello! Welcome to bihongo...
    </Marquee>
  );
};

export default MarqueeData;
