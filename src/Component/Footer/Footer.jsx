import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/responsible-gambling",
    label: "Responsible Gambling",
  },

  {
    to: "/contact-us",
    label: "Contact Us",
  },
  {
    to: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    to: "/terms-of-service",
    label: "Terms of Service",
  },
  {
    to: "/about-us",
    label: "About Us",
  },
];

const Footer = () => {
  return (
    <footer className="flex justify-center font-roboto px-4">
      <ul className="flex flex-wrap items-center justify-center gap-6 text-white font-light text-xs sm:text-sm md:text-base py-10">
        <li>&copy; {new Date().getFullYear()} Keno Tracker</li>
        {links.map(({ to, label }) => (
          <li key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1 font-poppins cursor-pointer border-b-2 border-transparent transition-colors duration-300 
                ${
                  isActive
                    ? "border-white font-semibold"
                    : "hover:border-white hover:font-semibold"
                }`
              }
            >
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
