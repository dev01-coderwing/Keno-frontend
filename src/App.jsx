import React from 'react'
import Home from './Pages/Home'
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


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/analytics' element={<Analytics />} />
      <Route path='/results' element={<Results />} />
      <Route path='/predictor' element={<ExoticPredictor />} />
      <Route path='/tickets' element={<Tickets />} />
      <Route path='/about-us' element={<AboutUs />} />
      <Route path='/terms-of-service' element={<TermsAndConditions />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/contact-us' element={<ContactUs />} />
      <Route path='/session-limit' element={<SessionLimit />} />
      <Route path='/responsible-gambling' element={<ResponsibleGambling />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/keno' element={<Keno />} />
      <Route path='/virtual-racing' element={<VirtualRacing />} />
      <Route path='/analytics-dashboard' element={<AnalyticsDashboard />} />
      <Route path='/users-access' element={<UserAndAccess />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/update-profile' element={<UpdateProfile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App