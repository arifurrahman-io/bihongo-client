import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import ReviewRow from "./ReviewRow/ReviewRow";

const CommentSection = ({ post, id }) => {
  const { user } = useContext(AuthContext);
  const name = user?.displayName;
  const email = user?.email;

  const [review, setReview] = useState({});

  const url = `https://server.bihongo.net/reviews?id=${id}`;

  const { data: reviews = [], refetch } = useQuery({
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

  //add review
  const handleAddReview = (event) => {
    event.preventDefault();
    console.log(review);

    if (user?.email) {
      fetch("https://server.bihongo.net/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Review Added Successfully");
            refetch();
            event.target.reset();
          }
        });
    }
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleInputBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newReview = {
      id,
      review,
      image: post.image,
      title: post.postTitle,
      name,
      email,
      date,
    };
    newReview[field] = value;
    setReview(newReview);
  };

  return (
    <div>
      <div className="py-10 mx-auto">
        {user?.email ? (
          <>
            <div className="card w-full shadow bg-sky-50 my-10">
              <div className="flex justify-start align-middle">
                <h3 className="text-lg ml-2 font-semibold">
                  {user.displayName}
                </h3>
              </div>
              <form onSubmit={handleAddReview} className="p-2">
                <div className="form-control">
                  <textarea
                    onBlur={handleInputBlur}
                    name="review"
                    className="textarea textarea-info"
                    placeholder="write something about the service"
                    required
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg">
              Please
              <Link to={"/signin"}>
                <span className="btn btn-link">Login</span>
              </Link>
              to review
            </h2>
          </>
        )}
        <div>
          <h3>Total Reviews: {reviews.length}</h3>
          <div className="my-5 grid md:grid-cols-2 gap-5">
            {reviews?.length ? (
              reviews
                .reverse()
                .map((r) => <ReviewRow key={r.id} r={r}></ReviewRow>)
            ) : (
              <p>No Reviews Found!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
