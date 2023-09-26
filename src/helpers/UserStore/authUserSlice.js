import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const authuserData = createAsyncThunk(
    "authuser",
  
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
  
  
  const authUserSlice = createSlice({
    name: "authuser",
    initialState: {
      authusers : [],
      loading: false,
      error: null,
    },
    reducers: {
      addAuthUser: (state, action) => {
  
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(authuserData.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(authuserData.rejected, (state, action) => {
    
          state.loading = true;
        })
        .addCase(authuserData.fulfilled, (state, action) => {
            state.loading = false;
            state.authusers = action.payload;


          }
        );
    },
  });

  export const { addAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;