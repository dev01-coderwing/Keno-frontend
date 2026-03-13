// import React, { useState } from "react";
// import { PiCalendarDotsBold } from "react-icons/pi";
// import DatePicker from "react-datepicker";
// import ContinueSection from "./ContinueSection";
// import "react-datepicker/dist/react-datepicker.css";
// import api from "../../api"
// import { useDispatch } from "react-redux";
// import { setEmail } from "../../redux/authSlice";

// const CustomDateInput = React.forwardRef(
//   ({ value, onClick, className, ...rest }, ref) => (
//     <div
//       ref={ref}
//       onClick={onClick}
//       className={`flex items-center bg-[#0C0C0C] text-[#c8c8c8] border border-gray-400 rounded-md justify-between px-3 py-2 text-xs gap-2 cursor-pointer ${
//         className || ""
//       }`}
//       {...rest}
//     >
//       <span>{value || "DOB"}</span>
//       <PiCalendarDotsBold className="text-white" />
//     </div>
//   )
// );

// const SignupForm = ({ onSwitchForm }) => {
//   const [fullName, setFullName] = useState("");
//   const [dob, setDob] = useState(null);
//   const [email, setLocalEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState({ message: "", type: "" });

//   const dispatch = useDispatch();

//   // 👉 Calculate age
//   const getAge = (birthDate) => {
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const m = today.getMonth() - birth.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // 👉 Handle signup
//   const handleSignup = async () => {
//     if (!fullName || !dob || !email) {
//       setAlert({ message: "Please fill in all fields.", type: "error" });
//       return;
//     }

//     const age = getAge(dob);
//     if (age < 18) {
//       setAlert({
//         message: "You must be at least 18 years old to sign up.",
//         type: "error",
//       });
//       return;
//     }

//     setLoading(true);
//     setAlert({ message: "", type: "" });

//     try {
//       // ✅ use our api.js baseURL
//       const response = await api.post("/users/register", {
//         fullName,
//         dob,
//         email,
//       });

//       console.log(response.data);

//       setAlert({
//         message: "Signup successful! Please verify your email.",
//         type: "success",
//       });

//       // ✅ save email in Redux
//       dispatch(setEmail(email));

//       // ✅ go to OTP form
//       onSwitchForm("signup-otp");
//     } catch (error) {
//       const errMsg =
//         error?.response?.data?.message || "Signup failed. Please try again.";
//       setAlert({ message: errMsg, type: "error" });
//       console.error(errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center px-4">
//       <div className="flex flex-col backdrop-blur-md gap-4 border-2 border-white/50 rounded-2xl w-[90vw] max-w-lg px-6 py-6 text-white sm:px-8 md:px-10">
//         <h3 className="text-2xl sm:text-3xl font-semibold text-center">
//           Sign Up
//         </h3>

//         {/* Alert */}
//         {alert.message && (
//           <div
//             className={`text-sm text-center px-3 py-2 rounded-md ${
//               alert.type === "success"
//                 ? "bg-green-100 text-green-800"
//                 : "bg-red-100 text-red-800"
//             }`}
//           >
//             {alert.message}
//           </div>
//         )}

//         {/* Name */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm sm:text-base">Name</label>
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
//             placeholder="Enter full name"
//           />
//         </div>

//         {/* DOB */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm sm:text-base">Date of birth</label>
//           <div className="relative w-full">
//             <DatePicker
//               selected={dob}
//               onChange={(date) => setDob(date)}
//               dateFormat="dd/MM/yyyy"
//               showMonthDropdown
//               showYearDropdown
//               dropdownMode="scroll"
//               maxDate={new Date()}
//               yearDropdownItemNumber={100}
//               scrollableYearDropdown
//               calendarClassName="custom-datepicker" 
//               wrapperClassName="w-full"
//               customInput={React.createElement(CustomDateInput, {
//                 className: "w-full"
//               })}
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm sm:text-base">E-mail</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setLocalEmail(e.target.value)}
//             className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
//             placeholder="username@gmail.com"
//           />
//         </div>

//         <span className="text-xs text-gray-300">
//           A verification code will be sent to your registered email address.
//         </span>

//         {/* Signup Button */}
//         <button
//           className="w-full bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition"
//           onClick={handleSignup}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Verify"}
//         </button>

//         <ContinueSection />

//         <p className="text-xs text-center">
//           Already have an account?{" "}
//           <span
//             className="font-semibold underline cursor-pointer"
//             onClick={() => onSwitchForm("login")}
//           >
//             Log in
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


import React, { useState } from "react";
import { PiCalendarDotsBold } from "react-icons/pi";
import DatePicker from "react-datepicker";
import ContinueSection from "./ContinueSection";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, setEmail } from "../../redux/authSlice"; // ✅ redux actions

const CustomDateInput = React.forwardRef(
  ({ value, onClick, className, ...rest }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      className={`flex items-center bg-[#0C0C0C] text-[#c8c8c8] border border-gray-400 rounded-md justify-between px-3 py-2 text-xs gap-2 cursor-pointer ${
        className || ""
      }`}
      {...rest}
    >
      <span>{value || "DOB"}</span>
      <PiCalendarDotsBold className="text-white" />
    </div>
  )
);

const SignupForm = ({ onSwitchForm }) => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(null);
  const [email, setLocalEmail] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
const [state, setState] = useState("");
const [gender, setGender] = useState("");

  //  Calculate age
  const getAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSignup = async () => {
    if (!fullName || !dob || !email || !state|| !gender) {
      setAlert({ message: "Please fill in all fields.", type: "error" });
      return;
    }
 
    if (!termsAccepted) {
  setAlert({
    message: "Please accept Terms & Conditions to continue.",
    type: "error",
  });
  return;
}
    const age = getAge(dob);
    if (age < 18) {
      setAlert({
        message: "You must be at least 18 years old to sign up.",
        type: "error",
      });
      return;
    }


    setAlert({ message: "", type: "" });

    try {
     const result = await dispatch(
  signupUser({
    fullName,
    dob,
    email,
      gender,
default_state: state
  })
).unwrap();


      console.log(result);
      setAlert({
        message: "Signup successful! Please verify your email.",
        type: "success",
      });

      dispatch(setEmail(email)); 
      onSwitchForm("signup-otp");
    } catch (error) {
      setAlert({ message: error, type: "error" });
      console.error(error);
    }
  };


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
            using historical datasets.
          </li>

          <li>
            <strong>Trackside Cash Out Strategy Insights</strong> — Analyse
            historical hit frequency and behaviour of combinations.
          </li>

          <li>
            <strong>Keno Drought & Number Analysis</strong> — Track hot and cold
            numbers and drought patterns across thousands of draws.
          </li>

          <li>
            <strong>Betting Calculators</strong> — Calculate flexi bets and
            exotic combinations quickly and easily.
          </li>

          <li>
            <strong>Data Driven Insights</strong> — Understand average hit
            frequency and longest droughts.
          </li>

          <li>
            <strong>Simple, Fast and Easy to Use</strong> — Built for punters
            who want quick access to clear data.
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

      {/* RIGHT SIDE SIGNUP FORM */}
      <div className="w-full flex justify-center">

        <div
          className="flex flex-col backdrop-blur-md gap-4
          border-2 border-white/50 rounded-2xl
          w-[88vw] max-w-md
          px-5 py-5 text-white"
        >

        <h3 className="text-2xl sm:text-3xl font-semibold text-center">
          Sign Up
        </h3>

        {/* Alert */}
        {alert.message && (
          <div
            className={`text-sm text-center px-3 py-2 rounded-md ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="Enter full name"
          />
        </div>

        {/* DOB */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Date of birth</label>
          <div className="relative w-full">
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
              customInput={React.createElement(CustomDateInput, {
                className: "w-full",
              })}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setLocalEmail(e.target.value)}
            className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
            placeholder="username@gmail.com"
          />
        </div>
        {/* Gender */}
<div className="flex flex-col gap-1">
  <label className="text-sm sm:text-base">Gender</label>
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none"
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>
        {/* State */}
<div className="flex flex-col gap-1">
  <label className="text-sm sm:text-base">Select State</label>
  <select
    value={state}
    onChange={(e) => setState(e.target.value)}
    className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none"
  >
    <option value="">Select State</option>
    <option value="NSW">NSW</option>
    <option value="VIC">VIC</option>
    <option value="ACT">ACT</option>
 
  </select>
</div>

{/* PIN */}
{/* <div className="flex flex-col gap-1">
  <label className="text-sm sm:text-base">Create PIN</label>
  <input
    type="password"
    value={pin}
    onChange={(e) => setPin(e.target.value)}
    className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
    placeholder="Enter 4 or 6 digit PIN"
    maxLength={6}
  />
</div> */}

{/* Confirm PIN */}
{/* <div className="flex flex-col gap-1">
  <label className="text-sm sm:text-base">Confirm PIN</label>
  <input
    type="password"
    value={confirmPin}
    onChange={(e) => setConfirmPin(e.target.value)}
    className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
    placeholder="Re-enter PIN"
    maxLength={6}
  />
</div> */}
{/* Terms & Conditions */}
<div className="flex items-start gap-2 text-xs text-gray-300">
  <input
    type="checkbox"
    id="terms"
    checked={termsAccepted}
    onChange={(e) => setTermsAccepted(e.target.checked)}
    className="mt-1 accent-white cursor-pointer"
  />
  <label htmlFor="terms" className="cursor-pointer leading-snug">
    I agree to the{" "}
    <a
      href="/terms-of-service"
      target="_blank"
      className="underline text-white"
    >
      Terms of Service
    </a>{" "}
    and{" "}
    <a
      href="/privacy-policy"
      target="_blank"
      className="underline text-white"
    >
      Privacy Policy
    </a>
  </label>
</div>

        <span className="text-xs text-gray-300">
          A verification code will be sent to your registered email address.
        </span>

        {/* Signup Button */}
   <button
  className={`w-full py-2 font-semibold rounded-xl transition ${
    termsAccepted
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-gray-400 text-gray-700 cursor-not-allowed"
  }`}
  onClick={handleSignup}
  disabled={loading || !termsAccepted}
>
  {loading ? "Processing..." : "Verify"}
</button>


        {/* <ContinueSection /> */}

        <p className="text-xs text-center">
          Already have an account?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => onSwitchForm("login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>

    </div>

  </div>
  );
};

export default SignupForm;
