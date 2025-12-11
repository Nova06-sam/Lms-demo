// // WebVideoMain.jsx (updated)
// import React, { useEffect, useState } from "react";
// import WebVideoSidebar from "./webvideoSidebar";
// import WebVideoTabs from "./webvideTabs";
// import WebVideoPlayer from "./webvideoPlayer";
// import WebVideoNotes from "./WebVideoTab/WebvideoNotes";
// import WebVideoResources from "./WebVideoTab/WebvideoResources";
// import WebVideoAssignments from "./WebVideoTab/WebvideoAssignments";
// import WebVideoDiscussion from "./WebVideoTab/WebvideoDiscussion";
// import { CiHeart } from "react-icons/ci";
// import { FiShare } from "react-icons/fi";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function WebVideoMain({}) {
//     const { id } = useParams();
//     const [webinar, setWebinar] = useState(null);
//     const [activeTab, setActiveTab] = useState("notes");

//     // NEW: selected session state
//     const [activeSession, setActiveSession] = useState(null);

//     useEffect(() => {
//         if (!id) return;

//         axios.get(`/api/webinar/${id}`)
//             .then(res => {
//                 if (res.data.success) {
//                     const data = res.data.data;
//                     setWebinar(data);

//                     // Read sessions from webinarSchedule ONLY
//                     const sessions = data?.webinarSchedule?.sessions || [];

//                     // Set first session as default
//                     setActiveSession(sessions.length ? sessions[0] : null);
//                 }
//             })
//             .catch(err => console.error("Error loading webinar:", err));
//     }, [id]);



//     // handler passed to sidebar
//     const handleSelectSession = (session) => {
//         setActiveSession(session);
//     };

//     return (
//         <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">

//             {/* Sidebar - PASS webinar and onSelectSession */}
//             <div className="md:w-1/4 bg-white shadow-sm border-r">
//                 <WebVideoSidebar
//                     webinar={webinar}
//                     onSelectSession={handleSelectSession}
//                 />
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-6 overflow-y-auto">
//                 {webinar && (
//                     <>
//                         <div className="flex justify-between">
//                             <div>
//                                 <h1 className="text-2xl font-bold mb-1">{webinar.title}</h1>
//                                 <p className="text-gray-500 mb-6">{webinar.description}</p>
//                             </div>

//                             <div className="flex gap-3">
//                                 <div className="flex gap-2 text-center border-2 border-gray-300 h-10 text-lg rounded-xl p-2 cursor-pointer hover:bg-blue-400 hover:text-white">
//                                     <span className="py-1"><FiShare /></span>
//                                     <span>Share</span>
//                                 </div>
//                                 <span className="border-2 border-gray-300 h-10 text-3xl rounded-xl py-1 px-1 w-11 cursor-pointer hover:bg-green-400 hover:text-red-600">
//                                     <CiHeart />
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Video Player - pass activeSession */}
//                         <WebVideoPlayer
//                             webinarId={webinar._id}
//                             title={webinar.title}
//                             subtitle={webinar.description}
//                             session={activeSession}      // NEW: active session prop
//                         />

//                         {/* Tabs */}
//                         <WebVideoTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//                         {/* Tab content */}
//                         {activeTab === "notes" && <WebVideoNotes />}
//                         {activeTab === "resources" && <WebVideoResources />}
//                         {activeTab === "assignments" && <WebVideoAssignments />}
//                         {activeTab === "discussion" && <WebVideoDiscussion />}

//                         {/* ---- RESTORED ORIGINAL DESIGN ---- */}
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-5">
//                             <div>
//                                 <h4 className="text-gray-800 font-medium">useEffect Hook</h4>
//                                 <p className="text-sm text-gray-500">Chapter 3, Lesson 2</p>
//                             </div>

//                             <button className="bg-green-600 text-white px-5 py-2 rounded-full font-medium mt-4 sm:mt-0 hover:bg-green-700 transition">
//                                 Mark as Complete
//                             </button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }










import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
// ... other imports
import WebVideoSidebar from "./webvideoSidebar";
import WebVideoTabs from "./webvideTabs";
import WebVideoPlayer from "./webvideoPlayer";
import WebVideoNotes from "./webvideoTab/webVideoNotes";
import WebVideoResources from "./webvideoTab/WebvideoResources";
import WebVideoAssignments from "./webvideoTab/WebvideoAssignments";
import WebVideoDiscussion from "./webvideoTab/WebvideoDiscussion";
import LivePlayer from "../LivePlayer";
// // import BACKEND_URL from "../../../../../../api/Api";


export default function WebVideoMain({ }) {
    const [webinar, setWebinar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("notes");
    const [activeSession, setActiveSession] = useState(null);
    // const { state } = useLocation();
    const { webinarId } = useParams();
    const [playbackUrl, setPlaybackUrl] = useState("");

    // const [webinars, setWebinars] = useState(state?.webinar || null);

    //   useEffect(() => {
    //     const fetchWebinar = async () => {
    //     //   if (!webinar) {
    //     //     setError("No webinar ID provided");
    //     //     setLoading(false);
    //     //     return;
    //     if (webinars) return;
    //     //   }
    //       try {
    //         // setLoading(true);
    //         const response = await axios.get(`http://localhost:5000/api/webinar/${webinar._id}`);
    //         console.log("Webinar fetch response:", response.data);
    //         setWebinars(response.data.data);

    //         if (response.data.success) {
    //           const webinarData = response.data.data;
    //           setWebinar(webinarData);
    //           console.log("Loaded webinar:", webinarData);

    //           // Set active session (first one by default)
    //           const sessions = webinarData.webinarSchedule?.sessions || webinarData.sessions || [];
    //           if (sessions.length > 0) {
    //             setActiveSession(sessions[0]);
    //           }
    //         } else {
    //           setError(response.data.message || "Failed to load webinar");
    //         }
    //       } catch (err) {
    //         console.error("Error loading webinar:", err);
    //         setError(err.response?.data?.message || err.message || "Failed to load webinar");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchWebinar();
    //   }, [webinar?._id]);

    useEffect(() => {
        if (webinar) {
            const sessions = webinar.webinarSchedule?.sessions || webinar.sessions || [];
            setActiveSession(sessions[0] || null);
            return;
        }

        if (!webinarId) {
            setError("Webinar ID missing");
            setLoading(false);
            return;
        }

        const fetchWebinar = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/webinar/${webinarId}`);

                if (response.data.success) {
                    const data = response.data.data;
                    setWebinar(data);

                    if (data.ivs?.playbackUrl) {
                        setPlaybackUrl(data.ivs.playbackUrl);
                    }

                    const sessions = data.webinarSchedule?.sessions || data.sessions || [];
                    setActiveSession(sessions[0] || null);
                } else {
                    setError("Failed to load webinar");
                }
            } catch (err) {
                setError("Error fetching webinar");
            } finally {
                setLoading(false);
            }
        };

        fetchWebinar();
    }, [webinarId]);

    // console.log("Webinar data:", webinar);

    if (loading)
        return <div className="p-6 text-center">Loading webinar...</div>;

    if (error || !webinar)
        return <div className="p-6 text-center text-red-500">{error}</div>;

    const sessions = webinar.webinarSchedule?.sessions || webinar.sessions || [];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="md:w-1/4 bg-white shadow-sm border-r">
                <WebVideoSidebar
                    webinar={webinar}
                    sessions={sessions}
                    onSelectSession={setActiveSession}
                    activeSession={activeSession}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{webinar.title}</h1>
                        <p className="text-gray-600 mt-1">{webinar.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Category: {webinar.category} | Level: {webinar.level}
                        </p>
                    </div>
                    {/* ... action buttons */}
                </div>

                {/* Video Player */}
                {/* {activeSession && (
                    <WebVideoPlayer
                        session={activeSession}
                        webinar={webinar}
                    />  
                )} */}
                {/* <LivePlayer webinarId={webinarId} session={activeSession} /> */}
                <LivePlayer playbackUrl={playbackUrl} />

                {/* Tab Navigation */}
                <WebVideoTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === "notes" && <WebVideoNotes webinarId={webinarId} />}
                    {activeTab === "resources" && <WebVideoResources webinarId={webinarId} />}
                    {activeTab === "assignments" && <WebVideoAssignments webinarId={webinarId} />}
                    {activeTab === "discussion" && <WebVideoDiscussion webinarId={webinarId} />}
                </div>
            </div>
        </div>
    );
}