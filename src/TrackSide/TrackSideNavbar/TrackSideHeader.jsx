import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp, FaRegBell } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// 🔔 Redux notification actions
import {
  fetchNotifications,
  fetchUnreadCount,
  markAllRead,
} from "../../redux/notificationSlice";

// 🔔 Firebase Notification utils
import {
  requestNotificationPermission,
  onMessageListener,
} from "../../utils/notification";

const TrackSideHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // UI states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  // Redux states
  const { notifications, unreadCount } = useSelector(
    (state) => state.notification
  );

  // LocalStorage data
  const userId = localStorage.getItem("userId");

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.fullName);
      setUserImage(storedUser.profileImage || "");
    }
  }, []);

  /* ================= INITIAL NOTIFICATION LOAD ================= */
  useEffect(() => {
    if (userId) {
      dispatch(fetchNotifications(userId));
      dispatch(fetchUnreadCount(userId));
    }
  }, [dispatch, userId]);

  /* ================= FIREBASE PUSH LISTENER ================= */
  useEffect(() => {
    requestNotificationPermission();

    onMessageListener()
      .then(() => {
        if (userId) {
          dispatch(fetchNotifications(userId));
          dispatch(fetchUnreadCount(userId));
        }
      })
      .catch(() => {});
  }, [dispatch, userId]);

  /* ================= BELL CLICK ================= */
  const handleBellClick = () => {
    setShowNotification((prev) => !prev);
    if (userId) {
      dispatch(markAllRead(userId));
    }
  };

  /* ================= DROPDOWN ================= */
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isLoggedIn = !!userName;

  return (
    <div className="w-full flex items-center justify-between font-poppins px-4 sm:px-6 relative">
      {/* ================= LEFT LOGO ================= */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dqacezsc5/image/upload/v1754648053/logo_w7gbjw.png"
          alt="PuntMate-Logo"
          className="h-14 w-14 sm:h-20 sm:w-20 object-contain"
        />
        <h1 className="text-xl sm:text-2xl font-semibold hidden sm:block">
          PUNTMATE DATA - TrackSide RESULTS
        </h1>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6 ml-auto relative">
        {isLoggedIn ? (
          <>
            <div className="relative">
              <div
                className="p-2 rounded-lg bg-gray-900 text-xl cursor-pointer relative"
                onClick={handleBellClick}
              >
                <FaRegBell />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>

              {showNotification && (
                <div className="absolute right-0 mt-2 bg-gray-800 text-sm p-3 rounded-lg w-72 shadow-lg z-50 max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-gray-400 text-center">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        className={`border-b border-gray-700 pb-2 mb-2 ${
                          !n.isRead ? "bg-gray-700 rounded p-2" : ""
                        }`}
                      >
                        <h4 className="font-semibold">{n.title}</h4>
                        <p className="text-gray-300 text-xs">{n.body}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* 👤 PROFILE IMAGE */}
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

            {/* 👤 USER NAME + DROPDOWN */}
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
                    onClick={() => navigate("/update-profile")}
                    className="w-full px-4 py-2 hover:bg-gray-700"
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

export default TrackSideHeader;
