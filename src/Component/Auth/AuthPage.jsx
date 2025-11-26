import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpForm from "./OtpForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SetPasswordForm from "./SetPasswordForm";

const signupBg =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754648859/SignUp_jxsfbu.jpg";
const horseLogo =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754648859/horse_aqkowv.png";

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [userEmail, setUserEmail] = useState("" );
    const [otpValue, setOtpValue] = useState(""); // <-- Add this state

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return <LoginForm onSwitchForm={setCurrentForm} />;

      case "signup":
        return (
          <SignupForm
            onSwitchForm={setCurrentForm}
            setUserEmail={setUserEmail}
          />
        );

      case "signup-otp":
        return (
          <OtpForm
            email={userEmail}
            onOtpVerified={() => {
              setCurrentForm("set-password");
            }}
            purpose="signup"
          />
        );

      case "set-password":
        return (
          <SetPasswordForm
            email={userEmail}
            onPasswordSet={() => setCurrentForm("login")}
          />
        );

      case "reset":
        return (
          <ResetPasswordForm
            userEmail={userEmail}
            otpValue={otpValue} 
            onSwitchForm={setCurrentForm}
          />
        );

      case "forgot":
        return (
          <ForgotPasswordForm
            onSwitchForm={setCurrentForm}
            setUserEmail={setUserEmail}
          />
        );

      case "forgot-otp":
        return (
          <OtpForm
            email={userEmail}
            onOtpVerified={(otp) => {
              // <-- Capture the OTP from the child component
              setOtpValue(otp); // <-- Store the OTP
              setCurrentForm("reset"); // <-- Switch the form
            }}
            purpose="forgot"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-6 bg-cover bg-center font-poppins font-light"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.7)), url(${signupBg})`,
      }}
    >
      <div className="mb-6 md:mb-0">
        <img
          src={horseLogo}
          alt="horseLogo"
          className="h-32 sm:h-40 md:h-60 object-contain"
        />
      </div>
      <div className="w-full sm:w-auto">{renderForm()}</div>
    </div>
  );
};

export default AuthPage;
