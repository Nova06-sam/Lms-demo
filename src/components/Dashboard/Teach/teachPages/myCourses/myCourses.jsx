// import React from 'react'
// import { LuUsersRound } from "react-icons/lu";
// import { CiStar } from "react-icons/ci";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { CiCalendar } from "react-icons/ci";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { FiTrash2 } from "react-icons/fi";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
// export default function MyCourse() {

//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);

//     // Fetch all courses
//     const fetchCourses = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/courses/all/courses");
//             // setCourses(res.data.courses);
//             console.log("Courses data:", res.data);
//             setCourses(res.data);
//         } catch (err) {
//             console.error("Error loading courses:", err);
//         }
//     };

//     useEffect(() => {
//         fetchCourses();
//     }, []);

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



//     return (
//         <div className='p-10 pt-15 bg-gray-50 pb-20'>
//             <BackToDashboard />
//             {/* Top-content */}
//             <div className='flex justify-between  p-5'>
//                 <h1 className='text-4xl font-semibold'>My Courses</h1>
//                 <Link to={"/teacher/createcourse"} className='bg-blue-500  text-white text-lg rounded-xl font-semibold  hover:shadow-md p-2 w-60'><span className='text-xl pr-5 ml-3'>+</span> Create New course</Link>
//             </div>

//             {/* course-detali */}
//             {courses.map((item, i) => (
//                 <div key={i} className=' p-5 mb-[-60px] mt-10'>
//                     <div className='border-1 border-gray-300 rounded-2xl bg-white p-5 flex justify-between'>

//                         <div className='flex gap-5 cursor-pointer' onClick={() => handleOpenCourse(item._id)} >
//                             {/* img */}
//                             <div className='h-20 w-30  rounded-xl'>
//                                 <img className='rounded-xl' src={item.thumbnail} alt="#" />
//                             </div>

//                             {/* title */}
//                             <div>
//                                 <div className='flex '>
//                                     <h1 className='text-xl'>{item.courseTitle}</h1>
//                                     <p></p>
//                                 </div>
//                                 <div className='flex gap-25 text-gray-500 pt-4'>
//                                     <p className='flex gap-1'><span className='text-lg mt-1'><LuUsersRound /></span>{item.students} students</p>
//                                     <p className='flex gap-1'><span className='text-lg mt-1'><CiStar /></span>---- rating</p>
//                                     <p className='flex gap-1'>
//                                         <span className='text-lg mt-1'><IoMdCheckmarkCircleOutline /></span>

//                                         {item.status === "published"
//                                             ? "Published"
//                                             : item.status === "draft"
//                                                 ? "Draft Saved"
//                                                 : item.status
//                                         }
//                                     </p>
//                                     <p className='flex gap-1'><span className='text-lg mt-1'><CiCalendar /></span>{new Date(item.createdAt).toLocaleString()}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* actions */}
//                         <div className='flex gap-5 text-2xl text-gray-600 mt-5'>
//                             <button
//                                 onClick={() => navigate(`/teacher/editcourse/${item._id}`)}
//                                 className='border-1 border-gray-200 w-10 h-8 pl-2 rounded-xl bg-gray-100'
//                             >
//                                 <FaRegEdit />
//                             </button>
//                             <button onClick={() => handleDelete(item._id)}
//                                 className="border-1 border-gray-200 w-10 h-8 pl-2 rounded-xl text-red-600">
//                                 <FiTrash2 />
//                             </button>

//                             <button className='border-1 border-gray-200 w-10 h-8 pl-2 rounded-xl bg-gray-100'><BsThreeDotsVertical /></button>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }


// import React, { useEffect, useState, useRef } from 'react'
// import { LuUsersRound } from "react-icons/lu";
// import { CiStar } from "react-icons/ci";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { CiCalendar } from "react-icons/ci";
// import { FaRegEdit } from "react-icons/fa";
// import { FiTrash2 } from "react-icons/fi";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function MyCourse() {
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);
//     const [openDropdown, setOpenDropdown] = useState(null);
//     const dropdownRefs = useRef([]);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (!dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
//                 setOpenDropdown(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Fetch all courses
//     const fetchCourses = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/courses/all/courses");
//             setCourses(res.data);
//             toast.success("Courses loaded successfully!");
//         } catch (err) {
//             console.error("Error loading courses:", err);
//             toast.error("Failed to load courses");
//         }
//     };

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const handleOpenCourse = (id) => {
//         navigate(`/teacher/mycourses/${id}`);
//     };

//     const toggleDropdown = (index) => {
//         setOpenDropdown(openDropdown === index ? null : index);
//     };

//     const handleEdit = (id) => {
//         navigate(`/teacher/editcourse/${id}`);
//         setOpenDropdown(null);
//     };

//     const confirmDelete = (id, title) => {
//         if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
//             handleDelete(id);
//         }
//         setOpenDropdown(null);
//     };

//     const handleDelete = async (id) => {
//         try {
//             const res = await axios.delete(`http://localhost:5000/api/courses/delete/${id}`);
//             toast.success("Course deleted successfully!");
//             fetchCourses();
//         } catch (err) {
//             console.error("Delete error:", err);
//             toast.error("Failed to delete course");
//         }
//     };

//     return (
//         <div className='p-10 pt-15 bg-gray-50 pb-20 relative'>
//             <ToastContainer 
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="colored"
//             />
            
//             <BackToDashboard />
            
//             {/* Top-content */}
//             <div className='flex justify-between p-5'>
//                 <h1 className='text-4xl font-semibold'>My Courses</h1>
//                 <Link 
//                     to={"/teacher/createcourse"} 
//                     className='bg-blue-500 text-white text-lg rounded-xl font-semibold hover:shadow-md p-2 w-60 flex items-center justify-center hover:bg-blue-600 transition-colors'
//                 >
//                     <span className='text-xl pr-2'>+</span> Create New course
//                 </Link>
//             </div>

//             {/* Course list */}
//             {courses.map((item, i) => (
//                 <div key={i} className='p-5 mt-5'>
//                     <div className='border border-gray-300 rounded-2xl bg-white p-5 flex justify-between items-center hover:shadow-md transition-shadow'>
                        
//                         {/* Course info */}
//                         <div 
//                             className='flex gap-5 cursor-pointer flex-1' 
//                             onClick={() => handleOpenCourse(item._id)}
//                         >
//                             {/* Thumbnail */}
//                             <div className='h-20 w-30 rounded-xl overflow-hidden flex-shrink-0'>
//                                 <img 
//                                     className='rounded-xl w-full h-full object-cover' 
//                                     src={item.thumbnail} 
//                                     alt={item.courseTitle} 
//                                 />
//                             </div>

//                             {/* Course details */}
//                             <div className='flex-1'>
//                                 <div className='flex items-center gap-2'>
//                                     <h1 className='text-xl font-medium'>{item.courseTitle}</h1>
//                                 </div>
//                                 <div className='flex flex-wrap gap-4 text-gray-500 pt-3'>
//                                     <p className='flex items-center gap-1'>
//                                         <span className='text-lg'><LuUsersRound /></span>
//                                         {item.students || 0} students
//                                     </p>
//                                     <p className='flex items-center gap-1'>
//                                         <span className='text-lg'><CiStar /></span>
//                                         {item.rating || 'No'} rating
//                                     </p>
//                                     <p className='flex items-center gap-1'>
//                                         <span className='text-lg'><IoMdCheckmarkCircleOutline /></span>
//                                         <span className={`font-medium ${
//                                             item.status === "published" ? "text-green-600" :
//                                             item.status === "draft" ? "text-yellow-600" :
//                                             "text-gray-600"
//                                         }`}>
//                                             {item.status === "published" 
//                                                 ? "Published" 
//                                                 : item.status === "draft" 
//                                                     ? "Draft Saved" 
//                                                     : item.status || "Draft"}
//                                         </span>
//                                     </p>
//                                     <p className='flex items-center gap-1'>
//                                         <span className='text-lg'><CiCalendar /></span>
//                                         {new Date(item.createdAt).toLocaleDateString()}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Action buttons and dropdown */}
//                         <div className='relative'>
//                             {/* Desktop action buttons (visible on larger screens) */}
//                             <div className='hidden md:flex gap-3'>
//                                 <button
//                                     onClick={() => handleEdit(item._id)}
//                                     className='border border-gray-200 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors'
//                                     title="Edit course"
//                                 >
//                                     <FaRegEdit />
//                                 </button>
//                                 <button 
//                                     onClick={() => confirmDelete(item._id, item.courseTitle)}
//                                     className="border border-gray-200 w-10 h-10 flex items-center justify-center rounded-xl text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
//                                     title="Delete course"
//                                 >
//                                     <FiTrash2 />
//                                 </button>
//                             </div>

//                             {/* Mobile dropdown button (visible on smaller screens) */}
//                             <div className='md:hidden'>
//                                 <button 
//                                     onClick={() => toggleDropdown(i)}
//                                     className='border border-gray-200 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors'
//                                 >
//                                     <BsThreeDotsVertical />
//                                 </button>
//                             </div>

//                             {/* Dropdown menu */}
//                             {openDropdown === i && (
//                                 <div 
//                                     ref={el => dropdownRefs.current[i] = el}
//                                     className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
//                                 >
//                                     <div className="py-1">
//                                         <button
//                                             onClick={() => handleEdit(item._id)}
//                                             className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
//                                         >
//                                             <FaRegEdit className="text-gray-500" />
//                                             Edit Course
//                                         </button>
//                                         <button
//                                             onClick={() => confirmDelete(item._id, item.courseTitle)}
//                                             className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3"
//                                         >
//                                             <FiTrash2 />
//                                             Delete Course
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

import React, { useEffect, useState, useRef } from 'react'
import { LuUsersRound } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BACKEND_URL from "../../../../../api/Api";

export default function MyCourse() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const dropdownRefs = useRef([]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch all courses
    const fetchCourses = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/courses/all/courses`);
            setCourses(res.data);
        } catch (err) {
            console.error("Error loading courses:", err);
            toast.error("Failed to load courses");
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleOpenCourse = (id) => {
        navigate(`/teacher/mycourses/${id}`);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleEdit = (id) => {
        navigate(`/teacher/editcourse/${id}`);
        setOpenDropdown(null);
    };

    // Open delete confirmation modal
    const openDeleteModal = (course) => {
        setCourseToDelete(course);
        setShowDeleteModal(true);
        setOpenDropdown(null); // Close dropdown if open
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCourseToDelete(null);
        setIsDeleting(false);
    };

    // Handle delete course
    const handleDelete = async () => {
        if (!courseToDelete) return;

        setIsDeleting(true);
        try {
            const res = await axios.delete(`http://localhost:5000/api/courses/delete/${courseToDelete._id}`);
            
            // Show success toast
            toast.success(
                <div className="flex flex-col">
                    <span className="font-semibold">✅ Course Deleted Successfully!</span>
                    <span className="text-sm">"{courseToDelete.courseTitle}" has been deleted.</span>
                </div>,
                {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                }
            );
            
            // Update courses list
            fetchCourses();
            closeDeleteModal();
        } catch (err) {
            console.error("Delete error:", err);
            toast.error(
                <div className="flex flex-col">
                    <span className="font-semibold">❌ Failed to Delete Course</span>
                    <span className="text-sm">{err.response?.data?.message || "Please try again later."}</span>
                </div>,
                {
                    position: "top-right",
                    autoClose: 4000,
                }
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className='p-10 pt-15 bg-gray-50 pb-20 relative'>
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
            
            {/* Delete Confirmation Modal */}
            {showDeleteModal && courseToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <FiAlertTriangle className="text-red-600 text-lg" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Delete Course</h3>
                                    <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
                                </div>
                            </div>
                            <button
                                onClick={closeDeleteModal}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                                disabled={isDeleting}
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100">
                                <div className="flex items-start gap-3">
                                    {courseToDelete.thumbnail ? (
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img 
                                                src={courseToDelete.thumbnail} 
                                                alt={courseToDelete.courseTitle}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                            <span className="text-gray-500 text-xs">No Image</span>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-medium text-gray-800">{courseToDelete.courseTitle}</h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                courseToDelete.status === "published" ? "bg-green-100 text-green-800" :
                                                courseToDelete.status === "draft" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-gray-100 text-gray-800"
                                            }`}>
                                                {courseToDelete.status?.charAt(0).toUpperCase() + courseToDelete.status?.slice(1)}
                                            </span>
                                            <span className="text-xs text-gray-600">
                                                {courseToDelete.students || 0} students enrolled
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 text-red-500">
                                        <FiAlertTriangle />
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-medium">Are you sure you want to delete this course?</p>
                                        <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                            <li>• All course content will be permanently removed</li>
                                            <li>• Student enrollments will be cancelled</li>
                                            <li>• This action cannot be undone</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Note:</span> Type <span className="font-mono font-bold text-red-600">DELETE</span> to confirm.
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Type DELETE to confirm"
                                        className="w-full mt-2 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                        id="deleteConfirmationInput"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={closeDeleteModal}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <FiTrash2 />
                                        Delete Course
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <BackToDashboard />
            
            {/* Top-content */}
            <div className='flex justify-between p-5'>
                <h1 className='text-4xl font-semibold'>My Courses</h1>
                <Link 
                    to={"/teacher/createcourse"} 
                    className='bg-blue-500 text-white text-lg rounded-xl font-semibold hover:shadow-md p-2 w-60 flex items-center justify-center hover:bg-blue-600 transition-colors'
                >
                    <span className='text-xl pr-2'>+</span> Create New course
                </Link>
            </div>

            {/* Course list */}
            {courses.map((item, i) => (
                <div key={i} className='p-5 mt-5'>
                    <div className='border border-gray-300 rounded-2xl bg-white p-5 flex justify-between items-center hover:shadow-md transition-shadow'>
                        
                        {/* Course info */}
                        <div 
                            className='flex gap-5 cursor-pointer flex-1' 
                            onClick={() => handleOpenCourse(item._id)}
                        >
                            {/* Thumbnail */}
                            <div className='h-20 w-30 rounded-xl overflow-hidden flex-shrink-0'>
                                <img 
                                    className='rounded-xl w-full h-full object-cover' 
                                    src={item.thumbnail} 
                                    alt={item.courseTitle} 
                                />
                            </div>

                            {/* Course details */}
                            <div className='flex-1'>
                                <div className='flex items-center gap-2'>
                                    <h1 className='text-xl font-medium'>{item.courseTitle}</h1>
                                </div>
                                <div className='flex flex-wrap gap-4 text-gray-500 pt-3'>
                                    <p className='flex items-center gap-1'>
                                        <span className='text-lg'><LuUsersRound /></span>
                                        {item.students || 0} students
                                    </p>
                                    <p className='flex items-center gap-1'>
                                        <span className='text-lg'><CiStar /></span>
                                        {item.rating || 'No'} rating
                                    </p>
                                    <p className='flex items-center gap-1'>
                                        <span className='text-lg'><IoMdCheckmarkCircleOutline /></span>
                                        <span className={`font-medium ${
                                            item.status === "published" ? "text-green-600" :
                                            item.status === "draft" ? "text-yellow-600" :
                                            "text-gray-600"
                                        }`}>
                                            {item.status === "published" 
                                                ? "Published" 
                                                : item.status === "draft" 
                                                    ? "Draft Saved" 
                                                    : item.status || "Draft"}
                                        </span>
                                    </p>
                                    <p className='flex items-center gap-1'>
                                        <span className='text-lg'><CiCalendar /></span>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons and dropdown */}
                        <div className='relative'>
                            {/* Desktop action buttons (visible on larger screens) */}
                            <div className='hidden md:flex gap-3'>
                                <button
                                    onClick={() => handleEdit(item._id)}
                                    className='border border-gray-200 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors'
                                    title="Edit course"
                                >
                                    <FaRegEdit />
                                </button>
                                <button 
                                    onClick={() => openDeleteModal(item)}
                                    className="border border-gray-200 w-10 h-10 flex items-center justify-center rounded-xl text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                                    title="Delete course"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>

                            {/* Mobile dropdown button (visible on smaller screens) */}
                            <div className='md:hidden'>
                                <button 
                                    onClick={() => toggleDropdown(i)}
                                    className='border border-gray-200 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors'
                                >
                                    <BsThreeDotsVertical />
                                </button>
                            </div>

                            {/* Dropdown menu */}
                            {openDropdown === i && (
                                <div 
                                    ref={el => dropdownRefs.current[i] = el}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                                >
                                    <div className="py-1">
                                        <button
                                            onClick={() => handleEdit(item._id)}
                                            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                                        >
                                            <FaRegEdit className="text-gray-500" />
                                            Edit Course
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(item)}
                                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3"
                                        >
                                            <FiTrash2 />
                                            Delete Course
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}