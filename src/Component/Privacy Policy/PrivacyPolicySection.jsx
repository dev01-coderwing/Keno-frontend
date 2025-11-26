import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const PrivacyPolicySection = () => {
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
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
            <p className="text-xs text-gray-400 mt-4">Last Updated: [Date]</p>
          </div>

          <section>
            <h3 className="text-2xl font-semibold">Welcome to PUNTMATE!</h3>
            <p className="mt-8">
              At PUNTMATE, we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform and services.
              By accessing or using PUNTMATE, you consent to the practices
              described in this policy.
            </p>
          </section>

          <div className="space-y-4">
            <div>
              <h4>1. Information We Collect</h4>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Personal Information:
                  <ul className="list-disc list-inside ml-5 space-y-1 ">
                    <li>
                      Name, email address, date of birth (for age verification).
                    </li>
                    <li>
                      Payment details (if applicable for premium services).
                    </li>
                    <li>
                      Government-issued ID (for identity verification if
                      required by law).
                    </li>
                  </ul>
                </li>
                <li>
                  Usage Data:
                  <ul className="list-disc list-inside ml-5 space-y-1 ">
                    <li>
                      Betting history, preferences, and interactions with our
                      platform.
                    </li>
                    <li>
                      Device information (IP address, browser type, operating
                      system).
                    </li>
                    <li>
                      Cookies and tracking technologies (to enhance user
                      experience).
                    </li>
                  </ul>
                </li>
                <li>
                  Third-Party Data:
                  <ul className="list-disc list-inside ml-5 space-y-1 ">
                    <li>
                      Information from betting operators or partners (with your
                      consent).
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h4>2. How We Use Your Information</h4>
              <p>Your data is used to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ">
                <li>Provide, personalize, and improve our services.</li>
                <li>
                  Verify your identity and ensure compliance with legal age
                  requirements.
                </li>
                <li>
                  Analyze betting patterns and offer tailored recommendations.
                </li>
                <li>Communicate with you (e.g., updates, customer support).</li>
                <li>Prevent fraud, abuse, and illegal activities.</li>
                <li>
                  Comply with legal obligations (e.g., tax reporting, regulatory
                  requests).
                </li>
              </ul>
            </div>

            <div>
              <h4>3. Data Sharing & Disclosure</h4>
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ">
                <li>
                  Service Providers: Third parties who assist in operations
                  (e.g., payment processors, analytics).
                </li>
                <li>
                  Legal Authorities: If required by law or to protect our rights
                  and users.
                </li>
                <li>
                  Business Transfers: In case of mergers, acquisitions, or asset
                  sales.
                </li>
              </ul>
              <p className=" mt-2">
                We do not sell your personal data to advertisers or unrelated
                third parties.
              </p>
            </div>

            <div>
              <h4>4. Data Security</h4>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>
                  We implement industry-standard measures to protect your
                  information, including:
                </li>
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                  <li>Encryption (SSL/TLS) for data transmission.</li>
                  <li>Secure storage with access controls.</li>
                  <li>Regular security audits.</li>
                </ul>
                <li className="mt-2">
                  However, no system is 100% secure—you acknowledge this risk
                  when using our services.
                </li>
              </ul>
            </div>

            <div>
              <h4>5. Your Rights & Choices</h4>
              <p className="text-sm mt-1">
                Depending on your jurisdiction, you may:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Access, correct, or delete your personal data.</li>
                <li>Opt out of marketing communications.</li>
                <li>Disable cookies (this may affect functionality).</li>
                <li>Request data portability or restrict processing.</li>
              </ul>
              <p className="text-sm mt-2">
                To exercise these rights, contact us at [support@puntmate.com].
              </p>
            </div>

            <div>
              <h4>6. Cookies & Tracking Technologies</h4>
              <p className=" mt-1">We use cookies to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ">
                <li>Remember preferences and login sessions.</li>
                <li>Analyze traffic and improve performance.</li>
                <li>Deliver targeted ads (if applicable).</li>
              </ul>
            </div>
            <div>
              <p>
                We may update this Privacy Policy periodically. Continued use of
                PUNTMATE constitutes acceptance of changes.
              </p>
              <h4>7. Contact Us</h4>
              <p className=" mt-1">
                For questions or requests regarding your privacy, email
                [privacy@puntmate.com] or visit our [Help Center].
              </p>
            </div>
          </div>
          <span className="text-xs ">
            © 2025 PUNTMATE. All rights reserved.
          </span>
          <p className="mt-6 ">
            Note: This template is a general guide. Consult a legal professional
            to ensure compliance with regional laws (e.g. GDPR, CCPA).
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
