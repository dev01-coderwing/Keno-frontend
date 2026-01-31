import React, { useEffect } from "react";
import { AiOutlineBell, AiFillBell } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  createAlert,
  fetchUserAlerts,
} from "../../redux/alertSlice";

const TrackSideRaceCard = ({
  combination,
  stats,
  summary,
  userId,
  numbers,
}) => {
  const dispatch = useDispatch();

  const { loading, tracksideAlerts } = useSelector(
    (state) => state.alerts || {}
  );

  // ✅ Normalize numbers safely
  const safeNumbers = Array.isArray(numbers)
    ? numbers
    : typeof numbers === "string"
    ? numbers.split("-").map(Number)
    : [];

  const comboKey = safeNumbers.join("-");

  // ✅ Fetch alerts once (important for bell state)
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserAlerts(userId));
    }
  }, [dispatch, userId]);

  // ✅ Check if alert already exists
  const isAlertSet = tracksideAlerts?.some(
    (a) =>
      Array.isArray(a.combinations) &&
      a.combinations.join("-") === comboKey
  );

  // 🔔 Bell click handler
  const handleAlert = async () => {
    console.log("🔔 Bell clicked");
    console.log("userId:", userId);
    console.log("numbers:", safeNumbers);

    // ❌ Prevent duplicate POST
    if (!userId || loading || isAlertSet) return;

    const res = await dispatch(
      createAlert({
        userId,
        gameType: "TRACKSIDE",
        betType: "Trifecta",
        combinations: safeNumbers,
      })
    );

    console.log("📨 POST RESULT FULL:", res);

    if (res.meta.requestStatus === "fulfilled") {
      console.log("✅ Alert created");
      // 🔁 Refresh list after POST
      dispatch(fetchUserAlerts(userId));
    } else {
      console.log("❌ Alert failed:", res.payload);
    }
  };

  return (
    <div className="relative bg-[#0E0E0E] text-white p-6 rounded-lg w-full max-w-xs flex flex-col gap-3 shrink-0">
      {/* 🔔 ALERT BELL */}
      <div
        onClick={handleAlert}
        className={`absolute top-3 right-3 cursor-pointer text-lg bg-white/15 rounded-lg p-1 transition ${
          isAlertSet ? "cursor-not-allowed" : ""
        }`}
        title={isAlertSet ? "Alert already set" : "Create alert"}
      >
        {isAlertSet ? (
          <AiFillBell className="text-yellow-400" />
        ) : (
          <AiOutlineBell />
        )}
      </div>

      {/* COMBINATION */}
      <div className="text-center border-b border-white/20 pb-2">
        <h2 className="text-2xl font-bold tracking-wide">
          {combination}
        </h2>
        <p className="text-xs text-gray-300 mt-1">{summary}</p>
      </div>

      {/* STATS */}
      <div className="flex flex-col gap-1 text-xs font-semibold mt-3">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-gray-300"
          >
            <span>{item.label}</span>
            <span className="text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackSideRaceCard;
