import React, { useState, useEffect } from "react";
import "./teachDas.css";
import { FiCheckCircle } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { PiListDashesBold } from "react-icons/pi";
import { CiVideoOn } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export default function TeachDas({ min }) {
  console.log('Teacher Navigation min state:', min);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: PiListDashesBold, path: "/teacher" },
    { name: "My Courses", icon: IoBookOutline, path: "/teacher/mycourse" },
    { name: "Webinars", icon: CiVideoOn, path: "/teacher/livewebinar" },
    { name: "Assessments", icon: FiCheckCircle, path: "/teacher/assessments" },
    { name: "Create Course", icon: FiCheckCircle, path: "/teacher/createCourse" },
    { name: "Analytics", icon: FiCheckCircle, path: "/teacher/analytics" },
  ];

  const getActiveIndex = () => {
    return menuItems.findIndex((item) => location.pathname.startsWith(item.path));
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [location.pathname]);

  return (
    <div
      className={`teach-d-nav flex flex-col gap-3 bg-white w-64 p-5 shadow-md transition-all duration-300 ${min ? "action" : ""
        }`}
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;

        return (
          <Link
            key={index}
            to={item.path}
            className={`teach-d-box flex items-center space-x-3 p-3 pl-5 rounded-3xl cursor-pointer transition-all duration-300 ${isActive
                ? "bg-blue-500 text-white shadow-md transform scale-105"
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
