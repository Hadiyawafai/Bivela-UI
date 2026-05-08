import React, { useEffect, useState } from "react";
import { getAllUsers } from "../adminServices";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // FETCH USERS (SAFE)
  // =======================================================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      const safeUsers = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setUsers(safeUsers);
    } catch (error) {
      console.error("GET USERS ERROR:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // LOADING
  // =======================================================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-[#F2F0EF]">
        <h1
          className="text-2xl text-[#1C2120]"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Loading Users...
        </h1>
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================
  if (!users.length) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-[#F2F0EF]">
        <h1
          className="text-2xl text-[#1C2120]"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          No Users Found
        </h1>
      </div>
    );
  }

  // =======================================================
  // UI
  // =======================================================
  return (
    <div className="bg-[#F2F0EF] min-h-screen p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1
          className="text-4xl text-[#1C2120]"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Users
        </h1>

        <p className="text-black/60 text-sm uppercase tracking-[0.25em] mt-2">
          Manage platform users
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-black/5">

        <table className="w-full">

          {/* TABLE HEAD */}
          <thead className="bg-[#1C2120] text-[#F2F0EF]">
            <tr className="text-xs uppercase tracking-[0.25em]">

              <th className="px-6 py-4 text-left">S.No</th>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Joined</th>

            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-black/5 hover:bg-[#F2F0EF]/60 transition"
              >

                {/* SERIAL NUMBER (FIXED) */}
                <td className="px-6 py-4 font-medium text-[#1C2120]">
                  {String(index + 1).padStart(2, "0")}
                </td>

                <td className="px-6 py-4 text-[#1C2120]">
                  {user.username || "N/A"}
                </td>

                <td className="px-6 py-4 text-[#1C2120]">
                  {user.email || "N/A"}
                </td>

                <td className="px-6 py-4 text-[#1C2120]">
                  {user.phoneNumber || "N/A"}
                </td>

                {/* ROLES */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {(user.roles || []).map((role, i) => (
                      <span
                        key={role.id || i}
                        className="px-3 py-1 rounded-full bg-black text-white text-xs"
                      >
                        {role.name}
                      </span>
                    ))}
                  </div>
                </td>

                {/* DATE */}
                <td className="px-6 py-4 text-[#1C2120]">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}