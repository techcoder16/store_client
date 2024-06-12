import React from "react";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";
import { authuserData } from "../helpers/UserStore/authUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import GetApiData from "../helpers/getApiData";
import PostApiData from "../helpers/postApiData";
import { IoIosCreate } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

import SideMenu from "../Container/SideMenu";
import { MdDelete } from "react-icons/md";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import ToasterGen from "../Container/ToasterGen";
import CreateAuthScreen from './CreateAuthScreen';

import { CircularLoader } from "../utils/CircularLoader";


const AuthScreenList = () => {
  const dispatch = useDispatch();
  let authuser = useSelector((state) => state.authuser);
  const [parentData, setParentData] = useState({});
  const [parentDataScreen, setParentDataScreen] = useState({});
  const [screenState, setScreenState] = useState({});
  
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [authuserState, setauthuserState] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredauthuser = authuser.authusers.authuser ?  authuser.authusers.authuser.filter(item => item.username.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredauthuser.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredauthuser.length / itemsPerPage);
  const [sideMenuShow, setSideMenuShow] = useState(false);
  
  const [circularProgress, setCircularProgress] = useState(false);
  
  const [filter, setFilter] = useState(true);
  
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};



useLayoutEffect(() => {
  return () => {
  
  };
}, [authuser.authusers.authuser]);


useEffect(() => {
  const fetchParentData = async () => {
    if (authuser.authusers.authuser) {
      for (const item of authuser.authusers.authuser) {
        const data = await GetApiData("auth/get_user_by_id", item.username);
        setParentData((prevData) => ({
          ...prevData,
          [item.username]: data,
        }));

       
        const dataScreen = await GetApiData("screen/get_screen_by_object_id", item.screen_name);
       
        setParentDataScreen((prevData) => ({
          ...prevData,
          [item.screen_name]: dataScreen,
        }));


      }



    }
  };

  fetchParentData();
}, [authuser.authusers.authuser, dispatch]);


 
  useEffect(() => {
    dispatch(authuserData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(authuserData());
  }, [showModal,showModalCreate,dispatch]);


  const handleDeleteButton = async (id) => {
    await PostApiData("auth/delete_auth_screens", { ID: id });
    dispatch(authuserData());
   
  };
 
 
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
        <CreateAuthScreen
          props={setShowModalCreate}
          screenState  = {screenState}
        ></CreateAuthScreen>
      ) : null}

{/* {showModal ? (
        <aut
          props={setShowModal}
          screenState={screenState}
          screenData = {screenData}
        ></ScreenUpdateModal>
      ) : null}
       */}

  <div
    className={` ${
      sideMenuShow == true ? "lg:col-span-9" : "lg:col-span-10"
    } bg-transparent w-full`}
  >
    <div className="relative w-full  bg-white">
      <div className="flex flex-col h-auto p-4 md:p-8 text-center">
        <p className="font-bold   text-4xl  md:text-lg text-[#20253F]   font-novasans mb-2">
          Authentication Screen Data
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
                  Create Auth Screen
                </button>
        </div>
      </div>
    </div>


   

          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl">
            <div className="p-8 md:p-14">
              <span className="mb-3 font-novasans text-subheading-400 text-maincolor">
                Screen Authorization List
              </span>

              <div className="overflow-x-auto      scrollbar-thin scrollbar-thumb-maincolor">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User  Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Screen Name
                      </th>
                     

                    
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                            {parentData &&
                                parentData[item.username] &&
                                parentData[item.username].username}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                            {parentDataScreen &&
                                parentDataScreen[item.screen_name] &&
                                parentDataScreen[item.screen_name].screen_name}
                            </div>
                          </td>
                        

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteButton(item._id)}
                           
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

export default AuthScreenList;
