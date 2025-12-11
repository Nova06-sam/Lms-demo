// import React, { useEffect, useState, useMemo } from 'react'
// import { LuUsersRound } from "react-icons/lu";
// import { CiStar } from "react-icons/ci";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { CiCalendar } from "react-icons/ci";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BackToDashboard from '../../../../../common/backDashboard/BackDashboard';

// export default function BrowseCourse() {

//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [sortBy, setSortBy] = useState("newest");
//     const [loading, setLoading] = useState(true);

//     // Fetch all courses
//     const fetchCourses = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get("http://localhost:5000/api/courses/all/courses");
//             console.log("Courses data:", res.data);
//             setCourses(res.data);
//         } catch (err) {
//             console.error("Error loading courses:", err);
//             alert("Failed to load courses");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     // Filter and sort courses
//     const filteredCourses = useMemo(() => {
//         let filtered = [...courses];

//         // Apply search filter
//         if (searchTerm) {
//             const term = searchTerm.toLowerCase();
//             filtered = filtered.filter(course =>
//                 course.courseTitle?.toLowerCase().includes(term) ||
//                 course.description?.toLowerCase().includes(term) ||
//                 course.tags?.some(tag => tag.toLowerCase().includes(term)) ||
//                 course.category?.toLowerCase().includes(term)
//             );
//         }

//         // Apply status filter
//         if (statusFilter !== "all") {
//             filtered = filtered.filter(course => course.status === statusFilter);
//         }

//         // Apply sorting
//         switch (sortBy) {
//             case "newest":
//                 filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                 break;
//             case "oldest":
//                 filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//                 break;
//             case "title-asc":
//                 filtered.sort((a, b) => (a.courseTitle || "").localeCompare(b.courseTitle || ""));
//                 break;
//             case "title-desc":
//                 filtered.sort((a, b) => (b.courseTitle || "").localeCompare(a.courseTitle || ""));
//                 break;
//             case "students-desc":
//                 filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
//                 break;
//             case "rating-desc":
//                 // Assuming you have a rating field in your course data
//                 filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//                 break;
//             default:
//                 break;
//         }

//         return filtered;
//     }, [courses, searchTerm, statusFilter, sortBy]);

//     const handleOpenCourse = (id) => {
//         navigate(`/teacher/mycourses/${id}`);
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this course?")) return;

//         try {
//             const res = await axios.delete(`http://localhost:5000/api/courses/delete/${id}`);
//             console.log(res.data);
//             alert("Deleted successfully!");
//             fetchCourses();
//         } catch (err) {
//             console.error("Delete error:", err);
//             alert("Failed to delete");
//         }
//     };

//     // Clear all filters
//     const clearFilters = () => {
//         setSearchTerm("");
//         setStatusFilter("all");
//         setSortBy("newest");
//     };

//     return (
//         <div className='p-10 bg-gray-50 min-h-full pb-20'>
//             <BackToDashboard />
            
//             {/* Top-content */}
//             <div className='flex justify-between items-center p-5'>
//                 <h1 className='text-4xl font-semibold'>Browse corses</h1>
//                 {/* <Link to={"/teacher/createcourse"} className='bg-blue-500 text-white text-lg rounded-xl font-semibold hover:shadow-md p-2 w-60 flex items-center justify-center gap-2'>
//                     <span className='text-xl'>+</span> 
//                 </Link> */}
//             </div>

//             {/* Search and Filter Section */}
//             <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {/* Search Input */}
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <FiSearch className="text-gray-400" />
//                         </div>
//                         <input
//                             type="text"
//                             placeholder="Search courses by title, description, tags..."
//                             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>

//                     {/* Status Filter */}
//                     <div>
//                         <select
//                             value={statusFilter}
//                             onChange={(e) => setStatusFilter(e.target.value)}
//                             className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                         >
//                             <option value="all">All Status</option>
//                             <option value="published">Published</option>
//                             <option value="draft">Draft</option>
//                             <option value="pending">Pending</option>
//                             <option value="archived">Archived</option>
//                         </select>
//                     </div>

//                     {/* Sort By */}
//                     <div>
//                         <select
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value)}
//                             className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                         >
//                             <option value="newest">Newest First</option>
//                             <option value="oldest">Oldest First</option>
//                             <option value="title-asc">Title (A-Z)</option>
//                             <option value="title-desc">Title (Z-A)</option>
//                             <option value="students-desc">Most Students</option>
//                             <option value="rating-desc">Highest Rating</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Active Filters Display */}
//                 {(searchTerm || statusFilter !== "all") && (
//                     <div className="mt-4 flex flex-wrap items-center gap-2">
//                         <span className="text-sm text-gray-600">Active filters:</span>
//                         {searchTerm && (
//                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
//                                 Search: "{searchTerm}"
//                                 <button
//                                     onClick={() => setSearchTerm("")}
//                                     className="ml-1 hover:text-blue-600"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         )}
//                         {statusFilter !== "all" && (
//                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm capitalize">
//                                 Status: {statusFilter}
//                                 <button
//                                     onClick={() => setStatusFilter("all")}
//                                     className="ml-1 hover:text-green-600"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         )}
//                         <button
//                             onClick={clearFilters}
//                             className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
//                         >
//                             Clear all filters
//                         </button>
//                     </div>
//                 )}

//                 {/* Results Count */}
//                 <div className="mt-4 text-sm text-gray-600">
//                     Showing {filteredCourses.length} of {courses.length} courses
//                 </div>
//             </div>

//             {/* Loading State */}
//             {loading ? (
//                 <div className="flex justify-center items-center py-20">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                     <span className="ml-3 text-lg">Loading courses...</span>
//                 </div>
//             ) : (
//                 <>
//                     {/* No Results Message */}
//                     {filteredCourses.length === 0 ? (
//                         <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
//                             <div className="text-6xl mb-4">📚</div>
//                             <h3 className="text-2xl font-semibold text-gray-700 mb-2">
//                                 {searchTerm ? "No courses found" : "No courses available"}
//                             </h3>
//                             <p className="text-gray-500 mb-6">
//                                 {searchTerm 
//                                     ? `No courses match "${searchTerm}". Try a different search term.`
//                                     : "You haven't created any courses yet. Start by creating your first course!"
//                                 }
//                             </p>
//                             {searchTerm && (
//                                 <button
//                                     onClick={clearFilters}
//                                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     Clear Search
//                                 </button>
//                             )}
//                         </div>
//                     ) : (
//                         /* Course List */
//                         filteredCourses.map((item, i) => (
//                             <div key={i} className='p-5 mb-5'>
//                                 <div className='border-1 border-gray-300 rounded-2xl bg-white p-5 flex justify-between hover:shadow-md transition-shadow'>
//                                     <div 
//                                         className='flex gap-5 cursor-pointer flex-1' 
//                                         onClick={() => handleOpenCourse(item._id)}
//                                     >
//                                         {/* Course Image */}
//                                         <div className='h-24 w-32 rounded-xl overflow-hidden flex-shrink-0'>
//                                             {item.thumbnail ? (
//                                                 <img 
//                                                     className='w-full h-full object-cover rounded-xl' 
//                                                     src={item.thumbnail} 
//                                                     alt={item.courseTitle || "Course image"} 
//                                                 />
//                                             ) : (
//                                                 <div className='w-full h-full bg-gray-200 rounded-xl flex items-center justify-center'>
//                                                     <span className="text-gray-500">No Image</span>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Course Details */}
//                                         <div className="flex-1">
//                                             <div className='flex items-center gap-3 mb-2'>
//                                                 <h1 className='text-xl font-semibold'>{item.courseTitle}</h1>
//                                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                                     item.status === "published" ? "bg-green-100 text-green-800" :
//                                                     item.status === "draft" ? "bg-yellow-100 text-yellow-800" :
//                                                     item.status === "pending" ? "bg-blue-100 text-blue-800" :
//                                                     "bg-gray-100 text-gray-800"
//                                                 }`}>
//                                                     {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
//                                                 </span>
//                                             </div>
                                            
//                                             {item.description && (
//                                                 <p className="text-gray-600 mb-4 line-clamp-2">
//                                                     {item.description}
//                                                 </p>
//                                             )}

//                                             <div className='flex flex-wrap gap-6 text-gray-500'>
//                                                 <p className='flex items-center gap-1'>
//                                                     <span className='text-lg'><LuUsersRound /></span>
//                                                     <span className="font-medium">{item.students || 0}</span> students
//                                                 </p>
//                                                 <p className='flex items-center gap-1'>
//                                                     <span className='text-lg'><CiStar /></span>
//                                                     <span className="font-medium">{item.rating || "No"}</span> rating
//                                                 </p>
//                                                 <p className='flex items-center gap-1'>
//                                                     <span className='text-lg'><IoMdCheckmarkCircleOutline /></span>
//                                                     {item.category || "Uncategorized"}
//                                                 </p>
//                                                 <p className='flex items-center gap-1'>
//                                                     <span className='text-lg'><CiCalendar /></span>
//                                                     {new Date(item.createdAt).toLocaleDateString()}
//                                                 </p>
//                                             </div>

//                                             {/* Tags */}
//                                             {item.tags && item.tags.length > 0 && (
//                                                 <div className="mt-3 flex flex-wrap gap-2">
//                                                     {item.tags.slice(0, 3).map((tag, idx) => (
//                                                         <span 
//                                                             key={idx} 
//                                                             className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
//                                                         >
//                                                             {tag}
//                                                         </span>
//                                                     ))}
//                                                     {item.tags.length > 3 && (
//                                                         <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                                                             +{item.tags.length - 3} more
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* Action Buttons */}
//                                     <div className='flex gap-3 text-lg text-gray-600 items-end'>
//                                         <button 
//                                             className='px-2 py-1 border bg-green-400 font-bold text-white rounded-sm bg-gray-100 hover:bg-green-600 transition-colors'
//                                             title="More options"
//                                         >
//                                            enroll
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </>
//             )}
//         </div>
//     )
// }

import React, { useEffect, useState, useMemo } from 'react'
import { LuUsersRound } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2, FiSearch, FiFilter, FiMail } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToDashboard from '../../../../../common/backDashboard/BackDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// // import BACKEND_URL from "../../../../../../api/Api";

export default function BrowseCourse() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [loading, setLoading] = useState(true);
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollmentData, setEnrollmentData] = useState({
        email: "",
        name: ""
    });
    const [enrollLoading, setEnrollLoading] = useState(false);

    // Fetch all courses
    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/courses/all/courses`);
            console.log("Courses data:", res.data);
            setCourses(res.data);
            toast.success("Courses loaded successfully!", {
                position: "top-right",
                autoClose: 2000,
            });
        } catch (err) {
            console.error("Error loading courses:", err);
            toast.error("Failed to load courses", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Filter and sort courses
    const filteredCourses = useMemo(() => {
        let filtered = [...courses];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(course =>
                course.courseTitle?.toLowerCase().includes(term) ||
                course.description?.toLowerCase().includes(term) ||
                course.tags?.some(tag => tag.toLowerCase().includes(term)) ||
                course.category?.toLowerCase().includes(term)
            );
        }

        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(course => course.status === statusFilter);
        }

        // Apply sorting
        switch (sortBy) {
            case "newest":
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "oldest":
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "title-asc":
                filtered.sort((a, b) => (a.courseTitle || "").localeCompare(b.courseTitle || ""));
                break;
            case "title-desc":
                filtered.sort((a, b) => (b.courseTitle || "").localeCompare(a.courseTitle || ""));
                break;
            case "students-desc":
                filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
                break;
            case "rating-desc":
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                break;
        }

        return filtered;
    }, [courses, searchTerm, statusFilter, sortBy]);

    const handleOpenCourse = (id) => {
        navigate(`/student/mycourses/videoplayer/${id}`);
    };

    // Open enrollment modal
    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setEnrollmentData({
            email: "",
            name: ""
        });
        setShowEnrollModal(true);
    };

    // Close enrollment modal
    const closeEnrollModal = () => {
        setShowEnrollModal(false);
        setSelectedCourse(null);
        setEnrollmentData({
            email: "",
            name: ""
        });
    };

    // Handle enrollment form input changes
    const handleEnrollmentInputChange = (e) => {
        const { name, value } = e.target;
        setEnrollmentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit enrollment
    const handleEnrollmentSubmit = async () => {
        if (!selectedCourse) return;

        // Validation
        if (!enrollmentData.email.trim()) {
            toast.error("Email is required", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(enrollmentData.email)) {
            toast.error("Please enter a valid email address", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        if (!enrollmentData.name.trim()) {
            toast.error("Name is required", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        setEnrollLoading(true);

        try {
            // Here you would make an API call to enroll the student
            // For now, we'll simulate a successful enrollment
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

            // Show success toast
            toast.success(
                <div>
                    <p className="font-semibold">🎉 Enrollment Successful!</p>
                    <p>{enrollmentData.name} has been enrolled in "{selectedCourse.courseTitle}"</p>
                    <p className="text-sm mt-1">Confirmation email sent to {enrollmentData.email}</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

            // Update course students count locally
            const updatedCourses = courses.map(course => {
                if (course._id === selectedCourse._id) {
                    return {
                        ...course,
                        students: (course.students || 0) + 1
                    };
                }
                return course;
            });
            setCourses(updatedCourses);

            // Close modal and reset form
            closeEnrollModal();

        } catch (error) {
            console.error("Enrollment error:", error);
            toast.error(
                <div>
                    <p className="font-semibold">❌ Enrollment Failed</p>
                    <p>Failed to enroll student. Please try again.</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 4000,
                }
            );
        } finally {
            setEnrollLoading(false);
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setSortBy("newest");
        toast.info("All filters cleared", {
            position: "top-right",
            autoClose: 1500,
        });
    };

    return (
        <div className='p-10 bg-gray-50 min-h-full pb-20 relative'>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            
            {/* Enrollment Modal */}
            {showEnrollModal && selectedCourse && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Enroll Student
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Add a student to: <span className="font-medium">{selectedCourse.courseTitle}</span>
                                </p>
                            </div>
                            <button
                                onClick={closeEnrollModal}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex items-start gap-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    {selectedCourse.thumbnail ? (
                                        <img 
                                            src={selectedCourse.thumbnail} 
                                            alt={selectedCourse.courseTitle}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">{selectedCourse.courseTitle}</h4>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            selectedCourse.status === "published" ? "bg-green-100 text-green-800" :
                                            selectedCourse.status === "draft" ? "bg-yellow-100 text-yellow-800" :
                                            "bg-gray-100 text-gray-800"
                                        }`}>
                                            {selectedCourse.status?.charAt(0).toUpperCase() + selectedCourse.status?.slice(1)}
                                        </span>
                                        <span className="text-xs text-gray-600">
                                            {selectedCourse.students || 0} students enrolled
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Student Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={enrollmentData.name}
                                    onChange={handleEnrollmentInputChange}
                                    placeholder="Enter student's full name"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={enrollmentData.email}
                                    onChange={handleEnrollmentInputChange}
                                    placeholder="student@example.com"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                />
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600">
                                    <span className="font-medium">Note:</span> The student will receive an email confirmation with access instructions.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={closeEnrollModal}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                disabled={enrollLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEnrollmentSubmit}
                                disabled={enrollLoading}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                {enrollLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Enrolling...
                                    </>
                                ) : (
                                    <>
                                        <FiMail />
                                        Enroll Student
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <BackToDashboard />
            
            {/* Top-content */}
            <div className='flex justify-between items-center p-5'>
                <h1 className='text-4xl font-semibold'>Browse Courses</h1>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses by title, description, tags..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                            <option value="students-desc">Most Students</option>
                            <option value="rating-desc">Highest Rating</option>
                        </select>
                    </div>
                </div>

                {/* Active Filters Display */}
                {(searchTerm || statusFilter !== "all") && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-600">Active filters:</span>
                        {searchTerm && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                                Search: "{searchTerm}"
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="ml-1 hover:text-blue-600"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {statusFilter !== "all" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm capitalize">
                                Status: {statusFilter}
                                <button
                                    onClick={() => setStatusFilter("all")}
                                    className="ml-1 hover:text-green-600"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        <button
                            onClick={clearFilters}
                            className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredCourses.length} of {courses.length} courses
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-lg">Loading courses...</span>
                </div>
            ) : (
                <>
                    {/* No Results Message */}
                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                {searchTerm ? "No courses found" : "No courses available"}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {searchTerm 
                                    ? `No courses match "${searchTerm}". Try a different search term.`
                                    : "You haven't created any courses yet. Start by creating your first course!"
                                }
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        /* Course List */
                        filteredCourses.map((item, i) => (
                            <div key={i} className='p-5 mb-5'>
                                <div className='border-1 border-gray-300 rounded-2xl bg-white p-5 flex justify-between hover:shadow-md transition-shadow'>
                                    <div 
                                        className='flex gap-5 cursor-pointer flex-1' 
                                        onClick={() => handleOpenCourse(item._id)}
                                    >
                                        {/* Course Image */}
                                        <div className='h-24 w-32 rounded-xl overflow-hidden flex-shrink-0'>
                                            {item.thumbnail ? (
                                                <img 
                                                    className='w-full h-full object-cover rounded-xl' 
                                                    src={item.thumbnail} 
                                                    alt={item.courseTitle || "Course image"} 
                                                />
                                            ) : (
                                                <div className='w-full h-full bg-gray-200 rounded-xl flex items-center justify-center'>
                                                    <span className="text-gray-500">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Course Details */}
                                        <div className="flex-1">
                                            <div className='flex items-center gap-3 mb-2'>
                                                <h1 className='text-xl font-semibold'>{item.courseTitle}</h1>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.status === "published" ? "bg-green-100 text-green-800" :
                                                    item.status === "draft" ? "bg-yellow-100 text-yellow-800" :
                                                    item.status === "pending" ? "bg-blue-100 text-blue-800" :
                                                    "bg-gray-100 text-gray-800"
                                                }`}>
                                                    {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
                                                </span>
                                            </div>
                                            
                                            {item.description && (
                                                <p className="text-gray-600 mb-4 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}

                                            <div className='flex flex-wrap gap-6 text-gray-500'>
                                                <p className='flex items-center gap-1'>
                                                    <span className='text-lg'><LuUsersRound /></span>
                                                    <span className="font-medium">{item.students || 0}</span> students
                                                </p>
                                                <p className='flex items-center gap-1'>
                                                    <span className='text-lg'><CiStar /></span>
                                                    <span className="font-medium">{item.rating || "No"}</span> rating
                                                </p>
                                                <p className='flex items-center gap-1'>
                                                    <span className='text-lg'><IoMdCheckmarkCircleOutline /></span>
                                                    {item.category || "Uncategorized"}
                                                </p>
                                                <p className='flex items-center gap-1'>
                                                    <span className='text-lg'><CiCalendar /></span>
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {/* Tags */}
                                            {item.tags && item.tags.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {item.tags.slice(0, 3).map((tag, idx) => (
                                                        <span 
                                                            key={idx} 
                                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {item.tags.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                            +{item.tags.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='flex gap-3 text-lg text-gray-600 items-start'>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEnrollClick(item);
                                            }}
                                            className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center gap-2'
                                            title="Enroll Student"
                                        >
                                            <span>Enroll</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    )
}