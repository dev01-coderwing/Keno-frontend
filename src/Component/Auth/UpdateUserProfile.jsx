import React, { useState, useEffect } from "react";
import { PiCalendarDotsBold } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, clearMessage } from "../../redux/profileSlice";
import ChangePasswordForm from "./ChangePasswordForm";

const CustomDateInput = React.forwardRef(
  ({ value, onClick, className, ...rest }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      className={`flex items-center text-[#c8c8c8] border border-gray-600 rounded-lg justify-between px-4 py-2.5 text-xs gap-2 cursor-pointer transition-colors duration-200 hover:border-blue-500 ${className || ""}`}
      {...rest}
    >
      <span>{value || "Select Date of Birth"}</span>
      <PiCalendarDotsBold className="text-gray-400" />
    </div>
  )
);

const UpdateUserProfile = () => {
  const [dob, setDob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
  });
  const [showChangePw, setShowChangePw] = useState(false);

const storedUser = JSON.parse(localStorage.getItem("user"));
const userId =
  storedUser?._id ||
  storedUser?.id ||
  localStorage.getItem("userId");


  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.profile
  );

  // 🔹 Fetch existing user profile from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setFormData({
        fullName: storedUser.fullName || "",
        email: storedUser.email || "",
        dob: storedUser.dob || "",
      });

      setDob(storedUser.dob ? new Date(storedUser.dob) : null);
    }
  }, []);

  // 🔹 Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit handler (Redux)
  const handleProfileSubmit = (e) => {
    e.preventDefault();

    dispatch(clearMessage());

    dispatch(
      updateUserProfile({
        userId,
        fullName: formData.fullName,
        email: formData.email,
        dob: dob ? dob.toISOString().split("T")[0] : "",
      })
    );
  };

  return (
    <div className="flex justify-center bg-[#262626] items-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-xl bg-[#1D1D1D] shadow-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Update Profile
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Manage your personal information and password securely.
        </p>

        {/* Profile Form */}
        <form onSubmit={handleProfileSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-600 rounded-lg px-4 py-2.5 bg-[#0C0C0C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-600 rounded-lg px-4 py-2.5 bg-[#0C0C0C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          {/* DOB */}
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Date of Birth
            </label>

            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="scroll"
              maxDate={new Date()}
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              calendarClassName="custom-datepicker"
              wrapperClassName="w-full"
              customInput={<CustomDateInput className="w-full" />}
            />
          </div>

          {/* Error / Success message */}
          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-400 text-center text-sm">
              {successMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg py-3 transition duration-300 ease-in-out transform shadow-lg"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Change Password */}
        <div className="mt-6">
          <button
            onClick={() => setShowChangePw((prev) => !prev)}
            className="w-full border border-gray-600 hover:bg-gray-800 text-gray-300 font-semibold rounded-lg py-3 transition duration-300 ease-in-out"
          >
            {showChangePw ? "Hide Password Section" : "Change Password"}
          </button>
        </div>

        {/* Password Section */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showChangePw ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 rounded-lg bg-[#0F0F0F]">
            <ChangePasswordForm userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
