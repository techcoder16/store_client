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
      <div className=" bg-[#F7FAFC]  h-screen ">
        <div className="row-span-3 lg:col-span-3 w-full bg-[#F9F9F9]  my-auto">
        <nav className="w-full px-2 flex items-center justify-between  ">
  <img className=" p-2  " src={logo} alt="Logo" />
  <div className="flex space-x-4">
    <div>

        <button  onClick={()=>{navigate('/login')}}
        className="font-novasans text-base w-40  text-[#9E9E9E]   font-semibold h-10   border-1 border-solid border-black border-1-solid     p-2 rounded-sm mx-auto justify-center flex "


        >
Login
        </button>
    </div>
  
  </div>
</nav>



          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-[#FFFFFF]  shadow-md shadow-[#32407C52] rounded-2xl w-1/2 m-auto my-auto">
              <div className="flex flex-col justify-center p-8 md:p-14">
                <div>
                  <img
                    className="flex   justify-center mx-auto"
                    src={logo}
                  ></img>
                </div>
                <form
                  className=" relative     py-1 "
                  onSubmit={formik.handleSubmit}
                >
                  <div className="py-1 h-28">
                    <span className="mb-2 text-md  font-normal  text-base text-gray-600  font-novasans leading-5 ">
                      Email or Username
                    </span>

                    <input
                      {...formik.getFieldProps("emailnew")}
                      id="emailnew"
                      type="email"
                      className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-md shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                      placeholder=""
                    ></input>
                  </div>

                  <div className="py-1 h-32  ">
                    <div className="relative rounded-xl">
                      <span className="mb-2 text-md  font-normal text-base text-gray-600 font-novasans leading-5">
                        Password
                      </span>
                      <input
                        {...formik.getFieldProps("password")}
                        id="password"
                        value={formik.values.password}
                        type={
                          isPasswordHideShow === false ? "password" : "text"
                        }
                        className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-md shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"

                        // Add your other input properties here
                      />
                      <i className="absolute top-2/3 left-4/5 transform -translate-y-1/2">
                        {isPasswordHideShow === true ? (
                          <div className="flex items-center">
                            <VscEye
                              className="w-6"
                              onClick={ChangePasswordHideShow}
                            ></VscEye>
                            <span className="ml-2 font-normal text-sm leading-7 font-novasans"></span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <VscEyeClosed
                              className="w-6"
                              onClick={ChangePasswordHideShow}
                            />
                            <span className="ml-2 font-normal text-sm leading-7 font-novasans"></span>
                          </div>
                        )}
                      </i>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="font-novasans text-base w-40   font-semibold h-10 bg-[#9E9E9E] text-white  p-2 rounded-md mx-auto justify-center flex "
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
