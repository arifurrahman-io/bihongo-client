import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AddPost from "../Pages/Dashboard/AddPost";
import AllPosts from "../Pages/Dashboard/AllPosts";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyComments from "../Pages/Dashboard/MyComments";
import Home from "../Pages/Home/Home/Home";
import PostDetails from "../Pages/Posts/PostDetails";
import Posts from "../Pages/Posts/Posts";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/posts",
        element: <Posts></Posts>,
      },
      {
        path: "/post/:id",
        element: <PostDetails></PostDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/post/${params.id}`),
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/mycomments",
        element: <MyComments></MyComments>,
      },
      {
        path: "/dashboard/allposts",
        element: <AllPosts></AllPosts>,
      },
      {
        path: "/dashboard/addpost",
        element: <AddPost></AddPost>,
      },
    ],
  },
]);

export default router;
