import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ValidateSignUpPlatforms } from "../../utils/validateAPI";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import image from "../../assets/Image.png";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebookCircular } from "react-icons/ti";
import {AiTwotoneMail} from 'react-icons/ai'
import ToasterGen from "../../Container/ToasterGen";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type,setType] = useState();

  const formik = useFormik({
    initialValues: {
 
      type:type,

    },
    validate: ValidateSignUpPlatforms,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);

  

      return false;
    },
  });



  return (
    <React.Fragment>
   <ToasterGen></ToasterGen>

       

        <div className="bg-background-main  h-full text-white flex items-center ">
          <div className="container mx-auto  justify-center items-center ">
            <div className="flex   min-h-screen  bg-transparent ">
              <div className="relative  m-6 space-y-8 bg-white   md:space-y-0 w-full">


                <div className="flex bg-background grid-flow-col grid-cols-2 gap-2">
                  <div className=" bg-background w-full  p-8 md:p-14  top-12">
                    <div>
                      <span className=" font-bold    font-novasans text-3xl   text-line ">
                       Welcome to Marketing Data
                      </span>
                    </div>
                    <span className=" font-normal   font-novasans  leading-6  text-base   text-line ">
                      Already have an account?
                      <a className="font-bold text-base underline space-x-3 mx-2    leading-6 ">
                       Log in
                      </a>
                    </span>

                    <div className="relative top-12 w-full">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setType("facebook");
                     
                          formik.values.type = "facebook";
                          formik.handleSubmit();
                          return false;

                          
                        }}
                        className="border text-line border-gray-200 rounded-[40px] w-full h-20 flex items-center text-center justify-center"
                      >
                        <TiSocialFacebookCircular className="mr-2 h-6 w-6" />
                        <span className="text-base font-normal leading-6 font-novasans text-line">
                        Sign up with Facebook
                        </span>
                      </button>
                    </div>
                      
                    <div className="  relative top-20 w-full">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                       
                        

                          try {
                            const response = await fetch('http://localhost:5001/auth/callback', {
                              method: 'GET',
                              mode:'no-cors',
                              
                            
                            });
                      
                            if(!response.ok) {
                      
                            }

                      
                          } catch (err) {
                
                          }






                        }}
                        className="border text-line border-gray-200 rounded-full w-full h-20 flex items-center justify-center text-center"
                      >
                        <FcGoogle className="mr-2 h-6 w-6" />
                        <span className="text-base font-normal leading-6 font-novasans">
                        Sign up with Google
                        </span>
                      </button>
                    </div>


                    <div className="relative  top-28 w-full">
                      <button
                        onClick={(e) => {
                    
                          navigate("/signup_email")
                          
                        }}
                        className="border text-line border-gray-200 rounded-full w-full h-20 flex items-center justify-center text-center"
                      >
                        <AiTwotoneMail className="mr-2 h-6 w-6" />
                        <span className="text-base font-normal leading-6 font-novasans">
                          Sign up with Email
                        </span>
                      </button>
                    </div>

                  </div>

                  <div className=" bg-background hidden md:flex flex-col w-full">
                    <div className="flex-grow">
                      <img
                        src={image}
                        alt="Image"
                        className="w-full h-full object-cover min-h-screen"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </React.Fragment>
  );
};

export default SignUp;
