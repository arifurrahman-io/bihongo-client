import React from "react";
import { toast } from "react-hot-toast";

const Modal = (post) => {
  const {
    postTitle,
    description1,
    description2,
    description3,
    description4,
    description5,
    point1,
    point2,
    point3,
    point4,
  } = post.editPost;

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const description1 = form.description1.value;
    const description2 = form.description2.value;
    const description3 = form.description3.value;
    const description4 = form.description4.value;
    const description5 = form.description5.value;
    const point1 = form.point1.value;
    const point2 = form.point2.value;
    const point3 = form.point3.value;
    const point4 = form.point4.value;

    const update = {
      description1: description1,
      description2: description2,
      description3: description3,
      description4: description4,
      description5: description5,
      point1: point1,
      point2: point2,
      point3: point3,
      point4: point4,
    };

    fetch(`https://server.bihongo.net/updatepost/${post.editPost._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Review Updated Successfully");
          event.target.reset();
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{postTitle}</h3>
          <form
            onSubmit={handleUpdate}
            className="grid gap-4 grid-cols-1 mt-10"
          >
            <textarea
              name="description1"
              type="textarea"
              defaultValue={description1}
              placeholder="Your Name"
              className="input w-full input-bordered h-36"
            />
            <textarea
              name="description2"
              type="textarea"
              defaultValue={description2}
              placeholder="Your Name"
              className="input w-full input-bordered h-36"
            />
            <textarea
              name="description3"
              type="textarea"
              defaultValue={description3}
              placeholder="Your Email"
              className="input w-full input-bordered h-36"
            />
            <textarea
              name="description4"
              type="textarea"
              defaultValue={description4}
              placeholder="Your Phone Number"
              className="input w-full input-bordered h-36"
            />
            <textarea
              name="description5"
              type="textarea"
              defaultValue={description5}
              placeholder="Your Location"
              className="input w-full input-bordered h-36"
            />
            <input
              name="point1"
              type="text"
              defaultValue={point1}
              className="input w-full input-bordered"
            />
            <input
              name="point2"
              type="text"
              defaultValue={point2}
              className="input w-full input-bordered"
            />
            <input
              name="point3"
              type="text"
              defaultValue={point3}
              className="input w-full input-bordered"
            />
            <input
              name="point4"
              type="text"
              defaultValue={point4}
              className="input w-full input-bordered"
            />
            <br />

            <input
              htmlFor="my-nodal"
              className="btn btn-accent  text-white w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
