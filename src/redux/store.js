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
import analyticsReducer from "./analyticsSlice";
import notificationReducer from "./notificationSlice";
import kenoResultReducer from "./kenoResultSlice";
import betComparisonReducer from "./betComparisonSlice";
import favoriteReducer from "./favoriteSlice";
import tracksideQuickStatsReducer from "./tracksideQuickStatsSlice";
import tracksideGraphReducer from "./tracksideGraphSlice";
import tracksideAnalyticsReducer from "./tracksideAnalyticsSlice";
import kenoGraphReducer from "./kenoGraphSlice";
import alertReducer from "./alertSlice";
import KenooverdueReducer from "./KenooverdueSlice";
import kenoAlertReducer from "./KenoAlertSlice";
import tracksideHistoricalReducer from "./tracksideHistoricalSlice";
import trackideCombinationReducer from "./TrackideCombinationSlice";
import paymentsReducer from "./paymentsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    keno: kenoReducer,
    kenoResults: kenoResultReducer,
    combinations: combinationReducer,
    overdue: overdueReducer,
    historical: historicalReducer,
    profile: profileReducer,
    kenoGraph: kenoGraphReducer,
    alerts: alertReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    analytics: analyticsReducer,
    notification: notificationReducer,
    favorite: favoriteReducer,
    betComparison: betComparisonReducer,
    Kenooverdue: KenooverdueReducer,
kenoalert: kenoAlertReducer,
    trackideCombination: trackideCombinationReducer,

tracksideHistorical: tracksideHistoricalReducer,
    tracksideResults: tracksideResultsReducer,
    tracksideQuickStats: tracksideQuickStatsReducer,
    tracksideGraph: tracksideGraphReducer,
    tracksideAnalytics: tracksideAnalyticsReducer,
 payments: paymentsReducer,
    quickStats: quickStatsReducer,
  },
});
