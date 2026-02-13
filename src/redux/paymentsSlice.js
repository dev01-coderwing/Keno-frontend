import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// 🔥 Checkout API call (NEW API)
export const createCheckout = createAsyncThunk(
  "payments/createCheckout",
  async ({ plan }, { rejectWithValue }) => {
    try {
      const res = await api.post("/payments/create-checkout", { plan });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Checkout failed"
      );
    }
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    loading: false,
    checkoutUrl: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutUrl = action.payload?.url;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentsSlice.reducer;
