import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* =========================
   CREATE KENO ALERT
   ========================= */
export const createKenoAlert = createAsyncThunk(
  "kenoalert/createKenoAlert",
  async ({ userId, gameType, alertType, targetValue }, { rejectWithValue }) => {
    try {
      console.log("📤 POST PAYLOAD 👉", {
        userId,
        gameType,
        alertType,
        targetValue,
      });

      const res = await api.post("/alerts/", {
        userId,
        gameType,
        alertType,
        targetValue,
      });

      console.log("✅ POST RESPONSE 👉", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ POST ERROR 👉", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data || "Failed to create alert"
      );
    }
  }
);


const kenoAlertSlice = createSlice({
  name: "kenoalert",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createKenoAlert.pending, (state) => {
        state.loading = true;
      })
      .addCase(createKenoAlert.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createKenoAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kenoAlertSlice.reducer;
