import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // axios instance

// 🔹 Update Profile API
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userId, fullName, email, dob }, { rejectWithValue }) => {
    try {
      const body = { fullName, email, dob };

      const res = await api.put(
        `/profile/user/update/${userId}`,
        body5
      );

      return res.data.data || res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed!"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    user: null,
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
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = profileSlice.actions;
export default profileSlice.reducer;
