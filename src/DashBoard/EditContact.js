







import React from "react";
import Header from "../Container/Header";
import ToasterGen from "../Container/ToasterGen";
import Footer from "../Container/Footer";
import { useFormik } from "formik";
import { useState } from "react";
import { ValidateContactUpdate } from "../utils/validateAPI";
import SideMenu from "../Container/SideMenu";
import { useLocation, useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditContact = ({   }) => {
  const [sideMenuShow, setSideMenuShow] = useState(true);

  const { state } = useLocation();
  const { contactState } = state || { contactState:null };
const navigate =useNavigate();
  const formik = useFormik({
    initialValues: {
      date: contactState.data,

      name: contactState.name,

      website: contactState.website,

      industry1: contactState.industry1,

      industry2: contactState.industry2,

      empcount: contactState.empcount,

      phoneNumber: contactState.phoneNumber,
      linkedin: contactState.linkedin,
      city: contactState.city,
      region: contactState.region,
      country: contactState.country,
      companyLinkedin:contactState.companyLinkedin,
      firstName: contactState.firstName,
      lastName: contactState.lastName,

      jobRole:contactState.jobRole,
      email: contactState.email,
      remarks:contactState.remarks,
      recordMarksheet:contactState.recordMarksheet,
      phoneNumber2:contactState.phoneNumber2,

      quality:contactState.quality,
      free:contactState.free,
      result:contactState.result,
      role:contactState.role,
      
      id:contactState._id,
      navigate:navigate,
    },
   validate: ValidateContactUpdate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);
      formik.handleReset();

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
                     Edit Contacts
                    </span>
                  </div>
                  
          <div className=" flex items-center justify-center text-center z-0">
            <div className="flex items-center lg:w-1/2 bg-transparent">
              <div className="relative bg-white shadow-2xl rounded-2xl w-full">
                <div className="flex flex-col justify-center p-8 md:p-14 ">
                  <div className="flex justify-center self-center items-center">
                 


                    <form className="py-2" onSubmit={formik.handleSubmit}>
                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
                            
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
                            
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
                           Company Linked In
                          </span>

                          <input
                            {...formik.getFieldProps("companyLinkedin")}
                            id="companyLinkedin"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                          s  placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                      </div>



                      <div className="flex  md:w-11/12 gap-10">
                      

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                      </div>


                      
                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                      </div>
                      


                      <div className="flex  md:w-11/12 gap-10">

                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
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
                          <span className="font-dmsans font-normal text-xs text-maincolor ">
                           Phone Number 2
                          </span>

                          <input
                            {...formik.getFieldProps("phoneNumber2")}
                            id="phoneNumber2"
                            type="text"
                            className="w-full h-12 bg-transparent border-b-2 border-b-solid text-black border-b-gray-200 font-Poppins placeholder:font-Poppins text-center placeholder:font-light focus:border-b-[#35724e] focus:border-b-2 focus:border-b-solid placeholder:font-Poppins text-xs focus:outline-none"
                            placeholder=""
                          />
                        </div>

</div>

                      <div className="py-5 w-full flex justify-center">
                        <button type="submit"
                      className="font-Poppins text-base w-40  font-semibold h-12 bg-[#1BA955] text-white  p-2 rounded-lg ">
                      Update
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

export default EditContact;
