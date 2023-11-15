
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
// import "./Dashboard.css";
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
  const [deletedState,setDeletedState] = useState();
const [sideMenuShow,setSideMenuShow] = useState(true);
  function handleScroll() {
    window.scroll({
      top: document.body.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }




  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);



setCircularProgress(true);


      const response = await axios.post('http://localhost:5001/contact/upload', formData);
      setCircularProgress(false);


      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setCircularProgress(false);
      

    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (user) {
      const userrole = JSON.parse(localStorage.getItem("user_data")).role;

     
    }
  }, []);



  
  // const handleUpload = (acceptedFiles) => {
  //   const fileReader = new FileReader();
  //   fileReader.onload = function (e) {
  //     const arrayBuffer = e.target.result;
  //     const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const result = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //     setData(result);
  //   };


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

  const itemsPerPage = 10;
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

  let totalPages = Math.ceil(filteredcontact.length / itemsPerPage);
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
      setOptions((prev) => ({ ...prev, Country: results6 }));

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
        className={`px-3 py-1 font-bold rounded font-dmsans mx-1 italic  ${
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
          className={` px-3 py-1 font-bold rounded font-dmsans     ${
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
        return options.name;
      case "website":
        return options.website;
      case "industry":
        return options.industry;
      case "industry2":
        return options.industry2;
      case "Region":
        return options.Region;
      case "Country":
        return options.Country;
      case "companyName":
        return options.companyName;
      case "companyLinkedIn":
        return options.companyLinkedIn;
        case "role":
        return options.role;
        case "quality":
        return options.quality;
        case "result":
        return options.result;
        case "free":
        return options.free;

        case "date":
        return options.date;
        

        
        
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
      case "industry1":
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

  function handleSelect(option, selected) {
 

    handleFilter(option, selected.label);

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

  useEffect(() => {
    dispatch(contactData());
  }, [circularProgress]);

  useEffect(() => {
    dispatch(contactData());
    console.log("asdasdasd");
  }, [deletedState]);


  useEffect(() => {
 
    if (contact.contacts.length > 0) {
      toast.success("Contact data loaded successfully!");
    }
  }, [contact.contacts]);

  const isLoading = !contact.contacts;

  useEffect(() => {
    dispatch(
      contactData ({
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

{
  circularProgress == true ?
<CircularLoader>

</CircularLoader>:<></>
}
      <ToasterGen>
        
      </ToasterGen>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-white">

      
        <div className={` ${sideMenuShow == true ? 'lg:col-span-2 w-full' :  'lg:col-span-0 '}   lg:flex bg-white `}>

          <SideMenu  />
        </div>

        





        <div className={` ${sideMenuShow == true ? 'lg:col-span-8' :  'lg:col-span-10' } bg-background-main w-full`}>



      <div className="relative w-full  bg-white">
        <div className="flex flex-col h-auto p-4 md:p-8 text-center">
          <p className="font-bold  text-4xl  md:text-lg text-maincolor font-dmsans mb-2">
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
<div 
 className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4"
>
    </div>



    <div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">


            
      <button 
      
         onClick={handleUpload}>

<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>


         </button>



            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> </p>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">XLSX</p>
        </div>
        <input type="file" onChange={handleFileChange}  />
    </label>
</div> 



  



  

      <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
              <div className="relative mb-4 sm:mb-0 sm:w-full md:w-64 mt-6">
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
              </div>




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
              </div>
            </div>
          </div>


          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
          <div className="md:w-56 ml-0  mt-2 md:mt-0 md:ml-4">
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
              </div>
              </div>

              </div>
              


          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-end justify-start mx-2 sm:mx-4">
              <div className="md:w-56 ml-0  mt-2   md:mt-0 md:ml-4">
                <Select
                  isSearchable={true}
                  options={optionsElement("Country")}
                  placeholder="Select Country" // Set the placeholder text
                  styles={customStyles}
                  isMulti={false}
                  onChange={(selected) => handleSelect("Country", selected)}
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



          </div>



          

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


          <div className="relative w-full bg-white sm:h-28 items-center px-6 sm:px-12">
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
          




      <div className="mt-0 bg-white grid grid-cols-1 sm:grid-cols-5 gap-2 sm:px-2 md:px-16 lg:px-28 xl:px-28 2xl:px-28 px-2">
        <div
          className={`w-full col-span-4 ${
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
            <div className="italic ">{getPages()}</div>

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
