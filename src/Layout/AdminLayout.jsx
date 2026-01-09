import React, { useState } from "react";
import Header from "../Component/Navbar/Header";
import AdminNavbar from "../Admin/AdminNavbar/AdminNavbar";

const AdminLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-poppins">
      <Header />

      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b border-white/10">
        <h1 className="text-lg font-semibold">{title}</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block min-w-full md:min-w-[22%] p-4`}
        >
          <AdminNavbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>

        <main className="flex-1 p-4">
          <h1 className="text-2xl mb-2 font-semibold hidden md:block">{title}</h1>

          <div className="bg-[#262626] rounded-lg p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
