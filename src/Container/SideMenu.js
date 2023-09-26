import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dashboard from "../assets/dashboard1.png";
import funding from "../assets/funding.png";
import p2p from "../assets/p2p_marketplace.png";
import information from "../assets/information.png";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
const SideMenu = ({  }) => {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const dashboard_menu = [
    { name: "DashBoard", image: dashboard, link: "/dashboard", role: "user" },

    { name: "Contact", image: information, link: "/contact_list", role: "admin" },
    { name: "Create Contacts ", image: information, link: "/create_contact", role: "admin" },
    { name: "Add Company", image: information, link: "/add_company", role: "admin" },
    
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
      {isMenuVisible == true ? (
        <div className=" flex bg-[#F5F5F5]  items-start justify-start   ">
          <button
            className="p-1 border-0 text-background   bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
            onClick={() => {
              setIsMenuVisible(false);

            }}
          >
            <span className="bg-transparent text-maincolor ">×</span>
          </button>
        </div>
      ) : (
        <div className=" flex   bg-white    items-start justify-start ">
          <button
            className="p-1 border-0 text-textColor   bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
            onClick={() => {
              setIsMenuVisible(true);
            
            }}
          >
            <span className="bg-white   text-maincolor  ">
              <CiMenuBurger></CiMenuBurger>
            </span>
          </button>
        </div>
      )}

      {isMenuVisible == true ? (
     
          <div className=" bg-[#F5F5F5] w-full">
            {dashboard_menu.map((element, index) => (
              <div
                className="items-start justify-start "
                key={index}
              >
                <div className="flex col-2 text-white w-full p-4 mx-auto ">
                  <Link
                    to={element.link}
                    className="flex col-2 text-white w-full p-2 mx-auto "
                  >
                    <div className="flex gap-2  justify-start">
                      {/* <div className="flex text-maincolor text-sm font-dmsans font-normal leading-5 text-start">
                        <img
                          src={element.image}
                          className="h-6 bg-white"
                          alt={`${element.name} Icon`}
                        />
                      </div> */}
                      <div className="text-background  items-start  text-md font-medium font-dmsans  leading-5 text-start mt-1">
                        {element.name}
                      </div>
                    </div>

                    <div className="flex  items-start justify-start   lg:w-max md:w-max sm:w-max ">
                      <div className="flex-grow border-t bg-line opacity-40 border-line"></div>
                      <div className="flex-grow border-t bg-line opacity-40 border-line"></div>
                    </div>
                  </Link>
                </div>
              </div>

            ))}

<div
                className="items-start justify-start flex-shrink-0 h-fit"
                
              >
                <div className="flex col-2 text-white w-full p-4 mx-auto ">
                  
                    <div className="flex gap-2  justify-start">
                      {/* <div className="flex text-maincolor text-sm font-dmsans font-normal leading-5 text-start">
                        <img
                          src={p2p}
                          className="h-6"
                          alt={`${p2p} Icon`}
                        />
                      </div> */}
                      <button 
                      
                      onClick={(e) => {
                        let user = localStorage.getItem("user_data");
  
                          console.log("asdasdsa");
                        const userValues = { email: user.email };
                        localStorage.removeItem("user_data");
                        const logout = axios
                          .post(env.API_URL + "auth/logout", userValues, {})
                          .then((response) => {
                            if (response.status == 200) {

                              localStorage.removeItem("user_data");

                              navigate("/login");

                            }
                          })

                          .catch((err) => {});
                      }}


                      className="text-background  items-start text-sm font-dmsans font-normal leading-5 text-start mt-1">
                        {"Logout"}
                      </button>
                    </div>

                    <div className="flex  items-start justify-start   lg:w-max md:w-max sm:w-max ">
                      <div className="flex-grow border-t bg-line opacity-5 border-line"></div>
                      <div className="flex-grow border-t bg-line opacity-5 border-line"></div>
                    </div>
                  
                </div>
              </div>
              


        
               
              
              </div>
         
         
      ) : (
        <div></div>
      )}

      
    </>
  );
};

export default SideMenu;
