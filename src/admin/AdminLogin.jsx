import React, { useState } from "react";
import {
    FaEye,
    FaEyeSlash,
    FaLock,
    FaEnvelope,
    FaUserShield,
    FaGoogle,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
// // import BACKEND_URL from "../api/Api";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            toast.error("⚠️ Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:5000/api/auth/register/admin`, {
                name: "Super Admin",
                email,
                password,
                role: "super-admin",
            });

            

            console.log("frontend error in role", res.data);

            const { token, user } = res.data;

            if (!user) {
                console.error("No user returned from backend:", res.data);
                toast.error("❌ Login failed: No user data from server");
                return;
            }

            if (!["admin", "super-admin"].includes(user.role)) {
                toast.error("❌ Access denied. Only Admins can log in.");
                console.log("frontend error in role");
                setLoading(false);
                return;
            }

            localStorage.setItem("admin_token", token);
            localStorage.setItem("admin_user", JSON.stringify(user));

            toast.success(`✅ Welcome ${user.name || "Admin"}!`, { autoClose: 1500 });

            setTimeout(() => navigate("/super-admin/dashboard"), 1500);
            console.log("Login successful");
        } catch (err) {
            console.log(err.response?.data || err.message);
            toast.error(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--prime)] p-4">
            <ToastContainer position="top-right" />
            <div className="admin-card">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                        <FaUserShield className="text-blue-600 text-4xl" />
                    </div>
                    <h1 className="admin-title">Admin Panel Login</h1>
                    <p className="admin-subtitle">
                        Sign in to manage your LMS platform
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email *</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                className="admin-input"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password *</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="admin-input"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                                className="accent-blue-600 cursor-pointer"
                            />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            onClick={() =>
                                toast.info("🔐 Password reset link coming soon!", {
                                    autoClose: 3000,
                                })
                            }
                            className="text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[var(--sec)] hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all transform ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                            }`}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} copyright issued by Wynsync
                </p>
            </div>
        </div>
    );
}

// 🦸‍♂️ Super Admin created — Email: superadmin@lms.com | Password: Super@123