import React, { useMemo, useState } from "react";
import {
    FiSearch,
    FiFilter,
    FiUpload,
    FiDownload,
    FiX,
    FiUserCheck,
    FiUserX
} from "react-icons/fi";
import '../userManagement/userManagement.css'
import { FaUserGroup } from "react-icons/fa6";
import { TfiImport, TfiExport } from "react-icons/tfi";
import { IoShieldOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import Code from '../../../../../assets/code.jpg'
import { useNavigate } from "react-router-dom";
import { CheckCircle, X } from "lucide-react";

export default function Approval() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "student",
        status: "active",
        join: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatar: "",
    });
    const [errors, setErrors] = useState({});

    // Initial users data
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "student",
            status: "active",
            join: "Oct 15, 2025",
            avatar: "AJ",
            image: Code,
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob@example.com",
            role: "trainer",
            status: "active",
            join: "Sep 10, 2025",
            avatar: "BS",
            image: Code,
        },
        {
            id: 3,
            name: "Carol Davis",
            email: "carol@example.com",
            role: "student",
            status: "active",
            join: "Nov 2, 2025",
            avatar: "CD",
            image: null,
        },
        {
            id: 4,
            name: "David Wilson",
            email: "david@example.com",
            role: "trainer",
            status: "inactive",
            join: "Aug 20, 2025",
            avatar: "DW",
            image: null,
        },
        {
            id: 5,
            name: "Eva Martinez",
            email: "eva@example.com",
            role: "student",
            status: "inactive",
            join: "Jul 5, 2025",
            avatar: "EM",
            image: null,
        },
    ]);

    // Calculate stats dynamically from users data
    const stats = useMemo(() => {
        const totalUsers = users.length;
        const students = users.filter(user => user.role === "student").length;
        const trainers = users.filter(user => user.role === "trainer").length;
        const admins = users.filter(user => user.role === "admin").length;
        const activeUsers = users.filter(user => user.status === "active").length;
        const inactiveUsers = users.filter(user => user.status === "inactive").length;

        return [
            { title: "Total Users", value: totalUsers, icon: FaUserGroup, color: 'blue-600' },
            { title: "Students", value: students, icon: FaUserGroup, color: 'green-600' },
            { title: "Trainers", value: trainers, icon: FaUserGroup, color: 'blue-800' },
            { title: "Admins", value: admins, icon: IoShieldOutline, color: 'violet-700' },
            { title: "Active", value: activeUsers, icon: FiCheckCircle, color: 'green-600' },
            { title: "Inactive", value: inactiveUsers, icon: FiUserX, color: 'red-600' },
        ];
    }, [users]);

    // === FORM VALIDATION ===
    const validateForm = (userData) => {
        const newErrors = {};

        // Name validation
        if (!userData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (userData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        // Email validation
        if (!userData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Check if email already exists
        const emailExists = users.some(user =>
            user.email.toLowerCase() === userData.email.toLowerCase()
        );
        if (emailExists) {
            newErrors.email = "Email already exists";
        }

        // Role validation
        if (!userData.role) {
            newErrors.role = "Role is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // === HANDLE INPUT CHANGES ===
    const handleInputChange = (field, value) => {
        setNewUser(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }

        // Generate avatar from name
        if (field === 'name' && value.trim().length >= 2) {
            const initials = value
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
            setNewUser(prev => ({
                ...prev,
                avatar: initials
            }));
        }
    };

    // === ADD NEW USER ===
    const handleAddUser = () => {
        if (validateForm(newUser)) {
            const userToAdd = {
                ...newUser,
                id: Date.now(), // Generate unique ID
                avatar: newUser.avatar || "US" // Default avatar
            };

            setUsers(prev => [...prev, userToAdd]);

            // Reset form and close popup
            resetForm();
            setShowAddUserPopup(false);
        }
    };

    // === ACTIVATE USER ===
    const handleActivateUser = (userId) => {
        setUsers(prev => prev.map(user => {
            if (user.id === userId) {
                return { ...user, status: "active" };
            }
            return user;
        }));
    };

    // === DEACTIVATE USER ===
    const handleDeactivateUser = (userId) => {
        setUsers(prev => prev.map(user => {
            if (user.id === userId) {
                return { ...user, status: "inactive" };
            }
            return user;
        }));
    };

    // === RESET FORM ===
    const resetForm = () => {
        setNewUser({
            name: "",
            email: "",
            role: "student",
            status: "active",
            join: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            avatar: "",
        });
        setErrors({});
    };

    // === FILTER + SEARCH LOGIC ===
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchSearch =
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());

            const matchTab = activeTab === "all" ? true : user.role === activeTab;

            return matchSearch && matchTab;
        });
    }, [search, activeTab, users]);

    return (
        <>
            <section>
                <header>
                    <nav className="flex justify-between items-center px-6 py-5 shadow-md fixed bg-white w-full z-100">
                        <div className="head-btn">
                            <button 
                             onClick={() => navigate(-1)}
                            className="hover:bg-green-500 hover:text-white"><FiArrowLeft /> back to dashboard</button>
                        </div>
                        <div className="flex head-btn gap-3 items-center">
                            <button className="hover:bg-green-500 hover:text-white"><TfiImport className="font-bold icons text-lg" /> bulk import</button>
                            <button className="hover:bg-green-500 hover:text-white"><TfiExport className="font-bold icons text-lg" /> export CSV</button>
                        </div>
                    </nav>
                </header>
                <div className="p-7 md:p-10 lg:pt-20">
                    {/* Top Title */}
                    <h1 className="text-3xl font-semibold mb-6">User Management</h1>

                    {/* Stats Cards - Now showing dynamic counts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mb-8">
                        {stats.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={i}
                                    className=" shadow-md hover:scale-105 cursor-pointer rounded-xl p-5 flex justify-center flex-col items-center gap-3"
                                >
                                    <Icon className={`text-${item.color} text-3xl`} />
                                    <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                                    <p className="text-gray-500 text-sm">{item.title}</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Search + Filters */}
                    <div className="flex flex-col w-full md:flex-row bg-white rounded-2xl shadow-md p-4 justify-between items-center gap-4 mb-6">
                        <div className="relative search w-full ">
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className=" bg-white border-2 border-blue-600 focus:outline-blue-900 rounded-2xl pl-10 pr-4 py-2 "
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <button className="flex items-center gap-2 border px-4 py-2 bg-white shadow-md rounded-lg hover:bg-green-600 hover:text-white font-bold text-gray-600">
                            <FiFilter /> Filters
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex btns-cover text-gray-600 bg-gray-100 py-3 mb-3 rounded-4xl w-full justify-around">
                        {[
                            { id: "all", label: "All Users" },
                            { id: "student", label: "Students" },
                            { id: "trainer", label: "Trainers" },
                            { id: "admin", label: "Admins" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                style={{ width: '20%' }}
                                onClick={() => setActiveTab(tab.id)}
                                className={` px-3 py-2 rounded-3xl font-medium ${activeTab === tab.id
                                    ? "bg-white shadow-md"
                                    : "text-gray-500"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* User Table */}
                    <div className="bg-white userTable rounded-xl  shadow-md overflow-auto  ">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm text-center">
                                    <th className="p-4">User</th>
                                    <th className="p-4">email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Join Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((u, i) => (
                                        <tr key={u.id} className="border-t hover:bg-gray-50">
                                            <td className="p-4 flex items-center justify-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700 overflow-hidden">
                                                    {u.image ? <img src={u.image} alt={u.name} className="w-full h-full rounded-full object-cover" /> : u.avatar}
                                                </div>

                                                <div className="t-name">
                                                    <p className="font-medium">{u.name}</p>
                                                </div>
                                            </td>

                                            <td className="p-4">{u.email}</td>

                                            <td className="p-4 capitalize">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium
                                                        ${u.role === "student"
                                                            ? "bg-green-100 text-green-700"
                                                            : u.role === "trainer"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-purple-100 text-purple-700"
                                                        }`}
                                                >
                                                    {u.role}
                                                </span>
                                            </td>
 
                                            <td className="p-4 capitalize">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium
                                                        ${u.status === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="p-4">{u.join}</td>
                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                    {/* Activate Button - Green Check */}
                                                    <button
                                                        onClick={() => handleActivateUser(u.id)}
                                                        disabled={u.status === "active"}
                                                        className={`p-2 rounded-lg transition-colors ${u.status === "active" 
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                                            : "text-green-600 hover:bg-green-50 hover:text-green-700"}`}
                                                        title={u.status === "active" ? "Already Active" : "Activate User"}
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>

                                                    {/* Deactivate Button - Red X */}
                                                    <button
                                                        onClick={() => handleDeactivateUser(u.id)}
                                                        disabled={u.status === "inactive"}
                                                        className={`p-2 rounded-lg transition-colors ${u.status === "inactive" 
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                                            : "text-red-600 hover:bg-red-50 hover:text-red-700"}`}
                                                        title={u.status === "inactive" ? "Already Inactive" : "Deactivate User"}
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center">
                                            <div className="flex flex-col items-center justify-center py-8">
                                                <div className="text-6xl text-gray-300 mb-4">📭</div>
                                                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                                                    No Users Found
                                                </h3>
                                                <p className="text-gray-400 max-w-md">
                                                    {search
                                                        ? `No users found for "${search}". Try a different search term.`
                                                        : `No users found in the ${activeTab === 'all' ? 'system' : activeTab + 's'} category.`
                                                    }
                                                </p>
                                                {(search || activeTab !== 'all') && (
                                                    <button
                                                        onClick={() => {
                                                            setSearch('');
                                                            setActiveTab('all');
                                                        }}
                                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        Show All Users
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                   
                </div>
            </section>

          
        </>
    );
}