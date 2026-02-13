import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const ContactUsSection = () => {
  return (
    <div className="relative min-h-screen bg-[#262626] px-4 py-6 font-poppins font-light text-white">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <img
          src={HorseLogo}
          alt="Background Logo"
          className="w-3/5 max-w-[800px] opacity-10 md:w-2/5 lg:w-2/4"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <div className="w-full px-4 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Contact Us</h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xl font-semibold">Customer Support</p>
              <p>Email: info@puntdata.com.au</p>
            </div>

            <div>
              <p className="text-xl font-semibold">Connect With Us</p>
              <p>Facebook: Punt Data</p>
              <p>Instagram: @puntdata</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-400">
            © 2026 Punt Data. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
