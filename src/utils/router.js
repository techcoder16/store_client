  import DashBoard from "../components/Screens/DashBoard";
  
  import Login from "../components/Login/Login";
  import { createBrowserRouter } from 'react-router-dom';

import SideMenu from "../Container/SideMenu";
import NotFound from "./NotFound";
import Contact  from "../components/Screens/Contact";

import AddCompany from "../components/Screens/AddCompany";
import EditCompany from "../components/Screens/EditCompany";
import AddContact from "../components/Screens/AddContact";
import EditContact from "../components/Screens/EditContact";
import UpliftCompany from "../components/Screens/UpliftCompany";
import User from "../User/UserList"
import ScreenRights from "./ScreenRights";
import ScreenList from "../Screen/ScreenList";
import AuthScreenList from "../Screen/AuthScreenList";
import Company from "../components/Screens/Company";

export const router = createBrowserRouter([
  {
    path:  "/",
    element: <Login />,
    
  },
  {
    path:  "*",
    element: <Login />,
  },
  {
    path:  "/dashboard",
    element: < DashBoard/>,

  },
  {
    path:  "/company",
    element: <Company />,
    
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
  
  {
    path:  "/users",
    element: <User />,
  },
  
  {
    path: "/screen_rights",

    element: <ScreenRights />,
  },
  {
    path: "/screens",

    element: <ScreenList />,
  },
  {
    path: "/auth_screens",

    element: <AuthScreenList />,
  },
 ]);

export default router;
