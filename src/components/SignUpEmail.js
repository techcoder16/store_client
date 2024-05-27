import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../utils/useToggle";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { toast, Toaster, ToastBar } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { SignUpValidator } from "../utils/validateAPI";

import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import image from "../assets/sb2.png";
import { IoEllipse } from "react-icons/io5";
import { loginUser } from "../helpers/AuthStore/authSlice";
import ToasterGen from "../Container/ToasterGen";

const SignUpEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
    },

    validateOnBlur: false,
    validateOnChange: false,
    validate: SignUpValidator,

    onSubmit: async (values) => {
      values = await Object.assign(values);

      try {
        dispatch(loginUser(values)).then((result) => {
     
          if (result.payload.message == "Successfully Login") {
            navigate("/dashboard");
          }
        });
      } catch (err) {
        console.log(err);
      }




      return false;
    },
  });

  const [isPasswordHideShow, setPasswordHideShow] = useToggle(false);
  const rules_list = [
    "Use 8 or more characters",
    "One Uppercase character",
    "One lowercase character",
    "One special character",
    "One number",
  ];
  useLayoutEffect(() => {
    return () => {
      //   if (location.state === null) {
      //     navigate("/", { replace: true });
      //   }
      //   if (localStorage.getItem("user_data")) {
      //     navigate("/dashboard", { replace: true, state: location.state });
      //   }
    };
  });

  useToggle(false);

  const ChangePasswordHideShow = () => {
    setPasswordHideShow();
  };

  return (
    <React.Fragment>
      <ToasterGen></ToasterGen>

      <div className="bg-background-main  h-full text-white flex items-center ">
        <div className="container mx-auto  justify-center items-center ">
          <div className="flex   min-h-screen  bg-transparent ">
            <div className="relative  m-6 space-y-8 bg-white   md:space-y-0 w-full">
              <div className="flex bg-background grid-flow-col grid-cols-2 gap-2">
                <div className=" bg-background w-full  p-8 md:p-14  top-12">
                  <div>
                    <span className=" font-bold    font-novasans text-3xl   text-line ">
                      Welcome to Marketing Data
                    </span>
                  </div>

                  <form
                    className=" relative     top-6 py-1"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="py-1 ">
                      <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                        Email
                      </span>

                      <input
                        {...formik.getFieldProps("email")}
                        id="email"
                        type="email"
                        className=" gap-1 w-full  h-14 border bg-background  rounded-xl  text-maincolor text-center placeholder:font-light"
                        placeholder="Enter your Email Address"
                      ></input>
                    </div>

                    <div className="py-1 ">
                      <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                        Username
                      </span>

                      <input
                        {...formik.getFieldProps("username")}
                        id="username"
                        type="text"
                        className=" gap-1 w-full  h-14 border bg-background  rounded-xl  text-maincolor text-center placeholder:font-light"
                        placeholder="Enter your User Name"
                      ></input>
                    </div>

                    <div className="py-1 ">
                      <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                        Address
                      </span>

                      <input
                        {...formik.getFieldProps("address")}
                        id="address"
                        type="address"
                        className=" gap-1 w-full  h-14 border bg-background  rounded-xl  text-maincolor text-center placeholder:font-light"
                        placeholder="Enter your Address"
                      ></input>
                    </div>

                    <div className="py-1">
                      <span className="mb-2 text-md font-novasans font-normal text-base leading-5 text-line">
                        Phone Number
                      </span>
                      <input
                        {...formik.getFieldProps("phoneNumber")}
                        id="phoneNumber"
                        type="tel" // Use type="tel" for phone number input
                        pattern="[0-9]{7,}" // Add a pattern to enforce a valid phone number format
                        className="gap-1 w-full h-14 border bg-background rounded-xl text-maincolor text-center placeholder:font-light"
                        placeholder="Enter your phone number"
                      ></input>
                    </div>

                    <div className="py-1  ">
                      <div className="    rounded-xl relative">
                        <span className="mb-2 text-md font-novasans font-noraml text-line">
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
                                className="ml-2 font-normal text-lg leading-7     font-novasans"
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
                                className="ml-2 font-normal text-lg leading-7 font-novasans  "
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
                        type={
                          isPasswordHideShow === false ? "password" : "text"
                        }
                        className="gap-1 w-full  h-14 border bg-background  rounded-xl  text-maincolor text-center placeholder:font-light"
                      />
                      <div className=" py-1 flex flex-wrap">
                        {rules_list.map((element, index) => (
                          <>
                            <div
                              key={element}
                              className="flex items-center mb-2 mr-4 "
                            >
                              <IoEllipse></IoEllipse>
                              <p className="mx-1 ">{element}</p>
                            </div>
                            {(index + 1) % 3 === 0 && (
                              <div className="w-full "></div>
                            )}
                          </>
                        ))}
                      </div>


                      <div className="relative top-10">
                        <button
                          type="submit"

                          className="  relative  w-1/2  rounded-full border h-16 bg-extra-color text-maincolor border-extra-color text-md  mb-6 hover:bg-extra-color hover-text-white"
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className=" relative   top-6 text-left mr-20 mb-20 ">
                        <span className="text-line">
                          Already have an Account?
                          <Link
                            className="text-line underline mx-2"
                            to="/login"
                            replace={true}
                          >
                            Log in
                          </Link>
                        </span>
                      </div>
                    </div>
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
    </React.Fragment>
  );
};

export default SignUpEmail;
