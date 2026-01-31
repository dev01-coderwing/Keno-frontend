import React from "react";
import puntLogo from "../public/image/PuntData.png"; 
// 👆 apne logo ka correct path de dena

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1c1c1c] to-[#0b0b0b]">
      <div className="w-[90%] max-w-md rounded-2xl border border-[#2a2a2a] bg-[#151515] p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        
        {/* Logo */}
        <img
          src={puntLogo}
          alt="Punt Data"
          className="mx-auto mb-6 w-36"
        />

        {/* Title */}
        <h1 className="mb-3 text-3xl font-bold tracking-wide text-white">
          Coming Soon
        </h1>

        {/* Sub text */}
        <p className="mb-6 text-sm text-gray-400">
          We’re working hard to bring something amazing.
        </p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Contact */}
        <p className="text-sm text-gray-400">
          For enquiries
        </p>
        <a
          href="mailto:info@puntdata.com.au"
          className="mt-1 inline-block text-sm font-semibold text-[#ffb800] hover:underline"
        >
          info@puntdata.com.au
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
