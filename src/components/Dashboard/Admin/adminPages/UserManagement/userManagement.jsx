import React, { useMemo, useState } from "react";
import {
    FiSearch,
    FiFilter,
    FiUpload,
    FiDownload,
    FiMoreVertical,
    FiX,
    FiEdit,
    FiTrash2,
} from "react-icons/fi";
import '../userManagement/userManagement.css'
import { FaUserGroup } from "react-icons/fa6";
import { TfiImport, TfiExport } from "react-icons/tfi";
import { IoShieldOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import Code from '../../../../../assets/code.jpg'
import { useNavigate } from "react-router-dom";
export default function UserManagement() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [showEditUserPopup, setShowEditUserPopup] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "student",
        status: "active",
        join: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        login: "Never",
        activity: "0 courses",
        avatar: "",
    });
    const [editingUser, setEditingUser] = useState(null);
    const [errors, setErrors] = useState({});

    const top = [
        { title: "Total Users", value: 5, icon: FaUserGroup, color: 'blue-600' },
        { title: "Students", value: 3, icon: FaUserGroup, color: 'green-600' },
        { title: "Trainers", value: 2, icon: FaUserGroup, color: 'blue-800' },
        { title: "Admins", value: 2, icon: IoShieldOutline, color: 'violet-700' },
        { title: "Active", value: 3, icon: FiCheckCircle, color: 'green-600' },
        { title: "Pending", value: 1, icon: FaRegClock, color: 'amber-600' },
    ]

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "student",
            status: "active",
            join: "Oct 15, 2025",
            login: "2 hours ago",
            activity: "5 courses",
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
            login: "1 day ago",
            activity: "3 courses",
            avatar: "BS",
            image: Code,
        },
        {
            id: 3,
            name: "Carol Davis",
            email: "carol@example.com",
            role: "student",
            status: "pending",
            join: "Nov 2, 2025",
            login: "Never",
            activity: "0 courses",
            avatar: "CD",
            image: null,
        },
        {
            id: 4,
            name: "David Wilson",
            email: "david@example.com",
            role: "trainer",
            status: "active",
            join: "Aug 20, 2025",
            login: "3 hours ago",
            activity: "7 courses",
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
            login: "30 days ago",
            activity: "2 courses",
            avatar: "EM",
            image: null,
        },
    ]);

    // === FORM VALIDATION ===
    const validateForm = (userData, isEdit = false) => {
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

        // Check if email already exists (skip for current user in edit mode)
        const emailExists = users.some(user =>
            user.email.toLowerCase() === userData.email.toLowerCase() &&
            (!isEdit || user.id !== userData.id)
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

    // === HANDLE EDIT INPUT CHANGES ===
    const handleEditInputChange = (field, value) => {
        setEditingUser(prev => ({
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
            setEditingUser(prev => ({
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

    // === EDIT USER ===
    const handleEditUser = (user) => {
        setEditingUser({ ...user });
        setShowEditUserPopup(true);
        setOpenDropdownId(null);
    };

    // === UPDATE USER ===
    const handleUpdateUser = () => {
        if (validateForm(editingUser, true)) {
            setUsers(prev => prev.map(user =>
                user.id === editingUser.id ? editingUser : user
            ));
            setShowEditUserPopup(false);
            setEditingUser(null);
            setErrors({});
        }
    };

    // === DELETE USER ===
    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(prev => prev.filter(user => user.id !== userId));
            setOpenDropdownId(null);
        }
    };

    // === RESET FORM ===
    const resetForm = () => {
        setNewUser({
            name: "",
            email: "",
            role: "student",
            status: "active",
            join: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            login: "Never",
            activity: "0 courses",
            avatar: "",
        });
        setErrors({});
    };

    // === TOGGLE DROPDOWN ===
    const toggleDropdown = (userId) => {
        setOpenDropdownId(openDropdownId === userId ? null : userId);
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
                            <button
                                onClick={() => setShowAddUserPopup(true)}
                                className="bg-blue-400 text-white hover:bg-blue-800 hover:text-white"
                            >
                                <IoMdAdd className="font-bold icons text-lg" /> add user
                            </button>
                        </div>
                    </nav>
                </header>
                <div className="p-7 md:p-10 ">
                    {/* Top Title */}
                    <h1 className="text-3xl font-semibold mb-6">User Management</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mb-8">
                        {top.map((item, i) => {
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
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Join Date</th>
                                    <th className="p-4">Last Login</th>
                                    <th className="p-4">Activity</th>
                                    <th className="p-4 text-right">Actions</th>
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
                                                    <p className="text-sm text-gray-500">{u.email}</p>
                                                </div>
                                            </td>

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
                                                            : u.status === "pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {u.status}
                                                </span>
                                            </td>

                                            <td className="p-4">{u.join}</td>
                                            <td className="p-4">{u.login}</td>
                                            <td className="p-4">{u.activity}</td>

                                            <td className="p-4 ">
                                                <div className="relative flex justify-center">
                                                    <button
                                                        onClick={() => toggleDropdown(u.id)}
                                                        className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        <FiMoreVertical size={18} />
                                                    </button>

                                                    {openDropdownId === u.id && (
                                                        <div className="absolute edit right-0 top-20 mt-2 w-48 bg-white rounded-lg shadow-md border border-gray-200 py-1 z-30">
                                                            <button
                                                                onClick={() => handleEditUser(u)}
                                                                className="flex items-center gap-3 w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                                                            >
                                                                <FiEdit size={16} />
                                                                Edit User
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteUser(u.id)}
                                                                className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                                            >
                                                                <FiTrash2 size={16} />
                                                                Delete User
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center">
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

                    {/* Bulk Import */}
                    <div className="bg-white shadow-md rounded-xl p-6 mt-10">
                        <h2 className="text-xl font-semibold mb-2">Bulk User Import</h2>
                        <p className="text-gray-600 mb-5">
                            Import multiple users using CSV/Excel files.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-2 border px-4 py-2 bg-white shadow-sm rounded-lg">
                                <FiDownload /> Download Template
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm">
                                <FiUpload /> Upload File
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add User Popup */}
            {showAddUserPopup && (
                <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
                            <button
                                onClick={() => {
                                    setShowAddUserPopup(false);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter full name"
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter email address"
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Role Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role *
                                </label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => handleInputChange('role', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="student">Student</option>
                                    <option value="trainer">Trainer</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && (
                                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                                )}
                            </div>

                            {/* Status Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={newUser.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Avatar Preview */}
                            {newUser.avatar && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                                        {newUser.avatar}
                                    </div>
                                    <p className="text-sm text-gray-600">Avatar will be: {newUser.avatar}</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button
                                onClick={() => {
                                    setShowAddUserPopup(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Popup */}
            {showEditUserPopup && editingUser && (
                <div className="fixed bg-black flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
                            <button
                                onClick={() => {
                                    setShowEditUserPopup(false);
                                    setEditingUser(null);
                                    setErrors({});
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => handleEditInputChange('name', e.target.value)}
                                    placeholder="Enter full name"
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => handleEditInputChange('email', e.target.value)}
                                    placeholder="Enter email address"
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Role Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role *
                                </label>
                                <select
                                    value={editingUser.role}
                                    onChange={(e) => handleEditInputChange('role', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="student">Student</option>
                                    <option value="trainer">Trainer</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && (
                                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                                )}
                            </div>

                            {/* Status Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={editingUser.status}
                                    onChange={(e) => handleEditInputChange('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Avatar Preview */}
                            {editingUser.avatar && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                                        {editingUser.avatar}
                                    </div>
                                    <p className="text-sm text-gray-600">Avatar: {editingUser.avatar}</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button
                                onClick={() => {
                                    setShowEditUserPopup(false);
                                    setEditingUser(null);
                                    setErrors({});
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateUser}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Update User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Close dropdown when clicking outside */}
            {openDropdownId && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenDropdownId(null)}
                ></div>
            )}
        </>
    );
}