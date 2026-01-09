import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const ContactUsSection = () => {
  return (
    <div className="relative min-h-screen bg-[#262626] px-4 py-6 font-poppins font-light text-white">
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
            <p className="text-xs text-gray-400 mt-4">Last Updated: [Date]</p>
          </div>

          <section>
            <h3 className="text-2xl font-semibold">Welcome to PUNTMATE!</h3>
            <p className="mt-8">
              We’re here to help! Reach out to our team for support, feedback, or inquiries.
            </p>
          </section>

          <div className="space-y-6">
            <div>
              <p className="font-semibold">Customer Support</p>
              <p className="underline">Email: support@puntmate.com</p>
              <p>Phone: +1 (555) 123-4567 (Monday–Friday, 9AM–6PM EST)</p>
              <p>Live Chat: Available through our website or mobile app</p>
            </div>

            <div>
              <p className="font-semibold">Mailing Address</p>
              <p>PUNTMATE Inc.</p>
              <p>123 Betting Avenue, Suite 500</p>
              <p>Las Vegas, NV 89101</p>
              <p>United States</p>
            </div>

            <div>
              <p className="font-semibold">Technical Support</p>
              <p>For technical issues or website problems:</p>
              <p>Email: techsupport@puntmate.com</p>
              <p>Help Center: Submit a support ticket through our website</p>
            </div>

            <div>
              <p className="font-semibold">Responsible Gambling Support</p>
              <p>If you need help with problem gambling:</p>
              <p>
                National Council on Problem Gambling:{" "}
                <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer">
                  www.ncpgambling.org
                </a>
              </p>
              <p>24/7 Helpline: 1-800-GAMBLER</p>
            </div>

            <div>
              <p className="font-semibold">Business Inquiries</p>
              <p>For partnership opportunities or media requests:</p>
              <p>Email: partners@puntmate.com</p>
            </div>

            <div>
              <p className="font-semibold">Connect With Us</p>
              <p>Facebook: facebook.com/puntmate</p>
              <p>Instagram: instagram.com/puntmate</p>
              <p>Twitter: twitter.com/puntmate</p>
            </div>
          </div>

          <div>
            <p>
              We typically respond to inquiries within 24–48 hours. For urgent matters, please use our live chat or
              phone support during business hours.
            </p>
            <p className="mt-4 text-xs">© 2025 PUNTMATE. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
