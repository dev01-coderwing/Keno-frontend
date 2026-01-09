import React, { useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-black text-white w-full">
      <div className="flex flex-col gap-2 sm:gap-0">
        <Header toggleMenu={toggleMenu} isOpen={isOpen} />
        <Navigation isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Navbar;
