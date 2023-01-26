import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-10 bg-base-200 text-base-content">
      <div className="max-w-[1440px] mx-auto footer md:flex md:justify-evenly">
        <div>
          <span className="footer-title">Bihongo.Net</span>
          <Link className="link link-hover">Courses</Link>
          <Link className="link link-hover">About Us</Link>
          <Link className="link link-hover">Contact</Link>
        </div>
        <div>
          <span className="footer-title">Important Links</span>
          <Link className="link link-hover">Terms and Conditions</Link>
          <Link className="link link-hover">Privacy Policy</Link>
          <Link className="link link-hover">Cookie Policy</Link>
        </div>
        <div>
          <span className="footer-title">Newsletter</span>
          <div className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16"
              />
              <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
