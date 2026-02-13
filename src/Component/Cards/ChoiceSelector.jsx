import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAlerts, deleteAlert } from "../../redux/alertSlice";
import { Trash } from "lucide-react";
const ChoiceSelector = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { kenoAlerts, loading, error } = useSelector(
    (state) => state.alerts
  );

useEffect(() => {
  if (user?._id) {
    dispatch(fetchUserAlerts(user._id));
  }
}, [user?._id, dispatch]);


  // const handleDelete = (alertId) => {
  //   if (window.confirm("Delete this KENO alert?")) {
  //     dispatch(deleteAlert(alertId));
  //   }
  // };

  const handleDelete = (alertId) => {
  if (window.confirm("Delete this KENO alert?")) {
    dispatch(deleteAlert(alertId)).then((res) => {
      if (!res.error && user?._id) {
        // 🔄 delete ke baad fresh list lao
        dispatch(fetchUserAlerts(user._id));
      }
    });
  }
};


  const extractNumbers = (text = "") =>
    text.replace(/[^0-9-]/g, "");

  if (loading) {
    return (
      <div className="bg-[#0f0f0f] p-4 rounded-xl text-gray-400">
        Loading KENO alerts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0f0f0f] p-4 rounded-xl text-red-400">
        {error}
      </div>
    );
  }

  if (!kenoAlerts?.length) {
    return (
      <div className="bg-[#0f0f0f] p-4 rounded-xl text-gray-400">
        No KENO alerts found
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] p-6 rounded-xl">
      <h2 className="text-white text-xl font-semibold mb-6">
        KENO Alerts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kenoAlerts.map((item) => (
          <div
            key={item._id}
            className="bg-[#151515] rounded-2xl p-6 relative min-h-[220px]"
          >
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg"
            >
         <Trash />
            </button>

            <h3 className="text-white font-bold text-xl mb-2 text-center">
              {extractNumbers(item.alertType)}
            </h3>

            <p className="text-sm text-gray-400 mb-4 text-center">
              Target: {item.targetValue}
            </p>

            <div className="space-y-2 text-base">
              <div className="flex justify-between text-gray-300">
                <span>Game</span>
                <span>{item.gameType}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Status</span>
                <span
                  className={
                    item.status === "Active"
                      ? "text-green-400 font-semibold"
                      : "text-red-400 font-semibold"
                  }
                >
                  {item.status}
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Created</span>
                <span>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceSelector;
