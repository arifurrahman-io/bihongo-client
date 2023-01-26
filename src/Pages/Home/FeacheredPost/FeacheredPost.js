import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import PostCard from "../../Posts/PostCard";
import LatestsPosts from "../LatestPosts/LatestsPosts";

const FeacheredPost = () => {
  const { user } = useContext(AuthContext);

  const url = `https://server.bihongo.net/allposts`;

  const { data: posts = [] } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[1440px] mx-auto mt-20 px-5">
      <div className="col-span-3">
        <p className="text-3xl font-bold">Feachered Posts</p>
        <div className="max-w-[1440px] mx-auto py-3 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts?.length &&
            posts
              .filter((post) => post.postType === "featured")
              .map((post) => <PostCard key={post?._id} post={post}></PostCard>)}
        </div>
      </div>
      <div className="">
        <p className="text-3xl font-bold mb-10">Latest Posts</p>
        <LatestsPosts></LatestsPosts>
      </div>
    </div>
  );
};

export default FeacheredPost;
