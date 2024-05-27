import React, { useState, useMemo } from "react";
import Header from "../Container/Header";
import { ValidationScreenCreate } from "../utils/validateAPI";

import GetApiData from "../helpers/getApiData";
import { useEffect } from "react";
import { useFormik } from "formik";

const CreateScreen = ({ props, screenState }) => {
  const [options, setOptions] = useState([]);
 const [menuName,setMenuName] = useState("");

  const formik = useFormik({
    initialValues: {
      screen_name: "",
      screen_url: "",
      menu_name: menuName==""?"":menuName,
    },
    validate: ValidationScreenCreate,
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
      const data = await GetApiData("menu/get_menu", "");
   
      const results = [];
      data.menu.map((value) => {
        results.push({
          key: value._id,
          value: value.menu_name,
        });
      });

      setOptions([...results]);
    }

    fetchData();
  }, [screenState]);

  const optionElements = useMemo(() => {
    if(options[0])
    {

    setMenuName(options[0].value);
    formik.values.menu_name = options[0].value;

    }

    return options.map((option) => (
      <option key={option.key} value={option.value} >
        {option.value}
      </option>
    ));
  }, [options,menuName]);

  return (
    <React.Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex items-center  justify-center min-h-screen  bg-transparent">
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
                <span className="mb-3 text-2xl font-bold font-novasans text-subheading-400  text-maincolor">
                  Create Screens
                </span>
                <form className="py-1" onSubmit={formik.handleSubmit}>
                  <div className="py-4 ">
                    <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                      Screen name
                    </span>
                    <input
                      {...formik.getFieldProps("screen_name")}
                      id="screen_name"
                      type="text"
                      value={formik.values.screen_name}
                      className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder="Screen Name"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4 ">
                    <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                      Screen Url
                    </span>
                    <input
                      {...formik.getFieldProps("screen_url")}
                      id="screen_url"
                      type="text"
                      value={formik.values.screen_url}
                      placeholder="Screen Url (/menu)"
                      className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4">
                    <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                      Select Parent Menu
                    </span>
                    <select
                      {...formik.getFieldProps("menu_name")}
                      value={formik.values.menu_name}
                      id="menu_name"
     
     
                      className="bg-gray-50 border focus:outline-none focus:ring-0 border-gray-300 text-black text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-novasans tra-color block w-full p-2.5 dark:bg-maincolor dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default CreateScreen;
