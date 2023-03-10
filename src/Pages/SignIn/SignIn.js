import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import img from "../../assets/signin.jpg";
import useToken from "../../hooks/useToken";
import Loading from "../../Shared/Loading/Loading";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    isLoading,
    formState: { errors },
  } = useForm();
  const { signIn, providerLogin } = useContext(AuthContext);

  const { loginError, setLoginError } = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");

  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail, createdUserEmail);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from);
  }

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        setLoginUserEmail(data.email);
        toast.success("Login Successful!");
      })
      .catch((e) => {
        console.error(e);
        if (e.code === "auth/user-not-found") {
          toast.error("Make sure you registered with this email address.");
        }
        if (e.code === "auth/wrong-password") {
          toast.error("Wrong Password!");
        }
        setLoginError(e);
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.displayName, user.email, user.phoneNumber);
      })
      .catch((error) => console.error(error));
  };

  const saveUser = (name, email, phone) => {
    const user = { name, email, phone };
    fetch(`https://server.bihongo.net/user/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Login Successful!");
        setLoginUserEmail(user.email);
        setCreatedUserEmail(user.email);
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-8 lg:py-16">
      <div className="hero-content flex-col lg:flex-row mx-auto">
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <img src={img} alt="" />
        </div>
        <div className="card w-full lg:w-1/2">
          <div onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email Address is Required.",
                  })}
                  className="input input-bordered w-full "
                />
                {errors.email && (
                  <p className="text-red-600" role="alert">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password id Required",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 charecters or longer.",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.password && (
                  <p className="text-red-600" role="alert">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <input
                className="btn btn-accent w-full mt-5"
                value="Signin"
                type="submit"
              />

              <div>{loginError && <p>{loginError} why not?</p>}</div>
            </form>
          </div>
          <div className="card rounded-box place-items-center">
            <button onClick={handleGoogleSignIn}>
              <img src="" alt="" className="w-1/2 mx-auto" />
            </button>
          </div>
          <p className="mt-5">
            New here? Please{" "}
            <Link to="/signup" className="btn btn-link">
              signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
