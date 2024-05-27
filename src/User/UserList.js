import { useFormik } from "formik";

import Header from "../Container/Header";
import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { userData } from "../helpers/UserStore/userSlice";
import { useSelector, useDispatch, useCallback } from "react-redux";
import { useLayoutEffect, useEffect, useState, useMemo } from "react";

import { toast, Toaster, ToastBar } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "axios";

import UserDetails from "./UserDetails";
// import "./Dashboard.css";3

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

import { CircularLoader } from "../utils/CircularLoader";

import * as XLSX from "xlsx";

import { useNavigate } from "react-router-dom";

import SideMenu from "../Container/SideMenu";
import UserUpdateModal from "./UserUpdateModal";

import Footer from "../Container/Footer";
import ToasterGen from "../Container/ToasterGen";
import CreateUser from "./CreateUser";

const UserList = () => {
  const navigate = useNavigate();
  const [circularProgress, setCircularProgress] = useState(false);
  const dispatch = useDispatch();
  let user = useSelector((state) => state.users);
  const [selectedOptions, setSelectedOptions] = useState();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  
  const [type, setType] = useState(false);

  const [deletedState, setDeletedState] = useState(0);
  const [filter, setFilter] = useState(true);
  
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [sideMenuShow, setSideMenuShow] = useState(false);
  

  useEffect(() => {
    dispatch(userData());
  }, [dispatch]);



  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (user) {
      const userrole = JSON.parse(localStorage.getItem("user_data")).role;
    }
  }, []);



  const [selectedFilters, setSelectedFilters] = useState({
    Website: "",
  });

  const itemsPerPage = 100;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 
  let totalPages = Math.ceil(user.users.userCount / itemsPerPage);
 
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const getPages = () => {
    const maxVisiblePages = 5;
    const sidePages = Math.floor((maxVisiblePages - 3) / 2);
    const pages = [];

    pages.push(
      <button
        onClick={() => handlePageChange(1)}
        className={`px-3  py-1 font-bold rounded font-Poppins mx-1 italic  ${
          currentPage === 1
            ? " bg-textColor text-white"
            : " bg-textColor text-white"
        }`}
      >
        1
      </button>
    );

    let startPage = Math.max(2, currentPage - sidePages);
    let endPage = Math.min(totalPages - 1, currentPage + sidePages);
    let addStartDots = false;
    let addEndDots = false;

    if (endPage < totalPages - 1) {
      addEndDots = true;
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={` px-3  mx-1 py-1 font-bold rounded font-Poppins     ${
            currentPage === page
              ? " bg-textColor text-white"
              : " bg-textColor text-white"
          }`}
        >
          {page}
        </button>
      );
    }

    if (addEndDots) {
      pages.push(
        <span key="end-dots" className="px-0 py-1  text-gray-600">
          ...
        </span>
      );
    }
    totalPages =  isNaN(totalPages) ? 0:totalPages;

    pages.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`px-3 py-1 font-bold rounded font-Poppins mx-1 italic ${
          currentPage === totalPages
            ? "bg-textColor  text-white"
            : " bg-textColor text-white"
        }`}
      >

        {totalPages}
      </button>
    );

    return pages;
  };

  const handleColumnSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useLayoutEffect(() => {
    return () => {
      if (location.state) {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          category: location.state,
        }));
      }
    };
  }, [user.users]);

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      const role = JSON.parse(localStorage.getItem("user_data")).role;
    }
  }, []);

  useEffect(() => {
    console.log("ASdasd",user)
    if (user.users.length > 0) {
      toast.success("User data loaded successfully!");
    }
  }, [user.users]);

  const isLoading = !user.users;

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(
        userData({
          page: currentPage,
          searchQuery: searchQuery,
          selectedFilters: selectedFilters,
          sortColumn: sortColumn,
          sortDirection: sortDirection,
        })
      );
      console.log("dispatch");
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [
    dispatch,
    currentPage,
    searchQuery,
    selectedFilters,
    sortColumn,
    sortDirection,
    type,
    showModalCreate
  ]);

  return (
    <React.Fragment>
      <Header></Header>

      {circularProgress == true ? <CircularLoader></CircularLoader> : <></>}
      <ToasterGen></ToasterGen>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-white">
        <div
          className={` ${
            sideMenuShow == true ? "col-span-1 w-full" : "lg:col-span-0 "
          }   lg:flex bg-white `}
        >
          <SideMenu setSideMenuShow={setSideMenuShow} />
        </div>

            { 
                showModalCreate ? <CreateUser
                props={setShowModalCreate}

                ></CreateUser>:<></>
            }
        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-9" : "lg:col-span-10"
          } bg-transparent w-full`}
        >
          <div className="relative w-full  bg-white">
            <div className="flex flex-col h-auto p-4 md:p-8 text-center">
              <p className="font-bold   text-4xl  md:text-lg text-[#20253F]  font-Poppins font-Poppins mb-2">
                User Data
              </p>
              <p className="font-normal text-[#848E9C]  text-sm md:text-base leading-6 font-Poppins"></p>
            </div>
          </div>

          <div className="m-auto w-4/5 font-Poppins">
            <div className="flex flex-col">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="relative w-full"></div>
                Filters
                <form className="">
                  <div className=" flex justify-end w-full">
                    {" "}
                    {filter == true ? (
                      <TiArrowSortedUp
                        onClick={() => setFilter(false)}
                      ></TiArrowSortedUp>
                    ) : (
                      <TiArrowSortedDown onClick={() => setFilter(true)} />
                    )}
                  </div>

                  <div
                    className={`${
                      filter
                        ? "block transition duration-300 ease-in-out"
                        : "transition duration-500 ease-in-out hidden"
                    }`}
                  >
                    <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                      <svg
                        className="absolute left-2 block h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" className=""></circle>
                        <line
                          x1="21"
                          y1="21"
                          x2="16.65"
                          y2="16.65"
                          className=""
                        ></line>
                      </svg>
                      <input
                        type="name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        name="search"
                        className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        placeholder="Search by Name"
                      />
                    </div>
                    <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                    
                    </div>
                  </div>
                </form>
                <button onClick={(e)=>{e.preventDefault();setShowModalCreate(true);}} className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">
                        Create User
                      </button>
              </div>
            </div>
          </div>

          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4"></div>
          </div>

          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4"></div>
          </div>

          <div className="mt-0 bg-white  grid-cols-1 sm:grid-cols-5 gap-2  left-0 px-7  ">
            <div className={` col-span-5 `}>
              <UserDetails
                handleColumnSort={handleColumnSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                currentItems={user.users.users}
                deletedState={setDeletedState}
                typeNew={setType}
                dispatch={dispatch}
              ></UserDetails>
            </div>
          </div>
          <div className=" flex justify-end bg-white  gap-2 sm:px-2 md:px-16 lg:px-28 xl:px-28 2xl:px-28 px-2">
            <div className="flex flex-col ">
              <div className="flex flex-1 mb-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="font-Poppins  px-3 py-1 font-medium rounded bg-white  text-maincolor  md:mb-0 mr-2"
                >
                  <FaAngleLeft />
                </button>
                <div className="italic  ">{getPages()}</div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="font-Poppins px-3 py-1 font-medium rounded bg-white text-maincolor"
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer>+</Footer>
    </React.Fragment>
  );
};
export default UserList;
