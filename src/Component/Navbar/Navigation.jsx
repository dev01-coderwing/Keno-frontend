import React, { useState } from "react";
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
    to: "/",
    icon: <PiHorse className={iconClass}/>,
    label: "Home",
  },
  {
    to: "/tickets",
    icon: <IoTicketOutline className={iconClass} /> ,
    label: "My Tickets",
  },
  {
    to: "/analytics",
    icon: <GoGraph className={iconClass} />,
    label: "Analytics",
  },
  {
    to: "/predictor",
    icon: <img src={auction} alt="auction" className={iconClass} />,
    label: "Exotic Predictor",
  },
  {
    to: "/results",
    icon: <Icon icon="solar:file-text-linear" className={iconClass} />,
    label: "Results",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      </ul>
    </nav>
  );
};

export default Navigation;
