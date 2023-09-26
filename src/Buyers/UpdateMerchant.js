import React, { useState, useMemo } from "react";

import {ValidationCompanyUpdate } from "../utils/validateAPI";

import GetApiData from "../helpers/getApiData";
import { useEffect } from "react";
import { useFormik } from "formik";
import './Company.css'
const UpdateCompany = ({  companyState, props, companyData }) => {
  const [options, setOptions] = useState([]);
  const [optionsCurrency, setoptionsCurrency] = useState([]);
  const formik = useFormik({
    initialValues: {
    

  name: companyState.name,
type:companyState.type,
  rating:companyState.rating,
  orders:companyState.orders,
  completion:companyState.completion,
Payment:companyState.Payment,
  Currency: companyState.Currency,

  available:companyState.available,
  limitHigh:companyState.limitHigh,
  limitLow:companyState.limitLow,
PaymentMethod:companyState.PaymentMethod,
BankAccountNumber:companyState.BankAccountNumber,
BankName:companyState.BankName,
  phoneNumber:companyState.phoneNumber,
  email:companyState.email,
      id:companyState._id,
      avgtime:companyState.avgtime,
      desc:companyState.desc,
      Ttime:companyState.Ttime,
      
  
  

    },
    validate: ValidationCompanyUpdate,
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
      
      const data = await GetApiData("company/get_company_type","");
      const results = [];
      results.push({key:0,value:""});
      data.map((value) => {
        results.push({
          key: value.id,
          value: value,
        });
      });

      setOptions([...results]);

      const dataCurrency = await GetApiData("company/get_currencies","");
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
  }, [companyState]);



  return (
    <React.Fragment>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-screen bg-transparent">
            <div className="relative flex flex-col m-6 space-y-8 bg-background shadow-2xl rounded-2xl md:flex-row md:space-y-0 h-[50%] overflow-y-auto">
              <div className="flex flex-col justify-center p-8 md:p-14 w-full">
             
                <div className="flex items-end  justify-end  p-0 ">
                  <button
                    className="p-1 border-0 text-textColor  ml-auto bg-transparent   text-3xl leading-none font-semibold outline-none focus:outline-none "
                    onClick={() => props(false)}
                  >
                    <span className="bg-transparent text-textColor ">×</span>
                  </button>
                </div>
                <span className="mb-3 text-2xl font-bold font-dmsans text-subheading-400  text-textColor">
                  Update  Company 
                </span>


                <form className="py-1" onSubmit={formik.handleSubmit}>


                <div className="flex space-x-4">
                <div className="w-3/5">
                  <div className="py-4 ">
                    <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       name
                    </span>
                    <input
                      {...formik.getFieldProps("name")}
                      id="name"
                      type="text"
                      value={formik.values.name}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>


                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Rating
                    </span>
                    <input
                      {...formik.getFieldProps("rating")}
                      id="rating"
                      type="number"
                      
                      value={formik.values.rating}
                      className="bg-background text-maincolor  w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>
</div>
<div className=" w-4/5">
                  <div className="py-4 ">

                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Orders
                    </span>
                    <input
                      {...formik.getFieldProps("orders")}
                      id="orders"
                    type="number"
                      
                      value={formik.values.orders}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

               
                  <div className="py-4 ">

                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Order's Completion
                    </span>
                    <input
                      {...formik.getFieldProps("completion")}
                      id="completion"
                      type="number"
                      
                      value={formik.values.completion}
                      className=" bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div></div>
                  <div className="w-3/5">

                  <div className="py-4 ">
                  
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                  Price
                    </span>
                    <input
                      {...formik.getFieldProps("Payment")}
                      id="Payment"
                     type="number"
                      
                      value={formik.values.Payment}
                      className="bg-background text-maincolor  w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4">
                    <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                      Select Type
                    </span>
                    <select
                      {...formik.getFieldProps("type")}
                      value={formik.values.type}
                      id="type"
     
     
                      className="bg-background border focus:outline-none focus:ring-0 border-gray-300 text-maincolor text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-dmsans tra-color block w-full p-2.5 dark:bg-maincolor dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {optionElements}
                    </select>
                  </div>
                
                 </div>


                 <div className="w-3/5">
                

<div className="py-4">
                    <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                      Select Currency
                    </span>
                    <select
                      {...formik.getFieldProps("Currency")}
                      value={formik.values.Currency}
                      id="Currency"
     
     
                      className="bg-background text-maincolor border focus:outline-none focus:ring-0 border-gray-300  text-sm rounded-lg focus:ring-maincolor focus:border-maincolor font-dmsans tra-color block w-full p-2.5 dark:bg-maincolor dark:border-maincolor dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {optionElementsCurrency}
                    </select>
                  </div>
                  
                  
                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Limit High
                    </span>
                    <input
                      {...formik.getFieldProps("limitHigh")}
                      id="limitHigh"
                      type="number"
                      
                      value={formik.values.limitHigh}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div></div>


                  <div className="w-3/5">

                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Limit Low
                    </span>
                    <input
                      {...formik.getFieldProps("limitLow")}
                      id="limitLow"
                      type="number"
                      
                      value={formik.values.limitLow}
                      pattern='[0-9]{0,5}'
                      className=" bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>


                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Avaiable
                    </span>
                    <input
                      {...formik.getFieldProps("available")}
                      id="available"
                      type="number"
                      value={formik.values.available}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>
</div>

<div className="w-3/5">
                  
                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Payment Method
                    </span>
                    <input
                      {...formik.getFieldProps("PaymentMethod")}
                      id="PaymentMethod"
                      type="text"
                      value={formik.values.PaymentMethod}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                        Account Number
                    </span>
                    <input
                      {...formik.getFieldProps("BankAccountNumber")}
                      id="BankAccountNumber"
                      type="text"

                      
                      value={formik.values.BankAccountNumber}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

</div>

<div className="w-3/5">

                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Bank Name
                    </span>
                    <input
                      {...formik.getFieldProps("BankName")}
                      id="BankName"
                      type="text"
                      value={formik.values.BankName}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>


                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Phone Number
                    </span>
                    <input
                      {...formik.getFieldProps("phoneNumber")}
                      id="phoneNumber"
                      type="tel"
                      pattern='[0-9]{7,}'

                      value={formik.values.phoneNumber}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>
</div>
<div className="w-3/5">
                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Email
                    </span>
                    <input
                      {...formik.getFieldProps("email")}
                      id="email"
                      type="email"
                      value={formik.values.email}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>

                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Average Time
                    </span>
                    <input
                      {...formik.getFieldProps("avgtime")}
                      id="avgtime"
                      type="number"
                      
                      pattern='[0-9]{0,5}'
                      value={formik.values.avgtime}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>
                  
</div>

<div className="w-3/5">
                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
                       Release Time
                    </span>
                    <input
                      {...formik.getFieldProps("Ttime")}
                      id="Ttime"
                      type="number"
                      
                      pattern='[0-9]{0,5}'
                      value={formik.values.Ttime}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>



                  <div className="py-4 ">
                  <span className="mb-2 text-md font-dmsans font-bold text-gray-500">
              Description
                    </span>
                    <input
                      {...formik.getFieldProps("desc")}
                      id="desc"
                      type="text"
                      
                    
                      value={formik.values.desc}
                      className="bg-background text-maincolor w-full placeholder:font-dmsans  border-b p-2 focus:outline-none text-center focus:border-maincolor  focus:border-b-2 transition-colors placeholder:font-light  "
                      placeholder=""
                    ></input>
                    <label className="relative left-0 top-1 cursor-text"></label>
                  </div>


</div>


<div className="w-3/5">


                  <div className="py-4 ">
                    <button
                      type="submit"
                      className="w-full border h-12 bg-textColor text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-textColor hover-text-white"
                    >
                      Update
                    </button>
                  </div>
                  </div>
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

export default UpdateCompany;
