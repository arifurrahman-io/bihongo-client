import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const AddPost = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const navigate = useNavigate();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const currentTime = new Date();

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleAddpost = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const post = {
            postTitle: data.title,
            category: data.category,
            tag: data.tag,
            description1: data.descriptionOne,
            description2: data.descriptionTwo,
            description3: data.descriptionThree,
            description4: data.descriptionFour,
            description5: data.descriptionFive,
            point1: data.point1,
            point2: data.point2,
            point3: data.point3,
            point4: data.point4,
            image: imgData.data.url,
            uploadDate: date,
            uploadTime: time,
            email: user?.email,
            name: user?.displayName,
            status: "unlisted",
            postType: "normal",
          };

          // save post info to db
          fetch(" http://localhost:5000/posts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `berear ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(post),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${post.name} added successfully`);
              navigate("/dashboard/allposts");
            });
        }
      });
  };
  //   if (isLoading) {
  //     return <Loading></Loading>;
  //   }

  return (
    <div className="w-full mx-auto">
      <h3 className="text-xl font-semibold text-center">Add A Post</h3>
      <form onSubmit={handleSubmit(handleAddpost)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Post Title</span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Post Title is Required." })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-600" role="alert">
              {errors.title?.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Post Category</span>
            </label>
            <input
              type="text"
              {...register("category", {
                required: "Post Category is Required.",
              })}
              className="input input-bordered w-full"
            />
            {errors.category && (
              <p className="text-red-600" role="alert">
                {errors.category?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Post Tag</span>
            </label>
            <input
              type="text"
              {...register("tag", {
                required: "Post Tag is Required.",
              })}
              className="input input-bordered w-full"
            />
            {errors.category && (
              <p className="text-red-600" role="alert">
                {errors.tag?.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Post Details</span>
          </label>
          <textarea
            type="text"
            {...register("descriptionOne", {
              required: "Post Detail is Required.",
            })}
            className="input input-bordered w-full p-5 h-36"
          />
          {errors.descriptionOne && (
            <p className="text-red-600" role="alert">
              {errors.descriptionOne?.message}
            </p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Post Details</span>
          </label>
          <textarea
            type="text"
            {...register("descriptionTwo")}
            className="input input-bordered w-full p-5 h-36"
          />
          {errors.descriptionTwo && (
            <p className="text-red-600" role="alert">
              {errors.descriptionTwo?.message}
            </p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Post Details</span>
          </label>
          <textarea
            type="text"
            {...register("descriptionThree")}
            className="input input-bordered w-full p-5 h-36"
          />
          {errors.descriptionThree && (
            <p className="text-red-600" role="alert">
              {errors.descriptionThree?.message}
            </p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Post Details</span>
          </label>
          <textarea
            type="text"
            {...register("descriptionFour")}
            className="input input-bordered w-full p-5 h-36"
          />
          {errors.descriptionFour && (
            <p className="text-red-600" role="alert">
              {errors.descriptionFour?.message}
            </p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Post Details</span>
          </label>
          <textarea
            type="text"
            {...register("descriptionFive")}
            className="input input-bordered w-full p-5 h-36"
          />
          {errors.descriptionFive && (
            <p className="text-red-600" role="alert">
              {errors.descriptionFive?.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Key Point</span>
            </label>
            <input
              type="text"
              {...register("point1")}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-red-600" role="alert">
                {errors.price?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Key Point</span>
            </label>
            <input
              type="text"
              {...register("point2")}
              className="input input-bordered w-full "
            />
            {errors.newPrice && (
              <p className="text-red-600" role="alert">
                {errors.newPrice?.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Key Point</span>
            </label>
            <input
              type="text"
              {...register("point3")}
              className="input input-bordered w-full "
            />
            {errors.location && (
              <p className="text-red-600" role="alert">
                {errors.location?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Key Point</span>
            </label>
            <input
              type="text"
              {...register("point4", {
                required: "Year of purchase is Required.",
              })}
              className="input input-bordered w-full "
            />
            {errors.time && (
              <p className="text-red-600" role="alert">
                {errors.time?.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Photo is Required." })}
          />
          {errors.image && (
            <p className="text-red-600" role="alert">
              {errors.image?.message}
            </p>
          )}
        </div>

        <input
          className="btn btn-primary w-full mt-5 text-white"
          value="Add post"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddPost;
