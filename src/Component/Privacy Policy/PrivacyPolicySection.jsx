import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const PrivacyPolicySection = () => {
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

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Punt Data – App Privacy Policy</h2>
          <p className="text-xs text-gray-400 mt-2">
            Last updated: [insert date]
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h4 className="font-semibold">1. Who We Are</h4>
            <p>
              Punt Data (“we” / “our”) is an Australian-based platform. We handle
              information in line with the Privacy Act 1988 (Cth) and the
              Australian Privacy Principles.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">2. What We Collect</h4>
            <p>We may collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Name or username</li>
              <li>Email address and contact details</li>
              <li>Account or subscription information</li>
            </ul>

            <p className="mt-4">
              We may also collect limited technical and usage information such as:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Device and operating system</li>
              <li>App usage statistics and session activity</li>
              <li>Approximate Australian region (no precise location)</li>
            </ul>

            <p className="mt-2">
              We do not collect sensitive personal information.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">3. How We Use Information</h4>
            <p>We use information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide and operate the app</li>
              <li>Improve features and performance</li>
              <li>Carry out analytics and reporting</li>
              <li>Communicate with users</li>
              <li>Meet legal obligations</li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold">
              4. Aggregated &amp; De-Identified Data (Commercial Use)
            </h4>
            <p>
              Punt Data may use, share, license, or commercially sell aggregated
              and de-identified data derived from user activity.
            </p>
            <p className="mt-2">This data:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>does not identify any person</li>
              <li>cannot reasonably be used to identify anyone</li>
              <li>is used at group, cohort, performance, or market level</li>
            </ul>
            <p className="mt-2">
              We do not sell personal information, names, emails, or identifiable
              records.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">5. Sharing Information</h4>
            <p>We may share information with:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Hosting and analytics service providers</li>
              <li>Professional advisers</li>
              <li>Regulators or authorities where legally required</li>
            </ul>
            <p className="mt-2">
              All third parties must handle data securely.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">6. Data Security</h4>
            <p>
              We take reasonable steps to protect information using secure
              systems, access controls, and data minimisation practices.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">7. Your Rights</h4>
            <p>
              You may request access to or correction of your personal
              information by contacting us.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">8. Cookies / Tracking</h4>
            <p>
              We may use cookies or similar technologies to improve functionality
              and analytics. You may manage preferences through device settings.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">9. Complaints</h4>
            <p>
              If you have privacy concerns, contact us first. You can also
              contact the Office of the Australian Information Commissioner at{" "}
              <span className="text-blue-400">www.oaic.gov.au</span>.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">10. Policy Updates</h4>
            <p>
              We may update this policy from time to time. The latest version
              will always be published.
            </p>
          </section>

          <section>
            <h4 className="font-semibold">11. Contact Us</h4>
            <p>Punt Data</p>
            <p>Email: [insert contact email]</p>
            <p>Australia</p>
          </section>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          © 2026 Punt Data. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
