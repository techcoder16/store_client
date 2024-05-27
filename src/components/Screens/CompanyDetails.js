import React from "react";
import { useState, useEffect } from "react";
import auth from "../../assets/auth.png";
import best from "../../assets/best.png";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import postApiData from "../../helpers/postApiData";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineVerticalRight } from "react-icons/ai";

import { AiOutlineVerticalLeft } from "react-icons/ai";

const CompanyDetails = ({
  handleColumnSort,
  sortColumn,
  sortDirection,
  currentItems,
  deletedState,
  typeNew,
}) => {

  const [visibleColumnIndex, setVisibleColumnIndex] = useState(0);

  const columns = [
  
    { header: 'Name', accessor: 'companyName' },
    { header: 'Duplicate', accessor: 'duplicate', format: (value) => (value ? "True" : "False") },
    { header: 'Industry 1', accessor: 'industry' },
    { header: 'Industry 2', accessor: 'industry2' },
   
    { header: 'Website', accessor: 'website', isSortable: true, isLink: true },
    { header: 'Company LinkedIn', accessor: 'companyLinkedIn', isLink: true },
    { header: 'Region', accessor: 'region' },
    { header: 'Country', accessor: 'country' },
  
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




  const dispatch = useDispatch();


  useEffect(() => {
    
    }, []);

  const navigate = useNavigate();
const handleDeleteButton = async (ID) =>{

  await postApiData("company/delete_company",{ID:ID});

  deletedState((prev)=>prev+1);
  

}


  return (
    <div className="bg-[#F7FAFC]   rounded-lg border-transparent mt-2 w-full h-full  font-novasans">
    <div className="bg-[#F7FAFC]  py-7 rounded-lg border-transparent mt-2 w-full h-full ">
 

    <div className="p-5 bg-[#FFFF] ">
    <h1 className="text-xl  text-[#20253F]  font-semibold bg-white border-1  shadow-lg w-fit p-4">Companies</h1>
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


    


        {currentItems &&
                currentItems.map((item, index) => (
           
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-6" key={index}>
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm">
          <div>
            
          </div>
         
          <div>
            <span
              className="p-1.5 text-xs font-medium uppercase tracking-wider text-[#20253F]  rounded-lg bg-opacity-50">{item.companyName}</span>
          </div>
        </div>
        <div className="text-sm text-gray-700 break-words">
        <a href={item.website} className="text-[#20253F] font-bold hover:underline"> {item.website}
                  </a>
        </div>
        <div className="text-sm text-gray-700 break-words">
       
        <a href={item.linkedin} className="text-[#20253F] font-bold hover:underline">    {item.linkedin}
        </a>

        </div>
        <div className="text-sm text-gray-700 break-words">
          
        <a href={item.companyLinkedin} className="text-[#20253F] font-bold hover:underline">
          {item.companyLinkedin}
          </a>
        </div>
        <div className="text-gray-500">{item.empcount}</div>
        <div className="grid grid-cols-1 gap-3">

        <div className="text-gray-500  font-novasans">{item.country}</div>
        <div className="text-gray-500  font-novasans">{item.industry1}</div>
        <div className="text-gray-500  font-novasans">{item.industry2}</div>
        
        
<div className=" font-bold text-[#20253F]  font-novasans break-words ">Duplicate: {item.duplicate ? "True" : "False"}</div>
        <div className=  "text-gray-500  font-novasans"><span
              className="p-1.5 text-xs font-medium uppercase  text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50 w-full break-words">{item.name}</span></div>

         <div className=" font-bold text-[#20253F]  font-novasans break-words ">
{item.phoneNumber}
  </div>
  <div className="  font-novasans break-words  font-bold text-[#20253F]">{item.phoneNumber2}
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


