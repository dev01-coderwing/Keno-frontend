import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // same axios instance jo tum use kar rahe ho

// 🔥 Checkout API call
export const createCheckout = createAsyncThunk(
  "payments/checkout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/payments/checkout");
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
        // backend se Stripe checkout URL aana chahiye
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentsSlice.reducer;
