import React from 'react'
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  const handleSubmit = (()=>{

    if(localStorage.getItem('user_data'))
    {
      const role = JSON.parse(localStorage.getItem('user_data')).role;
      if(role =='user')
      {
      navigate("/login");
      }
        else 
        {
          navigate("/dashboard");
        }

    }
    else
    {
      navigate("/login");

    }

  });
  return (
  <>


      <div className='bg-gray-100'>

      <div className="bg-maincolor text-white py-4 px-8 flex items-center">
        <img
          src={logo}
          alt="logo"
          className="h-fit w-fit text-gray-300 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        ></img>
      </div>
      <div className="bg-gray-100 h-screen justify-star">
    <center className="mt-24 m-auto">

    <div className=" tracking-widest  ">
    <span className="text-background text-6xl block"><span>4  0  4</span></span>
    <span className="text-background text-xl font-Poppins ">Sorry, We couldn't find what you are looking for!</span>

    </div>
    </center>
    <center className="mt-6">
    <button onClick={handleSubmit}
                    type="submit"
                    className="w-28 border h-12 bg-background text-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-background hover-text-white"
         >
                    
                    Go Back
                  </button>

    </center>
    </div>

      </div>
  </>
    
  )
}

export default NotFound