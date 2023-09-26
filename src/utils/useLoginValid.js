
import {   useState } from "react";

const  useLoginValid = (intialValue) => {


let [user, setUserData] = useState(intialValue);
 

function setData() {
    let storedUser = localStorage.getItem("user_data");
  
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
    } else {
      user = null;
    }
    if (!user) {
      setUserData(storedUser);
    }

   
    return user;
  }



 
 return [user,setData];
 



}
 export default useLoginValid;