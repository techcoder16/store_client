import React, { useLayoutEffect, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../../utils/useToggle";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { ValidationLogin } from "../../utils/validateLogin";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import image from "../../assets/sb.png";
import ToasterGen from "../../Container/ToasterGen";

import { loginUser } from "../../helpers/AuthStore/authSlice";

import "./Login.css";
import Footer from "../../Container/Footer";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      emailnew: "",
      password: "",
      navigate: navigate,
    },
    validate: ValidationLogin,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      try {
        dispatch(loginUser(values)).then((result) => {
          if (result.payload.message == "Successfully Login") {
            const userrole = JSON.parse(localStorage.getItem("user_data")).role;

            if (userrole == "admin") {
              navigate("/dashboard");
            } else if (userrole == "user") {
              navigate("/dashboard");
            } 
          }
        });
      } catch (err) {
        console.log(err);
      }

      return false;
    },
  });

  const [isPasswordHideShow, setPasswordHideShow] = useToggle(false);

  useLayoutEffect(() => {
    // return () => {
    //   if (location.state === null) {
    //     navigate("/", { replace: true });
    //   }
    //   if (localStorage.getItem("user_data")) {
    //     navigate("/dashboard", { replace: true, state: location.state });
    //   }
    //  };
  });

  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (user) {
      const userrole = JSON.parse(localStorage.getItem("user_data")).role;

      if (userrole == "admin") {
        navigate("/dashboard");
      } else if (userrole == "user") {
        navigate("/dashboard");
      } // Redirect to dashboard if user is already authenticated
    }
  }, []);

  useToggle(false);

  const ChangePasswordHideShow = () => {
    setPasswordHideShow();
  };

  return (
    <React.Fragment>
      <ToasterGen></ToasterGen>
<div className=" bg-background-main  h-scree ">
      <div className="bg-background-main  h-full text-white flex items-center    margin ">
        <div className="container mx-auto  justify-center items-center ">
          <div className="flex   min-h-screen  bg-transparent ">
            <div className="relative  m-6 space-y-8 bg-white   md:space-y-0 w-full">
              <div className="flex bg-background grid-flow-col grid-cols-2 gap-2">
                <div className=" bg-background w-full  p-8 md:p-14  top-12 h-max">
                  <div>
                    <span className=" font-bold    font-dmsans text-3xl   text-line ">
                      Welcome to Marketing Data
                    </span>
                  </div>

                  <form
                    className=" relative     top-20 py-1 "
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="py-1 h-28">
                      <span className="mb-2 text-md font-dmsans  font-normal text-base  leading-5 text-line">
                        Your email
                      </span>

                      <input
                        {...formik.getFieldProps("emailnew")}
                        id="emailnew"
                        type="email"
                        className=" gap-1 w-full  h-14 border bg-background  rounded-xl  text-white text-center placeholder:font-light"
                        placeholder=""
                      ></input>
                    </div>

                    <div className="py-1 h-44  ">
                      <div className="    rounded-xl relative">
                        <span className="mb-2 text-md font-dmsans font-noraml text-line">
                          Your Password
                        </span>

                        <i className="absolute font-normal top-1/2 right-2  -translate-y-1/2 text-line">
                          {isPasswordHideShow === true ? (
                            <div className="flex items-center ">
                              <VscEye
                                className=" w-6   "
                                onClick={ChangePasswordHideShow}
                              ></VscEye>
                              <span
                                className="ml-2 font-normal text-lg leading-7     font-dmsans"
                                style={{ font: "icon" }}
                              >
                                Hide
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center font-normal">
                              <VscEyeClosed
                                className="w-6"
                                onClick={ChangePasswordHideShow}
                              />
                              <span
                                className="ml-2 font-normal text-lg leading-7 font-dmsans  "
                                style={{ font: "icon" }}
                              >
                                Show
                              </span>
                            </div>
                          )}
                        </i>
                      </div>

                      <input
                        {...formik.getFieldProps("password")}
                        id="password"
                        value={formik.values.password}
                        type={
                          isPasswordHideShow === false ? "password" : "text"
                        }
                        className="gap-1 w-full  h-14 border bg-background  rounded-xl  text-white  text-center placeholder:font-light"
                      />
                    </div>


                



                    <button
                      type="submit"
                      className="    relative  w-1/2  my-6  rounded-full border   h-16 bg-[#006400]  text-white border-extra-color  text-md p-2  mb-6 hover:bg-[#006400] hover-text-white"
                    >
                      Login
                    </button>
                   
                  </form>
                </div>

                <div className=" bg-background hidden md:flex flex-col w-full">
                  <div className="flex-grow">
                    <img
                      src={image}
                      alt="Image"
                      className="w-full h-full object-cover min-h-screen"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
