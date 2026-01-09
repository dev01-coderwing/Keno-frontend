import HorseLogo from "../../assets/horse-logo.png";

const ResponsibleGamblingSection = () => {
  return (
    <div className="relative w-full bg-[#262626] rounded-lg text-white px-4 py-10">
       <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <img
          src={HorseLogo}
          alt="Background Logo"
          className="w-3/5 max-w-[800px] opacity-10 md:w-2/5 lg:w-2/4"
        />
      </div>

      <div className="relative z-10  mx-auto space-y-4 px-4">
        <h2 className="text-xl md:text-2xl font-semibold">Responsible Gambling</h2>
        <p className="text-sm opacity-80">Last Updated: [Date]</p>

        <h3 className="text-2xl font-semibold">Welcome to PUNTMATE!</h3>
        <p>
          At PUNTMATE, we are committed to promoting safe and responsible gambling practices. While betting can be entertaining, we recognize it may pose risks for some individuals. We encourage all users to gamble responsibly within their means.
        </p>

        <h4>Our Commitment:</h4>
        <ul className="list-decimal list-inside space-y-1">
          <li>Age Verification – Strict 18+ policy enforcement</li>
          <li>Self-Assessment Tools – Help you monitor your activity</li>
          <li>Control Features – Deposit limits, timeouts, and self-exclusion options</li>
          <li>Reality Checks – Session reminders and spending alerts</li>
          <li>Access to Support – Direct links to professional help organizations</li>
        </ul>

        <h4>Warning Signs of Problem Gambling:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Spending more money or time than intended</li>
          <li>Chasing losses</li>
          <li>Neglecting work or personal responsibilities</li>
          <li>Borrowing money to gamble</li>
          <li>Hiding gambling activity from loved ones</li>
        </ul>

        <h4>Self-Exclusion Options:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>24 hours (cool-off period)</li>
          <li>1 week</li>
          <li>1 month</li>
          <li>6 months</li>
          <li>Permanent exclusion</li>
        </ul>

        <h4 >Getting Help:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>National Problem Gambling Helpline: 1-800-GAMBLER (US)</li>
          <li>Gamblers Anonymous: www.gamblersanonymous.org</li>
          <li>National Council on Problem Gambling: www.ncpgambling.org</li>
        </ul>

        <h4 >Parental Controls:</h4>
        <p>We recommend using:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Device-level blocking software</li>
          <li>Internet filtering tools</li>
          <li>Password protection for financial accounts</li>
        </ul>

        <p >
          Remember:
          <br />• Gambling should be entertaining, not a way to make money
          <br />• You're always playing against the odds
          <br />• It’s okay to walk away
        </p>

        <p >
          For assistance with responsible gambling features, contact our support at:
          <br />
          <a
            href="mailto:responsiblegambling@puntmate.com"
            className="underline text-blue-400"
          >
            responsiblegambling@puntmate.com
          </a>
        </p>

        <p className="text-xs opacity-60 mt-6">
          © 2025 PUNTMATE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResponsibleGamblingSection;
