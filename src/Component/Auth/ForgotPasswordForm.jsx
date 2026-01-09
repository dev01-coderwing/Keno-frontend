import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset, setEmail } from "../../redux/authSlice";

const ForgotPasswordForm = ({ onSwitchForm }) => {
  const [email, setEmailState] = useState("");
  const dispatch = useDispatch();

  const { loading, error, otpMessage } = useSelector((state) => state.auth);

  const handleSendOtp = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    dispatch(requestPasswordReset(email)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(setEmail(email));
        onSwitchForm("forgot-otp"); 
      }
    });
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl w-[90vw] max-w-lg px-6 py-6 text-white sm:px-8 md:px-10">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center">
          Forgot Password
        </h3>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Email</label>
          <input
            type="email"
            className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e) => setEmailState(e.target.value)}
          />
        </div>

        {/* Alert Message */}
        {error && (
          <p className="text-sm text-red-400">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
        {otpMessage && (
          <p className="text-sm text-green-400">{otpMessage}</p>
        )}

        {/* Send OTP Button */}
        <button
          className="w-full bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          onClick={handleSendOtp}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        {/* Switch to Signup */}
        <p className="text-xs text-center mt-2">
          Don’t have an account yet?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => onSwitchForm("signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
