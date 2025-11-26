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
    

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../api";

// // ✅ Default NSW data
// export const fetchKenoResults = createAsyncThunk(
//   "keno/fetchKenoResults",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/nsw-keno/applyfilters?page=1&limit=10");
//       return res.data.results;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch NSW results"
//       );
//     }
//   }
// );

// export const fetchFilteredResults = createAsyncThunk(
//   "keno/fetchFilteredResults",
//   async (filters, { rejectWithValue }) => {
//     try {
//       const { location = "NSW", page = 1, limit = 10, combination, date } = filters;
//       let endpoint = "";

//       // ✅ VIC APIs
//       if (location === "VIC") {
//         const base = "/vic-keno";
//         if (combination || date) {
//           endpoint = `${base}/applyfilters-vic?page=${page}&limit=${limit}`;
//           if (combination) endpoint += `&combination=${combination}`;
//           if (date) endpoint += `&date=${date}`;
//         } else {
//           endpoint = `${base}/keno-results-vic?page=${page}&limit=${limit}`;
//         }
//       }

//       // ✅ SA APIs
//       else if (location === "SA") {
//         const base = "/sa-keno";
//         if (combination || date) {
//           endpoint = `${base}/applyfilters-sa?page=${page}&limit=${limit}`;
//           if (combination) endpoint += `&combination=${combination}`;
//           if (date) endpoint += `&date=${date}`;
//         } else {
//           endpoint = `${base}/keno-results-sa?page=${page}&limit=${limit}`;
//         }
//       }

//       // ✅ NSW (default)
//       else if (location === "NSW") {
//         const base = "/nsw-keno";
//         endpoint = `${base}/applyfilters?page=${page}&limit=${limit}`;
//         if (combination) endpoint += `&combination=${combination}`;
//         if (date) endpoint += `&date=${date}`;
//       }

//       // ✅ Default fallback
//       else {
//         endpoint = `/nsw-keno/applyfilters?page=${page}&limit=${limit}`;
//       }

//       const res = await api.get(endpoint);
//       return res.data.results;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch filtered results"
//       );
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
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ✅ NSW default
//       .addCase(fetchKenoResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchKenoResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload || [];
//       })
//       .addCase(fetchKenoResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Filtered (VIC, SA, NSW)
//       .addCase(fetchFilteredResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFilteredResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload || [];
//       })
//       .addCase(fetchFilteredResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default kenoSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// ✅ Default NSW data
export const fetchKenoResults = createAsyncThunk(
  "keno/fetchKenoResults",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/nsw-keno/applyfilters?page=1&limit=10");
      return res.data.results;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch NSW results"
      );
    }
  }
);

export const fetchFilteredResults = createAsyncThunk(
  "keno/fetchFilteredResults",
  async (filters, { rejectWithValue }) => {
    try {
      const { location = "NSW", page = 1, limit = 10, combination, date } = filters;
      let endpoint = "";

      // ✅ VIC APIs
      if (location === "VIC") {
        const base = "/vic-keno";
        if (combination || date) {
          endpoint = `${base}/applyfilters-vic?page=${page}&limit=${limit}`;
          if (combination) endpoint += `&combination=${combination}`;
          if (date) endpoint += `&date=${date}`;
        } else {
          endpoint = `${base}/keno-results-vic?page=${page}&limit=${limit}`;
        }
      }

      // ✅ SA APIs
      else if (location === "SA") {
        const base = "/sa-keno";
        if (combination || date) {
          endpoint = `${base}/applyfilters-sa?page=${page}&limit=${limit}`;
          if (combination) endpoint += `&combination=${combination}`;
          if (date) endpoint += `&date=${date}`;
        } else {
          endpoint = `${base}/keno-results-sa?page=${page}&limit=${limit}`;
        }
      }

      // ✅ ACT APIs
      else if (location === "ACT") {
        const base = "/atc-keno";
        if (combination || date) {
          endpoint = `${base}/applyfilters?page=${page}&limit=${limit}`;
          if (combination) endpoint += `&combination=${combination}`;
          if (date) endpoint += `&date=${date}`;
        } else {
          endpoint = `${base}/keno-results?page=${page}&limit=${limit}`;
        }
      }

      // ✅ NSW (default)
      else if (location === "NSW") {
        const base = "/nsw-keno";
        endpoint = `${base}/applyfilters?page=${page}&limit=${limit}`;
        if (combination) endpoint += `&combination=${combination}`;
        if (date) endpoint += `&date=${date}`;
      }

      // ✅ Default fallback
      else {
        endpoint = `/nsw-keno/applyfilters?page=${page}&limit=${limit}`;
      }

      const res = await api.get(endpoint);
      return res.data.results;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch filtered results"
      );
    }
  }
);

const kenoSlice = createSlice({
  name: "keno",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ NSW default
      .addCase(fetchKenoResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKenoResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload || [];
      })
      .addCase(fetchKenoResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Filtered (NSW, VIC, SA, ACT)
      .addCase(fetchFilteredResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload || [];
      })
      .addCase(fetchFilteredResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kenoSlice.reducer;
