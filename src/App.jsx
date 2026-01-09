// import React from 'react'
// import Home from './Pages/Home'
// import Analytics from './Pages/Analytics'
// import "./chartSetup";
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Results from './Pages/Results'
// import ExoticPredictor from './Pages/ExoticPredictor'
// import Tickets from './Pages/Tickets'
// import AboutUs from './Pages/AboutUs'
// import "react-datepicker/dist/react-datepicker.css";
// import Auth from './Pages/Auth'
// import TermsAndConditions from './Pages/TermsAndConditions'
// import PrivacyPolicy from './Pages/PrivacyPolicy'
// import ContactUs from './Pages/ContactUs'
// import ResponsibleGambling from './Pages/ResponsibleGambling'
// import SessionLimit from './Pages/SessionLimit'
// import Dashboard from './AdminPages/Dashboard'
// import Keno from './AdminPages/Keno'
// import VirtualRacing from './AdminPages/VirtualRacing'
// import AnalyticsDashboard from './AdminPages/AnalyticsDashboard'
// import UserAndAccess from './AdminPages/UserAndAccess';
// import Settings from './AdminPages/Settings';
// import UpdateProfile from './Pages/UpdateProfile';
// import TrackSideHome from './TrackSide/TrackSideHome/TrackSideHome';
// import TrackSideResults from './TrackSide/TrackSideResults/TrackSideResults';
// import TrackSideMyTickets from './TrackSide/TrackSideTicket/TrackSideMyTickets';
// import TrackSidePredictor from './TrackSide/TrackSideExoticPredictor/TrackSidePredictor';
// import TrackSideAnalyticsSection from './TrackSide/TrackSideAnalyticsSection/TrackSideAnalyticsSection';
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/analytics' element={<Analytics />} />
//         <Route path='/results' element={<Results />} />
//         <Route path='/predictor' element={<ExoticPredictor />} />
//         <Route path='/tickets' element={<Tickets />} />
//         <Route path='/about-us' element={<AboutUs />} />
//         <Route path='/terms-of-service' element={<TermsAndConditions />} />
//         <Route path='/privacy-policy' element={<PrivacyPolicy />} />
//         <Route path='/contact-us' element={<ContactUs />} />
//         <Route path='/session-limit' element={<SessionLimit />} />
//         <Route path='/responsible-gambling' element={<ResponsibleGambling />} />
//         <Route path='/login' element={<Auth />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path='/keno' element={<Keno />} />
//         <Route path='/virtual-racing' element={<VirtualRacing />} />
//         <Route path='/analytics-dashboard' element={<AnalyticsDashboard />} />
//         <Route path='/users-access' element={<UserAndAccess />} />
//         <Route path='/settings' element={<Settings />} />
//         <Route path='/update-profile' element={<UpdateProfile />} />
//         <Route path='/TrackSideHome' element={<TrackSideHome />} />
//         <Route path='/TrackSideResults' element={<TrackSideResults />} />
//         <Route path='/TrackSideMyTickets' element={<TrackSideMyTickets />} />
//         <Route path='/TrackSidePredictor' element={<TrackSidePredictor />} />

//         <Route path='/TrackSideAnalytics' element={<TrackSideAnalyticsSection />} />

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App





import React, {useEffect} from 'react'
import Home from './Pages/Home'
import api from "./api";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import Analytics from './Pages/Analytics'
import "./chartSetup";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Results from './Pages/Results'
import ExoticPredictor from './Pages/ExoticPredictor'
import Tickets from './Pages/Tickets'
import AboutUs from './Pages/AboutUs'
import "react-datepicker/dist/react-datepicker.css";
import Auth from './Pages/Auth'
import TermsAndConditions from './Pages/TermsAndConditions'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import ContactUs from './Pages/ContactUs'
import ResponsibleGambling from './Pages/ResponsibleGambling'
import SessionLimit from './Pages/SessionLimit'
import Dashboard from './AdminPages/Dashboard'
import Keno from './AdminPages/Keno'
import VirtualRacing from './AdminPages/VirtualRacing'
import AnalyticsDashboard from './AdminPages/AnalyticsDashboard'
import UserAndAccess from './AdminPages/UserAndAccess';
import Settings from './AdminPages/Settings';
import UpdateProfile from './Pages/UpdateProfile';
import TrackSideHome from './TrackSide/TrackSideHome/TrackSideHome';
import TrackSideResults from './TrackSide/TrackSideResults/TrackSideResults';
import TrackSideMyTickets from './TrackSide/TrackSideTicket/TrackSideMyTickets';
import TrackSidePredictor from './TrackSide/TrackSideExoticPredictor/TrackSidePredictor';
import TrackSideAnalyticsSection from './TrackSide/TrackSideAnalyticsSection/TrackSideAnalyticsSection';
import BonusHedgeCalculator from './Component/Calculator/Bouns/BonusHedgeCalculator';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ArbitrageCalculator from './Component/Calculator/Arbitrage/ArbitrageCalculator';
import BackLayCalculator from './Component/Calculator/Matched/BackLayCalculator';
import TrackSideArbitrage from './TrackSide/TrackSideCalculator/TrackSideArbitrage/TrackSideArbitrage';
import TrackSideBouns from './TrackSide/TrackSideCalculator/TrackSideBouns/TrackSideBouns';
import TrackSideMatched from './TrackSide/TrackSideCalculator/TrackSideMatched/TrackSideMatched';
import UserProfile from './Component/UserProfile/UserProfile';

const App = () => {
   useEffect(() => {
    const saveFcmToken = async () => {
      const jwt = localStorage.getItem("token");
      if (!jwt) return; 

      try {
        const fcmToken = await getToken(messaging);
        if (!fcmToken) return;

        await api.post(
          "/users/save-fcm-token",
          { token: fcmToken },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        console.log(" FCM token saved");
      } catch (err) {
        console.error(" FCM token save failed", err);
      }
    };

    saveFcmToken();
  }, []);
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path='/' element={<Home />} />
        {/* <Route path='/analytics' element={<Analytics />} /> */}
        <Route path='/results' element={<Results />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/terms-of-service' element={<TermsAndConditions />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/session-limit' element={<SessionLimit />} />
        <Route path='/responsible-gambling' element={<ResponsibleGambling />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/calculator/bonus-bet' element={<BonusHedgeCalculator />} />
        <Route path='/calculator/arbitrage' element={<ArbitrageCalculator />} />
        <Route path='/calculator/matched-betting' element={<BackLayCalculator />} />
        <Route path='/calculator/TrackSideArbitrage' element={<TrackSideArbitrage />} />
        <Route path='/calculator/TrackSideBouns' element={<TrackSideBouns />} />
        <Route path='/calculator/TrackSideMatched' element={<TrackSideMatched />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/Analytics' element={<Analytics />} />
          {/* <Route path='/Dashboard' element={<Dashboard />} />
               <Route path='/Settings' element={<Settings />} /> */}
        {/* Protected Pages (Login Required) */}
        <Route path='/predictor' element={
          <ProtectedRoute><ExoticPredictor /></ProtectedRoute>
        } />

        <Route path='/tickets' element={
          <ProtectedRoute><Tickets /></ProtectedRoute>
        } />

        {/* <Route path='/analytics' element={
          <ProtectedRoute><Analytics /></ProtectedRoute>
        } /> */}

        <Route path='/dashboard' element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path='/keno' element={
          <ProtectedRoute><Keno /></ProtectedRoute>
        } />

        <Route path='/virtual-racing' element={
          <ProtectedRoute><VirtualRacing /></ProtectedRoute>
        } />

        <Route path='/analytics-dashboard' element={
          <ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>
        } />

        <Route path='/users-access' element={
          <ProtectedRoute><UserAndAccess /></ProtectedRoute>
        } />

        <Route path='/settings' element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />

        <Route path='/update-profile' element={
          <ProtectedRoute><UpdateProfile /></ProtectedRoute>
        } />

        <Route path='/TrackSideHome' element={
          <ProtectedRoute><TrackSideHome /></ProtectedRoute>
        } />;

        <Route path='/TrackSideResults' element={
          <ProtectedRoute><TrackSideResults /></ProtectedRoute>
        } />

        <Route path='/TrackSideMyTickets' element={
          <ProtectedRoute><TrackSideMyTickets /></ProtectedRoute>
        } />

        <Route path='/TrackSidePredictor' element={
          <ProtectedRoute><TrackSidePredictor /></ProtectedRoute>
        } />

        <Route path='/TrackSideAnalytics' element={
          <ProtectedRoute><TrackSideAnalyticsSection /></ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
