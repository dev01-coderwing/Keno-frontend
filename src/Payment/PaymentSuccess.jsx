import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../redux/authSlice";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Payment successful / Trial started");
    // Refresh user data so `isSubscribed` in Redux is up-to-date
    try {
      dispatch(fetchCurrentUser());
    } catch (err) {
      // ignore
    }
  }, []);

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
