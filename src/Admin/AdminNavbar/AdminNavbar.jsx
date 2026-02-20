import React from "react";
import horse from "../../assets/Image/NavImg/horseNav.png";
import ticket from "../../assets/Image/NavImg/ticketNav.png";
import chart from "../../assets/Image/NavImg/chartNav.png";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const imgClass = "h-5 w-5";

const links = [
  {
    to: "/dashboard",
    icon: <img src={horse} alt="horse" className={imgClass} />,
    label: "Dashboard",
  },
  {
    to: "/keno",
    icon: <img src={ticket} alt="ticket" className={imgClass} />,
    label: "Keno",
  },
  {
    to: "/virtual-racing",
    icon: <img src={chart} alt="chart" className={imgClass} />,
    label: "Virtual Racing",
  },
  // {
  //   to: "/analytics-dashboard",
  //   icon: <Icon icon="solar:chart-linear" className="h-5 w-5" />,
  //   label: "Analytics Dashboard",
  // },
  {
    to: "/users-access",
    icon: <Icon icon="solar:user-rounded-linear" className="h-5 w-5" />,
    label: "Users And Access",
  },
  {
    to: "/settings",
    icon: <Icon icon="solar:settings-linear" className="h-5 w-5" />,
    label: "Settings",
  },
];

const AdminNavbar = ({ isOpen, setIsOpen }) => {
  return (
    <nav
      className={`bg-[#262626] min-h-screen text-white font-poppins h-full rounded-lg p-4 md:p-8
      md:block ${isOpen ? "block" : "hidden"} transition-all duration-300 ease-in-out`}
    >
      <ul className="flex flex-col gap-6 md:gap-10">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm md:text-base transition duration-300 ${
                isActive
                  ? "underline font-semibold"
                  : "hover:underline hover:font-semibold"
              }`
            }
            onClick={() => setIsOpen(false)} // Auto-close on mobile nav click
          >
            {icon}
            <span className="whitespace-nowrap">{label}</span>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
