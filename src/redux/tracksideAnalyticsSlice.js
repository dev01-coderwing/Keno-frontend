import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* ================= TRACKSIDE TOP 10 ================= */

export const fetchTracksideTop10 = createAsyncThunk(
  "analytics/fetchTracksideTop10",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/trackside-analytics/top-10-24h");
      console.log("TRACKSIDE RAW:", res.data);
      return res.data?.data ?? res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================= KENO TOP 10 ================= */

export const fetchKenoTop10 = createAsyncThunk(
  "analytics/fetchKenoTop10",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/keno-analytics/top-10-24h");
      console.log("KENO RAW:", res.data);
      return res.data?.data ?? res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================= SLICE ================= */

const tracksideAnalyticsSlice = createSlice({
  name: "tracksideAnalytics",
  initialState: {
    tracksideTop10: null,
    kenoTop10: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------- TRACKSIDE ---------- */
      .addCase(fetchTracksideTop10.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(fetchTracksideTop10.fulfilled, (state, action) => {
  state.loading = false;
  state.tracksideTop10 = action.payload;
  state.top10 = action.payload; // 🔥 BACKWARD COMPATIBLE
})

      .addCase(fetchTracksideTop10.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- KENO ---------- */
      .addCase(fetchKenoTop10.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKenoTop10.fulfilled, (state, action) => {
        state.loading = false;
        state.kenoTop10 = action.payload;
      })
      .addCase(fetchKenoTop10.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tracksideAnalyticsSlice.reducer;
