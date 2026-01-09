import React from "react";
import HorseLogo from "../../assets/horse-logo.png";

const AboutUsSection = () => {
  return (
    <div className="flex flex-col gap-6 bg-[#262626] py-6 px-4 sm:px-6 md:px-8 rounded-lg font-poppins font-light text-white">
      <h3 className="text-xl font-semibold">About Us</h3>

      <h3 className="text-2xl font-semibold">
        Welcome to PuntMate
        <span className="font-light text-xl">
          {" "}
          – your smart companion for exotic betting insights.
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
          At PuntMate, we believe that successful punting isn’t just about
          luck – it’s about data, patterns, and informed choices. That’s why
          we’ve created a platform that empowers users with intelligent tools
          to decode exotic bet outcomes, track game results, and uncover
          high-value combinations through a blend of statistics and simplicity.
        </p>

        <p>
          Our platform is designed for both casual bettors and seasoned
          punters who want to make their bets count. Whether you’re analyzing
          historical frequency, exploring overdue combinations, or generating
          fresh picks with our predictor tool – PuntMate brings the power of
          data directly to your fingertips.
        </p>

        <p>
          With an intuitive interface, smart filters, and visualized results,
          we make sure you stay ahead of the game, race after race. We’re not
          here to promise wins – we’re here to equip you with the insights to
          play smarter.
        </p>

        <p>
          As part of our commitment to transparency and responsible gambling,
          we ensure that users have access to all their past tickets, session
          limits, and educational insights that encourage mindful play.
        </p>

        <p>Join us at PuntMate and turn your intuition into strategy.</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Who We Are :</h4>
        <p>
         PUNTMATE was founded in 2025 by a team of data scientists, betting enthusiasts, and gaming experts who saw a need for a more analytical approach to betting. Our mission is to provide players with transparent, accurate, and actionable data to help them place informed wagers. We are committed to promoting responsible gambling while giving our users the tools they need to enhance their betting experience.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-semibold">What We Offer:</h4>
        <p>
          Our platform offers a comprehensive suite of features designed to
          give bettors an edge. The Analytics Dashboard provides real-time
          tracking of win/loss trends, hot and cold numbers, and performance
          comparisons between standard and exotic bets. The Exotic Predictor
          Tool leverages machine learning to forecast outcomes for complex
          bets like Quinella, Trifecta, and First Four.
        </p>
        <p>
          Additionally, our personalized bet tracking system allows users to
          log their tickets, monitor spending, and analyze which strategies
          yield the best results. With real-time updates, countdowns to
          upcoming draws, and instant result notifications, PuntMate ensures
          you never miss an opportunity to bet wisely.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Our Mission:</h4>
        <p>
          Our mission is simple: to empower bettors with the knowledge and
          tools they need to make smarter wagers. We aim to eliminate guesswork
          by providing data-backed insights that help users refine their
          strategies and improve their outcomes. Whether you play for fun or
          for profit, PuntMate is your trusted partner in the world of betting.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Why Choose PuntMate?</h4>
        <p>
          PuntMate stands out because of our commitment to accuracy,
          usability, and responsible gambling. Our platform is built on robust
          data analysis, ensuring that every insight we provide is reliable and
          actionable. The intuitive design makes it easy for users of all
          experience levels to navigate and benefit from our tools.
        </p>
        <p>
          We also prioritize ethical gambling by incorporating features like
          session limits, loss alerts, and self-exclusion options to promote
          safe betting practices.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-xl font-semibold">Join Us Today</h4>
        <p>
          Ready to take your betting to the next level? Join the PuntMate
          community today and start making smarter, more informed wagers.
          Explore our features, track your performance, and discover new
          strategies to enhance your gameplay. If you have any questions, our
          support team is always here to help.
        </p>
        <p>
          Bet smarter with PuntMate—where data meets destiny.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
