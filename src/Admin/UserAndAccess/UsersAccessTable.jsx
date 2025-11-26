import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import api from "../../api";

const UsersAccessTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // 🔹 Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/profile/users", {
        headers: {
          "API-KEY": "kajal",
          "Content-Type": "application/json",
        },
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Toggle Active/Inactive API call
  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setUpdatingId(userId);

    try {
      await api.patch(
        `/profile/status/${userId}`,
        { status: newStatus },
        {
          headers: {
            "API-KEY": "kajal",
            "Content-Type": "application/json",
          },
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, status: newStatus } : u
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-gray-400">Loading users...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="w-full overflow-x-auto px-2 sm:px-4">
      <table className="w-full min-w-[600px] table-auto text-left">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="py-3">S.No</th>
            <th className="py-3">Username</th>
            <th className="py-3">Email ID</th>
            <th className="py-3">DOB</th>
            <th className="py-3">Status</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user._id}
              className="border-b border-white/10 last:border-none hover:bg-white/5 odd:bg-[#1A1A1A]"
            >
              <td className="py-4 pl-2 text-sm w-[50px]">{idx + 1}.</td>
              <td className="py-4 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.fullName || "User"
                    )}&background=random`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {user.fullName}
                </div>
              </td>
              <td className="py-4 text-sm">{user.email}</td>
              <td className="py-4 text-sm">
                {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
              </td>
              <td className="py-4">
                <button
                  onClick={() => toggleUserStatus(user._id, user.status)}
                  disabled={updatingId === user._id}
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    user.status === "active"
                      ? "bg-[#D7FFB9] text-[#3B770E]"
                      : "bg-[#FFB9B9] text-[#770E0E]"
                  }`}
                >
                  {updatingId === user._id ? "Updating..." : user.status}
                </button>
              </td>
              <td className="py-4">
                <BsThreeDotsVertical className="text-lg cursor-pointer text-gray-400 hover:text-white" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAccessTable;
