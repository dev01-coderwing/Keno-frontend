import HorseLogo from "../../assets/horse-logo.png";

const ResponsibleGamblingSection = () => {
  return (
    <div className="relative w-full bg-[#262626] rounded-lg text-white px-4 py-10 font-poppins font-light">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <img
          src={HorseLogo}
          alt="Background Logo"
          className="w-3/5 max-w-[800px] opacity-10 md:w-2/5 lg:w-2/4"
        />
      </div>

      <div className="relative z-10 mx-auto space-y-6 px-4">
        <h3 className="text-xl font-semibold">LEGAL AND COMPLIANCE STATEMENT</h3>
        <p className="text-sm opacity-80">
          PUNT DATA — Last updated: 12 January 2026
        </p>

        <section>
          <h4 className="text-xl font-semibold">1. PURPOSE OF THIS DOCUMENT</h4>
          <p>
            This Legal and Compliance Statement explains the nature, scope,
            limitations, and regulatory positioning of Punt Data.
            This document operates alongside, and must be read together with, the
            Punt Data Terms and Conditions and Privacy Policy.
            In the event of any inconsistency, the Terms and Conditions prevail.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">2. NATURE OF THE SERVICE</h4>
          <p>
            Punt Data is a data analytics and information platform only. Punt Data:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Is not a bookmaker or wagering operator</li>
            <li>Does not accept, place, or facilitate bets</li>
            <li>Does not provide gambling services</li>
            <li>Does not provide betting tips or recommendations</li>
            <li>Does not provide predictions of outcomes</li>
            <li>
              Does not provide financial, investment, or wagering advice
            </li>
          </ul>
          <p className="mt-2">
            All information is provided strictly for informational, analytical,
            educational, and research purposes only.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">
            3. DATA, RANDOMNESS, AND PROBABILITY
          </h4>
          <p>
            Punt Data presents historical and statistical data derived from
            publicly available or third-party sources.
          </p>
          <p>Users acknowledge and agree that:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Each draw or race is independent of previous outcomes</li>
            <li>Probabilities do not change based on past results</li>
            <li>Droughts and streaks occur naturally in random systems</li>
            <li>
              Historical data does not indicate or predict future performance
            </li>
          </ul>
          <p className="mt-2">
            Punt Data endeavours to collect and present data using reasonable
            care and skill. However, no warranty or guarantee is given as to
            accuracy, completeness, timeliness, availability, or reliability.
            The absence, delay, or non-availability of any data does not imply
            significance, prediction, or meaning and must not be interpreted as
            an indicator of future outcomes or events.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">
            4. NO TIPPING, NO GUARANTEES, AND NO RELIANCE
          </h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Tips, selections, or recommendations</li>
            <li>Predictions or forecasts</li>
            <li>Guarantees of winning, success, or outcomes</li>
            <li>Guarantees of accuracy, performance, or availability</li>
          </ul>
          <p className="mt-2">
            Users must not rely on the Services as a basis for betting, wagering,
            or financial decisions. Past results do not predict future outcomes.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">5. ASSUMPTION OF RISK</h4>
          <p>Use of Punt Data is entirely at the user’s own risk.</p>
          <p>Users assume all risks arising from use of the Services, including but not limited to:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Financial loss</li>
            <li>Gambling or wagering losses</li>
            <li>Errors or omissions in data</li>
            <li>Delays, outages, or system interruptions</li>
            <li>Decisions made based on presented information</li>
          </ul>
        </section>

        <section>
          <h4 className="text-xl font-semibold">6. LIMITATION OF LIABILITY</h4>
          <p>
            To the maximum extent permitted by law, Punt Data is not liable for
            any loss or damage arising from use of the Services.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Direct or indirect loss</li>
            <li>Consequential or incidental loss</li>
            <li>Loss of profits, winnings, or opportunity</li>
            <li>Data loss or business interruption</li>
            <li>Emotional distress</li>
          </ul>
          <p className="mt-2">
            Where liability cannot be excluded, it is limited to the lesser of:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              The amount paid by the user to Punt Data in the preceding twelve
              months
            </li>
            <li>Zero Australian dollars</li>
          </ul>
        </section>

        <section>
          <h4 className="text-xl font-semibold">
            7. THIRD PARTY DATA AND DEPENDENCIES
          </h4>
          <p>
            Punt Data relies on third-party data sources, platforms,
            infrastructure, hosting services, and automated systems.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Errors or changes in third-party data</li>
            <li>Delays in publication or availability of results</li>
            <li>
              Withdrawal, suspension, or correction of published results
            </li>
            <li>Outages or interruptions beyond its control</li>
            <li>Actions or omissions of third-party providers</li>
          </ul>
          <p className="mt-2">
            Punt Data does not guarantee uninterrupted access, dataset
            completeness, or the availability of any specific data point at any
            time.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">8. RESPONSIBLE GAMBLING</h4>
          <p>
            Punt Data does not encourage gambling and does not promote excessive
            or irresponsible wagering.
          </p>
          <p>Users are encouraged to:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Gamble within their means</li>
            <li>Treat gambling as entertainment only</li>
            <li>Avoid chasing losses</li>
            <li>Seek help if gambling becomes problematic</li>
          </ul>
          <p className="mt-2">
            Support services are available:
            <br />
            Gambling Help Online
            <br />
            https://www.gamblinghelponline.org.au
            <br />
            Phone: 1800 858 858 (24/7)
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">
            9. JURISDICTION AND GOVERNING LAW
          </h4>
          <p>
            This document is governed by the laws of Australia. Any disputes are
            subject to the exclusive jurisdiction of Australian courts.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">10. UPDATES AND CHANGES</h4>
          <p>
            This Legal and Compliance Statement may be updated from time to time.
            The current version will always be made available through Punt Data
            platforms.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold">11. CONTACT DETAILS</h4>
          <p>Punt Data</p>
          <p>Email: info@puntdata.com.au</p>
          <p>Australia</p>
        </section>

        <p className="text-xs opacity-60 mt-8">
          © 2026 Punt Data. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResponsibleGamblingSection;
