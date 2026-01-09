import React, { useState } from "react";
import TrackSideHeader from "./TrackSideHeader";
import TrackSideNavigation from "./TrackSideNavigation";
function TrackSideNavbar() {
      const [isOpen, setIsOpen] = useState(false);
      const toggleMenu = () => setIsOpen((prev) => !prev);
  return (
    <>
      <div className="bg-black text-white w-full">
      <div className="flex flex-col gap-2 sm:gap-0">
        <TrackSideHeader toggleMenu={toggleMenu} isOpen={isOpen} />
        <TrackSideNavigation isOpen={isOpen} />
      </div>
    </div>
    </>
  )
}

export default TrackSideNavbar