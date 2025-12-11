// MyCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";

import Img1 from "../../../../../assets/imges/img1.jpg";
import Img2 from "../../../../../assets/imges/img2.jpg";
import Img3 from "../../../../../assets/imges/img3.jpg";
import Img4 from "../../../../../assets/imges/img4.jpg";
import Img5 from "../../../../../assets/imges/img5.jpg";
import Img6 from "../../../../../assets/imges/img6.jpg";
import Img7 from "../../../../../assets/imges/img7.jpg";
import Img8 from "../../../../../assets/imges/img8.jpg";
import Img9 from "../../../../../assets/imges/img9.jpg";
import Img11 from "../../../../../assets/imges/img11.jpg";
import Img12 from "../../../../../assets/imges/img12.jpg";
import Img13 from "../../../../../assets/imges/img13.jpg";
// // import BACKEND_URL from "../../../../../api/Api";

const API = `http://localhost:5000/api/courses`;

export default function MyCourses() {
    const navigate = useNavigate();

    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    const [showBrowseModal, setShowBrowseModal] = useState(false);
    const [showEmailPopup, setShowEmailPopup] = useState(false);

    const [email, setEmail] = useState("");
    const [pendingCourseId, setPendingCourseId] = useState(null);

    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const fallbackImages = [
        Img1, Img2, Img3, Img4, Img5,
        Img6, Img7, Img8, Img9, Img11, Img12, Img13
    ];
    // const getRandomImage = () =>
    //     fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    // const fetchPurchasedCourses = async () => {
    //     try {
    //         setLoading(true);
    //         const user = JSON.parse(localStorage.getItem("user")) || {};

    //         const email = user.email;
    //         let studentId = user?._id || null;

    //         if (email) {
    //             const foundId = await getStudentIdByEmail(email);
    //             if (foundId) studentId = foundId;
    //         }

    //         if (!studentId) {
    //             console.log("fetchPurchasedCourses: no studentId available",email);
    //             setPurchasedCourses([]);
    //             return;
    //         }

    //         const res = await axios.get(`${API}/purchasedcourse/${studentId}`);
    //         console.log("Purchased API response:", res.data.data);
    //         setPurchasedCourses(res.data.data);

    //     } catch (err) {
    //         console.error("fetchPurchasedCourses error:", err);
    //         setPurchasedCourses([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // console.log("Purchased Courses:", purchasedCourses, email);

    // const fetchAllCourses = async () => {
    //     try {
    //         const res = await axios.get(`${API}/all/courses`);
    //         // Accept either array or res.data.courses
    //         setAllCourses(Array.isArray(res.data) ? res.data : (res.data?.courses || res.data?.data || []));
    //     } catch (err) {
    //         console.error("fetchAllCourses error:", err);
    //         setAllCourses([]);
    //     }
    // };

    // useEffect(() => {
    //     fetchPurchasedCourses();
    //     fetchAllCourses();
    // }, []);

    // const openCourse = (id) => navigate(`/student/mycourses/videoplayer/${id}`);

    // const openEmailPopup = (courseId) => {
    //     setPendingCourseId(courseId);
    //     setShowEmailPopup(true);
    // };

    // const verifyAndEnroll = async () => {
    //     if (!email.trim()) {
    //         alert("Please enter email");
    //         return;
    //     }
    //     try {
    //         // find student by email
    //         const cleanEmail = email.toLowerCase().trim();

    //         const res = await axios.get(`${API}/findByEmail/${cleanEmail}`);
    //         if (!res.data?.success) {
    //             alert("Email not found");
    //             return;
    //         }
    //         const studentId = res.data.studentId;
    //         // enroll
    //         await enrollNow(studentId, pendingCourseId);
    //         await fetchPurchasedCourses(email);
    //         setShowEmailPopup(false);
    //         setEmail("");
    //     } catch (err) {
    //         console.error("verifyAndEnroll err", err);
    //         alert("Verification or enrollment failed");
    //     }
    // };

    // const enrollNow = async (studentId, courseId) => {
    //     try {
    //         await axios.post(`${API}/enroll`, { studentId, courseId });
    //         // Re-fetch purchased courses immediately after enroll
    //         await fetchPurchasedCourses();
    //         alert("Course Enrolled Successfully!");
    //     } catch (err) {
    //         console.error("enrollNow err", err);
    //         alert(err.response?.data?.message || "Enroll failed");
    //     }
    // };

    // // Filter all courses by search input
    // const filteredCourses = allCourses.filter((c) =>
    //     (c.courseTitle || "").toLowerCase().includes(searchText.toLowerCase()) ||
    //     (c.courseCategory || "").toLowerCase().includes(searchText.toLowerCase())
    // );

    // // Utility: check if student already purchased this course (by course._id)
    // const isAlreadyPurchased = (courseId) =>
    //     purchasedCourses.some((pc) => String(pc._id) === String(courseId));

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <BackToDashboard />
            <div className="flex justify-between items-center mt-5">
                <h1 className="text-4xl font-bold">My Courses</h1>
                <Link to={'/student/mycourses/browsecourses'}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"

                >
                    Browse Courses
                </Link>
            </div>
        </div>
    );
}










// // src/.../MyCourses.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
// import "./mycourses.css";

// import Code from "../../../../../assets/code.jpg";
// import Img1 from "../../../../../assets/imges/img1.jpg";
// import Img2 from "../../../../../assets/imges/img2.jpg";
// import Img3 from "../../../../../assets/imges/img3.jpg";
// import Img4 from "../../../../../assets/imges/img4.jpg";
// import Img5 from "../../../../../assets/imges/img5.jpg";
// import Img6 from "../../../../../assets/imges/img6.jpg";
// import Img7 from "../../../../../assets/imges/img7.jpg";
// import Img8 from "../../../../../assets/imges/img8.jpg";
// import Img9 from "../../../../../assets/imges/img9.jpg";
// import Img11 from "../../../../../assets/imges/img11.jpg";
// import Img12 from "../../../../../assets/imges/img12.jpg";
// import Img13 from "../../../../../assets/imges/img13.jpg";

// const API = "http://localhost:5000/api";

// export default function MyCourses() {
//     const navigate = useNavigate();

//     // enrolled (purchased) courses shown on My Courses page
//     const [enrolledCourses, setEnrolledCourses] = useState([]);

//     // all available courses for Browse modal
//     const [allCourses, setAllCourses] = useState([]);

//     // UI states
//     const [showModal, setShowModal] = useState(false);
//     const [searchText, setSearchText] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [enrollingIds, setEnrollingIds] = useState([]); // to show spinner/disable while enrolling

//     const fallbackImages = [
//         Img1, Code, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img11, Img12, Img13,
//     ];

//     const getRandomImage = () => {
//         const i = Math.floor(Math.random() * fallbackImages.length);
//         return fallbackImages[i];
//     };
//     // For testing: set a dummy student in localStorage
//     localStorage.setItem("student", JSON.stringify({
//         _id: "692ee457fd727219d48f23db",
//         email: "barath123@gmail.com",
//         role: "student"
//     }));

//     // get logged-in student's id from localStorage
//     const getStudentFromStorage = () => {
//         try {
//             const userRaw = localStorage.getItem("user");
//             if (userRaw) {
//                 const u = JSON.parse(userRaw);
//                 if (u && u._id) return u._id;
//             }

//             const studentRaw = localStorage.getItem("student");
//             if (studentRaw) {
//                 const s = JSON.parse(studentRaw);
//                 if (s && s._id) return s._id;
//             }

//             const sid = localStorage.getItem("studentId");
//             if (sid) return sid; // sometimes you store direct id string

//             // Optional: decode token if you store JWT
//             const token = localStorage.getItem("token");
//             if (token) {
//                 // simple decode (no verify) to extract id from payload
//                 try {
//                     const payload = JSON.parse(atob(token.split(".")[1]));
//                     if (payload && payload.id) return payload.id;
//                 } catch (err) {
//                     // ignore decode errors
//                 }
//             }

//             return null;
//         } catch (err) {
//             return null;
//         }
//     };
//     function getStudentId() {
//         const user = JSON.parse(localStorage.getItem("user"));
//         return user?._id || null;
//     }
   

//     const fetchEnrolledCourses = async () => {
//         try {
//             setLoading(true);
//              const studentId = getStudentId();
//             if (!studentId) {
//                 setEnrolledCourses([]);
//                 setLoading(false);
//                 return;
//             }
//             const res = await axios.get(`http://localhost:5000/api/courses/purchasedcourse/${studentId}`);
//             console.log("Purchased:", res.data);
//             const purchased = res.data.data || [];
//             const courses = purchased.map((p) => ({ ...p.course, purchasedAt: p.purchasedAt }));
//             setEnrolledCourses(courses);
//         } catch (err) {
//             console.error("fetchEnrolledCourses err", err.response?.data || err.message);
//             setEnrolledCourses([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch all courses for browsing
//     const fetchAllCourses = async () => {
//         try {
//             const res = await axios.get(`${API}/courses/all/courses`);
//             setAllCourses(res.data || []);
//         } catch (err) {
//             console.error("fetchAllCourses err", err);
//             setAllCourses([]);
//         }
//     };

//     useEffect(() => {
//         fetchEnrolledCourses();
//         fetchAllCourses();
//     }, []);

//     // enroll course handler
//     const handleEnroll = async (courseId) => {
//          const studentId = getStudentId();
//         console.log("Enroll payload studentId:", studentId, "courseId:", courseId);

//         if (!studentId) {
//             alert("No logged-in student found. Please login.");
//             return;
//         }

//         try {
//             setEnrollingIds((s) => [...s, courseId]);
//             const res = await axios.post("http://localhost:5000/api/courses/enroll", {
//                 studentId,
//                 courseId,
//             });
//             console.log("Enroll response:", res.data);
//             alert("Enrolled successfully!");
//             await fetchEnrolledCourses(); // refresh after enroll
//             await fetchAllCourses();
//         } catch (err) {
//             console.error("Enroll error", err.response?.data || err.message);
//             alert(err.response?.data?.message || "Enroll failed");
//         } finally {
//             setEnrollingIds((s) => s.filter((id) => id !== courseId));
//         }
//     };

//     // helper: check if course is already enrolled
//     const isCourseEnrolled = (courseId) => {
//         return enrolledCourses.some((c) => c._id === courseId);
//     };

//     const openCourse = (id) => {
//         navigate(`/student/mycourses/videoplayer/${id}`);
//     };

//     // Filtered visible courses in modal when searching
//     const filteredBrowse = allCourses.filter((course) => {
//         if (!searchText.trim()) return true; // show all if empty (but you asked to show a "start typing" message — we handle below)
//         const q = searchText.toLowerCase();
//         return (
//             (course.courseTitle || "").toLowerCase().includes(q) ||
//             (course.courseCategory || "").toLowerCase().includes(q) ||
//             (course.instructor || "").toLowerCase().includes(q)
//         );
//     });

//     return (
//         <div className="p-10 bg-gray-100 min-h-screen">
//             <BackToDashboard />

//             <div className="flex justify-between items-center mt-5">
//                 <h1 className="text-4xl font-bold">My Courses</h1>

//                 <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                     onClick={() => setShowModal(true)}
//                 >
//                     Browse Courses
//                 </button>
//             </div>

//             {/* Modal */}
//             {showModal && (
//                 <div
//                     className="fixed inset-0 bg-black/70 bg-opacity-50 backdrop-blur-sm flex justify-center items-start pt-20 z-50 animate-fadeIn"
//                     onClick={() => setShowModal(false)}
//                 >
//                     <div
//                         className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-xl p-6 shadow-xl animate-slideUp relative"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
//                         >
//                             ✖
//                         </button>

//                         <h2 className="text-2xl font-bold mb-4">Browse Courses</h2>

//                         <input
//                             type="text"
//                             value={searchText}
//                             onChange={(e) => setSearchText(e.target.value)}
//                             className="w-full p-3 border rounded-lg mb-4 bg-gray-100 focus:ring-2 focus:ring-blue-500"
//                             placeholder="Type to search by title, category, instructor..."
//                         />

//                         {/* Show message when user hasn't typed yet */}
//                         {searchText.trim() === "" ? (
//                             <div className="text-center text-gray-500 py-8">
//                                 Start typing to search available courses...
//                             </div>
//                         ) : (
//                             <div className="max-h-[60vh] overflow-y-auto space-y-3">
//                                 {filteredBrowse.length === 0 ? (
//                                     <p className="text-center text-gray-500">No matching courses found.</p>
//                                 ) : (
//                                     filteredBrowse.map((c) => {
//                                         const enrolled = isCourseEnrolled(c._id);
//                                         const enrolling = enrollingIds.includes(c._id);

//                                         return (
//                                             <div
//                                                 key={c._id}
//                                                 className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 flex gap-4 items-center"
//                                             >
//                                                 <img
//                                                     src={c.thumbnail || getRandomImage()}
//                                                     alt={c.courseTitle}
//                                                     className="w-28 h-20 object-cover rounded"
//                                                 />
//                                                 <div className="flex-1">
//                                                     <h3 className="text-lg font-semibold">{c.courseTitle}</h3>
//                                                     <p className="text-sm text-gray-600">Category: {c.courseCategory}</p>
//                                                     <p className="text-sm text-gray-600">Level: {c.courseLevel}</p>
//                                                 </div>

//                                                 <div className="flex flex-col items-end gap-2">
//                                                     {enrolled ? (
//                                                         <button
//                                                             className="px-3 py-1 bg-green-600 text-white rounded text-sm"
//                                                             onClick={() => openCourse(c._id)}
//                                                         >
//                                                             Enrolled
//                                                         </button>
//                                                     ) : (
//                                                         <button
//                                                             className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
//                                                             disabled={enrolling}
//                                                             onClick={() => handleEnroll(c._id)}
//                                                         >
//                                                             {enrolling ? "Enrolling..." : "Enroll"}
//                                                         </button>
//                                                     )}
//                                                     <button
//                                                         className="mt-3 text-xm text-gray-500 hover:underline"
//                                                         onClick={() => openCourse(c._id)}
//                                                     >
//                                                         View Course
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* Main My Courses content */}
//             <div className="mt-10">
//                 {loading ? (
//                     <p className="text-center">Loading...</p>
//                 ) : enrolledCourses.length === 0 ? (
//                     <p className="text-center text-gray-500 mt-20 text-xl">
//                         No enrolled courses yet. Browse and enroll to get started.
//                     </p>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {enrolledCourses.map((c) => (
//                             <div
//                                 key={c._id}
//                                 className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer"
//                                 onClick={() => openCourse(c._id)}
//                             >
//                                 <img
//                                     src={c.thumbnail || getRandomImage()}
//                                     alt={c.courseTitle}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-4">
//                                     <h3 className="text-lg font-semibold">{c.courseTitle}</h3>
//                                     <p className="text-sm text-gray-600">Category: {c.courseCategory}</p>

//                                     <div className="mt-4 flex justify-between items-center">
//                                         <div className="text-sm text-gray-600">Progress</div>
//                                         <div className="text-sm font-medium">{c.progress ?? 0}%</div>
//                                     </div>

//                                     <Link
//                                         to={`/student/mycourses/videoplayer/${c._id}`}
//                                         className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-4"
//                                     >
//                                         Open Course
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


// // import React, { useState, useEffect } from 'react'
// // import { FaArrowLeftLong } from "react-icons/fa6";
// // import CourseCard from './coursesCard';
// // import Code from "../../../../../assets/code.jpg";
// // import './mycourses.css'
// // import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
// // import { LuUsersRound } from "react-icons/lu";
// // import { CiStar } from "react-icons/ci";
// // import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// // import { CiCalendar } from "react-icons/ci";
// // import { MdOutlineRemoveRedEye } from "react-icons/md";
// // import { FaRegEdit } from "react-icons/fa";
// // import { BsThreeDotsVertical } from "react-icons/bs";
// // import axios from "axios";
// // import { useNavigate, Link } from 'react-router-dom';
// // import Img1 from "../../../../../assets/imges/img1.jpg"
// // import Img2 from "../../../../../assets/imges/img2.jpg"
// // import Img3 from "../../../../../assets/imges/img3.jpg"
// // import Img4 from "../../../../../assets/imges/img4.jpg"
// // import Img5 from "../../../../../assets/imges/img5.jpg"
// // import Img6 from "../../../../../assets/imges/img6.jpg"
// // import Img7 from "../../../../../assets/imges/img7.jpg"
// // import Img8 from "../../../../../assets/imges/img8.jpg"
// // import Img9 from "../../../../../assets/imges/img9.jpg"
// // import Img11 from "../../../../../assets/imges/img11.jpg"
// // import Img12 from "../../../../../assets/imges/img12.jpg"
// // import Img13 from "../../../../../assets/imges/img13.jpg"



// // export default function MyCourses() {

// //     const backend_url = "http://localhost:5000"
// //     // const [courses, setcourses] = useState([])
// //     const navigate = useNavigate();

// //     const [studentCourses, setStudentCourses] = useState([]);
// //     const [showSearch, setShowSearch] = useState(false);
// //     const [searchText, setSearchText] = useState("");


// //     useEffect(() => {
// //         const fetchData = async () => {
// //             // const user_id = JSON.parse(localStorage.getItem("studentId"))
// //             // console.log(user_id._id);
// //             try {
// //                 // const res = await axios.get(`http://localhost:5000/api/courses/purchasedcourse/${user_id._id}`);
// //                 // console.log(res.data.data)
// //                 const response = await axios.get("http://localhost:5000/api/courses/all/courses");
// //                 // setcourses(res.data.data)
// //                 // setCourses(res.data.courses);
// //                 console.log("Courses data:", response.data);
// //                 setStudentCourses(response.data);

// //             } catch (error) {
// //                 console.log(`error occured in fetchdata of mycourse ${error}`)
// //             }
// //         }
// //         fetchData();
// //     }, [])

// //     const handleOpenCourse = (id) => {
// //         navigate(`/student/mycourses/videoplayer/${id}`);
// //     };

// //     const fallbackImages = [Img1, Code, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img11, Img12, Img13];

// //     const getRandomImage = () => {
// //         const index = Math.floor(Math.random() * fallbackImages.length);
// //         return fallbackImages[index];


// //     };

// //     return (
// //         <div className='p-10 bg-gray-100'>
// //             <BackToDashboard />
// //             {/* title */}
// //             <div className="card flex justify-between items-center mt-5 pb-15">
// //                 <h1 className="respon-h1 text-4xl font-bold">My Courses</h1>
// //                 {showSearch && (
// //                     <div className="mt-5 p-5 rounded-lg">

// //                         {/* 🔍 Search Input */}
// //                         <input
// //                             type="text"
// //                             placeholder="Search courses..."
// //                             value={searchText}
// //                             onChange={(e) => setSearchText(e.target.value)}
// //                             className="w-full p-3 border rounded-lg mb-4 bg-white"
// //                         />
// //                     </div>
// //                 )}
// //                 <button className="respon-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// //                     onClick={() => setShowSearch(!showSearch)}>
// //                     Browse Courses
// //                 </button>
// //             </div>

// //             {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-20">
// //                 {courses.map((item) => (
// //                     item.course && (
// //                         <CourseCard key={item.course._id} course={item.course} />
// //                     )
// //                 ))}
// //             </div> */}
// //             <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 mt-10">
// //                 {studentCourses.map((item, i) => (
// //                     <div key={i} className="flex justify-center mb-10">
// //                         <div onClick={() => handleOpenCourse(item._id)} className="bg-white shadow-md rounded-4xl overflow-hidden w-full sm:w-92 mt-[-50px] cursor-pointer mb-10 shadow-xl/20">
// //                             <img src={item.thumbnail ? item.thumbnail : getRandomImage()} alt={item.title} className="w-full h-60 object-cover" />
// //                             <div className="p-4">
// //                                 <h3 className="text-lg font-semibold">{item.courseTitle}</h3>
// //                                 <p className="text-sm text-gray-500 mb-2">by {item.instructor}</p>

// //                                 <div className="mb-3 mt-6">
// //                                     <div className="flex justify-between">
// //                                         <p className="text-sm">Progress</p>
// //                                         <p className="text-sm">{item.progress}%</p>
// //                                     </div>

// //                                     <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
// //                                         <div
// //                                             className="bg-blue-600 h-2.5 rounded-full"
// //                                             style={{ width: `${item.progress}%` }}
// //                                         ></div>
// //                                     </div>
// //                                 </div>

// //                                 <Link
// //                                     to={`/student/mycourses/videoplayer/${item._id}`}
// //                                     className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-6 mb-5"
// //                                 >
// //                                     Enroll Now
// //                                 </Link>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div >
// //     )
// // }


// import React, { useState, useEffect } from 'react'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import CourseCard from './coursesCard';
// import Code from "../../../../../assets/code.jpg";
// import './mycourses.css'
// import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
// import { LuUsersRound } from "react-icons/lu";
// import { CiStar } from "react-icons/ci";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { CiCalendar } from "react-icons/ci";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import axios from "axios";
// import { useNavigate, Link } from 'react-router-dom';
// import Img1 from "../../../../../assets/imges/img1.jpg"
// import Img2 from "../../../../../assets/imges/img2.jpg"
// import Img3 from "../../../../../assets/imges/img3.jpg"
// import Img4 from "../../../../../assets/imges/img4.jpg"
// import Img5 from "../../../../../assets/imges/img5.jpg"
// import Img6 from "../../../../../assets/imges/img6.jpg"
// import Img7 from "../../../../../assets/imges/img7.jpg"
// import Img8 from "../../../../../assets/imges/img8.jpg"
// import Img9 from "../../../../../assets/imges/img9.jpg"
// import Img11 from "../../../../../assets/imges/img11.jpg"
// import Img12 from "../../../../../assets/imges/img12.jpg"
// import Img13 from "../../../../../assets/imges/img13.jpg"



// export default function MyCourses() {

//     const backend_url = "http://localhost:5000"
//     // const [courses, setcourses] = useState([])
//     const navigate = useNavigate();

//     const [studentCourses, setStudentCourses] = useState([]);


//     useEffect(() => {
//         const fetchData = async () => {
//             // const user_id = JSON.parse(localStorage.getItem("studentId"))
//             // console.log(user_id._id);
//             try {
//                 // const res = await axios.get(`http://localhost:5000/api/courses/purchasedcourse/${user_id._id}`);
//                 // console.log(res.data.data)
//                 const response = await axios.get("http://localhost:5000/api/courses/all/courses");
//                 // setcourses(res.data.data)
//                 // setCourses(res.data.courses);
//                 console.log("Courses data:", response.data);
//                 setStudentCourses(response.data);

//             } catch (error) {
//                 console.log(`error occured in fetchdata of mycourse ${error}`)
//             }
//         }
//         fetchData();
//     }, [])

//     const handleOpenCourse = (id) => {
//         navigate(`/student/mycourses/videoplayer/${id}`);
//     };

//     const fallbackImages = [Img1,Code,Img2,Img3,Img4,Img5,Img6,Img7,Img8,Img9,Img11,Img12,Img13];

//     const getRandomImage = () => {
//     const index = Math.floor(Math.random() * fallbackImages.length);
//     return fallbackImages[index];


// };

//     return (
//         <div className='p-10 bg-gray-50 min-h-full'>
//             <BackToDashboard />
//             {/* title */}
//             <div className="card flex justify-between items-center mt-5 pb-15">
//                 <h1 className="respon-h1 text-4xl font-bold">My Courses</h1>
//                 <Link to={'/student/mycourses/browsecourses'} className="respon-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//                     Browse Courses
//                 </Link>
//             </div>

//             {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-20">
//                 {courses.map((item) => (
//                     item.course && (
//                         <CourseCard key={item.course._id} course={item.course} />
//                     )
//                 ))}
//             </div> */}
//             <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 mt-10">
//                 {studentCourses.map((item, i) => (
//                     <div key={i} className="flex justify-center mb-10">
//                         <div onClick={() => handleOpenCourse(item._id)} className="bg-white shadow-md rounded-4xl overflow-hidden w-full sm:w-92 mt-[-50px] cursor-pointer mb-10 shadow-xl/20">
//                             <img src={item.thumbnail ? item.thumbnail : getRandomImage()} alt={item.title} className="w-full h-60 object-cover" />
//                             <div className="p-4">
//                                 <h3 className="text-lg font-semibold">{item.courseTitle}</h3>
//                                 <p className="text-sm text-gray-500 mb-2">by {item.instructor}</p>

//                                 <div className="mb-3 mt-6">
//                                     <div className="flex justify-between">
//                                         <p className="text-sm">Progress</p>
//                                         <p className="text-sm">{item.progress}%</p>
//                                     </div>

//                                     <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
//                                         <div
//                                             className="bg-blue-600 h-2.5 rounded-full"
//                                             style={{ width: `${item.progress}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>

//                                 <Link
//                                     to={`/student/mycourses/videoplayer/${item._id}`}
//                                     className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-6 mb-5"
//                                 >
//                                     Continue Learning
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div >
//     )
// }