import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // tumhara axios instance

export const fetchKenoGraph = createAsyncThunk(
  "kenoGraph/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/keno/graph-stats", {
        headers: {
          "api-key": "kajal",
        },
      });
      return res.data.graphData;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch keno graph data"
      );
    }
  }
);

const kenoGraphSlice = createSlice({
  name: "kenoGraph",
  initialState: {
    graphData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKenoGraph.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKenoGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.graphData = action.payload;
      })
      .addCase(fetchKenoGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kenoGraphSlice.reducer;
