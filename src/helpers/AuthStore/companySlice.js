import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const companyData = createAsyncThunk(
  "company",

  async (payload, { rejectWithValue }) => {
    try {


        
      
      const queryString = encodeURIComponent(JSON.stringify(payload));



 
      const request = await axios.get(`${env.API_URL}company/get_company/${queryString}`);
      
      const response = await request.data;
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message); 
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companys : [],
    loading: false,
    error: null,
  },
  reducers: {
    addCompany: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(companyData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(companyData.rejected, (state, action) => {
  
        state.loading = true;
      })
      .addCase(companyData.fulfilled, (state, action) => {
          state.loading = false;
          state.companys = action.payload;
       
        }
      );
  },
});
export const { addCompany } = companySlice.actions;
export default companySlice.reducer;

