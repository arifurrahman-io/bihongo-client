import React from "react";
import spin from "../../assets/loadingspinnerl.svg";

const Loading = () => {
  return (
    <div className="h-80 flex justify-center mt-52">
      <img
        src={spin}
        alt="spinner"
        className="animate-spin h-10 w-10 mr-3"
      ></img>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
