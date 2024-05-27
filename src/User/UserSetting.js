import React, { useEffect, useState } from "react";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";

import { useFormik } from "formik";
import { ValiadateUserUpdate } from "../utils/validateAPI";
import { MdAddAPhoto } from "react-icons/md";
import convertToBase64 from "../utils/convert";
import { toast, Toaster, ToastBar } from "react-hot-toast";
const UserSetting = () => {
  const [user, setUser] = useState(localStorage.getItem("user_data"));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
     
      password: "",
      company: user.company,
      email: user.email,
      name: user.name,
      website: user.website,
 
    },
    validate: ValiadateUserUpdate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const nvalues = await Object.assign({}, values);

   
    },
  });

  useEffect(() => {


  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);

    setFile(base64);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 1000,
          className: "",
          success: {
            style: {
              border: "2px solid #f5621c",
              padding: "16px",
            },
          },
          error: {
            style: {
              border: "2px solid #f5621c",
              padding: "16px",
              color: "#f5621c",
            },
          },
        }}
        position="top-center"
        reverseOrder="false"
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    className="close-icon"
                    onClick={() => {
                      toast.dismiss(t.id);
                    }}
                  ></button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>

      <Header></Header>
      <MenuHeader></MenuHeader>
      <div className=" flex items-center  justify-center min-h-auto  bg-transparent">
        <div className="flex flex-col justify-center  ">
          <span className="mb-3 text-2xl font-bold font-novasans text-subheading-400  text-maincolor">
            Change Profile Settings
          </span>

          <div className="container mx-auto">
            <div className="flex items-center  justify-center min-h-screen  bg-transparent">
              <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14 ">
                  <form className="py-4" onSubmit={formik.handleSubmit}>
                    

                    <div className="py-4 ">
                      <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                        Name
                      </span>
                      <input
                        {...formik.getFieldProps("name")}
                        id="name"
                        type="text"
                        value={formik.values.name}
                        className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                        placeholder="Name"
                      ></input>
                      <label className="relative left-0 top-1 cursor-text"></label>
                    </div>

                    <div className="py-4 ">
                      <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                        Password
                      </span>
                      <input
                        {...formik.getFieldProps("password")}
                        id="password"
                        type="password"
                        value={formik.values.password}
                        className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                        placeholder="password"
                      ></input>
                      <label className="relative left-0 top-1 cursor-text"></label>
                    </div>

                    <div className="py-4 ">
                      <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                        Email
                      </span>
                      <input
                        {...formik.getFieldProps("email")}
                        id="email"
                        type="email"
                        value={formik.values.email}
                        className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                        placeholder="Email"
                      ></input>
                      <label className="relative left-0 top-1 cursor-text"></label>
                    </div>

                    <div className="py-4 ">
                      <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                        Company
                      </span>
                      <input
                        {...formik.getFieldProps("company")}
                        id="company"
                        type="company"
                        value={formik.values.company}
                        className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                        placeholder="Company"
                      ></input>
                      <label className="relative left-0 top-1 cursor-text"></label>
                    </div>

                    <div className="py-4 ">
                      <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                        Website
                      </span>
                      <input
                        {...formik.getFieldProps("website")}
                        id="website"
                        type="website"
                        value={formik.values.website}
                        className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                        placeholder="Website"
                      ></input>
                      <label className="relative left-0 top-1 cursor-text"></label>
                    </div>

                    <div className="py-4 ">
                      <span className="mb-2 text-md font-novasans font-bold text-gray-500">
                        User Name   {user.username}
                      </span>
                    
                      <input
                        {...formik.getFieldProps("username")}
                        id="username"
                        type="username"
                        value={user.username}
                        className=" w-full placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                        placeholder="User Name"
                      ></input>
                      <label className="relative left-0 top-1 cursor-text"></label>
                    </div>

                    

                    <div className="py-4 ">
                      <button
                        type="submit"
                        className="w-full border h-12 bg-maincolor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSetting;
