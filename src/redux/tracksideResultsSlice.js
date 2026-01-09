

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../api";

// // FETCH ALL RESULTS (Dynamic – NSW, VIC, ACT)
// export const fetchTracksideResults = createAsyncThunk(
//   "trackside/fetchResults",
//   async (location = "NSW", { rejectWithValue }) => {
//     try {
//       let url = "/nsw-trackside/track-results"; // default NSW

//       if (location === "VIC") url = "vic-trackside/track-results/VIC";
//       if (location === "ACT") url = "/atc-trackside/track-results/ATC"; // <- your API

//       const response = await api.get(url);
//       return response.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "API Error");
//     }
//   }
// );

// // FETCH FILTERED RESULTS (STATIC — ONLY NSW)
// export const fetchFilteredTracksideResults = createAsyncThunk(
//   "trackside/fetchFilteredResults",
//   async (filters, { rejectWithValue }) => {
//     try {
//       const { startDate, endDate, startGameNo, endGameNo } = filters;

//       const response = await api.get(
//         `/nsw-trackside/filtered-results-only/NSW`,
//         {
//           params: {
//             startDate,
//             endDate,
//             startGameNo,
//             endGameNo,
//           },
//         }
//       );

//       return response.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "API Error");
//     }
//   }
// );

// const tracksideResultsSlice = createSlice({
//   name: "tracksideResults",
//   initialState: {
//     loading: false,
//     results: [],
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTracksideResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTracksideResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload;
//       })
//       .addCase(fetchTracksideResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     builder
//       .addCase(fetchFilteredTracksideResults.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFilteredTracksideResults.fulfilled, (state, action) => {
//         state.loading = false;
//         state.results = action.payload;
//       })
//       .addCase(fetchFilteredTracksideResults.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default tracksideResultsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


export const fetchPaginatedTracksideResults = createAsyncThunk(
  "trackside/fetchPaginatedResults",
  async ({ location = "NSW", limit = 20, page = 1 }, { rejectWithValue }) => {
    try {
      const urlMap = {
        NSW: "/nsw-trackside/paginated-results-only/NSW",
        ACT: "/atc-trackside/paginated-results-only/ACT",
        VIC: "/vic-trackside/paginated-results-only/VIC",
      };

      const url = urlMap[location];

      const res = await api.get(url, { params: { limit, page } });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "API Error");
    }
  }
);


export const fetchTracksideResults = createAsyncThunk(
  "trackside/fetchResults",
  async (location = "NSW", { rejectWithValue }) => {
    try {
      const urlMap = {
        NSW: "/nsw-trackside/track-results",
        VIC: "/vic-trackside/track-results/VIC",
        ACT: "/atc-trackside/track-results/ATC",
      };

      const res = await api.get(urlMap[location]);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "API Error");
    }
  }
);


export const fetchFilteredTracksideResults = createAsyncThunk(
  "trackside/fetchFilteredResults",
  async (filters, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/nsw-trackside/filtered-results-only/NSW`,
        { params: filters }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "API Error");
    }
  }
);

export const fetchFilteredResultsByLocation = createAsyncThunk(
  "trackside/fetchFilteredResultsByLocation",
  async ({ location, filters }, { rejectWithValue }) => {
    try {
      const urlMap = {
        NSW: "/nsw-trackside/filtered-results-only/NSW",
        ACT: "/act-trackside/track-results/ACT",
        VIC: "/vic-trackside/filtered-results-only/VIC",
      };

      const res = await api.get(urlMap[location], { params: filters });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "API Error");
    }
  }
);


const tracksideResultsSlice = createSlice({
  name: "tracksideResults",
  initialState: {
    loading: false,
    results: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    /* PAGINATED RESULTS */
    builder
      .addCase(fetchPaginatedTracksideResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedTracksideResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPaginatedTracksideResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* NORMAL RESULTS */
    builder
      .addCase(fetchTracksideResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracksideResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchTracksideResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* OLD NSW FILTER */
    builder
      .addCase(fetchFilteredTracksideResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredTracksideResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchFilteredTracksideResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* NEW DYNAMIC FILTER */
    builder
      .addCase(fetchFilteredResultsByLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredResultsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchFilteredResultsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tracksideResultsSlice.reducer;
