import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";

import { FaLock } from "react-icons/fa";

const ScreenRights = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <>
      {localStorage.getItem("user_data") ? (
        <>
          <Header></Header>
          <MenuHeader></MenuHeader>
        </>
      ) : (
        <div></div>
      )}

      <div className="bg-gray-100 font-novasans">
        <div className=" text-white py-4 px-8 flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-fit w-fit text-gray-300 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          ></img>
        </div>
        <div className="bg-gray-100 h-screen justify-star">
          <center className="mt-24 m-auto">
            <div className=" tracking-widest  ">
              <div className="flex grid-col  gap-2 align-middle justify-center">
                <FaLock className="text-xl mt-1" />

                <span className="text-gray-500 text-xl font-dmsans  font-normal  ">
                  You don't have permission to view this page. Please contact
                  your Administrator.
                </span>
              </div>
            </div>
          </center>
          <center className="mt-6">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-28 border h-12 bg-line text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-line hover-text-white"
            >
              Go Back
            </button>
          </center>
        </div>
      </div>
    </>
  );
};

export default ScreenRights;
