import { XCircleIcon } from "@heroicons/react/24/solid";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          You cancelled the payment. No charges were made to your card.
        </p>

        <a
          href="/pricing"
          className="inline-block w-full rounded-xl bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition"
        >
          Try Again
        </a>

        <p className="text-xs text-gray-400 mt-4">
          Need help? Contact support anytime.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
