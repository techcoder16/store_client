import React from "react";
import Header from "../../Container/Header";
import ToasterGen from "../../Container/ToasterGen";
import Footer from "../../Container/Footer";
import { useFormik } from "formik";
import { useState } from "react";
import { ValidateCompanyUpdate } from "../../utils/validateAPI";
import SideMenu from "../../Container/SideMenu";
import { useLocation, useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditCompany = ({   }) => {
  const [sideMenuShow, setSideMenuShow] = useState(true);

  const { state } = useLocation();
  const { companyState } = state || { companyState:null };
const navigate =useNavigate();
  const formik = useFormik({
    initialValues: {
        companyName: companyState.companyName,
        website: companyState.website,
        industry: companyState.industry,
        industry2: companyState.industry2,
        companyLinkedIn: companyState.companyLinkedIn,
        Region: companyState.Region,
        Country: companyState.Country,
        name: companyState.name,
        id:companyState._id,
      navigate:navigate,
    },
   validate: ValidateCompanyUpdate,
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
    <div className="bg-[#F7FAFC] z-10 h-screen">
      <div
        className={` ${
          sideMenuShow == true ? "lg:col-span-1 w-full" : "lg:col-span-0 w-full "
        }   lg:flex bg-transparent `}
      >
        <SideMenu setSideMenuShow={setSideMenuShow} className="z-10" />
      </div>

                
      <div className=" bg-[#F7FAFC] mb-2">
          <h2 className="font-novasans text-2xl    text-[#32407C] font-semibold flex px-16">
            Edit Company Details
          </h2>
        </div>

        <div
          className={` ${
            sideMenuShow == true ? "lg:col-span-9" : "lg:col-span-10"
          } bg-[#F7FAFC] px-16`}
        >
          <div className="bg-[#FFFFFF]  shadow-sm shadow-[#32407C52] rounded-2xl w-full  m-auto my-auto ">
            <div className="flex flex-col justify-center p-8 md:p-14">
              <h2 className="font-novasans text-2xl    text-[#32407C] font-semibold flex">
                Information
              </h2>

              <form className="py-2" onSubmit={formik.handleSubmit}>
                <div className="flex  w-full gap-10">
                  <div className="py-4 flex-1">
                    <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
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
                    <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
                      Website
                    </span>

                    <input
                      {...formik.getFieldProps("website")}
                      id="website"
                      type="text"
                      className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div className="py-4 flex-1">
                    <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
                      industry 1
                    </span>

                    <input
                      {...formik.getFieldProps("industry")}
                      id="industry"
                      type="text"
                      className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:text-base focus:outline-none"
                      placeholder="Enter your Website"
                    />
                  </div>
                </div>
                <div className="flex  w-full gap-10">
                  <div className="py-4 flex-1">
                    <span className="mb-2 text-md font-novasans font-normal text-base text-gray-600  leading-5 ">
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
                    <span className="mb-2 text-md font-normal text-base text-gray-600  font-novasans leading-5 ">
                      Country
                    </span>

                    <input
                      {...formik.getFieldProps("Country")}
                      id="Country"
                      type="text"
                      className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                      placeholder=""
                    />
                  </div>

                  <div className="py-4 flex-1">
                    <span className="mb-2 text-md font-normal text-base text-gray-600  font-novasans leading-5 ">
                      Company Name
                    </span>

                    <input
                      {...formik.getFieldProps("companyName")}
                      id="companyName"
                      type="text"
                      className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex  w-full gap-10">
                  <div className="py-4 flex-1">
                    <span className="mb-2 text-md  font-normal text-base text-gray-600  font-novasans leading-5 ">
                      Region
                    </span>

                    <input
                      {...formik.getFieldProps("Region")}
                      id="Region"
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
                      {...formik.getFieldProps("companyLinkedIn")}
                      id="city"
                      type="text"
                      className="w-full h-12 bg-transparent border-2  rounded-md border-solid  text-black border-[##FFFFFF] font-novasans  text-center placeholder:font-light  shadow-sm shadow-[#00487452] placeholder:font-novasans text-base focus:outline-none"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="flex w-full gap-10"></div>

                <div className="flex  w-full gap-10"></div>

                <div className="flex  w-full gap-10"></div>
                <div className="flex  w-full gap-10"></div>

                <div className="py-5 w-full flex justify-center">
                  <button className="font-novasans text-base w-40   font-semibold h-10 bg-[#9E9E9E] text-white  p-2 rounded-md mx-auto justify-center flex">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        </div>
      
        
    </div>
  );
};

export default EditCompany;

