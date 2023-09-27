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

const CompanyDetails = ({
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

  await postApiData("company/delete_company",{ID:ID});

  deletedState(ID);

}


  return (
    <div className="bg-white p-5 rounded-lg border-transparent mt-2 w-full h-full ">
      <div className="bg-transparent py-7 rounded-lg border-transparent mt-2 w-full h-full ">
        <div className="overflow-x-auto scrollbar scrollbar-thumb-textColor">
          <table className="relative bg-transparent w-full ">
          <thead className="md:table-header-group w-full border-b border-gray-500">
              <tr>
              <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                Company  Name
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Name
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Duplicate
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
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
                  Industry 1
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Industry 2
                </th>

                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                 Company Linked In
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Country
                </th>
                <th className="font-normal leading-5 text-maincolor px-4 text-left text-lg w-full">
                  Region 
                </th>

              
              </tr>
            </thead>

            <tbody className="bg-white border-newcolortext border-solid ">
              {currentItems &&
                currentItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="hidden lg:table-row xl:table-row 2xl:table-row">
                    <td className="px-3 py-7 text-maincolor ">{item.companyName}</td>
                      
                      <td className="px-3 py-7 text-maincolor ">{item.name}</td>
                      <td className="px-3 py-7 text-maincolor ">{item.duplicate == true ? "True" : "False"}</td>



                      <td className="px-3 py-7 text-maincolor">
                        {item.website}
                      </td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.industry}
                      </td>
                      <td className="px-3 py-7 break-words text-maincolor">
                        {item.industry2}
                      </td>
                  
               
                      <td className="px-3 py-7 break-words text-maincolor">
                        {item.companyLinkedIn}
                      </td>

                      <td className="px-3 py-7 text-maincolor">
                        {item.Country}
                      </td>

                      <td className="px-3 py-7 text-maincolor">{item.city}</td>
                      <td className="px-3 py-7 text-maincolor">
                        {item.Region}
                      </td>
                     
                      <td className="px-3 py-7 text-maincolor">{item.email}</td>

                      <td className=" flex   items-center justify-end py-8">
                        <button
                          onClick={() => {
                            navigate("/edit_company", {
                              state: { companyState: item },
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

export default CompanyDetails;


