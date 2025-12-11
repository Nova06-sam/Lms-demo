// SuperAdmin.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

const STATUSES = ["Active", "Suspend"];

/** Portal-based actions menu that positions next to the trigger button */
function ActionsMenuPortal({ anchorRect, onClose, onSelect }) {
  // Simple geometry defaults
  const MENU_W = 176; // w-44
  const MENU_H_EST = 100; // two items + paddings (enough to decide flip)
  const GAP = 8;

  // Compute position (flip above if not enough space below)
  let top = anchorRect.bottom + GAP;
  let left = anchorRect.right - MENU_W;

  // Clamp left to viewport
  left = Math.min(
    Math.max(8, left),
    window.innerWidth - MENU_W - 8
  );

  // Flip up if it would go off-screen at the bottom
  if (top + MENU_H_EST > window.innerHeight - 8) {
    top = Math.max(8, anchorRect.top - MENU_H_EST - GAP);
  }

  return createPortal(
    <>
      {/* Click-away backdrop */}
      <div
        className="fixed inset-0 z-[999]"
        aria-hidden="true"
        onClick={onClose}
      />
      {/* The menu itself */}
      <div
        role="menu"
        className="fixed z-[1000] w-44 rounded-2xl border border-slate-200 bg-white shadow-lg p-1.5"
        style={{ top, left }}
      >
        <button
          type="button"
          role="menuitem"
          className="block w-full rounded-xl px-4 py-2.5 text-left text-sm hover:bg-slate-50"
          onClick={() => onSelect("Active")}
        >
          Active
        </button>
        <button
          type="button"
          role="menuitem"
          className="mt-1 block w-full rounded-xl px-4 py-2.5 text-left text-sm hover:bg-slate-50"
          onClick={() => onSelect("Suspend")}
        >
          Suspend
        </button>
      </div>
    </>,
    document.body
  );
}

const SuperAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    status: "Active",
  });

  const [admins, setAdmins] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Which row menu is open + where to place it
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuAnchorRect, setMenuAnchorRect] = useState(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenuId(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    setAdmins((prev) => [...prev, { id: Date.now(), ...formData }]);
    setFormData({ name: "", email: "", password: "", status: "Active" });
    setShowPassword(false);
  };

  const handleSetStatus = (id, status) => {
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setOpenMenuId(null);
    setMenuAnchorRect(null);
  };

  const statusBadgeClass = (status) =>
    status === "Active"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-amber-700 bg-amber-50 border-amber-200";

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      {/* Page heading */}
      <div className="w-full max-w-3xl mb-6">
        <h1 className="text-3xl font-semibold text-slate-800 mb-1">
          Super Admin
        </h1>
        <p className="text-sm text-slate-500">Manage platform admins below.</p>
      </div>

      {/* FORM SECTION */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Add Admin</h2>
        <p className="text-sm text-slate-500 mb-5">
          Fill the form to add a new admin.
        </p>

        <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 
              text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 
              text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password with Eye Icon */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 
                text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer text-xl"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Status (roomier select; no scrolling needed) */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 
                pl-4 pr-10 h-12 text-sm outline-none focus:bg-white focus:border-blue-500 
                focus:ring-2 focus:ring-blue-100"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-slate-500"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-2xl 
              bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md 
              shadow-blue-500/30 hover:bg-blue-700 transition-colors"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>

      {/* ADMIN LIST SECTION */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Admin List</h2>

        {admins.length === 0 ? (
          <div className="text-sm text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-2xl px-4 py-6 text-center">
            No admins added yet.
          </div>
        ) : (
          // Keep the table simple; no overflow clipping that could hide menus
          <div className="rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs text-slate-500">
                  <th className="py-2.5 px-4">Name</th>
                  <th className="py-2.5 px-4">Email</th>
                  <th className="py-2.5 px-4">Password</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-t border-slate-200">
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      {admin.name}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{admin.email}</td>

                    {/* Password ALWAYS visible */}
                    <td className="py-2.5 px-4 text-slate-600 font-semibold">
                      {admin.password}
                    </td>

                    {/* Status badge */}
                    <td className="py-2.5 px-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusBadgeClass(
                          admin.status
                        )}`}
                      >
                        {admin.status}
                      </span>
                    </td>

                    {/* Actions: 3-dots menu (portal; no scroll, no clipping) */}
                    <td className="py-2.5 px-4 text-right">
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === admin.id}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setMenuAnchorRect(rect);
                          setOpenMenuId((curr) => (curr === admin.id ? null : admin.id));
                        }}
                        className="inline-flex items-center justify-center rounded-full p-2.5 hover:bg-slate-100 text-slate-600"
                        title="Actions"
                      >
                        <BsThreeDotsVertical className="text-lg" />
                      </button>

                      {openMenuId === admin.id && menuAnchorRect && (
                        <ActionsMenuPortal
                          anchorRect={menuAnchorRect}
                          onClose={() => {
                            setOpenMenuId(null);
                            setMenuAnchorRect(null);
                          }}
                          onSelect={(status) => handleSetStatus(admin.id, status)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdmin;
