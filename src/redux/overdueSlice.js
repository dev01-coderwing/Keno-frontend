import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* ================= OVERDUE COMBOS ================= */
export const fetchOverdueCombos = createAsyncThunk(
  "overdue/fetchOverdueCombos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/over-due-combo/generate", {
        headers: { "api-key": "kajal" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch overdue combos");
    }
  }
);

/* ================= TOP FEATURED ================= */
export const fetchTopFeatured = createAsyncThunk(
  "overdue/fetchTopFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/keno/top-featured", {
        headers: { "api-key": "kajal" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch top featured");
    }
  }
);

/* ================= LEAST FEATURED ================= */
export const fetchLeastFeatured = createAsyncThunk(
  "overdue/fetchLeastFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/keno/least-featured", {
        headers: { "api-key": "kajal" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch least featured");
    }
  }
);

const overdueSlice = createSlice({
  name: "overdue",
  initialState: {
    combos: [],
    topFeatured: null,
    leastFeatured: null,
    loading: false,
    featuredLoading: false,
    leastLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* OVERDUE */
      .addCase(fetchOverdueCombos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOverdueCombos.fulfilled, (state, action) => {
        state.loading = false;
        state.combos = action.payload || [];
      })
      .addCase(fetchOverdueCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* TOP FEATURED */
      .addCase(fetchTopFeatured.pending, (state) => {
        state.featuredLoading = true;
      })
      .addCase(fetchTopFeatured.fulfilled, (state, action) => {
        state.featuredLoading = false;
        state.topFeatured = action.payload?.data || null;
      })
      .addCase(fetchTopFeatured.rejected, (state, action) => {
        state.featuredLoading = false;
        state.error = action.payload;
      })

      /* LEAST FEATURED */
      .addCase(fetchLeastFeatured.pending, (state) => {
        state.leastLoading = true;
      })
      .addCase(fetchLeastFeatured.fulfilled, (state, action) => {
        state.leastLoading = false;
        state.leastFeatured = action.payload?.data || null;
      })
      .addCase(fetchLeastFeatured.rejected, (state, action) => {
        state.leastLoading = false;
        state.error = action.payload;
      });
  },
});

export default overdueSlice.reducer;
