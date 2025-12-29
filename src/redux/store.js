import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ticketReducer from "./ticketSlice";
import kenoReducer from "./kenoSlice";
import combinationReducer from "./combinationSlice";
import overdueReducer from "./overdueSlice";
import historicalReducer from "./historicalFrequencySlice";
import profileReducer from "./profileSlice";
import tracksideResultsReducer from "./tracksideResultsSlice";
import quickStatsReducer from "./quickStatsSlice";
import usersReducer from "./usersSlice";
import dashboardReducer from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    keno: kenoReducer,
    combinations: combinationReducer,
    overdue: overdueReducer,
    historical: historicalReducer,
    profile: profileReducer,
    tracksideResults: tracksideResultsReducer,
    quickStats: quickStatsReducer,
    users: usersReducer,
    dashboard: dashboardReducer,


  },
});
