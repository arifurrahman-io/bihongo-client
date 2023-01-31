import React from "react";
import { useLoaderData } from "react-router-dom";
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
} from "react-share";
import CommentSection from "./CommentSection";

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

  const points = [point1, point2, point3, point4];
  const paragraphs = [
    description1,
    description2,
    description3,
    description4,
    description5,
  ];

  return (
    <div className="">
      <div className="bg-fuchsia-100 lg:flex justify-center py-10">
        <img src={image} alt="img" className="md:w-1/3 rounded-xl"></img>
        <div className="ml-5 my-5 lg:my-auto text-lg gl:text-2xl font-semibold md:w-1/3">
          {points?.length &&
            points.map((point, i) => (
              <li className="my-5" key={i}>
                {point}
              </li>
            ))}
        </div>
      </div>
      <div className="max-w-[1440px] mx-5 lg:mx-auto">
        <div className="my-3">
          <h2 className="text-2xl md:text-4xl text-fuchsia-700 font-bold text-justify font-['Oswald']">
            {postTitle}
          </h2>
          <p className="italic font-semibold">Written by: {name}</p>
          <p className="italic font-semibold">
            Posted on <span>{uploadDate}</span> <span>at {uploadTime}</span>
          </p>
        </div>
        <div className="text-justify">
          {paragraphs?.length &&
            paragraphs.map((para, i) => (
              <p key={i} className="mb-5 text-lg">
                {para}
              </p>
            ))}
        </div>
        <div className="md:flex justify-between">
          <div className="flex justify-center lg:justify-start my-auto">
            <p className="mr-5 btn btn-xs">Category: {category}</p>
            <p className="mr-5 btn btn-xs">Tag: {tag}</p>
          </div>
          <div>
                  
            <FacebookShareButton
              url={`https://bihongo.net/post/${_id}`}
              quote={postTitle}
              hashtag="#bihongo.net"
            >
                      
              <FacebookIcon size={32} round />
                    
            </FacebookShareButton>
            <WhatsappShareButton
              url={`https://bihongo.net/post/${_id}`}
              quote={postTitle}
              hashtag="#bihongo.net"
            >
                      
              <WhatsappIcon size={32} round />
                    
            </WhatsappShareButton>
            <TelegramShareButton
              url={`https://bihongo.net/post/${_id}`}
              quote={postTitle}
              hashtag="#bihongo.net"
            >
                      
              <TelegramIcon size={32} round />
                    
            </TelegramShareButton>
            <EmailShareButton
              url={`https://bihongo.net/post/${_id}`}
              quote={postTitle}
              hashtag="#bihongo.net"
            >
                      
              <EmailIcon size={32} round />
                    
            </EmailShareButton>
                
          </div>
        </div>
        <CommentSection post={post} id={_id}></CommentSection>
      </div>
    </div>
  );
};

export default PostDetails;
