

import React from "react";
import { useState, useEffect } from "react";
import auth from "../assets/auth.png";
import best from "../assets/best.png";
import { redirect, useNavigate } from "react-router-dom";
import { contactData } from "../helpers/AuthStore/contactSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
  dispatch
}) => {


  

  useEffect(() => {
    
    }, []);

  const navigate = useNavigate();
const handleDeleteButton = async ( ID) =>{
console.log(ID);
  await postApiData("contact/delete_contact",{ID:ID});
  // dispatch(contactData());

  
  deletedState((prev)=>prev+1);


}


  return (
    <div className="bg-white  rounded-lg border-transparent mt-2 w-full h-full  font-Poppins">
      <div className="bg-white py-7 rounded-lg border-transparent mt-2 w-full h-full ">
      {/* <table class="w-full text-sm text-left  text-blue-100 dark:text-blue-100">
      <thead class=" text-white text-md font-Poppins break-words w-1/2  bg-green-600  text-lg  px-6 py-4 font-normal  whitespace-nowrap dark:text-blue-100 " >
              <tr>
            

              <th className="px-6 py-3">
                  Sr No
                </th>


                <th className=" px-6 py-3">
                  Name
                </th>
                
                <th className=" px-6 py-3">
                  Duplicate
                </th>
                <th className=" px-6 py-3">
                  Industry 1
                </th>

                <th className=" px-6 py-3">
                  Industry 2
                </th>
                <th className="px-6 py-3">
                  Employee Count
                </th>
                <th className="px-6 py-3">
                  Phone Number
                </th>

                <th className="px-6 py-3 ">
                  <div className="flex grid-col-2 gap-2  text-white text-md font-Poppins break-words w-1/2 ">
                    <button
                      onClick={() => handleColumnSort("Price")}
                      className="flex items-center space-x-1 text-white text-md font-Poppins break-words w-1/2  px-6 py-4 font-medium  whitespace-nowrap dark:text-blue-100"
                    >
                      Website
                      {sortColumn === "Website" && (
                        <span
                          className={`${
                            sortDirection === "asc"
                              ? "text-textColor"
                              : "text-white text-md font-Poppins break-words w-1/2 dark:text-white text-md font-Poppins break-words w-1/2"
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

                

                <th className="px-6 py-3">
                  Company LinkedIn 
                </th>

                <th className="px-6 py-3">
                  City
                </th>

                <th className="px-6 py-3">
                  Region
                </th>

                <th className="px-6 py-3">
                  Country
                </th>
                <th className="px-6 py-3">
                  First Name
                </th>
                <th className="px-6 py-3">
                  Last Name
                </th>
                <th className="px-6 py-3">
                  Job Role
                </th>
                <th className="px-6 py-3">
                  Email
                </th>
                
                <th className="px-6 py-3">
                    Quality
                </th>
                
                <th className="px-6 py-3">
                  Result
                </th>
                
                <th className="px-6 py-3">
                  Free
                </th>
                
                <th className="px-6 py-3">
                  Role
                </th>
                

                <th className="px-6 py-3">
                  Phone Number
                </th>

                <th className="px-6 py-3">
                  LinkedIn
                </th>

                <th className="px-6 py-3">
                  Remarks
                </th>
                  <th className="px-6 py-3">
                  Record in Mastersheet

                </th>
                <th className="px-6 py-3">
               

                </th>
                <th className="px-6 py-3">
                 

                </th>

              </tr>
            </thead>

            <tbody className="font-Poppins text-white text-md font-Poppins break-words w-1/2 text-lg font-semibold ">
              {currentItems &&
                currentItems.map((item, index) => (
                  <React.Fragment key={index}>
                   <tr className={index % 2 === 0 ? "bg-green-500 border-b border-green-400" : "bg-green-600 border-b border-green-400"}>
                    
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.srno}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.name}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.duplicate ? "True" : "False"}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.industry1}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.industry2}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.empcount}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.phoneNumber}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.website}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.companyLinkedin}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.city}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.region}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.country}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.firstName}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.lastName}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.jobRole}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.email}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.quality}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.result}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.free}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.role}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.phoneNumber2}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.linkedin}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.remarks}</td>
  <td className="px-3 py-7 text-white text-md font-Poppins break-words w-1/2">{item.recordMarksheet}</td>
  <td className="flex items-center justify-end py-16">
    <button
      onClick={() => {
        navigate("/edit_contact", {
          state: { contactState: item },
        });
      }}
      className="flex items-center justify-center font-semibold lg:w-32 md:w-32 text-lg"
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
    <button className="flex items-center justify-center font-semibold lg:w-32 md:w-32 text-lg">
      <MdDelete/>
    </button>
  </td>
</tr>

                  </React.Fragment>
                ))}
            </tbody>
          </table> */}


  <div class="p-5 bg-gray-100">
    <h1 class="text-xl mb-2">Contacts</h1>
 
    <div class="overflow-auto rounded-lg shadow hidden md:block">
      <table class="w-full">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          {/* <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
          <th class="p-3 text-sm font-semibold tracking-wide text-left">Details</th>
          <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
          <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
          <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
 */}

          

          <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Sr No
                </th>


                <th className=" w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                
                <th className=" w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Duplicate
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Industry 1
                </th>

                <th className=" w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Industry 2
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Employee Count
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Phone Number
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Phone Number2
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left ">
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
                              : "text-white text-md font-Poppins text-md font-Poppins break-words w-1/2"
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
                  LinkedIn
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Company LinkedIn 
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  City
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Region
                </th>

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Country
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  First Name
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Last Name
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Job Role
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Quality
                </th>
                
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Result
                </th>
                
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Free
                </th>
                
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Role
                </th>
                

              

               

                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Remarks
                </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Record in Mastersheet

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

        <tr class="bg-white">
          
          {/* <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
            Kring New Fit office chair, mesh + PU, black
          </td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span
            class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
          </td> */}
          {/* <td class="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td> */}

<td class="p-3 text-sm text-gray-700 whitespace-nowrap">
<a href="#" class="font-bold text-green-500 hover:underline">{item.srno}</a></td>
<span
            class="p-1.5 text-sm font-medium uppercase w-full text-green-800 bg-green-200 rounded-lg bg-opacity-50">{item.name}</span>
  <td className="px-3 py-7 font-bold text-green-500 hover:underline font-Poppins break-words w-1/2">{item.duplicate ? "True" : "False"}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.industry1}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.industry2}</td>
  <td className="px-3 py-7 font-bold  font-Poppins break-words w-1/2">{item.empcount}</td>
  <td className="px-3 py-7 font-bold text-green-800  font-Poppins break-words w-1/2">
{item.phoneNumber}
  </td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2 font-bold text-green-800">{item.phoneNumber2}
  </td>
  <td className="px-3 py-7   font-Poppins break-words w-1/2 font-semibold underline text-green-500"><a href={item.website}>{item.website}</a></td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2 underline text-green-500"><a href={item.linkedin}>{item.linkedin}</a></td>
  

  <td className="px-3 py-7  font-Poppins break-words w-1/2 font-semibold underline text-green-500"><a href={item.companyLinkedin}>{item.companyLinkedin}</a></td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.city}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.region}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.country}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.firstName}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.lastName}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2"><span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">{item.jobRole}</span></td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2  font-bold text-green-800">{item.email}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">
            <span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.quality}</span></td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">
            <span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.result}</span></td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">
            <span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.free}</span></td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2"><span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.role}</span></td>
  
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.remarks}</td>
  <td className="px-3 py-7  font-Poppins break-words w-1/2">{item.recordMarksheet}</td>
  <td className="flex items-center justify-end py-16">
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
  </td>
  <td
    className="px-2"
    onClick={() => {
      handleDeleteButton(item._id);
    }}
  >
    <button className="flex items-center justify-center font-semibold text-green-600 lg:w-32 md:w-32 text-lg">
      <MdDelete/>
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
            <a href="#" class="text-green-500 font-bold hover:underline">#{item.srno}</a>
          </div>
          <div class="text-gray-500">{item.date}</div>
          <div>
            <span
              class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800  rounded-lg bg-opacity-50">{item.name}</span>
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

        <div class="text-gray-500  font-Poppins">{item.firstName}</div>
        <div class="text-gray-500  font-Poppins">{item.lastName}</div>
        <div class="text-gray-500  font-Poppins">{item.country}</div>
        <div class="text-gray-500  font-Poppins">{item.city}</div>
        <div class="text-gray-500  font-Poppins">{item.industry1}</div>
        <div class="text-gray-500  font-Poppins">{item.industry2}</div>
        <div class="text-gray-500  font-Poppins break-words">{item.email}</div>
        
<div className=" font-bold text-green-500  font-Poppins break-words ">Duplicate: {item.duplicate ? "True" : "False"}</div>
        <div class=  "text-gray-500  font-Poppins"><span
              class="p-1.5 text-xs font-medium uppercase  text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50 w-full break-words">{item.jobRole}</span></div>

         <div className=" font-bold text-green-800  font-Poppins break-words ">
{item.phoneNumber}
  </div>
  <div className="  font-Poppins break-words  font-bold text-green-800">{item.phoneNumber2}
  </div>

<div className="grid grid-cols-4  ">
  <div className="  font-Poppins break-words ">
            <span
              class="p-1.5 text-xs font-medium    text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.quality}</span></div>
  <div className="  font-Poppins break-words ">
            <span
              class="p-1.5 text-xs font-medium   text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.result}</span></div>
  <div className="font-Poppins break-words ">
            <span
              class="p-1.5 text-xs font-medium    text-gray-800 bg-gray-200 rounded-lg bg-opacity-50  ">{item.free}</span></div>
  <div className=" font-Poppins break-words "><span
              class="p-1.5 text-xs font-medium   text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.role}</span></div>
</div>

        </div>

        <div class="text-sm font-medium text-black">
        <div className=" font-Poppins break-words ">{item.remarks}</div>
  <div className="font-Poppins break-words ">{item.recordMarksheet}</div>
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

export default ContactDetails;
