import React, { useLayoutEffect, useMemo } from "react";
import { useState, useRef, useEffect } from "react";
import logo from "../../src/assets/logo.png";
import env from "react-dotenv";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoginValid from "../utils/useLoginValid";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import bell from "../assets/SVG.png";
// import { socket } from "../utils/global";
import { MdOutlineMenuOpen } from "react-icons/md";

import getApiData from "../helpers/getApiData";
const Header = () => {
  const navigate = useNavigate();

  const [user, setuserData] = useLoginValid(null);
  const location = useLocation();
  const Menu = ["User","Auth Screen","Screens"];

  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  const [openbell, setOpenBell] = useState(false);
  const menuRefbell = useRef();
  const imgRefbell = useRef();
  const [feeds, setFeeds] = useState([]);
  const [isNewFeed, setIsNewFeed] = useState(false);
  const [showAllFeeds, setShowAllFeeds] = useState(false);
  const numberOfFeeds = 5;
  const displayedFeeds = showAllFeeds ? feeds : feeds.slice(0, numberOfFeeds);
  const [filename, setFileName] = useState("");
  const [ContentType, setContentType] = useState("");
  
  useEffect(() => {
    // socket.emit("initial_data");
    // socket.on("get_data", getData);
    // socket.on("change_data", changeData);
    // return () => {
    //   socket.off("get_data");
    //   socket.off("change_data");
    // };
  }, []);

 

  const handleOption = (menu) => {
    const  role = JSON.parse (localStorage.getItem("user_data")).role;
      console.log(menu)
    if (menu === "User" && role == 'admin') {
      
      navigate("/users");
    }

    if (menu === "Auth Screen" && role == 'admin') {
      
      navigate("/auth_screens" );
    }
    if (menu === "Screens"  && role == 'admin') {
      navigate("/screens");
    }

    if (menu === "Logout") {
      let user = localStorage.getItem("user_data");

      const userValues = { email: user.email };

      const value = location.pathname;

        const logout = axios
          .post(env.API_URL + "auth/logout", userValues, {})
          .then((response) => {
            if (response.status == 200) {
              localStorage.removeItem("user_data");
              navigate("/login");
            }
          })


          .catch((err) => {});

    }
   

    if (menu === "Menu") {
      navigate("/menu_list");
    }
 
    if (menu === "Authenticate Screens") {
      navigate("/auth_list");
    }
    if (menu === "ADD MERCHANTS") {
      navigate("/user_list");
    }
  };

  useLayoutEffect(() => {
    return () => {
      // if (localStorage.getItem("user_data") == null) {
      //   navigate("/login");
      // } else {
      //   setuserData();
      // }
    };
  });

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (!userData) {
      navigate("/");
    } else {
      setuserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("user_data")) {
        const userData = JSON.parse(localStorage.getItem("user_data"));

        const response = await getApiData(
          "auth/get_avatar/" + userData._id,
          ""
        );

        try{
        if (response && response.user) {
          setFileName(response.user && response.user[0].avatar && response.user[0].avatar.filename);
          setContentType(response.user[0].avatar.contentType);
        }
      }
      catch(err)
      {
        
      }
      }
    }

    fetchData();
  }, []);

  

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
    if (e.target !== menuRefbell.current && e.target !== imgRefbell.current) {
      setOpenBell(false);
    }
  });

  return (
    <>
      <nav className="bg-[#FFFFFF] ">
        <div className="mx-5  max-w-8xl ">
          <div className="relative flex h-16 items-center justify-start">
            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex  items-center rounded-full">
                <Link to="/dashboard">
                  <img
                    className=" h-16    2xl:w-auto xl:w-auto sm:w-auto lg:w-auto md:w-auto    w-min  lg:block mx-2"
                    src={logo}
                    alt="sTORE"
                  />
                </Link>
              </div>
            </div>

            <div></div>

            <div className=" absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  ">
              <div className="relative ml-44">
                <div className="flex bg-transparent grid-flow-col grid-cols-2 gap-2">
                

                  <div className="h-auto   bg-transparent  border-solid border-white flex justify-center pt-0 mt-1">
                    <button
                      type="button"
                      className=" flex rounded-full w-6 h-6 bg-maincolor text-sm focus:outline-none ring-2 ring-white focus:ring-white focus:ring-offset-2 focus:ring-offset-white "
                    >
                      <img
                        ref={imgRef}
                        onClick={() => setOpen(!open)}
                        src={
                          filename && ContentType
                            ? `data:${ContentType};base64,${filename}`
                            : logo } 
                        alt="user"
                        className="h-6 w-6   rounded-full cursor-pointer  "
                      ></img>
                    </button>

                    {open && (
                      <div
                        ref={menuRef}
                        className="bg-white p-4 w-52 absolute h-max shadow-lg z-20 top-10 right-2"
                      >
                        <ul>
                          {Menu.map((menu,index) =>
                        user.role == "admin" ? (
                              <li
                                onClick={() => {
                                  setOpen(false);
                                  handleOption(menu);
                                }}
                                className="font-novasans w-full  p-2 text-lg cursor-pointer rounded hover:bg-line hover:text-white"
                                key={index}
                              >
                                {menu}
                              </li>
                            ) : (
                              <></>
                            )
                          )}
                          <li
                            onClick={() => {
                              setOpen(false);
                              handleOption("Logout");
                            }}
                            className="font-novasans w-full  p-2 text-lg cursor-pointer rounded hover:bg-line hover:text-white"
                            key={"Logout"}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ul>
                <li>
                  <div>
                    <h1 className=" p-20 text-sm md:p-10 sm:p-0 lg:p-0 xl:p-0  2xl:p-0 caret-maincolor text-white text-dmsans  font-medium">
                      {user && user.username}
                    </h1>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
