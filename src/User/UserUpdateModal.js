import React, { useState, useMemo } from "react";

import GetApiData from "../helpers/getApiData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ValidateUser } from "../utils/validateAPI";

import { useFormik } from "formik";

const UserUpdateModal = ({ userState, props, menudata }) => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      username: userState.username,
      role: userState.role,
      id: userState._id,
      balance:userState.balance,
    },
    validate: ValidateUser,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);
      props(false);
      dispatch(menudata);
      return false;
    },
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      
      let id = 1;
      const data = await GetApiData("auth/get_roles","");
      
      const results = [];
      data.map((value) => {
       return results.push({
          key: id,
          value: value,
        });
        id = id + 1;
      });

      setOptions([...results]);
    }

    fetchData();
  }, [userState]);

  const optionElements = useMemo(() => {
    if(options[0])
    {

    }

    return options.map((option) => (
      <option key={option.key} value={option.value}>
        {option.value}
      </option>
    ));
  }, [options]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex items-center  justify-center min-h-screen  bg-transparent">
            <div className="relative flex flex-col m-6 space-y-8 bg-background shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              <div className="flex flex-col justify-center p-8 md:p-14 ">
              <span className="mb-3 text-2xl font-bold font-dmsans text-subheading-400  text-maincolor">
                      Update User 
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
                      className=" w-full placeholder:font-dmsans bg-background text-maincolor  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder="menu title"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  
                  <div className="py-4 ">
                    <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                        User Balance
                    </span>
                    <input
                      {...formik.getFieldProps("balance")}
                      id="balance"
                      type="text"
                      value={formik.values.balance}
                      className=" w-full placeholder:font-dmsans text-maincolor bg-background  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder="menu title"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>



                  <div className="py-4 ">
                    <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                      Select Role
                    </span>
                    <select
                      {...formik.getFieldProps("role")}
                      value={formik.values.role}  
                      id="role"
                      className=" border bg-background text-maincolor text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-dmsans tra-color block w-full p-2.5 dark:bg-background-main dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-0   dark:focus:border-blue-500"
                    >
                      {optionElements}
                    </select>
                  </div>

                  <input hidden
                    {...formik.getFieldProps("id")}
                    id="id"
                    type="text"
                    value={userState._id}
                    
                    className=" w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                  ></input>

                  <div className="py-4 ">
                    <button
                      type="submit"
                      className="w-full border h-12  text-white bg-background text-md p-2 rounded-lg mb-6 hover:bg-background-main hover-text-white"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default React.memo(UserUpdateModal);
