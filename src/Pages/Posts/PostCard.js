import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  console.log(post);
  const {
    _id,
    postTitle,
    category,
    tag,
    description1,
    image,
    uploadDate,
    uploadTime,
    name,
  } = post;
  return (
    <div className="card glass transition hover:duration-150 ease-in-out rounded-xl">
      <Link to={`/post/${_id}`}>
        <figure>
          <img src={image} alt="img" className="rounded-t-xl" />
        </figure>
        <div className="flex">
          <p className="btn btn-xs mt-[-30px] ml-5">{category}</p>
          <p className="btn btn-xs mt-[-30px] ml-5">{tag}</p>
        </div>
        <div className="card-body">
          <h2 className="card-title">{postTitle}</h2>
          <p>
            {description1.length > 100
              ? description1.slice(0, 100) + `...`
              : description1}
          </p>
          <hr></hr>
          <div className="flex justify-evenly text-center">
            <p>{name}</p>
            <p>{uploadDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
