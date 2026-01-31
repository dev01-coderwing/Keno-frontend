import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";   // tumhara axios instance

export const fetchTracksideGraph = createAsyncThunk(
  "tracksideGraph/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/trackside/graph-stats");
      return res.data.graphData;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch trackside graph"
      );
    }
  }
);

const tracksideGraphSlice = createSlice({
  name: "tracksideGraph",
  initialState: {
    graphData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksideGraph.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracksideGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.graphData = action.payload;
      })
      .addCase(fetchTracksideGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tracksideGraphSlice.reducer;
