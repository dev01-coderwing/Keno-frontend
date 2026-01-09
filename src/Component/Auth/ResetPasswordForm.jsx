import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";

const ResetPasswordForm = ({ onSwitchForm }) => {
  const email = useSelector((state) => state.auth.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setAlert({ type: "error", message: "Please fill in both fields." });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (!email) {
      setAlert({
        type: "error",
        message: "Email is missing, please start the process again.",
      });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const response = await api.post("/users/set-new-password", {
        email,
        newPassword: password,
      });

      setAlert({ type: "success", message: response.data.message });
      setTimeout(() => {
        onSwitchForm("login"); // ✅ Redirect to login after success
      }, 1500);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.message || "Error resetting password. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl px-6 sm:px-8 md:px-10 py-6 text-white w-[90vw] max-w-lg">
        <h3 className="text-2xl font-semibold text-center">Reset Password</h3>

        {alert.message && (
          <div
            className={`text-sm px-4 py-2 rounded-md text-center ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {alert.message}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm">New Password</label>
          <input
            type="password"
            className="bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Re-enter Password</label>
          <input
            type="password"
            className="bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? "Updating..." : "Confirm"}
        </button>

        <p className="text-xs text-center mt-10 text-gray-300">
          By confirming, you agree to our{" "}
          <span className="underline">Terms & Conditions</span> and{" "}
          <span className="underline">Privacy Policy.</span>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
