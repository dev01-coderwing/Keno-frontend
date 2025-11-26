// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     email: "",
//   },
//   reducers: {
//     setEmail: (state, action) => {
//       state.email = action.payload;
//     },
//   },
// });

// export const { setEmail } = authSlice.actions;
// export default authSlice.reducer;import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//  SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    }
  }
);

//  LOGIN 
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resUser = await api.post("/users/login", { email, password, role: "user" });
      return resUser.data;
    } catch (errUser) {
      const status = errUser?.response?.status;
      const msg = errUser?.response?.data?.message || "";

      const isRoleMismatch =
        status === 403 && /access denied for role: user/i.test(msg);

      if (isRoleMismatch) {
        try {
          const resAdmin = await api.post("/users/login", { email, password, role: "admin" });
          return resAdmin.data;
        } catch (errAdmin) {
          return rejectWithValue(errAdmin?.response?.data?.message || "Login failed");
        }
      } else {
        return rejectWithValue(msg || "Login failed");
      }
    }
  }
);

//  SET PASSWORD 
export const setPassword = createAsyncThunk(
  "auth/setPassword",
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/users/set-password",
        { email, password, confirmPassword },
        {
          headers: {
            "api-key": "kajal",
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to set password"
      );
    }
  }
);

//  CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, oldPassword, newPassword, token }, { rejectWithValue }) => {
    try {
      const headers = {
        "api-key": "kajal",
        Authorization: `Bearer ${token}`,
      };

      const res = await api.post(
        `/reset-password/change-password/${userId}`,
        {
          oldPassword,
          newPassword,
        },
        { headers }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || { message: "Failed to change password" }
      );
    }
  }
);

//  FORGOT PASSWORD
export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/request-password-reset", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || { message: "Failed to send OTP" }
      );
    }
  }
);

// FORGOT PASSWORD
export const verifyResetOtp = createAsyncThunk(
  "auth/verifyResetOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/verify-reset-otp", { email, otp });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || { message: "OTP verification failed" }
      );
    }
  }
);

//  RESET PASSWORD 
export const resetForgotPassword = createAsyncThunk(
  "auth/resetForgotPassword",
  async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || { message: "Password reset failed" }
      );
    }
  }
);

//  AUTH SLICE 
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    user: null,
    token: null,
    loading: false,
    error: null,
    successMessage: "",
    passwordSuccess: false,
    changePasswordMessage: "",
    otpMessage: "",
    otpVerified: false,
    resetSuccess: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    resetPasswordState: (state) => {
      state.passwordSuccess = false;
      state.error = null;
      state.loading = false;
    },
    resetChangePasswordState: (state) => {
      state.changePasswordMessage = "";
      state.error = null;
      state.loading = false;
    },
    resetOtpState: (state) => {
      state.otpMessage = "";
      state.otpVerified = false;
      state.resetSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Signup successful!";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.email = user?.email || "";
        localStorage.setItem("user", JSON.stringify(user));
        if (token) localStorage.setItem("token", token);
        if (user?._id) localStorage.setItem("userId", user._id);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordSuccess = false;
      })
      .addCase(setPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordSuccess = true;
        state.successMessage =
          action.payload?.message || "Password set successfully!";
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.passwordSuccess = false;
      })

    
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.changePasswordMessage = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.changePasswordMessage =
          action.payload?.message || "Password changed successfully!";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to change password.";
      })

      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpMessage = "";
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload?.message || "OTP sent successfully!";
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to send OTP.";
      })

      .addCase(verifyResetOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.otpMessage = action.payload?.message || "OTP verified successfully!";
      })
      .addCase(verifyResetOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "OTP verification failed.";
      })

      .addCase(resetForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetSuccess = false;
      })
      .addCase(resetForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetSuccess = true;
        state.successMessage =
          action.payload?.message || "Password reset successfully!";
      })
      .addCase(resetForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Password reset failed.";
        state.resetSuccess = false;
      });
  },
});

export const {
  setEmail,
  logout,
  resetPasswordState,
  resetChangePasswordState,
  resetOtpState,
} = authSlice.actions;

export default authSlice.reducer;
