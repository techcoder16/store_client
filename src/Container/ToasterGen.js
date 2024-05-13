import React from 'react'

import "./Toaster.css";

import { toast, Toaster, ToastBar } from "react-hot-toast";
const ToasterGen = () => {
  return (
    <div>
       <Toaster
    toastOptions={{
      duration: 1500,
      className: "",
      success: {
        style: {
          border: "2px solid #F5F5F5",
          padding: "16px",
          backgroundColor: "#efeeef ", // Add your desired background color
          color: "#5ae31b ",
         fontFamily:"sans-serif"
        },
      },
      error: {
        style: {
          border: "2px solid #F5F5F5",
          padding: "16px",
          color: "#0F5132",
          color: "#0F5132",
          fontFamily:"sans-serif",
          backgroundColor: "#efeeef ", // Add your desired background color

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
                onClick={() => toast.dismiss(t.id)}
              ></button>
            )}
          </>
        )}
      </ToastBar>
    )}
  </Toaster>
  
  </div>
  )
}

export default ToasterGen