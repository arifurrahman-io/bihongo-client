import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Dashboard = () => {
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      <div className="h-36 border p-10 text-center text-white font-bold rounded-lg bg-gradient-to-r from-violet-300 to-violet-400 grid grid-cols-4 divide-x-2 my-auto gap-2">
        <p className="text-2xl col-span-3">Post Published</p>
        <p className="text-5xl">
          {posts.filter((post) => post.status === "published").length}
        </p>
      </div>
      <div className="h-36 border p-10 text-center text-white font-bold rounded-lg bg-gradient-to-r from-violet-300 to-violet-400 grid grid-cols-4 my-auto divide-x-2 gap-2">
        <p className="text-2xl col-span-3">Post Pending for Approve</p>
        <p className="text-5xl">
          {posts.filter((post) => post.status === "unlisted").length}
        </p>
      </div>
      <div className="h-36 border p-10 text-center text-white font-bold rounded-lg bg-gradient-to-r from-violet-300 to-violet-400 grid grid-cols-4 divide-x-2 my-auto gap-2">
        <p className="text-2xl col-span-3">Featured Post</p>
        <p className="text-5xl">
          {posts.filter((post) => post.postType === "featured").length}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
