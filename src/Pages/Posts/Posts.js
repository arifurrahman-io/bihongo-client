import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import PostCard from "./PostCard";

const Posts = () => {
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
    <div className="max-w-[1440px] mx-auto py-3 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-5">
      {posts?.length &&
        posts
          .filter((post) => post.status === "published")
          .map((post) => <PostCard key={post?._id} post={post}></PostCard>)}
    </div>
  );
};

export default Posts;
