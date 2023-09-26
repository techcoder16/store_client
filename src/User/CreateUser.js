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
      username: "",
      password: "",
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
        id = id + 1;
      });

      
      setOptions([...results]);
    }

    fetchData();
  }, [UserState]);
  useToggle(false);

  const ChangePasswordHideShow = () => {
    setPasswordHideShow();
  };

  const optionElements = useMemo(() => {
    if(options[0])
    {

      
    setuserName(options[0].value);
    formik.values.role = options[0].value;
   

    }

    return options.map((option) => (
 <option key={option.key} value={option.value} >
        {option.value}
      </option>
    ));
  }, [options,userName]);

  return (
    <React.Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex items-center  justify-center min-h-User  bg-transparent">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              <div className="flex flex-col justify-center p-8 md:p-14 ">
                <span className="mb-3 text-2xl font-bold font-dmsans text-subheading-400  text-maincolor">
                  Create Users
                </span>
                <div className="flex items-end  justify-end  p-0 ">
                  <button
                    className="p-1 border-0 text-maincolor  ml-auto bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
                   onClick={()=>{ props(false); }}
                  >
                    <span className="bg-transparent text-maincolor ">×</span>
                  </button>
                </div>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                  <div className="py-4 ">
                    <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                      User Name
                    </span>
                    <input
                      {...formik.getFieldProps("username")}
                      id="username"
                      type="text"
                      value={formik.values.username}
                      className=" w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder="user title"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="my-6  rounded-xl relative">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                      Password
                    </span>
                    <input
                      {...formik.getFieldProps("password")}
                      id="password"
                      type={isPasswordHideShow === false ? "password" : "text"}
                      className="w-full pr-10 placeholder:font-dmsans border-b appearance-none bg-white focus:outline-none focus:ring-0 text-center focus:border-maincolor focus:border-b-2 transition-colors placeholder:font-light"
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

                  <div className="py-4">
                    <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                      Select Role
                    </span>
                    <select
                      {...formik.getFieldProps("role")}
                      value={formik.values.role}
                      id="role"
     
     
                      className="bg-gray-50 border focus:outline-none focus:ring-0 border-gray-300 text-black text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-dmsans tra-color block w-full p-2.5 dark:bg-maincolor dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {optionElements}
                    </select>
                  </div>

                  <div className="py-4 ">
                    <button
                      type="submit"
                      className="w-full border h-12 bg-maincolor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white"
                    >
                      Create
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
