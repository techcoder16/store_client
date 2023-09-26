

 import env from "react-dotenv";

 import axios from 'axios';



 export default async function getApiData(url,params) {
let getdata = {};

  try{
 
  
      getdata  =    await axios.get(env.API_URL + url + "/" +  params)
        .then((response) => {
         
          if (response.status == 200 || response.status == 201) {
              let results = response.data;
   
            return results;
    
          }
        }).catch((error) => {
     
      return error.code ==  "ERR_BAD_REQUEST" ?  {}: error;
          
        });

      }
      catch (e) {
      
      }
        return getdata;
};

