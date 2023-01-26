import React from "react";
import img from "../../assets/error.jpg";

const ErrorPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10 my-10">
      <img src={img} alt="" />
      <h2 className="my-auto text-4xl font-bold">
        May be you are in wrong route. <br /> Please check the link...
      </h2>
    </div>
  );
};

export default ErrorPage;
