import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../Layout/Layout";

function UserProfile() {
  // Redux se user data
  const { user } = useSelector((state) => state.profile);

  // Refresh ke baad bhi data na ujde
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userData = user || storedUser;

  if (!userData) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
          <p className="text-xl text-gray-400">No user data found...</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#262626] p-8 rounded-2xl shadow-lg border border-gray-700">
            
            <h1 className="text-3xl font-bold text-center mb-8">
              Profile Details
            </h1>

            {/* Profile Info */}
            <div className="space-y-6">

              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Name</span>
                <span className="text-lg font-semibold">
                  {userData.fullName || userData.name}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Email</span>
                <span className="text-lg font-semibold">{userData.email}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Date of Birth</span>
                <span className="text-lg font-semibold">
                  {userData.dob || "Not Provided"}
                </span>
              </div>

            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default UserProfile;
