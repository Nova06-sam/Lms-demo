import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { FaRegChartBar, FaBookOpen } from "react-icons/fa";
import { PiUsersFill } from "react-icons/pi";
import { FiShield, FiMenu, FiX } from "react-icons/fi";
import { CgDollar } from "react-icons/cg";
import { AiOutlineBarChart } from "react-icons/ai";
import { TfiPalette } from "react-icons/tfi";
import { FaUser } from "react-icons/fa6";

const baseLinkClasses =
  "w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors";

const AdminSidebar = ({ showMobileToggle = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `${baseLinkClasses} ${
      isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <>
      {/* Mobile toggle button (only if showMobileToggle) */}
      {showMobileToggle && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-20 left-4 z-40 inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-lg"
          aria-label="Open sidebar"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile overlay */}
      {showMobileToggle && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed  top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-xl flex flex-col z-40
        transform transition-transform duration-200
        ${showMobileToggle ? (isOpen ? "translate-x-0" : "-translate-x-full") : "-translate-x-full"}
        md:translate-x-0 md:transition-none`}
        aria-label="Sidebar"
      >
        {/* Close button (mobile only) */}
        {showMobileToggle && (
          <div className="md:hidden flex justify-end px-3 pt-3">
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 text-slate-700"
              aria-label="Close sidebar"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1  px-3 pt-4 md:pt-6 space-y-4 overflow-y-auto">
          <NavLink to="/admin" end className={linkClass}>
            <FaRegChartBar className="text-lg" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/superadmin" end className={linkClass}>
            <PiUsersFill className="text-lg" />
            <span>SuperAdmin</span>
          </NavLink>
           
          <NavLink to="/admin/approval" className={linkClass}>
            <FaUser className="text-lg" />
            <span>Approval</span>
          </NavLink> 

          <NavLink to="/admin/UserManagement" className={linkClass}>
            <PiUsersFill className="text-lg" />
            <span>User Management</span>
          </NavLink>

          <NavLink to="/admin/adminCourse" className={linkClass}>
            <FaBookOpen className="text-lg" />
            <span>Courses</span>
          </NavLink>

          <NavLink to="/admin/certificate" className={linkClass}>
            <FiShield className="text-lg" />
            <span>Certifications</span>
          </NavLink>

          <NavLink to="/admin/payment" className={linkClass}>
            <CgDollar className="text-lg" />
            <span>Payments</span>
          </NavLink>
            
          {/* <NavLink to="/admin/reports" className={linkClass}>
            <AiOutlineBarChart className="text-lg" />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/admin/whiteLabel" className={linkClass}>
            <TfiPalette className="text-lg" />
            <span>White-Label</span>
          </NavLink> */}
        </nav>

        {/* Platform Status */}
        <div className="px-6 py-4 border-t border-slate-100 text-sm">
          <p className="text-slate-500 mb-1">Platform Status</p>
          <div className="flex items-center gap-2 text-emerald-600 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
