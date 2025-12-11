// import React from "react";
// import "./dasnav.css";
// import { FiCheckCircle } from "react-icons/fi";
// import { IoBookOutline } from "react-icons/io5";
// import { GiProgression, GiAchievement } from "react-icons/gi";
// import { PiListDashesBold } from "react-icons/pi";
// import { CiVideoOn } from "react-icons/ci";
// import { MdOutlineContactSupport } from "react-icons/md";
// import { LuTrendingUp } from "react-icons/lu";
// import { Link, useLocation } from "react-router-dom";

// export default function Dasnav({ min }) {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", icon: PiListDashesBold, path: "/" },
//     { name: "My Courses", icon: IoBookOutline, path: "/mycourses" },
//     { name: "live classes", icon: CiVideoOn, path: "/webinar" },
//     { name: "Assessments", icon: FiCheckCircle, path: "/assessment" },
//     { name: "Skill Rating", icon: LuTrendingUp, path: "/skillrating" },
//     { name: "Progress", icon: GiProgression, path: "/progress" },
//     { name: "Achievements", icon: GiAchievement, path: "/achievements" },
//     { name: "Certificates", icon: GiAchievement, path: "/certificates" },
//     { name: "Support", icon: MdOutlineContactSupport, path: "/support" },
//   ];

//   const activeIndex = menuItems.findIndex(
//     (item) => `/student${item.path}` === location.pathname
//   );

//   return (
//     <div
//       className={`d-nav fixed top-0 left-0 h-screen flex flex-col gap-3 bg-white w-64 p-5 shadow-md transition-all duration-300 ${
//         min ? "action" : ""
//       }`}
//     >
//       {menuItems.map((item, index) => {
//         const Icon = item.icon;
//         const isActive = activeIndex === index;

//         return (
//           <Link
//             key={index}
//             to={`/student${item.path}`}
//             className={`d-box flex items-center space-x-3 p-3 pl-5 rounded-3xl transition-all duration-300 cursor-pointer ${
//               isActive
//                 ? "bg-blue-400 text-white shadow-md transform scale-[1.02]"
//                 : "text-gray-700 hover:bg-green-500 hover:text-white hover:shadow-md"
//             }`}
//           >
//             <Icon className="text-xl" />
//             <span className="font-medium">{item.name}</span>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }


import React, { useEffect } from "react";
import "./dasnav.css";
import { FiCheckCircle } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { GiProgression, GiAchievement } from "react-icons/gi";
import { PiListDashesBold } from "react-icons/pi";
import { CiVideoOn } from "react-icons/ci";
import { MdOutlineContactSupport } from "react-icons/md";
import { LuTrendingUp } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Dasnav({ min }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (!token || !user) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const menuItems = [
    { name: "Dashboard", icon: PiListDashesBold, path: "/" },
    { name: "My Courses", icon: IoBookOutline, path: "/mycourses" },
    { name: "live classes", icon: CiVideoOn, path: "/webinar" },
    { name: "Assessments", icon: FiCheckCircle, path: "/assessment" },
    { name: "Skill Rating", icon: LuTrendingUp, path: "/skillrating" },
    { name: "Progress", icon: GiProgression, path: "/progress" },
    { name: "Achievements", icon: GiAchievement, path: "/achievements" },
    { name: "Certificates", icon: GiAchievement, path: "/certificates" },
    { name: "Support", icon: MdOutlineContactSupport, path: "/support" },
  ];

  const activeIndex = menuItems.findIndex(
    (item) => `/student${item.path}` === location.pathname
  );

  // Handle menu click with authentication check
  const handleMenuClick = (e, path) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (!token || !user) {
      e.preventDefault();
      navigate("/login");
      return false;
    }
    return true;
  };

  return (
    <div
      className={`d-nav fixed top-0 left-0 h-screen flex flex-col gap-3 bg-white w-64 p-5 shadow-md transition-all duration-300 ${
        min ? "action" : ""
      }`}
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;

        return (
          <Link
            key={index}
            to={`/student${item.path}`}
            onClick={(e) => handleMenuClick(e, item.path)}
            className={`d-box flex items-center space-x-3 p-3 pl-5 rounded-3xl transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-blue-400 text-white shadow-md transform scale-[1.02]"
                : "text-gray-700 hover:bg-green-500 hover:text-white hover:shadow-md"
            }`}
          >
            <Icon className="text-xl" />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}


