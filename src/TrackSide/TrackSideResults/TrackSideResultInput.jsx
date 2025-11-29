import React from "react";
import { IoSearch } from "react-icons/io5";

const  TrackSideResultInput =({
  placeholder,
  type = "number",
  width = "w-[20%]",
  showSearchIcon = false,
  value,
  name,
  onChange,
}) => {
  return (
    <>
     <div className={`relative ${width}`}>
          {showSearchIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c8c8c8]">
              <IoSearch size={16} />
            </div>
          )}
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className={`placeholder-[#c8c8c8] outline-none py-3 px-3 ${
                   showSearchIcon ? "pl-9" : "pl-3"
                 } no-spinner rounded-xl text-sm bg-[#464646] w-full`}
            onWheel={(e) => e.target.blur()}
          />
        </div>
    </>
  )
}

export default TrackSideResultInput