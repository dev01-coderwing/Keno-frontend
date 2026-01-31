import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // your centralized axios instance

// ✅ Async thunk
export const fetchHistoricalFrequency = createAsyncThunk(
  "historical/fetchData",
  async ({ location, entries, size }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/historical-frequency/keno",
        {
          location,
          entries,
          size,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("KENO HISTORICAL RESPONSE:", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Historical Keno API failed"
      );
    }
  }
);


const historicalSlice = createSlice({
  name: "historical",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalFrequency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(fetchHistoricalFrequency.fulfilled, (state, action) => {
  state.loading = false;
  state.data = action.payload;
})

      .addCase(fetchHistoricalFrequency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default historicalSlice.reducer;
