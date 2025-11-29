import React, { useState, useRef, useEffect } from "react";
// import horse from "../../assets/Image/NavImg/horseNav.png";
// import ticket from "../../assets/Image/NavImg/ticketNav.png";
// import chart from "../../assets/Image/NavImg/chartNav.png";
import auction from "../../assets/Image/NavImg/auctionNav.png";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { PiHorse } from "react-icons/pi";
import { IoTicketOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";

const iconClass = "h-5 w-5";

const links = [
  {
    to: "/TrackSideHome",
    icon: <PiHorse className={iconClass} />,
    label: "Home",
  },
  {
    to: "/TrackSideMyTickets",
    icon: <IoTicketOutline className={iconClass} />,
    label: "My Tickets",
  },
  {
    to: "/TrackSideAnalytics",
    icon: <GoGraph className={iconClass} />,
    label: "Analytics",
  },
  {
    to: "/TrackSidePredictor",
    icon: <img src={auction} alt="auction" className={iconClass} />,
    label: "Exotic Predictor",
  },
  {
    to: "/TrackSideResults",
    icon: <Icon icon="solar:file-text-linear" className={iconClass} />,
    label: "Results",
  },
];

function TrackSideNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  // NEW: Calculator dropdown state
  const [showCalc, setShowCalc] = useState(false);
  const calcRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calcRef.current && !calcRef.current.contains(event.target)) {
        setShowCalc(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <nav className="bg-[#262626] text-white font-poppins rounded-lg w-full px-4 pb-2 sm:px-8 sm:pb-0">
        <div className="flex md:hidden justify-start">
          <button onClick={toggleMenu}>
            <Icon
              icon={isOpen ? "mdi:close" : "mdi:menu"}
              className="text-3xl"
            />
          </button>
        </div>

        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-2 md:py-4`}
        >
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 cursor-pointer border-b-2 border-transparent transition duration-300 
                ${
                  isActive
                    ? "border-white font-semibold"
                    : "hover:border-white hover:font-semibold"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}

          {/* ------------------ NEW: CALCULATOR DROPDOWN ------------------ */}
          <li ref={calcRef} className="relative">
            <button
              onClick={() => setShowCalc(!showCalc)}
              className="flex items-center gap-2 cursor-pointer hover:font-semibold transition"
            >
              <Icon icon="mdi:calculator" className={iconClass} />
              Calculator
              <Icon
                icon={showCalc ? "mdi:chevron-up" : "mdi:chevron-down"}
                className="text-lg"
              />
            </button>

            {showCalc && (
              <div className="absolute left-0 mt-2 w-48 bg-[#333] border border-gray-600 rounded-md shadow-lg z-50">
                <NavLink
                  to="/calculator/bonus-bet"
                  onClick={() => setShowCalc(false)}
                  className="block px-4 py-2 hover:bg-[#444]"
                >
                  Bonus Bet
                </NavLink>

                <NavLink
                  to="/calculator/arbitrage"
                  onClick={() => setShowCalc(false)}
                  className="block px-4 py-2 hover:bg-[#444]"
                >
                  Arbitrage
                </NavLink>

                <NavLink
                  to="/calculator/matched-betting"
                  onClick={() => setShowCalc(false)}
                  className="block px-4 py-2 hover:bg-[#444]"
                >
                  Matched Betting
                </NavLink>
              </div>
            )}
          </li>
        
        </ul>
      </nav>
    </>
  );
}

export default TrackSideNavigation;
