import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


export const fetchTracksideQuickStats = createAsyncThunk(
  "tracksideQuickStats/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const requests = Array.from({ length: 12 }, (_, i) =>
        api.get(`/trackside-analytics/horse-details/${i + 1}`)
      );

      const responses = await Promise.all(requests);

      const allHorseData = responses.map(
        (res) => res.data.data
      );

      return allHorseData;

    } catch (err) {
      console.error(
        "TRACKSIDE API ERROR 👉",
        err.response?.status,
        err.response?.data
      );

      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to load trackside horse details"
      );
    }
  }
);

const tracksideQuickStatsSlice = createSlice({
  name: "tracksideQuickStats",
  initialState: {
    data: [],       // ✅ ab ARRAY of 12 horses
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksideQuickStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracksideQuickStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTracksideQuickStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tracksideQuickStatsSlice.reducer;
