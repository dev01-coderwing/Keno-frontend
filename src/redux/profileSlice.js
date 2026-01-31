import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // axios instance

// ==========================
//  Update Profile API
// ==========================
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userId, fullName, email, dob }, { rejectWithValue }) => {
    try {
      const body = { fullName, email, dob };

      const res = await api.put(
        `/profile/user/update/${userId}`,
        body
      );

      return res.data.data || res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed!"
      );
    }
  }
);

// ==========================
//  Delete Account API
// ==========================
export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.delete("/users/delete-account", {
        headers: {
          "api-key": "kajal",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete account failed!"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
    successMessage: "",
  },

  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== UPDATE PROFILE =====
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "Profile updated successfully!";
        state.error = null;

        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== DELETE ACCOUNT =====
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.successMessage = "Account deleted successfully";

        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = profileSlice.actions;
export default profileSlice.reducer;
