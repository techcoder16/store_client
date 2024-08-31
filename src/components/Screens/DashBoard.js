// import React, { useEffect, useState } from "react";
// import SideMenu from "../../Container/SideMenu";
// import useAuthScreenCheck from "../../utils/useAuthScreenCheck";
// import ToasterGen from "../../Container/ToasterGen";
// import ScreenRights from "../../utils/ScreenRights";
// import { Pie } from 'react-chartjs-2';
// import Header from "../../Container/Header";
// import getApiData from "../../helpers/getApiData";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Dashboard = () => {
//   const user_id = JSON.parse(localStorage.getItem("user_data"))._id;
//   const screen_name = "/company";
//   const [sideMenuShow, setSideMenuShow] = useState(true);
//   const checkRights = useAuthScreenCheck(user_id, screen_name);
//   const [numberOfCompanies, setNumberOfCompanies] = useState(0);
//   const [numberOfContacts, setNumberOfContacts] = useState(0);
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [{
//         data: [],
//         backgroundColor: [],
//     }],
//   });

//   const [industryChartData, setIndustryChartData] = useState({
//     labels: [],
//     datasets: [{
//       data: [],
//       backgroundColor: [],
//     }]
//   });

  
//   const [industryChartData2, setIndustryChartData2] = useState({
//     labels: [],
//     datasets: [{
//       data: [],
//       backgroundColor: [],
//     }]
//   });

//   useEffect(() => {
//     async function getData() {
//       try {
//         const companyData = await getApiData("company/get_number_of_companies", "");
//         setNumberOfCompanies(companyData.company);

//         const contactData = await getApiData("contact/get_number_of_contacts", "");
//         setNumberOfContacts(contactData.contact);

//         const countryResponse = await getApiData('contact/get_contact_by_country', "");
//         const countryData = countryResponse;
      
//         const countryLabels = countryData.map(item => item.country);
//         const countryCounts = countryData.map(item => item.count);
//         const countryColors = countryLabels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

//         setChartData({
//           labels: countryLabels,
//           datasets: [{
//             data: countryCounts,
//             backgroundColor: countryColors,
//             hoverOffset: 6
//           }]
//         });

//         const industryResponse = await getApiData('company/get_company_count_by_industry', "");
//         const industryData = industryResponse;
//         const industryLabels = industryData.map(item => item._id || 'Unknown');
//         const industryCounts = industryData.map(item => item.count);
//         const industryColors = industryLabels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

//         setIndustryChartData({
//           labels: industryLabels,
//           datasets: [{
//             data: industryCounts,
//             backgroundColor: industryColors,
//             hoverOffset: 6
//           }]
//         });


//         const industryResponse2 = await getApiData('company/get_company_count_by_industry_2', "");
//         const industryData2 = industryResponse2;
//         const industryLabels2 = industryData2.map(item => item._id || 'Unknown');
//         const industryCounts2= industryData2.map(item => item.count);
//         const industryColors2 = industryLabels2.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

//         setIndustryChartData2({
//           labels: industryLabels2,
//           datasets: [{
//             data: industryCounts2,
//             backgroundColor: industryColors2,
//             hoverOffset: 6
//           }]
//         });



//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     getData();
//   }, []);

//   return (
//     <>
//       <Header />
//       <ToasterGen />
//       {checkRights && checkRights === true ? (
//         <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-[#F7FAFC] ">
//           <div
//             className={` ${
//               sideMenuShow ? "lg:col-span-1 w-full" : "lg:col-span-0"
//             } lg:flex bg-transparent`}
//           >
//             <SideMenu setSideMenuShow={setSideMenuShow} />
//           </div>
//           <div
//             className={` ${
//               sideMenuShow ? "lg:col-span-10" : "lg:col-span-10"
//             } bg-[#F7FAFC] w-full h-full`}
//           >
//             <div className="h-screen">
//               <div className="w-full">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-white p-4 shadow-md rounded-md">
//                     <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Companies in UK</h2>
//                     <p className="text-2xl">{numberOfCompanies}</p>
//                   </div>

//                   <div className="bg-white p-4 shadow-md rounded-md">
//                     <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Contacts in UK</h2>
//                     <p className="text-2xl">{numberOfContacts}</p>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 shadow-md rounded-md">
//                   <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Contacts by Country</h2>
//                   <div className="w-full max-w-2xl h-80 lg:h-96 flex justify-center">
//                     <Pie data={chartData} />
//                   </div>
//                 </div>
        
//                 <div className="bg-white p-4 shadow-md rounded-md mt-4">
//                   <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Company Count by Industry</h2>
//                   <div className=" h-80 lg:h-96 flex justify-center  w-full">
//                     <Pie data={industryChartData} />
//                     <Pie data={industryChartData2} />
                    
//                   </div>
//                 </div>

//                 <br></br>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : checkRights ? (
//         <ScreenRights />
//       ) : (
//         <></>
//       )}
//     </>  
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import SideMenu from "../../Container/SideMenu";
import useAuthScreenCheck from "../../utils/useAuthScreenCheck";
import ToasterGen from "../../Container/ToasterGen";
import ScreenRights from "../../utils/ScreenRights";
import { Pie, Bar } from 'react-chartjs-2';
import Header from "../../Container/Header";
import getApiData from "../../helpers/getApiData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const user_id = JSON.parse(localStorage.getItem("user_data"))._id;
  const screen_name = "/company";
  const [sideMenuShow, setSideMenuShow] = useState(true);
  const checkRights = useAuthScreenCheck(user_id, screen_name);
  const [numberOfCompanies, setNumberOfCompanies] = useState(0);
  const [numberOfContacts, setNumberOfContacts] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
    }],
  });

  const [industryChartData, setIndustryChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }]
  });

  const [industryChartData2, setIndustryChartData2] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }]
  });

  // States for bar chart
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedColumns, setSelectedColumns] = useState(""); // Default columns
  const [selectedColumns2, setSelectedColumns2] = useState(""); // Default columns
  
  const [columnOptions, setColumnOptions] = useState([
    'industry1',
    'industry2',
    'empcount',
    'phoneNumber',
    'website',
    'city',
    'region',
    'country',
    'firstName',
    'lastName',
    'jobRole',
    'email',
    'quality',
    'result',
    'free',
    'role',
    'phoneNumber2',
    'linkedin',
    'remarks',
    'recordMarksheet'
  ]);

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await getApiData("company/get_number_of_companies", "");
        setNumberOfCompanies(companyData.company);

        const contactData = await getApiData("contact/get_number_of_contacts", "");
        setNumberOfContacts(contactData.contact);
        const countryResponse = await getApiData('contact/get_contact_by_country', "");
        const countryData = countryResponse;
        
        const countryLabels = countryData.map(item => item.country);
        const countryCounts = countryData.map(item => item.count);
        const countryColors = countryLabels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
        
        setChartData({
          labels: countryLabels,
          datasets: [{
            data: countryCounts,
            backgroundColor: countryColors,
            hoverOffset: 6
          }],
          options: {
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw;
                    return `${label}: ${value} contacts`;
                  }
                }
              },
              datalabels: {
                display: true,
                color: '#000',
                formatter: (value, context) => {
                  return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
                },
                anchor: 'end',
                align: 'top'
              }
            }
          }
        });
        
        const industryResponse = await getApiData('company/get_company_count_by_industry', "");
        const industryData = industryResponse;
        const industryLabels = industryData.map(item => item._id || 'Unknown');
        const industryCounts = industryData.map(item => item.count);
        const industryColors = industryLabels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

        setIndustryChartData({
          labels: industryLabels,
          datasets: [{
            data: industryCounts,
            backgroundColor: industryColors,
            hoverOffset: 6
          }]
        });

        const industryResponse2 = await getApiData('company/get_company_count_by_industry_2', "");
        const industryData2 = industryResponse2;
        const industryLabels2 = industryData2.map(item => item._id || 'Unknown');
        const industryCounts2= industryData2.map(item => item.count);
        const industryColors2 = industryLabels2.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

        setIndustryChartData2({
          labels: industryLabels2,
          datasets: [{
            data: industryCounts2,
            backgroundColor: industryColors2,
            hoverOffset: 6
          }]
        });

        // Example data for the bar chart
       

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [columnOptions]);

  useEffect(()=>{
    async function getData() {
      try
      {
      const queryString = encodeURIComponent(JSON.stringify({xColumn:selectedColumns,yColumn:selectedColumns2}));

    const exampleData = await getApiData(`contact/get_bar_chart/${queryString}`, "");

    // const exampleLabels = exampleData ? exampleData.map(item => item.label):[];
    // const exampleValues = columnOptions.reduce((acc, col) => {
    //   acc[col] = exampleData.map(item => item[col] || 0);
    //   return acc;
    // }, {});

    // setBarChartData({
    //   labels: exampleLabels,
    //   datasets: columnOptions.map(col => ({
    //     label: col,
    //     data: exampleValues[col],
    //     backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
    //     borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
    //     borderWidth: 1
    //   }))
    // });
    
    setBarChartData({
      labels: exampleData.labels || [],
      datasets: exampleData.datasets || []
    });


    }catch(e) 
    {

    }
    }
    getData()

  },[selectedColumns,selectedColumns2])

  const handleColumnChange = (e) => {
    const { name, value } = e.target;

        setSelectedColumns(value);

  };

  const handleColumnChange2 = (e) => {
    const { name, value } = e.target;
  
        setSelectedColumns2(value);
  };
  return (
    <>
      <Header />
      <ToasterGen />
      {checkRights && checkRights === true ? (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-0 bg-[#F7FAFC] ">
          <div
            className={` ${
              sideMenuShow ? "lg:col-span-1 w-full" : "lg:col-span-0"
            } lg:flex bg-transparent`}
          >
            <SideMenu setSideMenuShow={setSideMenuShow} />
          </div>
          <div
            className={` ${
              sideMenuShow ? "lg:col-span-10" : "lg:col-span-10"
            } bg-[#F7FAFC] w-full h-full`}
          >
            <div className="h-screen">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Companies in UK</h2>
                    <p className="text-2xl">{numberOfCompanies}</p>
                  </div>

                  <div className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Contacts in UK</h2>
                    <p className="text-2xl">{numberOfContacts}</p>
                  </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-md">
                  <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Contacts by Country</h2>

                  <div className=" h-80 lg:h-96 flex justify-center w-full">
                    <Pie data={chartData} />
                  </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-md mt-4">
                  <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Company Count by Industry</h2>
                  <div className=" h-80 lg:h-96 flex justify-center w-full">
                    <Pie data={industryChartData} />
                    
                  </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-md mt-4">
                  <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Company Count by Industry</h2>
                  <div className=" h-screen  creen flex justify-center w-full">
                  <Pie data={industryChartData2} />
                    
                  </div>
                </div>

             

                <div className="bg-white p-4 shadow-md rounded-md mt-4">
                  <h2 className="font-bold text-lg mb-2 border-b border-bg-gray-400">Bar Chart</h2>
                  <div className="flex items-center mb-4">
                    <label className="mr-2">Select Column 1:</label>
                    <select
                      name="0"
                      value={selectedColumns}
                      onChange={handleColumnChange}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                        {columnOptions.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                      {/* Add more options as needed */}
                    </select>
                    <label className="ml-4 mr-2">Select Column 2:</label>
                    <select
                      name="1"
                      value={selectedColumns2}
                      
                      onChange={handleColumnChange2}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                  {columnOptions.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                      {/* Add more options as needed */}
                    </select>
                    
                  </div>
                  <div className="w-full max-w-2xl h-80 lg:h-96 flex justify-center">
             
                    <Bar data={barChartData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : checkRights ? (
        <ScreenRights />
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
