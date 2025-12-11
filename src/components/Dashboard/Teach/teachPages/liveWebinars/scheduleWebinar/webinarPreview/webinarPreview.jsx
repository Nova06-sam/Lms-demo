// // webinarPreview.jsx
// import React, { useState } from "react";
// import { FiPlus, FiTrash2 } from "react-icons/fi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Calendar, Clock, Video, Users, Send } from "lucide-react";
// import { FaCalendarAlt, FaClock, FaVideo, FaUsers, FaSave, FaPlay, FaArrowLeft } from "react-icons/fa";
// import { MdCategory, MdSchool, MdLocalOffer, MdVideocam, MdQuestionAnswer, MdChat, MdPoll, MdEmail, MdAccessTime, MdSchedule } from "react-icons/md";
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// export default function PreviePublish({ formData, setFormData, prevStep }) {

//     const { id } = useParams();
//     const [session, setSession] = useState(null);
//     console.log("Preview formData:", formData);
//     const navigate = useNavigate();

//     const webinarData = {
//         title: formData.title || "Webinar Title",
//         description: formData.description || "Webinar description will appear here...",
//         // date: formData.date || "Date TBD",
//         // time: formData.time || "Time TBD",
//         duration: formData.duration || "Duration not set",
//         participants: formData.maxParticipants ? `Max ${formData.maxParticipants}` : "Max participants not set",
//         category: formData.category || "Category not set",
//         level: formData.level || "Beginner",
//         tags: formData.tags || "No tags",
//     };


//     const buildPayload = (overrides = {}) => {
//         // Convert thumbnail File -> string placeholder (until upload is implemented)
//         const thumbnailPayload =
//             formData.thumbnail && typeof formData.thumbnail === "object" && formData.thumbnail.name
//                 ? "" // if you implement upload: upload file and replace this with returned URL
//                 : typeof formData.thumbnail === "string"
//                     ? formData.thumbnail
//                     : "";

//         // Agenda should already be normalized by Content component to { time: "YYYY-MM-DD", topic }
//         const agendaPayload = Array.isArray(formData.agenda) ? formData.agenda : [];

//         return {
//             title: formData.title,
//             description: formData.description,
//             category: formData.category,
//             level: formData.level,
//             tags: formData.tags, // controller accepts string and will split
//             thumbnail: thumbnailPayload,
//             startDate: formData.startDate,
//             endDate: formData.endDate,
//             startTime: formData.startTime,
//             endTime: formData.endTime,
//             duration: formData.duration,
//             maxParticipants: formData.maxParticipants,
//             timezone: formData.timezone,
//             registrationDeadline: formData.registrationDeadline,
//             presentationFile: null,
//             videoUrl: formData.videoUrl || "",
//             resources: Array.isArray(formData.resources) ? formData.resources : null,
//             agenda: agendaPayload,
//             recordSession: !!formData.recordSession,
//             confirmationEmail: !!formData.confirmationEmail,
//             reminder24: !!formData.reminder24,
//             reminder15: !!formData.reminder15,
//             enableQA: !!formData.enableQA,
//             enableChat: !!formData.enableChat,
//             enablePolls: !!formData.enablePolls,
//             status: "schedule",
//             ...overrides
//         };
//     };

//     const handleSaveDraft = async () => {
//         try {
//             if (id) {
//                 // UPDATE draft
//                 const res = await axios.put(`http://localhost:5000/api/webinar/update/${id}`, buildPayload({ status: "in-planning" }));
//                 toast.success("Draft updated!");
//                 console.log("Draft updated:", res.data);
//                 navigate("/teacher/livewebinar");
//             } else {
//                 // CREATE draft
//                 const res = await axios.post("http://localhost:5000/api/webinar/create", buildPayload({ status: "in-planning" }), { headers: { "Content-Type": "application/json" } });
//                 toast.success("Draft saved!");
//                 console.log("Draft saved:", res.data);
//                 navigate("/teacher/livewebinar");
//             }
//         } catch (error) {
//             // If backend returned helpful JSON, show it
//             console.error("Save draft error:", error.response?.data || error.message || error);
//             toast.error("Failed to save draft");
//         }
//     };

//     // const handleSchedule = async () => {
//     //     try {

//     //         // const recRes = await axios.post("http://localhost:5000/api/live/recording/create");
//     //         // const recordingConfigurationArn = recRes.data.recordingConfigurationArn;

//     //         const res = await axios.post("http://localhost:5000/api/live/create", {
//     //             title: formData.title
//     //             // recordingConfigurationArn: recordingConfigurationArn
//     //         });
//     //         const created = res.data;
//     //         setSession(created);
//     //         console.log("created Webinar", created)
//     //         toast.success("Webinar Scheduled!");


//     //         if (!created._id) {
//     //             console.error("Backend did not return _id:", created);
//     //             toast.error("Backend missing webinar ID!");
//     //             return;
//     //         }

//     //         // attach IVS static config (reads from .env on backend)
//     //         // const attachedRes = await axios.post("http://localhost:5000/api/live/attach", { webinarId: createdWebinar._id },
//     //         //     { headers: { "Content-Type": "application/json" } }
//     //         // );

//     //         // toast.success("Webinar scheduled and IVS attached");
//     //         // console.log("Created webinar:", attachedRes);

//     //     } catch (err) {
//     //         console.error("Schedule error:", err.response?.data || err.message);
//     //         toast.error("Error scheduling webinar");
//     //     }
//     // };

//     const handleSchedule = async () => {
//         try {
//             const payload = {
//                 // Step 1: Basic Info
//                 title: formData.title,
//                 description: formData.description,
//                 category: formData.category,
//                 level: formData.level,
//                 tags: formData.tags,

//                 // Step 2: Schedule
//                 startDate: formData.startDate,
//                 endDate: formData.endDate,
//                 startTime: formData.startTime,
//                 endTime: formData.endTime,
//                 duration: formData.duration,
//                 timezone: formData.timezone,
//                 registrationDeadline: formData.registrationDeadline,
//                 maxParticipants: formData.maxParticipants,

//                 // Step 3: Content / Agenda
//                 agenda: formData.agenda,

//                 // Step 4: Settings
//                 recordSession: formData.recordSession || false,
//                 confirmationEmail: formData.confirmationEmail || false,
//                 reminder24: formData.reminder24 || false,
//                 reminder15: formData.reminder15 || false,
//                 enableQA: formData.enableQA || false,
//                 enableChat: formData.enableChat || false,
//                 enablePolls: formData.enablePolls || false,

//                 // Thumbnail: IGNORE for now
//                 thumbnail: "",

//                 status: "schedule"
//             };

//             const res = await axios.post(
//                 "http://localhost:5000/api/webinar/create",
//                 payload,
//                 { headers: { "Content-Type": "application/json" } }
//             );
//             setSession(res.data);
//             console.log("Webinar created:", res.data);
//             toast.success("Webinar scheduled successfully!");
//             navigate("/teacher/livewebinar");

//         } catch (err) {
//             console.error("Schedule error:", err.response?.data || err.message);
//             toast.error("Failed to schedule webinar");
//         }
//     };

//     console.log("Webinar webinarSchedule:", session?.data?.webinarSchedule.sessions);

//     const endLive = () => {
//         axios.post("http://localhost:5000/api/live/end", {
//             sessionId: session._id,
//             channelId: session.channelArn.split("/").pop()
//         });
//     };

//     const handlePrevious = () => {
//         prevStep();
//     };

//     return (
//         <div className="grid md:grid-cols-3 gap-8">
//             <ToastContainer />
//             {/* Left: Form */}
//             <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm space-y-6">
//                 {/* Header */}
//                 <div>
//                     <h2 className="text-2xl font-semibold text-gray-800">Preview & Publish</h2>
//                     <p className="text-gray-500 text-sm">Review your webinar before scheduling</p>
//                 </div>

//                 {/* Webinar Info Card (unchanged) */}
//                 <div className="data-box">
//                     <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-200">
//                         <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{webinarData.title}</h3>
//                         <p className="text-gray-500 text-sm sm:text-base mt-1">{webinarData.description}</p>
//                         <div className="flex flex-wrap items-center gap-4 mt-4 text-sm sm:text-base text-gray-600">
//                             <div className="flex items-center gap-2">
//                                 <FaCalendarAlt className="w-4 h-4 text-blue-600" />
//                                 <span>{formData.startDate || "Date TBD"}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <FaClock className="w-4 h-4 text-blue-600" />
//                                 <span>{formData.startTime || "Time TBD"}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <FaVideo className="w-4 h-4 text-blue-600" />
//                                 <span>{webinarData.duration}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <FaUsers className="w-4 h-4 text-blue-600" />
//                                 <span>{webinarData.participants}</span>
//                             </div>
//                         </div>

//                         <div className="mt-4 pt-4 border-t border-gray-200">
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                                 <div className="flex items-center">
//                                     <MdCategory className="w-4 h-4 text-gray-500 mr-2" />
//                                     <span className="font-medium text-gray-700">Category:</span>
//                                     <span className="ml-2 text-gray-600">{webinarData.category}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <MdSchool className="w-4 h-4 text-gray-500 mr-2" />
//                                     <span className="font-medium text-gray-700">Level:</span>
//                                     <span className="ml-2 text-gray-600">{webinarData.level}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <MdLocalOffer className="w-4 h-4 text-gray-500 mr-2" />
//                                     <span className="font-medium text-gray-700">Tags:</span>
//                                     <span className="ml-2 text-gray-600">{webinarData.tags}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <MdVideocam className="w-4 h-4 text-gray-500 mr-2" />
//                                     <span className="font-medium text-gray-700">Recording:</span>
//                                     <span className="ml-2 text-gray-600">{formData.recordSession ? "Enabled" : "Disabled"}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Settings Summary */}
//                         <div className="mt-4 pt-4 border-t border-gray-200">
//                             <h4 className="font-medium text-gray-700 mb-2 flex items-center">
//                                 <MdSchedule className="w-4 h-4 mr-2" />
//                                 Settings Summary:
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                                 {formData.enableQA && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1"><MdQuestionAnswer className="w-3 h-3" />Q&A</span>}
//                                 {formData.enableChat && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1"><MdChat className="w-3 h-3" />Chat</span>}
//                                 {formData.enablePolls && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1"><MdPoll className="w-3 h-3" />Polls</span>}
//                                 {formData.confirmationEmail && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center gap-1"><MdEmail className="w-3 h-3" />Confirmation Email</span>}
//                                 {formData.reminder24 && <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded flex items-center gap-1"><MdAccessTime className="w-3 h-3" />24h Reminder</span>}
//                                 {formData.reminder15 && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center gap-1"><MdAccessTime className="w-3 h-3" />15min Reminder</span>}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex flex-col sm:flex-row justify-end sm:justify-between items-center gap-3 pt-4 border-t border-gray-200">
//                         <button onClick={handlePrevious} className="w-full sm:w-auto border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
//                             <FaArrowLeft className="w-4 h-4" /> Previous
//                         </button>

//                         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                             <button onClick={handleSaveDraft} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-all">
//                                 <FaSave className="w-4 h-4 text-gray-600" /> Save as Draft
//                             </button>

//                             <button onClick={handleSchedule} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm">
//                                 <FaPlay className="w-4 h-4 text-white" /> Schedule Webinar
//                             </button>
//                         </div>
//                     </div>
//                     {/* {session && (
//                         <div style={{ marginTop: 20, padding: 20, color: "#000000ff" }}>
//                             <h3>OBS Details:---</h3>
//                             <p><b>Ingest Endpoint:</b> rtmps://{session?.data?.ivs.ingestEndpoint}:443/app/</p>
//                             <p><b>Stream Key:</b> {session?.data?.ivs.streamKey}</p>
//                         </div>
//                     )} */}

//                     {session && (
//                         <div style={{ marginTop: 20, padding: 20, color: "#000000ff" }}>
//                             <h3>OBS Details:---</h3>
//                             <p><b>Ingest Endpoint:</b> rtmps://{session?.data?.ivs.ingestEndpoint}:443/app/</p>
//                             <p><b>Stream Key:</b> {session?.data?.ivs.streamKey}</p>

//                             <h3 style={{ marginTop: 20 }}>Webinar Sessions:</h3>

//                             {session?.data?.webinarSchedule?.sessions &&
//                                 session.data.webinarSchedule.sessions.map((item, index) => (
//                                     <div key={index}
//                                         style={{
//                                             marginTop: 10,
//                                             padding: 10,
//                                             borderRadius: 8,
//                                             background: "#f5f5f5"
//                                         }}>
//                                         <p><b>Session {index + 1}</b></p>
//                                         <p><b>startDateTime:</b> {item.startDateTime}</p>
//                                         <p><b>endDateTime:</b> {item.endDateTime}</p>
//                                         <p><b>Topic:</b> {item.topic}</p>
//                                         <p><b>Status:</b> {item.status}</p>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     )}

//                 </div>
//                 <div>
//                     <button onClick={endLive} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm">End Stream</button>
//                 </div>
//             </div>

//             {/* Right: Quick Tips & Checklist (unchanged) */}
//             <div className="space-y-6">
//                 <div className="bg-white p-5 rounded-2xl shadow-sm">
//                     <h4 className="font-semibold mb-3">Quick Tips</h4>
//                     <ul className="text-sm text-gray-600 space-y-2">
//                         <li><strong>Title:</strong> Keep it short and clear.</li>
//                         <li><strong>Timing:</strong> 1–2 hours is ideal for engagement.</li>
//                         <li><strong>Capacity:</strong> Start small for better interaction.</li>
//                     </ul>
//                 </div>

//                 <div className="bg-white p-5 rounded-2xl shadow-sm">
//                     <h4 className="font-semibold mb-3">Webinar Checklist</h4>
//                     <ul className="text-sm text-gray-600 space-y-2">
//                         {["Title and description complete", "Date and time scheduled", "Agenda prepared", "Materials ready", "Test equipment"].map((item, i) => (
//                             <li key={i} className="flex items-center gap-2">
//                                 <input type="checkbox" className="w-3 h-3 bg-gray-300 rounded-sm" />
//                                 {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div >
//     );
// }



import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCalendarAlt, FaClock, FaVideo, FaUsers, FaSave, FaPlay, FaArrowLeft } from "react-icons/fa";
import { MdCategory, MdSchool, MdLocalOffer, MdVideocam, MdQuestionAnswer, MdChat, MdPoll, MdEmail, MdAccessTime, MdSchedule } from "react-icons/md";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
// import BACKEND_URL from "../../../../../../../api/Api";

export default function PreviePublish({ formData, setFormData, prevStep }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [draftLoading, setDraftLoading] = useState(false);

    console.log("Preview formData:", formData);

    const webinarData = {
        title: formData.title || "Webinar Title",
        description: formData.description || "Webinar description will appear here...",
        duration: formData.duration || "Duration not set",
        participants: formData.maxParticipants ? `Max ${formData.maxParticipants}` : "Max participants not set",
        category: formData.category || "Category not set",
        level: formData.level || "Beginner",
        tags: formData.tags || "No tags",
    };

    const buildPayload = (overrides = {}) => {
        const thumbnailPayload =
            formData.thumbnail && typeof formData.thumbnail === "object" && formData.thumbnail.name
                ? ""
                : typeof formData.thumbnail === "string"
                    ? formData.thumbnail
                    : "";

        const agendaPayload = Array.isArray(formData.agenda) ? formData.agenda : [];

        return {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            level: formData.level,
            tags: formData.tags,
            thumbnail: thumbnailPayload,
            startDate: formData.startDate,
            endDate: formData.endDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            duration: formData.duration,
            maxParticipants: formData.maxParticipants,
            timezone: formData.timezone,
            registrationDeadline: formData.registrationDeadline,
            presentationFile: null,
            videoUrl: formData.videoUrl || "",
            resources: Array.isArray(formData.resources) ? formData.resources : null,
            agenda: agendaPayload,
            recordSession: !!formData.recordSession,
            confirmationEmail: !!formData.confirmationEmail,
            reminder24: !!formData.reminder24,
            reminder15: !!formData.reminder15,
            enableQA: !!formData.enableQA,
            enableChat: !!formData.enableChat,
            enablePolls: !!formData.enablePolls,
            status: "schedule",
            ...overrides
        };
    };

    const handleSaveDraft = async () => {
        setDraftLoading(true);
        try {
            const payload = buildPayload({ status: "in-planning" });
            
            if (id) {
                // UPDATE draft
                const res = await axios.put(`http://localhost:5000/api/webinar/update/${id}`, payload);
                toast.success("✅ Draft updated successfully!");
                console.log("Draft updated:", res.data);
                navigate("/teacher/livewebinar");
            } else {
                // CREATE draft
                const res = await axios.post(`http://localhost:5000/api/webinar/create`, payload, { 
                    headers: { "Content-Type": "application/json" } 
                });
                toast.success("✅ Draft saved successfully!");
                console.log("Draft saved:", res.data);
                navigate("/teacher/livewebinar");
            }
        } catch (error) {
            console.error("Save draft error:", error.response?.data || error.message || error);
            toast.error("❌ Failed to save draft. Please try again.");
        } finally {
            setDraftLoading(false);
        }
    };

    const handleSchedule = async () => {
        setLoading(true);
        try {
            const payload = buildPayload({ status: "schedule" });
            
            const res = await axios.post(
                `http://localhost:5000/api/webinar/create`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );
            
            setSession(res.data);
            console.log("Webinar created:", res.data);
            toast.success("🎉 Webinar scheduled successfully!");
            navigate("/teacher/livewebinar");
            
        } catch (err) {
            console.error("Schedule error:", err.response?.data || err.message);
            toast.error("❌ Failed to schedule webinar. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        prevStep();
    };

    const endLive = () => {
        if (session?._id && session?.channelArn) {
            axios.post(`http://localhost:5000/api/live/end`, {
                sessionId: session._id,
                channelId: session.channelArn.split("/").pop()
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white w-full max-w-6xl rounded-2xl shadow-md p-6">
                <ToastContainer position="top-right" />
                
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Preview & Publish</h2>
                    <p className="text-gray-500 text-sm">Review your webinar before scheduling</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left: Preview Card */}
                    <div className="md:col-span-2">
                        <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{webinarData.title}</h3>
                            <p className="text-gray-500 text-base mb-4">{webinarData.description}</p>

                            {/* Details Row */}
                            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                                    <span>{formData.startDate || "Date TBD"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="w-4 h-4 text-blue-600" />
                                    <span>{formData.startTime || "Time TBD"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaVideo className="w-4 h-4 text-blue-600" />
                                    <span>{webinarData.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUsers className="w-4 h-4 text-blue-600" />
                                    <span>{webinarData.participants}</span>
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center">
                                        <MdCategory className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="font-medium text-gray-700">Category:</span>
                                        <span className="ml-2 text-gray-600">{webinarData.category}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MdSchool className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="font-medium text-gray-700">Level:</span>
                                        <span className="ml-2 text-gray-600">{webinarData.level}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MdLocalOffer className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="font-medium text-gray-700">Tags:</span>
                                        <span className="ml-2 text-gray-600">{webinarData.tags}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MdVideocam className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="font-medium text-gray-700">Recording:</span>
                                        <span className="ml-2 text-gray-600">{formData.recordSession ? "Enabled" : "Disabled"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Summary */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                                    <MdSchedule className="w-4 h-4 mr-2" />
                                    Settings Summary:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {formData.enableQA && (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                            <MdQuestionAnswer className="w-3 h-3" />
                                            Q&A
                                        </span>
                                    )}
                                    {formData.enableChat && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                            <MdChat className="w-3 h-3" />
                                            Chat
                                        </span>
                                    )}
                                    {formData.enablePolls && (
                                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                            <MdPoll className="w-3 h-3" />
                                            Polls
                                        </span>
                                    )}
                                    {formData.confirmationEmail && (
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                            <MdEmail className="w-3 h-3" />
                                            Confirmation Email
                                        </span>
                                    )}
                                    {formData.reminder24 && (
                                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                            <MdAccessTime className="w-3 h-3" />
                                            24h Reminder
                                        </span>
                                    )}
                                    {formData.reminder15 && (
                                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                            <MdAccessTime className="w-3 h-3" />
                                            15min Reminder
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Session Details */}
                        {session && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <h4 className="text-lg font-semibold text-blue-800 mb-3">🎉 Webinar Scheduled Successfully!</h4>
                                
                                <div className="mb-4 p-3 bg-white rounded-lg border">
                                    <h5 className="font-medium text-gray-700 mb-2">OBS Streaming Details:</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-600 w-40">Ingest Endpoint:</span>
                                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">
                                                rtmps://{session?.data?.ivs?.ingestEndpoint}:443/app/
                                            </code>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-600 w-40">Stream Key:</span>
                                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">
                                                {session?.data?.ivs?.streamKey}
                                            </code>
                                        </div>
                                    </div>
                                </div>

                                {session?.data?.webinarSchedule?.sessions && (
                                    <div className="p-3 bg-white rounded-lg border">
                                        <h5 className="font-medium text-gray-700 mb-2">Webinar Sessions:</h5>
                                        <div className="space-y-3">
                                            {session.data.webinarSchedule.sessions.map((item, index) => (
                                                <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                                                    <div className="flex justify-between items-start">
                                                        <h6 className="font-medium text-gray-800">Session {index + 1}: {item.topic}</h6>
                                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                                            item.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                                                            item.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                                                        <div>
                                                            <span className="font-medium">Start:</span> {item.startDateTime}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">End:</span> {item.endDateTime}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* End Stream Button */}
                                <div className="mt-4 pt-4 border-t border-blue-200">
                                    <button 
                                        onClick={endLive}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm"
                                    >
                                        End Stream
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 mt-6 border-t border-gray-200">
                            <button
                                onClick={handlePrevious}
                                className="w-full sm:w-auto border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                            >
                                <FaArrowLeft className="w-4 h-4" />
                                Previous
                            </button>

                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleSaveDraft}
                                    disabled={draftLoading}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {draftLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave className="w-4 h-4 text-gray-600" />
                                            Save as Draft
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleSchedule}
                                    disabled={loading}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Scheduling...
                                        </>
                                    ) : (
                                        <>
                                            <FaPlay className="w-4 h-4 text-white" />
                                            Schedule Webinar
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Tips & Checklist */}
                    <div className="space-y-6">
                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-3">Quick Tips</h4>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span><strong>Title:</strong> Keep it short and clear.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span><strong>Timing:</strong> 1–2 hours is ideal for engagement.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span><strong>Capacity:</strong> Start small for better interaction.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-3">Webinar Checklist</h4>
                            <ul className="text-sm text-gray-600 space-y-2">
                                {["Title and description complete", "Date and time scheduled", "Agenda prepared", "Materials ready", "Test equipment"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                            <h4 className="font-semibold text-blue-800 mb-3">Webinar Stats</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-medium">{formData.duration || "Not set"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Max Participants:</span>
                                    <span className="font-medium">{formData.maxParticipants || "Unlimited"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Recording:</span>
                                    <span className="font-medium">{formData.recordSession ? "✅ Yes" : "❌ No"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}