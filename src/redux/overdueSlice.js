import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchOverdueCombos = createAsyncThunk(
  "overdue/fetchOverdueCombos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("over-due-combo/trackside/generate/", {
        headers: { "api-key": "kajal" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch overdue combos");
    }
  }
);


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

export const fetchTracksideTopFeatured = createAsyncThunk(
  "overdue/fetchTracksideTopFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/trackside/top-featured", {
        headers: { "api-key": "kajal" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch trackside top featured");
    }
  }
);

export const fetchTracksideLeastFeatured = createAsyncThunk(
  "overdue/fetchTracksideLeastFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/trackside/least-featured", {
        headers: { "api-key": "kajal" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch trackside least featured");
    }
  }
);

const overdueSlice = createSlice({
  name: "overdue",
  initialState: {
    combos: [],

    topFeatured: null,
    leastFeatured: null,

    tracksideTopFeatured: null,
    tracksideLeastFeatured: null,

    loading: false,
    featuredLoading: false,
    leastLoading: false,
    tracksideTopLoading: false,
    tracksideLeastLoading: false,

    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ========== OVERDUE ========== */
      .addCase(fetchOverdueCombos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOverdueCombos.fulfilled, (state, action) => {
        state.loading = false;

        state.combos = (action.payload || []).map((item) => ({
          combo: item.comboKey,      
          numbers: item.combo,       
          frequency: item.frequency,
          avgEvery: item.avgEvery,
          lastSeen: item.lastSeen,
          location: item.location,
        }));
      })
      .addCase(fetchOverdueCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ========== KENO TOP FEATURED ========== */
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

      /* ========== KENO LEAST FEATURED ========== */
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
      })

      /* ========== TRACKSIDE TOP FEATURED ========== */
      .addCase(fetchTracksideTopFeatured.pending, (state) => {
        state.tracksideTopLoading = true;
      })
      .addCase(fetchTracksideTopFeatured.fulfilled, (state, action) => {
        state.tracksideTopLoading = false;
        state.tracksideTopFeatured = action.payload?.data || null;
      })
      .addCase(fetchTracksideTopFeatured.rejected, (state, action) => {
        state.tracksideTopLoading = false;
        state.error = action.payload;
      })

      /* ========== TRACKSIDE LEAST FEATURED ========== */
      .addCase(fetchTracksideLeastFeatured.pending, (state) => {
        state.tracksideLeastLoading = true;
      })
      .addCase(fetchTracksideLeastFeatured.fulfilled, (state, action) => {
        state.tracksideLeastLoading = false;
        state.tracksideLeastFeatured = action.payload?.data || null;
      })
      .addCase(fetchTracksideLeastFeatured.rejected, (state, action) => {
        state.tracksideLeastLoading = false;
        state.error = action.payload;
      });
  },
});

export default overdueSlice.reducer;
