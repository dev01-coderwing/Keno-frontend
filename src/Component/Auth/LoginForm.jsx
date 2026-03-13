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
  // useEffect(() => {
  //   if (user) {
  //     // alert("Login successful!");
  //     setTimeout(() => {
  //       console.log(`This is the user role ${user.role}`);
  //       if (user.role === "admin") navigate("/dashboard");
  //       else navigate("/");
  //     }, 1000);
  //   }
  // }, [user, navigate]);




  useEffect(() => {
  if (user) {
    setTimeout(() => {
      const today = new Date();
      const expiry = new Date(user.subscriptionExpiry);

      const isExpired = expiry < today;

      if (isExpired) {
        navigate("/subscription"); // 👈 Expired → subscription page
        return;
      }

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    }, 1000);
  }
}, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  useEffect(() => {
  console.log("Redux user state:", user);
}, [user]);


return (
  <div className="w-full min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-7xl grid md:grid-cols-2 gap-10 items-center">

      {/* LEFT SIDE CONTENT */}
      <div className="text-white space-y-4 hidden md:block">

        <h1 className="text-4xl font-bold">
          Welcome to Punt Data
        </h1>

        <p className="text-gray-300">
          See the numbers behind the game. Punt Data is an independent analytics
          platform designed to help punters better understand historical
          Trackside and Keno results using real published race and draw data.
        </p>

        <p className="text-gray-300">
          Instead of guessing, Punt Data allows you to explore long term
          patterns, hit frequencies, droughts and historical behaviour so you
          can see which entries and combinations appear more often and which may
          be on extended dry runs.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Features</h2>

        <ul className="list-disc list-inside space-y-2 text-gray-300">

          <li>
            <strong>Trackside Exotic Analytics</strong> — Review the most
            frequent Quinella, Exacta, Trifecta and First Four combinations
            using large historical datasets.
          </li>

          <li>
            <strong>Trackside Cash Out Strategy Insights</strong> — Analyse
            historical hit frequency and behaviour of combinations.
          </li>

          <li>
            <strong>Keno Drought & Number Analysis</strong> — Track hot and cold
            numbers and extended droughts across thousands of draws.
          </li>

          <li>
            <strong>Betting Calculators</strong> — Calculate flexi bets, exotic
            combinations and staking scenarios quickly and easily.
          </li>

          <li>
            <strong>Data Driven Insights</strong> — Understand average hit
            frequency and longest droughts.
          </li>

          <li>
            <strong>Simple, Fast and Easy to Use</strong> — Built for punters who
            want quick access to clear data without complicated tools.
          </li>

        </ul>

        <p className="text-gray-400 text-sm pt-4">
          Punt Data focuses purely on analysing published historical results so
          users can better understand how often numbers and combinations appear
          over time.
        </p>

        <p className="text-gray-500 text-xs">
          Historical results only. Past performance does not guarantee future
          outcomes. Punt Data provides data analysis only and does not provide
          betting advice.
        </p>

      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl w-[90vw] max-w-lg px-6 py-6 text-white sm:px-8 md:px-10"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-center">
            Login
          </h3>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
              className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 focus:outline-none"
              placeholder="username@gmail.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 focus:outline-none"
              placeholder="password"
              required
            />
          </div>

          <span
            className="text-xs cursor-pointer hover:underline self-end"
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

          {/* <ContinueSection /> */}

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

    </div>
  </div>
);
};

export default LoginForm;
