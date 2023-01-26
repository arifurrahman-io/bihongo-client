import React from "react";
import img from "./../../../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-overlay">
        <img src={img} alt="" className="w-full min-h-[300px]"></img>
      </div>
      <div className="hero-content text-center text-neutral-content opacity-100">
        <div className="max-w-md bg-blue-500 bg-opacity-80 rounded-2xl p-2 md:p-10">
          <h1 className="mb-5 text-3xl font-bold">Bihongo.Net</h1>
          <p className="mb-5 text-white font-semibold text-lg">
            It is an educational website. We regularly publish educational
            content for students, teachers, and any skill seekers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
