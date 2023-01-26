import React from "react";
import { Link } from "react-router-dom";

const LatestPostCard = ({ post }) => {
  const { _id, postTitle, description1, image, uploadDate } = post;

  return (
    <Link to={`/post/${_id}`}>
      <div className="grid grid-cols-6 gap-3 border rounded-md my-2 p-2">
        <figure className="col-span-2 my-auto">
          <img src={image} alt="Movie" />
          <p className="text-center font-semibold">{uploadDate}</p>
        </figure>
        <div className="col-span-4">
          <h2 className="">{postTitle}</h2>
          <p>
            {description1?.length > 50
              ? description1.slice(0, 50)
              : description1}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LatestPostCard;
