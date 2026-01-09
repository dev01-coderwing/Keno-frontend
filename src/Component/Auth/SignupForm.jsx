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

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
const [pin, setPin] = useState("");
const [confirmPin, setConfirmPin] = useState("");

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
    if (!fullName || !dob || !email) {
      setAlert({ message: "Please fill in all fields.", type: "error" });
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

    if (!pin || !confirmPin) {
  setAlert({ message: "PIN is required.", type: "error" });
  return;
}

if (!/^\d{4}(\d{2})?$/.test(pin)) {
  setAlert({
    message: "PIN must be 4 or 6 digits.",
    type: "error",
  });
  return;
}

if (pin !== confirmPin) {
  setAlert({
    message: "PIN and Confirm PIN do not match.",
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
    pin,
    default_state: "NSW", 
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
    <div className="w-full flex justify-center px-4">
      <div className=" flex flex-col backdrop-blur-md gap-4
    border-2 border-white/50 rounded-2xl
    w-[88vw] max-w-md
    px-5 py-5 text-white
    scale-[0.95]
    sm:scale-[0.93]
    md:scale-[0.9]">
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

{/* PIN */}
<div className="flex flex-col gap-1">
  <label className="text-sm sm:text-base">Create PIN</label>
  <input
    type="password"
    value={pin}
    onChange={(e) => setPin(e.target.value)}
    className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
    placeholder="Enter 4 or 6 digit PIN"
    maxLength={6}
  />
</div>

{/* Confirm PIN */}
<div className="flex flex-col gap-1">
  <label className="text-sm sm:text-base">Confirm PIN</label>
  <input
    type="password"
    value={confirmPin}
    onChange={(e) => setConfirmPin(e.target.value)}
    className="w-full bg-[#0C0C0C] border border-gray-400 rounded-md px-3 py-2 placeholder:text-xs focus:outline-none"
    placeholder="Re-enter PIN"
    maxLength={6}
  />
</div>

        <span className="text-xs text-gray-300">
          A verification code will be sent to your registered email address.
        </span>

        {/* Signup Button */}
        <button
          className="w-full bg-white text-black py-2 font-semibold rounded-xl hover:bg-gray-200 transition"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Processing..." : "Verify"}
        </button>

        <ContinueSection />

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
  );
};

export default SignupForm;
