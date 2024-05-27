import {configureStore} from '@reduxjs/toolkit';
import authSlice from './AuthStore/authSlice';
import menuSlice from './MenuStore/menuSlice';
import screenSlice from './ScreenStore/screenSlice';
import userSlice from './UserStore/userSlice';

import contactSlice from './AuthStore/contactSlice';
import companySlice from './AuthStore/companySlice';
import authUserSlice from './UserStore/authUserSlice';
const authStore  = configureStore({
    
    reducer:{
        auth:authSlice,
        menu:menuSlice,
        screen:screenSlice,
        users:userSlice,
   
        company:companySlice,
        
     
        contact:contactSlice,
        authuser:authUserSlice,
    }

});

export default authStore;