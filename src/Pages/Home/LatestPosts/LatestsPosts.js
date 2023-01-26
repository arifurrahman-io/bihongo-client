import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import LatestPostCard from "./LatestPostCard";

const LatestsPosts = () => {
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
    <div className="w-full">
      {posts?.length &&
        posts
          .filter((post) => post.status === "published")
          .map((post) => (
            <LatestPostCard key={post?._id} post={post}></LatestPostCard>
          ))}
    </div>
  );
};

export default LatestsPosts;
