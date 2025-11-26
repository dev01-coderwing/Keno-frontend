// src/redux/ticketSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // ✅ axios instance

// 🔹 Create Ticket API
export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const res = await api.post("/tickets/create", ticketData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create ticket"
      );
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    loading: false,
    error: null,
    ticket: null,
    success: false,
  },
  reducers: {
    resetTicketState: (state) => {
      state.loading = false;
      state.error = null;
      state.ticket = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
        state.success = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTicketState } = ticketSlice.actions;
export default ticketSlice.reducer;
