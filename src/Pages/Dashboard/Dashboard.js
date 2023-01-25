import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/allposts`;

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
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
      <div className="border w-52 p-10 text-center text-white font-bold rounded-lg bg-gradient-to-r from-green-500 to-green-700">
        <p className="text-xl">Post Published</p>
        <p className="text-4xl">
          {posts.filter((post) => post.status === "published").length}
        </p>
      </div>
      <div className="border w-52 p-10 text-center text-white font-bold rounded-lg bg-gradient-to-r from-violet-300 to-violet-400">
        <p className="text-xl">Post Pending for Approve</p>
        <p className="text-4xl">
          {posts.filter((post) => post.status === "unlisted").length}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
