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
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

  deletedState((prev)=>prev+1);
  

}


  return (
    <div className="bg-white p-5 rounded-lg border-transparent mt-2 w-full h-full ">
      <div className="bg-transparent py-7 rounded-lg border-transparent mt-2 w-full h-full ">

      <div class="p-5 bg-gray-100">
    <h1 class="text-xl mb-2">Companies</h1>
 
    <div class="overflow-auto rounded-lg shadow hidden md:block">
      <table class="w-full">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
        <tr>

              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Company  Name
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Duplicate
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                <div className="flex grid-col-2 gap-2   text-md font-Poppins">
                    <button
                      onClick={() => handleColumnSort("Price")}
                      className="flex items-center space-x-1  text-md font-Poppins break-words w-1/2  px-6 py-4 font-medium  whitespace-nowrap dark:text-blue-100"
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

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Industry 1
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Industry 2
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                 Company Linked In
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Country
                </th>
                     
               
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Region 
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                   
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                   
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100">
              {currentItems &&
                currentItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="hidden lg:table-row xl:table-row 2xl:table-row">
                    <td className="px-3 py-7  font-Poppins break-words w-1/2">
                    <span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
                      {item.companyName}
                      </span>
                      </td>
                      
                    <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.name}</td>
                    <td className="px-3 py-7  font-Poppins break-words w-1/2"><span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">{item.duplicate == true ? "True" : "False"}</span></td>



                    <td className="px-3 py-7  font-Poppins break-words w-1/2 underline text-green-500 font-semibold">
                      <a  href={item.website}>  {item.website}</a>
                      </td>
                      <td className="px-3 py-7  font-Poppins break-words w-1/2">
                        {item.industry}
                      </td>
                      <td className="px-3 py-7  font-Poppins break-words w-1/2">
                        {item.industry2}
                      </td>
                  
                      <td className="px-3 py-7  font-Poppins break-words w-1/2 underline text-green-500 font-semibold">
                        <a href={item.companyLinkedIn}>{item.companyLinkedIn}</a>
                      </td>
                      <td className="px-3 py-7  font-Poppins break-words w-1/2 text-green-800 font-bold">
                        {item.Country}
                      </td>
                      
                      <td className="px-3 py-7 text-maincolor">
                        {item.Region}

                      </td>
                      

                      <td className=" flex   items-center justify-end py-8">
                        <button
                          onClick={() => {
                            navigate("/edit_company", {
                              state: { companyState: item },
                            });
                          }}
                          className="flex items-center justify-center text-green-600 font-semibold lg:w-32 md:w-32 text-lg"
                          >
                          <FaEdit/>
                        </button>
                      </td>

                  


                      <td className=" px-2"
                      
                      onClick={()=>{handleDeleteButton(item._id)}}
                      >
                        <button 
                          className="flex items-center justify-center text-green-600 font-semibold lg:w-32 md:w-32 text-lg"
                       >   <MdDelete/>

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
           
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-6" key={index}>
      <div class="bg-white space-y-3 p-4 rounded-lg shadow">
        <div class="flex items-center space-x-2 text-sm">
          <div>
            
          </div>
         
          <div>
            <span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800  rounded-lg bg-opacity-50">{item.companyName}</span>
          </div>
        </div>
        <div class="text-sm text-gray-700 break-words">
        <a href={item.website} class="text-green-500 font-bold hover:underline"> {item.website}
                  </a>
        </div>
        <div class="text-sm text-gray-700 break-words">
       
        <a href={item.linkedin} class="text-green-500 font-bold hover:underline">    {item.linkedin}
        </a>

        </div>
        <div class="text-sm text-gray-700 break-words">
          
        <a href={item.companyLinkedin} class="text-green-500 font-bold hover:underline">
          {item.companyLinkedin}
          </a>
        </div>
        <div class="text-gray-500">{item.empcount}</div>
        <div className="grid grid-cols-1 gap-3">

        <div class="text-gray-500  font-Poppins">{item.country}</div>
        <div class="text-gray-500  font-Poppins">{item.industry1}</div>
        <div class="text-gray-500  font-Poppins">{item.industry2}</div>
        
        
<div className=" font-bold text-green-500  font-Poppins break-words ">Duplicate: {item.duplicate ? "True" : "False"}</div>
        <div class=  "text-gray-500  font-Poppins"><span
              class="p-1.5 text-xs font-medium uppercase  text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50 w-full break-words">{item.name}</span></div>

         <div className=" font-bold text-green-800  font-Poppins break-words ">
{item.phoneNumber}
  </div>
  <div className="  font-Poppins break-words  font-bold text-green-800">{item.phoneNumber2}
  </div>

        </div>


        <div className="grid grid-cols-5 w-full">
      <div className="">
    <button
      onClick={() => {
        navigate("/edit_contact", {
          state: { contactState: item },
        });
      }}
      className="flex items-center justify-center text-green-600 font-semibold lg:w-32 md:w-32 text-lg"
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
    <button className="flex items-center justify-center font-semibold text-green-600 lg:w-32 md:w-32 text-lg">
      <MdDelete/>
    </button>
  </div>
  </div>


      </div>
    
   
    </div>
    
                ))}


        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;


