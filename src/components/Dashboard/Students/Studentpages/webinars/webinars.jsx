// import React, { useState, useEffect } from "react";
// import { FiClock, FiUsers, FiCalendar } from "react-icons/fi";
// import Code from '../../../../../assets/code.jpg';
// import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
// import { FaFilter } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import LivePlayer from './LivePlayer';
// import { Link } from "react-router-dom";
// import WatchRecordedVideo from "./webvideoplayer/WatchRecordedVideo";

// // ✅ Main component
// export default function Webinars() {

//     const [playbackUrl, setPlaybackUrl] = useState("");
//     const [webinars, setWebinars] = useState([]);
//     const [recordedVideo, setRecordedVideo] = useState("");
//     const [singleRecordedVideo, setSingleRecordedVideo] = useState(null);

//     const navigate = useNavigate();



//     const latestLive = async () => {
//         const res = await axios.get("http://localhost:5000/api/live/latest");
//         const url = setPlaybackUrl(res.data.playbackUrl);
//         // navigate("/student/live", {
//         //     state: { video: res.data }
//         // })
//         console.log("live video link", url);
//     };
//     // load();
//     useEffect(() => {
//         const allRecordedVideo = async () => {
//             const res = await axios.get("http://localhost:5000/api/live/recorded/all/video");
//             setRecordedVideo(res.data);
//             console.log("recorded Video", res.data);
//         }
//         allRecordedVideo();
//         fetchWebinars();
//     }, []);

//     const oneRecordedVideo = async (id) => {
//         const res = await axios.get(`http://localhost:5000/api/live/recorded/video/${id}`);
//         setSingleRecordedVideo(res.data);
//         console.log("singleRecordedVideo", res.data);
//         navigate("/student/webinar/recordedVideo", {
//             state: { video: res.data }
//         });
//     }

//     if (!playbackUrl) {
//         console.log("No Live Session Available");
//     }

//     // const fetchWebinars = async () => {
//     //     try {
//     //         const res = await axios.get("http://localhost:5000/api/webinar/all");
//     //         setWebinars(res.data);
//     //         console.log("webinars", res.data);
//     //     } catch (error) {
//     //         console.log("Fetch error:", error);
//     //     }
//     // };
//     const fetchWebinars = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/webinar/all");

//             setWebinars(res.data.data); // store ONLY the array
//             console.log("webinars", res.data.data);

//         } catch (error) {
//             console.log("Fetch error:", error);
//         }
//     };

//     // console.log(webinars.data, "webinars data here")

//     // =-------------------------------------------------------------------------------------------------------
//     // card design data
//     const WebinarCard = ({ webinar }) => {
//         return (
//             <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
//                 <div className="relative">
//                     <img src={webinar.image} alt={webinar.title} className="w-full h-48 object-cover" />
//                     <span
//                         className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white ${
//                             webinar.status === "Upcoming"
//                                 ? "bg-blue-600"
//                                 : webinar.status === "Registered"
//                                     ? "bg-green-600"
//                                     : "bg-gray-700"
//                         }`}
//                     >
//                         {webinar.status}
//                     </span>
//                 </div>

//                 <div className="p-5 flex flex-col justify-between">
//                     <div>
//                         <h3 className="font-semibold text-gray-800 mb-1 text-base">
//                             {webinar.title}
//                         </h3>
//                         <p className="text-sm text-gray-500 mb-3">by {webinar.author}</p>

//                         <div className="space-y-1 text-sm text-gray-600">
//                             <p className="flex items-center gap-2">
//                                 <FiCalendar /> {webinar.date}
//                             </p>
//                             <p className="flex items-center gap-2">
//                                 <FiClock /> {webinar.duration}
//                             </p>
//                             <p className="flex items-center gap-2">
//                                 <FiUsers /> {webinar.participants} participants
//                             </p>
//                         </div>
//                     </div>

//                     <Link
//                         // to={`${webinar.buttonText === "View Details" ?"/student/mycourses/videoplayer/:courseIdId" : webinar.buttonText === "Join Webinar" ? "/student/webinar/webvideoplayer/:webinarId" : "/student/webinar/recordedVideo"}`}
//                         to={`/student/webinar/webvideoplayer/${webinar._id}`}
//                         className="mt-5 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition text-center"
//                     >
//                         {webinar.buttonText}
//                     </Link>
//                 </div>
//             </div>
//         );
//     };

//  const webinarsData = {
//         upcoming: [
//             {
//                 id: 1,
//                 title: "Advanced React Patterns Live Session",
//                 author: "Sarah Johnson",
//                 date: "Dec 28, 2024 at 3:00 PM EST",
//                 duration: "2 hours",
//                 participants: 150,
//                 status: "Upcoming",
//                 image: Code,
//                 buttonText: "View Details",
//             },
//             {
//                 id: 2,
//                 title: "Building Scalable APIs with Node.js",
//                 author: "Michael Torres",
//                 date: "Dec 30, 2024 at 2:00 PM EST",
//                 duration: "1.5 hours",
//                 participants: 89,
//                 status: "Registered",
//                 image: Code,
//                 buttonText: "Join Webinar",
//             },
//         ],
//         completed: [
//             {
//                 id: 3,
//                 title: "Data Visualization with Python",
//                 author: "Dr. Emily Rodriguez",
//                 date: "Recorded on Dec 22, 2024",
//                 duration: "2 hours",
//                 participants: 234,
//                 status: "Recording Available",
//                 image: Code,
//                 buttonText: "Watch Recording",
//             },
//             {
//                 id: 4,
//                 title: "Design Systems Workshop",
//                 author: "Mike Chen",
//                 date: "Recorded on Dec 18, 2024",
//                 duration: "3 hours",
//                 participants: 167,
//                 status: "Recording Available",
//                 image: Code,
//                 buttonText: "Watch Recording",
//             },
//         ],
//     };


//     return (
//         <div style={{ padding: 20 }}>
//             <div className=" bg-gray-50 p-6 pt-3 ">
//                 <BackToDashboard />

//                 <div className="live-top pt-13 flex justify-between items-center">
//                     <div className="mb-6">
//                         <h1 className="text-2xl font-bold text-gray-800">Live Webinars</h1>
//                         <p className="text-gray-500 mt-1">Upcoming & Registered</p>
//                     </div>

//                     <button className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2 p-3">
//                         <FaFilter /> <span>filter</span>
//                     </button>
//                 </div>

//                 <LivePlayer playbackUrl={playbackUrl} />

//                 {/* DYNAMIC WEBINAR CARDS FROM BACKEND */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
//                     {webinars.length === 0 ? (
//                         <p>No webinars available.</p>
//                     ) : (
//                         webinars.map((wb) => (
//                             <WebinarCard
//                                 key={wb._id}
//                                 webinar={{
//                                     title: wb.title,
//                                     author: wb.category,
//                                     date: wb.webinarSchedule?.startDate,
//                                     duration: wb.duration,
//                                     participants: wb.maxParticipants,
//                                     status: wb.status,
//                                     image: wb.thumbnail || Code,
//                                     buttonText: "View Details"
//                                 }}
//                             />
//                         ))
//                     )}
//                 </div>

//                 {/* Your Recorded Webinar Section (unchanged) */}
//                 <div className="pt-15">
//                     <h1>Completed Webinars - Watch Recordings</h1>
//                     {recordedVideo.length === 0 ? (
//                         <p>No recorded webinars available.</p>
//                     ) : (
//                         recordedVideo.map((webinars, i) => (
//                             <div className="mb-5 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition" key={i}>
//                                 <div className="relative">
//                                     <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white bg-gray-700">
//                                         {webinars.status}
//                                     </span>
//                                 </div>

//                                 <div className="p-5 flex flex-col justify-between">
//                                     <div>
//                                         <h3 className="font-semibold text-gray-800 mb-1 text-base">
//                                             {webinars.title}
//                                         </h3>

//                                         <div className="space-y-1 text-sm text-gray-600">
//                                             <p className="flex items-center gap-2">
//                                                 <FiCalendar /> {webinars.date}
//                                             </p>
//                                             <p className="flex items-center gap-2">
//                                                 <FiClock /> {webinars.duration}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <button onClick={() => oneRecordedVideo(webinars._id)} className="mt-5 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition">
//                                         Watch Recorded Video
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* Your static design (unchanged) */}
//             <div className=" bg-gray-50 p-6 pt-3 ">
//                 <BackToDashboard />

//                 <div className="live-top pt-13 flex justify-between items-center">
//                     <div className="mb-6">
//                         <h1 className="text-2xl font-bold text-gray-800">Live Webinars</h1>
//                         <p className="text-gray-500 mt-1">Upcoming & Registered</p>
//                     </div>

//                     <button className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2 p-3">
//                         <FaFilter /> <span>filter</span>
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
//                     {webinarsData.upcoming.map((webinar) => (
//                         <WebinarCard key={webinar.id} webinar={webinar} />
//                     ))}
//                 </div>

//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                     Completed Webinars - Watch Recordings
//                 </h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     {webinarsData.completed.map((webinar) => (
//                         <WebinarCard key={webinar.id} webinar={webinar} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }






import React, { useState, useEffect } from "react";
import { FiClock, FiUsers, FiCalendar, FiVideo } from "react-icons/fi";
import { FaFilter, FaPlayCircle, FaRegCalendarCheck } from "react-icons/fa";
import Code from '../../../../../assets/code.jpg';
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LivePlayer from './LivePlayer';
import { Link } from "react-router-dom";
// // import BACKEND_URL from "../../../../../api/Api";

export default function Webinars() {
    const [playbackUrl, setPlaybackUrl] = useState("");
    const [webinars, setWebinars] = useState([]);
    const [recordedVideos, setRecordedVideos] = useState([]);
    const [loading, setLoading] = useState({
        webinar: true,
        recorded: true,
        live: false
    });
    const [filter, setFilter] = useState("all"); // "all", "upcoming", "completed"

    const navigate = useNavigate();

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            // Fetch webinars
            try {
                const webinarRes = await axios.get(`http://localhost:5000/api/webinar/all`);
                setWebinars(webinarRes.data.data || webinarRes.data);
            } catch (webinarErr) {
                console.error("Error fetching webinars:", webinarErr);
            } finally {
                setLoading(prev => ({ ...prev, webinar: false }));
            }

            // Fetch recorded videos
            try {
                const recordedRes = await axios.get(`http://localhost:5000/api/live/recorded/all/video`);
                setRecordedVideos(recordedRes.data || []);
            } catch (recordedErr) {
                console.error("Error fetching recorded videos:", recordedErr);
                setRecordedVideos([]);
            } finally {
                setLoading(prev => ({ ...prev, recorded: false }));
            }

            // Fetch live session
            try {
                const liveRes = await axios.get(`http://localhost:5000/api/live/latest`);
                if (liveRes.data && liveRes.data.playbackUrl) {
                    setPlaybackUrl(liveRes.data.playbackUrl);
                }
            } catch (liveErr) {
                console.log("No live session available:", liveErr);
            }

        } catch (error) {
            console.error("General fetch error:", error);
        }
    };

    console.log("playbackUrl", playbackUrl);

    const handleRecordedVideoClick = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/live/recorded/video/${id}`);
            console.log("Fetched recorded video:", res.data);
            console.log(id)
            navigate("/student/webinar/recordedVideo", {
                state: { video: res.data }
            });
        } catch (err) {
            console.error("Error fetching recorded video:", err);
            alert("Failed to load recorded video");
        }
    };

    // Determine webinar status and button text
    const getWebinarStatusInfo = (webinar) => {
        const now = new Date();
        const webinarDate = webinar.webinarSchedule?.startDate ?
            new Date(webinar.webinarSchedule.startDate) : null;

        let status = "Upcoming";
        let statusColor = "bg-blue-600";
        let buttonText = "View Details";
        let icon = <FaRegCalendarCheck className="inline mr-1" />;

        if (webinar.status === "live" || webinar.status === "ongoing") {
            status = "Live Now";
            statusColor = "bg-red-600";
            buttonText = "Join Webinar";
            icon = <FaPlayCircle className="inline mr-1" />;
        } else if (webinar.status === "completed" || webinar.status === "recorded") {
            status = "Recording Available";
            statusColor = "bg-gray-700";
            buttonText = "Watch Recording";
            icon = <FiVideo className="inline mr-1" />;
        } else if (webinarDate && webinarDate < now) {
            status = "Completed";
            statusColor = "bg-gray-600";
            buttonText = "View Details";
        }

        return { status, statusColor, buttonText, icon };
    };

    // Webinar Card Component
    // const WebinarCard = ({ webinar }) => {
    //     const { status, statusColor, buttonText, icon } = getWebinarStatusInfo(webinar);

    //     // Get first session topic if available
    //     const firstTopic = webinar.webinarSchedule?.sessions?.[0]?.topic ||
    //         webinar.agenda?.[0]?.topic ||
    //         webinar.category;

    //     return (
    //         <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition hover:scale-[1.02] duration-300">
    //             <div className="relative">
    //                 <img
    //                     src={webinar.thumbnail || Code}
    //                     alt={webinar.title}
    //                     className="w-full h-48 object-cover"
    //                     onError={(e) => {
    //                         e.target.src = Code;
    //                         e.target.onerror = null;
    //                     }}
    //                 />
    //                 <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white ${statusColor}`}>
    //                     {status}
    //                 </span>
    //             </div>

    //             <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)]">
    //                 <div>
    //                     <h3 className="font-semibold text-gray-800 mb-1 text-base line-clamp-2 h-12">
    //                         {webinar.title}
    //                     </h3>
    //                     <p className="text-sm text-gray-500 mb-3 flex items-center">
    //                         <FiUsers className="mr-1" /> by {firstTopic}
    //                     </p>

    //                     <div className="space-y-2 text-sm text-gray-600">
    //                         {webinar.webinarSchedule?.startDate && (
    //                             <p className="flex items-center gap-2">
    //                                 <FiCalendar />
    //                                 {new Date(webinar.webinarSchedule.startDate).toLocaleDateString('en-US', {
    //                                     weekday: 'short',
    //                                     month: 'short',
    //                                     day: 'numeric',
    //                                     year: 'numeric'
    //                                 })}
    //                             </p>
    //                         )}
    //                         {webinar.duration && (
    //                             <p className="flex items-center gap-2">
    //                                 <FiClock /> {webinar.duration}
    //                             </p>
    //                         )}
    //                         {webinar.maxParticipants && (
    //                             <p className="flex items-center gap-2">
    //                                 <FiUsers /> {webinar.maxParticipants} participants max
    //                             </p>
    //                         )}
    //                     </div>
    //                 </div>

    //                 <Link
    //                     to={`/student/webinar/webvideoplayer/${webinar._id}`}
    //                     state={{ webinar }}
    //                     className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
    //                 >
    //                     {icon}
    //                     {buttonText}
    //                 </Link>
    //             </div>
    //         </div>
    //     );
    // };


    const WebinarCard = ({ webinar }) => {
    const { status, statusColor, buttonText, icon } = getWebinarStatusInfo(webinar);
    const firstTopic =
        webinar.webinarSchedule?.sessions?.[0]?.topic ||
        webinar.agenda?.[0]?.topic ||
        webinar.category;

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition hover:scale-[1.02] duration-300">
            <div className="relative">
                <img
                    src={webinar.thumbnail || Code}
                    alt={webinar.title}
                    className="w-full h-48 object-cover"
                />
                <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white ${statusColor}`}>
                    {status}
                </span>
            </div>

            <div className="p-5 flex flex-col justify-between h-[calc(100%-12rem)]">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-base line-clamp-2 h-12">
                        {webinar.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <FiUsers className="mr-1" /> by {firstTopic}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                        {/* date*/}
                        {webinar.webinarSchedule?.startDate && (
                            <p className="flex items-center gap-2">
                                <FiCalendar />
                                {new Date(webinar.webinarSchedule.startDate).toLocaleDateString("en-US")}
                            </p>
                        )}
                        {/* duration */}
                        {webinar.duration && (
                            <p className="flex items-center gap-2">
                                <FiClock /> {webinar.duration}
                            </p>
                        )}
                    </div>
                </div>

                <Link
                    to={`/student/webinar/webvideoplayer/${webinar._id}`}
                    state={{ webinar }}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                >
                    {icon}
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};


    // Recorded Video Card Component
    const RecordedVideoCard = ({ video, index }) => {
        return (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition hover:scale-[1.02] duration-300">
                <div className="p-5 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-800 text-base line-clamp-2 flex-1">
                                {video.title || `Recorded Session ${index + 1}`}
                            </h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 ml-2">
                                Recorded
                            </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            {video.date && (
                                <p className="flex items-center gap-2">
                                    <FiCalendar />
                                    {new Date(video.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            )}
                            {video.duration && (
                                <p className="flex items-center gap-2">
                                    <FiClock /> {video.duration}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => handleRecordedVideoClick(video._id)}
                        className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                    >
                        <FiVideo />
                        Watch Recorded Video
                    </button>
                </div>
            </div>
        );
    };

    // Filter webinars based on selection
    const filteredWebinars = webinars.filter(webinar => {
        if (filter === "upcoming") {
            return webinar.status === "upcoming" || webinar.status === "schedule";
        } else if (filter === "completed") {
            return webinar.status === "completed" || webinar.status === "recorded";
        }
        return true;
    });

    console.log("Filtered Webinars:", filteredWebinars);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:pt-20 ">
            <BackToDashboard />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Live Webinars</h1>
                    <p className="text-gray-500 mt-1">Upcoming, Live & Recorded Sessions</p>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 text-sm font-medium transition ${filter === "all" ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("upcoming")}
                            className={`px-4 py-2 text-sm font-medium transition ${filter === "upcoming" ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-2 text-sm font-medium transition ${filter === "completed" ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Completed
                        </button>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                        <FaFilter />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>
            </div>

            {/* Live Player Section */}
            {/* {playbackUrl && (
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <FaPlayCircle className="text-red-600 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-800">Live Now</h2>
                    </div>
                    <LivePlayer playbackUrl={playbackUrl} />
                </div>
            )} */}

            {/* Webinars Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {filter === "all" ? "All Webinars" :
                            filter === "upcoming" ? "Upcoming Webinars" :
                                "Completed Webinars"}
                    </h2>
                    <span className="text-sm text-gray-500">
                        {filteredWebinars.length} webinar{filteredWebinars.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {loading.webinar ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-80"></div>
                        ))}
                    </div>
                ) : filteredWebinars.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                        <FiCalendar className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No webinars found</h3>
                        <p className="text-gray-500">
                            {filter === "all" ? "There are no webinars available at the moment." :
                                filter === "upcoming" ? "No upcoming webinars scheduled." :
                                    "No completed webinars available."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWebinars.map((wb, i) => (
                            <WebinarCard key={i} webinar={wb} />
                        ))}
                    </div>
                )}
            </div>

            {/* Recorded Videos Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <FiVideo className="text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-800">Recorded Sessions</h2>
                    </div>
                    <span className="text-sm text-gray-500">
                        {recordedVideos.length} recording{recordedVideos.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {loading.recorded ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-48"></div>
                        ))}
                    </div>
                ) : recordedVideos.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                        <FiVideo className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No recorded sessions</h3>
                        <p className="text-gray-500">Recorded videos will appear here after live sessions end.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recordedVideos.map((video, index) => (
                            <RecordedVideoCard key={video._id || index} video={video} index={index} />
                        ))}
                    </div>
                )}
            </div>

            {/* Empty State for No Content */}
            {!loading.webinar && !loading.recorded &&
                webinars.length === 0 && recordedVideos.length === 0 && !playbackUrl && (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-sm border">
                            <FiCalendar className="text-5xl text-gray-400 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-gray-800 mb-3">No webinars available</h3>
                            <p className="text-gray-600 mb-6">
                                Check back later for upcoming live sessions and recorded webinars.
                            </p>
                            <button
                                onClick={fetchAllData}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
}