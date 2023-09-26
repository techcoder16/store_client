import React from 'react'

import Dropzone from "react-dropzone";
import postApiData from '../helpers/postApiData';
import { AiOutlineUpload } from "react-icons/ai";
import Header from '../Container/Header';
import SideMenu from '../Container/SideMenu';
import ToasterGen from '../Container/ToasterGen';
import { useState } from 'react';
import * as XLSX from "xlsx";
const UpliftCompany = () => {
    
  const [data, setData] = useState([]);
  const [sideMenuShow,setSideMenuShow] = useState(true);
    const handleUpload = (acceptedFiles) => {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
          const arrayBuffer = e.target.result;
          const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const result = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setData(result);
        };
    
    
        fileReader.readAsArrayBuffer(acceptedFiles[0]);
    
        if(data.length > 0)
        {
          postApiData("product/uplift_data",{data:data});
    
        }
    
    
      };


  return (
    <div>



<Header></Header>


<ToasterGen>
  
</ToasterGen>

<div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-white">


  <div className={` ${sideMenuShow == true ? 'lg:col-span-2 w-full' :  'lg:col-span-0 '}   lg:flex bg-white `}>

    <SideMenu  />
  </div>

  



  <div className={` ${sideMenuShow == true ? 'lg:col-span-8' :  'lg:col-span-10' } bg-background-main w-full`}>




  <div className="relative w-full  bg-white">
        <div className="flex flex-col h-auto p-4 md:p-8 text-center">
          <p className="font-bold  text-2xl  md:text-lg text-maincolor font-dmsans mb-2">
          Uplift Company Data
            
          </p>
          <p className="font-normal text-[#848E9C]  text-sm md:text-base leading-6 font-dmsans">
         
          </p>
        </div>
      </div>






    
              </div>


</div>






    </div>
  )
}

export default UpliftCompany