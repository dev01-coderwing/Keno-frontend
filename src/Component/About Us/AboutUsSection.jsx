import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const AboutUsSection = () => {
  return (
    <div className="flex flex-col gap-6 bg-[#262626] py-6 px-4 sm:px-6 md:px-8 rounded-lg font-poppins font-light text-white">
      <h3 className="text-xl font-semibold">About Punt Data</h3>

      <h3 className="text-2xl font-semibold">
        Punt Data
        <span className="font-light text-xl">
          {" "}
          – Independent data analytics for Trackside Virtual Racing & Keno
        </span>
      </h3>

      <div className="flex justify-center py-4">
        <img
          src={HorseLogo}
          alt="Horse Logo"
          className="h-40 sm:h-48 md:h-60 object-contain"
        />
      </div>

      <div className="space-y-4">
        <p>
          Punt Data is an independent data analytics platform designed to help
          punters better understand Trackside Virtual Racing and Keno through
          structured historical analysis. Rather than guessing or relying on
          opinion, Punt Data focuses on facts, numbers, and historical evidence.
          The platform provides users with clear insights into past outcomes,
          allowing them to identify trends, droughts, and common combinations
          across large data sets.
        </p>

        <p>
          Punt Data is 100% Australian owned and operated, built locally for
          Australian markets and users.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">What Punt Data Does</h4>
        <p>
          Punt Data analyses historical results from Trackside Virtual Racing and
          Keno to help users explore how outcomes have behaved over time.
        </p>
        <p>
          For Trackside Virtual Racing, Punt Data examines historical results
          across popular exotic markets, including:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Quinellas</li>
          <li>Exactas</li>
          <li>Trifectas</li>
          <li>First Fours</li>
        </ul>
        <p>
          Each combination is supported by detailed historical data such as:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Total number of times the combination has occurred</li>
          <li>Average number of races between hits</li>
          <li>Longest historical drought</li>
          <li>Current drought</li>
        </ul>
        <p>
          An Exotic Calculator allows users to enter their own combinations and
          instantly see how often those selections have appeared historically.
        </p>
        <p>
          For Keno, Punt Data tracks number frequencies and droughts across
          extensive historical draws. Users can view:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Number frequency trends</li>
          <li>Current and longest droughts</li>
          <li>Historical averages</li>
          <li>
            Alerts when current patterns exceed historical norms
          </li>
        </ul>
        <p>
          All alerts and insights are informational only and based solely on
          historical data.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Built for Analysis, Not Predictions</h4>
        <p>
          Punt Data does not provide:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Betting tips</li>
          <li>Predictions</li>
          <li>Recommendations</li>
          <li>Guarantees</li>
        </ul>
        <p>
          The platform is designed to support independent decision-making by
          giving users access to transparent historical data and statistical
          context. Punt Data removes guesswork and replaces it with information.
          It is a data platform — not a tipping service.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Tools and Calculators</h4>
        <p>
          In addition to racing and Keno analytics, Punt Data includes a range of
          analytical calculators for educational purposes, including:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Arbitrage Calculator</li>
          <li>Matched Betting Calculator</li>
          <li>Bonus Bet Calculator</li>
        </ul>
        <p>
          These tools use user-entered inputs and mathematical formulas to
          demonstrate how costs, outcomes, and returns may be calculated under
          different scenarios. All results are hypothetical and for
          informational purposes only.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Independent and Unaffiliated</h4>
        <p>
          Punt Data is an independent platform. It is not affiliated with,
          endorsed by, sponsored by, or connected to any racing, wagering,
          lottery, or Keno operator. Any references to products, markets, or bet
          types are used strictly for descriptive and informational purposes.
          All trademarks and product names remain the property of their
          respective owners.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Who Punt Data Is For</h4>
        <p>Punt Data is built for users who:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Prefer data over opinion</li>
          <li>Enjoy analysing trends and probabilities</li>
          <li>Value transparency and historical evidence</li>
          <li>Want insights without bias or hype</li>
        </ul>
        <p>
          If you like understanding what has happened rather than being told
          what might happen, Punt Data is built for you.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Responsible Gambling</h4>
        <p>
          Punt Data encourages responsible gambling. Users should always gamble
          within their limits and only with money they can afford to lose. If
          gambling becomes a concern, support is available via Gambling Help
          Online or by calling 1800 858 858.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
