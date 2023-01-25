import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Header from "../Shared/Header/Header";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content px-10 py-10">
          <Outlet></Outlet>
        </div>
        <ul className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div className="menu bg-[#E6E6FA] p-4 w-80 text-base-content">
            <div className="px-4">
              {user?.photoURL && (
                <img src={user.photoURL} alt="" className="w-20 rounded-3xl" />
              )}
              <h4 className="text-lg font-bold">Wecome {user?.displayName}</h4>
            </div>

            {isAdmin ? (
              <>
                <li>
                  <Link to="/dashboard/allposts">All Posts</Link>
                </li>
                <li>
                  <Link to="/dashboard/addpost">Add Post</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard/mycomments">My Comments</Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
