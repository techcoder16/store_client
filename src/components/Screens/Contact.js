import { useFormik } from "formik";

import Header from "../../Container/Header";
import React from "react";
import { contactData } from "../../helpers/AuthStore/contactSlice";
import { useSelector, useDispatch, useCallback } from "react-redux";
import { useLayoutEffect, useEffect, useState, useMemo,useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import useAuthScreenCheck from "../../utils/useAuthScreenCheck";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import ScreenRights from "../../utils/ScreenRights";
import { useLocation } from "react-router-dom";
import GetApiData from "../../helpers/getApiData";
import axios from "axios";
import CustomSelect from "../../utils/CustomSelect";
import ContactDetails from "./ContactDetails";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { CircularLoader } from "../../utils/CircularLoader";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import SideMenu from "../../Container/SideMenu";
import Footer from "../../Container/Footer";
import ToasterGen from "../../Container/ToasterGen";
import env from "react-dotenv";

const Contact = () => {
  const [circularProgress, setCircularProgress] = useState(false);
  const dispatch = useDispatch();
  let contact = useSelector((state) => state.contact);
  const [selectedOptions, setSelectedOptions] = useState();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(true);
  const [type, setType] = useState("buyer");
  const [deletedState, setDeletedState] = useState(0);
  const [filter, setFilter] = useState(true);

  const [file, setFile] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState();
  const [position, setPosition] = useState(false);
  
  const theadRef = useRef(null);
 

  useEffect(() => {
    console.log("Effect is running");

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


  const user_id = JSON.parse(localStorage.getItem("user_data"))._id;
  const screen_name = "/contacts";

  const checkRights = useAuthScreenCheck(user_id, screen_name);

  const [searchedFilters, setSearchedFilters] = useState({});

  const [sideMenuShow, setSideMenuShow] = useState(false);
  function handleScroll() {
    window.scroll({
      top: document.body.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    dispatch(contactData());
  }, [deletedState]);

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (user) {
      const userrole = JSON.parse(localStorage.getItem("user_data")).role;
    }
  }, []);
  const clearFiltersData = () => {
    // Reset search query
   
    // If you had additional filters, reset them similarly
  };
  
  const handleUpload = async (acceptedFiles) => {
    
    const fileReader = new FileReader();
    try {
      setCircularProgress(true);
      
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const response = await axios.post(
        env.API_URL  +  "contact/upload",
        formData
      );

      setCircularProgress(false);

      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
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

  //   fileReader.readAsArrayBuffer(acceptedFiles[0]);

  //   if(data.length > 0)
  //   {
  //     postApiData("contact/uplift_data",{data:data});

  //   }

  // };

  function handleSelect(selected) {
    handleWebsiteFilter(selected.label);
    setSelectedOptions(selected);
  }
  const [selectedFilters, setSelectedFilters] = useState({
    Website: "",
  });

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDark ? "#F5F5F5" : "#06040A",
      borderColor: "#F5F5F5",
      borderRadius: "3px",
      fontSize: "14px",

      backgroundColor: "#F5F5F5",
      padding: "1px",
      boxShadow: state.isFocused ? "0 0 0 0 #F5F5F5" : "none",
      fontFamily: "Poppins, sans-serif",

      color: "#F5F5F5",
      "&:hover": {
        borderColor: "#06040A",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#006400",
        height: "20px",
      },
      input: {
        color: "white",
      },

      height: "1px", // Set the height of the select box
    }),
    input: (provided) => ({
      ...provided,
      color: "#F5F5F5", // Set the input text color to white
      fontFamily: "Poppins, sans-serif", // Set the font family to Poppins
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#F5F5F5" : "white",
      color: state.isFocused ? "white" : "black",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#000000",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#000000",
      borderRadius: "4px",
      color: "#000000",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#000000",
      fontSize: "14px",
      color: "#000000",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#F5F5F5",
      "&:hover": {
        backgroundColor: "#140D1E",
        color: "#000000",
        color: "#000000",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000000", // Set the placeholder color to white
    }),
  };
  function handleSearch(option,selected){

    
    handleSearchFilter(option, selected);

setSelectedSearch(selected);

}


  const itemsPerPage = 10;
  const filteredcontact = contact.contacts.contact
    ? contact.contacts.contact.filter((item) => {
        let isNameMatch = "";
        if (item.name) {
          isNameMatch = item.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }

        const isWebsiteMatch =
          selectedFilters.Website == "" ||
          !selectedFilters.Website ||
          (item.Website && item.Website.toString() === selectedFilters.Website);

        return isWebsiteMatch && isNameMatch;
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredcontact.slice(indexOfFirstItem, indexOfLastItem);

  let totalPages = Math.ceil(contact.contacts.contactCount / itemsPerPage);
  const [options, setOptions] = useState([]);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const NfilteredContact = useMemo(() => {  
    if (!contact.contacts) return [];

    return currentItems.filter((item) => {
      const isNameMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return isNameMatch;
    });
  }, [currentItems, selectedFilters]);

  useEffect(() => {
    async function fetchData() {
      const filteredFilters = Object.fromEntries(
        Object.entries(searchedFilters).filter(([key, val]) => val != null && val.trim() !== "")
      );
      const queryString = encodeURIComponent(JSON.stringify(filteredFilters));
 
      // const data = await axios.get(
      //   `${env.API_URL}company/get_filters/${queryString}`
      // );
      let data = {}; 
      try{

       data = await GetApiData(`contact/get_filters/${queryString}`, "");
      }
      catch(err)
      {

      }

      let results = [];
      results.push({ key: 0, value: "" });
      data && data.name.map((value, index) => {
        results.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, name: results }));

      let results1 = [];
      results1.push({ key: 0, value: "" });
      data &&   data.website.map((value, index) => {
        results1.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, website: results1 }));

      let results2 = [];
      results2.push({ key: 0, value: "" });
      data &&    data.industry.map((value, index) => {
        results2.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, industry: results2 }));

      let results3 = [];
      results3.push({ key: 0, value: "" });
      data &&     data.industry2.map((value, index) => {
        results3.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, industry2: results3 }));

      let results4 = [];
      results4.push({ key: 0, value: "" });
      data &&    data.companyLinkedIn.map((value, index) => {
        results4.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, companyLinkedIn: results4 }));

      let results5 = [];
      results5.push({ key: 0, value: "" });
      data &&   data.Region.map((value, index) => {
        results5.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, Region: results5 }));

      let results6 = [];
      results6.push({ key: 0, value: "" });
      data &&   data.Country.map((value, index) => {
        results6.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, country: results6 }));

      let results7 = [];
      results7.push({ key: 0, value: "" });
      data &&   data.companyName.map((value, index) => {
        results7.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, companyName: results7 }));

      let results8 = [];

      data &&    data.role.map((value, index) => {
        results8.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, role: results8 }));

      let results10 = [];

      data.quality.map((value, index) => {
        results10.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, quality: results10 }));

      let results11 = [];
      results11.push({ key: 0, value: "" });
      data.result.map((value, index) => {
        results11.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, result: results11 }));

      let results12 = [];
      results12.push({ key: 0, value: "" });
      data.free.map((value, index) => {
        results12.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, free: results12 }));

      let results13 = [];
      results13.push({ key: 0, value: "" });
      data.date.map((value, index) => {
        results13.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, date: results13 }));
     
      let results14 = [];
      

      data.empcount.map((value, index) => {
        results14.push({ value: index, label: value });
      });


      setOptions((prev) => ({ ...prev, empcount: results14 }));


      let results15 = [];
      

      data.city.map((value, index) => {
        results15.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, city: results15 }));




    }


    fetchData();
  }, [contact.contacts,searchedFilters]);





  const handleSearchFilter = (option, value) => {

    switch (option) {
      
      case "name":
        setSearchedFilters( {name: value });
        break;

      case "website":
        setSearchedFilters( {website: value });
        break;
      case "industry":
        setSearchedFilters( {industry: value });
        break;
      case "industry2":
        setSearchedFilters( {industry2: value });
        break;

      case "Region":
        setSearchedFilters( {Region: value });
        break;
      case "country":
        setSearchedFilters( {country: value });
        break;
      case "companyName":
        setSearchedFilters( {companyName: value });
        break;
      case "companyLinkedIn":
        setSearchedFilters( {companyLinkedIn: value });
        break;
      case "role":
        setSearchedFilters( {role: value });
         
      case "city":
        setSearchedFilters( {city: value });
      case "quality":
        setSearchedFilters( {quality: value });
      case "result":
        setSearchedFilters( {result: value });
        case "empcount":
          setSearchedFilters( {empcount: value });
      case "free":
        setSearchedFilters( {free: value });
      case "date":
        setSearchedFilters( {date: value });
    }


      }
      
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

  const optionsElement = (value) => {
    switch (value) {
      case "name":
        return (
          options.name
        );

      case "website":
        return (
          options.website 
        );
      case "industry":
        return (
          options.industry 
        );
      case "industry2":
        return (
          options.industry2 
        );
        case "city":
          return (
            options.city 
          );

      case "Region":
        return (
          options.Region 
        );
      case "country":
        return (
          options.country 
        );
      case "companyName":
        return (
          options.companyName 
        );
      case "companyLinkedIn":
        return (
          options.companyLinkedIn
        );
      case "role":
        return (
          options.role  &&  options.role.map((option,index) => (
              <option
                key={index}
                className="scrollbar-thumb-maincolor text-Poppins text-md"
                value={option.label}
              >
                {option.label}
              </option>
            ))
        );
      case "quality":
        return (
          options.quality &&  options.quality.map((option,index) => (
            <option
              key={index}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
      case "result":
        return (
          options.result 
        );
        case "empcount":
        return (
          options.empcount
        );
        
      case "free":
        return (
          options.free
        );

      case "date":
        return (
          options.date 
        );
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
      case "country":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          country: value,
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
      case "date":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          date: value,
        }));
        break;
      case "free":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          date: value,
        }));
        break;

        case "city":
          setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            city: value,
          }));
          break;

        case "empcount":
          setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            empcount: value,
          }));
          break;
      case "result":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          result: value,
        }));
        break;
      case "quality":
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          quality: value,
        }));
        break;
    }
  };

  function handleSelect(option, selected) {

    handleFilter(option, selected);

    setSelectedOptions(selected);
  }

  const sortedItems = NfilteredContact.sort((a, b) => {
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
  const [filters, setFilters] = useState({
    quality: [],
    role: [],
    // other filters
  });

  const handleCheckboxChange = (option, selected) => {
    
    handleFilter(option, selected);
    setSelectedOptions(selected);
  };

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
      industry:"",
      industry2:"",
      country:"",


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
  }, [contact.contacts.contact]);

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      const role = JSON.parse(localStorage.getItem("user_data")).role;
    }
  }, []);

  useEffect(() => {
    if (contact.contacts.length > 0) {
      toast.success("Contact data loaded successfully!");
    }
  }, [contact.contacts]);

  const isLoading = !contact.contacts;

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(
        contactData({
          page: currentPage,
          searchQuery: searchQuery,
          selectedFilters: selectedFilters,
          sortColumn: sortColumn,
          sortDirection: sortDirection,
        })
      );
      

      
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
  ]);

  return (
    <React.Fragment>
      <Header></Header>
    
      {circularProgress == true ? <CircularLoader></CircularLoader> : <></>}
      <ToasterGen></ToasterGen>
   {checkRights && checkRights == true ? (
         
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-[#F7FAFC] ">
        <div
          className={` ${
            sideMenuShow == true ? "col-span-1 w-full" : "lg:col-span-0 "
          }   lg:flex bg-[#F7FAFC] `}
        >
          <SideMenu setSideMenuShow={setSideMenuShow} />
        </div>

        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-9" : "lg:col-span-10"
          } bg-transparent w-full`}
        >
          <div className="relative w-full bg-[#F7FAFC] ">
            <div className="flex flex-col h-auto p-4 md:p-8 text-center">
              <p className="font-bold   text-4xl  md:text-lg text-[#20253F]   font-novasans mb-2">
                Contact Data
              </p>
              <p className="font-normal text-[#848E9C]  text-sm md:text-base leading-6 font-novasans"></p>
            </div>
          </div>

          <div ref={theadRef} className={`grid grid-cols-9 gap-2 items-start `}>  
            <div className=" lg:col-span-2 col-span-9  w-full font-novasans px-2 ">
              <div className="flex flex-col">
                <div className="rounded-xl border border-gray-200 bg-[#F7FAFC]  p-6 shadow-lg">
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
                  <form >
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
                    
                        <label
                          for="default-search"
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

                      <div className="">
                        <div className="flex flex-col">
                          <label
                            for="manufacturer"
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
                        </div>
{/* 
                        <div className="flex flex-col">
                          <label
                            for="manufacturer"
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
                        </div> */}

                        <div className="flex flex-col">
                          <label
                            for="manufacturer"
                            className="text-sm font-medium text-stone-600"
                          >
                            Date
                          </label>

                          <CustomSelect
          options={optionsElement("date")}
          onChange={(value) => handleSelect("date", value)}
          onInputChange={(value) => handleSearch("date", value)}
          placeholder="Select Date"
        />
                        </div>

                        {/* <div className="flex flex-col mt-2">
                          <label
                            for="manufacturer"
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
                        
                        </div> */}

                        <div className="flex flex-col">
                          <label
                            for="manufacturer"
                            className="text-sm font-medium text-stone-600"
                          >
                            Country
                          </label>

                         
                          <CustomSelect
          options={optionsElement("country")}
          onChange={(value) => handleSelect("country", value)}
          onInputChange={(value) => handleSearch("country", value)}
          placeholder="Select Country"
                        />
                        </div>

                        <div className="flex flex-col">
                          <label
                            for="status"
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
                        </div>

                        
                        <div className="flex flex-col">
                          <label
                            for="status"
                            className="text-sm font-medium text-stone-600"
                          >
                            City
                          </label>

                          <CustomSelect
          options={optionsElement("city")}
          onChange={(value) => handleSelect("city", value)}
          onInputChange={(value) => handleSearch("city", value)}
          placeholder="Select City"
                        />
                        </div>

                        {/* <div className="flex flex-col mt-2">
                          <label
                            htmlFor="quality"
                            className="text-sm font-medium text-stone-600"
                          >
                            Quality
                          </label>
                          <div id="quality" className="mt-2 block w-full">
                            {options.quality &&
                              options.quality.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    type="radio"
                                    id={`quality-${option.value}`}
                                    name="quality"
                                    value={option.label}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        "quality",
                                        e.target.value
                                      )
                                    }
                                    className="cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  />
                                  <label
                                    htmlFor={`quality-${option.value}`}
                                    className="ml-2 text-sm text-stone-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div> */}

                        {/* <div className="flex flex-col mt-2">
                          <label
                            htmlFor="role"
                            className="text-sm font-medium text-stone-600"
                          >
                            Role
                          </label>
                          <div id="role" className="mt-2 block w-full">
                            {options.role &&
                              options.role.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    type="radio"
                                    id={`role-${option.value}`}
                                    name="role"
                                    value={option.label}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        "role",
                                        e.target.value
                                      ) 
                                    }
                                    className="cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  />
                                  <label
                                    htmlFor={`role-${option.value}`}
                                    className="ml-2 text-sm text-stone-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>
 */}

                        <div className="flex flex-col mt-2">
                          <label
                            htmlFor="role"
                            className="text-sm font-medium text-stone-600"
                          >
                            Employee Count
                          </label>
                          <div id="empcount" className="mt-2 block w-full">
                              
                          <div id="empcount" className="mt-2 block w-full">
                            {options.empcount &&
                              options.empcount.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    type="radio"
                                    id={`empcount-${option.value}`}
                                    name="empcount"
                                    value={option.label}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        "empcount",
                                        e.target.value
                                      )
                                    }
                                    className="cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-[#20253F] focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  />
                                  <label
                                    htmlFor={`empcount-${option.value}`}
                                    className="ml-2 text-sm text-stone-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                          </div>
                              
                          </div>
                        </div>


                        
                      </div>

                      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex"></div>
                    </div>


    <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
      {/* Clear Filters Button */}
      <button
        type="button"
        onClick={clearFilters}
        className="w-full md:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Clear Filters
      </button>
    </div>


                  </form>
                </div>
              </div>
            </div>

            <div className=" lg:col-span-7 col-span-9 mt-0 bg-[#F7FAFC]   grid-cols-1 sm:grid-cols-5 gap-2  left-0  ">
              <div
                className={` col-span-4 ${
                  showFilters ? "col-span-5" : "col-span-5"
                }`}
              >
                <ContactDetails
                  handleColumnSort={handleColumnSort}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  currentItems={contact.contacts.contact}
                  deletedState={setDeletedState}
                  typeNew={type}
                  dispatch={dispatch}
                ></ContactDetails>
              </div>
            </div>
          </div>

          <div className=" flex justify-end bg-[#F7FAFC]  gap-2 sm:px-2 md:px-16 lg:px-28 xl:px-28 2xl:px-28 px-2">
            <div className="flex flex-col ">
              <div className="flex flex-1 mb-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="font-novasans  px-3 py-1 font-medium rounded bg-[#F7FAFC] text-maincolor  md:mb-0 mr-2"
                >
                  <FaChevronLeft />
                </button>
                <div className="italic  ">{getPages()}</div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="font-novasans px-3 py-1 font-medium rounded bg-[#F7FAFC] text-maincolor"
                >
                  <FaChevronRight />
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


      <Footer>+</Footer>
    </React.Fragment>
  );
};
export default Contact;
