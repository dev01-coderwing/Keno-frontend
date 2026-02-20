// redux/adminanalyticsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchLiveTrackside = createAsyncThunk(
  "analytics/fetchLiveTrackside",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "/trackside-analytics/dashboard-stats?location=VIC"
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch Trackside live data"
      );
    }
  }
);

const adminanalyticsSlice = createSlice({
  name: "adminanalytics",
  initialState: {
    liveTrackside: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveTrackside.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveTrackside.fulfilled, (state, action) => {
        state.loading = false;
        state.liveTrackside = action.payload;
      })
      .addCase(fetchLiveTrackside.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminanalyticsSlice.reducer;
