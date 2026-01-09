import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/api/v1/notification/";

/* ================= FETCH ALL NOTIFICATIONS ================= */
export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch notifications");
    }
  }
);

/* ================= UNREAD COUNT ================= */
export const fetchUnreadCount = createAsyncThunk(
  "notification/fetchUnreadCount",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}unread/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.count;
    } catch (err) {
      return rejectWithValue("Failed to fetch unread count");
    }
  }
);

/* ================= MARK ALL AS READ ================= */
export const markAllRead = createAsyncThunk(
  "notification/markAllRead",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API}read-all/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return true;
    } catch (err) {
      return rejectWithValue("Failed to mark all read");
    }
  }
);

/* ================= SLICE ================= */
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.unreadCount = 0;
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isRead: true,
        }));
      });
  },
});

export default notificationSlice.reducer;
  