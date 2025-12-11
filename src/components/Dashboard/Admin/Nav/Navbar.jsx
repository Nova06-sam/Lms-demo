// AdminNavbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AdminNavbar = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const avatarBtnRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openUserMenu &&
        menuRef.current &&
        avatarBtnRef.current &&
        !menuRef.current.contains(e.target) &&
        !avatarBtnRef.current.contains(e.target)
      ) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openUserMenu]);

  // Close on Escape & focus first item when opened
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenUserMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (openUserMenu && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector("button, a");
      firstFocusable?.focus();
    }
  }, [openUserMenu]);

  const handleAvatarKeyDown = (e) => {
    // keyboard open
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenUserMenu((s) => !s);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpenUserMenu(true);
    }
  };

  const handleLogout = () => {
    // 🔐 Clear auth state (adjust keys as needed for your app)
    const KEYS = [
      "token",
      "accessToken",
      "refreshToken",
      "authToken",
      "user",
      "role",
    ];
    try {
      KEYS.forEach((k) => localStorage.removeItem(k));
      sessionStorage.clear();
    } catch (_) {
      /* ignore */
    }
    // 🔁 Redirect to login (change this route if needed)
    window.location.replace("/login");
  };

  const goSettings = () => {
    // Change this to your settings route
    window.location.href = "/settings";
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between gap-3 px-3 sm:px-4 md:px-8 bg-white/70 backdrop-blur border-b border-slate-200">
      {/* Left: Logo + Title + Admin pill */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white text-lg sm:text-xl">🔧</span>
        </div>

        <div className="min-w-0">
          <p className="text-lg sm:text-xl font-semibold text-blue-600 leading-tight truncate">
            Wrench Wise LMS
          </p>
          <p className="hidden sm:block text-xs text-slate-500">Admin Panel</p>
        </div>

        <button className="hidden sm:flex ml-2 items-center gap-2 rounded-full bg-fuchsia-500 text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 shadow">
          <span className="text-[11px] sm:text-[12px]">🛡️</span>
          <span>Admin</span>
        </button>
      </div>

      {/* Right: Search + Bell + Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile search icon */}
        <button className="md:hidden h-9 w-9 rounded-full flex items-center justify-center bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-lg">🔍</span>
        </button>

        {/* Desktop search */}
        <div className="hidden md:block w-full max-w-xl">
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
            <span className="text-slate-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search users, courses..."
              className="w-full bg-transparent focus:outline-none text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Notification */}
        <button className="relative h-9 w-9 rounded-full flex items-center justify-center">
          <span className="text-lg text-slate-700">
            <FaRegBell />
          </span>
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-semibold">
            5
          </span>
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            ref={avatarBtnRef}
            type="button"
            onClick={() => setOpenUserMenu((s) => !s)}
            onKeyDown={handleAvatarKeyDown}
            aria-haspopup="menu"
            aria-expanded={openUserMenu}
            aria-controls="user-menu"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-slate-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            title="Account"
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              MJ
            </span>
          </button>

          {openUserMenu && (
            <div
              id="user-menu"
              ref={menuRef}
              role="menu"
              aria-label="User menu"
              className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-lg p-1.5 z-50"
            >
              <button
                type="button"
                role="menuitem"
                onClick={goSettings}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
              >
                <IoSettingsOutline className="text-base" />
                <span>Settings</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none"
              >
                <RiLogoutCircleRLine className="text-base" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
