import React from "react";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const ContinueSection = () => {
  return (
    <div>
      <p className="text-xs text-center sm:text-sm">or continue with</p>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex justify-center items-center h-10 w-20 sm:w-24 text-xl sm:text-2xl rounded-lg border border-gray-400 cursor-pointer bg-[#0C0C0C] transition hover:scale-105">
          <FcGoogle />
        </div>
        <div className="flex justify-center items-center h-10 w-20 sm:w-24 text-xl sm:text-2xl rounded-lg border border-gray-400 cursor-pointer bg-[#0C0C0C] transition hover:scale-105">
          <FaApple />
        </div>
        <div className="flex justify-center items-center h-10 w-20 sm:w-24 text-xl sm:text-2xl rounded-lg border border-gray-400 cursor-pointer bg-[#0C0C0C] transition hover:scale-105">
          <BiLogoFacebookCircle />
        </div>
      </div>
    </div>
  );
};

export default ContinueSection;
