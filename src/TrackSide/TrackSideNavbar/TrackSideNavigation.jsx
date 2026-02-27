import React, { useState, useRef, useEffect } from "react";
import auction from "../../assets/Image/NavImg/auctionNav.png";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { PiHorse } from "react-icons/pi";
import { GoGraph } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../redux/locationSlice"; 

const iconClass = "h-5 w-5";

const links = [
  {
    to: "/TrackSideHome",
    icon: <PiHorse className={iconClass} />,
    label: "Home",
  },
  {
    to: "/TrackSideAnalytics",
    icon: <GoGraph className={iconClass} />,
    label: "Analytics",
  },
  {
    to: "/TrackSidePredictor",
    icon: <img src={auction} alt="auction" className={iconClass} />,
    label: "Trackside Exotic Calculator",
  },
  {
    to: "/TrackSideResults",
    icon: <Icon icon="solar:file-text-linear" className={iconClass} />,
    label: "Results",
  },
];

function TrackSideNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  
  const [showCalc, setShowCalc] = useState(false);
  const calcRef = useRef(null);

  
  const [showState, setShowState] = useState(false);
  const stateRef = useRef(null);

  const dispatch = useDispatch();
  const selectedState = useSelector((state) => state.location.state);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calcRef.current && !calcRef.current.contains(event.target)) {
        setShowCalc(false);
      }
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setShowState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
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

        <li ref={calcRef} className="relative">
          <button
            onClick={() => setShowCalc(!showCalc)}
            className="flex items-center gap-2 cursor-pointer hover:font-semibold transition"
          >
            <Icon icon="mdi:calculator" className={iconClass} />
            Betting Calculators
            <Icon
              icon={showCalc ? "mdi:chevron-up" : "mdi:chevron-down"}
              className="text-lg"
            />
          </button> 

          {showCalc && (
            <div className="absolute left-0 mt-2 w-48 bg-[#333] border border-gray-600 rounded-md shadow-lg z-50">
              <NavLink
                to="/calculator/TrackSideBouns"
                onClick={() => setShowCalc(false)}
                className="block px-4 py-2 hover:bg-[#444]"
              >
                Bonus Bet
              </NavLink>

              <NavLink
                to="/calculator/TrackSideArbitrage"
                onClick={() => setShowCalc(false)}
                className="block px-4 py-2 hover:bg-[#444]"
              >
                Arbitrage
              </NavLink>

              <NavLink
                to="/calculator/TrackSideMatched"
                onClick={() => setShowCalc(false)}
                className="block px-4 py-2 hover:bg-[#444]">
                Matched Betting
              </NavLink>
            </div>
          )}
        </li>

        {/* State Dropdown */}
        <li ref={stateRef} className="relative">
          <button
            onClick={() => setShowState(!showState)}
            className="flex items-center gap-2 cursor-pointer hover:font-semibold transition"
          >
            <Icon icon="mdi:map-marker" className={iconClass} />
            {selectedState || "State"}
            <Icon
              icon={showState ? "mdi:chevron-up" : "mdi:chevron-down"}
              className="text-lg"
            />
          </button>

          {showState && (
            <div className="absolute left-0 mt-2 w-32 bg-[#333] border border-gray-600 rounded-md shadow-lg z-50">
         {["NSW", "VIC-ACT"].map((st) => (
  <button
    key={st}
    onClick={() => {
      dispatch(setLocation(st));
      setShowState(false);
    }}
    className="block w-full text-left px-4 py-2 hover:bg-[#444]"
  >
    {st}
  </button>
))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default TrackSideNavigation;