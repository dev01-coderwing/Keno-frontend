// src/redux/quickStatsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchQuickStats = createAsyncThunk(
  "quickStats/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/keno/quick-stats", {
        headers: {
          "api-key": "kajal",
        },
      });

      // ✅ IMPORTANT — backend me "stats" aa raha hai
      return res.data.stats;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load quick stats"
      );
    }
  }
);

const quickStatsSlice = createSlice({
  name: "quickStats",
  initialState: {
    data: [],       // ← table isi se chalegi
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuickStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuickStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // 👈 seedha stats array
      })
      .addCase(fetchQuickStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default quickStatsSlice.reducer;
