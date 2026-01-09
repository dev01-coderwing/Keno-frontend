import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../api";

export const fetchLatestKenoResults = createAsyncThunk(
  "kenoResults/fetchLatest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/results/keno/latest");
      return res.data.data; // ✅ only data part
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch results"
      );
    }
  }
);

const kenoResultSlice = createSlice({
  name: "kenoResults",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestKenoResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestKenoResults.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.trackSide
          ? [action.payload.trackSide] // ✅ ARRAY
          : [];
      })
      .addCase(fetchLatestKenoResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kenoResultSlice.reducer;
