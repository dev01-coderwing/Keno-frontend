import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* =========================
   POST ALERT (TRACKSIDE / KENO)
   ========================= */
export const createAlert = createAsyncThunk(
  "alerts/createAlert",
  async (
    { userId, gameType, betType, combinations, alertType, targetValue },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        userId,
        gameType: gameType.toUpperCase(),
      };

      if (payload.gameType === "TRACKSIDE") {
        payload.betType = betType;
        payload.combinations = combinations;
      }

      if (payload.gameType === "KENO") {
        payload.alertType = alertType;
        payload.targetValue = targetValue;
      }

      const res = await api.post("/alerts/", payload, {
        headers: {
          "Content-Type": "application/json",
          "api-key": "kajal",
        },
      });

      console.log("✅ CREATE ALERT RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ CREATE ALERT ERROR:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Failed to set alert");
    }
  }
);

/* =========================
   GET USER ALERTS (ONLY TRACKSIDE)
   ========================= */
export const fetchUserAlerts = createAsyncThunk(
  "alerts/fetchUserAlerts",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/alerts/user/${userId}`, {
        headers: {
          "api-key": "kajal",
        },
      });

      console.log("✅ FULL RESPONSE:", res.data);

      return {
        trackside: res.data?.data?.trackside || [],
        keno: res.data?.data?.keno || [],
      };
    } catch (err) {
      console.error("❌ FETCH ALERT ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch alerts"
      );
    }
  }
);

/* =========================
   DELETE ALERT
========================= */
export const deleteAlert = createAsyncThunk(
  "alerts/deleteAlert",
  async (alertId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/alerts/${alertId}`, {
        headers: {
          "api-key": "kajal",
        },
      });

      console.log("✅ DELETE ALERT RESPONSE:", res.data);
      return alertId;
    } catch (err) {
      console.error("❌ DELETE ALERT ERROR:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        "Failed to delete alert"
      );
    }
  }
);

const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
    success: false,
    error: null,
    tracksideAlerts: [],
     kenoAlerts: [],
  },
  reducers: {
    resetAlertStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE ALERT */
      .addCase(createAlert.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAlert.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH USER TRACKSIDE ALERTS */
      .addCase(fetchUserAlerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.tracksideAlerts = action.payload.trackside;
          state.kenoAlerts = action.payload.keno;

      })
      .addCase(fetchUserAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE ALERT */
.addCase(deleteAlert.pending, (state) => {
  state.loading = true;
})
.addCase(deleteAlert.fulfilled, (state, action) => {
  
  state.loading = false;

  state.tracksideAlerts = state.tracksideAlerts.filter(
    (alert) => alert._id !== action.payload
  );

  state.kenoAlerts = state.kenoAlerts.filter(
    (alert) => alert._id !== action.payload
  );
})
.addCase(deleteAlert.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export const { resetAlertStatus } = alertSlice.actions;
export default alertSlice.reducer;
