import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// NEW TRACKSIDE HISTORICAL (PuntData API)
export const fetchTracksideHistorical = createAsyncThunk(
  "tracksideHistorical/fetch",
  async ({ entries, location }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      // ✅ ADD LOCATION
      if (location) {
        params.append("location", location);
      }

      entries.forEach((posArr, index) => {
        if (Array.isArray(posArr) && posArr.length > 0) {
          params.append(`pos${index + 1}`, posArr.join(","));
        }
      });

      const res = await api.get(
        `/historical-frequency/trackside?${params.toString()}`
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Trackside Historical API failed"
      );
    }
  }
);

const tracksideHistoricalSlice = createSlice({
  name: "tracksideHistorical",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksideHistorical.pending, (state) => {
        state.loading = true;
         state.data = null
        state.error = null;
      })
      .addCase(fetchTracksideHistorical.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTracksideHistorical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tracksideHistoricalSlice.reducer;
