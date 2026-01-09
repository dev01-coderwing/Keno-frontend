import React from "react";

const SettingSection = () => {
  return (
    <div className="w-full ">
        <h2 className="text-2xl font-semibold mb-2">Profile</h2>
        <p className="text-sm mb-4">Set your profile details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="First name"
            className="bg-transparent border border-white/30 rounded-md px-4 py-2"
          />
          <input
            type="text"
            placeholder="Last name"
            className="bg-transparent border border-white/30 rounded-md px-4 py-2"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-transparent border border-white/30 rounded-md px-4 py-2 col-span-full"
          />
          <input
            type="text"
            placeholder="Phone number"
            className="bg-transparent border border-white/30 rounded-md px-4 py-2 col-span-full"
          />
        </div>
        <div className="flex justify-end mb-10">
          <button className="bg-white text-black px-6 py-2 rounded-md text-sm">
            Save
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Account Security</h2>
        <p className="text-sm mb-4">Set your profile details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="password"
            placeholder="Current Password"
            className="bg-transparent border border-white/30 rounded-md px-4 py-2 col-span-full"
          />
          <input
            type="password"
            placeholder="New Password"
            className="bg-transparent border border-white/30 rounded-md px-4 py-2 col-span-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="bg-transparent border border-white/30 rounded-md px-4 py-2 col-span-full"
          />
        </div>
        <div className="flex justify-end mb-10">
          <button className="bg-white text-black px-6 py-2 rounded-md text-sm">
            Change Password
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
        <p className="text-sm mb-4">Set your profile details</p>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            Do you want to receive the notifications?
          </span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:left-0.5 after:top-0.5 peer-checked:bg-blue-600 relative"></div>
          </label>
        </div>
      </div>
  );
};

export default SettingSection;
