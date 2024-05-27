import React from "react";

import { Link } from "react-router-dom";
import { BiUpArrowAlt } from "react-icons/bi";


import logo from "../assets/logo2.png";
const Footer = () => {
    
  function handleScroll() {
    window.scroll({
      top: document.body.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="h-max w-full">
      <div className="flex w-full h-20 bg-background justify-center py-10 ">
        <Link to="/dashboard">
          <img
            className="lg:block mx-2 sm:h-16 md:h-16 lg:h-16 md:w-auto sm:w-auto lg:w-auto xl:w-auto w-20 h-5"
            src={logo}
            alt="MART USDT"
          />
        </Link>
      </div>

      <div className="  bg-background py-6 md:py-12">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="mb-4 md:mb-0 md:mr-6 text-white">
          <Link to="/terms" className="text-white font-novasans text-sm">
            Terms of Use
          </Link>
        </div>
        <div className="mb-4 md:mb-0 md:mr-6 text-white">
          <Link to="/privacy" className="text-white font-novasans text-sm">
            Privacy Policy
          </Link>
        </div>
        <div className="text-white">
          <span className="font-novasans text-sm">&copy; 2023 Marketing</span>
        </div>
      </div>

      <div className="flex items-center justify-end mt-4 md:mt-0">
        <div className="w-12 h-12 bg-white border border-solid border-[#B28EFB33] rounded-xl flex items-center justify-center">
          <button onClick={handleScroll} className="text-maincolor p-3">
            <BiUpArrowAlt className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
      
    </div>
  );
};

export default Footer;
