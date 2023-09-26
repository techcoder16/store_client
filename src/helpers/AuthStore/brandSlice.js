import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";
export const brandData = createAsyncThunk(
    "brand",
    async (payload, { rejectWithValue }) => {
      try {
       
        const request = await axios.get(env.API_URL + "product/get_brands");
        const response = await request.data;
        return response;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  );


const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands : [],
    loading: false,
    error: null,
  },
  reducers: {
    addBrand: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(brandData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(brandData.rejected, (state, action) => {
  
        state.loading = true;
      })
      .addCase(brandData.fulfilled, (state, action) => {
          state.loading = false;
          state.brands = action.payload;
        
         
        }
      );
  },
});
export const { addBrand } = brandSlice.actions;
export default brandSlice.reducer;


