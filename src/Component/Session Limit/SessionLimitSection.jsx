import HorseLogo from "../../assets/horse-logo.png";

const SessionLimitSection = () => {
  return (
    <div className="relative w-full bg-[#262626] rounded-lg text-white px-4 py-10">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
       <img
         src={HorseLogo}
         alt="Background Logo"
         className="w-3/5 max-w-[800px] opacity-10 md:w-2/5 lg:w-2/4"
       />
     </div>

      <div className="relative z-10 mx-auto px-4 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Session Limit</h2>
        <p className="text-sm opacity-80">Last Updated: [Date]</p>

        <h3 className="text-2xl font-semibold">Welcome to PUNTMATE!</h3>
        <p>
          At PUNTMATE, we prioritize responsible gambling by offering customizable session limits to help you stay in control of your betting activity.
        </p>

        <h4 className="font-semibold mt-4">What Are Session Limits?</h4>
        <p>Session limits allow you to set maximum thresholds for:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Time Spent (e.g., 1 hour per session)</li>
          <li>Deposit Amounts (e.g., $100 per day/week)</li>
          <li>Loss Limits (e.g., $50 max loss per session)</li>
          <li>Wagering Limits (e.g., $200 max bets per day)</li>
        </ul>
        <p className="border-b pb-4">
          Once reached, you'll be automatically logged out until the next session reset.
        </p>

        <h4 className="font-semibold mt-4">How to Set Session Limits</h4>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go to Account Settings → Responsible Gambling</li>
          <li>Choose Limits (Time/Deposit/Loss/Wagering)</li>
          <li>Confirm Changes (Password verification required)</li>
        </ol>
        <p className="border-b pb-4">
          Note: Limits can be adjusted once every 24 hours to prevent impulsive changes.
        </p>

        <h4 className="font-semibold mt-4">Cool-Off Periods</h4>
        <p>Need a break? Opt for:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>24-hour pause</li>
          <li>7-day break</li>
          <li>1-month timeout</li>
        </ul>
        <p className="border-b pb-4">During this period, your account will be temporarily suspended.</p>

        <h4 className="font-semibold mt-4">Self-Exclusion</h4>
        <p>
          For longer breaks (6+ months), contact support at{" "}
          <a
            href="mailto:responsiblegaming@puntmate.com"
            className="underline text-blue-400"
          >
            responsiblegaming@puntmate.com
          </a>
        </p>

        <h4 className="font-semibold mt-4">Need Help?</h4>
        <p>If you're struggling to control your gambling:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Call: 1-800-GAMBLER (US)</li>
          <li>
            Chat:{" "}
            <a
              href="/"
              className="underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              NCPG Helpline
            </a>
          </li>
          <li>
            Visit:{" "}
            <a
              href="/"
              className="underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gamblers Anonymous
            </a>
          </li>
        </ul>

        <p className="mt-4">
          <strong>Play Responsibly.</strong> Gambling should be fun, not a financial burden. Set
          limits and stick to them.
        </p>

        <p className="text-xs opacity-60 mt-6">
          © 2025 PUNTMATE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SessionLimitSection;
