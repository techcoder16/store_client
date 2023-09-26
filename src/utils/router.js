  import DashBoard from "../DashBoard/DashBoard";
  
  import Login from "../components/Login/Login";
  import { createBrowserRouter } from 'react-router-dom';

import SideMenu from "../Container/SideMenu";
import NotFound from "./NotFound";
import Contact  from "../DashBoard/Contact";

import AddCompany from "../DashBoard/AddCompany";
import EditCompany from "../DashBoard/EditCompany";
import AddContact from "../DashBoard/AddContact";
import EditContact from "../DashBoard/EditContact";
import UpliftCompany from "../DashBoard/UpliftCompany";
export const router = createBrowserRouter([
  {
    path:  "/",
    element: <Login />,
  },
  {
    path:  "*",
    element: <NotFound />,
  },
  {
    path:  "/dashboard",
    element: <DashBoard />,
  },
  
  {
    path:  "/login",
    element: <Login />,
  },
   
  {
    path:  "/NotFound",
    element: <NotFound />,
  },
   
  {
    path:  "/side_menu",
    element: <SideMenu />,
  },
  {
    path:  "/contact_list",
    element: <Contact />,
  },
  {
    path:  "/add_company",
    element: <AddCompany />,
  },
  {
    path:  "/edit_company",
    element: <EditCompany />,
  },
  {
    path:  "/create_contact",
    element: <AddContact />,
  },

  {
    path:  "/edit_contact",
    element: <EditContact />,
  },

  {
    path:  "/uplift_company",
    element: <UpliftCompany />,
  },
  

 ]);

export default router;
