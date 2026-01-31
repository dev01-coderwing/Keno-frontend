import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* =========================
   GET OVERDUE COMBOS
   ========================= */
export const fetchOverdueCombos = createAsyncThunk(
  "Kenooverdue/fetchOverdueCombos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/over-due-combo/generate");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch overdue combos"
      );
    }
  }
);

/* =========================
   PAGINATION API
   ========================= */
export const fetchOverdueCombosPagination = createAsyncThunk(
  "Kenooverdue/fetchOverdueCombosPagination",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/over-due-combo/generate/pagination?page=${page}&limit=${limit}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Pagination error");
    }
  }
);

const KenooverdueSlice = createSlice({
  name: "Kenooverdue",
  initialState: {
    combos: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ===== GET ===== */
      .addCase(fetchOverdueCombos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOverdueCombos.fulfilled, (state, action) => {
        state.loading = false;
        state.combos = action.payload;
      })
      .addCase(fetchOverdueCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== PAGINATION ===== */
      .addCase(fetchOverdueCombosPagination.pending, (state) => {
        state.loading = true;
      })
.addCase(fetchOverdueCombosPagination.fulfilled, (state, action) => {
  state.loading = false;

  // 🔥 APPEND new data
  state.combos = [
    ...state.combos,
    ...(action.payload.data || []),
  ];

  state.pagination = action.payload.pagination;
})

      .addCase(fetchOverdueCombosPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default KenooverdueSlice.reducer;
