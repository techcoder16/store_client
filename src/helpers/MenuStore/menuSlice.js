  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import env from "react-dotenv";

  export const menuData = createAsyncThunk(
    "menu",

    async (payload, { rejectWithValue }) => {
      try {
        const request = await axios.get(env.API_URL + "menu/get_menu");
        const response = await request.data;
        localStorage.setItem("menu", JSON.stringify(response));


        return response;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.message); 
      }
    }
  );

  const menuSlice = createSlice({
    name: "menu",
    initialState: {
      menus : [],
      loading: false,
      error: null,
    },
    reducers: {
      addMenu: (state, action) => {

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(menuData.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(menuData.rejected, (state, action) => {
    
          state.loading = true;
        })
        .addCase(menuData.fulfilled, (state, action) => {
            state.loading = false;
            state.menus = action.payload;
           
          }
        );
    },
  });
  export const { addMenu } = menuSlice.actions;
  export default menuSlice.reducer;


