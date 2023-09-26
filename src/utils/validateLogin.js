import { toast } from "react-hot-toast";
import env from "react-dotenv";
import axios from "axios";





export async function ValidationLogin(values) {
  const errors = verify({}, values);

  return errors;
}

function verify(error = {}, values) {
  
  if (!values.password) {
    error.password = toast.error("Password Required");
  }
  if (values.password.includes(" ")) {
    error.password = toast("Invalid Password");
  }

  if (!values.emailnew) {
    error.emailnew = toast.error("Email Required");
  }



  const userValues = { emailnew: values.emailnew  , password: values.password };

  axios
    .post(env.API_URL + "auth/login", userValues)
    .then((response) => {
      if (response.status === 200) {
        error.success = toast.success("Login Successful!");
          
        const user = localStorage.getItem("user_data");
        if (user) {
    
          const userrole = JSON.parse(localStorage.getItem("user_data")).role;
      
          if(userrole == "admin") {values.navigate("/dashboard");  }
           else if(userrole == "user") {values.navigate("/dashboard");} // Redirect to dashboard if user is already authenticated
        
          }

          
        

      }
    })
    .catch((err) => {

      if (err.response && err.response.status === 503) {
        error.option = toast.error(
          "Server is currently unavailable. Please try again later."
        );
      } else if (err.response && err.response.status === 401) {
        error.emailnew = toast.error("Invalid ID/password");
      } else if (err.code === "ECONNREFUSED" || err.code === "ERR_NETWORK") {
        error.option = toast.error(
          "Server is currently unavailable!"
        );
      } else {
        error.option = toast.error("An error occurred while fetching data.");
      }
    });

  return error;
}
