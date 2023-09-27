

import React from "react";
import { useState, useEffect } from "react";
import auth from "../assets/auth.png";
import best from "../assets/best.png";
import { useNavigate } from "react-router-dom";
import { companyData } from "../helpers/AuthStore/companySlice";
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
const handleDeleteButton = async (ID) =>{

  await postApiData("contact/delete_contact",{ID:ID});
  dispatch(companyData());

  deletedState(ID);

}


  return (
    <div className="bg-white p-5 rounded-lg border-transparent mt-2 w-full h-full ">
      <div className="bg-transparent py-7 rounded-lg border-transparent mt-2 w-full h-full ">
        <div className="overflow-x-auto scrollbar scrollbar-thumb-textColor">
          <table className="relative bg-transparent w-full ">
            <thead className=" md:table-header-group  h-fit lg:w-max xl:w-max 2xl:w-max md:w-max sm:w-max border-b border-gray-500 ">
              <tr>
                <th className="h-4 font-normal leading-5 text-maincolor px-4 text-left text-lg">
                  Name
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
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg ">
                  Duplicate
                </th>
                <th className="h-4 font-normal leading-5 mx-2 text-maincolor px-4 text-left text-lg ">
                  Industry 1
                </th>

                <th className="h-4 font-normal leading-5  text-maincolor px-4 text-left text-lg">
                  Industry 2
                </th>
                <th className="h-4 font-normal leading-5 text-maincolor px-4 text-left text-lg">
                  Employee Count
                </th>
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  Phone Number
                </th>
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  Linked In
                </th>

                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  City
                </th>

                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  Region
                </th>

                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  Country
                </th>
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  First Name
                </th>
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  Last Name
                </th>
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  Job Role
                </th>
                <th className="h-4 font-normal leading-5 text-maincolor px-0 text-left text-lg">
                  Email
                </th>
              </tr>
            </thead>

            <tbody className="bg-white border-newcolortext border-solid ">
              {currentItems &&
                currentItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="hidden lg:table-row xl:table-row 2xl:table-row">
                      <td className="px-3 py-7 text-maincolor ">{item.name}</td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.website}
                      </td>

                      <td className="px-3 py-7 text-maincolor ">{item.duplicate == true ? "True" : "False"}</td>

                      <td className="px-3 py-7 text-maincolor">
                        {item.industry}
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
                        {item.linkedin}
                      </td>
                      <td className="px-3 py-7 text-maincolor">{item.city}</td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.Region}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.Country}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.firstName}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.lastName}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.jobRole}
                      </td>
                      <td className="px-3 py-7 text-maincolor">{item.email}</td>

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
