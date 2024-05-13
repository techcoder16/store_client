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
<div className=" bg-background-main  h-screen ">
<div className="col-span-3 lg:col-span-3 w-full bg-[#F9F9F9] ">
   <div>
                    <span className=" font-bold  text-center flex justify-center   font-Poppins text-3xl   text-black ">
                      Get Marketing Data Login 
                    </span>

                    <span className=" font-bold  text-center flex justify-center   font-Poppins text-md  text-gray-500 ">
                      Shape your work
                    </span>
                  </div>
                  
          <div className="min-h-screen flex items-center justify-center text-center">
            <div className="flex items-center lg:w-1/2   justify-center bg-transparent">
              <div className="relative bg-white shadow-2xl rounded-2xl">
                <div className="flex flex-col justify-center p-8 md:p-14">
                  <div className="flex justify-center self-center items-center">
                 

                  <form
                    className=" relative     py-1 "
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="py-1 h-28">
                          <span className="mb-2 text-md font-Overpass font-normal text-xs text-gray-600  font-Overpass leading-5 ">
                         Email
                      </span>

                      <input
                        {...formik.getFieldProps("emailnew")}
                        id="emailnew"
                        type="email"
                        className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-400 font-Overpass placeholder:font-Overpass text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Overpass text-xs focus:outline-none"
                        placeholder=""
                      ></input>
                    </div>

                    <div className="py-1 h-32  ">
                    <div className="relative rounded-xl">
    <span className="mb-2 text-md font-Overpass font-normal text-xs text-gray-600 font-Overpass leading-5">
        Password
    </span>
    <input
         {...formik.getFieldProps("password")}
         id="password"
         value={formik.values.password}
         type={
           isPasswordHideShow === false ? "password" : "text"
         }
         className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-400 font-Overpass placeholder:font-Overpass text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Overpass text-xs focus:outline-none"
           
         // Add your other input properties here
    />
    <i className="absolute top-2/3 left-4/5 transform -translate-y-1/2">
        {isPasswordHideShow === true ? (
            <div className="flex items-center">
                <VscEye
                    className="w-6"
                    onClick={ChangePasswordHideShow}
                ></VscEye>
                <span className="ml-2 font-normal text-sm leading-7 font-Poppins"></span>
            </div>
        ) : (
            <div className="flex items-center">
                <VscEyeClosed
                    className="w-6"
                    onClick={ChangePasswordHideShow}
                />
                <span className="ml-2 font-normal text-sm leading-7 font-Poppins"></span>
            </div>
        )}
    </i>
</div>


                    </div>


                



                    <button
                      type="submit"
                      className="font-Poppins text-base w-40  font-semibold h-12 bg-[#1BA955] text-white  p-2 rounded-lg "
                      >
                      Login
                    </button>
                   
                  </form>
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
