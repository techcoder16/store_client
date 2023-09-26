import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";
export const categoryData = createAsyncThunk(
    "category",
    async (payload, { rejectWithValue }) => {
      try {
        // Simulate a delay of 2 seconds
       
        const request = await axios.get(env.API_URL + "product/get_categories");
        const response = await request.data;
        return response;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  );


const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories : [],
    loading: false,
    error: null,
  },
  reducers: {
    addCategory: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(categoryData.rejected, (state, action) => {
  
        state.loading = true;
      })
      .addCase(categoryData.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = action.payload;
        
         
        }
      );
  },
});
export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;


