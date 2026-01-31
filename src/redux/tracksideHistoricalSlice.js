import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchTracksideHistorical = createAsyncThunk(
  "tracksideHistorical/fetch",
  async ({ location, betType, entries }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/historical-frequency/trackside",
        {
          location,
          betType,
          entries,
        },
        {
          headers: {
            "API-KEY": "kajal",
          },
        }
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
