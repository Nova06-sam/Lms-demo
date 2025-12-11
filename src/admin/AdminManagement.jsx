import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function AdminManagement() {
  // const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("admin_user")) || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/subadmin/create", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "subadmin"
      });
      
      const admins = res.data;
      
      if (!admins) {
        console.error("No admin returned from backend:", res.data);
        toast.error("❌ Creation failed: No admin data from server");
        return;
      }
      console.log("frontend error in role", admins.data);

      toast.success("✅ Sub-Admin created successfully!");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "Failed to create Sub-admin";
      toast.error(errorMessage);
      console.error("Error creating Sub-admin:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  if (!user.role === "super-admin") {
    return (
      <div className="p-6 text-center text-gray-600">
        ❌ You do not have permission to manage admins.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Admins</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 mb-6 items-center"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded w-full md:w-1/4"

        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          {loading ? "Creating..." : "Add Admin"}
        </button>
      </form>

      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {/* {admins.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-6 text-center text-gray-500">
                No admins found. Create one using the form above.
              </td>
            </tr>
          ) : (
            admins.map((a, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3 font-medium text-blue-600">{a.role}</td>
              </tr>
            ))
          )} */}
        </tbody>
      </table>
    </div>
  );
}
