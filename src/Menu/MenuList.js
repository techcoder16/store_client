import React from "react";
import Header from "../Container/Header";
import MenuHeader from "../Container/MenuHeader";
import { menuData } from "../helpers/MenuStore/menuSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect, useEffect, useState } from "react";
import GetApiData from "../helpers/getApiData";
import PostApiData from "../helpers/postApiData";
import { IoIosCreate } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { toast, Toaster, ToastBar } from "react-hot-toast";
import MenuUpdateModal from "./MenuUpdateModal";
import CreateMenu from './CreateMenu';
import { AiOutlineSearch } from "react-icons/ai";
const MenuList = () => {
  const dispatch = useDispatch();
  let menu = useSelector((state) => state.menu);
  const [parentData, setParentData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [menuState, setMenuState] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1000000;
  const filteredMenu = menu.menus.menu ? menu.menus.menu.filter(item => item.menu_name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};




  useLayoutEffect(() => {
    return () => {
    
    };
  }, [menu.menus.menu]);

  useEffect(() => {
    dispatch(menuData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(menuData());
  }, [showModal,showModalCreate]);


  const handleUpdateClick = async (item) => {
 
    item = { ...item, parentName: parentData[item.parent]?.menu_name || "" };

    setMenuState(item);
    setShowModal(true);
  };
  const handleDeleteButton = async (id) => {
    await PostApiData("menu/delete_menu", { ID: id });
    dispatch(menuData());
   
  };

  useEffect(() => {
    const fetchParentData = async () => {
      if (menu.menus.menu) {
        for (const item of menu.menus.menu) {
          const data = await GetApiData("menu/get_menu_by_id", item.parent);
          setParentData((prevData) => ({
            ...prevData,
            [item.parent]: data,
          }));
        }
      }
    };

    fetchParentData();
  }, [menu.menus.menu, dispatch]);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 2000,
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

      {showModalCreate ? (
        <CreateMenu
          props={setShowModalCreate}
          menuState  = {menuState}
        ></CreateMenu>
      ) : null}



      {showModal ? (
        <MenuUpdateModal
          props={setShowModal}
          menuState={menuState}
          menudata = {menuData}
        ></MenuUpdateModal>
      ) : null}

      <div className="container mx-auto mt-14">



        <div className="flex flex-col min-h-screen bg-transparent">
          <div className="p-4">
            <button onClick={()=>{setShowModalCreate(true)}} className="flex items-center justify-center w-auto border h-12 bg-maincolor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-maincolor hover-text-white">
              <IoIosCreate className="mr-2" />
              Create Menu
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
        placeholder="Search Menu"
        className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-maincolor focus:border-maincolor block w-full pl-10 p-2.5 focus:outline-none focus:ring-0"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <AiOutlineSearch className="w-5 h-5 text-maincolor dark:text-maincolor" />
      </div>
    </div>
  </div>
</div>

          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl">
            <div className="p-8 md:p-14">
              <span className="mb-3 font-novasans text-subheading-400 text-maincolor">
                Menu List
              </span>

              <div className="overflow-x-auto      scrollbar-thin scrollbar-thumb-maincolor">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parent
                      </th>

                      <th className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item.menu_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {item.level}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {parentData &&
                                parentData[item.parent] &&
                                parentData[item.parent].menu_name}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {
                                handleUpdateClick(item, parentData);
                              }}
                              className="text-extra-color hover:extra-color"
                            >
                              <AiOutlineEdit />
                            </button>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteButton(item.id)}
                              href="#"
                              className="text-extra-color hover:extra-color"
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
    </>
  );
};

export default MenuList;
