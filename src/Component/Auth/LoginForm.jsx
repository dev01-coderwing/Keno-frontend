// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setEmail } from "../../redux/authSlice"; // ✅ redux
// import ContinueSection from "./ContinueSection";
// import api from "../../api"; 

// const LoginForm = ({ onSwitchForm }) => {
//   const [email, setEmailState] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const loginWithRole = (role) => {
//     return api.post("/users/login", { email, password, role });
//   };

//   const handleSuccess = (response) => {
//     const data = response?.data || {};
//     const user = data.user || {};

//     // ✅ Save to localStorage
//     localStorage.setItem("user", JSON.stringify(user));
//     if (data.token) localStorage.setItem("token", data.token);
//     const userId = user._id || user.id;
//     if (userId) localStorage.setItem("userId", userId);

//     // ✅ Store email in redux
//     dispatch(setEmail(email));

//     // (optional) notify header
//     window.dispatchEvent(new Event("userUpdated"));

//     alert("Login successful!");
//     setTimeout(() => {
//       console.log(`This is the user role ${user.role}`)
//       if (user.role === "admin") navigate("/dashboard");
//       else navigate("/");
//     }, 1000);
//   };

//   const handleError = (error) => {
//     const errMsg = error?.response?.data?.message || "Login failed";
//     setErrorMsg(errMsg);
//     alert(errMsg);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       // Try normal user login first
//       const resUser = await loginWithRole("user");
//       handleSuccess(resUser);
//     } catch (errUser) {
//       const status = errUser?.response?.status;
//       const msg = errUser?.response?.data?.message || "";

//       const isRoleMismatch =
//         status === 403 && /access denied for role: user/i.test(msg);

//       if (isRoleMismatch) {
//         try {
//           const resAdmin = await loginWithRole("admin");
//           handleSuccess(resAdmin);
//         } catch (errAdmin) {
//           handleError(errAdmin);
//         }
//       } else {
//         handleError(errUser);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl w-[90vw] max-w-lg px-6 py-6 text-white sm:px-8 md:px-10"
//       >
//         <h3 className="text-2xl sm:text-3xl font-semibold text-center">
//           Login
//         </h3>

//         {errorMsg && (
//           <p className="text-sm text-red-400 text-center">{errorMsg}</p>
//         )}

//         <div className="flex flex-col gap-1">
//           <label className="text-sm sm:text-base">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmailState(e.target.value)}
//             className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
//             placeholder="username@gmail.com"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-sm sm:text-base">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
//             placeholder="password"
//             required
//           />
//         </div>

//         <span
//           className="text-xs sm:text-sm cursor-pointer hover:underline self-end"
//           onClick={() => onSwitchForm("forgot")}
//         >
//           Forgot Password?
//         </span>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition"
//         >
//           {loading ? "Logging in..." : "Log in"}
//         </button>

//         <ContinueSection />

//         <p className="text-xs text-center">
//           Don’t have an account yet?{" "}
//           <span
//             className="font-semibold underline cursor-pointer"
//             onClick={() => onSwitchForm("signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, loginUser } from "../../redux/authSlice"; // ✅ redux
import ContinueSection from "./ContinueSection";

const LoginForm = ({ onSwitchForm }) => {
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.auth);

  // ✅ Store email in Redux whenever changed
  useEffect(() => {
    if (email) dispatch(setEmail(email));
  }, [email, dispatch]);

  // ✅ Navigate when user login success
  useEffect(() => {
    if (user) {
      alert("Login successful!");
      setTimeout(() => {
        console.log(`This is the user role ${user.role}`);
        if (user.role === "admin") navigate("/dashboard");
        else navigate("/");
      }, 1000);
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl w-[90vw] max-w-lg px-6 py-6 text-white sm:px-8 md:px-10"
      >
        <h3 className="text-2xl sm:text-3xl font-semibold text-center">Login</h3>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmailState(e.target.value)}
            className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="username@gmail.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="password"
            required
          />
        </div>

        <span
          className="text-xs sm:text-sm cursor-pointer hover:underline self-end"
          onClick={() => onSwitchForm("forgot")}
        >
          Forgot Password?
        </span>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <ContinueSection />

        <p className="text-xs text-center">
          Don’t have an account yet?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => onSwitchForm("signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
