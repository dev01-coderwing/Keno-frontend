import React from "react";
import TrackSideNavbar from "../TrackSideNavbar/TrackSideNavbar";
import Footer from "../../Component/Footer/Footer";
function TrackSideLayout({ children }) {
  return (
    <>
     <div className="flex flex-col min-h-screen bg-black text-white font-poppins">
      <header className="w-full px-4 sm:px-6">
        <TrackSideNavbar />
      </header>

      <main className="flex-grow px-4 sm:px-6 py-4">
        {children}
      </main>

      <footer className="w-full px-4 sm:px-6 mt-auto">
        <Footer />
      </footer>
    </div>
    
    </>
  )
}

export default TrackSideLayout