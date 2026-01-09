import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* ================= BET COMPARISON ================= */
export const fetchBetComparison = createAsyncThunk(
  "betComparison/fetchBetComparison",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "/combinations/bet-comparison",
        {
          headers: { "api-key": "kajal" },
        }
      );
      return res.data.data; // sirf array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Bet comparison fetch failed"
      );
    }
  }
);

/* ================= UPCOMING DRAW ================= */
export const fetchUpcomingDraw = createAsyncThunk(
  "betComparison/fetchUpcomingDraw",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "/keno/upcoming-draw",
        {
          headers: { "api-key": "kajal" },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Upcoming draw fetch failed"
      );
    }
  }
);

const betComparisonSlice = createSlice({
  name: "betComparison",
  initialState: {
    /* bet comparison */
    data: [],
    loading: false,
    error: null,

    /* upcoming draw */
    lastDraw: null,
    upcomingDraw: null,
    countdownSeconds: 0,
  },
  extraReducers: (builder) => {
    builder
      /* ===== BET COMPARISON ===== */
      .addCase(fetchBetComparison.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBetComparison.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBetComparison.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPCOMING DRAW ===== */
      .addCase(fetchUpcomingDraw.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpcomingDraw.fulfilled, (state, action) => {
        state.loading = false;
        state.lastDraw = action.payload.lastDraw;
        state.upcomingDraw = action.payload.upcomingDraw;
        state.countdownSeconds = action.payload.countdownSeconds;
      })
      .addCase(fetchUpcomingDraw.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default betComparisonSlice.reducer;
