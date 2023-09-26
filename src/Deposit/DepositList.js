import React from "react";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";
import { depositData } from "../helpers/AuthStore/depositSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";

import PostApiData from "../helpers/postApiData";
import { IoIosCreate } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import CreateDeposit from "./CreateDeposit";
import UpdateDeposit from "./UpdateDeposit";
import SideMenu from "../Container/SideMenu";
import {  useNavigation } from "react-router-dom";

// import MenuUpdateModal from "./MenuUpdateModal";
// import CreateMenu from './CreateMenu';
import { AiOutlineSearch } from "react-icons/ai";
import ToasterGen from "../Container/ToasterGen";
const DepositList = () => {
  const dispatch = useDispatch();
  let deposit = useSelector((state) => state.deposit);
  const [parentData, setParentData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [depositState, setDepositState] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10000000;
  const navigate = useNavigation();
  const filteredMenu = deposit.deposits.deposit
    ? deposit.deposits.deposit.filter((item) =>
        item.network.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useLayoutEffect(() => {
    return () => {};
  }, [deposit.deposits.deposit]);

  useEffect(() => {
    dispatch(depositData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(depositData());
  }, [showModal, showModalCreate]);

  const handleUpdateClick = async (item) => {
    item = {
      ...item,
    };


    setDepositState(item);
    setShowModal(true);
  };

  useEffect(() => {if(localStorage.getItem('user_data')){const role = JSON.parse(localStorage.getItem('user_data')).role;if (role == 'user'){navigate('/NotFound');}    }  },[])

 
  const handleDeleteButton = async (id) => {
    await PostApiData("merchant/delete_deposit", { ID: id });
    dispatch(depositData());
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
          {showModalCreate ? (
            <CreateDeposit
              props={setShowModalCreate}
              depositState={depositState}
            ></CreateDeposit>
          ) : null}

          {showModal ? (
            <UpdateDeposit
              props={setShowModal}
              depositState={depositState}
              depositdata={depositData}
            ></UpdateDeposit>
          ) : null}

          <div className="container mx-auto mt-14">
            <div className="flex flex-col min-h-screen bg-transparent">
              <div className="p-4">
                <button
                  onClick={() => {
                    setShowModalCreate(true);
                  }}
                  className={`flex items-center justify-center w-auto border h-12 bg-textColor text-white border-gray-300 text-md p-2 rounded-lg mb-6 ${
                    deposit.deposits.length > 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-maincolor hover-text-white"
                  }`}
                  disabled={deposit.deposits.length > 0}
                >
                  <IoIosCreate className="mr-2" />
                  Create Deposit Rule
                </button>
              </div>

              <div className="flex mx-8 mt-10 items-end justify-end sm:justify-end ">
                <div className="absolute flex-shrink-0 items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Deposits"
                      className="bg-background border border-gray-600 text-maincolor font-dmsans text-sm rounded-lg focus:ring-maincolor focus:border-maincolor block w-full pl-10 p-2.5 focus:outline-none focus:ring-0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <AiOutlineSearch className="w-5 h-5 text-maincolor dark:text-maincolor" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col m-6 space-y-8 bg-background shadow-2xl rounded-2xl">
                <div className="p-8 md:p-14">
                  <span className="mb-3 font-dmsans text-subheading-400 text-textColor">
                    Deposist List
                  </span>

                  <div className="overflow-x-auto      scrollbar-thin scrollbar-thumb-maincolor">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-background">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Network
                          </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Currency
                          </th>

                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-gray-200">
                        {currentItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-maincolor font-dmsans">
                                {item.network}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-maincolor font-dmsans">
                                {item.currency}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-maincolor font-dmsans">
                                {item.address}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => {
                                  handleUpdateClick(item, parentData);
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

export default DepositList;
