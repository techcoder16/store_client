  import React, { useLayoutEffect, useEffect } from "react";
  import Header from "../Container/Header";
  import MenuHeader from "../Container/MenuHeader";
  import SideMenu from "../Container/SideMenu";

  import { useState } from "react";
  import { useFormik } from "formik";
  import { ValidationProfileUpdate } from "../utils/validationAmount";

  import logo from "../assets/logo.png";
  import Select from "react-select";
  import ToasterGen from "./ToasterGen";
  import Footer from "../Container/Footer";
  import getApiData from "../helpers/getApiData";
  const Profile = () => {
    const file = ["Bank Transfer", "Jazzcash", "Easypaisa", "Sadapay", "Nayapay"];
    const [imageSrc, setImageSrc] = useState(null);

    const [method,setMethod] = useState();

    function handleSelect(selected) {
      formik.setFieldValue("paymentmethod", selected);
      setMethod(selected.label);
    }

    const [options, setOptions] = useState([]);


    const formik = useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        paymentmethod: [],
        phone: "",
        avatar:{},
        accountNumber :"",
        bankname:"",
        title:"",
        
      },
      validate: ValidationProfileUpdate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async (values) => {
        values = await Object.assign(values);
    

        return false;
      },
    });

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDark ? "#181322" : "#181322",
        borderColor: "#181322",
        borderRadius: "3px",
        fontSize: "14px",

        padding: "1px",
        boxShadow: state.isFocused ? "0 0 0 0 #181322" : "none",
        fontFamily: "Poppins, sans-serif", // Set the font family to Poppins

        color: "#F5F5F5",
        "&:hover": {
          borderColor: "#181322",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#181322",
          height: "20px",
        },
        input: {
          color: "white",
          backgroundColor: "#181322",
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
        backgroundColor: state.isFocused ? "#181322" : "white",
        color: state.isFocused ? "white" : "black",
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: "#F5F5F5",
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#181322",
        borderRadius: "4px",
        color: "#181322",
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: "#F5F5F5",
        fontSize: "14px",
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: "#F5F5F5",
        "&:hover": {
          backgroundColor: "#181322",
          color: "#F5F5F5",
        },
      }),
    };

    useEffect(() => {
      async function fetchData() {
        const results = [];
        const id = JSON.parse(localStorage.getItem("user_data"))._id;

      
        const userValue = await getApiData(
          "auth/get_user_by_id" + "/" + id,"");


            
          formik.values.firstname = userValue.user.firstName;
          formik.values.lastname = userValue.user.lastName;
          formik.values.phone = userValue.user.phoneNumber;
          formik.values.paymentmethod = userValue.user.paymentMethod;
          
          formik.values.firstname = userValue.user.firstName;
          formik.values.accountNumber = userValue.user.accountNumber;
          formik.values.bankname = userValue.user.bankname;
          
          

        results.push({ key: 0, value: "" });

        file.map((value, index) => {
          return results.push({
            value: index,
            label: value,
          });
        });

        setOptions([...results]);
      }

      fetchData();
    }, []);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
      }

      formik.setFieldValue("avatar", file);
    

    };

 
    return (
      <>
      <ToasterGen></ToasterGen>
        <Header />
        <MenuHeader />
        

          <div className=" bg-background">
            <div className="bg-background relative px-3 py-5">
              <h1 className="text-maincolor font-novasans font-bold text-2xl leading-8">
                Profile Information
              </h1>
            </div>
            <div className="p-10 bg-[#181322] text-maincolor border-gray-300 ">
              <div className="px-5 py-5 container mx-auto rounded-sm border mt-4  border-gray-300 border-opacity-10">
                <div className="col-span-1">
                  <div className="bg-[#181322] p-6 md:p-8">
                    
                    <div className="space-y-4">
                      <form className="py-2" onSubmit={formik.handleSubmit}   encType="multipart/form-data"
  >
                        <div className="py-4 flex justify-center items-center">
                          <img
                            src={imageSrc || logo} // Use imageSrc if available, otherwise use a default logo
                            className="h-44 w-44 rounded-full flex justify-center items-center"
                            alt="Profile"
                          />
                        </div>

                        <div className="py-4 flex justify-center items-center space-x-2">
                          <label className="cursor-pointer bg-transparent  text-base  leading-5 font-normal  font-novasans  text-textColor  py-2 px-4 rounded-lg">
                            Edit
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleImageChange}

                                name = "avatar"
                                id ="avatar"
                                accept='image/*' 
                            />
                          </label>
                        </div>


                        <div className="flex  items-center justify-center  mt-1 mb-5 w-full">
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                      </div>





                        <div className="py-4">
                          <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                            First Name*
                          </span>

                          <input
                            {...formik.getFieldProps("firstname")}
                            id="firstname"
                            
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-[#181322] text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your First Name"

                          />
                        </div>


                        <div className="flex  items-center justify-center  mt-5 mb-5 w-full">
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                      </div>


                        <div className="py-4">
                          <span className="mb-2 text-md font-novasans  font-normal text-base   leading-5 text-line">
                            Last Name*
                          </span>

                          <input
                            {...formik.getFieldProps("lastname")}
                            id="lastname"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-[#181322] text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your Last Name"
                          />
                        </div>


                        <div className="flex  items-center justify-center  mt-5 mb-5 w-full">
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                      </div>


                        <div className="flex  items-center justify-center  mt-5 mb-5 w-full">
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                      </div>


                        <div className="py-4">
                          <div className="flex grid-col-2 gap-2">
                            <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                              Phone
                            </span>
                        
                          </div>

                          <input
                            {...formik.getFieldProps("phone")}
                            id="phone"
                            type="phone"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-[#181322] text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your Phone Number"
                          />
                        </div>

                        <div className="flex  items-center justify-center  mt-5 mb-5 w-full">
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                      </div>

                        <div className="py-4">
                          <div className="flex grid-col-2 gap-2">
                            <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                              Account Number
                            </span>
                          
                          </div>

                          <input
                            {...formik.getFieldProps("accountNumber")}
                            id="accountNumber"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-[#181322] text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your Account Number"
                          />
                        </div>
                        <div className="flex  items-center justify-center  mt-5 mb-5 w-full">
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                        <div className="flex-grow border-t bg-line opacity-10 border-line"></div>
                      </div>


                        <div className="py-4">
                          <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                            Payment Method {method}
                          </span>
                          <div className="">
                            <Select
                              isSearchable={true}
                              isMulti = {false}
                              options={options}
                              onChange={(selected) => handleSelect(selected)}
                              styles={customStyles}
                              
                          
                              className="text-textColor block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maincolor focus:border-maincolor "
                            ></Select>
                          </div>


                        {
                          method == "Bank Transfer" ?
                       
                          <>


                        <div className="py-4">
                          <div className="flex grid-col-2 gap-2">
                            <span className="mb-2 text-md font-novasans  font-normal text-base  leading-5 text-line">
                              Bank Name
                            </span>
                        
                          </div>

                          <input
                            {...formik.getFieldProps("bankname")}
                            id="bankname"
                            type="text"
                            className="w-full h-12 px-4 py-2 border rounded-lg bg-[#181322] text-maincolor placeholder-[#8e8e93] focus:outline-none"
                            placeholder="Enter your Bank Name "
                          />

                        </div>


                        

                        

</>                          
                       
                          :<></>


                        }




                        </div>
                        <div className="flex justify-center items-center">
                          <button
                            type="submit"
                            className=" w-36 justify-center  h-16   rounded-xl  border-1 bg-[#B28EFB] items-center"
                          >
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

          <Footer>

          </Footer>
        
      </>
    );
  };

  export default Profile;
