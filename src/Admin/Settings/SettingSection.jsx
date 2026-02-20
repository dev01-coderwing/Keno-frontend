import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";

const SettingSection = () => {
  const { user, token } = useSelector((state) => state.auth);
  const userId = user?._id;

  const [firstName, setFirstName] = useState(user?.fullName?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.fullName?.split(" ").slice(1).join(" ") || "");
  const [email, setEmail] = useState(user?.email || "");
  const [dob, setDob] = useState(""); // backend me required hai
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async () => {
    if (!userId) {
      return alert("User not found. Please login again.");
    }

    try {
      setLoading(true);

      const payload = {
        fullName: `${firstName} ${lastName}`.trim(),
        email,
        dob, // ✅ backend ke hisaab se
      };

      const res = await api.put(
        `/profile/user/update/${userId}`,
        payload,
        {
          headers: {
            "api-key": "kajal",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("PROFILE UPDATED:", res.data);
      alert("✅ Profile updated successfully");
    } catch (err) {
      console.error("PROFILE UPDATE ERROR FULL:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-2">Profile</h2>
      <p className="text-sm mb-4">Set your profile details</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-transparent border border-white/30 rounded-md px-4 py-2"
        />
          {/* <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-transparent border border-white/30 rounded-md px-4 py-2"
          /> */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border border-white/30 rounded-md px-4 py-2 "
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-transparent border border-white/30 rounded-md px-4 py-2 col-span-full"
        />
      </div>

      <div className="flex justify-end mb-10">
        <button
          onClick={handleProfileUpdate}
          disabled={loading}
          className="bg-white text-black px-6 py-2 rounded-md text-sm"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SettingSection;
