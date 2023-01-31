import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../../Shared/Loading/Loading";

const MyComments = () => {
  const { user } = useContext(AuthContext);

  const url = `https://server.bihongo.net/myreviews?email=${user?.email}`;
  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", user?.email],
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

  const handleDelete = (id) => {
    const agree = window.confirm(`Are you sure to delete the post?`);
    if (agree) {
      fetch(`https://server.bihongo.net/deletereview/${id}`, {
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3>Hello {user?.displayName}</h3>
      <h3>Comments: {reviews?.length}</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Image</th>
              <th>Title</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length &&
              reviews.map((rev, i) => (
                <tr key={reviews._id}>
                  <th>{i + 1}</th>
                  <td>{rev.date}</td>
                  <td>
                    <img
                      src={rev.image}
                      alt=""
                      className="w-[70px] rounded-xl"
                    />
                  </td>
                  <td>
                    {rev.title?.length > 25
                      ? rev.title.slice(0, 25)
                      : rev.title}
                  </td>
                  <td>
                    {rev.review?.length > 25
                      ? rev.review.slice(0, 25)
                      : rev.review}
                  </td>
                  <div>
                    <td className="flex">
                      <FaTrashAlt
                        onClick={() => handleDelete(rev?._id)}
                        className="text-2xl text-secondary m-2"
                      />
                    </td>
                  </div>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyComments;
