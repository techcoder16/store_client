
import {  RouterProvider } from "react-router-dom";
import Helmet from "react-helmet";
import router from './utils/router';
import logo from './assets/logo.png';

function App() {
  return (
    <div className="App ">


       <Helmet>
                <meta charSet="utf-8" />
                <title>Marketing Data </title>
                <link rel="canonical" href="" ></link>
                <img src={logo}></img>
                
           
            </Helmet>

      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
