import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const userData = createAsyncThunk(
  "userdata",

  async (payload, { rejectWithValue }) => {
    try {
      const request = await axios.get(env.API_URL + "auth/get_user");
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
    userdatas : [],
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
          state.userdatas = action.payload;
        
        }
      );
  },
});
export const { adduser } = userSlice.actions;
export default userSlice.reducer;







