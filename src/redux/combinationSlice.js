import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

//                                                                                                                          Async thunk to generate combinations
export const generateCombinations = createAsyncThunk(
  "combinations/keno",
  async (
    { location, size, minDraws, numCombinations },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        "/combinations/keno",
        {
          location, // ✅ dynamic
          size,
          minDrawsSinceLastOccurrence: minDraws,
          noOfCombinations: numCombinations,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Keno API failed"
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
      })

.addCase(generateCombinations.fulfilled, (state, action) => {
  state.loading = false;

  state.combinations = action.payload.map((item) => ({
    numbers: item.combination,
    betType: "Keno",
    combination: item.key,
    racesSince: item.currentDrought,
    percentage: 0,
    occurrences: 0,
    averageInterval: 0,
  }));
})



      .addCase(generateCombinations.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      });
  },
});

export const { clearCombinations } = combinationSlice.actions;
export default combinationSlice.reducer;
