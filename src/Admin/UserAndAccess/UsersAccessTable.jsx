import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, toggleUserStatus } from "../../redux/usersSlice";

const UsersAccessTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error, updatingId } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
              <td className="py-4 pl-2 text-sm">{idx + 1}.</td>

              <td className="py-4 text-sm font-medium">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.fullName || "User"
                    )}&background=random`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  {user.fullName}
                </div>
              </td>

              <td className="py-4 text-sm">{user.email}</td>

              <td className="py-4 text-sm">
                {user.dob
                  ? new Date(user.dob).toLocaleDateString()
                  : "-"}
              </td>

              <td className="py-4">
                <button
                  onClick={() =>
                    dispatch(
                      toggleUserStatus({
                        userId: user._id,
                        currentStatus: user.status,
                      })
                    )
                  }
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
