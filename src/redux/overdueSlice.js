import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// ✅ GET API → No parameters needed
export const fetchOverdueCombos = createAsyncThunk(
  "overdue/fetchOverdueCombos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/over-due-combo/generate", {
        headers: {
          "api-key": "kajal",
        },
      });

      // API returns: { success: true, data: [...] }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch overdue combos"
      );
    }
  }
);

const overdueSlice = createSlice({
  name: "overdue",
  initialState: {
    combos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverdueCombos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverdueCombos.fulfilled, (state, action) => {
        state.loading = false;

        // API returns: { success: true, data: [...] }
        state.combos = action.payload || [];

      })
      .addCase(fetchOverdueCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default overdueSlice.reducer;
