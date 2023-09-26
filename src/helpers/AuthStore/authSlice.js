import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const loginUser = createAsyncThunk(
  "user",

  async (payload, { rejectWithValue }) => {
    try {
  
      const request = await axios.post(env.API_URL + "auth/login", payload);
      const response = await request.data;
      localStorage.setItem("user_data", JSON.stringify(response));
   
      return response;
    } catch (error) {
      return rejectWithValue(error.message); // Reject with the error message
    }
  }
);

export const authuserData = createAsyncThunk(
  "authUser",

  async (payload, { rejectWithValue }) => {
    try {
      const request = await axios.get(env.API_URL + "auth/get_auth_screens");
      const response = await request.data;

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message); 
    }
  }
);






const authSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    token: "",
    message: "",
    expireTime: "",
    loading: false,
    error: null,
    role: null,
    name:"",
    email:"",
    webiste:"",
    company:"",
    file:"",
    address:"",
    balance:"",
    _id:"",
    avatar:null,
    

  },
  reducers: {
    addUser: (state, action) => {
      state.user = localStorage.getItem("user_data");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
   
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload: { username, message, token, expireTime,role,name,email,website,company,file ,address,balance,_id,avatar} }) => {
         
          state.username = username;
          state.token = token;
          state.message = message;
          state.role = role;
          state.expireTime = expireTime;
          state.name = name ;
          state.email = email;
          state.webiste = website ;
          state.company = company;
          state.file = file;
          state.address = address;
               state.balance = balance;
               state._id = _id;
               state.avatar = avatar;
          
          
          localStorage.setItem(
            "user_data",
            JSON.stringify({ username, token, message, expireTime,role,name,email,website,company,file,address,balance,_id,avatar})
          );
        }
      );
  },
});
export const { addUser } = authSlice.actions;
export default authSlice.reducer;
