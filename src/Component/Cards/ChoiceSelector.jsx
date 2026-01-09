import React, { useState } from "react";

const choices = ["Win", "Place", "Quinella", "Exacta", "Trifecta", "First 4"];
const maxSelection = 3;

const ChoiceSelector = () => {
  const [selected, setSelected] = useState([]);

  const toggleChoice = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else if (selected.length < maxSelection) {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md mx-auto mt-6 bg-black text-white rounded-xl p-4 border border-white/20 font-['Open_Sans']">
      <div className="flex justify-between items-center border-b pb-2 mb-4 flex-wrap gap-2 sm:flex-nowrap">
        <h2 className="text-lg font-bold">Select your choice</h2>
        <span className="text-sm text-white/70">{`${selected.length}/3`}</span>
      </div>

      <div className="flex flex-col gap-3">
        {choices.map((choice, index) => (
          <label
            key={index}
            className="flex items-center justify-between border-b border-white/30 pb-2 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.includes(choice)}
                onChange={() => toggleChoice(choice)}
                className="form-checkbox h-5 w-5 accent-white rounded border-white/60 bg-black"
              />
              <span className="text-base">{choice}</span>
            </div>
          </label>
        ))}
      </div>

      <button
        className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-xl transition duration-300 hover:bg-gray-200"
        onClick={() => alert(`Selected: ${selected.join(", ")}`)}
      >
        Apply
      </button>
    </div>
  );
};

export default ChoiceSelector;
