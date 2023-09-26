import React from "react";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";
import { userData } from "../helpers/UserStore/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import SideMenu from "../Container/SideMenu";
import PostApiData from "../helpers/postApiData";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import UserUpdateModal from "./UserUpdateModal";

import { AiOutlineSearch } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import ToasterGen from "../Container/ToasterGen";
const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userdata = useSelector((state) => state.userdata);

  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [userState, setuserState] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000000;
  const filtereduser = userdata.userdatas.user
    ? userdata.userdatas.user.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtereduser.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filtereduser.length / itemsPerPage);

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      const role = JSON.parse(localStorage.getItem("user_data")).role;
      if (role == "user") {
        navigate("/NotFound");
      }
    }
  }, []);

  useLayoutEffect(() => {
    return () => {};
  }, [userdata.userdatas.user]);

  useEffect(() => {
    dispatch(userData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(userData());
  }, [showModal, showModalCreate]);

  const handleUpdateClick = async (item) => {
    setuserState(item);

    setShowModal(true);
  };
  const handleDeleteButton = async (id) => {
    await PostApiData("auth/delete_user", { ID: id });
    dispatch(userData());
  };

  return (
    <>
      <ToasterGen></ToasterGen>
      <Header></Header>
      <MenuHeader></MenuHeader>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-0">
        <div className="lg:col-span-2  lg:flex bg-background-main ">
          <SideMenu />
        </div>

        <div className="lg:col-span-8 bg-background-main">
          {showModal ? (
            <UserUpdateModal
              props={setShowModal}
              userState={userState}
              userData={userData}
            ></UserUpdateModal>
          ) : null}

          <div className="container mx-auto bg-background-main">
            <div className="flex flex-col min-h-user bg-transparent">
              <div className="flex mx-8 mt-20 items-end justify-end sm:justify-end ">
                <div className="absolute flex-shrink-0 items-center  mt-28">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative ">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search User"
                      className="bg-background border border-gray-600 text-maincolor text-sm rounded-lg focus:ring-maincolor focus:border-maincolor block w-full pl-10 p-2.5 focus:outline-none focus:ring-0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <AiOutlineSearch className="w-5 h-5 text-maincolor dark:text-maincolor" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col m-6 space-y-8 bg-background shadow-2xl rounded-2xl">
                <div className="p-8 md:p-14">
                  <span className="mb-3 font-dmsans text-subheading-400 text-maincolor">
                    User List
                  </span>

                  <div className="overflow-x-auto      scrollbar-thin scrollbar-thumb-maincolor">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-background">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-maincolor uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-maincolor uppercase tracking-wider">
                            User Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-maincolor uppercase tracking-wider">
                            User's Image
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-maincolor uppercase tracking-wider">
                            User Balance
                          </th>

                          <th className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-gray-200">
                        {currentItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-maincolor">
                                {item.username}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-maincolor">
                                {item.role}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-maincolor">
                                {item.image}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-maincolor">
                                {item.balance} USDT
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => {
                                  handleUpdateClick(item);
                                }}
                                className="text-maincolor hover:extra-color"
                              >
                                <AiOutlineEdit />
                              </button>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDeleteButton(item._id)}
                                href="#"
                                className="text-maincolor hover:extra-color"
                              >
                                <MdDelete />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
