import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const TermsOfServices = () => {
  return (
    <div className="relative min-h-screen bg-[#262626] px-4 py-6 font-poppins font-light">
   <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
  <img
    src={HorseLogo}
    alt="Background Logo"
    className="w-3/5 max-w-[800px] opacity-10 md:w-2/5 lg:w-2/4"
  />
</div>

        <div className="relative z-10 flex flex-col md:flex-row gap-10">
      <div className="w-full px-4 text-white space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Terms & Conditions</h2>
          <p className="text-xs text-gray-400 mt-4">Last Updated: [Date]</p>
        </div>
          <section>
            <h3 className="text-2xl font-semibold">Welcome to PUNTMATE!</h3>
            <p className="mt-8">
              These Terms and Conditions ("Terms") govern your use of our
              platform, services, and content. By accessing or using PUNTMATE,
              you agree to comply with these Terms. If you do not agree, please
              refrain from using our services.
            </p>
          </section>

          {[
            {
              title: "1. Eligibility",
              items: [
                "You must be at least 18 years old (or the legal gambling age in your jurisdiction) to use PUNTMATE.",
                "You are solely responsible for complying with local gambling laws. PUNTMATE does not guarantee the legality of betting in your region.",
              ],
            },
            {
              title: "2. Account Registration",
              items: [
                "Provide accurate and current information during registration.",
                "Keep your login credentials secure—you are responsible for all account activity.",
                "PUNTMATE reserves the right to suspend or terminate accounts for fraud, misuse, or violation of these Terms.",
              ],
            },
            {
              title: "3. Services & Limitations",
              items: [
                "PUNTMATE provides betting analytics, predictions, and tracking tools for informational purposes only.",
                "We do not guarantee wins or assume liability for betting losses.",
                "Services may be modified or discontinued without notice.",
              ],
            },
            {
              title: "4. Prohibited Conduct",
              pretext: "You agree not to:",
              items: [
                "Use PUNTMATE for illegal activities or violate gambling laws.",
                "Share accounts, cheat, or manipulate our systems.",
                "Harass other users or post harmful content.",
                "Reverse-engineer, scrape, or exploit PUNTMATE’s data or code.",
              ],
            },
            {
              title: "5. Intellectual Property",
              items: [
                "All content (logos, software, analytics) is owned by PUNTMATE and protected by copyright.",
                "You may use our services only for personal, non-commercial purposes.",
              ],
            },
            {
              title: "6. Responsible Gambling",
              items: [
                "PUNTMATE encourages responsible gambling. Set limits and seek help if betting becomes problematic.",
                "We provide self-exclusion tools and links to support organizations (e.g., Gamblers Anonymous).",
              ],
            },
            {
              title: "7. Disclaimers & Liability",
              items: [
                "PUNTMATE’s tools are for informational purposes only. We do not guarantee accuracy.",
                "We are not liable for:",
              ],
              subitems: [
                "Financial losses from betting.",
                "Service interruptions or technical errors.",
                "Third-party actions (e.g., betting operators).",
              ],
            },
            {
              title: "8. Termination",
              items: [
                "PUNTMATE may terminate access for violations of these Terms, with or without notice.",
              ],
            },
            {
              title: "9. Changes to Terms",
              items: [
                "We may update these Terms periodically. Continued use of PUNTMATE constitutes acceptance of changes.",
              ],
            },
            {
              title: "10. Governing Law",
              items: [
                "These Terms are governed by the laws of [Jurisdiction]. Disputes will be resolved in [Court Location].",
              ],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="">{section.title}</h4>
              {section.pretext && <p className="text-sm">{section.pretext}</p>}
              <ul className="list-disc list-inside space-y-1 mt-1">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {section.subitems && (
                <ul className="list-disc list-inside text-sm space-y-1 mt-2 ml-5">
                  {section.subitems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold">Contact Us</h4>
            <p className="mt-1">
              For questions about these Terms, email [support@puntmate.com] or
              visit our [Help Center].
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © 2025 PUNTMATE. All rights reserved.
            </p>
          </div>

          <p>
            Note: This is a general template. Consult a legal professional to
            ensure compliance with local gambling regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServices;
