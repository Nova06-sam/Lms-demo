import React, { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTeacher(user);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center border border-gray-100">
        {teacher ? (
          <>
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Welcome, {teacher.name || "Teacher"} 👋
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              Email: {teacher.email}
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-700">
                You're logged in as a <strong>{teacher.role}</strong>
              </p>
            </div>
          </>
        ) : (
          <h2 className="text-xl text-gray-600">Loading teacher info...</h2>
        )}
      </div>
    </div>
  );
}
