import React, { useState, useMemo } from "react";
import Header from "../Container/Header";
import { ValidationUserCreate } from "../utils/validateAPI";
import useToggle from "../utils/useToggle";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import GetApiData from "../helpers/getApiData";
import { useEffect } from "react";
import { useFormik } from "formik";

const CreateUser = ({ props, UserState }) => {
  const [options, setOptions] = useState([]);
 const [userName,setuserName] = useState("");
 const [isPasswordHideShow, setPasswordHideShow] = useToggle(false);
  const formik = useFormik({
    initialValues: {
      name:"",
      username: "",
      password: "",
      email:"",
      role: userName==""?"":userName,

    },
    validate: ValidationUserCreate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);
     
      props(false);
      return false;
    },
  });

  useEffect(() => {
    async function fetchData() {
      const data =  await GetApiData("auth/get_roles", "");
      const results = [];

      let id = 1;
      data.map((value) => {
      return  results.push({
          key: id,
          value: value,

        });
  
      });

      
      setOptions([...results]);
    }

    fetchData();
  }, [UserState]);
  useToggle(false);

  const ChangePasswordHideShow = () => {
    setPasswordHideShow();
  };


  return (
    <React.Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex items-center  justify-center min-h-User  bg-transparent">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              <div className="flex flex-col justify-center p-8 md:p-14 ">
                <span className="mb-3 text-2xl font-bold font-Poppins text-subheading-400  text-maincolor">
                  Create Users
                </span>
                <div className="flex items-end  justify-end  p-0 ">
                  <button
                    className="p-1 border-0 text-maincolor  ml-auto bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
                   onClick={()=>{  console.log(props);props(false); }}
                  >
                    <span className="bg-transparent text-maincolor ">×</span>
                  </button>
                </div>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="py-4 ">
                    <span className="mb-2 text-md font-Poppins font-bold text-gray-500">
                       Name
                    </span>
                    <input
                      {...formik.getFieldProps("name")}
                      id="name"
                      type="text"
                      value={formik.values.name}
                      className=" w-full placeholder:font-Poppins  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=" Name"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4 ">
                    <span className="mb-2 text-md font-Poppins font-bold text-gray-500">
                      User Name
                    </span>
                    <input
                      {...formik.getFieldProps("username")}
                      id="username"
                      type="text"
                      value={formik.values.username}
                      className=" w-full placeholder:font-Poppins  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder="User Name"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4 ">
                    <span className="mb-2 text-md font-Poppins font-bold text-gray-500">
                     Email
                    </span>
                    <input
                      {...formik.getFieldProps("email")}
                      id="email"
                      type="email"
                      value={formik.values.email}

                      className=" w-full placeholder:font-Poppins  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder="abc@gmail.com"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="my-6  rounded-xl relative">
                  <span className="mb-2 text-md font-Poppins font-bold text-gray-500">
                      Password
                    </span>
                    <input
                      {...formik.getFieldProps("password")}
                      id="password"
                      type={isPasswordHideShow === false ? "password" : "text"}
                      className="w-full pr-10 placeholder:font-Poppins border-b appearance-none bg-white focus:outline-none focus:ring-0 text-center focus:border-maincolor focus:border-b-2 transition-colors placeholder:font-light"
                    />

                    <i className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 cursor-pointer">
                      {isPasswordHideShow === true ? (
                        <VscEye
                          className=" w-6   "
                          onClick={ChangePasswordHideShow}
                        ></VscEye>
                      ) : (
                        <VscEyeClosed
                          className=" w-6 "
                          onClick={ChangePasswordHideShow}
                        ></VscEyeClosed>
                      )}
                    </i>
                  </div>

             
                  <div className="py-4 ">
                    <button
                      type="submit"
                      className="w-full border h-12 bg-line text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white"
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>
  );
};

export default CreateUser;
