

import React from "react";
import { useState, useEffect } from "react";
import auth from "../assets/auth.png";
import best from "../assets/best.png";
import { useNavigate } from "react-router-dom";
import { contactData } from "../helpers/AuthStore/contactSlice";
import { useSelector, useDispatch } from "react-redux";

import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import postApiData from "../helpers/postApiData";
import "./CompanyDetail.css";
const ContactDetails = ({
  handleColumnSort,
  sortColumn,
  sortDirection,
  currentItems,
  deletedState,
  typeNew,
}) => {


  const dispatch = useDispatch();


  useEffect(() => {
    
    }, []);

  const navigate = useNavigate();
const handleDeleteButton = async ( ID) =>{

  await postApiData("contact/delete_contact",{ID:ID});
  dispatch(contactData());

  deletedState(ID);

}


  return (
    <div className="bg-white p-5 rounded-lg border-transparent mt-2 w-full h-full ">
      <div className="bg-transparent py-7 rounded-lg border-transparent mt-2 w-full h-full ">
        <div className="overflow-x-auto scrollbar scrollbar-thumb-textColor">
          <table className="relative bg-transparent w-full ">
          <thead className="md:table-header-group w-full border-b border-gray-500">
              <tr>


              <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg ">
                  Sr No
                </th>


                <th className="h-4 font-normal leading-5 text-maincolor px-4 text-left text-lg">
                  Name
                </th>
                
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg ">
                  Duplicate
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Industry 1
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Industry 2
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Employee Count
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Phone Number
                </th>

                <th className="h-4 font-normal leading-5 text-maincolor p-10 text-lg">
                  <div className="flex grid-col-2 gap-2 text-lg">
                    <button
                      onClick={() => handleColumnSort("Price")}
                      className="flex items-center space-x-1"
                    >
                      Website
                      {sortColumn === "Website" && (
                        <span
                          className={`${
                            sortDirection === "asc"
                              ? "text-textColor"
                              : "text-maincolor dark:text-maincolor"
                          }`}
                        >
                          {sortDirection === "asc" ? (
                            <AiOutlineArrowUp />
                          ) : (
                            <AiOutlineArrowDown />
                          )}
                        </span>
                      )}
                    </button>
                  </div>
                </th>

                

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Company LinkedIn 
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  City
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Region
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Country
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  First Name
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Last Name
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Job Role
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Email
                </th>
                
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                    Quality
                </th>
                
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Result
                </th>
                
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Free
                </th>
                
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Role
                </th>
                

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Phone Number
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  LinkedIn
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Remarks
                </th>
                  <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Record in Mastersheet

                </th>
                

              </tr>
            </thead>

            <tbody className="bg-white border-newcolortext border-solid ">
              {currentItems &&
                currentItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className=" lg:table-row xl:table-row 2xl:table-row">
                    <td className="px-3 py-7 text-maincolor ">{item.srno}</td>
                   
                      <td className="px-3 py-7 text-maincolor ">{item.name}</td>
                   
                      <td className="px-3 py-7 text-maincolor ">{item.duplicate == true ? "True" : "False"}</td>

                      <td className="px-3 py-7 text-maincolor">
                        {item.industry1}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.industry2}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.empcount}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.phoneNumber}
                      </td>

                      <td className="px-3 py-7 text-maincolor">
                        {item.website}
                      </td>


                      <td className="px-3 py-7 text-maincolor">
                        {item.companyLinkedin}
                      </td>
                      <td className="px-3 py-7 text-maincolor">{item.city}</td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.region}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.country}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.firstName}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.lastName}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.jobRole}
                      </td>   <td className="px-3 py-7 text-maincolor">{item.email}</td>

                      <td className="px-3 py-7 text-maincolor">
                        {item.quality}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.result}
                      </td>

                      <td className="px-3 py-7 text-maincolor">
                        {item.free}
                      </td>

                      <td className="px-3 py-7 text-maincolor">
                        {item.role}
                      </td>
                      
                      <td className="px-3 py-7 text-maincolor">
                        {item.phoneNumber2}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.linkedin}
                      </td>
                       
                      
                      
                      
                      
                     

                      
                      <td className="px-3 py-7 text-maincolor">
                        {item.remarks}
                      </td>
                      

                      
                      <td className="px-3 py-7 text-maincolor">
                        {item.recordMarksheet}
                      </td>
                      


                      <td className=" flex   items-center justify-end py-8">
                        <button
                          onClick={() => {
                            navigate("/edit_contact", {
                              state: { contactState: item },
                            });
                          }}
                          className=" flex items-center  justify-center  font-semibold  lg:w-32 md:w-32 w-full sm:w-32 xl:w-32 2xl:w-32  border h-12 bg-[#0ECB81] text-maincolor border-[#0ECB81] text-md p-2 rounded-lg mb-6 hover:bg-[#0ECB81] hover-text-white"
                        >
                          Edit
                        </button>
                      </td>

                      <td className=" px-2"
                      
                      onClick={()=>{handleDeleteButton(item._id)}}
                      >
                        <button className=" flex items-center  justify-center  font-semibold  lg:w-32 md:w-32 w-full sm:w-32 xl:w-32 2xl:w-32  border h-12 bg-red-600 text-maincolor border-red-600 text-md p-2 rounded-lg mb-6 hover:bg-red-600 hover-text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
