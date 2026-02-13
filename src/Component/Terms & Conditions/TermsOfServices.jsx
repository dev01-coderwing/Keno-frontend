import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const TermsOfServices = () => {
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

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        {/* Headline */}
        <h3 className="text-xl font-semibold">TERMS AND CONDITIONS OF USE</h3>
        <p className="text-xs text-gray-400">PUNT DATA — Last updated: 12 January 2026</p>

        <section>
          <h4 className="text-xl font-semibold">1. INTRODUCTION AND LEGAL AGREEMENT</h4>
          <p>
            These Terms and Conditions of Use (Terms) constitute a legally binding agreement between
            you (User, you, or your) and Punt Data (we, us, or our).
          </p>
          <p>
            These Terms govern your access to, interaction with, and use of all services, products,
            platforms, websites, mobile applications, software, tools, dashboards, analytics, reports,
            datasets, application programming interfaces, notifications, alerts, and related content
            provided by Punt Data, whether free, trial, or paid (collectively, the Services).
          </p>
          <p>
            By accessing, installing, registering for, subscribing to, or using the Services in any manner
            whatsoever, you expressly acknowledge and agree that: • You have read these Terms in full •
            You understand the legal consequences of these Terms • You agree to be legally bound by these
            Terms • You accept all risks associated with use of the Services • You have the legal capacity
            to enter into this agreement
          </p>
          <p>
            If you do not agree with any part of these Terms, you must not access or use the Services.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">2. DEFINITIONS AND INTERPRETATION</h4>
          <p>
            2.1 Definitions  
            Unless the context otherwise requires: • Services means all Punt Data offerings in any form •
            Content means all information, data, analytics, outputs, text, graphics, code, statistics,
            dashboards, indicators, and materials • Third Party Data means any data sourced from external
            providers • Derived Data means aggregated, transformed, modelled, analysed, or generated data •
            Personal Information has the meaning given under the Privacy Act 1988 Cth • Australian Consumer Law
            means Schedule 2 of the Competition and Consumer Act 2010 Cth
          </p>
          <p>
            2.2 Interpretation  
            • Headings are for convenience only • Singular includes plural and vice versa • A reference to
            legislation includes amendments and replacements • Examples do not limit general wording
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">3. ELIGIBILITY, AGE, AND JURISDICTION</h4>
          <p>
            3.1 Age Requirement  
            The Services are strictly intended for individuals aged 18 years and over. By using the Services,
            you warrant that you are at least 18 years old.
          </p>
          <p>
            3.2 Legal Access  
            You warrant that your access to and use of the Services does not breach any applicable law in your
            jurisdiction.
          </p>
        </section>

               <section>
          <h4 className="text-xl font-semibold">4. NATURE AND LIMITATIONS OF THE SERVICES</h4>
          <p>
            4.1 Informational and Analytical Nature Only  
            The Services are provided strictly for informational, analytical, educational, and research
            purposes only. Punt Data: • Is not a bookmaker • Is not a wagering operator • Does not accept
            or place bets • Does not facilitate betting • Does not provide gambling services • Does not
            provide financial advice • Does not provide betting advice • Does not provide investment advice
          </p>
          <p>
            4.2 Accuracy Endeavours and No Guarantees  
            Punt Data endeavours to collect, process, and present data using reasonable care and skill.
            However, you acknowledge and agree that: • Data may be incomplete, delayed, inaccurate, or
            subject to change • Errors, omissions, and inconsistencies may occur • Third Party Data sources
            may be incorrect, withdrawn, or altered • No data, analysis, report, indicator, or output is
            guaranteed to be accurate, complete, current, or reliable
          </p>
          <p>
            To the maximum extent permitted by law, Punt Data does not warrant or guarantee the accuracy,
            completeness, timeliness, or suitability of any Content, Derived Data, or output.
          </p>
          <p>
            4.3 No Advice or Fiduciary Relationship  
            Nothing in the Services constitutes advice of any kind or creates any fiduciary, professional,
            advisory, or special relationship. All decisions made using the Services are made entirely at
            your own risk.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">5. DATA SOURCES AND COLLECTION</h4>
          <p>
            The Services may rely on public, licensed, automated, scraped, or third party data sources.
            Punt Data does not guarantee the accuracy, completeness, timeliness, or continued availability
            of any data.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">6. THIRD PARTY DATA, SYSTEMS, AND DEPENDENCIES</h4>
          <p>
            You acknowledge that the Services depend on third party platforms, infrastructure, data
            providers, hosting services, APIs, and commercial partners outside Punt Data’s control.
          </p>
          <p>
            Punt Data is not responsible for: • Errors or omissions in Third Party Data • Changes to third
            party systems • Withdrawal or suspension of data sources • Legal actions by third parties •
            Outages, interruptions, delays, or force majeure events
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">7. DISCLAIMERS, ASSUMPTION OF RISK, AND NO RELIANCE</h4>
          <p>
            7.1 Entire Use at Own Risk  
            Your use of the Services and all Content is entirely at your own risk.
          </p>
          <p>
            7.2 Comprehensive Assumption of Risk  
            You assume all risks arising from use of the Services including, without limitation: • Financial
            loss • Betting or wagering losses • Opportunity loss • Incorrect assumptions • Data errors or
            omissions • Delays or outages • Reliance on historical or statistical data. To the maximum
            extent permitted by law, you waive all claims against Punt Data arising from such use.
          </p>
          <p>
            7.3 No Reliance, No Tipping, and No Guarantees  
            You acknowledge and agree that: • You have not relied on any representation, warranty,
            statement, illustration, forecast, probability, or promise • The Services do not constitute
            tips, betting recommendations, predictions, or guarantees of outcomes • Past results do not
            predict future outcomes • No outcome, performance, return, or success is guaranteed
          </p>
          <p>
            7.4 No Duty of Care  
            To the maximum extent permitted by law, Punt Data assumes no duty of care, advisory duty,
            fiduciary duty, or obligation beyond these Terms.
          </p>
          <p>
            7.5 No Automated Decision Making  
            Punt Data does not use Personal Information to make automated decisions that produce legal or
            similarly significant effects on individuals.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">8. DERIVED DATA AND COMMERCIAL USE</h4>
          <p>
            Punt Data may create, use, disclose, license, sell, or otherwise commercialise Derived Data.
            Derived Data may include aggregated demographic insights such as age ranges, sex groupings, and
            geographic groupings. Such data is anonymised, aggregated, and cannot reasonably identify
            individuals.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">9. USER OBLIGATIONS</h4>
          <p>
            You must not: • Scrape the Services • Reverse engineer any system • Redistribute Content •
            Circumvent security measures • Interfere with or disrupt the Services
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">10. INTELLECTUAL PROPERTY</h4>
          <p>
            All intellectual property rights in the Services and Content remain with Punt Data or its
            licensors. No rights are transferred except as expressly stated.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">11. FEES, SUBSCRIPTIONS, AND NO REFUNDS</h4>
          <p>
            11.1 Monthly Billing  
            Subscriptions are charged monthly in advance until cancelled.
          </p>
          <p>
            11.2 Absolute No Refund Policy  
            To the maximum extent permitted by law: • All fees are final • No refunds • No credits • No
            pro rata refunds for partial periods • No refunds for outages, feature changes, suspensions,
            or shutdowns
          </p>
          <p>
            11.3 Chargebacks  
            Chargebacks and payment reversals are prohibited and may result in immediate termination.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">12. LIMITATION OF LIABILITY</h4>
          <p>
            To the maximum extent permitted by law, Punt Data is not liable for any loss whatsoever arising
            from use of the Services. This includes, without limitation: • Direct loss • Indirect loss •
            Consequential loss • Special loss • Loss of profits or revenue • Loss of data • Business
            interruption • Emotional distress. Where liability cannot be excluded by law, it is capped at
            the lesser of: • Fees paid in the preceding twelve months • Zero Australian dollars
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">13. INDEMNITY</h4>
          <p>
            You indemnify Punt Data against all claims, losses, damages, costs, and liabilities arising
            from your use of the Services or breach of these Terms.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">14. SUSPENSION, TERMINATION, AND SHUTDOWN</h4>
          <p>
            Punt Data may suspend, restrict, or permanently shut down the Services at any time without
            notice. No refunds, credits, or compensation apply in any circumstance.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">15. PRIVACY, DATA COMMERCIALISATION, AND OVERSEAS DISCLOSURE</h4>
          <p>
            You expressly consent to: • Collection and handling of Personal Information • Aggregation and
            de identification of data • Commercialisation and sale of aggregated data • Overseas storage,
            processing, disclosure, and data sales. All data handling occurs in accordance with the Punt
            Data Privacy Policy.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">16. ANNEX A – RESPONSIBLE GAMBLING AND USER SAFETY</h4>
          <p>
            Punt Data does not encourage gambling and does not provide tipping services, betting
            recommendations, or guarantees of winning outcomes. Gambling involves inherent risk and
            outcomes are uncertain. If gambling becomes a problem, support is available: Gambling Help
            Online https://www.gamblinghelponline.org.au Phone: 1800 858 858 (24/7)
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">17. GOVERNING LAW AND JURISDICTION</h4>
          <p>
            These Terms are governed by the laws of Australia. You submit to the exclusive jurisdiction
            of Australian courts.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">18. ENTIRE AGREEMENT AND PRIORITY</h4>
          <p>
            These Terms constitute the entire agreement between you and Punt Data and override all prior
            discussions or representations.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">19. ENTIRE RISK ACKNOWLEDGEMENT AND RELEASE</h4>
          <p>
            You acknowledge that Punt Data is a data analytics platform only. You accept full responsibility
            for all decisions, actions, outcomes, and consequences arising from your access to or use of
            the Services. To the maximum extent permitted by law, you release Punt Data from all claims,
            causes of action, liabilities, and demands arising from your use of the Services.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">20. CLASS ACTION WAIVER</h4>
          <p>
            To the maximum extent permitted by law, you agree that any dispute, claim, or proceeding must
            be brought in your individual capacity only and not as part of any class, collective,
            representative, or group proceeding.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">21. SEVERABILITY</h4>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable, the remaining
            provisions remain in full force and effect.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">22. SURVIVAL</h4>
          <p>
            All clauses relating to limitation of liability, no refunds, indemnity, data commercialisation,
            privacy, assumption of risk, class action waiver, and governing law survive termination.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">23. CONTACT DETAILS</h4>
          <p>Punt Data Email: info@puntdata.com.au Australia</p>
        </section>


      
      </div>
    </div>
  );
};

export default TermsOfServices;
