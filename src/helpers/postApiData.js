import env from "react-dotenv";

import axios from "axios";

import { toast } from "react-hot-toast";

export default async function postApiData(url, values) {
  let getdata = {};
  try {
    getdata = await axios
      .post(env.API_URL + url, values)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          let results = response.data;

          if (results.message.length > 0) { 
           getdata.option =  toast.success(results.message);
      
          }
          return results;
        }
      })
      .catch((error) => {

       

          if (error.response && error.response.status === 503) {
            error.option = toast.error(
              "Server is currently unavailable. Please try again later."
            );
          } else if (error.response && error.response.status === 401) {
       
            error.name = toast.error(error.response.data.message);
          } else if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
            error.option = toast.error(
              "Server is currently unavailable!"
            );
          } else {
            error.option = toast.error("An error occurred while fetching data.");
          }

        
        return error.code == "ERR_BAD_REQUEST" ? {} : error;
      });
  } catch (e) {}
  return getdata;
}
