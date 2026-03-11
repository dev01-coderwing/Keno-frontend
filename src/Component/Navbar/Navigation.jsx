import React, { useState, useRef, useEffect } from "react";
import auction from "../../assets/Image/NavImg/auctionNav.png";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import { PiHorse } from "react-icons/pi";
import { GoGraph } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/locationSlice";
import { useNavigate } from "react-router-dom";

const iconClass = "h-5 w-5";

const links = [
  {
    to: "/",
    icon: <PiHorse className={iconClass} />,
    label: "Home",
  },
  {
    to: "/analytics",
    icon: <GoGraph className={iconClass} />,
    label: "Analytics",
  },
  {
    to: "/predictor",
    icon: <img src={auction} alt="auction" className={iconClass} />,
    label: "Keno Calculator",
  },
  {
    to: "/results",
    icon: <Icon icon="solar:file-text-linear" className={iconClass} />,
    label: "Results",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();
  // Calculator dropdown
  const [showCalc, setShowCalc] = useState(false);
  const calcRef = useRef(null);

  // State dropdown
  const [showState, setShowState] = useState(false);
  const stateRef = useRef(null);
const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(e) {
      if (calcRef.current && !calcRef.current.contains(e.target)) {
        setShowCalc(false);
      }
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setShowState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-[#262626] text-white font-poppins rounded-lg w-full px-4 pb-2 sm:px-8 sm:pb-0">
      {/* Mobile Menu Button */}
      <div className="flex md:hidden justify-start">
        <button onClick={toggleMenu}>
          <Icon
            icon={isOpen ? "mdi:close" : "mdi:menu"}
            className="text-3xl"
          />
        </button>
      </div>

      {/* Menu List */}
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

        {/* Calculator Dropdown */}
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

        {/* State Dropdown */}
        <li ref={stateRef} className="relative">
          <button
            onClick={() => setShowState(!showState)}
            className="flex items-center gap-2 cursor-pointer hover:font-semibold transition"
          >
            <Icon icon="mdi:map-marker" className={iconClass} />
            State
            <Icon
              icon={showState ? "mdi:chevron-up" : "mdi:chevron-down"}
              className="text-lg"
            />
          </button>

          {showState && (
            <div className="absolute left-0 mt-2 w-40 bg-[#333] border border-gray-600 rounded-md shadow-lg z-50">
            {["NSW", "VIC", "ACT/SA/TAS/NT"].map((st) => (
  <button
    key={st}
    onClick={() => {
      dispatch(setLocation(st));   // 🔥 GLOBAL STATE SET
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
        <button
  onClick={() => navigate("/TrackSideHome")}
  className="px-3 py-1 bg-[#444] rounded-md hover:bg-[#555] transition"
>
  Trackside 
</button>
      </ul>
    </nav>
  );
};

export default Navigation;