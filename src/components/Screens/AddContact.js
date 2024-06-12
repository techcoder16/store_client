import React from "react";
import Header from "../../Container/Header";
import ToasterGen from "../../Container/ToasterGen";
import Footer from "../../Container/Footer";
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import { ValidateContactCreate } from "../../utils/validateAPI";
import DatePicker from "react-datepicker";
import SideMenu from "../../Container/SideMenu";
import Select from 'react-select';
import countryCityData from '../../utils/countries.json';
import useAuthScreenCheck from "../../utils/useAuthScreenCheck";
import ScreenRights from "../../utils/ScreenRights";

const AddContact = () => {
  const [sideMenuShow, setSideMenuShow] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState('');
  
  const [cities, setCities] = useState([]);
  const user_id = JSON.parse(localStorage.getItem("user_data"))._id;
  const screen_name = "/add_contacts";

  const checkRights = useAuthScreenCheck(user_id, screen_name);

  const handleCityChange = (e) => {
    
    const country = e.target.value;
    
    setSelectedCity(country);
  
  };
  const handleCountryChange = (e) => {
    
    const country = e.target.value;
    
    setSelectedCountry(country);

  
  };

 useEffect(() => {


    if (countryCityData)
      {

        setCities(countryCityData[selectedCountry])

            }
  
  },[selectedCountry])
  
  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);

        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      srno: "",
      date: "",
      name: "",
      industry1: "",
      industry2: "",
      empcount: "",
      phoneNumber: "",
      website: "",
      companyLinkedin: "",
      city: "",
      region: "",
      country: "",
      firstName: "",
      lastName: "",
      jobRole: "",
      email: "",
      quality: "",
      result: "",
      free: "",
      role: "",
      phoneNumber2: "",
      linkedin: "",
      remarks: "",
      recordMarksheet: "",
    },
    validate: ValidateContactCreate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

      return false;
    },
  });

  return (
    <>
    <div>
      <Header></Header>
      <ToasterGen></ToasterGen>
      {checkRights && checkRights == true ? (
   
      <div className=" bg-[#F7FAFC]  h-full ">
        <div
          className={` ${
            sideMenuShow == true
              ? "lg:col-span-1 w-full"
              : "lg:col-span-0 w-full "
          }   lg:flex bg-transparent `}
        >
          <SideMenu setSideMenuShow={setSideMenuShow} className="z-10" />
        </div>

        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-9" : "lg:col-span-10"
          } bg-background-main`}
        >
          <div className=" z-0  bg-transparent mt-20 mb-20">
            <div className=" bg-[#F7FAFC]">
              <h2 className="font-novasans text-2xl   px-16 text-[#32407C] font-semibold flex">
                Contact Details
              </h2>
            </div>

            <div className="flex items-center justify-center min-h-screen bg-[#F7FAFC] px-16">
              <div className="bg-[#FFFFFF]  shadow-sm shadow-[#32407C52] rounded-2xl w-full  m-auto my-auto">
                <div className="flex flex-col justify-center p-8 md:p-14">
                  <h2 className="font-novasans text-2xl    text-[#32407C] font-semibold flex">
                    Information
                  </h2>

                  <form className="py-2" onSubmit={formik.handleSubmit}>
                    <div className="flex  w-full gap-10">
                      <div className="py-4 flex-1 ">
                        <span className="mb-2  text-base font-normal  text-gray-600  font-novasans leading-5 ">
                          Name
                        </span>
                        <input
                          {...formik.getFieldProps("name")}
                          id="name"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder="Enter your Name"
                        />
                      </div>

                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Email
                        </span>

                        <input
                          {...formik.getFieldProps("email")}
                          id="email"
                          type="email"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder="Enter your Email Address"
                        />
                      </div>

                      <div className="py-4 flex-1  w-full">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Website
                        </span>

                        <input
                          {...formik.getFieldProps("website")}
                          id="website"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder="Enter your Website"
                        />
                      </div>
                    </div>
                    <div className="flex w-full  gap-10">
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Industry 1
                        </span>

                        <input
                          {...formik.getFieldProps("industry1")}
                          id="industry1"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Industry 2
                        </span>

                        <input
                          {...formik.getFieldProps("industry2")}
                          id="industry2"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Company LinkedIn
                        </span>

                        <input
                          {...formik.getFieldProps("companyLinkedin")}
                          id="companyLinkedin"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                    
                    <div className="flex w-full  gap-10">
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Emp Count
                        </span>

                        <input
                          {...formik.getFieldProps("empcount")}
                          id="empcount"
                          type="number"
                          min={0}
                          max={100000}
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>

                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Phone Number
                        </span>

                        <input
                          {...formik.getFieldProps("phoneNumber")}
                          id="phoneNumber"
                          type="text"
                          min={0}
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-normal text-base text-gray-600  font-novasans leading-5 ">
                          City
                        </span>
                        <select
                      {...formik.getFieldProps("city")}
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="w-full h-12 bg-transparent border-2 rounded-md border-solid text-black border-[#FFFFFF] font-novasans text-center placeholder:font-light shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                    >
                      {cities && cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>

{/* 
                        <input
                          {...formik.getFieldProps("city")}
                          id="city"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                         */}
                      </div>
                    </div>
                    <div className="flex w-full  gap-10">
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600   leading-5 ">
                          Region
                        </span>

                        <input
                          {...formik.getFieldProps("region")}
                          id="region"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600   leading-5 ">
                          Country
                        </span>
                        <select
                      {...formik.getFieldProps("country")}
                      id="country"
                      value={selectedCountry}
                      className="w-full h-12 bg-transparent border-2 rounded-md border-solid text-black border-[#FFFFFF] font-novasans text-center placeholder:font-light shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                      onChange={handleCountryChange}
                    >
                      {Object.keys(countryCityData).map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
               
                     
                        {/* <Select
                          {...formik.getFieldProps("country")}
                          options={countries}
                          value={selectedCountry}
                          className="w-full  bg-transparent  rounded-md font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          onChange={(selectedOption) =>{
                            console.log(selectedOption.label.split(" ").slice(1).join(" "));
                            
                            setCities(countryCityData[selectedOption.label.split(" ").slice(1).join(" ")])

                            formik.setFieldValue("country", selectedOption.label.split(" ").slice(1).join(" "))

                            setSelectedCountry(selectedOption)
                              console.log(selectedOption)
                          }
                          }
                        /> */}
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
                          Job Role
                        </span>

                        <input
                          {...formik.getFieldProps("jobRole")}
                          id="jobRole"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="flex w-full  gap-10">
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
                          First Name
                        </span>

                        <input
                          {...formik.getFieldProps("firstName")}
                          id="firstName"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600   leading-5 ">
                          Last Name
                        </span>

                        <input
                          {...formik.getFieldProps("lastName")}
                          id="lastName"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
                          Role
                        </span>

                        <input
                          {...formik.getFieldProps("role")}
                          id="role"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="flex w-full  gap-10"></div>
                    <div className="flex w-full  gap-10">
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
                          Quality
                        </span>

                        <input
                          {...formik.getFieldProps("quality")}
                          id="quality"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>

                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Free
                        </span>

                        <input
                          {...formik.getFieldProps("free")}
                          id="free"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>

                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
                          Result
                        </span>

                        <input
                          {...formik.getFieldProps("result")}
                          id="result"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="flex w-full  gap-10"></div>
                    <div className="flex  w-full gap-10">
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          LinkedIn
                        </span>

                        <input
                          {...formik.getFieldProps("linkedin")}
                          id="linkedin"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>

                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Record Marksheet
                        </span>

                        <input
                          {...formik.getFieldProps("recordMarksheet")}
                          id="recordMarksheet"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Phone Number 2
                        </span>

                        <input
                          {...formik.getFieldProps("phoneNumber2")}
                          id="phoneNumber2"
                          type="text"
                          min={0}
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="flex  w-full gap-10">
                      <div className="py-4 flex-1">
                        <span className="mb-2 text-md font-normal text-base text-gray-600  font-novasans leading-5 ">
                          Remarks
                        </span>

                        <textarea
                          {...formik.getFieldProps("remarks")}
                          id="remarks"
                          type="text"
                          className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="flex w-full  gap-10"></div>
                    <div className="py-5 w-full flex justify-center">
                      <button className="font-novasans text-base w-40   font-semibold h-10 bg-[#9E9E9E] text-white  p-2 rounded-md mx-auto justify-center flex ">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
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

    </div>
       <Footer></Footer></>
  );
};

export default AddContact;
