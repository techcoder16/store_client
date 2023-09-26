  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import env from "react-dotenv";

  export const screenData = createAsyncThunk(
    "screen",

    async (payload, { rejectWithValue }) => {
      try {
        const request = await axios.get(env.API_URL + "screen/get_screen");
        const response = await request.data;
     

        return response;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message); 
      }
    }
  );

  const screenSlice = createSlice({
    name: "screen",
    initialState: {
      screens : [],
      loading: false,
      error: null,
    },
    reducers: {
      addScreen: (state, action) => {

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(screenData.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(screenData.rejected, (state, action) => {
    
          state.loading = true;
        })
        .addCase(screenData.fulfilled, (state, action) => {
            state.loading = false;
            state.screens = action.payload;
            localStorage.setItem(
              "screen",
              JSON.stringify(action.payload)
            );
          }
        );
    },
  });
  export const { addScreen } = screenSlice.actions;
  export default screenSlice.reducer;


