import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/analytics";

/* ================= METRICS ================= */
export const fetchAnalyticsMetrics = createAsyncThunk(
  "analytics/fetchMetrics",
  async (range = "monthly", { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/metrics?range=${range}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue("Metrics API Failed");
    }
  }
);

/* ================= RESOLUTION TIME ================= */
export const fetchResolutionTime = createAsyncThunk(
  "analytics/fetchResolutionTime",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/resolution-time`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch {
      return rejectWithValue("Resolution API Failed");
    }
  }
);

/* ================= AGENTS ================= */
export const fetchAgentsAnalytics = createAsyncThunk(
  "analytics/fetchAgents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/agents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch {
      return rejectWithValue("Agents API Failed");
    }
  }
);

/* ================= AUTOMATION RATE ================= */
export const fetchAutomationRate = createAsyncThunk(
  "analytics/fetchAutomationRate",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/automation-rate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch {
      return rejectWithValue("Automation API Failed");
    }
  }
);

/* ================= ESCALATION RATE ================= */
export const fetchEscalationRate = createAsyncThunk(
  "analytics/fetchEscalationRate",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/escalation-rate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch {
      return rejectWithValue("Escalation API Failed");
    }
  }
);

/* ================= LIVE KENO RESULT ================= */
export const fetchLiveKenoResult = createAsyncThunk(
  "analytics/fetchLiveKenoResult",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://13.210.115.73:3000/api/v1/keno/live-result"
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Live Keno API Failed");
    }
  }
);

/* ================= SLICE ================= */
const analyticsSlice = createSlice({
  name: "analytics",

  initialState: {
    metricData: [],
    doughnut1: { labels: [], datasets: [] }, // Automation
    doughnut2: { labels: [], datasets: [] }, // Escalation
    barData: [],
    agents: [],
    loading: false,
    error: null,
    liveKeno: null,        // ✅ NEW

  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAnalyticsMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalyticsMetrics.fulfilled, (state, action) => {
        state.loading = false;

        state.metricData = [action.payload];
      })


      .addCase(fetchAnalyticsMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== RESOLUTION ===== */
      .addCase(fetchResolutionTime.fulfilled, (state, action) => {
        const res = action.payload;
        state.barData = [
          {
            label: res.value || "0Hrs 0Mins",
            Bot: res.minutes || 0,
            Humans: res.minutes || 0,
          },
        ];
      })

      /* ===== AGENTS ===== */
      .addCase(fetchAgentsAnalytics.fulfilled, (state, action) => {
        state.agents = action.payload?.data || [];
      })

      /* ===== AUTOMATION RATE ===== */
      .addCase(fetchAutomationRate.fulfilled, (state, action) => {
        const bot = action.payload.bot ?? 0;
        const human = action.payload.human ?? 0;
        const total = action.payload.totalQueries || 0;

        const botPercent = total ? Math.round((bot / total) * 100) : 0;

        state.doughnut1 = {
          labels: ["Bot", "Human"],
          datasets: [
            {
              data: [botPercent, 100 - botPercent],
              backgroundColor: ["#4956E6", "#242424"],
              borderWidth: 0,
            },
          ],
        };
      })

      /* ===== ESCALATION RATE ===== */
      .addCase(fetchEscalationRate.fulfilled, (state, action) => {
        const escalated = action.payload.escalated ?? 0;
        const nonEscalated = action.payload.nonEscalated ?? 0;
        const total = action.payload.totalQueries || 0;

        const escPercent = total
          ? Math.round((escalated / total) * 100)
          : 0;

        state.doughnut2 = {
          labels: ["Escalated", "Non-Escalated"],
          datasets: [
            {
              data: [escPercent, 100 - escPercent],
              backgroundColor: ["#4956E6", "#242424"],
              borderWidth: 0,
            },
          ],
        };
      })
      /* ===== LIVE KENO ===== */
      .addCase(fetchLiveKenoResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLiveKenoResult.fulfilled, (state, action) => {
        state.loading = false;
        state.liveKeno = action.payload;
      })
      .addCase(fetchLiveKenoResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default analyticsSlice.reducer;
