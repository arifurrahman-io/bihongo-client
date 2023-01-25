import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import "../../Shared/style.css";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailIcon,
  EmailShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const PostDetails = () => {
  const post = useLoaderData();

  const {
    _id,
    postTitle,
    category,
    tag,
    description1,
    description2,
    description3,
    description4,
    description5,
    point1,
    point2,
    point3,
    point4,
    image,
    uploadDate,
    uploadTime,
    name,
  } = post;

  return (
    <div className="max-w-[1440px] mx-5 lg:mx-auto my-10">
      <div className="lg:flex">
        <img src={image} alt="img" className="w-[520px] rounded-xl"></img>
        <div className="ml-5 my-5 lg:my-auto text-lg gl:text-2xl font-semibold">
          <p className="style my-5">
            <FaChevronRight className="text-emerald-600" />
            {point1}
          </p>
          <p className="style my-5">
            <FaChevronRight className="text-emerald-600" />
            {point2}
          </p>
          <p className="style my-5">
            <FaChevronRight className="text-emerald-600" />
            {point3}
          </p>
          <p className="style my-5">
            <FaChevronRight className="text-emerald-600" />
            {point4}
          </p>
        </div>
      </div>
      <div className="my-3">
        <h2 className="text-2xl md:text-4xl text-fuchsia-700 font-bold text-justify">
          {postTitle}
        </h2>
        <p>Written by: {name}</p>
        <p>
          Posted on {uploadDate} <span>at {uploadTime}</span>
        </p>
      </div>
      <div className="text-justify">
        <p className="mb-5 text-lg">{description1}</p>
        <p className="mb-5 text-lg">{description2}</p>
        <p className="mb-5 text-lg">{description3}</p>
        <p className="mb-5 text-lg">{description4}</p>
        <p className="mb-5 text-lg">{description5}</p>
      </div>
      <div className="md:flex justify-between">
        <div className="flex justify-center lg:justify-start my-auto">
          <p className="mr-5 btn btn-xs">Category: {category}</p>
          <p className="mr-5 btn btn-xs">Tag: {tag}</p>
        </div>
        <div>
                
          <FacebookShareButton
            url={`http://localhost:5000/post/${_id}`}
            quote={postTitle}
            hashtag="#bihongo.net"
          >
                    
            <FacebookIcon size={32} round />
                  
          </FacebookShareButton>
          <WhatsappShareButton
            url={`http://localhost:5000/post/${_id}`}
            quote={postTitle}
            hashtag="#bihongo.net"
          >
                    
            <WhatsappIcon size={32} round />
                  
          </WhatsappShareButton>
          <TelegramShareButton
            url={`http://localhost:5000/post/${_id}`}
            quote={postTitle}
            hashtag="#bihongo.net"
          >
                    
            <TelegramIcon size={32} round />
                  
          </TelegramShareButton>
          <EmailShareButton
            url={`http://localhost:5000/post/${_id}`}
            quote={postTitle}
            hashtag="#bihongo.net"
          >
                    
            <EmailIcon size={32} round />
                  
          </EmailShareButton>
          <LinkedinShareButton
            url={`http://localhost:5000/post/${_id}`}
            quote={postTitle}
            hashtag="#bihongo.net"
          >
                    
            <LinkedinIcon size={32} round />
                  
          </LinkedinShareButton>
              
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
