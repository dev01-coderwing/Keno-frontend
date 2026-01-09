import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/authSlice";

const ChangePasswordForm = ({ userId }) => {
  const dispatch = useDispatch();

  const { loading, changePasswordMessage, error } = useSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localMessage, setLocalMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalMessage("");

    if (newPassword !== confirmPassword) {
      setLocalMessage("New password and confirm password do not match");
      return;
    }

    if (!token || !userId) {
      setLocalMessage("No valid user session found. Please log in again.");
      return;
    }

    dispatch(
      changePassword({
        userId,
        oldPassword: currentPassword,
        newPassword,
        token,
      })
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-400">
          Current Password
        </label>
        <input
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border border-gray-600 rounded-lg px-4 py-2.5 bg-[#0C0C0C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-400">
          New Password
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-600 rounded-lg px-4 py-2.5 bg-[#0C0C0C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-400">
          Confirm New Password
        </label>
        <input
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-600 rounded-lg px-4 py-2.5 bg-[#0C0C0C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
      </div>

      {(localMessage || changePasswordMessage || error) && (
        <p
          className={`text-sm mt-2 text-center ${
            (changePasswordMessage && !error) || localMessage.includes("success")
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {localMessage || changePasswordMessage || error}
        </p>
      )}

      <button
        type="submit"
        className={`w-full text-white font-semibold rounded-lg py-3 transition duration-300 ease-in-out ${
          loading ? "bg-gray-700 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
        }`}
        disabled={loading}
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
