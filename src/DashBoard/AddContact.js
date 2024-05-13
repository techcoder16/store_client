import React from "react";
import Header from "../Container/Header";
import ToasterGen from "../Container/ToasterGen";
import Footer from "../Container/Footer";
import { useFormik } from "formik";
import { useState } from "react";
import { ValidateContactCreate } from "../utils/validateAPI";
import DatePicker from "react-datepicker";
import SideMenu from "../Container/SideMenu";

const AddContact = () => {
  const [sideMenuShow, setSideMenuShow] = useState(true);
  const [startDate, setStartDate] = useState(new Date());

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
    <div>
      <Header></Header>

      <ToasterGen></ToasterGen>
      <div className="bg-white z-10">
        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-1 w-full" : "lg:col-span-0 w-full "
          }   lg:flex bg-transparent `}
        >
          <SideMenu setSideMenuShow={setSideMenuShow} className="z-10" />
        </div>

        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-9" : "lg:col-span-10"
          } bg-background-main`}
        >
       

          <div className="   h-screen z-0  bg-white mt-20 mb-20">
<div className="col-span-3 lg:col-span-3 w-full bg-white ">
   <div>
                    <span className=" font-semibold  text-center flex justify-center mb-20   font-Poppins text-3xl   text-black ">
                     Create Contacts
                    </span>
                  </div>
                  
          <div className=" flex items-center justify-center text-center z-0">
            <div className="flex items-center lg:w-1/2 bg-transparent">
              <div className="relative bg-white shadow-2xl rounded-2xl w-full">
                <div className="flex flex-col justify-center p-8 md:p-14 ">
                  <div className="flex justify-center self-center items-center">
                 


                    <form className="py-2" onSubmit={formik.handleSubmit}>
                      <div className="flex  w-full gap-10">
                      <div className="py-4 flex-1 ">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            
                            Name
                          </span>
                          <input
                            {...formik.getFieldProps("name")}
                            id="name"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder="Enter your Name"
                          />
                        </div>
                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            
                            Email
                          </span>

                          <input
                            {...formik.getFieldProps("email")}
                            id="email"
                            type="email"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder="Enter your Email Address"
                          />
                        </div>
                      </div>
                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Website
                          </span>

                          <input
                            {...formik.getFieldProps("website")}
                            id="website"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder="Enter your Website"
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Industry 1
                          </span>

                          <input
                            {...formik.getFieldProps("industry1")}
                            id="industry1"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Industry 2
                          </span>

                          <input
                            {...formik.getFieldProps("industry2")}
                            id="industry2"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Company LinkedIn
                          </span>

                          <input
                            {...formik.getFieldProps("companyLinkedin")}
                            id="companyLinkedin"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Emp Count
                          </span>

                          <input
                            {...formik.getFieldProps("empcount")}
                            id="empcount"
                            type="number"
                            min={0}
                            max={100000}
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Phone Number
                          </span>

                          <input
                            {...formik.getFieldProps("phoneNumber")}
                            id="phoneNumber"
                            type="text"
                            min={0}
                            
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>

                      </div>

                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            City
                          </span>

                          <input
                            {...formik.getFieldProps("city")}
                            id="city"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Region
                          </span>

                          <input
                            {...formik.getFieldProps("region")}
                            id="region"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Country
                          </span>

                          <input
                            {...formik.getFieldProps("country")}
                            id="region"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            First Name
                          </span>

                          <input
                            {...formik.getFieldProps("firstName")}
                            id="firstName"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Last Name
                          </span>

                          <input
                            {...formik.getFieldProps("lastName")}
                            id="lastName"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Job Role
                          </span>

                          <input
                            {...formik.getFieldProps("jobRole")}
                            id="jobRole"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex  md:w-11/12 gap-10">

                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Quality
                          </span>

                          <input
                            {...formik.getFieldProps("quality")}
                            id="quality"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      
                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Role
                          </span>

                          <input
                            {...formik.getFieldProps("role")}
                            id="role"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
</div>                      <div className="flex  md:w-11/12 gap-10">


                        
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Free
                          </span>

                          <input
                            {...formik.getFieldProps("free")}
                            id="free"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      

                      
                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Result
                          </span>

                          <input
                            {...formik.getFieldProps("result")}
                            id="result"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                        </div>                      <div className="flex  md:w-11/12 gap-10">

                      
                      
                      <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Remarks
                          </span>

                          <input
                            {...formik.getFieldProps("remarks")}
                            id="remarks"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      

                      
                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                          Record Marksheet
                          </span>

                          <input
                            {...formik.getFieldProps("recordMarksheet")}
                            id="recordMarksheet"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      
                        </div>                      <div className="flex  md:w-11/12 gap-10">




                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                            Phone Number 2
                          </span>

                          <input
                            {...formik.getFieldProps("phoneNumber2")}
                            id="phoneNumber2"
                            type="text"
                            min={0}
                            
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>



                        <div className="py-4 flex-1">
                          <span className="mb-2 text-md font-Poppins font-normal text-xs text-gray-600  font-Poppins leading-5 ">

                             LinkedIn
                          </span>

                          <input
                            {...formik.getFieldProps("linkedin")}
                            id="linkedin"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>



                        </div>                      <div className="flex  md:w-11/12 gap-10">
</div>

                      <div className="py-5 w-full flex justify-center">
                        <button
                      className="font-Poppins text-base w-40  font-semibold h-12 bg-[#1BA955] text-white  p-2 rounded-lg ">
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
      </div>
      </div>
      </div>
      

    </div>
  );
};

export default AddContact;


