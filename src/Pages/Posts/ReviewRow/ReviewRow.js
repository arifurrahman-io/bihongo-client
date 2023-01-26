import React from "react";

const ReviewRow = ({ r }) => {
  const { name, review, date } = r;

  return (
    <div className="card bg-blue-100 px-5 py-2 shadow">
      {/* <figure className="w-1/4">
        <img src={user?.photoURL} className="rounded-full w-16" alt="user" />
      </figure> */}
      <div className="">
        <div className="flex justify-between">
          <h2 className="text-sm">{name}</h2>
          <p className="text-xs">{date}</p>
        </div>
        <p className="text-gray-500">{review}</p>
      </div>
    </div>
  );
};

export default ReviewRow;
