import React, { useState, useMemo } from "react";

import GetApiData from "../helpers/getApiData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ValidationMenu } from "../utils/validateAPI";

import { useFormik } from "formik";

const MenuUpdateModal = ({ menuState, props, menudata }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      menu_name: menuState.menu_name,
      level: menuState.level,
      parent: menuState.parentName,
      id: menuState.id,
    },
    validate: ValidationMenu,
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
      const data = await GetApiData("menu/get_menu_list", menuState.id);

      const results = [];
      results.push({key:0,value:""})
      data.menu.map((value) => {
        results.push({
          key: value.id,
          value: value.menu_name,
        });
      });

      setOptions([...results]);
    }

    fetchData();
  }, [menuState]);

  const optionElements = useMemo(() => {
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
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
              <div className="flex flex-col justify-center p-8 md:p-14 ">
              

                <div className="flex items-end  justify-end  p-0 ">
                  <button
                    className="p-1 border-0 text-maincolor  ml-auto bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
                    onClick={() => props(false)}
                  >
                    <span className="bg-transparent text-maincolor ">×</span>
                  </button>
                </div>
                <span className="mb-3 text-2xl font-bold font-novasans text-subheading-400  text-maincolor">
                  Update Menu Item
                </span>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                  <div className="py-4 ">
                    <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                      Menu name
                    </span>
                    <input
                      {...formik.getFieldProps("menu_name")}
                      id="menu_name"
                      type="text"
                      value={formik.values.menu_name}
                      className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder="menu title"
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4 ">
                    <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                      Menu Level
                    </span>
                    <input
                      {...formik.getFieldProps("level")}
                      id="level"
                      type="text"
                      value={formik.values.level}
                      className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4 ">
                    <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                      Select Parent
                    </span>
                    <select
                      {...formik.getFieldProps("parent")}
                      value={formik.values.parent}
                      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-novasans tra-color block w-full p-2.5 dark:bg-maincolor dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-0   dark:focus:border-blue-500"
                    >
                      {optionElements & optionElements}
                    </select>
                  </div>

                  <input
                    hidden
                    {...formik.getFieldProps("id")}
                    id="id"
                    type="text"
                    value={menuState.id}
                    className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                  ></input>

                  <div className="py-4 ">
                    <button
                      type="submit"
                      className="w-full border h-12 bg-maincolor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white"
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

export default React.memo(MenuUpdateModal);
