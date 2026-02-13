import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/paymentsSlice";
import Layout from "../../Layout/Layout";

const Pricing = () => {
  const dispatch = useDispatch();

  const { loading, checkoutUrl, error } = useSelector(
    (state) => state.payments
  );

  const { user } = useSelector((state) => state.auth);

  const handleSubscribe = () => {
    // Check if user is logged in
    if (!user) {
      alert("Please login first to subscribe!");
      window.location.href = "/login";
      return;
    }

    dispatch(createCheckout({ plan: "monthly" }));
  };

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="bg-[#262626] text-white rounded-2xl p-8 max-w-md w-full shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-2">
            Premium Subscription
          </h1>

          <p className="text-center text-gray-400 mb-6">
            Unlock all predictors & tools
          </p>

          <div className="border border-gray-700 rounded-xl p-6 mb-6">
            <p className="text-4xl font-bold text-center mb-2">
              $29.99 <span className="text-lg font-medium">/ month</span>
            </p>

            <ul className="mt-4 space-y-2 text-gray-300 text-sm">
              <li>✅ Exotic Calculator Access</li>
              <li>✅ Ticket Creation</li>
              <li>✅ TrackSide Analytics</li>
              <li>✅ Advanced Calculators</li>
              <li>✅ Priority Support</li>
            </ul>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-300 transition disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Subscribe Now"}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center mt-3">
              {error}
            </p>
          )}

          <p className="text-center text-xs text-gray-500 mt-4">
            Cancel anytime. No hidden charges.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
