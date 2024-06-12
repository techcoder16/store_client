import React from "react";
import { useState, useEffect } from "react";

import { redirect, useNavigate } from "react-router-dom";
import UserUpdateModal from "./UserUpdateModal";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import userData from  '../helpers/UserStore/userSlice'
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import postApiData from "../helpers/postApiData";
import "./UserDetail.css";
const UserDetails = ({
  handleColumnSort,
  sortColumn,
  sortDirection,
  currentItems,
  deletedState,
  typeNew,
  dispatch,
}) => {
  useEffect(() => {

  }, []);
  
  const [userState, setuserState] = useState({});

  const [showModal, setShowModal] = useState(false);

  const handleUpdateClick = async (item) => {
    setuserState(item);
    console.log("asdkajdlkajsd")
  
  
      setShowModal(true);
      
    };
 

  const navigate = useNavigate();
  const handleDeleteButton = async (ID) => {
    console.log(ID);
    await postApiData("auth/delete_user", { ID: ID });
    typeNew((prev) => !prev);

    deletedState((prev) => prev + 1);
  };

  return (
    <>
    {showModal ? (
        <UserUpdateModal
          props={setShowModal}
          userState={userState}
          userData = {userData}
        ></UserUpdateModal>
      ) : null}
      

    <div className="bg-white  rounded-lg border-transparent mt-2 w-full h-full  font-novasans">
      <div className="bg-white py-7 rounded-lg border-transparent mt-2 w-full h-full ">
        <div className="p-5 bg-gray-100">
          <h1 className="text-xl mb-2">Users</h1>

          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
          

                  <th className=" w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Name
                  </th>

                  <th className=" w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Email
                  </th>
                  <th className=" w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    User Name
                  </th>

                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left"></th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
             
                {currentItems &&
                  currentItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="bg-white">
                     

                       
                      <td className="px-3 py-7 font-bold text-[#20253F]  font-novasans break-words w-1/2">

                        <span className="p-1.5 text-sm font-medium  w-full  rounded-lg bg-opacity-50">
                          {item.name}
                        </span>
                        </td>

                        <td className="px-3 py-7 font-bold text-[#20253F]  font-novasans break-words w-1/2">

                        <span className="p-1.5 text-sm font-medium  w-full  rounded-lg bg-opacity-50">
                          {item.email}
                        </span>
</td>
                        
                        <td className="px-3 py-7 font-bold text-[#20253F]  font-novasans break-words w-1/2">

                        <span className="p-1.5 text-sm font-medium  w-full  rounded-lg bg-opacity-50">
                          {item.username}
                        </span></td>
                        
                      
                  
                  
                     
                    
                        <td className="px-3 py-7 font-bold text-[#20253F]  font-novasans break-words w-1/2">
                          {item.phoneNumber}
                        </td>
                   
                 
                
                
                
                 
                  
                        <td className="flex items-center justify-end py-16">
                          <button
                            onClick={() => {
                              handleUpdateClick(item);
                             
                            }}
                            className="flex items-center justify-center text-[#20253F] font-semibold lg:w-32 md:w-32 text-lg"
                          >
                            <FaEdit />
                          </button>
                        </td>
                        <td
                          className="px-2"
                          onClick={() => {
                            handleDeleteButton(item._id);
                          }}
                        >
                          <button className="flex items-center justify-center font-semibold text-[#20253F] lg:w-32 md:w-32 text-lg">
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          {currentItems &&
            currentItems.map((item, index) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-6"
                key={index}
              >
                <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                  <div className="flex items-center space-x-2 text-sm">
                 
                    <div className="text-gray-500">{item.email}</div>
                    <div>
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50">
                        {item.name}
                      </span>
                    </div>
                  </div>
                
                  <div className="text-sm text-gray-700 break-words">
                    <a
                      href={item.username}
                      className="text-[#20253F] font-bold hover:underline"
                    >
                      
                      {item.linkedin}
                    </a>
                  </div>
                  <div className="text-sm text-gray-700 break-words">
                    <a
                      href={item.companyLinkedin}
                      className="text-[#20253F] font-bold hover:underline"
                    >
                      {item.companyLinkedin}
                    </a>
                  </div>
                  <div className="text-gray-500">{item.empcount}</div>
                  <div className="grid grid-cols-1 gap-3">
                   
                   

            
                  </div>

                

                  <div className="grid grid-cols-5 w-full">
                    <div className="">
                      <button
                        onClick={() => {
                          handleUpdateClick(item);
                            
                        }}
                        className="flex items-center justify-center text-[#20253F] font-semibold lg:w-32 md:w-32 text-lg"
                      >
                        <FaEdit />
                      </button>
                    </div>
                    <div
                      className="px-2"
                      onClick={() => {
                        handleDeleteButton(item._id);
                      }}
                    >
                      <button className="flex items-center justify-center font-semibold text-[#20253F] lg:w-32 md:w-32 text-lg">
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserDetails;
