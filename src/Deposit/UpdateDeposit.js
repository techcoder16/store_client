import React, { useState, useMemo } from "react";
import Header from "../Container/Header";
import {ValidationDepositUpdate } from "../utils/validateAPI";

import GetApiData from "../helpers/getApiData";
import { useEffect } from "react";
import { useFormik } from "formik";

const UpdateDeposit = ({  depositState, props, depositData }) => {
  const [options, setOptions] = useState([]);
  const [optionsCurrency, setoptionsCurrency] = useState([]);
  const formik = useFormik({
    initialValues: {
    

  network: depositState.network,

currency:depositState.currency,
address:depositState.address,

  
  

    },
    validate: ValidationDepositUpdate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);
      props(false);

      return false;
    },
  });

  const optionElements = useMemo(() => {


    return options.map((option,index) => (
 <option key={index} value={option.value} >
        {option.value}
      </option>
    ));
  }, [options]);

  
  
  const optionElementsCurrency = useMemo(() => {


    return optionsCurrency.map((option,index) => (
 <option key={index} value={option.value} >
        {option.value}
      </option>
    ));
  }, [optionsCurrency]);


  useEffect(() => {
    async function fetchData() {
      
      const data = await GetApiData("merchant/get_merchant_type","");
    
      const results = [];
      results.push({key:0,value:""});
      data.map((value) => {
        results.push({
          key: value.id,
          value: value,
        });
      });

      setOptions([...results]);

      const dataCurrency = await GetApiData("merchant/get_currencies","");
  
      const resultsCurrency = [];
      resultsCurrency.push({key:0,value:""});
      
      dataCurrency.symbols.map((value,index) => {
        resultsCurrency.push({
          key:index,
          value: value,
        });
      });

      setoptionsCurrency([...resultsCurrency]);



    }

    fetchData();
  }, [depositState]);



  return (
    <React.Fragment>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-screen bg-transparent">
            <div className="relative flex flex-col m-6 space-y-8 bg-background shadow-2xl rounded-2xl md:flex-row md:space-y-0 h-[70%] overflow-y-auto">
              <div className="flex flex-col justify-center p-8 md:p-14 w-full">
             
                <div className="flex items-end  justify-end  p-0 ">
                  <button
                    className="p-1 border-0 text-textColor  ml-auto bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
                    onClick={() => props(false)}
                  >
                    <span className="bg-transparent text-textColor ">×</span>
                  </button>
                </div>
                <span className="mb-3 text-2xl font-bold font-novasans text-subheading-400  text-textColor">
                  Update  Deposit 
                </span>

                <form className="py-1" onSubmit={formik.handleSubmit}>

<div className="py-4 ">
  <span className="mb-2 text-md font-novasans font-bold text-gray-500">
    Network
  </span>
  <input
    {...formik.getFieldProps("network")}
    id="network"
    type="text"
    value={formik.values.network}
    className=" w-full bg-background text-maincolor placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
    placeholder=""
  ></input>
  <label className="relative left-0 top-1 cursor-text"></label>
</div>



<div className="py-4">
  <span className="mb-2 text-md font-novasans font-bold text-gray-500">
     Currency
  </span>
  <input
    {...formik.getFieldProps("currency")}
    value={formik.values.currency}
    id="currency"


    className=" w-full bg-background text-maincolor placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
  >
  </input>

</div>


<div className="py-4 ">
<span className="mb-2 text-md font-novasans font-bold text-gray-500">
     Address
  </span>
  <input
    {...formik.getFieldProps("address")}
    id="address"
    type="text"
    value={formik.values.address}
    className=" w-full bg-background text-maincolor placeholder:font-novasans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
    placeholder=""
  ></input>
  <label className="relative left-0 top-1 cursor-text"></label>
</div>





<div className="py-4 ">
  <button
    type="submit"
    className="w-full border h-12 bg-textColor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-textColor hover-text-white"
  >
    Update
  </button>
</div>

</form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>
  );
};

export default UpdateDeposit;
