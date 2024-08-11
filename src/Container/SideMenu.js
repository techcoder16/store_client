import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dashboard from "../assets/dashboard1.png";
import information from "../assets/information.png";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import "./SideMenu.css";
import { MdContacts } from "react-icons/md";
import { FaIndustry } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

import { MdOutlineMenuOpen } from "react-icons/md";

const SideMenu = ({setSideMenuShow}) => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const dashboard_menu = [
    { name: "DashBoard", image: dashboard, link: "/dashboard", role: "user" ,icon:<MdDashboard />  },
    
    { name: "Companies", image: dashboard, link: "/company", role: "user" ,icon:<MdDashboard />  },

    { name: "Contacts", image: information, link: "/contact_list", role: "admin" ,icon:<RiContactsBook2Fill ></RiContactsBook2Fill> },
    { name: "Create Contacts ", image: information, link: "/create_contact", role: "admin" ,icon:<MdContacts></MdContacts>},
    { name: "Create Company", image: information, link: "/add_company", role: "admin" ,icon:<FaIndustry></FaIndustry> },
  ];

  const [role, setRole] = useState();
  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      const datarole = JSON.parse(localStorage.getItem("user_data")).role;
      setRole(datarole);
    }
  }, []);

  return (
    <>
      {!isMenuVisible && (
        <button
          className="toggle-button relative top-1 flex text-gray-500 bg-red-800" 
          onClick={() => {
            setIsMenuVisible(true);
            setSideMenuShow(true);
          }}
        >
      
          <MdOutlineMenuOpen />


        </button>
      )}

      <div className={`side-menu z-10 ${isMenuVisible ? "open" : "closed"}`}>
        {isMenuVisible && (
          <button
            className="toggle-button close-button text-lg text-white"
            onClick={() => {
              setIsMenuVisible(false);
              setSideMenuShow(false);
            }}
          >
            ×
          </button>
        )}

<div className="menu-items items-center lg:translate-y-1/2 translate-y-1/8 top-0   justify-center lg:overflow-hidden ">
        {dashboard_menu.map((element, index) => (
           <div className="menu-item  flex  text-white w-full   left-1/4" key={index}>
           <Link to={element.link} className="flex items-center ">
             <div className="flex items-center justify-center">
             <div className="col-span-1">  {element.icon}</div>
               <div className="text-white font-semibold ml-2">{element.name}</div>
             </div>
           </Link>
         </div>
         
          ))}

          <div className="menu-item logout grid grid-cols-2  gap-2  text-white  font-semibold  left-1/4 ">
          <CiLogout className="font-bold " />
          <button
              onClick={(e) => {
                let user = localStorage.getItem("user_data");
                const userValues = { email: user.email };
                localStorage.removeItem("user_data");
                axios
                  .post(env.API_URL + "auth/logout", userValues, {})
                  .then((response) => {
                    if (response.status == 200) {
                      localStorage.removeItem("user_data");
                      navigate("/login");
                    }
                  })
                  .catch((err) => {});
              }}
            > 
          

              Logout
              
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
