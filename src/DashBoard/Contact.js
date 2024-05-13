
import { useFormik } from "formik";

import Header from "../Container/Header";
import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { contactData } from "../helpers/AuthStore/contactSlice";
import { useSelector, useDispatch,useCallback } from "react-redux";
import { useLayoutEffect, useEffect, useState, useMemo } from "react";
import Select from "react-select";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import GetApiData from "../helpers/getApiData";
import axios from "axios";

import ContactDetails from "./ContactDetails";
// import "./Dashboard.css";3

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

import { CircularLoader } from "./CircularLoader";
import Dropzone from "react-dropzone";
import postApiData from '../helpers/postApiData';
import { AiOutlineUpload } from "react-icons/ai";
import * as XLSX from "xlsx";


import { useNavigate } from "react-router-dom";

import SideMenu from "../Container/SideMenu";
import EditContact from "./EditContact";

import Footer from "../Container/Footer";
import ToasterGen from "../Container/ToasterGen";

const Contact = () => {
  const navigate = useNavigate();
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
  const [deletedState,setDeletedState] = useState(0);
  const [filter,setFilter] = useState(true);

  const [file, setFile] = useState(null);

const [sideMenuShow,setSideMenuShow] = useState(false);
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
    console.log(e.target.files)

    setFile(e.target.files[0]);
  };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);



// setCircularProgress(true);
// console.log('Uploading');

//       const response = await axios.post('http://localhost:5001/contact/upload', formData);
//       setCircularProgress(false);


//       console.log('File uploaded successfully:', response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setCircularProgress(false);
      

//     }
//   };

  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (user) {
      const userrole = JSON.parse(localStorage.getItem("user_data")).role;

     
    }
  }, []);




  
  const handleUpload =async(acceptedFiles) => {
    console.log(acceptedFiles);
    const fileReader = new FileReader();
    try {
      setCircularProgress(true);
console.log('Uploading');
const formData = new FormData();
formData.append('file', acceptedFiles[0]);

      const response = await axios.post('http://localhost:5001/contact/upload', formData);
      
      setCircularProgress(false);


      console.log('File uploaded successfully:', response.data);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error('Error uploading file:', error);
      setCircularProgress(false);
      


      
    };

    fileReader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const result = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(result);
      
  }
}

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

  const itemsPerPage = 100;
  const filteredcontact = contact.contacts.contact
    ? contact.contacts.contact.filter((item) => {
      let isNameMatch = "";
    if (item.name)
    {
       isNameMatch = item.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
    }

        const isWebsiteMatch =
          selectedFilters.Website == "" ||
          !selectedFilters.Website ||
          (item.Website &&
            item.Website.toString() === selectedFilters.Website);

        return isWebsiteMatch && isNameMatch;
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredcontact.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  let totalPages = Math.ceil(contact.contacts.contactCount/itemsPerPage);
  const [options, setOptions] = useState([]);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const NfilteredContact = useMemo(() => {
    if (!contact.contacts) return [];

    return currentItems.filter((item) => {
      const isNameMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

     

      return  isNameMatch;
    });
  }, [currentItems, selectedFilters]);

  useEffect(() => {
    async function fetchData() {
   

      const data = await GetApiData("contact/get_filters", "");

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
      setOptions((prev) => ({ ...prev, country: results6 }));

      let results7 = [];
      results7.push({ key: 0, value: "" });
      data.companyName.map((value, index) => {
        results7.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, companyName: results7 }));


      let results8 = [];
      results8.push({ key: 0, value: "" });
      data.role.map((value, index) => {
        results8.push({ value: index, label: value });
      });
      setOptions((prev) => ({ ...prev, role: results8 }));



      

      let results10 = [];
      results10.push({ key: 0, value: "" });
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




    }

    fetchData();
  }, [contact.contacts]);

  const getPages = () => {
    const maxVisiblePages = 5;
    const sidePages = Math.floor((maxVisiblePages - 3) / 2);
    const pages = [];

    pages.push(
      <button
        onClick={() => handlePageChange(1)}
        className={`px-3  py-1 font-bold rounded font-dmsans mx-1 italic  ${
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
          className={` px-3  mx-1 py-1 font-bold rounded font-dmsans     ${
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

    pages.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`px-3 py-1 font-bold rounded font-dmsans mx-1 italic ${
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


  const optionsElement = (value) => {
    switch (value) {
      case "name":
        return (
          options.name &&
          options.name.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins"
              value={option.value}
            >
              {option.value}
            </option>
          ))
        );
        
      case "website":
        return  (
          options.website &&
          options.website.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
      case "industry":
        return  (
          options.industry &&
          options.industry.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
      case "industry2":
        return (
          options.industry2 &&
          options.industry2.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );

      case "Region":
        return (
          options.Region &&
          options.Region.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
      case "country":
        return (
          options.country &&
          options.country.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
      case "companyName":
        return (
          options.companyName &&
          options.companyName.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
      case "companyLinkedIn":
        return (
          options.companyLinkedIn &&
          options.companyLinkedIn.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
        case "role":
        return (
          options.role &&
          options.role.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
        case "quality":
        return (
          options.quality &&
          options.quality.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
        case "result":
        return (
          options.result &&
          options.result.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );
        case "free":
        return (
          options.free &&
          options.free.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
        );

        case "date":
        return (
          options.date &&
          options.date.map((option) => (
            <option
              key={option.value}
              className="scrollbar-thumb-maincolor text-Poppins text-md"
              value={option.label}
            >
              {option.label}
            </option>
          ))
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
 
    console.log(selected)

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
  }, [contact.contacts.contact]);

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      const role = JSON.parse(localStorage.getItem("user_data")).role;
    
    }
  }, []);

  // useEffect(() => {
  //   dispatch(contactData());
  // }, [circularProgress]);

  // useEffect(() => {
  //   dispatch(contactData());
  //   console.log("asdasdasd");
  // }, [deletedState]);


  useEffect(() => {
 
    if (contact.contacts.length > 0) {
      toast.success("Contact data loaded successfully!");
    }
  }, [contact.contacts]);

  const isLoading = !contact.contacts;

  useEffect(() => {
    let timer = setTimeout(() =>{
      dispatch(
        contactData ({
          page: currentPage,
          searchQuery: searchQuery,
          selectedFilters: selectedFilters,
          sortColumn: sortColumn,
          sortDirection: sortDirection,
        })
      );
      console.log("dispatch")
    },500);
    return (()=>{
        clearTimeout(timer);  
    });

    
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

{
  circularProgress == true ?
<CircularLoader>

</CircularLoader>:<></>
}
      <ToasterGen>
        
      </ToasterGen>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-white">

      
        <div className={` ${sideMenuShow == true ? 'col-span-1 w-full' :  'lg:col-span-0 '}   lg:flex bg-white `}>

          <SideMenu setSideMenuShow={setSideMenuShow}  />
        </div>

        





        <div className={` ${sideMenuShow == true ? 'lg:col-span-9' :  'lg:col-span-10' } bg-transparent w-full`}>



      <div className="relative w-full  bg-white">
        <div className="flex flex-col h-auto p-4 md:p-8 text-center">
          <p className="font-bold   text-4xl  md:text-lg text-green-600  font-Poppins font-dmsans mb-2">
          Contact Data
            
          </p>
          <p className="font-normal text-[#848E9C]  text-sm md:text-base leading-6 font-dmsans">
         
          </p>
        </div>
      </div>

{/* 

      <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4"></div>
                <Dropzone onDrop={handleUpload} accept=".xls, .xlsx, .csv">
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className=" flex items-center  justify-center  font-semibold  lg:w-32 md:w-32 w-full sm:w-32 xl:w-32 2xl:w-32  border h-12 bg-[#0ECB81] text-maincolor border-[#0ECB81] text-md p-2 rounded-lg mb-6 hover:bg-[#0ECB81] hover-text-white"
                    >
                    <input {...getInputProps()} />
                    <AiOutlineUpload></AiOutlineUpload> <p>Uplift</p>
                  </div>
                )}
              </Dropzone>
              </div> */}







<div className="m-auto w-4/5 font-Poppins">

  <div className="flex flex-col">
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">

    <div class="relative w-full">
            

            <div class="items-center justify-center max-w-xl mx-auto">
        
              <Dropzone onDrop={handleUpload} accept=".xls, .xlsx, .csv">
                        {({ getRootProps, getInputProps }) => (
                          <div
                            {...getRootProps()}
                            className="  "
                            >
                              
                            {/* <input {...getInputProps()} />
                             */}
                            {/* <AiOutlineUpload></AiOutlineUpload>  */}
                            <label class="flex justify-center w-full h-32 px-4   bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 ease-in-out" id="drop">
                              <span class="flex items-center space-x-2">
                              
                              <span class="font-medium text-gray-600">Drop files to Attach, or<span class="text-green-600 underline ml-[4px]">browse</span></span></span>
                             </label>
        
        
                              
                          </div>
                        )}
                      </Dropzone>
        
            </div>
          </div>



      Filters
      <form className="">
        <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
          <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" className=""></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
          </svg>
          <input type="name"
          
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}

          name="search" className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by Name etc" />
        </div>
       <div className=" flex justify-end w-full"> {filter == true ?  <TiArrowSortedUp onClick={() => setFilter(false)} ></TiArrowSortedUp> :<  TiArrowSortedDown onClick={() => setFilter(true)} />}</div>
         
         


       <div className={`${filter ? "block transition duration-300 ease-in-out" : "transition duration-500 ease-in-out hidden"}`}>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-col">
            <label for="name" className="text-sm font-medium text-stone-600">Name</label>
            <input type="text" id="name" placeholder="Raspberry juice" className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>

          <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Industry</label>

            <select id="status"
                onChange={(e) => handleSelect("industry", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("industry")}
                </select>
          </div>














       
          <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Company Name</label>

            <select id="status"
                onChange={(e) => handleSelect("companyName", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("companyName")}
                </select>
          </div>


          {/* <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Industry 2</label>

            <select id="status"
                onChange={(e) => handleSelect("industry2", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("industry2")}
                </select>
          </div> */}

          <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Date</label>

            <select id="status"
                onChange={(e) => handleSelect("date", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("date")}
                </select>
          </div>
          <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Quality</label>

            <select id="status"
                onChange={(e) => handleSelect("quality", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("quality")}
                </select>
          </div>

          <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Role</label>

            <select id="status"
                onChange={(e) => handleSelect("role", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("role")}
                </select>
          </div>

          <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Industry 2</label>

            <select id="status"
                onChange={(e) => handleSelect("industry2", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("industry2")}
                </select>
          </div>


          <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Country</label>

            <select id="status"
                onChange={(e) => handleSelect("country", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("country")}
                </select>
          </div>


          {/* <div className="flex flex-col">
            <label for="manufacturer" className="text-sm font-medium text-stone-600">Region</label>

            <select id="status"
                onChange={(e) => handleSelect("region", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("region")}
                </select>
          </div> */}



          <div className="flex flex-col">
            <label for="status" className="text-sm font-medium text-stone-600">Website</label>

                <select id="status"
                onChange={(e) => handleSelect("website", e.target.value)}
                className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                 { optionsElement("website")}
                </select>


{/* 

            <Select
                  isSearchable={true}
                  options={optionsElement("website")}
                  placeholder="Select Website" // Set the placeholder text
           
                  isMulti={false}
                  onChange={(selected) => handleSelect("website", selected)}
                  className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
           
                > 
                
                </Select> */}

                
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
          <button className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">Reset</button>
          
        </div>

        </div>
      </form>
    </div>
  </div>
  
</div>


  



  

      <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
              {/* <div className="relative mb-4 sm:mb-0 sm:w-full md:w-64 mt-6">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Company"
                    className="bg-white  text-maincolor     h-14 border border-gray-600  text-base rounded-lg focus:ring-maincolor focus:border-maincolor block w-full pl-10 pr-10 p-2.5 focus:outline-none focus:ring-0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AiOutlineSearch className="w-5 h-5 text-maincolor dark:text-maincolor" />
                  </div>
                </div>
              </div> */}



{/* 
              <div className="md:w-56 ml-0 mt-2  md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("companyName")}
                  placeholder="Select Company" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("companyName", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>

          

              <div className="md:w-56 ml-0   mt-2  md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("industry2")}
                  placeholder="Select Industry 2" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("industry2", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div> */}
            </div>
          </div>


          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
          {/* <div className="md:w-56 ml-0  mt-2 md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("name")}
                  placeholder="Select Name" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("name", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>

              <div className="md:w-56 ml-0  mt-2  md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("website")}
                  placeholder="Select Website" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("website", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>

              <div className="md:w-56 ml-0  mt-2  md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("industry")}
                  placeholder="Select Industry 1" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("industry", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div> */}
              </div>

              </div>
              

{/* 
          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
              <div className="md:w-56 ml-0  mt-2   md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("country")}
                  placeholder="Select country" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("country", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>

              <div className="md:w-56 ml-0  mt-2   md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  selectedOptions={selectedOptions}
                  options={optionsElement("Region")}
                  placeholder="Select Region" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("Region", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>

              <div className="md:w-64 ml-0   mt-2  md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("companyLinkedIn")}
                  placeholder="Select  LinkedIn" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) =>
                    handleSelect("companyLinkedIn", selected)
                  }
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>




            </div>



          </div> */}



          
{/* 
          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
              <div className="md:w-56 ml-0  mt-2   md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("date")}
                  placeholder="Select Date" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("date", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>






            </div>



          </div>
 */}

          {/* <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
              <div className="md:w-56 ml-0  mt-2   md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("quality")}
                  placeholder="Select Quality" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("quality", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>

              <div className="md:w-56 ml-0  mt-2   md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  selectedOptions={selectedOptions}
                  options={optionsElement("role")}
                  placeholder="Select Role" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("role", selected)}
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>

              <div className="md:w-64 ml-0   mt-2  md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("result")}
                  placeholder="Select  Result" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) =>
                    handleSelect("result", selected)
                  }
                  className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                ></Select>
              </div>





            </div>



          </div>
           */}




      <div className="mt-0 bg-white  grid-cols-1 sm:grid-cols-5 gap-2  left-0 px-7  ">
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
          ></ContactDetails   >
        </div>
      </div>
      <div className=" flex justify-end bg-white  gap-2 sm:px-2 md:px-16 lg:px-28 xl:px-28 2xl:px-28 px-2">
        <div className="flex flex-col ">
          <div className="flex flex-1 mb-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="font-dmsans  px-3 py-1 font-medium rounded bg-white  text-maincolor  md:mb-0 mr-2"
            >
              <FaAngleLeft />
            </button>
            <div className="italic  ">{getPages()}</div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="font-dmsans px-3 py-1 font-medium rounded bg-white text-maincolor"
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
export default Contact;
