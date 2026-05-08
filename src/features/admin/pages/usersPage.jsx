import React, { useEffect, useState } from "react";

import { getAllUsers } from "../adminServices";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // FETCH USERS
  // =======================================================

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      setUsers(response || []);
    } catch (error) {
      console.error("GET USERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
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
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
          No Users Found
        </h1>
      </div>
    );
  }

  // =======================================================
  // UI
  // =======================================================

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Users
        </h1>

        <p className="text-black/60">
          Manage platform users
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-black/5">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>
              <th className="text-left px-6 py-4">
                ID
              </th>

              <th className="text-left px-6 py-4">
                Username
              </th>

              <th className="text-left px-6 py-4">
                Email
              </th>

              <th className="text-left px-6 py-4">
                Phone
              </th>

              <th className="text-left px-6 py-4">
                Role
              </th>

              <th className="text-left px-6 py-4">
                Joined
              </th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b border-black/5 hover:bg-black/[0.02] transition"
              >

                {/* ID */}
                <td className="px-6 py-4 font-medium">
                  #{user.id}
                </td>

                {/* USERNAME */}
                <td className="px-6 py-4">
                  {user.username || "N/A"}
                </td>

                {/* EMAIL */}
                <td className="px-6 py-4">
                  {user.email || "N/A"}
                </td>

                {/* PHONE */}
                <td className="px-6 py-4">
                  {user.phoneNumber || "N/A"}
                </td>

                {/* ROLE */}
                <td className="px-6 py-4">

                  <div className="flex flex-wrap gap-2">

                    {user.roles?.map((role) => (

                      <span
                        key={role.id}
                        className="px-3 py-1 rounded-full bg-black text-white text-xs"
                      >
                        {role.name}
                      </span>

                    ))}

                  </div>

                </td>

                {/* CREATED */}
                <td className="px-6 py-4">
                  {user.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
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