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
      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">PRIVACY POLICY</h1>
          <p className="text-xs text-gray-400 mt-2">
            PUNT DATA — Last updated: 12 January 2026
          </p>
        </div>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            1. INTRODUCTION
          </h1>
          <p>
            Punt Data is an Australian based business. We are committed to
            protecting your privacy and handling personal information in
            accordance with the Privacy Act 1988 (Cth) and the Australian Privacy
            Principles (APPs).
          </p>
          <p className="mt-2">
            This Privacy Policy explains how Punt Data collects, uses, stores,
            discloses, aggregates, de-identifies, commercialises, and otherwise
            handles information when you access or use our websites,
            applications, platforms, analytics tools, subscriptions,
            notifications, alerts, APIs, and related services (Services).
          </p>
          <p className="mt-2">
            The Services are intended for individuals aged 18 years and over.
            Punt Data does not knowingly collect personal information from
            children.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            2. PURPOSE LIMITATION AND SCOPE
          </h1>
          <p>
            Personal information is collected and used only for the purposes
            described in this Privacy Policy, or for purposes that are
            reasonably related, expected, or permitted by law.
          </p>
          <p className="mt-2">
            Aggregated and de-identified data may be used more broadly for
            analytics, research, benchmarking, reporting, and commercial
            purposes, as described below.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            3. INFORMATION WE COLLECT
          </h1>
          <p>
            If you do not provide requested information, Punt Data may be unable
            to provide access to some or all features of the Services.
          </p>

          <h2 className="mt-3 font-semibold">3.1 Personal Information</h2>
          <p>
            We may collect personal information that you voluntarily provide,
            including: • Name or username • Email address • Account or
            subscription details • Communications with us
          </p>
          <p className="mt-2">
            We do not require users to provide sensitive information to access
            the core Services.
          </p>

          <h2 className="mt-3 font-semibold">
            3.2 Usage, Analytics, and Technical Information
          </h2>
          <p>
            We may automatically collect limited technical and usage
            information, including: • Device type, browser, and operating system
            • App or website usage statistics • Session duration and interaction
            data • Approximate location information such as state or region
          </p>
        </section>
        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            4. HOW WE USE INFORMATION
          </h1>
          <p>
            We use information to: • Provide, operate, and maintain the Services •
            Manage accounts, subscriptions, billing, and support • Improve
            functionality, performance, and user experience • Conduct analytics,
            research, benchmarking, and reporting • Create aggregated and
            de-identified datasets • Commercialise aggregated and de-identified
            data • Communicate with users regarding service, administrative, or
            account matters • Detect, prevent, and address misuse or security
            issues • Comply with legal and regulatory obligations
          </p>

          <h2 className="mt-3 font-semibold">4.1 Communications and Marketing</h2>
          <p>
            Punt Data may send administrative, service-related, or informational
            communications. You may opt out of non-essential communications using
            unsubscribe mechanisms or by contacting us. Certain essential
            communications may continue where required for service delivery or
            legal compliance.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            5. AGGREGATED AND DE-IDENTIFIED DATA COMMERCIALISATION
          </h1>

          <h2 className="mt-3 font-semibold">5.1 Creation and Use</h2>
          <p>
            Punt Data may create aggregated, anonymised, and de-identified data
            derived from user activity, usage patterns, and platform analytics.
          </p>
          <p className="mt-2">
            Such data: • Does not identify individuals • Cannot reasonably be
            used to re-identify a person • Is processed only at group, cohort, or
            market level • Is subject to aggregation thresholds designed to
            prevent singling out of individuals
          </p>

          <h2 className="mt-3 font-semibold">
            5.2 Categories of Data That May Be Sold
          </h2>
          <p>
            Aggregated and de-identified data that may be disclosed, licensed, or
            sold includes: • Age range groupings • Sex or gender groupings •
            Geographic insights at broad regional, state, or national level •
            Usage trends and behavioural patterns at cohort level • Market,
            industry, and benchmarking analytics
          </p>

          <h2 className="mt-3 font-semibold">
            5.3 Accuracy and Bias Disclaimer for Aggregated Data
          </h2>
          <p>
            Aggregated and de-identified data may contain inaccuracies, biases,
            or limitations arising from source data, sampling, modelling, or
            methodology. Punt Data makes no warranty or guarantee as to the
            accuracy, completeness, representativeness, or suitability of
            aggregated data for any particular purpose.
          </p>

          <h2 className="mt-3 font-semibold">5.4 Data We Do Not Sell</h2>
          <p>
            Punt Data does not sell: • Names, email addresses, or contact details
            • Individual level behaviour or activity data • Sensitive
            information under the Privacy Act • Precise location data, IP
            addresses, or device identifiers • Any data that could reasonably
            identify an individual
          </p>

          <h2 className="mt-3 font-semibold">5.5 No Re-Identification</h2>
          <p>
            Punt Data does not attempt to re-identify individuals from aggregated
            or de-identified data and does not combine datasets for the purpose
            of re-identification.
          </p>

          <h2 className="mt-3 font-semibold">
            5.6 No Obligation to Notify of Aggregation or Sale
          </h2>
          <p>
            Punt Data is not required to notify users when information is
            aggregated, de-identified, analysed, licensed, or sold in aggregated
            form.
          </p>

          <h2 className="mt-3 font-semibold">
            5.7 No Fiduciary or Trust Relationship
          </h2>
          <p>
            Personal information and aggregated data are not held in trust.
            Users do not retain proprietary rights over aggregated, anonymised,
            or de-identified outputs.
          </p>

          <h2 className="mt-3 font-semibold">5.8 Data Buyer Responsibility</h2>
          <p>
            Punt Data is not responsible for how third-party purchasers or
            recipients use aggregated or de-identified data once disclosed,
            provided such disclosure complies with this Privacy Policy and
            applicable law.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            6. DISCLOSURE OF INFORMATION
          </h1>
          <p>
            We may disclose information to: • Service providers assisting with
            hosting, analytics, communications, payments, security, or
            operations • Professional advisers such as legal, accounting, and
            compliance advisers • Commercial partners or data buyers in
            aggregated and de-identified form only • Regulators or law
            enforcement authorities where required or authorised by law
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            7. DATA SECURITY, STORAGE, AND RETENTION
          </h1>

          <h2 className="mt-3 font-semibold">7.1 Data Security</h2>
          <p>
            We take reasonable steps to protect personal information from
            misuse, interference, loss, unauthorised access, modification, or
            disclosure.
          </p>

          <h2 className="mt-3 font-semibold">7.2 Data Retention</h2>
          <p>
            Personal information is retained only for as long as necessary to:
            • Provide and support the Services • Manage subscriptions and
            billing • Comply with legal obligations • Resolve disputes • Enforce
            agreements. When information is no longer required, it is securely
            deleted or de-identified.
          </p>

          <h2 className="mt-3 font-semibold">7.3 Overseas Disclosure</h2>
          <p>
            Punt Data may use service providers, infrastructure, or commercial
            data partners that store or process information outside Australia.
            Where this occurs, reasonable steps are taken to ensure overseas
            recipients handle information in a manner consistent with the
            Australian Privacy Principles.
          </p>

          <h2 className="mt-3 font-semibold">7.4 Data Breaches</h2>
          <p>
            Punt Data complies with the Notifiable Data Breaches scheme under the
            Privacy Act where applicable.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            8. AUTOMATED DECISION MAKING AND PROFILING
          </h1>
          <p>
            Punt Data does not use personal information to make automated
            decisions that produce legal or similarly significant effects on
            individuals.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            9. COOKIES AND TRACKING TECHNOLOGIES
          </h1>
          <p>
            We may use cookies, analytics tools, and similar technologies to: •
            Improve functionality and performance • Understand usage patterns •
            Conduct analytics and research • Support aggregated data insights.
            You can manage cookie preferences through your browser or device
            settings. Disabling cookies may affect functionality.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            10. CHANGE OF CONTROL
          </h1>
          <p>
            If Punt Data undergoes a merger, acquisition, restructuring, or sale
            of assets, personal information and aggregated data may be
            transferred as part of that transaction, subject to applicable
            privacy laws.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            11. CONFLICT AND PRIORITY
          </h1>
          <p>
            If there is any inconsistency between this Privacy Policy and the
            Punt Data Terms and Conditions, the Terms and Conditions prevail to
            the extent of the inconsistency.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            12. ACCESS, CORRECTION, AND USER RIGHTS
          </h1>
          <p>
            You may request access to, or correction of, personal information
            held about you by contacting us using the details below.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            13. COMPLAINTS
          </h1>
          <p>
            If you have a concern about how we handle personal information,
            please contact us so we can attempt to resolve the issue. If you are
            not satisfied, you may lodge a complaint with the Office of the
            Australian Information Commissioner:
            https://www.oaic.gov.au/privacy
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            14. CHANGES TO THIS POLICY
          </h1>
          <p>
            We may update this Privacy Policy from time to time. The current
            version will always be available on our website and will include the
            latest revision date.
          </p>
        </section>

        <section>
          <h1 className="text-xl md:text-2xl font-semibold mb-2">
            15. CONTACT DETAILS
          </h1>
          <p>Punt Data</p>
          <p>Email: info@puntdata.com.au</p>
          <p>Australia</p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicySection;
