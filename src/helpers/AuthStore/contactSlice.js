import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";
export const contactData = createAsyncThunk(
    "contact",
    async (payload, { rejectWithValue }) => {
      try {
       

        
        
      
        const queryString = encodeURIComponent(JSON.stringify(payload));

       

        const request = await axios.get(`${env.API_URL}contact/get_contact/${queryString}`);

        


        const response = await request.data;
        return response;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  );


const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts : [],
    contactCount : 0,
    loading: false,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(contactData.rejected, (state, action) => {
  
        state.loading = true;
      })
      .addCase(contactData.fulfilled, (state, action) => {
          state.loading = false;
          state.contacts = action.payload;
        
         
        }
      );
  },
});
export const { addContact } = contactSlice.actions;
export default contactSlice.reducer;


