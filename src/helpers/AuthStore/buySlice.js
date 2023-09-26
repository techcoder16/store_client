import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const buyData = createAsyncThunk(
  "buy",

  async (payload, { rejectWithValue }) => {
    try {
      const request = await axios.get(env.API_URL + "merchant/get_order_sell_buy");
      const response = await request.data;

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message); 
    }
  }
);

const buySlice = createSlice({
  name: "desposit",
  initialState: {
    buys : [],
    loading: false,
    error: null,
  },
  reducers: {
    addbuy: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(buyData.rejected, (state, action) => {
  
        state.loading = true;
      })
      .addCase(buyData.fulfilled, (state, action) => {
          state.loading = false;
          state.buys = action.payload;
       
        }
      );
  },
});
export const { addbuy } = buySlice.actions;
export default buySlice.reducer;

