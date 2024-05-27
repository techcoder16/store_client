

import React from "react";
import { useState, useEffect } from "react";
import auth from "../../assets/auth.png";
import best from "../../assets/best.png";
import { redirect, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import postApiData from "../../helpers/postApiData";
import { AiOutlineVerticalRight } from "react-icons/ai";

import { AiOutlineVerticalLeft } from "react-icons/ai";


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


  const [visibleColumnIndex, setVisibleColumnIndex] = useState(0);

  const columns = [
    { header: 'Sr No', accessor: 'srno' },
    { header: 'Name', accessor: 'name' },
    { header: 'Duplicate', accessor: 'duplicate', format: (value) => (value ? "True" : "False") },
    { header: 'Industry 1', accessor: 'industry1' },
    { header: 'Industry 2', accessor: 'industry2' },
    { header: 'Employee Count', accessor: 'empcount' },
    { header: 'Phone Number', accessor: 'phoneNumber' },
    { header: 'Phone Number2', accessor: 'phoneNumber2' },
    { header: 'Website', accessor: 'website', isSortable: true, isLink: true },
    { header: 'LinkedIn', accessor: 'linkedin', isLink: true },
    { header: 'Company LinkedIn', accessor: 'companyLinkedin', isLink: true },
    { header: 'City', accessor: 'city' },
    { header: 'Region', accessor: 'region' },
    { header: 'Country', accessor: 'country' },
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Job Role', accessor: 'jobRole' },
    { header: 'Email', accessor: 'email' },
    { header: 'Quality', accessor: 'quality' },
    { header: 'Result', accessor: 'result' },
    { header: 'Free', accessor: 'free' },
    { header: 'Role', accessor: 'role' },
    { header: 'Remarks', accessor: 'remarks' },
    { header: 'Record in Mastersheet', accessor: 'recordMarksheet' },
  ];

  const columnsPerPage = 4;
  const totalPages = Math.ceil(columns.length / columnsPerPage);

  const handleNextColumns = () => {
    setVisibleColumnIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrevColumns = () => {
    setVisibleColumnIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleColumns = columns.slice(visibleColumnIndex * columnsPerPage, (visibleColumnIndex + 1) * columnsPerPage);





  

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
    <div className="bg-[#F7FAFC]   rounded-lg border-transparent mt-2 w-full h-full  font-novasans">
      <div className="bg-[#F7FAFC]  py-7 rounded-lg border-transparent mt-2 w-full h-full ">
   


  <div className="p-5 bg-[#FFFF] ">
    <h1 className="text-xl  text-[#20253F]  font-semibold bg-white border-1  shadow-lg w-fit p-4">Contacts</h1>
 

    <div className="overflow-auto rounded-lg shadow hidden md:block">
      {/* <table className="w-full">
        <thead className="bg-[#FFFFFF] border-b-2 border-gray-200">
        <tr>
          

          

          <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E] ">
                  Sr No
                </th>


                <th className=" w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Name
                </th>
                
                <th className=" w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Duplicate
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Industry 1
                </th>

                <th className=" w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Industry 2
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Employee Count
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Phone Number
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Phone Number2
                </th>

                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E] ">
                  <div className="flex grid-col-2 gap-2   text-md font-novasans">
                    <button
                      onClick={() => handleColumnSort("Price")}
                      className="flex items-center space-x-1  text-md font-novasans break-words w-1/2  px-6 py-4 font-medium  whitespace-nowrap dark:text-blue-100"
                    >
                      Website
                      {sortColumn === "Website" && (
                        <span
                          className={`${
                            sortDirection === "asc"
                              ? "text-textColor"
                              : "text-white text-md font-novasans text-md  break-words w-1/2"
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

                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  LinkedIn
                </th>

                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Company LinkedIn 
                </th>

                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  City
                </th>

                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Region
                </th>

                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Country
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  First Name
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Last Name
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Job Role
                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Email
                </th>
                
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                    Quality
                </th>
                
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Result
                </th>
                
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Free
                </th>
                
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Role
                </th>
                

              

               

                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Remarks
                </th>
                  <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                  Record in Mastersheet

                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
               

                </th>
                <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                 

                </th>



        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
        {currentItems &&
                currentItems.map((item, index) => (
                  <React.Fragment key={index}>

        <tr className="bg-white">
          
          {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            Kring New Fit office chair, mesh + PU, black
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-[#7E7E7E] bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
          </td> 
        

<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
<a href="#" className="font-bold text-[#7E7E7E] hover:underline">{item.srno}</a></td>
<span
            className="p-1.5 text-sm font-medium uppercase w-full text-[#7E7E7E]  rounded-lg bg-opacity-50">{item.name}</span>
  <td className="px-3 py-7 font-bold text-[#7E7E7E] hover:underline font-novasans break-words w-1/2">{item.duplicate ? "True" : "False"}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.industry1}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.industry2}</td>
  <td className="px-3 py-7 font-bold  font-novasans break-words w-1/2">{item.empcount}</td>
  <td className="px-3 py-7 font-bold text-[#7E7E7E]  font-novasans break-words w-1/2">
{item.phoneNumber}
  </td>
  <td className="px-3 py-7  font-novasans break-words w-1/2 font-bold text-[#7E7E7E]">{item.phoneNumber2}
  </td>
  <td className="px-3 py-7   font-novasans break-words w-1/2 font-semibold underline text-[#7E7E7E]"><a href={item.website}>{item.website}</a></td>
  <td className="px-3 py-7  font-novasans break-words w-1/2 underline text-[#7E7E7E]"><a href={item.linkedin}>{item.linkedin}</a></td>
  

  <td className="px-3 py-7  font-novasans break-words w-1/2 font-semibold underline text-[#7E7E7E]"><a href={item.companyLinkedin}>{item.companyLinkedin}</a></td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.city}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.region}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.country}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.firstName}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.lastName}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2"><span
              className="p-1.5 text-xs font-medium uppercase tracking-wider">{item.jobRole}</span></td>
  <td className="px-3 py-7  font-novasans break-words w-1/2  font-bold text-[#7E7E7E]">{item.email}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.quality}</span></td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.result}</span></td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.free}</span></td>
  <td className="px-3 py-7  font-novasans break-words w-1/2"><span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.role}</span></td>
  
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.remarks}</td>
  <td className="px-3 py-7  font-novasans break-words w-1/2">{item.recordMarksheet}</td>
  <td className="flex items-center justify-end py-16">
    <button
      onClick={() => {
        navigate("/edit_contact", {
          state: { contactState: item },
        });
      }}
      className="flex items-center justify-center text-[#20253F] font-semibold lg:w-full md:w-full text-lg"
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
    <button className="flex items-center justify-center font-semibold text-[#20253F] lg:w-full md:w-full text-lg">
      <MdDelete/>
    </button>
  </td>

        </tr>
       


                  </React.Fragment>
                ))}

        </tbody>
      </table> */}

<div className="overflow-auto rounded-lg shadow hidden md:block">
      <table className="w-full">
        <thead className="bg-[#FFFFFF] border-b-2 border-gray-200">
          <tr>
            {visibleColumns.map((col) => (
              <th key={col.accessor} className="w-1/4 p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">
                {col.isSortable ? (
                  <div className="flex items-center space-x-1">
                    <button onClick={() => handleColumnSort(col.accessor)} className="flex items-center space-x-1">
                      {col.header}
                      {sortColumn === col.accessor && (
                        <span className={`${sortDirection === "asc" ? "text-textColor" : "text-white"}`}>
                          {sortDirection === "asc" ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                        </span>
                      )}
                    </button>
                  </div>
                ) : (
                  col.header
                )}
              </th>
            ))}
            <th className="w-full p-3 text-sm font-semibold tracking-wide text-left font-novasans text-[#66686E]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {currentItems &&  currentItems.map((item, index) => (
            <tr key={index} className="bg-white">
              {visibleColumns.map((col) => (
                <td key={col.accessor} className="px-3 py-7 text-sm text-[#20253F] font-semibold font-novasans whitespace-nowrap break-words">
                  {col.isLink ? (
                    <a href={item[col.accessor]} className="underline text-[#7E7E7E]">{item[col.accessor]}</a>
                  ) : (
                    col.format ? col.format(item[col.accessor]) : item[col.accessor]
                  )}
                </td>
              ))}
              <td className="flex items-center justify-end py-16">
                <button onClick={() => navigate("/edit_contact", { state: { contactState: item } })} className="flex items-center justify-center text-[#20253F] font-semibold lg:w-full md:w-full text-lg">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteButton(item._id)} className="flex items-center justify-center font-semibold text-[#20253F] lg:w-full md:w-full text-lg">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-2">
        <button onClick={handlePrevColumns} className="bg-transparent  text-[#20253F] py-2 px-4 rounded-md focus:outline-none"><AiOutlineVerticalRight />
</button>
        <button onClick={handleNextColumns} className=" text-[#20253F] py-2 px-4 rounded-md focus:outline-none"><AiOutlineVerticalLeft></AiOutlineVerticalLeft></button>
      </div>
    </div>



    </div>
    
    {currentItems &&
                currentItems.map((item, index) => (
           
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-6" key={index}>
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            <a href="#" className="text-[#7E7E7E] font-bold hover:underline">#{item.srno}</a>
          </div>
          <div className="text-gray-500">{item.date}</div>
          <div>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-[#7E7E7E]  rounded-lg bg-opacity-50">{item.name}</span>
          </div>
        </div>
        <div className="text-sm text-gray-700 break-words">
        <a href={item.website} className="text-[#7E7E7E] font-bold hover:underline"> {item.website}
                  </a>
        </div>
        <div className="text-sm text-gray-700 break-words">
       
        <a href={item.linkedin} className="text-[#7E7E7E] font-bold hover:underline">    {item.linkedin}
        </a>

        </div>
        <div className="text-sm text-gray-700 break-words">
          
        <a href={item.companyLinkedin} className="text-[#7E7E7E] font-bold hover:underline">
          {item.companyLinkedin}
          </a>
        </div>
        <div className="text-gray-500">{item.empcount}</div>
        <div className="grid grid-cols-1 gap-3">

        <div className="text-gray-500  font-novasans">{item.firstName}</div>
        <div className="text-gray-500  font-novasans">{item.lastName}</div>
        <div className="text-gray-500  font-novasans">{item.country}</div>
        <div className="text-gray-500  font-novasans">{item.city}</div>
        <div className="text-gray-500  font-novasans">{item.industry1}</div>
        <div className="text-gray-500  font-novasans">{item.industry2}</div>
        <div className="text-gray-500  font-novasans break-words">{item.email}</div>
        
<div className=" font-bold text-[#7E7E7E]  font-novasans break-words ">Duplicate: {item.duplicate ? "True" : "False"}</div>
        <div className=  "text-gray-500  font-novasans"><span
              className="p-1.5 text-xs font-medium uppercase  text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50 w-full break-words">{item.jobRole}</span></div>

         <div className=" font-bold text-[#7E7E7E]  font-novasans break-words ">
{item.phoneNumber}
  </div>
  <div className="  font-novasans break-words  font-bold text-[#7E7E7E]">{item.phoneNumber2}
  </div>

<div className="grid grid-cols-4  ">
  <div className="  font-novasans break-words ">
            <span
              className="p-1.5 text-xs font-medium    text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.quality}</span></div>
  <div className="  font-novasans break-words ">
            <span
              className="p-1.5 text-xs font-medium   text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.result}</span></div>
  <div className="font-novasans break-words ">
            <span
              className="p-1.5 text-xs font-medium    text-gray-800 bg-gray-200 rounded-lg bg-opacity-50  ">{item.free}</span></div>
  <div className=" font-novasans break-words "><span
              className="p-1.5 text-xs font-medium   text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{item.role}</span></div>
</div>

        </div>

        <div className="text-sm font-medium text-black">
        <div className=" font-novasans break-words ">{item.remarks}</div>
  <div className="font-novasans break-words ">{item.recordMarksheet}</div>
        </div>

        <div className="grid grid-cols-5 w-full">
      <div className="">
    <button
      onClick={() => {
        navigate("/edit_contact", {
          state: { contactState: item },
        });
      }}
      className="flex items-center justify-center text-[#20253F]  font-semibold lg:w-full md:w-full text-lg"
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
    <button className="flex items-center justify-center font-semibold text-[#20253F]  lg:w-full md:w-full text-lg">
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
