import { useFormik } from "formik";

import Header from "../../Container/Header";
import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { companyData } from "../../helpers/AuthStore/companySlice";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState, useMemo } from "react";
import ScreenRights from "../../utils/ScreenRights";
import env from "react-dotenv";

import CustomSelect from "../../utils/CustomSelect";

import axios from "axios";
import { CircularLoader } from "../../utils/CircularLoader";
import Dropzone from "react-dropzone";

import * as XLSX from "xlsx";

import { toast } from "react-hot-toast";
import useAuthScreenCheck from "../../utils/useAuthScreenCheck";

import { useLocation } from "react-router-dom";
import GetApiData from "../../helpers/getApiData";
import CompanyDetails from "./CompanyDetails";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import SideMenu from "../../Container/SideMenu";

import Footer from "../../Container/Footer";
import ToasterGen from "../../Container/ToasterGen";

const Company = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let company = useSelector((state) => state.company);
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedSearch, setSelectedSearch] = useState();
  

  const [deletedState, setDeletedState] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(true);
  const [type, setType] = useState("buyer");
  const [sideMenuShow, setSideMenuShow] = useState(true);

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(true);
  const [circularProgress, setCircularProgress] = useState(false);
  const user_id = JSON.parse(localStorage.getItem("user_data"))._id;
  const screen_name = "/company";

  const checkRights = useAuthScreenCheck(user_id, screen_name);

  function handleScroll() {
    window.scroll({
      top: document.body.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }

 
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchedFilters, setSearchedFilters] = useState({});

  const itemsPerPage = 10;
  const filteredcompany = company.companys.company
    ? company.companys.company.filter((item) => {
        const isNameMatch = item.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const isWebsiteMatch =
          selectedFilters.Website == "" ||
          !selectedFilters.Website ||
          (item.Website && item.Website.toString() === selectedFilters.Website);

        return isWebsiteMatch && isNameMatch;
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredcompany.slice(indexOfFirstItem, indexOfLastItem);
  const handleUpload = async (acceptedFiles) => {
    
   


    const fileReader = new FileReader();
    try {
      setCircularProgress(true);

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
     
      const response = await axios.post(
        env.API_URL + "company/upload",
        formData
      );

      setCircularProgress(false);

      toast.success("File uploaded successfully");
    } catch (error) {
      
      setCircularProgress(false);
    }

    
    fileReader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const result = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(result);
    };
  };

  let totalPages = Math.ceil(company.companys.companyCount / itemsPerPage);
  const [options, setOptions] = useState({});

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const NfilteredCompany = useMemo(() => {
    if (!company.companys) return [];

    return currentItems.filter((item) => {
      const isNameMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const isWebsiteMatch =
        selectedFilters.Website === "" ||
        !selectedFilters.Website ||
        (item.Website && item.Website.toString() === selectedFilters.Website);

      return isWebsiteMatch && isNameMatch;
    });
  }, [currentItems, selectedFilters]);

  const optionsElement = (value) => {
    switch (value) {
      case "name":
        return (
          options.name 
          // &&
          // options.name.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
      case "website":
        return (
          options.website 
          // &&
          // options.website.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
      case "industry":
        return (
          options.industry 
          // &&
          // options.industry.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
      case "industry2":
        return (
          options.industry2
          //  &&
          // options.industry2.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
      case "Region":
        return (
          options.Region 
          // &&
          // options.Region.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
      case "country":
        return (
          options.Country 
          // &&
          // options.Country.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
      case "companyName":
        return (
          options.companyName
          //  &&
          // options.companyName.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );


      case "date":
        return (
          options.date 
          // &&
          // options.date.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
      case "companyLinkedIn":
        return (
          options.companyLinkedIn
          //  &&
          // options.companyLinkedIn.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );

      case "quality":
        return (
          options.quality 
          // &&
          // options.quality.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );

      case "role":
        return (
          options.role 
          // &&
          // options.role.map((option,index) => (
          //   <option
          //     key={index}
          //     className="scrollbar-thumb-maincolor text-Poppins text-md"
          //     value={option.label}
          //   >
          //     {option.label}
          //   </option>
          // ))
        );
    }
  };
  const handleSearchFilter = (option, value) => {
    switch (option) {
      case "name":
        setSearchedFilters( {name: value });
        break;
      case "website":
        setSearchedFilters({
          website: value,
        });
        break;
      case "industry":
        setSearchedFilters({
          industry: value,
        });

        break;
      case "industry2":
        setSearchedFilters({
          industry2: value,
        });
        break;
      case "Region":
        setSearchedFilters({
          Region: value,
        });
        break;
      case "Country":
        setSearchedFilters({

          Country: value,
        });
        break;
      case "companyName":
        setSearchedFilters({
          companyName: value,
        });
        break;
      case "companyLinkedIn":
        setSearchedFilters({
          companyLinkedIn: value,
        });
        break;
    }
  };

  const handleFilter = (option, value) => {
    switch (option) {
      case "name":
        setSelectedFilters((prevFilters) => ({ ...prevFilters, name: value }));
        break;
      case "website":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          website: value,
        }));
        break;
      case "industry":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          industry: value,
        }));

        break;
      case "industry2":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          industry2: value,
        }));
        break;
      case "Region":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          Region: value,
        }));
        break;
      case "Country":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,

          Country: value,
        }));
        break;
      case "companyName":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          companyName: value,
        }));
        break;
      case "companyLinkedIn":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          companyLinkedIn: value,
        }));
        break;
    }
  };
  function handleSearch(option,selected){

        handleSearchFilter(option, selected);
    
    setSelectedSearch(selected);

  }

  function handleSelect(option, selected) {
    
    handleFilter(option, selected);
    
    setSelectedOptions(selected);
  }

  useEffect(() => {
    async function fetchData() {
      const filteredFilters = Object.fromEntries(
        Object.entries(searchedFilters).filter(([key, val]) => val != null && val.trim() !== "")
      );
      const queryString = encodeURIComponent(JSON.stringify(filteredFilters));
 
     
      console.log(searchedFilters)
      const data = await GetApiData(`company/get_filters/${queryString}`, "");

      let results = [];
      results.push({ key: 0, value: "" });
      data.name.map((value, index) => {
        results.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, name: results }));

      let results1 = [];
      results1.push({ key: 0, value: "" });
      data.website.map((value, index) => {
        results1.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, website: results1 }));

      let results2 = [];
      results2.push({ key: 0, value: "" });
      data.industry.map((value, index) => {
        results2.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, industry: results2 }));

      let results3 = [];
      results3.push({ key: 0, value: "" });
      data.industry2.map((value, index) => {
        results3.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, industry2: results3 }));

      let results4 = [];
      results4.push({ key: 0, value: "" });
      data.companyLinkedIn.map((value, index) => {
        results4.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, companyLinkedIn: results4 }));

      let results5 = [];
      results5.push({ key: 0, value: "" });
      data.Region.map((value, index) => {
        results5.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, Region: results5 }));

      let results6 = [];
      results6.push({ key: 0, value: "" });
      data.Country.map((value, index) => {
        results6.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, Country: results6 }));

      let results7 = [];
      results7.push({ key: 0, value: "" });
      data.companyName.map((value, index) => {
        results7.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, companyName: results7 }));
    }

    fetchData();
  }, [company.companys,searchedFilters]);

  const getPages = () => {
    const maxVisiblePages = 5;
    const sidePages = Math.floor((maxVisiblePages - 3) / 2);
    const pages = [];

    pages.push(
      <button
        onClick={() => handlePageChange(1)}
        className={`px-3  py-1 font-bold rounded font-novasans mx-1    ${
          currentPage === 1
            ? " bg-transparent text-[#7E7E7E]"
            : " bg-transparent text-[#7E7E7E]"
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
          className={` px-3  mx-1 py-1 font-semibold rounded font-novasans     ${
            currentPage === page
              ? " bg-transparent text-[#7E7E7E]"
              : " bg-transparent text-[#7E7E7E]"
          }`}
        >
          {page}
        </button>
      );
    }

    if (addEndDots) {
      pages.push(
        <span key="end-dots" className="px-0 py-1 font-novasans  text-gray-600">
          of
        </span>
      );
    }

    pages.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`px-3 py-1 font-bold rounded font-novasans mx-1  ${
          currentPage === totalPages
            ? " bg-transparent text-[#7E7E7E]"
            : " bg-transparent text-[#7E7E7E]"
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

  const sortedItems = NfilteredCompany.sort((a, b) => {
    if (sortColumn === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortColumn === "Price") {
      return sortDirection === "asc"
        ? a.Payment - b.Payment
        : b.Payment - a.Payment;
    }
    return 0;
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleWebsiteFilter = (Website) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      Website,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      Website: "",
    });
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
  }, [company.companys.company]);

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      const role = JSON.parse(localStorage.getItem("user_data")).role;
      if (role == "admin") {
        navigate("/company");
      }
    }
  }, []);



  useEffect(() => {
    dispatch(companyData());
  }, [deletedState]);

  useEffect(() => {
    if (company.companys.length > 0) {
      toast.success("Company data loaded successfully!");
    }
  }, [company.companys]);

  const isLoading = !company.companys;

  useEffect(() => {

  
    dispatch(
      companyData({
        page: currentPage,
        searchQuery: searchQuery,
        selectedFilters: selectedFilters,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
      })
    );
  }, [
    dispatch,
    currentPage,
    searchQuery,
    selectedFilters,
    sortColumn,
    sortDirection,
  ]);

  return (
    <React.Fragment>
      <Header></Header>

      {circularProgress == true ? <CircularLoader></CircularLoader> : <></>}
      <ToasterGen></ToasterGen>
      {checkRights && checkRights == true ? (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-0  bg-[#F7FAFC] ">
          <div
            className={` ${
              sideMenuShow == true ? "lg:col-span-1 w-full" : "lg:col-span-0 "
            }   lg:flex bg-transparent `}
          >
            <SideMenu setSideMenuShow={setSideMenuShow} />
          </div>

          <div
            className={` ${
              sideMenuShow == true ? "lg:col-span-10" : "lg:col-span-10"
            }  bg-[#F7FAFC]  w-full`}
          >
            <div className="relative w-full   bg-[#F7FAFC] ">
              <div className="flex flex-col h-auto p-4 md:p-8 text-center">
                <p className="font-bold   text-4xl  md:text-lg text-[#20253F]  font-novasans  mb-2">
                  Company Data
                </p>
                <p className="font-normal text-[#848E9C]  text-sm md:text-base leading-6 font-novasans"></p>
              </div>
            </div>

            <div className="grid grid-cols-9 gap-2 items-start ">
              <div className=" lg:col-span-2 col-span-9  w-full font-novasans px-2">
                <div className="flex flex-col">
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <div className="relative w-full">
                      <div className="items-center justify-center max-w-xl mx-auto">
                        <Dropzone
                          onDrop={handleUpload}
                          accept=".xls, .xlsx, .csv"
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="  ">
                              <label
                                className="flex justify-center w-full h-32 px-4   bg-[#F7FAFC] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
                                id="drop"
                              >
                                <span className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-600">
                                    Drop files to Attach, or
                                    <span className="text-[#20253F] underline ml-[4px]">
                                      browse
                                    </span>
                                  </span>
                                </span>
                              </label>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                    Filters
                    <form className="">
                      <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                        <label
                          htmlFor="default-search"
                          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div class="relative">
                          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              class="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full p-4 ps-10 font-novasans text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search by Name..."
                            required  
                          />
                        </div>
                      </div>

                      <div className=" flex justify-end w-full">
                        {filter == true ? (
                          <TiArrowSortedUp
                            onClick={() => setFilter(false)}
                          ></TiArrowSortedUp>
                        ) : (
                          <TiArrowSortedDown onClick={() => setFilter(true)} />
                        )}
                      </div>

                      {/* <div
                        className={`${
                          filter
                            ? "block transition duration-300 ease-in-out"
                            : "transition duration-500 ease-in-out hidden"
                        }`}
                      >
                        <div className="flex flex-col">
                          <label
                            htmlFor="manufacturer"
                            className="text-sm font-medium text-stone-600"
                          >
                            Industry
                          </label>

                          <select
                            id="status"
                            onChange={(e) =>
                              handleSelect("industry", e.target.value)
                            }
                            className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            {optionsElement("industry")}
                          </select>
                        </div>

                        <label
                          htmlFor="manufacturer"
                          className="text-sm font-medium text-stone-600"
                        >
                          Company Name
                        </label>

                        <select
                          id="status"
                          onChange={(e) =>
                            handleSelect("companyName", e.target.value)
                          }
                          className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          {optionsElement("companyName")}
                        </select>

                        <label
                          htmlFor="manufacturer"
                          className="text-sm font-medium text-stone-600"
                        >
                          Industry 2
                        </label>

                        <select
                          id="status"
                          onChange={(e) =>
                            handleSelect("industry2", e.target.value)
                          }
                          className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          {optionsElement("industry2")}
                        </select>

                        <label
                          htmlFor="manufacturer"
                          className="text-sm font-medium text-stone-600"
                        >
                          Country
                        </label>

                        <select
                          id="status"
                          onChange={(e) =>
                            handleSelect("country", e.target.value)
                          }
                          className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          {optionsElement("country")}
                        </select>

        
                        <label
                          htmlFor="status"
                          className="text-sm font-medium text-stone-600"
                        >
                          Website
                        </label>

                        <select
                          id="status"
                          onChange={(e) =>
                            handleSelect("website", e.target.value)
                          }
                          className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          {optionsElement("website")}
                        </select>

                      

                        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex"></div>
                      </div> */}

<div
      className={`${
        filter
          ? "block transition duration-300 ease-in-out"
          : "transition duration-500 ease-in-out hidden"
      }`}
    >
      <div className="flex flex-col">
        <label
          htmlFor="industry"
          className="text-sm font-medium text-stone-600"
        >
          Industry
        </label>
        <CustomSelect
          options={optionsElement("industry")}
          onChange={(value) => handleSelect("industry", value)}
          onInputChange={(value) => handleSearch("industry", value)}
          placeholder="Select Industry"
        />

        <label
          htmlFor="companyName"
          className="text-sm font-medium text-stone-600"
        >
          Company Name
        </label>
        <CustomSelect
          options={optionsElement("companyName")}
          onChange={(value) => handleSelect("companyName", value)}
          onInputChange={(value) => handleSearch("companyName", value)}

          placeholder="Select Company Name"
        />

        <label
          htmlFor="industry2"
          className="text-sm font-medium text-stone-600"
        >
          Industry 2
        </label>
        <CustomSelect
          options={optionsElement("industry2")}
          onChange={(value) => handleSelect("industry2", value)}
          onInputChange={(value) => handleSearch("industry2", value)}
          placeholder="Select Industry 2"
        />

        <label
          htmlFor="country"
          className="text-sm font-medium text-stone-600"
        >
          Country
        </label>
        <CustomSelect
          options={optionsElement("country")}
          onChange={(value,label) => handleSelect("country", label  )}
          onInputChange={(value) => handleSearch("country", value)}
          
          placeholder="Select Country"
        />

        <label
          htmlFor="website"
          className="text-sm font-medium text-stone-600"
        >
          Website
        </label>
        <CustomSelect
          options={optionsElement("website")}
          onChange={(value) => handleSelect("website", value)}
          onInputChange={(value) => handleSearch("website", value)}

          placeholder="Select Website"
        />
        
        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex"></div>
      </div>
    </div>


                    </form>
                  </div>
                </div>
              </div>

              <div className=" lg:col-span-7 col-span-9 mt-0 bg-[#F7FAFC]   grid-cols-1 sm:grid-cols-5 gap-2  left-0 px-7  ">
                <div
                  className={`w-full col-span-4 ${
                    showFilters ? "col-span-5" : "col-span-5"
                  }`}
                >
                  
                  <CompanyDetails
                    handleColumnSort={handleColumnSort}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    currentItems={company.companys.company}
                    deletedState={setDeletedState}
                    typeNew={type}
                  ></CompanyDetails>
                </div>
              </div>
            </div>

            <div className=" flex justify-end bg-white  gap-2 sm:px-2 md:px-16 lg:px-28 xl:px-28 2xl:px-28 px-2">
              <div className="flex flex-col ">
                <div className="flex flex-1 mb-4">
                  <button
                  
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="font-novasans  px-3 py-1 font-medium rounded bg-white  text-maincolor  md:mb-0 mr-2"
                  >
                    <FaAngleLeft />
                  </button>
                  <div className="italic ">{getPages()}</div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="font-novasans px-3 py-1 font-medium rounded bg-white text-maincolor"
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : checkRights ? (
        <ScreenRights></ScreenRights>
      ) : (
        <></>
      )}
      <Footer></Footer>
    </React.Fragment>
  );
};
export default Company;
