import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// 🔥 TRACKSIDE COMBINATION API (LIVE)
export const generateTracksideCombinations = createAsyncThunk(
  "trackideCombination/generateTrackside",
  async (
    { location, betType, minRaces, numCombinations },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/combinations/trackside", {
        location,
        betType,
        minRacesSinceLastOccurrence: minRaces,
        noOfCombinations: numCombinations,
      });

      console.log("TRACKSIDE API RESPONSE:", res.data);
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ||
          "Trackside Combination API failed"
      );
    }
  }
);

const trackideCombinationSlice = createSlice({
  name: "trackideCombination",
  initialState: {
    trackside: [],
    loading: false,
    errorMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateTracksideCombinations.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(generateTracksideCombinations.fulfilled, (state, action) => {
        state.loading = false;
        state.trackside = action.payload;
      })
      .addCase(generateTracksideCombinations.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default trackideCombinationSlice.reducer;
