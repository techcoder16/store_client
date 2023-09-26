import React, { useLayoutEffect, useMemo } from "react";
import { useState, useRef, useEffect } from "react";

import logo from "../../src/assets/logo2.png";
import env from "react-dotenv";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoginValid from "../utils/useLoginValid";
import { Link } from "react-router-dom";
import martusdt from "../assets/MartUSDT.png";

const HeaderHome = () => {
  const navigate = useNavigate();

  const [user, setuserData] = useLoginValid(null);

  const Menu = ["Profile", "Logout"];

  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  const handleOption = (menu) => {
    if (menu === "Logout") {
      let user = localStorage.getItem("user_data");

      const userValues = { email: user.email };

      const logout = axios
        .post(env.API_URL + "auth/logout", userValues, {})
        .then((response) => {
          if (response.status == 200) {
            localStorage.removeItem("user");
            navigate("/login");
          }
        })
        .catch((err) => {});
    }
    if (menu === "Profile Update") {
      navigate("/settings");
    }
    if (menu === "Menu") {
      navigate("/menu_list");
    }
    if (menu === "Screens") {
      navigate("/screen_list");
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
    // const user = localStorage.getItem("user_data");
    // if (!user) {
    //   navigate("/login");
    // }
  }, []);

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  return (
    <>
      <nav className="bg-background ">
        <div className="mx-3  max-w-8xl ">
          <div className="relative flex h-16 items-center justify-start">
            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex  items-center rounded-full">
                <Link to="/dashboard">
                  <img className=" h-10 w-auto" src={logo} alt="Marketing Data" />
                </Link>
              </div>
            </div>

            <div></div>

            <div>
              <ul>
                <li>
                  <div>
                    <div className="flex grid-col-2 gap-2  ">
                      <div className="text-maincolor  items-center mt-4  font-sans font-normal   text-sm mx-1 ">
                        <button
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          
                          Log in
                        </button>
                      </div>
                      <div className="text-maincolor  ">
                        <div className=" w-full rounded-xl  border-solid border-[#B28EFB33] border  bg-white  ">
                          <button
                            onClick={() => {
                              navigate("/signup_email");
                            }}
                            className=" flex   px-4    h-14  text-sm  leading-4 items-center justify-center  font-medium   "
                          >
                            Create an Account
                          </button>
                        </div>
                      </div>
                    </div>
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

export default HeaderHome;
