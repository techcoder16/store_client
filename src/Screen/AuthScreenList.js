import React from "react";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";
import { authuserData } from "../helpers/UserStore/authUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import GetApiData from "../helpers/getApiData";
import PostApiData from "../helpers/postApiData";
import { IoIosCreate } from "react-icons/io";

import { MdDelete } from "react-icons/md";
import { toast, Toaster, ToastBar } from "react-hot-toast";

import CreateAuthScreen from './CreateAuthScreen';
import { AiOutlineSearch } from "react-icons/ai";
const AuthScreenList = () => {
  const dispatch = useDispatch();
  let authuser = useSelector((state) => state.authuser);
  const [parentData, setParentData] = useState({});
  const [parentDataScreen, setParentDataScreen] = useState({});
  
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
        <CreateAuthScreen
          props={setShowModalCreate}
          authuserState  = {authuserState}
        ></CreateAuthScreen>
      ) : null}



      {showModal ? (
        <authuserUpdateModal
          props={setShowModal}
          authuserState={authuserState}
          authuserData = {authuserData}
        ></authuserUpdateModal>
      ) : null}

      <div className="container mx-auto">



        <div className="flex flex-col min-h-authuser bg-transparent">
          <div className="p-4">
            <button onClick={()=>{setShowModalCreate(true)}} className="flex items-center justify-center w-auto border h-12 bg-maincolor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white">
              <IoIosCreate className="mr-2" />
              Create Auth User
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
        placeholder="Search Auth Screens"
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
              <span className="mb-3 font-dmsans text-subheading-400 text-maincolor">
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
