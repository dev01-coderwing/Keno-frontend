import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../redux/authSlice";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import api from "../api";

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const activateAndRefresh = async () => {
      console.log("💳 Payment successful / Trial started");

      // AUTO-ACTIVATE IN DEV MODE (Because Webhooks don't reach localhost)
      if (window.location.hostname === "localhost") {
        try {
          console.log("🛠️ Dev Mode: Auto-activating subscription...");
          const response = await api.post("/payments/dev-activate");
          console.log("✅ Dev activation response:", response.data);

          // Wait a moment for the backend to process
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (e) {
          console.error("❌ Dev activation failed:", e);
        }
      }

      // Refresh user data with polling until subscription is active
      try {
        // Clear old cached user data first
        localStorage.removeItem("user");
        console.log("🗑️ Cleared old user data from localStorage");

        // Poll for updated user data (max 5 attempts)
        let attempts = 0;
        let userData = null;

        while (attempts < 5) {
          attempts++;
          console.log(`🔄 Attempt ${attempts}/5: Fetching user data...`);

          try {
            const result = await dispatch(fetchCurrentUser()).unwrap();
            console.log(`📦 Received:`, {
              isSubscriptionActive: result?.isSubscriptionActive,
              isSubscribed: result?.isSubscribed
            });

            // Check if subscription is active
            if (result?.isSubscriptionActive === true || result?.isSubscribed === true) {
              console.log("✅ Subscription confirmed active!");
              userData = result;
              break;
            } else {
              console.log(`⏳ Not active yet, retrying in 1s...`);
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (err) {
            console.error(`❌ Attempt ${attempts} failed:`, err);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        console.log("🔄 Redirecting to homepage...");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } catch (err) {
        console.error("❌ Failed to refresh user data:", err);
      }
    };
    activateAndRefresh();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Trial Started Successfully
        </h2>

        <p className="text-gray-600 mb-6">
          Your <span className="font-semibold">7-day free trial</span> is now
          active. Enjoy full access to all features.
        </p>

        <a
          href="/"
          className="inline-block w-full rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
        >
          Go to HomePage
        </a>

        <p className="text-xs text-gray-400 mt-4">
          You’ll be charged only after the trial ends.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
