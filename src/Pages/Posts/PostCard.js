import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const {
    _id,
    postTitle,
    category,
    tag,
    description1,
    image,
    uploadDate,
    name,
  } = post;
  return (
    <div className="card glass transition hover:duration-150 ease-in-out rounded-xl mx-3">
      <Link to={`/post/${_id}`} className="">
        <figure>
          <img
            src={image}
            alt="img"
            className="rounded-t-xl w-full h-[300px]"
          />
        </figure>
        <div className="flex justify-center">
          <p className="mt-[-30px] ml-5 text-white">{category}</p>
          <p className="mt-[-30px] ml-5 text-white">{tag}</p>
        </div>
        <div className="card-body">
          <h2 className="card-title">{postTitle}</h2>
          <p>
            {description1.length > 100
              ? description1.slice(0, 100) + `... Read More`
              : description1}
          </p>

          <div className="absolute w-full bottom-0 left-0 right-0 px-5">
            <hr></hr>
            <div className="flex justify-evenly text-center">
              <p>{name}</p>
              <p>{uploadDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;

// absolute w-full bottom-0 left-0 right-0
