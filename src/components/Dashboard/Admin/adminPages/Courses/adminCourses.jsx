import React, { useMemo, useState } from "react";
import {
    FiSearch, FiFilter, FiDownload, FiMoreVertical,
    FiX, FiEdit, FiTrash2, FiArrowLeft
} from "react-icons/fi";
import { LuCircleCheckBig } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaBook, FaUsers, FaDollarSign, FaStar } from "react-icons/fa";

export default function AdminCourse() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
    const [showEditCoursePopup, setShowEditCoursePopup] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [newCourse, setNewCourse] = useState({
        title: "", instructor: "", category: "web-development",
        status: "published", duration: "", lessons: 0
    });
    const [editingCourse, setEditingCourse] = useState(null);
    const [errors, setErrors] = useState({});

    const stats = [
        { title: "Total Courses", value: "24", icon: FaBook, color: "text-blue-600" },
        { title: "Published", value: "18", icon: FaBook, color: "text-green-600" },
        { title: "Revenue", value: "$12,458", icon: FaDollarSign, color: "text-blue-800" },
        { title: "Avg Rating", value: "4.8", icon: FaStar, color: "text-amber-500" },
        { title: "Students", value: "2,847", icon: FaUsers, color: "text-green-600" },
    ];

    const categories = [
        { name: "Web Development", value: "web-development", icon: "💻" },
        { name: "Programming", value: "programming", icon: "👨‍💻" },
        { name: "Data Science", value: "data-science", icon: "📊" },
        { name: "Design", value: "design", icon: "🎨" },
        { name: "Marketing", value: "marketing", icon: "📈" },
        { name: "Business", value: "business", icon: "💼" },
    ];

    const [courses, setCourses] = useState([
        {
            id: 1, title: "Complete Web Development Bootcamp", instructor: "John Smith",
            category: "web-development", status: "published", students: 1247,
            rating: 4.8, revenue: 12470, duration: "42h 15m", lessons: 125
        },
        {
            id: 2, title: "React Masterclass 2024", instructor: "Sarah Johnson",
            category: "programming", status: "published", students: 856,
            rating: 4.9, revenue: 8560, duration: "28h 30m", lessons: 89
        },
        {
            id: 3, title: "Data Science Fundamentals", instructor: "Mike Chen",
            category: "data-science", status: "draft", students: 0,
            rating: 0, revenue: 0, duration: "35h 10m", lessons: 67
        },
        {
            id: 4, title: "UI/UX Design Principles", instructor: "Emma Wilson",
            category: "design", status: "pending", students: 324,
            rating: 4.7, revenue: 3240, duration: "22h 45m", lessons: 54
        },
    ]);

    // Course activity

    const Cactivity = [
        { icon: LuCircleCheckBig, title: 'Course published - React Advanced Concepts by John Doe', time: '5 min ago' ,color:'green-500',},
        { icon: FiEdit, title: 'Course updated - Python for Beginners by Jane Smith', time: '1 hour ago' ,color:'blue-600'},
        { icon: MdAccessTime, title: 'Course submitted for review - Blockchain Development by Mike Wilson', time: '3 hour ago',color:'amber-500' },
        { icon: IoIosCloseCircleOutline, title: 'Course suspended - Old Marketing Tactics by Sarah Brown', time: '1 day ago',color:'red-500' },
    ]

    const validateForm = (courseData) => {
        const newErrors = {};
        if (!courseData.title.trim()) newErrors.title = "Course title is required";
        if (!courseData.instructor.trim()) newErrors.instructor = "Instructor name is required";
        if (!courseData.duration.trim()) newErrors.duration = "Duration is required";
        if (courseData.lessons < 1) newErrors.lessons = "Must have at least 1 lesson";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setNewCourse(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const handleEditInputChange = (field, value) => {
        setEditingCourse(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const handleAddCourse = () => {
        if (validateForm(newCourse)) {
            const courseToAdd = { ...newCourse, id: Date.now(), students: 0, rating: 0, revenue: 0 };
            setCourses(prev => [...prev, courseToAdd]);
            resetForm();
            setShowAddCoursePopup(false);
        }
    };

    const handleEditCourse = (course) => {
        setEditingCourse({ ...course });
        setShowEditCoursePopup(true);
        setOpenDropdownId(null);
    };

    const handleUpdateCourse = () => {
        if (validateForm(editingCourse)) {
            setCourses(prev => prev.map(course => course.id === editingCourse.id ? editingCourse : course));
            setShowEditCoursePopup(false);
            setEditingCourse(null);
        }
    };

    const handleDeleteCourse = (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            setCourses(prev => prev.filter(course => course.id !== courseId));
            setOpenDropdownId(null);
        }
    };

    const resetForm = () => {
        setNewCourse({ title: "", instructor: "", category: "web-development", status: "published", duration: "", lessons: 0 });
        setErrors({});
    };

    const toggleDropdown = (courseId) => {
        setOpenDropdownId(openDropdownId === courseId ? null : courseId);
    };

    const handleCategoryClick = (categoryValue) => {
        setSelectedCategory(categoryValue);
        setSearch("");
    };

    const clearCategoryFilter = () => {
        setSelectedCategory("all");
    };

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                course.instructor.toLowerCase().includes(search.toLowerCase());
            const matchTab = activeTab === "all" || course.status === activeTab;
            const matchCategory = selectedCategory === "all" || course.category === selectedCategory;
            return matchSearch && matchTab && matchCategory;
        });
    }, [search, activeTab, selectedCategory, courses]);

    const getStatusColor = (status) => {
        const colors = {
            'published': 'bg-green-100 text-green-700',
            'pending': 'bg-yellow-100 text-yellow-700',
            'draft': 'bg-gray-100 text-gray-700',
            'suspended': 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'web-development': 'bg-blue-100 text-blue-700',
            'programming': 'bg-purple-100 text-purple-700',
            'data-science': 'bg-green-100 text-green-700',
            'design': 'bg-pink-100 text-pink-700',
            'marketing': 'bg-orange-100 text-orange-700',
            'business': 'bg-indigo-100 text-indigo-700'
        };
        return colors[category] || 'bg-gray-100 text-gray-700';
    };

    const getCategoryName = (categoryValue) => {
        const category = categories.find(cat => cat.value === categoryValue);
        return category ? category.name : "All Categories";
    };

    return (
        <>
            <section>
                <header>
                    <nav className="flex justify-between items-center px-6 py-5 shadow-md fixed bg-white w-full z-50">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
                            <FiArrowLeft /> Back to dashboard
                        </button>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
                                <FiDownload /> Export
                            </button>
                            <button onClick={() => setShowAddCoursePopup(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <IoMdAdd /> Add Course
                            </button>
                        </div>
                    </nav>
                </header>

                <div className="p-7 md:p-10 pt-24">
                    <h1 className="text-3xl font-semibold mb-6">Course Management</h1>

                    {selectedCategory !== "all" && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-blue-700 font-medium">
                                        Showing: <strong>{getCategoryName(selectedCategory)}</strong>
                                    </span>
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                                        {filteredCourses.length} courses
                                    </span>
                                </div>
                                <button onClick={clearCategoryFilter} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    Clear Filter
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                        {stats.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center gap-3">
                                    <Icon className={`${item.color} text-3xl`} />
                                    <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                                    <p className="text-gray-500 text-sm">{item.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Course Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 mb-10">
                        {categories.map((cat, i) => (
                            <div
                                key={i}
                                onClick={() => handleCategoryClick(cat.value)}
                                className={`bg-white shadow rounded-xl p-4 text-center border hover:shadow-md transition-shadow cursor-pointer ${selectedCategory === cat.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                                    }`}
                            >
                                <p className="text-2xl mb-2">{cat.icon}</p>
                                <p className="text-lg font-medium">{cat.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md p-4 justify-between items-center gap-4 mb-6">
                        <div className="relative w-full">
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="bg-white border-2 border-blue-600 rounded-2xl pl-10 pr-4 py-2 w-full focus:outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                className="border rounded-xl px-3 py-2 bg-white"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat, i) => (
                                    <option key={i} value={cat.value}>{cat.name}</option>
                                ))}
                            </select>
                            <select
                                className="border rounded-xl px-3 py-2 bg-white"
                                value={activeTab}
                                onChange={(e) => setActiveTab(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="pending">Pending</option>
                                <option value="draft">Draft</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex btns-cover text-gray-600 bg-gray-100 py-3 mb-3 rounded-4xl w-full justify-around">
                        {[
                            { id: "all", label: "All Courses" },
                            { id: "published", label: "Published" },
                            { id: "pending", label: "Pending" },
                            { id: "draft", label: "Draft" },
                            { id: "suspended", label: "Suspended" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                style={{ width: '18%' }}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-3 py-2 rounded-3xl font-medium ${activeTab === tab.id
                                    ? "bg-white shadow-md"
                                    : "text-gray-500"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm">
                                    <th className="p-4 text-left">Course</th>
                                    <th className="p-4 text-left">Instructor</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Students</th>
                                    <th className="p-4 text-center">Rating</th>
                                    <th className="p-4 text-center">Revenue</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course) => (
                                        <tr key={course.id} className="border-t hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                                                        <FaBook className="text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{course.title}</p>
                                                        <p className="text-sm text-gray-500">
                                                            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(course.category)}`}>
                                                                {course.category.replace('-', ' ')}
                                                            </span>
                                                            • {course.duration} • {course.lessons} lessons
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">{course.instructor}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">{course.students.toLocaleString()}</td>
                                            <td className="p-4 text-center">
                                                {course.rating > 0 ? `⭐ ${course.rating}` : '-'}
                                            </td>
                                            <td className="p-4 text-center">${course.revenue.toLocaleString()}</td>
                                            <td className="p-4 text-center">
                                                <div className="relative flex justify-center">
                                                    <button
                                                        onClick={() => toggleDropdown(course.id)}
                                                        className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        <FiMoreVertical size={18} />
                                                    </button>
                                                    {/* edit and Delete */}
                                                    {openDropdownId === course.id && (
                                                        <div className="absolute edit right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                                            <button
                                                                onClick={() => handleEditCourse(course)}
                                                                className="flex items-center gap-3 w-full px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                                                            >
                                                                <FiEdit size={16} /> Edit Course
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCourse(course.id)}
                                                                className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                                            >
                                                                <FiTrash2 size={16} /> Delete Course
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
                                                <div className="text-6xl text-gray-300 mb-4">📚</div>
                                                <h3 className="text-xl font-semibold text-gray-500 mb-2">No Courses Found</h3>
                                                <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                                                <button onClick={() => { setSearch(''); setSelectedCategory('all'); setActiveTab('all'); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                    Show All Courses
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-6 mt-10">
                        <h2 className="text-xl font-semibold mb-4">Recent Course Activity</h2>
                        <div className="flex flex-col gap-4">
                            {Cactivity.map((act, i) => {
                                const IconComponent = act.icon;
                                return (
                                    <div key={i} className="p-3 border rounded-xl bg-gray-50 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                                            <IconComponent className={`text-lg text-${act.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-gray-700 flex-1">{act.title}</p>
                                            <p className="text-gray-400 text-sm ml-auto">{act.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Add Course Popup */}
            {showAddCoursePopup && (
                <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Course</h2>
                            <button
                                onClick={() => {
                                    setShowAddCoursePopup(false);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    value={newCourse.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Enter course title"
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Instructor *
                                </label>
                                <input
                                    type="text"
                                    value={newCourse.instructor}
                                    onChange={(e) => handleInputChange('instructor', e.target.value)}
                                    placeholder="Enter instructor name"
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.instructor ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.instructor && (
                                    <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={newCourse.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {categories.map((cat, i) => (
                                            <option key={i} value={cat.value}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={newCourse.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="published">Published</option>
                                        <option value="pending">Pending</option>
                                        <option value="draft">Draft</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        value={newCourse.duration}
                                        onChange={(e) => handleInputChange('duration', e.target.value)}
                                        placeholder="e.g., 42h 15m"
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.duration && (
                                        <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Number of Lessons *
                                    </label>
                                    <input
                                        type="number"
                                        value={newCourse.lessons}
                                        onChange={(e) => handleInputChange('lessons', parseInt(e.target.value) || 0)}
                                        placeholder="Enter number of lessons"
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.lessons ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.lessons && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lessons}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button
                                onClick={() => {
                                    setShowAddCoursePopup(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCourse}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add Course
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Course Popup */}
            {showEditCoursePopup && editingCourse && (
                <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Course</h2>
                            <button
                                onClick={() => {
                                    setShowEditCoursePopup(false);
                                    setEditingCourse(null);
                                    setErrors({});
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    value={editingCourse.title}
                                    onChange={(e) => handleEditInputChange('title', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Instructor *
                                </label>
                                <input
                                    type="text"
                                    value={editingCourse.instructor}
                                    onChange={(e) => handleEditInputChange('instructor', e.target.value)}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.instructor ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.instructor && (
                                    <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={editingCourse.category}
                                        onChange={(e) => handleEditInputChange('category', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {categories.map((cat, i) => (
                                            <option key={i} value={cat.value}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        value={editingCourse.status}
                                        onChange={(e) => handleEditInputChange('status', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="published">Published</option>
                                        <option value="pending">Pending</option>
                                        <option value="draft">Draft</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCourse.duration}
                                        onChange={(e) => handleEditInputChange('duration', e.target.value)}
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Lessons *
                                    </label>
                                    <input
                                        type="number"
                                        value={editingCourse.lessons}
                                        onChange={(e) => handleEditInputChange('lessons', parseInt(e.target.value) || 0)}
                                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.lessons ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button
                                onClick={() => {
                                    setShowEditCoursePopup(false);
                                    setEditingCourse(null);
                                    setErrors({});
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateCourse}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Update Course
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