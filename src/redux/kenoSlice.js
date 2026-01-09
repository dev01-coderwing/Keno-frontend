// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../api"; 

// export const fetchKenoResults = createAsyncThunk(
//   "keno/fetchKenoResults",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/nsw-keno/keno-results");
//       return res.data.results;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// export const fetchFilteredResults = createAsyncThunk(
//   "keno/fetchFilteredResults",
//   async (params, { rejectWithValue }) => {
//     try {
//       const query = new URLSearchParams(params).toString();
//       const res = await api.get(`/nsw-keno/applyfilters?${query}`);
//       return res.data.results;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// const kenoSlice = createSlice({
//   name: "keno",
//   initialState: {
//     results: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchKenoResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchKenoResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload;
//       })
//       .addCase(fetchKenoResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchFilteredResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFilteredResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload;
//       })
//       .addCase(fetchFilteredResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default kenoSlice.reducer;
    

// redux/kenoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const endpoints = {
  NSW: "/nsw-keno/applyfilters",
  VIC: "/vic-keno/applyfilters-vic",
  SA: "/sa-keno/applyfilters-sa",
  ACT: "/atc-keno/applyfilters",
};

export const fetchKenoResults = createAsyncThunk(
  "keno/fetchKenoResults",
  async (opts = { location: "NSW", page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      const { location = "NSW", page = 1, limit = 10 } = opts;
      const base = endpoints[location] || endpoints.NSW;
      const url = `${base}?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`;
      const res = await api.get(url);
      return {
        results: res.data.results,
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch Keno results");
    }
  }
);

export const fetchFilteredResults = createAsyncThunk(
  "keno/fetchFilteredResults",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const {
        location = "NSW",
        page = 1,
        limit = 10,
        combination,
        date,
        fromGame,
        toGame,
      } = filters;

      // pick correct base endpoint (always applyfilters)
      const base = endpoints[location] || endpoints.NSW;

      // build query params safely
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);

      if (combination !== undefined && combination !== "") {
        params.append("combination", combination);
      }
      if (date) {
        // ensure date in YYYY-MM-DD if backend expects that
        params.append("date", date);
      }
      if (fromGame !== undefined && fromGame !== "") {
        params.append("fromGame", fromGame);
      }
      if (toGame !== undefined && toGame !== "") {
        params.append("toGame", toGame);
      }

      const endpoint = `${base}?${params.toString()}`;

      const res = await api.get(endpoint);

      return {
        results: res.data.results,
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch filtered results");
    }
  }
);

const kenoSlice = createSlice({
  name: "keno",
  initialState: {
    results: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKenoResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKenoResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchKenoResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFilteredResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchFilteredResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kenoSlice.reducer;
