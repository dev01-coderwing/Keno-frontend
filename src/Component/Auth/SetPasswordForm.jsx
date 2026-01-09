// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import api from "../../api";

// const SetPasswordForm = ({ email: propEmail, onPasswordSet }) => {
//   const reduxEmail = useSelector((state) => state.auth.email);
//   const email = propEmail || reduxEmail; // ✅ fallback

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!email || !password || !confirmPassword) {
//       setError("Email, password, and confirm password are required");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const payload = { email, password, confirmPassword };
//       const res = await api.post("/users/set-password", payload);

//       if (res.status === 200) {
//         alert("Password set successfully. Redirecting to login...");
//         if (onPasswordSet) onPasswordSet();
//       } else {
//         setError(res.data?.message || "Something went wrong");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Error connecting to server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl px-10 py-6 text-white w-[90vw] max-w-lg">
//       <h3 className="text-2xl font-semibold">Set Password</h3>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm">New Password</label>
//         <input
//           type="password"
//           className="bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <div className="flex flex-col gap-1">
//         <label className="text-sm">Confirm Password</label>
//         <input
//           type="password"
//           className="bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2"
//           placeholder="Confirm new password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//       </div>

//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <button
//         className="bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition"
//         onClick={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Set Password"}
//       </button>
//     </div>
//   );
// };

// export default SetPasswordForm;





import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPassword, resetPasswordState } from "../../redux/authSlice";

const SetPasswordForm = ({ email: propEmail, onPasswordSet }) => {
  const dispatch = useDispatch();

  
  const reduxEmail = useSelector((state) => state.auth.email);
  const { loading, error, passwordSuccess } = useSelector((state) => state.auth);

  
  const email = propEmail || reduxEmail;
  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      alert("Email, password, and confirm password are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(setPassword({ email, password, confirmPassword }));
  };

  useEffect(() => {
    if (passwordSuccess) {
      alert("Password set successfully! Redirecting to login...");
      if (onPasswordSet) onPasswordSet();
      dispatch(resetPasswordState());
    }
  }, [passwordSuccess, dispatch, onPasswordSet]);

  return (
    <div className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl px-10 py-6 text-white w-[90vw] max-w-lg">
      <h3 className="text-2xl font-semibold">Set Password</h3>

      <div className="flex flex-col gap-1">
        <label className="text-sm">New Password</label>
        <input
          type="password"
          className="bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm">Confirm Password</label>
        <input
          type="password"
          className="bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className={`bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Set Password"}
      </button>
    </div>
  );
};

export default SetPasswordForm;
