import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* ================= DASHBOARD STATS ================= */

export const fetchDashboardStats = createAsyncThunk(
    "dashboard/fetchStats",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/keno/dashboard-stats");
            return res.data;
        } catch (err) {
            return rejectWithValue("Failed to fetch dashboard stats");
        }
    }
);

/* ================= HOT COLD ================= */

export const fetchHotColdNumbers = createAsyncThunk(
    "dashboard/fetchHotCold",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/keno/nsw/hot-cold");
            return res.data;
        } catch (err) {
            return rejectWithValue("Failed to fetch hot cold numbers");
        }
    }
);

/* ================= DRAW HISTORY ================= */

export const fetchDrawHistory = createAsyncThunk(
    "dashboard/fetchDrawHistory",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/keno/draw-history");
            return res.data;
        } catch (err) {
            return rejectWithValue("Failed to fetch draw history");
        }
    }
);

/* ================= ODD EVEN DISTRIBUTION ================= */

export const fetchOddEvenDistribution = createAsyncThunk(
  "dashboard/fetchOddEven",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/keno/odd-even-distribution");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch odd even distribution");
    }
  }
);

/* ================= SLICE ================= */

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        stats: null,
numbers: [],

oddEvenData: [],
oddEvenLoading: false,

        hotNumbers: [],
        coldNumbers: [],
        draw: "",
        time: "",
        drawHistory: [],        // 👈 ADD
        drawHistoryLoading: false,

        statsLoading: false,      // 👈 SEPARATE
        hotColdLoading: false,    // 👈 SEPARATE
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* -------- DASHBOARD STATS -------- */
            .addCase(fetchDashboardStats.pending, (state) => {
                state.statsLoading = true;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.stats = action.payload.data;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.error = action.payload;
            })

            /* -------- HOT COLD -------- */
            .addCase(fetchHotColdNumbers.pending, (state) => {
                state.hotColdLoading = true;
            })
            .addCase(fetchHotColdNumbers.fulfilled, function (state, action) {
        state.hotColdLoading = false;

        state.hotNumbers =
          action.payload && action.payload.hotNumbers
            ? action.payload.hotNumbers
            : [];

        state.coldNumbers =
          action.payload && action.payload.coldNumbers
            ? action.payload.coldNumbers
            : [];

        state.numbers =
          action.payload && action.payload.numbers
            ? action.payload.numbers
            : [];

        state.draw = action.payload ? action.payload.draw : "";
        state.time = action.payload ? action.payload.time : "";
      })

            .addCase(fetchHotColdNumbers.rejected, (state, action) => {
                state.hotColdLoading = false;
                state.error = action.payload;
            })

            /* -------- DRAW HISTORY -------- */
            .addCase(fetchDrawHistory.pending, (state) => {
                state.drawHistoryLoading = true;
            })
            .addCase(fetchDrawHistory.fulfilled, (state, action) => {
                state.drawHistoryLoading = false;
                state.drawHistory = action.payload.data; // 👈 API data
            })
            .addCase(fetchDrawHistory.rejected, (state, action) => {
                state.drawHistoryLoading = false;
                state.error = action.payload;
            })

            /* -------- ODD EVEN -------- */
.addCase(fetchOddEvenDistribution.pending, (state) => {
  state.oddEvenLoading = true;
})
.addCase(fetchOddEvenDistribution.fulfilled, (state, action) => {
  state.oddEvenLoading = false;
  state.oddEvenData = action.payload.data; // 👈 IMPORTANT
})
.addCase(fetchOddEvenDistribution.rejected, (state, action) => {
  state.oddEvenLoading = false;
  state.error = action.payload;
});


    },
});

export default dashboardSlice.reducer;
