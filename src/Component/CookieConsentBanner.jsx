import React, { useEffect, useState } from "react";

const CookieConsentBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      "cookiesAccepted",
      JSON.stringify({
        accepted: true,
        acceptedAt: new Date().toISOString(),
      })
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 z-[9999] w-full bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-300">
          We use cookies to improve your experience. By clicking{" "}
          <span className="font-medium text-white">Accept</span>, you agree to
          our use of cookies.
        </p>

        <button
          onClick={handleAccept}
          className="rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
