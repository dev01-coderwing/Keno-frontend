import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp, FaRegBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

// 🔔 Firebase Notification utils
import {
  requestNotificationPermission,
  onMessageListener,
} from "../../utils/notification";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  //  Notification state
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();

  //  Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.fullName);
      setUserImage(storedUser.profileImage || "");
    }
  }, []);

  // Firebase notification setup
  useEffect(() => {
    requestNotificationPermission();

    onMessageListener().then((payload) => {
      if (payload?.notification) {
        setNotification(payload.notification);
        setShowNotification(true);

        // auto hide after 5 sec
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }
    });
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
    setUserName("");
    setUserImage("");
    navigate("/login");
  };

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const isLoggedIn = !!userName;

  return (
    <div className="w-full flex items-center justify-between font-poppins px-4 sm:px-6 relative">
      {/*  LEFT LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dqacezsc5/image/upload/v1754648053/logo_w7gbjw.png"
          alt="PuntMate-Logo"
          className="h-14 w-14 sm:h-20 sm:w-20 object-contain"
        />
        <h1 className="text-xl sm:text-2xl font-semibold hidden sm:block">
          PUNTMATE DATA - KENO RESULTS
        </h1>
      </Link>

      {/*  RIGHT SIDE */}
      <div className="flex items-center gap-4 sm:gap-6 ml-auto relative">
        {isLoggedIn ? (
          <>
            {/*  NOTIFICATION BELL */}
            <div className="relative">
              <div
                className="p-2 rounded-lg bg-gray-900 text-xl cursor-pointer"
                onClick={() => setShowNotification((prev) => !prev)}
              >
                <FaRegBell />
              </div>

              {showNotification && notification && (
                <div className="absolute right-0 mt-2 bg-gray-800 text-sm p-3 rounded-lg w-64 shadow-lg z-50">
                  <h4 className="font-semibold">
                    {notification.title}
                  </h4>
                  <p className="text-gray-300">
                    {notification.body}
                  </p>
                </div>
              )}
            </div>

            {/*  PROFILE IMAGE */}
            <Link to="/UserProfile">
              <img
                src={
                  userImage ||
                  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754648053/user_ciq5pr.jpg"
                }
                alt="user-img"
                className="h-10 w-10 rounded-2xl object-cover cursor-pointer"
              />
            </Link>

            {/*  USER NAME + DROPDOWN */}
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center gap-2 cursor-pointer"
              >
                <h3 className="capitalize text-sm sm:text-base">
                  {userName}
                </h3>
                {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 bg-gray-900 w-44 border border-gray-500 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleUpdateProfile}
                    className="w-full px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-700"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-700"
                  >
                    Log Out <HiOutlineLogout />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="border border-gray-500 hover:bg-gray-900 px-6 py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
