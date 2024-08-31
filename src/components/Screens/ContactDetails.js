import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import postApiData from "../../helpers/postApiData";
import "./CompanyDetail.css";

const ContactDetails = ({
  handleColumnSort,
  sortColumn,
  sortDirection,
  currentItems,
  deletedState,
}) => {
  const columns = [
    { header: "Sr No", accessor: "srno" },
    { header: "Name", accessor: "name" },
    { header: "Industry 1", accessor: "industry1" },
    { header: "Industry 2", accessor: "industry2" },
    { header: "Employee Count", accessor: "empcount" },
    { header: "Phone Number", accessor: "phoneNumber" },
    { header: "Phone Number2", accessor: "phoneNumber2" },
    { header: "Website", accessor: "website", isSortable: true, isLink: true },
    { header: "LinkedIn", accessor: "linkedin", isLink: true },
    { header: "Company LinkedIn", accessor: "companyLinkedin", isLink: true },
    { header: "City", accessor: "city" },
    { header: "Region", accessor: "region" },
    { header: "Country", accessor: "country" },
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Job Role", accessor: "jobRole" },
    { header: "Email", accessor: "email" },
    { header: "Quality", accessor: "quality" },
    { header: "Result", accessor: "result" },
    { header: "Free", accessor: "free" },
    { header: "Role", accessor: "role" },
    { header: "Remarks", accessor: "remarks" },
    { header: "Record in Mastersheet", accessor: "recordMarksheet" },
  ];
  
  const [visibleColumnIndex, setVisibleColumnIndex] = useState(0);
  const [position, setPosition] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.accessor]: true }), {})
  );
  const theadRef = useRef(null);
  const navigate = useNavigate();

  // Define columns array here


  const columnsPerPage = 15;
  const totalPages = Math.ceil(columns.length / columnsPerPage);

  const handleNextColumns = () => {
    setVisibleColumnIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrevColumns = () => {
    setVisibleColumnIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleColumns = columns
    .filter((col) => columnVisibility[col.accessor])
    .slice(
      visibleColumnIndex * columnsPerPage,
      (visibleColumnIndex + 1) * columnsPerPage
    );

  useEffect(() => {
    const handleScroll = () => {
      if (theadRef.current) {
        const theadOffsetTop = theadRef.current.getBoundingClientRect().top;
        const scrollTop = window.scrollY || window.pageYOffset; // To handle different browsers
        const isScrolled = scrollTop > theadOffsetTop;
        setPosition(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check in case the page is loaded with some scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDeleteButton = async (ID) => {
    try {
      await postApiData("contact/delete_contact", { ID: ID });
      deletedState((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleColumnVisibilityChange = (accessor) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [accessor]: !prev[accessor]
    }));
  };

  return (
    <div className="bg-[#F7FAFC] rounded-lg border-transparent mt-2 w-full h-full font-novasans">
      <div className="bg-[#F7FAFC] py-7 rounded-lg border-transparent mt-2 w-full h-full">
        <div className="p-5 bg-[#FFFF]">
          <h1 className="text-xl text-[#20253F] font-semibold bg-white border-1 shadow-lg w-fit p-4">
            Contacts
          </h1>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Select Columns to Show:</h2>
            <div className="flex flex-wrap gap-4">
              {columns.map((col) => (
                <label key={col.accessor} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={columnVisibility[col.accessor]}
                    onChange={() => handleColumnVisibilityChange(col.accessor)}
                    className="mr-2"
                  />
                  {col.header}
                </label>
              ))}
            </div>
          </div>

          <div className="table-container">
            <table className="w-full border-collapse">
              <thead ref={theadRef} className={`table-header ${position ? "fixed top-0 w-auto p-3" : "relative"}`}>
                <tr>
                  {visibleColumns.map((col) => (
                    <th
                      key={col.accessor}
                      className="w-1/4 text-sm font-semibold text-left text-[#66686E] border-b border-gray-200"
                    >
                      {col.isSortable ? (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleColumnSort(col.accessor)}
                            className="flex items-center space-x-1"
                          >
                            {col.header}
                            {sortColumn === col.accessor && (
                              <span className={`${
                                sortDirection === "asc" ? "text-textColor" : "text-white"
                              }`}>
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
                  <th className="w-full p-3 text-sm font-semibold text-left text-[#66686E] border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {currentItems && currentItems.map((item, index) => (
                  <tr key={index} className="bg-white table-body-row">
                    {visibleColumns.map((col) => (
                      <td
                        key={col.accessor}
                        className="px-3 py-7 text-sm text-[#20253F] font-semibold whitespace-nowrap break-words"
                      >
                        {col.isLink ? (
                          <a
                            href={item[col.accessor]}
                            className="underline text-[#7E7E7E]"
                          >
                            {item[col.accessor]}
                          </a>
                        ) : col.format ? (
                          col.format(item[col.accessor])
                        ) : (
                          item[col.accessor]
                        )}
                      </td>
                    ))}
                    <td className="flex items-center justify-end py-16">
                      <button
                        onClick={() =>
                          navigate("/edit_contact", {
                            state: { contactState: item },
                          })
                        }
                        className="flex items-center justify-center text-[#20253F] font-semibold text-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteButton(item._id)}
                        className="flex items-center justify-center font-semibold text-[#20253F] text-lg"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-2">
              <button
                onClick={handlePrevColumns}
                className="bg-transparent text-[#20253F] py-2 px-4 rounded-md focus:outline-none"
              >
                <AiOutlineVerticalRight />
              </button>
              <button
                onClick={handleNextColumns}
                className="text-[#20253F] py-2 px-4 rounded-md focus:outline-none"
              >
                <AiOutlineVerticalLeft />
              </button>
            </div>
          </div>

          {/* Mobile View */}
          {currentItems && currentItems.map((item, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-6"
              key={index}
            >
              <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                <div className="text-sm text-gray-700">
                  <div className="font-bold text-[#20253F]">{item.name}</div>
                  <div className="text-gray-500">{item.email}</div>
                  <div className="text-gray-500">{item.phoneNumber}</div>
                  <div className="text-gray-500">{item.phoneNumber2}</div>
                  <div className="text-gray-500">{item.website}</div>
                  <div className="text-gray-500">{item.linkedin}</div>
                  <div className="text-gray-500">{item.companyLinkedin}</div>
                  <div className="text-gray-500">{item.city}</div>
                  <div className="text-gray-500">{item.region}</div>
                  <div className="text-gray-500">{item.country}</div>
                  <div className="text-gray-500">{item.firstName}</div>
                  <div className="text-gray-500">{item.lastName}</div>
                  <div className="text-gray-500">{item.jobRole}</div>
                  <div className="text-gray-500">{item.quality}</div>
                  <div className="text-gray-500">{item.result}</div>
                  <div className="text-gray-500">{item.free}</div>
                  <div className="text-gray-500">{item.role}</div>
                  <div className="text-gray-500">{item.remarks}</div>
                  <div className="text-gray-500">{item.recordMarksheet}</div>
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
