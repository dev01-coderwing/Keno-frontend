import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";

const OtpForm = ({ onOtpVerified, purpose }) => {
  const email = useSelector((state) => state.auth.email);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleVerifyOtp = async () => {
    if (!otp) {
      setAlert({ type: "error", message: "OTP is required" });
      return;
    }
    if (!email) {
      setAlert({
        type: "error",
        message: "Email is missing, please sign up again.",
      });
      return;
    }

    try {
      setLoading(true);
      setAlert({ type: "", message: "" });

      let endpoint = ""; 
      const payload = { email, otp }; 

         if (purpose === "signup") { 
        endpoint = "/users/verify-otp";
      } else if (purpose === "forgot") {
        endpoint = "/users/otp-verification";
      } else {
        setAlert({ type: "error", message: "Invalid form purpose" });
        return;
      }

      console.log("Sending OTP verification request:", {
  endpoint,
  payload,
});

      // ✅ API request
      const response = await api.post(endpoint, payload);
      
      console.log("OTP verification response:", response.data);

      if (response.data.message?.toLowerCase().includes("success")) {
        setAlert({ type: "success", message: response.data.message });
        onOtpVerified(otp);
      } else {
        setAlert({ type: "error", message: response.data.message });
      }
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response?.data?.message || error.message
      );
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex flex-col gap-4 rounded-2xl w-[90vw] max-w-lg p-6 text-white border-2 border-white/50 backdrop-blur-md sm:px-8 md:px-10">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center">
          Enter code
        </h3>
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
          <label className="text-sm sm:text-base text-gray-300">
            Enter the OTP sent to your registered email address
          </label>
          <input
            type="number"
            value={otp}
            // onChange={(e) => setOtp(e.target.value)}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} 

            className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="Enter OTP"
          />
        </div>
        <button
          onClick={handleVerifyOtp}
          className="w-full bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <p className="text-xs sm:text-sm text-center mt-10 text-gray-300">
          By confirming, you agree to our{" "}
          <span className="underline">Terms & Conditions</span> and{" "}
          <span className="underline">Privacy Policy.</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default OtpForm;
