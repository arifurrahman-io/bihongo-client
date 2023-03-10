import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCheckCircle, FaTrashAlt, FaEdit, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import Modal from "../../Shared/Modal/Modal";

const AllPosts = () => {
  const { user } = useContext(AuthContext);
  const [editPost, setEditPost] = useState(null);

  const url = `https://server.bihongo.net/allposts`;

  const {
    data: posts = [],
    refetch,
    isLoading,
  } = useQuery({
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

  const handleAdvertise = (id) => {
    fetch(`https://server.bihongo.net/verifypost/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Advertised Successfully.");
          refetch();
        }
      });
  };

  const handleUnlist = (id) => {
    fetch(`https://server.bihongo.net/unlistpost/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Unlisted Successfully.");
          refetch();
        }
      });
  };

  const handleFetured = (id) => {
    fetch(`https://server.bihongo.net/featuredpost/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Featured Successfully.");
          refetch();
        }
      });
  };

  const handleNormal = (id) => {
    fetch(`https://server.bihongo.net/normalpost/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Featured Removed Successfully.");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
    const agree = window.confirm(`Are you sure to delete the post?`);
    if (agree) {
      fetch(`https://server.bihongo.net/deletepost/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success("post deleted successfully!");
            refetch();
          }
        });
    }
  };

  if (posts.length === 0) {
    return <p className="text-xl font-semibold text-center">No posts Found!</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.length &&
              posts.map((post, i) => (
                <tr key={post._id}>
                  <th>{i + 1}</th>
                  <td>{post.uploadDate}</td>
                  <td>
                    <img
                      src={post.image}
                      alt=""
                      className="w-[70px] rounded-xl"
                    />
                  </td>
                  <td>
                    {post.postTitle?.length > 25
                      ? post.postTitle.slice(0, 25)
                      : post.postTitle}
                  </td>
                  <td>
                    {post.status === "unlisted" && (
                      <>
                        <button
                          onClick={() => handleAdvertise(post?._id)}
                          className="btn btn-primary btn-xs"
                        >
                          Verify
                        </button>
                      </>
                    )}
                    {post.status === "published" && (
                      <>
                        <p className="text-[#a0a0e8] flex style">
                          <FaCheckCircle />
                          Published
                        </p>
                        <button
                          onClick={() => handleUnlist(post?._id)}
                          className="btn btn-primary btn-xs"
                        >
                          <FaCheckCircle />
                          Make Unavailable
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    {post.postType === "normal" && (
                      <>
                        <button
                          onClick={() => handleFetured(post?._id)}
                          className="btn btn-primary btn-xs"
                        >
                          Make Featured
                        </button>
                      </>
                    )}
                    {post.postType === "featured" && (
                      <>
                        <p className="text-[#a0a0e8] flex style">
                          <FaCheckCircle />
                          Featured
                        </p>
                        <button
                          onClick={() => handleNormal(post?._id)}
                          className="btn btn-primary btn-xs"
                        >
                          <FaCheckCircle />
                          Make Normal
                        </button>
                      </>
                    )}
                  </td>
                  <td className="flex">
                    <Link to={`/post/${post._id}`}>
                      <FaRegEye className="text-2xl text-accent m-2" />
                    </Link>

                    <label
                      htmlFor="my-modal"
                      onClick={() => setEditPost(post)}
                      className="text-2xl text-primary m-2"
                    >
                      <FaEdit />
                    </label>
                    <FaTrashAlt
                      onClick={() => handleDelete(post?._id)}
                      className="text-2xl text-secondary m-2"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {editPost && (
        <Modal editPost={editPost} setEditPost={setEditPost}></Modal>
      )}
    </div>
  );
};

export default AllPosts;
