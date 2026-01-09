import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

//                                                                                                                          Async thunk to generate combinations
export const generateCombinations = createAsyncThunk(
  "combinations/generate",
  async ({ betType, minRaces, numCombinations }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/combinations/data",
        {
          betType,
          minRacesSinceLastOccurrence: minRaces,
          noOfCombinations: numCombinations,
          location: "ACT",
        },
        { 
          headers: {
            "api-key": "kajal",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(" API Response:", res.data);

      // Backend format → { success, data: [], totalDraws }
      const data = res.data?.data || [];

      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err.message || "Something went wrong"
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

        // 🔥 Map backend response → frontend required format
        state.combinations = action.payload.map((item) => ({
          numbers: item.numbers,                  // array of numbers
          betType: "Trifecta",                   // default (or use real betType)
          percentage: item.frequencyPercent,     // convert backend → frontend
          racesSince: item.lastSeenRacesAgo,     // convert backend → frontend
          occurrences: item.occurrences,
          averageInterval: item.averageInterval,
          combination: item.combination,
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
    