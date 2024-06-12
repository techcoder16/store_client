import React from "react";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";
import { screenData } from "../helpers/ScreenStore/screenSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import GetApiData from "../helpers/getApiData";
import PostApiData from "../helpers/postApiData";
import { IoIosCreate } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import ScreenUpdateModal from "./ScreenUpdateModal";
import CreateScreen from './CreateScreen';
import { AiOutlineSearch } from "react-icons/ai";
import ToasterGen from "../Container/ToasterGen";

import { CircularLoader } from "../utils/CircularLoader";

import SideMenu from "../Container/SideMenu";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

const ScreenList = () => {
  const dispatch = useDispatch();
  let screen = useSelector((state) => state.screen);
  const [parentData, setParentData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [screenState, setScreenState] = useState({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sideMenuShow, setSideMenuShow] = useState(false);
  
  const [circularProgress, setCircularProgress] = useState(false);

  const [filter, setFilter] = useState(true);
  
  const itemsPerPage = 10;
  const filteredScreen = screen.screens.screen ?  screen.screens.screen.filter(item => item.screen_name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredScreen.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredScreen.length / itemsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};




  useLayoutEffect(() => {
    return () => {
    
    };
  }, [screen.screens.screen]);

  useEffect(() => {
    dispatch(screenData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(screenData());
  }, [showModal,showModalCreate]);


  const handleUpdateClick = async (item) => {
 
    item = { ...item, parentName: parentData[item.menu_name]?.menu_name || "" };

    setScreenState(item);
    setShowModal(true);
  };
  const handleDeleteButton = async (id) => {
    await PostApiData("screen/delete_screen", { ID: id });
    dispatch(screenData());
   
  };

  useEffect(() => {
    const fetchParentData = async () => {
      if (screen.screens.screen) {
        for (const item of screen.screens.screen) {
          const data = await GetApiData("menu/get_menu_by_oid", item.menu_name);
          setParentData((prevData) => ({
            ...prevData,
            [item.menu_name]: data,
          }));
        }
      }
    };

    fetchParentData();
  }, [screen.screens.screen, dispatch]);

  return (
    <>

<Header></Header>

{circularProgress == true ? <CircularLoader></CircularLoader> : <></>}
<ToasterGen></ToasterGen>


<div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-white">
  <div
    className={` ${
      sideMenuShow == true ? "col-span-1 w-full" : "lg:col-span-0 "
    }   lg:flex bg-white `}
  >
    <SideMenu setSideMenuShow={setSideMenuShow} />
  </div>

  {showModalCreate ? (
        <CreateScreen
          props={setShowModalCreate}
          screenState  = {screenState}
        ></CreateScreen>
      ) : null}

{showModal ? (
        <ScreenUpdateModal
          props={setShowModal}
          screenState={screenState}
          screenData = {screenData}
        ></ScreenUpdateModal>
      ) : null}
      

  <div
    className={` ${
      sideMenuShow == true ? "lg:col-span-9" : "lg:col-span-10"
    } bg-transparent w-full`}
  >
    <div className="relative w-full  bg-white">
      <div className="flex flex-col h-auto p-4 md:p-8 text-center">
        <p className="font-bold   text-4xl  md:text-lg text-[#20253F]   font-novasans mb-2">
          Screen Data
        </p>
        <p className="font-normal text-[#848E9C]  text-sm md:text-base leading-6 font-novasans"></p>
      </div>
    </div>

    <div className="m-auto w-4/5 font-novasans">
      <div className="flex flex-col">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="relative w-full"></div>
          Filters
          <form className="">
            <div className=" flex justify-end w-full">
              {" "}
              {filter == true ? (
                <TiArrowSortedUp
                  onClick={() => setFilter(false)}
                ></TiArrowSortedUp>
              ) : (
                <TiArrowSortedDown onClick={() => setFilter(true)} />
              )}
            </div>

            <div
              className={`${
                filter
                  ? "block transition duration-300 ease-in-out"
                  : "transition duration-500 ease-in-out hidden"
              }`}
            >
              <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                <svg
                  className="absolute left-2 block h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    className=""
                  ></line>
                </svg>
                <input
                  type="name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  name="search"
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by Name"
                />
              </div>
              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
              
              </div>
            </div>
          </form>
          <button onClick={(e)=>{e.preventDefault();setShowModalCreate(true);}} className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">
                  Create Screen
                </button>
        </div>
      </div>
    </div>


   



      {/* <Toaster
        toastOptions={{
          duration: 1000,
          className: "",
          success: {
            style: {
              border: "2px solid #f5621c",
              padding: "16px",
            },
          },
          error: {
            style: {
              border: "2px solid #f5621c",
              padding: "16px",
              color: "#f5621c",
            },
          },
        }}
        position="top-center"
        reverseOrder="false"
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    className="close-icon"
                    onClick={() => {
                      toast.dismiss(t.id);
                    }}
                  ></button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>

      <Header></Header>
      <MenuHeader></MenuHeader>

      {showModalCreate ? (
        <CreateScreen
          props={setShowModalCreate}
          screenState  = {screenState}
        ></CreateScreen>
      ) : null}



      {showModal ? (
        <ScreenUpdateModal
          props={setShowModal}
          screenState={screenState}
          screenData = {screenData}
        ></ScreenUpdateModal>
      ) : null}

      <div className="container mx-auto ">



        <div className="flex flex-col min-h-screen bg-transparent">
          <div className="p-4">
            <button onClick={()=>{setShowModalCreate(true)}} className="flex items-center justify-center w-auto border h-12 bg-maincolor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white">
              <IoIosCreate className="mr-2" />
              Create Screen
            </button>
          </div>

        
  
          <div className="flex mx-8 mt-10 items-end justify-end sm:justify-end ">
  <div className="absolute flex-shrink-0 items-center">
    <label htmlFor="simple-search" className="sr-only">
      Search
    </label>
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Screen"
        className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-maincolor focus:border-maincolor block w-full pl-10 p-2.5 focus:outline-none focus:ring-0"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <AiOutlineSearch className="w-5 h-5 text-maincolor dark:text-maincolor" />
      </div>
    </div>
  </div>
</div> */}

          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl">
            <div className="p-8 md:p-14">
              <span className="mb-3 font-novasans text-subheading-400 text-maincolor">
                Screen List
              </span>

              <div className="overflow-x-auto      scrollbar-thin scrollbar-thumb-maincolor">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Screen Url
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Screen's Menu
                      </th>

                      <th className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item.screen_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {item.screen_url}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {parentData &&
                                parentData[item.menu_name] &&
                                parentData[item.menu_name].menu_name}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                handleUpdateClick(item, parentData);
                              }}
                              className="text-extra-color hover:extra-color"
                            >
                              <AiOutlineEdit />
                            </button>
                          </td> 

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteButton(item.id)}
                              href="#"
                              className="text-extra-color hover:extra-color"
                            >
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenList;
