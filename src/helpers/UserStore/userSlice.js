import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const userData = createAsyncThunk(
  "users",

  async (payload, { rejectWithValue }) => {
    try {
      
      
      let queryString = encodeURIComponent(JSON.stringify(payload));
      queryString =  queryString == undefined ? null : queryString

      const request = await axios.get(env.API_URL + `auth/get_user/${queryString}`);
      const response = await request.data;
  


      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message); 
    }
  }
);








const userSlice = createSlice({
  name: "userdata",
  initialState: {
    users : [],
    userCount : 0,
    loading: false,
    error: null,
  },
  reducers: {
    adduser: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userData.rejected, (state, action) => {
  
        state.loading = true;
      })
      .addCase(userData.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        
        }
      );
  },
});
export const { adduser } = userSlice.actions;
export default userSlice.reducer;







