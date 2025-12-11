// import React, { useEffect, useState } from 'react'
// import { LuDelete, LuTrash, LuUsersRound } from "react-icons/lu";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { CiCalendar } from "react-icons/ci";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { MdAccessTime } from "react-icons/md";
// import { HiMiniVideoCameraSlash } from "react-icons/hi2";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";


// export default function LiveWebinar() {

//     const navigate = useNavigate();
//     const [click, setClick] = useState("Schedule");
//     const [webinars, setWebinars] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [previewData, setPreviewData] = useState(null);
//     const [editingId, setEditingId] = useState(null);
//     const [publishingId, setPublishingId] = useState(null);


//     //Publish function
//     const handlePublish = async (id, currentStatus) => {
//         setPublishingId(id);
//         try {
//             console.log("publishing webinar:", id, "status:", currentStatus);

//             if (currentStatus !== "in-planning") {
//                 toast.error("Only 'in-planning' webinars can be published");
//                 setPublishingId(null);
//                 return;
//             }

//             if (!window.confirm("Are you sure you want to publish this webinar? once published, it will be visible to students.")) {
//                 setPublishingId(null);
//                 return;
//             }

//             const res = await axios.put(
//                 `http://localhost:5000/api/webinar/updateStatus/${id}`,
//                 { status: "schedule" },
//                 );
//             console.log("✅ Publish response:", res.data);

//             toast.success("Webinar Published Successfully!");

//             if (res.data.success) {
//                 toast.success("Webinar Published Successfully!");
//                 fetchWebinars(); // Refresh the list
//                 setPreviewData(null);
//             } else {
//                 toast.error(res.data.message || "Failed to publish webinar");
//             }

//         } catch (error) {
//             console.error("❌ Publish error:", error);

//             if (error.response) {
//                 toast.error(error.response.data?.message || `Failed to publish: ${error.response.status}`);
//             } else if (error.request) {
//                 toast.error("Network error - Could not connect to server");
//             } else {
//                 toast.error("Error: " + error.message);
//             }
//         } finally {
//             setPublishingId(null);
//         }
//     };


//     // Delete function - FIXED
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this webinar? This action cannot be undone.")) {
//             try {
//                 const res = await axios.delete(`http://localhost:5000/api/webinar/delete/${id}`);

//                 if (res.data.success) {
//                     toast.success("Webinar deleted successfully");
//                     fetchWebinars(); // Refresh the list
//                     setPreviewData(null); // Close preview if open
//                 } else {
//                     toast.error(res.data.message || "Failed to delete webinar");
//                 }
//             } catch (error) {
//                 console.error("❌ Delete error:", error);
//                 toast.error(error.response?.data?.message || "Failed to delete webinar");
//             }
//         }
//     };

//     // Fetch webinars - FIXED
//     const fetchWebinars = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get("http://localhost:5000/api/webinar/all");

//             if (res.data.success) {
//                 setWebinars(res.data.data || []);
//                 console.log("✅ Webinars loaded:", res.data.data?.length || 0, res.data);
//             } else {
//                 toast.error(res.data.message || "Failed to load webinars");
//                 setWebinars([]);
//             }
//         } catch (error) {
//             console.error("❌ Fetch error:", error);
//             toast.error(error.response?.data?.message || "Failed to load webinars");
//             setWebinars([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchWebinars();
//     }, []);



//     const scheduleList = webinars.filter(w => w.status === "schedule");
//     const planningList = webinars.filter(w => w.status === "in-planning");
//     const completedList = webinars.filter(w => w.status === "completed");
//     const buttons = ["Schedule", "In Planning", "Completed"];

//     return (
//         <div className='p-4 md:p-10 bg-blue-50 pb-20 min-h-screen'>
//             {/* Top-content */}
//             <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-5 gap-4'>
//                 <h1 className='text-2xl md:text-4xl font-semibold'>Live Webinar Planning</h1>
//                 <Link
//                     to={"/teacher/scheduleWebinar"}
//                     className='bg-blue-500 text-white text-sm md:text-lg rounded-xl font-semibold hover:shadow-md p-2 md:p-3 whitespace-nowrap transition-shadow hover:bg-blue-600'
//                 >
//                     <span className='text-lg md:text-xl pr-2 md:pr-5'>+</span> Schedule New Webinar
//                 </Link>
//             </div>

//             {/* Filter Buttons */}
//             <div className="Filter-Buttons flex flex-wrap gap-2 sm:gap-4 mt-10 bg-gray-200 rounded-full w-fit px-1 sm:px-3 py-1">
//                 {buttons.map((btn, i) => (
//                     <button
//                         key={i}
//                         onClick={() => {
//                             setClick(btn);
//                             setPreviewData(null);
//                         }}
//                         className={`btn rounded-full px-4 sm:px-6 py-1.5 text-sm sm:text-base font-medium transition-all duration-300 
//                         ${click === btn
//                                 ? "bg-white shadow-md text-blue-600"
//                                 : "hover:bg-white hover:text-gray-800 text-gray-600"
//                             }`}
//                     >
//                         {btn}
//                     </button>
//                 ))}
//             </div>

//             {/* Loading State */}
//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                     <span className="ml-3 text-gray-600">Loading webinars...</span>
//                 </div>
//             ) : (
//                 /* Tab Content */
//                 <div className="mt-6 space-y-5">
//                     {/* Schedule Tab */}
//                     {click === "Schedule" && (
//                         scheduleList.length === 0 ? (
//                             <div className='border border-gray-300 rounded-2xl bg-white p-8 md:p-15 text-center'>
//                                 <div className='flex justify-center text-9xl text-gray-600'><HiMiniVideoCameraSlash /></div>
//                                 <h1 className='font-semibold text-xl md:text-2xl mt-3'>No Scheduled Webinars</h1>
//                                 <p className='mt-3 text-gray-500'>Your scheduled webinars will appear here.</p>
//                                 <Link to={"/teacher/scheduleWebinar"} className='mt-5 inline-block bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-md hover:bg-blue-600 transition-all'>
//                                     Schedule Your First Webinar
//                                 </Link>
//                             </div>
//                         ) : scheduleList.map((item, i) => (
//                             <div key={i} className="cursor-pointer" onClick={() => setPreviewData(item)}>
//                                 <div className='border border-gray-300 rounded-2xl bg-white p-5 flex flex-col md:flex-row justify-between hover:shadow-md transition-shadow'>
//                                     <div className="flex-1">
//                                         <h1 className='text-xl font-semibold text-gray-800'>{item.title || "No Title"}</h1>

//                                         <div className='flex flex-col md:flex-row md:gap-20 text-gray-500 pt-4 gap-3'>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><CiCalendar /></span>
//                                                 {item.date || "No Date"}
//                                             </p>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><MdAccessTime /></span>
//                                                 {item.duration || "1 hour"}
//                                             </p>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><LuUsersRound /></span>
//                                                 {item.registered || "0"}/{item.limit || "100"} registered
//                                             </p>
//                                         </div>

//                                         {/* Progress Bar */}
//                                         <div className='h-2.5 w-full md:w-60 rounded-full bg-blue-100 mt-3'>
//                                             <div
//                                                 className='bg-blue-500 h-2.5 rounded-full transition-all duration-500'
//                                                 style={{
//                                                     width: item.registered && item.limit
//                                                         ? `${(parseInt(item.registered) / parseInt(item.limit)) * 100}%`
//                                                         : '0%'
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>

//                                     {/* Action Buttons */}
//                                     <div className='flex gap-3 text-xl text-gray-600 mt-5 items-center'>
//                                         <span className='bg-green-500 rounded-full h-6 px-3 text-white text-sm flex items-center'>
//                                             Scheduled
//                                         </span>
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 handleDelete(item._id);
//                                             }}
//                                             className='border border-gray-300 w-10 h-8 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-colors'
//                                             title="Delete"
//                                         >
//                                             <RiDeleteBin5Line />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}

//                     {/* In Planning Tab */}
//                     {click === "In Planning" && (
//                         planningList.length === 0 ? (
//                             <div className='border border-gray-300 rounded-2xl bg-white p-8 md:p-15 text-center'>
//                                 <div className='flex justify-center text-9xl text-gray-600'><HiMiniVideoCameraSlash /></div>
//                                 <h1 className='font-semibold text-xl md:text-2xl mt-3'>No Webinars in Planning</h1>
//                                 <p className='mt-3 text-gray-500'>Your draft webinars will appear here.</p>
//                             </div>
//                         ) : planningList.map((item, i) => (
//                             <div key={i} className="hover:shadow-md transition-shadow">
//                                 <div className='border border-gray-300 rounded-2xl bg-white p-5 flex flex-col md:flex-row justify-between'>
//                                     <div className="flex-1">
//                                         <h1 className='text-xl font-semibold text-gray-800'>{item.title || "No Title"}</h1>

//                                         <div className='flex flex-col md:flex-row md:gap-20 text-gray-500 pt-4 gap-3'>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><CiCalendar /></span>
//                                                 {item.date || "Date TBD"}
//                                             </p>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><MdAccessTime /></span>
//                                                 {item.duration || "1 hour"}
//                                             </p>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><LuUsersRound /></span>
//                                                 Max {item.limit || 100} participants
//                                             </p>
//                                         </div>

//                                         {/* Description if available */}
//                                         {item.description && (
//                                             <p className="text-gray-600 mt-2 text-sm">
//                                                 {item.description.length > 100
//                                                     ? `${item.description.substring(0, 100)}...`
//                                                     : item.description}
//                                             </p>
//                                         )}
//                                     </div>

//                                     <div className='flex flex-wrap gap-3 text-xl text-gray-600 mt-5 md:mt-3 items-center'>
//                                         <span className='bg-yellow-500 rounded-full h-6 px-3 text-white text-sm flex items-center whitespace-nowrap'>
//                                             Draft
//                                         </span>

//                                         {/* EDIT BUTTON */}
//                                         <button
//                                             onClick={async () => {
//                                                 try {
//                                                     setEditingId(item._id);
//                                                     console.log("🔄 Navigating to edit webinar:", item._id);

//                                                     // Test API connection
//                                                     const test = await axios.get(`http://localhost:5000/api/webinar/${item._id}`)
//                                                         .catch(err => {
//                                                             throw new Error("Cannot load webinar data");
//                                                         });

//                                                     navigate(`/teacher/scheduleWebinar/${item._id}`);

//                                                     setTimeout(() => setEditingId(null), 1000);

//                                                 } catch (error) {
//                                                     console.error("❌ Edit navigation error:", error);
//                                                     toast.error(`Cannot edit webinar: ${error.message}`);
//                                                     setEditingId(null);
//                                                 }
//                                             }}
//                                             disabled={editingId === item._id}
//                                             className={`border border-gray-300 w-10 h-8 rounded-xl flex items-center justify-center transition-colors ${editingId === item._id
//                                                 ? 'bg-gray-300 cursor-not-allowed'
//                                                 : 'bg-gray-100 hover:bg-gray-200 hover:text-blue-600'
//                                                 }`}
//                                             title="Edit Webinar"
//                                         >
//                                             {editingId === item._id ? (
//                                                 <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
//                                             ) : (
//                                                 <FaRegEdit />
//                                             )}
//                                         </button>

//                                         {/* PUBLISH BUTTON */}
//                                         <button
//                                             className={`rounded-full h-8 px-4 text-white text-sm flex items-center whitespace-nowrap transition-colors ${publishingId === item._id
//                                                 ? 'bg-blue-400 cursor-not-allowed'
//                                                 : 'bg-blue-600 hover:bg-blue-500'
//                                                 }`}
//                                             onClick={() => handlePublish(item._id, item.status)}
//                                             disabled={publishingId === item._id}
//                                         >
//                                             {publishingId === item._id ? (
//                                                 <>
//                                                     <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white mr-2"></div>
//                                                     Publishing...
//                                                 </>
//                                             ) : (
//                                                 'Publish'
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}

//                     {/* Completed Tab */}
//                     {click === "Completed" && (
//                         completedList.length === 0 ? (
//                             <div className='border border-gray-300 rounded-2xl bg-white p-8 md:p-15 text-center'>
//                                 <div className='flex justify-center text-9xl text-gray-600'><HiMiniVideoCameraSlash /></div>
//                                 <h1 className='font-semibold text-xl md:text-2xl mt-3'>No Completed Webinars</h1>
//                                 <p className='mt-3 text-gray-500'>Your completed webinars and recordings will appear here.</p>
//                             </div>
//                         ) : completedList.map((item, i) => (
//                             <div key={i} className="p-5">
//                                 <div className='border border-gray-300 rounded-2xl bg-white p-5 flex flex-col md:flex-row justify-between hover:shadow-md transition-shadow'>
//                                     <div className="flex-1">
//                                         <h1 className='text-xl font-semibold text-gray-800'>{item.title}</h1>

//                                         <div className='flex flex-col md:flex-row md:gap-20 text-gray-500 pt-4 gap-3'>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><CiCalendar /></span>
//                                                 {item.date || "Date not specified"}
//                                             </p>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><MdAccessTime /></span>
//                                                 {item.duration || "Duration not specified"}
//                                             </p>
//                                             <p className='flex items-center gap-1'>
//                                                 <span className='text-lg'><LuUsersRound /></span>
//                                                 {item.registered || "0"}/{item.limit || item.maxParticipants || "0"} participants
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className='flex gap-3 text-xl text-gray-600 mt-5 md:mt-3 items-center'>
//                                         <span className='bg-blue-500 rounded-full h-6 px-3 text-white text-sm flex items-center whitespace-nowrap'>
//                                             Completed
//                                         </span>
//                                         <button
//                                             onClick={() => handleDelete(item._id)}
//                                             className='border border-gray-300 w-10 h-8 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-colors'
//                                             title="Delete Webinar"
//                                         >
//                                             <LuTrash />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}

//             {/* Preview Modal */}
//             {previewData && (
//                 <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 p-4">
//                     <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                         <div className="flex justify-between items-start mb-4">
//                             <h2 className="text-2xl font-bold text-gray-800">{previewData.title}</h2>
//                             <button
//                                 onClick={() => setPreviewData(null)}
//                                 className="text-gray-500 hover:text-gray-700 text-xl"
//                             >
//                                 ✕
//                             </button>
//                         </div>

//                         <div className="mb-4">
//                             <p className="text-gray-600">{previewData.description || "No description available"}</p>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                             <div className="flex items-center gap-2">
//                                 <CiCalendar className="text-blue-600" />
//                                 <span className="font-medium">Date:</span>
//                                 <span>{previewData.date || "Not specified"}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <MdAccessTime className="text-blue-600" />
//                                 <span className="font-medium">Duration:</span>
//                                 <span>{previewData.duration || "Not specified"}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <LuUsersRound className="text-blue-600" />
//                                 <span className="font-medium">Participants:</span>
//                                 <span>{previewData.registered || "0"}/{previewData.limit || previewData.maxParticipants || "100"}</span>
//                             </div>
//                             {previewData.category && (
//                                 <div className="flex items-center gap-2">
//                                     <span className="font-medium">Category:</span>
//                                     <span>{previewData.category}</span>
//                                 </div>
//                             )}
//                             {previewData.level && (
//                                 <div className="flex items-center gap-2">
//                                     <span className="font-medium">Level:</span>
//                                     <span>{previewData.level}</span>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Progress Bar in Preview */}
//                         {previewData.registered && previewData.limit && (
//                             <div className="mb-4">
//                                 <div className="flex justify-between text-sm mb-1">
//                                     <span>Registration Progress</span>
//                                     <span>{((parseInt(previewData.registered) / parseInt(previewData.limit)) * 100).toFixed(1)}%</span>
//                                 </div>
//                                 <div className="h-2 w-full rounded-full bg-blue-100">
//                                     <div
//                                         className="h-2 rounded-full bg-blue-500"
//                                         style={{
//                                             width: `${(parseInt(previewData.registered) / parseInt(previewData.limit)) * 100}%`
//                                         }}
//                                     ></div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Tags if available */}
//                         {previewData.tags && previewData.tags.length > 0 && (
//                             <div className="mb-4">
//                                 <span className="font-medium mr-2">Tags:</span>
//                                 <div className="flex flex-wrap gap-2 mt-1">
//                                     {Array.isArray(previewData.tags)
//                                         ? previewData.tags.map((tag, index) => (
//                                             <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
//                                                 {tag}
//                                             </span>
//                                         ))
//                                         : <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
//                                             {previewData.tags}
//                                         </span>
//                                     }
//                                 </div>
//                             </div>
//                         )}

//                         {/* Webinar Schedule if available */}
//                         {previewData.webinarSchedule && (
//                             <div className="mb-4 p-3 bg-gray-50 rounded">
//                                 <h3 className="font-semibold mb-2">Schedule Details</h3>
//                                 <div className="grid grid-cols-2 gap-2 text-sm">
//                                     <div>
//                                         <span className="font-medium">Start:</span> {previewData.webinarSchedule.startDate} {previewData.webinarSchedule.startTime}
//                                     </div>
//                                     <div>
//                                         <span className="font-medium">End:</span> {previewData.webinarSchedule.endDate} {previewData.webinarSchedule.endTime}
//                                     </div>
//                                 </div>
//                                 {previewData.webinarSchedule.sessions && previewData.webinarSchedule.sessions.length > 0 && (
//                                     <div className="mt-2">
//                                         <span className="font-medium">Total Sessions:</span> {previewData.webinarSchedule.sessions.length}
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* Status Badge */}
//                         <div className="mb-4">
//                             <span className="font-medium mr-2">Status:</span>
//                             <span className={`px-3 py-1 rounded-full text-sm text-white ${previewData.status === 'schedule' ? 'bg-green-500' :
//                                 previewData.status === 'in-planning' ? 'bg-yellow-500' :
//                                     'bg-blue-500'
//                                 }`}>
//                                 {previewData.status === 'schedule' ? 'Scheduled' :
//                                     previewData.status === 'in-planning' ? 'In Planning' :
//                                         'Completed'}
//                             </span>
//                         </div>

//                         <div className="flex justify-end gap-3 mt-6">
//                             {previewData.status === 'in-planning' && (
//                                 <>
//                                     <button
//                                         onClick={() => {
//                                             navigate(`/teacher/scheduleWebinar/${previewData._id}`);
//                                             setPreviewData(null);
//                                         }}
//                                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                     >
//                                         Edit Webinar
//                                     </button>
//                                     <button
//                                         onClick={() => {
//                                             handlePublish(previewData._id, previewData.status);
//                                             setPreviewData(null);
//                                         }}
//                                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                     >
//                                         Publish
//                                     </button>
//                                 </>
//                             )}

//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



import React, { useEffect, useState } from 'react'
import { LuDelete, LuTrash, LuUsersRound } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import { HiMiniVideoCameraSlash } from "react-icons/hi2";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
// import BACKEND_URL from '../../../../../api/Api';
export default function LiveWebinar() {
    const navigate = useNavigate();
    const [click, setClick] = useState("Schedule");
    const [webinars, setWebinars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewData, setPreviewData] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [publishingId, setPublishingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [webinarToDelete, setWebinarToDelete] = useState(null);
    const [showOptions, setShowOptions] = useState(null);

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.options-dropdown') && !event.target.closest('.options-button')) {
                setShowOptions(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Publish function
    const handlePublish = async (id, currentStatus) => {
        setPublishingId(id);
        try {
            console.log("publishing webinar:", id, "status:", currentStatus);

            if (currentStatus !== "in-planning") {
                toast.error("Only 'in-planning' webinars can be published");
                setPublishingId(null);
                return;
            }

            if (!window.confirm("Are you sure you want to publish this webinar? once published, it will be visible to students.")) {
                setPublishingId(null);
                return;
            }

            const res = await axios.put(
                `http://localhost:5000/api/webinar/updateStatus/${id}`,
                { status: "schedule" },
            );
            console.log("✅ Publish response:", res.data);

            toast.success("Webinar Published Successfully!");

            if (res.data.success) {
                toast.success("Webinar Published Successfully!");
                fetchWebinars();
                setPreviewData(null);
            } else {
                toast.error(res.data.message || "Failed to publish webinar");
            }

        } catch (error) {
            console.error("❌ Publish error:", error);
            if (error.response) {
                toast.error(error.response.data?.message || `Failed to publish: ${error.response.status}`);
            } else if (error.request) {
                toast.error("Network error - Could not connect to server");
            } else {
                toast.error("Error: " + error.message);
            }
        } finally {
            setPublishingId(null);
        }
    };

    // Delete function
    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await axios.delete(`http://localhost:5000/api/webinar/delete/${id}`);

            if (res.data.success) {
                toast.success("Webinar deleted successfully");
                fetchWebinars();
                setPreviewData(null);
            } else {
                toast.error(res.data.message || "Failed to delete webinar");
            }
        } catch (error) {
            console.error("❌ Delete error:", error);
            toast.error(error.response?.data?.message || "Failed to delete webinar");
        } finally {
            setDeletingId(null);
            setShowDeleteConfirm(false);
            setWebinarToDelete(null);
            setShowOptions(null);
        }
    };

    // Confirm delete
    const confirmDelete = (id) => {
        setWebinarToDelete(id);
        setShowDeleteConfirm(true);
        setShowOptions(null);
    };

    // Fetch webinars
    const fetchWebinars = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/api/webinar/all`);

            if (res.data.success) {
                setWebinars(res.data.data || []);
                console.log("✅ Webinars loaded:", res.data.data?.length || 0, res.data);
                console.log("Webinars:", res.data.data.map(w => w.title));
            } else {
                toast.error(res.data.message || "Failed to load webinars");
                setWebinars([]);
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
            toast.error(error.response?.data?.message || "Failed to load webinars");
            setWebinars([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebinars();
    }, []);

    const scheduleList = webinars.filter(w => w.status === "schedule");
    const planningList = webinars.filter(w => w.status === "in-planning");
    const completedList = webinars.filter(w => w.status === "completed");
    const buttons = ["Schedule", "In Planning", "Completed"];

    return (
        <div className='p-4 md:p-10 bg-gray-50 pb-20 min-h-screen'>
            {/* Top-content */}
            <ToastContainer position="top-center" />
            <BackToDashboard />
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-5 gap-4 '>
                <h1 className='text-2xl md:text-4xl font-semibold'>Live Webinar Planning</h1>
                <Link
                    to={"/teacher/scheduleWebinar"}
                    className='bg-blue-500 text-white text-sm md:text-lg rounded-xl font-semibold hover:shadow-md p-2 md:p-3 whitespace-nowrap transition-shadow hover:bg-blue-600'
                >
                    <span className='text-lg md:text-xl pr-2 md:pr-5'>+</span> Schedule New Webinar
                </Link>
            </div>

            {/* Filter Buttons */}
            <div className="Filter-Buttons flex flex-wrap gap-2 sm:gap-4 mt-10 bg-gray-200 rounded-full w-fit px-1 sm:px-3 py-1">
                {buttons.map((btn, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setClick(btn);
                            setPreviewData(null);
                            setShowOptions(null);
                        }}
                        className={`btn rounded-full px-4 sm:px-6 py-1.5 text-sm sm:text-base font-medium transition-all duration-300 
                        ${click === btn
                                ? "bg-white shadow-md text-blue-600"
                                : "hover:bg-white hover:text-gray-800 text-gray-600"
                            }`}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600">Loading webinars...</span>
                </div>
            ) : (
                /* Tab Content */
                <div className="mt-6 space-y-5">
                    {/* Schedule Tab */}
                    {click === "Schedule" && (
                        scheduleList.length === 0 ? (
                            <div className='border border-gray-300 rounded-2xl bg-white p-8 md:p-15 text-center'>
                                <div className='flex justify-center text-9xl text-gray-600'><HiMiniVideoCameraSlash /></div>
                                <h1 className='font-semibold text-xl md:text-2xl mt-3'>No Scheduled Webinars</h1>
                                <p className='mt-3 text-gray-500'>Your scheduled webinars will appear here.</p>
                                <Link to={"/teacher/scheduleWebinar"} className='mt-5 inline-block bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-md hover:bg-blue-600 transition-all'>
                                    Schedule Your First Webinar
                                </Link>
                            </div>
                        ) : scheduleList.map((item, i) => (
                            <div key={i} className="hover:shadow-md transition-shadow">
                                <div className='border border-gray-300 rounded-2xl bg-white p-5 flex flex-col md:flex-row justify-between'>
                                    <div className="flex-1 cursor-pointer" onClick={() => setPreviewData(item)}>
                                        <h1 className='text-xl font-semibold text-gray-800'>{item.title || "No Title"}</h1>

                                        <div className='flex flex-col md:flex-row md:gap-20 text-gray-500 pt-4 gap-3'>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><CiCalendar /></span>
                                                startDate : {item.date || item.webinarSchedule?.startDate || "Date TBD"} / endDate : {item.webinarSchedule?.endDate || "Time TBD"}
                                            </p>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><MdAccessTime /></span>
                                                {item.duration || "1 hour"}
                                            </p>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><LuUsersRound /></span>
                                                {item.maxParticipants || "0"}/{item.limit || "100"} registered
                                            </p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className='h-2.5 w-full md:w-60 rounded-full bg-blue-100 mt-3'>
                                            <div
                                                className='bg-blue-500 h-2.5 rounded-full transition-all duration-500'
                                                style={{
                                                    width: item.registered && item.limit
                                                        ? `${(parseInt(item.registered) / parseInt(item.limit)) * 100}%`
                                                        : '0%'
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='flex gap-3 text-xl text-gray-600 mt-5 md:mt-3 items-center relative'>
                                        <span className='bg-green-500 rounded-full h-6 px-3 text-white text-sm flex items-center'>
                                            Scheduled
                                        </span>

                                        {/* Three dots menu */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowOptions(showOptions === item._id ? null : item._id);
                                                }}
                                                className="options-button border border-gray-300 w-10 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                title="More options"
                                            >
                                                <BsThreeDotsVertical />
                                            </button>

                                            {/* Dropdown menu */}
                                            {showOptions === item._id && (
                                                <div className="options-dropdown absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                    <button
                                                        onClick={async () => {
                                                            setEditingId(item._id);
                                                            try {
                                                                await axios.get(`http://localhost:5000/api/webinar/${item._id}`);
                                                                navigate(`/teacher/scheduleWebinar/${item._id}`);
                                                                setShowOptions(null);
                                                            } catch (error) {
                                                                toast.error("Cannot edit webinar");
                                                                setEditingId(null);
                                                            }
                                                        }}
                                                        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-blue-50 text-blue-600 rounded-t-lg transition-colors"
                                                    >
                                                        <FaRegEdit className="text-sm" />
                                                        <span className="text-sm">Edit Webinar</span>
                                                        {editingId === item._id && (
                                                            <div className="ml-auto animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-blue-500"></div>
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => confirmDelete(item._id)}
                                                        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-red-50 text-red-600 rounded-b-lg transition-colors"
                                                    >
                                                        <RiDeleteBin5Line className="text-sm" />
                                                        <span className="text-sm">Delete Webinar</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* In Planning Tab */}
                    {click === "In Planning" && (
                        planningList.length === 0 ? (
                            <div className='border border-gray-300 rounded-2xl bg-white p-8 md:p-15 text-center'>
                                <div className='flex justify-center text-9xl text-gray-600'><HiMiniVideoCameraSlash /></div>
                                <h1 className='font-semibold text-xl md:text-2xl mt-3'>No Webinars in Planning</h1>
                                <p className='mt-3 text-gray-500'>Your draft webinars will appear here.</p>
                            </div>
                        ) : planningList.map((item, i) => (
                            <div key={i} className="hover:shadow-md transition-shadow">
                                <div className='border border-gray-300 rounded-2xl bg-white p-5 flex flex-col md:flex-row justify-between'>
                                    <div className="flex-1 cursor-pointer" onClick={() => setPreviewData(item)}>
                                        <h1 className='text-xl font-semibold text-gray-800'>{item.title || "No Title"}</h1>

                                        <div className='flex flex-col md:flex-row md:gap-20 text-gray-500 pt-4 gap-3'>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><CiCalendar /></span>
                                                {item.date || "Date TBD"}
                                            </p>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><MdAccessTime /></span>
                                                {item.duration || "1 hour"}
                                            </p>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><LuUsersRound /></span>
                                                Max {item.limit || 100} participants
                                            </p>
                                        </div>

                                        {/* Description if available */}
                                        {item.description && (
                                            <p className="text-gray-600 mt-2 text-sm">
                                                {item.description.length > 100
                                                    ? `${item.description.substring(0, 100)}...`
                                                    : item.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className='flex flex-wrap gap-3 text-xl text-gray-600 mt-5 md:mt-3 items-center relative'>
                                        <span className='bg-yellow-500 rounded-full h-6 px-3 text-white text-sm flex items-center whitespace-nowrap'>
                                            Draft
                                        </span>

                                        {/* PUBLISH BUTTON */}
                                        <button
                                            className={`rounded-full h-8 px-4 text-white text-sm flex items-center whitespace-nowrap transition-colors ${publishingId === item._id
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-500'
                                                }`}
                                            onClick={() => handlePublish(item._id, item.status)}
                                            disabled={publishingId === item._id}
                                        >
                                            {publishingId === item._id ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white mr-2"></div>
                                                    Publishing...
                                                </>
                                            ) : (
                                                'Publish'
                                            )}
                                        </button>

                                        {/* Three dots menu */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowOptions(showOptions === item._id ? null : item._id);
                                                }}
                                                className="options-button border border-gray-300 w-10 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                title="More options"
                                            >
                                                <BsThreeDotsVertical />
                                            </button>

                                            {/* Dropdown menu */}
                                            {showOptions === item._id && (
                                                <div className="options-dropdown absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                    <button
                                                        onClick={async () => {
                                                            setEditingId(item._id);
                                                            try {
                                                                await axios.get(`http://localhost:5000/api/webinar/${item._id}`);
                                                                navigate(`/teacher/scheduleWebinar/${item._id}`);
                                                                setShowOptions(null);
                                                            } catch (error) {
                                                                toast.error("Cannot edit webinar");
                                                                setEditingId(null);
                                                            }
                                                        }}
                                                        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-blue-50 text-blue-600 rounded-t-lg transition-colors"
                                                    >
                                                        <FaRegEdit className="text-sm" />
                                                        <span className="text-sm">Edit Webinar</span>
                                                        {editingId === item._id && (
                                                            <div className="ml-auto animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-blue-500"></div>
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => confirmDelete(item._id)}
                                                        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-red-50 text-red-600 rounded-b-lg transition-colors"
                                                    >
                                                        <RiDeleteBin5Line className="text-sm" />
                                                        <span className="text-sm">Delete Webinar</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Completed Tab */}
                    {click === "Completed" && (
                        completedList.length === 0 ? (
                            <div className='border border-gray-300 rounded-2xl bg-white p-8 md:p-15 text-center'>
                                <div className='flex justify-center text-9xl text-gray-600'><HiMiniVideoCameraSlash /></div>
                                <h1 className='font-semibold text-xl md:text-2xl mt-3'>No Completed Webinars</h1>
                                <p className='mt-3 text-gray-500'>Your completed webinars and recordings will appear here.</p>
                            </div>
                        ) : completedList.map((item, i) => (
                            <div key={i} className="p-5">
                                <div className='border border-gray-300 rounded-2xl bg-white p-5 flex flex-col md:flex-row justify-between hover:shadow-md transition-shadow'>
                                    <div className="flex-1 cursor-pointer" onClick={() => setPreviewData(item)}>
                                        <h1 className='text-xl font-semibold text-gray-800'>{item.title}</h1>

                                        <div className='flex flex-col md:flex-row md:gap-20 text-gray-500 pt-4 gap-3'>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><CiCalendar /></span>
                                                {item.date || "Date not specified"}
                                            </p>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><MdAccessTime /></span>
                                                {item.duration || "Duration not specified"}
                                            </p>
                                            <p className='flex items-center gap-1'>
                                                <span className='text-lg'><LuUsersRound /></span>
                                                {item.registered || "0"}/{item.limit || item.maxParticipants || "0"} participants
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex gap-3 text-xl text-gray-600 mt-5 md:mt-3 items-center relative'>
                                        <span className='bg-blue-500 rounded-full h-6 px-3 text-white text-sm flex items-center whitespace-nowrap'>
                                            Completed
                                        </span>

                                        {/* Three dots menu */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowOptions(showOptions === item._id ? null : item._id);
                                                }}
                                                className="options-button border border-gray-300 w-10 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                title="More options"
                                            >
                                                <BsThreeDotsVertical />
                                            </button>

                                            {/* Dropdown menu */}
                                            {showOptions === item._id && (
                                                <div className="options-dropdown absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                    <button
                                                        onClick={() => confirmDelete(item._id)}
                                                        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                    >
                                                        <LuTrash className="text-sm" />
                                                        <span className="text-sm">Delete Webinar</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setWebinarToDelete(null);
                                }}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this webinar? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setWebinarToDelete(null);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(webinarToDelete)}
                                disabled={deletingId === webinarToDelete}
                                className={`px-4 py-2 rounded-lg text-white transition-colors ${deletingId === webinarToDelete
                                    ? 'bg-red-400 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                {deletingId === webinarToDelete ? (
                                    <>
                                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    'Yes, Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {/* {previewData && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{previewData.title}</h2>
                            <button
                                onClick={() => setPreviewData(null)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">{previewData.description || "No description available"}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <CiCalendar className="text-blue-600" />
                                <span className="font-medium">Date:</span>
                                <span>{previewData.date || "Not specified"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdAccessTime className="text-blue-600" />
                                <span className="font-medium">Duration:</span>
                                <span>{previewData.duration || "Not specified"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LuUsersRound className="text-blue-600" />
                                <span className="font-medium">Participants:</span>
                                <span>{previewData.registered || "0"}/{previewData.limit || previewData.maxParticipants || "100"}</span>
                            </div>
                            {previewData.category && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Category:</span>
                                    <span>{previewData.category}</span>
                                </div>
                            )}
                            {previewData.level && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Level:</span>
                                    <span>{previewData.level}</span>
                                </div>
                            )}
                        </div>

                       
                        {previewData.registered && previewData.limit && (
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Registration Progress</span>
                                    <span>{((parseInt(previewData.registered) / parseInt(previewData.limit)) * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-blue-100">
                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{
                                            width: `${(parseInt(previewData.registered) / parseInt(previewData.limit)) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}

                     
                        {previewData.tags && previewData.tags.length > 0 && (
                            <div className="mb-4">
                                <span className="font-medium mr-2">Tags:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {Array.isArray(previewData.tags)
                                        ? previewData.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                                                {tag}
                                            </span>
                                        ))
                                        : <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                                            {previewData.tags}
                                        </span>
                                    }
                                </div>
                            </div>
                        )}

                    
                        {previewData.webinarSchedule && (
                            <div className="mb-4 p-3 bg-gray-50 rounded">
                                <h3 className="font-semibold mb-2">Schedule Details</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="font-medium">Start:</span> {previewData.webinarSchedule.startDate} {previewData.webinarSchedule.startTime}
                                    </div>
                                    <div>
                                        <span className="font-medium">End:</span> {previewData.webinarSchedule.endDate} {previewData.webinarSchedule.endTime}
                                    </div>
                                </div>
                                {previewData.webinarSchedule.sessions && previewData.webinarSchedule.sessions.length > 0 && (
                                    <div className="mt-2">
                                        <span className="font-medium">Total Sessions:</span> {previewData.webinarSchedule.sessions.length}
                                    </div>
                                )}
                            </div>
                        )}

                  
                        <div className="mb-4">
                            <span className="font-medium mr-2">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-sm text-white ${previewData.status === 'schedule' ? 'bg-green-500' :
                                previewData.status === 'in-planning' ? 'bg-yellow-500' :
                                    'bg-blue-500'
                                }`}>
                                {previewData.status === 'schedule' ? 'Scheduled' :
                                    previewData.status === 'in-planning' ? 'In Planning' :
                                        'Completed'}
                            </span>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            {previewData.status === 'in-planning' && (
                                <>
                                    <button
                                        onClick={() => {
                                            navigate(`/teacher/scheduleWebinar/${previewData._id}`);
                                            setPreviewData(null);
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Edit Webinar
                                    </button>
                                    <button
                                        onClick={() => {
                                            handlePublish(previewData._id, previewData.status);
                                            setPreviewData(null);
                                        }}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Publish
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )} */}
            {/* Preview Modal */}
            {previewData && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{previewData.title}</h2>
                            <button
                                onClick={() => setPreviewData(null)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">{previewData.description || "No description available"}</p>
                        </div>

                        {/* Basic Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <CiCalendar className="text-blue-600" />
                                <span className="font-medium">Date:</span>
                                <span>{previewData.date || previewData.webinarSchedule?.startDate || "Not specified"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdAccessTime className="text-blue-600" />
                                <span className="font-medium">Duration:</span>
                                <span>{previewData.duration || "Not specified"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LuUsersRound className="text-blue-600" />
                                <span className="font-medium">Participants:</span>
                                <span>{previewData.registered || previewData.maxParticipants || "0"}/{previewData.limit || previewData.maxParticipants || "100"}</span>
                            </div>
                            {previewData.category && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Category:</span>
                                    <span className="capitalize">{previewData.category}</span>
                                </div>
                            )}
                            {previewData.level && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Level:</span>
                                    <span className="capitalize">{previewData.level}</span>
                                </div>
                            )}
                            {previewData.timezone && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Timezone:</span>
                                    <span>{previewData.timezone}</span>
                                </div>
                            )}
                        </div>

                        {/* Registration Deadline */}
                        {previewData.registrationDeadline && (
                            <div className="mb-4">
                                <span className="font-medium">Registration Deadline: </span>
                                <span>{previewData.registrationDeadline}</span>
                            </div>
                        )}

                        {/* Progress Bar in Preview */}
                        {previewData.registered && previewData.maxParticipants && (
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Registration Progress</span>
                                    <span>{((parseInt(previewData.registered) / parseInt(previewData.maxParticipants)) * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-blue-100">
                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{
                                            width: `${(parseInt(previewData.registered) / parseInt(previewData.maxParticipants)) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Tags if available */}
                        {previewData.tags && previewData.tags.length > 0 && (
                            <div className="mb-4">
                                <span className="font-medium mr-2">Tags:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {Array.isArray(previewData.tags)
                                        ? previewData.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                                                {tag}
                                            </span>
                                        ))
                                        : <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                                            {previewData.tags}
                                        </span>
                                    }
                                </div>
                            </div>
                        )}

                        {/* Agenda Section */}
                        {previewData.agenda && previewData.agenda.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2 text-lg">Agenda</h3>
                                <div className="space-y-2">
                                    {previewData.agenda.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                                            <div className="min-w-24">
                                                <span className="font-medium">Session {index + 1}:</span>
                                                <div className="text-sm text-gray-600">{item.date}</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{item.topic}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Streaming Details Section */}
                        {previewData.ivs && (
                            <div className="mb-4 border-t pt-4">
                                <h3 className="font-semibold mb-3 text-lg">Streaming Details</h3>
                                <div className="space-y-3">
                                    {/* Playback URL */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium">Playback URL:</span>
                                            <button
                                                onClick={() => {
                                                    if (!previewData.ivs?.playbackUrl) {
                                                        toast.error("Playback URLnot available");
                                                        return;
                                                    }
                                                    const fullIngestUrl = `${previewData.ivs.playbackUrl}`;
                                                    navigator.clipboard.writeText(fullIngestUrl);
                                                    toast.success("✅ Playback URL copied to clipboard!");
                                                }}
                                                
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                                </svg>
                                                Copy
                                            </button>
                                        </div>
                                        <div className="p-2 bg-gray-100 rounded text-sm font-mono break-all">
                                            {previewData.ivs.playbackUrl}
                                        </div>
                                    </div>

                                    {/* Ingest Endpoint */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium">Ingest Endpoint:</span>
                                            <button
                                                onClick={() => {
                                                    if (!previewData.ivs?.ingestEndpoint) {
                                                        toast.error("Ingest endpoint not available");
                                                        return;
                                                    }
                                                    const fullIngestUrl = `rtmps://${previewData.ivs.ingestEndpoint}:443/app/`;
                                                    navigator.clipboard.writeText(fullIngestUrl);
                                                    toast.success("✅ Ingest endpoint copied to clipboard!");
                                                }}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                                </svg>
                                                Copy
                                            </button>
                                        </div>
                                        <div className="p-2 bg-gray-100 rounded text-sm font-mono break-all">
                                            rtmps://{previewData.ivs.ingestEndpoint}:443/app/
                                        </div>
                                    </div>

                                    {/* Stream Key */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium">Stream Key:</span>
                                            <button
                                                  onClick={() => {
                                                    if (!previewData.ivs?.streamKey) {
                                                        toast.error("Stream Key not available");
                                                        return;
                                                    }
                                                    const fullIngestUrl = `${previewData.ivs.streamKey}`;
                                                    navigator.clipboard.writeText(fullIngestUrl);
                                                    toast.success("✅ Stream Key copied to clipboard!");
                                                }}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                                </svg>
                                                Copy
                                            </button>
                                        </div>
                                        <div className="p-2 bg-gray-100 rounded text-sm font-mono break-all">
                                            {previewData.ivs.streamKey}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Keep this key secure! Don't share it publicly.</p>
                                    </div>

                                    {/* Channel ARN */}
                                    {/* {previewData.ivs.channelArn && (
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">Channel ARN:</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(previewData.ivs.channelArn);
                                            toast.success("Channel ARN copied to clipboard!");
                                        }}
                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                                <div className="p-2 bg-gray-100 rounded text-sm font-mono break-all">
                                    {previewData.ivs.channelArn}
                                </div>
                            </div>
                        )} */}
                                </div>
                            </div>
                        )}

                        {/* Webinar Schedule Sessions */}
                        {previewData.webinarSchedule?.sessions && previewData.webinarSchedule.sessions.length > 0 && (
                            <div className="mb-4 border-t pt-4">
                                <h3 className="font-semibold mb-2 text-lg">Scheduled Sessions</h3>
                                <div className="space-y-2">
                                    {previewData.webinarSchedule.sessions.map((session, index) => (
                                        <div key={index} className="p-3 bg-gray-50 rounded">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium">Session {index + 1}: {session.topic}</div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {new Date(session.startDateTime).toLocaleDateString()}
                                                        {' '}
                                                        {new Date(session.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        {' - '}
                                                        {new Date(session.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs ${session.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                    session.status === 'live' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                    {session.status}
                                                </span>
                                            </div>
                                            {session.recordingUrl && (
                                                <div className="mt-2">
                                                    <a
                                                        href={session.recordingUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        View Recording
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Settings Section */}
                        {/* <div className="mb-4 border-t pt-4">
                <h3 className="font-semibold mb-2 text-lg">Webinar Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${previewData.recordSession ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">Record Session</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${previewData.enableQA ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">Q&A Enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${previewData.enableChat ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">Chat Enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${previewData.enablePolls ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">Polls Enabled</span>
                    </div>
                </div>
            </div> */}

                        {/* Status Badge */}
                        <div className="mb-4">
                            <span className="font-medium mr-2">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-sm text-white ${previewData.status === 'schedule' ? 'bg-green-500' :
                                previewData.status === 'in-planning' ? 'bg-yellow-500' :
                                    'bg-blue-500'
                                }`}>
                                {previewData.status === 'schedule' ? 'Scheduled' :
                                    previewData.status === 'in-planning' ? 'In Planning' :
                                        'Completed'}
                            </span>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            {previewData.status === 'in-planning' && (
                                <>
                                    <button
                                        onClick={() => {
                                            navigate(`/teacher/scheduleWebinar/${previewData._id}`);
                                            setPreviewData(null);
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Edit Webinar
                                    </button>
                                    <button
                                        onClick={() => {
                                            handlePublish(previewData._id, previewData.status);
                                            setPreviewData(null);
                                        }}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Publish
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}