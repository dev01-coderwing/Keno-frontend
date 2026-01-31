import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubscriptionGuard = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
const isSubscribed = user?.isSubscribed === true;
const navigate = useNavigate();

  return (
    <div className="relative">
      {/* CHILD PAGE */}
      <div className={!isSubscribed ? "" : ""}>
        {children}
      </div>

    {/* OVERLAY */}
{!isSubscribed && (
  <div className="absolute inset-0 flex items-center justify-center z-50">
    <div className="bg-black/70 text-white px-6 py-5 rounded-xl text-center">
      <p className="mb-4 text-lg font-semibold">
        🔒 Subscribe to unlock this feature
      </p>

      <button
        onClick={() => navigate("/pricing")} // ya /subscribe /payment
        className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Subscribe Now
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default SubscriptionGuard;
