import React, { useState, useMemo } from "react";

import { ValidationAuthUserCreate } from "../utils/validateAPI";
import useToggle from "../utils/useToggle";

import GetApiData from "../helpers/getApiData";
import { useEffect } from "react";
import { useFormik } from "formik";

const CreateAuthScreen = ({ props, UserState }) => {
  const [options, setOptions] = useState([]);
  const [optionsScreen, setOptionsScreen] = useState([]);
  

 const [userName,setuserName] = useState("");
 const [screenName,setScreenName] = useState("");
  const formik = useFormik({
    initialValues: {
      username:  userName==""?"":userName ,
      
      screen_name: screenName==""?"":screenName,

    },
    validate: ValidationAuthUserCreate,
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
      const  data =  await GetApiData("auth/get_user", '""');
      let results = [];

      console.log("asd",data);
      data && data.users.map((value) => {
        results.push({
          key: value._id,
          value: value.username,

        });
 
      });

      
      setOptions([...results]);

      const screendata =  await GetApiData("screen/get_screen", "");
       const screenResults = [];
      
       screendata.screen.map((value) => {
        screenResults.push({
          key: value._id,
          value: value.screen_name,

        });
 
      });

      setOptionsScreen([...screenResults]);


    }

    fetchData();
  }, [UserState]);
  useToggle(false);


  const optionElements = useMemo(() => {
    if(options[0])
    {
    setuserName(options[0].value);
    
    formik.values.username = options[0].value;
 

    }

    return options.map((option) => (
      <option key={option.key} value={option.value} >
        {option.value}
      </option>
    ));
  }, [options,userName]);



  const optionElementScreen = useMemo(() => {
    if(optionsScreen[0])
    {
    setScreenName(optionsScreen[0].value);
  
    formik.values.screen_name = optionsScreen[0].value;
 

    }

    return optionsScreen.map((option) => (
      <option key={option.key} value={option.value} >
        {option.value}
      </option>
    ));
  }, [optionsScreen,screenName]);

  return (
    <React.Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex items-center  justify-center min-h-User  bg-transparent">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              <div className="flex flex-col justify-center p-8 md:p-14 ">
                
                <div className="flex items-end  justify-end  p-0 ">
                  <button
                    className="p-1 border-0 text-maincolor  ml-auto bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
                   onClick={()=>{ props(false); }}
                  >
                    <span className="bg-transparent text-maincolor ">×</span>
                  </button>
                </div>

                <span className="mb-3 text-2xl font-bold font-Poppins text-subheading-400  text-maincolor">
                  Authorize Screens to Users
                </span>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                 
             

                  <div className="py-4">
                    <span className="mb-2 text-md font-Poppins font-bold text-gray-500">
                      Select User
                    </span>
                    <select
                      {...formik.getFieldProps("username")}
                      value={formik.values.username}
                      id="username"
     
     
                      className="bg-gray-50 border focus:outline-none focus:ring-0 border-gray-300 text-black text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-Poppins tra-color block w-full p-2.5 dark:bg-maincolor dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {optionElements}
                    </select>
                  </div>


                  
                <div className="py-4">
                    <span className="mb-2 text-md font-Poppins font-bold text-gray-500">
                      Select Screen
                    </span>
                    <select
                      {...formik.getFieldProps("screen_name")}
                      value={formik.values.screen_name}
                      id="screen_name"
     
     
                      className="bg-gray-50 border focus:outline-none focus:ring-0 border-gray-300 text-black text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-Poppins tra-color block w-full p-2.5 dark:bg-maincolor dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {optionElementScreen}
                    </select>
                  </div>





                  <div className="py-4 ">
                    <button
                      type="submit"
                      className="w-full border h-12 bg-maincolor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white"
                    >
                      Authorize Screen
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

export default CreateAuthScreen;
