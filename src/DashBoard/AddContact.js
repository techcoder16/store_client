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
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-white">
        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-2 w-full" : "lg:col-span-0 "
          }   lg:flex bg-white `}
        >
          <SideMenu />
        </div>

        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-8" : "lg:col-span-10"
          } bg-background-main w-full`}
        >
          <div className="relative w-full  bg-white">
            <div className="flex flex-col h-auto p-4 md:p-8 text-center">
              <p className="font-bold  text-2xl  md:text-lg text-maincolor font-dmsans mb-2">
                Add Contact Data
              </p>
              <p className="font-normal text-[#848E9C]  text-sm md:text-base leading-6 font-dmsans"></p>
            </div>
          </div>

          <div className="bg-white h-max flex    justify-center w-full   ">
            <div className="  flex flex-col md:flex-row  gap-4">
              <div className="col-span-3 ">
                <div className="bg-white p-6 md:p-8">
                  <div className="space-y-4">
                    <form className="py-2" onSubmit={formik.handleSubmit}>
                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            
                            Name
                          </span>
                          <input
                            {...formik.getFieldProps("name")}
                            id="name"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your Name"
                          />
                        </div>
                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            
                            Email
                          </span>

                          <input
                            {...formik.getFieldProps("email")}
                            id="email"
                            type="email"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your Email Address"
                          />
                        </div>
                      </div>
                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Website
                          </span>

                          <input
                            {...formik.getFieldProps("website")}
                            id="website"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your Website"
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Industry 1
                          </span>

                          <input
                            {...formik.getFieldProps("industry1")}
                            id="industry1"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Industry 2
                          </span>

                          <input
                            {...formik.getFieldProps("industry2")}
                            id="industry2"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Company LinkedIn
                          </span>

                          <input
                            {...formik.getFieldProps("companyLinkedin")}
                            id="companyLinkedin"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Emp Count
                          </span>

                          <input
                            {...formik.getFieldProps("empcount")}
                            id="empcount"
                            type="number"
                            min={0}
                            max={100000}
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Phone Number
                          </span>

                          <input
                            {...formik.getFieldProps("phoneNumber")}
                            id="phoneNumber"
                            type="text"
                            min={0}
                            
                            className="w-full h-12 px-4 py-2  border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>

                      </div>

                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            City
                          </span>

                          <input
                            {...formik.getFieldProps("city")}
                            id="city"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Region
                          </span>

                          <input
                            {...formik.getFieldProps("region")}
                            id="region"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Country
                          </span>

                          <input
                            {...formik.getFieldProps("country")}
                            id="region"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            First Name
                          </span>

                          <input
                            {...formik.getFieldProps("firstName")}
                            id="firstName"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="flex  md:w-11/12 gap-10">
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Last Name
                          </span>

                          <input
                            {...formik.getFieldProps("lastName")}
                            id="lastName"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>

                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Job Role
                          </span>

                          <input
                            {...formik.getFieldProps("jobRole")}
                            id="jobRole"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <div className="flex  md:w-11/12 gap-10">

                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Quality
                          </span>

                          <input
                            {...formik.getFieldProps("quality")}
                            id="quality"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      
                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Role
                          </span>

                          <input
                            {...formik.getFieldProps("role")}
                            id="role"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
</div>                      <div className="flex  md:w-11/12 gap-10">


                        
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Free
                          </span>

                          <input
                            {...formik.getFieldProps("free")}
                            id="free"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      

                      
                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Result
                          </span>

                          <input
                            {...formik.getFieldProps("result")}
                            id="result"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                        </div>                      <div className="flex  md:w-11/12 gap-10">

                      
                      
                      <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Remarks
                          </span>

                          <input
                            {...formik.getFieldProps("remarks")}
                            id="remarks"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      

                      
                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                          Record Marksheet
                          </span>

                          <input
                            {...formik.getFieldProps("recordMarksheet")}
                            id="recordMarksheet"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>
                      
                        </div>                      <div className="flex  md:w-11/12 gap-10">




                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                            Phone Number 2
                          </span>

                          <input
                            {...formik.getFieldProps("phoneNumber2")}
                            id="phoneNumber2"
                            type="text"
                            min={0}
                            
                            className="w-full h-12 px-4 py-2  border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>



                        <div className="py-4 flex-1">
                          <span className="font-dmsans font-normal text-lg text-maincolor ">
                             LinkedIn
                          </span>

                          <input
                            {...formik.getFieldProps("linkedin")}
                            id="linkedin"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-white text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder=""
                          />
                        </div>



                        </div>                      <div className="flex  md:w-11/12 gap-10">
</div>

                      <div className="py-5 w-full flex justify-center">
                        <button className="w-36 h-16 rounded-xl border-1 font-bold  text-xl  bg-textColor justify-center items-center">
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
      <Footer></Footer>
    </div>
  );
};

export default AddContact;


