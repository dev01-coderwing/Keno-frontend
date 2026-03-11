import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

//                                                                                                                          Async thunk to generate combinations
export const generateCombinations = createAsyncThunk(
  "combinations/generate",
  async ({ location, size, minDraws, numCombinations }, { rejectWithValue }) => {
    try {
      const res = await api.post("/combinations/keno", {
        location,
        size,
        minDrawsSinceLastOccurrence: minDraws,
        noOfCombinations: numCombinations,
      });

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate combinations"
      );
    }
  }
);



const combinationSlice = createSlice({
  name: "combinations",
  initialState: {
    combinations: [],
    loading: false,
    errorMsg: "",
      successMsg: ""

  },

  reducers: {
    // Clear combinations
    clearCombinations: (state) => {
      state.combinations = [];
      state.errorMsg = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(generateCombinations.pending, (state) => {
  state.loading = true;
  state.errorMsg = "";
  state.successMsg = "";
})

.addCase(generateCombinations.fulfilled, (state, action) => {
  state.loading = false;
  state.combinations = action.payload;
  state.successMsg = "Combinations generated successfully";
})


      .addCase(generateCombinations.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      });
  },
});

export const { clearCombinations } = combinationSlice.actions;
export default combinationSlice.reducer;
