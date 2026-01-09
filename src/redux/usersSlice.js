import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* =======================
   Fetch All Users
======================= */
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/profile/users", {
        headers: {
          "API-KEY": "kajal",
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

/* =======================
   Toggle User Status
======================= */
export const toggleUserStatus = createAsyncThunk(
  "users/toggleStatus",
  async ({ userId, currentStatus }, { rejectWithValue }) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await api.patch(
        `/profile/status/${userId}`,
        { status: newStatus },
        {
          headers: {
            "API-KEY": "kajal",
            "Content-Type": "application/json",
          },
        }
      );

      return { userId, newStatus };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update status"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    updatingId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---------- Fetch Users ---------- */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- Toggle Status ---------- */
      .addCase(toggleUserStatus.pending, (state, action) => {
        state.updatingId = action.meta.arg.userId;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const { userId, newStatus } = action.payload;
        state.users = state.users.map((u) =>
          u._id === userId ? { ...u, status: newStatus } : u
        );
        state.updatingId = null;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.updatingId = null;
      });
  },
}); 

export default usersSlice.reducer;
