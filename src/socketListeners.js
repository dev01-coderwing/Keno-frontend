import socket from "./socket";
import { store } from "./redux/store";

import { socketLatestKenoUpdate } from "./redux/kenoResultSlice";
import { socketTracksideResultsUpdate } from "./redux/tracksideResultsSlice";

// 🔥 Single event: newResult
socket.on("newResult", (data) => {
  console.log("🔥 LIVE SOCKET DATA:", data);

  // =========================
  // KENO LIVE RESULT
  // =========================
  if (data.type === "KENO") {
    // kenoResultSlice expects: data: [ { ... } ]
    store.dispatch(
      socketLatestKenoUpdate({
        draw: data.draw,
        numbers: data.numbers,
        location: data.location,
      })
    );
  }

  // =========================
  // TRACKSIDE LIVE RESULT
  // =========================
 if (data.type === "TRACKSIDE") {
  store.dispatch(
    socketTracksideResultsUpdate({
      location: data.location,
      latestGame: data.latestGame,
    })
  );
}

});
