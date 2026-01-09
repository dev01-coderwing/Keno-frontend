import React from "react";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-poppins">
      <header className="w-full px-4 sm:px-6">
        <Navbar />
      </header>

      <main className="flex-grow px-4 sm:px-6 py-4">
        {children}
      </main>

      <footer className="w-full px-4 sm:px-6 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
