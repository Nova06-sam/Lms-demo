// import React from "react";
// import { FaUserShield, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
// import AdminManagement from "./AdminManagement";

// export default function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("admin_user")) || {};

//   return (
//     <>
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//           Welcome, {user.name || "Admin"} 👋
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
//             <FaUserShield className="text-blue-600 text-3xl mb-3" />
//             <h3 className="text-lg font-semibold text-gray-700">Total Admins</h3>
//             <p className="text-2xl font-bold text-blue-600 mt-2">5</p>
//           </div>

//           <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
//             <FaChalkboardTeacher className="text-green-600 text-3xl mb-3" />
//             <h3 className="text-lg font-semibold text-gray-700">Total Teachers</h3>
//             <p className="text-2xl font-bold text-green-600 mt-2">20</p>
//           </div>

//           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
//             <FaUsers className="text-yellow-600 text-3xl mb-3" />
//             <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
//             <p className="text-2xl font-bold text-yellow-600 mt-2">150</p>
//           </div>
//         </div>
//       </div>
//       <AdminManagement />
//     </>
//   );
// }