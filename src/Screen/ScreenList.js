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
const ScreenList = () => {
  const dispatch = useDispatch();
  let screen = useSelector((state) => state.screen);
  const [parentData, setParentData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [screenState, setScreenState] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
      <Toaster
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
</div>

          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl">
            <div className="p-8 md:p-14">
              <span className="mb-3 font-Poppins text-subheading-400 text-maincolor">
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
