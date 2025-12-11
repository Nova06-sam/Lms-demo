// export default function Students() {
//   const [show2, setShow2] = useState(false);
//   const [streakDays, setStreakDays] = useState(0);


//   // Timer states
//   // const [isRunning, setIsRunning] = useState(false);
//   const [currentSession, setCurrentSession] = useState(0); // in seconds
//   const [totalToday, setTotalToday] = useState(3245); // 54:05 in seconds
//   const [inactivityTimer, setInactivityTimer] = useState(null);
//   const [isRunning, setIsRunning] = useState(true); // auto start


//   // ✅ Get logged-in student
// const student = JSON.parse(localStorage.getItem("user"));
// const studentId = student?._id;

//  const allowedRoutes = [
//   "/student",
//   "/student/mycourses",
//   "/student/mycourses/videoplayer/:courseId",
//   "/student/webinar",
//   "/student/webinar/webvideoplayer/:webinarId",
//   "/student/certificates",
//   "/student/support",
//   "/student/assessment",
//   "/student/assessment/quiz/:id",
//   "/student/skillrating",
//   "/student/progress",
//   "/student/achievements",
//   "/student/live",
//   "/student/recordedVideo",
// ];

// const location = useLocation();

//   // student details
//   const sDetails = [
//     { name: 'enrolled courses', no: 4, icons: IoBookSharp, sup: '4 in progress' },
//     { name: 'Skill rating', no: '85/100', icons: GiTargetShot, sup: 'above average' },
//     { name: 'Assessments', no: '12/15', icons: MdAssessment, sup: 'completed' },
//     { name: 'Live Webinars', no: 2, icons: MdLiveTv, sup: '2 recordings available' },
//     { name: 'Learning Streak', no: `${streakDays} days`, icons: FaFire, sup: streakDays > 3 ? '🔥 Keep it up!' : 'Start learning daily!' }

//   ];

//   // Format seconds to HH:MM:SS
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
//     const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
//     const secs = (seconds % 60).toString().padStart(2, '0');
//     return `${hrs}:${mins}:${secs}`;
//   };

//   // Calculate hours for the badge
//   const calculateHours = (seconds) => {
//     return (seconds / 3600).toFixed(1);
//   };



//   // Handle user activity
//   const handleUserActivity = () => {
//     if (isRunning) {
//       resetInactivityTimer();
//     }
//   };

//   // Start timer
//   const handleStart = () => {
//     setIsRunning(true);
//     resetInactivityTimer();
//   };

//   // Pause timer
//   const handlePause = () => {
//     setIsRunning(false);
//     // Add current session to total
//     setTotalToday(prev => prev + currentSession);
//     setCurrentSession(0);

//     if (inactivityTimer) {
//       clearTimeout(inactivityTimer);
//     }
//   };

//   // Toggle timer
//   const handleToggle = () => {
//     if (isRunning) {
//       handlePause();
//     } else {
//       handleStart();
//     }
//   };

//   // Timer effect
//   useEffect(() => {
//     let interval;

//     if (isRunning) {
//       interval = setInterval(() => {
//         setCurrentSession(prev => prev + 1);
//       }, 1000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isRunning]);

//   // ✅ Auto-save study time every 1 minute
// useEffect(() => {
//   if (!studentId) return;
//   if (!isRunning) return;

//   const interval = setInterval(async () => {
//     const minutesSpent = Math.floor(currentSession / 60);
//     if (minutesSpent > 0) {
//       try {
//         await axios.post(`${url}/api/activity/log`, {
//           studentId,
//           minutesSpent,
//         });
//         console.log("⏱️ Time saved:", minutesSpent, "minutes");
//         setCurrentSession(0); // reset counter after saving
//       } catch (error) {
//         console.error("Error saving time:", error);
//       }
//     }
//   }, 60000); // every 60 seconds

//   return () => clearInterval(interval);
// }, [currentSession, isRunning, studentId]);

// // ✅ Save time when user closes tab or switches window
// useEffect(() => {
//   const handleVisibilityChange = async () => {
//     if (document.hidden) {
//       const minutesSpent = Math.floor(currentSession / 60);
//       if (minutesSpent > 0 && studentId) {
//         try {
//           await axios.post(`${url}/api/activity/log`, {
//             studentId,
//             minutesSpent,
//           });
//           console.log("💾 Time saved on tab hide:", minutesSpent, "minutes");
//           setCurrentSession(0);
//         } catch (error) {
//           console.error("Error saving on tab hide:", error);
//         }
//       }
//       setIsRunning(false);
//     } else {
//       setIsRunning(true);
//     }
//   };

//   const handleBeforeUnload = async () => {
//     const minutesSpent = Math.floor(currentSession / 60);
//     if (minutesSpent > 0 && studentId) {
//       await axios.post(`${url}/api/activity/log`, {
//         studentId,
//         minutesSpent,
//       });
//     }
//   };

//   document.addEventListener("visibilitychange", handleVisibilityChange);
//   window.addEventListener("beforeunload", handleBeforeUnload);

//   return () => {
//     document.removeEventListener("visibilitychange", handleVisibilityChange);
//     window.removeEventListener("beforeunload", handleBeforeUnload);
//   };
// }, [currentSession, studentId]);

// useEffect(() => {
//   const fetchActivityAndStreak = async () => {
//     try {
//       const res = await axios.get(`${url}/api/activity/${studentId}`);
//       if (res.data.success && res.data.data) {
//         const { totalTimeSpent, dailyLogs } = res.data.data;

//         // ✅ Update total time today
//         setTotalToday(totalTimeSpent * 60); // convert minutes → seconds

//         // ✅ Calculate streak days
//         if (dailyLogs && dailyLogs.length > 0) {
//           const sortedLogs = [...dailyLogs].sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           );

//           let streak = 1;
//           for (let i = 0; i < sortedLogs.length - 1; i++) {
//             const current = new Date(sortedLogs[i].date);
//             const next = new Date(sortedLogs[i + 1].date);
//             const diffDays =
//               (current - next) / (1000 * 60 * 60 * 24);

//             if (diffDays === 1) {
//               streak++;
//             } else if (diffDays > 1) {
//               break; // stop when streak breaks
//             }
//           }

//           setStreakDays(streak);
//           console.log(`🔥 Current Streak: ${streak} days`);
//         } else {
//           setStreakDays(0);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching activity:", error);
//     }
//   };

//   if (studentId) fetchActivityAndStreak();
// }, [studentId]);


//   // Add event listeners for user activity
// useEffect(() => {
//   const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

//   events.forEach(event => {
//     document.addEventListener(event, handleUserActivity, true);
//   });

//   return () => {
//     events.forEach(event => {
//       document.removeEventListener(event, handleUserActivity, true);
//     });

//     if (inactivityTimer) clearTimeout(inactivityTimer);
//   };
// }, [isRunning, inactivityTimer]);


// useEffect(() => {
//   // Check if current route is allowed
//   const isAllowed = allowedRoutes.some(route => {
//     if (route.includes(":")) {
//       const baseRoute = route.split("/:")[0];
//       return location.pathname.startsWith(baseRoute);
//     }
//     return location.pathname === route;
//   });

//   if (isAllowed) {
//     // If user comes back to a student route, restart timer
//     if (!isRunning) {
//       console.log("Returned to student route — restarting timer");
//       handleStart();
//     }
//   } else {
//     // If user leaves student routes, pause timer
//     if (isRunning) {
//       console.log("Navigated outside allowed routes — pausing timer");
//       handlePause();
//     }
//   }
// }, [location.pathname]); // only need location.pathname
//  // add isRunning to dependencies

// // const resetInactivityTimer = () => {
// //   if (inactivityTimer) clearTimeout(inactivityTimer);

// //   const timer = setTimeout(() => {
// //     if (isRunning) {
// //       handlePause();
// //       alert("Timer paused due to 5 minutes of inactivity");
// //     }
// //   }, 30 * 60 * 1000); // 5 minutes

// //   setInactivityTimer(timer);
// // };



//   // course card details;
//   const courses = [
//     {
//       id: 1,
//       title: "Complete React Development Course",
//       instructor: "Sarah Johnson",
//       progress: 75,
//       image: Code,
//     },
//     {
//       id: 2,
//       title: "UI/UX Design Fundamentals",
//       instructor: "Mike Chen",
//       progress: 40,
//       image: Code,
//     },
//     {
//       id: 3,
//       title: "Python for Data Science",
//       instructor: "Dr. Emily Rodriguez",
//       progress: 90,
//       image: Code,
//     },
//     {
//       id: 4,
//       title: "Digital Marketing Mastery",
//       instructor: "Alex Thompson",
//       progress: 25,
//       image: Code,
//     },
//   ];

//   const assignment = [
//     { name: 'Design portfolio project', top: '', sup: 'UI/UX Design Fundamentals' },
//     { name: 'Data Analysis Assignment', top: '', sup: 'Python for Data Science' }
//   ]
//  const user = JSON.parse(localStorage.getItem('user'));


//   return (
//     <main>
//       <DasboardHeader view={show2} setShow2={setShow2} />
//       <section className="student-cover flex">
//         <Dasnav min={show2} />
//         <div className="s-details-cover w-full pt-30 p-5 bg-white">
//           {/*student-details*/}
//           <div className="student-details">
//             {/* student name display */}
//             <div className="mb-6">
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 Welcome back, {user.name}
//               </h1>
//               <p className="text-gray-500">
//                 Continue your learning journey with courses and live webinars!
//               </p>
//             </div>
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//               {sDetails.map((items, i) => {
//                 const Icon = items.icons;
//                 return (
//                   <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col">
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-800 font-medium">{items.name}</span>
//                       <Icon className="text-gray-500 text-lg" />
//                     </div>
//                     <div className="text-2xl font-bold mt-2">{items.no}</div>
//                     <p className="text-sm text-gray-500 mt-auto">
//                       {items.sup}
//                     </p>
//                   </div>
//                 )
//               })}
//             </div>
//             {/* Daily Active Time + Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Daily Active Time */}
//               <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//                 <h2 className="text-gray-800 font-semibold mb-2">
//                   Daily Active Time
//                 </h2>
//                 <p className="text-gray-500 text-sm mb-4">
//                   Track your learning hours today
//                 </p>

//                 {/* Timer */}
//                 <div className="bg-blue-50 rounded-xl py-6 text-center mb-4">
//                   <h3 className="text-gray-700 text-sm">Current Session</h3>
//                   <p className="text-3xl font-mono font-bold text-blue-600">
//                     {formatTime(currentSession)}
//                   </p>
//                 </div>

//                 {/* Total */}
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Total Today</p>
//                     <p className="font-mono font-bold text-lg">
//                       {formatTime(totalToday + (isRunning ? currentSession : 0))}
//                     </p>
//                   </div>
//                   <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
//                     {calculateHours(totalToday + (isRunning ? currentSession : 0))}h
//                   </span>
//                 </div>

//                 {/* Toggle Timer Button */}
//                 <div className="timer-bts flex gap-2">
//                   <button
//                     onClick={handleToggle}
//                     className={`flex items-center justify-center w-full font-semibold py-2 rounded-xl transition ${isRunning
//                       ? 'bg-orange-500 hover:bg-orange-600 text-white'
//                       : 'bg-blue-600 hover:bg-blue-700 text-white'
//                       }`}
//                   >
//                     {isRunning ? (
//                       <>
//                         <BsPauseCircle className="mr-2 text-lg" /> Restart Timer
//                       </>
//                     ) : (
//                       <>
//                         <BsPlayCircle className="mr-2 text-lg" /> Start Timer
//                       </>
//                     )}
//                   </button>
//                   <button onClick={handlePause} className="p-3 bg-gray-100 rounded-xl"><LuTimerReset className="text-lg" /></button>
//                 </div>

//                 <p className="text-xs text-gray-400 text-center mt-3">
//                   Timer pauses automatically after 30 minutes of inactivity
//                 </p>

//                 {/* Status indicator */}
//                 <div className="flex items-center justify-center mt-2">
//                   <div className={`w-2 h-2 rounded-full mr-2 ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                     }`}></div>
//                   <span className="text-xs text-gray-500">
//                     {isRunning ? 'Timer running...' : 'Timer paused'}
//                   </span>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//                 <h2 className="text-gray-800 font-semibold mb-4">Quick Actions</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <button className="border border-gray-200  hover:bg-green-600 hover:text-white  transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2">
//                     <FaCheckCircle /> <span>View Assessments</span>
//                   </button>
//                   <button className="border border-gray-200  hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2">
//                     <GiTargetShot /> <span>Skill Rating</span>
//                   </button>
//                   <button className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2">
//                     <FaCheckCircle /> <span>Achievements</span>
//                   </button>
//                   <button className="border border-gray-200 hover:bg-green-600 hover:text-white  transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2">
//                     <FaCheckCircle /> <span>Get Support</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* course details and upcoming */}
//           <div className="student-bot w-full flex gap-2">
//             {/* course list */}
//             <div className="c-details pt-2">
//               {/* head-title */}
//               <div className="c-head flex justify-between p-4">
//                 <h2 className="text-3xl font-bold">continue learning</h2>
//                 <button className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2 p-3">
//                   <FaFilter /> <span>filter</span>
//                 </button>
//               </div>
//               {/* course-card-design */}
//               <div className="grid card-cover grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 pt-5">
//                 {courses.map((vals, j) => {
//                   return (
//                     // card-box
//                     <div key={j} className="bg-white card-box shadow-md rounded-4xl overflow-hidden">
//                       <img src={vals.image} alt='codeing' className="w-full h-60 object-cover" />
//                       <div className="p-4">
//                         <h3 className="text-lg font-semibold">{vals.title}</h3>
//                         <p className="text-sm text-gray-500 mb-2">by {vals.instructor}</p>
//                         <div className="mb-3 mt-6">
//                           <div className="flex justify-between">
//                             <p className="text-sm">Progress</p>
//                             <p className="text-sm">{vals.progress}%</p>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
//                             <div className="bg-blue-600 h-2.5 rounded-full"></div>
//                           </div>
//                         </div>
//                         <a
//                           className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-6 mb-5"
//                         >
//                           Continue Learning
//                         </a>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//             {/* upcoming list */}
//             <div className="c-upcome flex flex-col pt-8 gap-5 p-3">
//               <h1 className="text-2xl font-bold pb-5">upcoming</h1>
//               {/* box design */}
//               <div className="upcome-box flex flex-col bg-white rounded-3xl border border-gray-300 p-4 w-full">
//                 <div className=" flex justify-between mb-3 up-b-top">
//                   <span><small className="bg-blue-500 hover:bg-blue-700 text-white pt-1 pb-1 pl-3 pr-3 rounded-xl">quiz</small></span>
//                   <span><small className="bg-red-500  hover:bg-red-700 text-white pt-1 pb-1 pl-3 pr-3 rounded-xl">due today</small></span>
//                 </div>
//                 <h4 className="mb-1">react components quiz</h4>
//                 <small className="text-gray-400 mb-3">Complete React Development</small>
//                 <button className="w-full bg-blue-500 text-white hover:bg-blue-800 hover:text-gray-200  p-1 rounded-2xl font-bold">Take Quiz</button>
//               </div>
//               {/* assignment */}
//               {assignment.map((items, j) => {
//                 return (
//                     <div key={j+1} className="upcome-box flex flex-col bg-white rounded-3xl border border-gray-300 p-4 w-full">
//                       <div className=" flex justify-between mb-3 up-b-top">
//                         <span><small className="bg-gray-400 hover:bg-blue-700 text-white pt-1 pb-1 pl-3 pr-3 rounded-xl">assignment</small></span>
//                       </div>
//                       <h4 className="mb-1">{items.name}</h4>
//                       <small className="text-gray-400 mb-3">{items.sup}</small>
//                       <button className="w-full bg-blue-500 text-white hover:bg-blue-800 hover:text-gray-200  p-1 rounded-2xl font-bold">view assignment</button>
//                     </div>
//                 )
//               })}

//               {/* add */}
//               <div className="add-box justify-center items-center gap-2 p-5 flex flex-col bg-white rounded-3xl border border-gray-300 w-full">
//                   <FiCheckCircle/>
//                   <p>all caught up!</p>
//                   <p>great job staying on track</p>
//               </div>
//             </div>
//           </div>
//         </div>

//       </section>
//     </main>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaFire, FaCheckCircle, FaFilter } from "react-icons/fa";
import { MdAssessment, MdLiveTv } from "react-icons/md";
import { GiTargetShot } from "react-icons/gi";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import Dasnav from "./d-nav/DasNav";
import DasboardHeader from "../../common/dasHeader/dasboardHeader";
import "./students.css";
import axios from "axios";
import { url } from "../../../../src/config";
import { useLocation, useNavigate } from "react-router-dom";
import Code from "../../../assets/code.jpg";

export default function Students() {
  const [dashboardData, setDashboardData] = useState(null);
  const [show2, setShow2] = useState(false);
  const [streakDays, setStreakDays] = useState(0);
  const [currentSession, setCurrentSession] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState(null);

  const navigate = useNavigate();
  const student =
    JSON.parse(sessionStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("user"));
  const studentId = student?._id;
  const location = useLocation();

  const allowedRoutes = [
    // 🎓 Student dashboard main
    "/student",
    "/student/",

    // 🎥 My Courses
    "/student/mycourses",
    "/student/mycourses/",
    "/student/mycourses/videoplayer/:courseId",
    "/student/mycourses/videoplayer/",

    // 💻 Webinars
    "/student/webinar",
    "/student/webinar/",
    "/student/webinar/webvideoplayer/:webinarId",
    "/student/webinar/webvideoplayer/",
    "/student/webinar/recordedVideo",
    "/student/webinar/recordedVideo/",

    // 🧾 Certificates
    "/student/certificates",
    "/student/certificates/",

    // 🧩 Support
    "/student/support",
    "/student/support/",

    // 🧮 Assessments
    "/student/assessment",
    "/student/assessment/",
    "/student/assessment/quiz/:id",
    "/student/assessment/quiz/",

    // 🧠 Skill Rating
    "/student/skillrating",
    "/student/skillrating/",

    // 📈 Progress
    "/student/progress",
    "/student/progress/",

    // 🏆 Achievements
    "/student/achievements",
    "/student/achievements/",

    // 🔴 Live
    "/student/live",
    "/student/live/",
  ];


  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };
  const calculateHours = (seconds) => (seconds / 3600).toFixed(1);


  // Restore sessionStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("studyTimer"));
    if (savedData) {
      setCurrentSession(savedData.currentSession || 0);
      setTotalToday(savedData.totalToday || 0);
      setIsRunning(savedData.isRunning ?? true);
    }
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${url}/api/dashboard/${studentId}`);
        if (res.data.success) setDashboardData(res.data.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    if (studentId) fetchDashboard();
  }, [studentId]);

  // Daily reset
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedDate = sessionStorage.getItem("studyTimerDate");
    if (savedDate !== today) {
      sessionStorage.removeItem("studyTimer");
      sessionStorage.setItem("studyTimerDate", today);
      setCurrentSession(0);
      setTotalToday(0);
    }
  }, []);

  // Persist to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(
      "studyTimer",
      JSON.stringify({ currentSession, totalToday, isRunning })
    );
  }, [currentSession, totalToday, isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => {
    setIsRunning(false);
    setTotalToday((prev) => prev + currentSession);
    setCurrentSession(0);
    if (inactivityTimer) clearTimeout(inactivityTimer);
  };
  const handleToggle = () => (isRunning ? handlePause() : handleStart());

  // Timer increment
  useEffect(() => {
    let interval;
    if (isRunning)
      interval = setInterval(() => setCurrentSession((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Auto-save to backend every 1 min
  useEffect(() => {
    if (!studentId || !isRunning) return;
    const interval = setInterval(async () => {
      const minutesSpent = Math.floor(currentSession / 60);
      if (minutesSpent > 0) {
        try {
          await axios.post(`${url}/api/activity/log`, { studentId, minutesSpent });
          setCurrentSession(0);
        } catch (err) {
          console.error("Error saving time:", err);
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentSession, isRunning, studentId]);

  // ✅ Save progress on tab close but don't pause immediately
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        // Save current progress silently when tab changes
        const minutesSpent = Math.floor(currentSession / 60);
        if (minutesSpent > 0 && studentId) {
          await axios.post(`${url}/api/activity/log`, { studentId, minutesSpent });
          setCurrentSession(0);
        }

        // 👇 Instead of pausing immediately, mark the time they left
        sessionStorage.setItem("lastAwayTime", Date.now());
      } else {
        // 👁️ When they return, check if >10 minutes passed
        const lastAway = parseInt(sessionStorage.getItem("lastAwayTime"), 10);
        const now = Date.now();
        if (lastAway && now - lastAway > 10 * 60 * 1000) {
          // ⏸️ More than 10 minutes away — auto-pause
          handlePause();
        } else {
          // 🟢 Came back within 10 minutes — resume
          handleStart();
        }
      }
    };

    const handleBeforeUnload = async () => {
      const minutesSpent = Math.floor(currentSession / 60);
      if (minutesSpent > 0 && studentId)
        await axios.post(`${url}/api/activity/log`, { studentId, minutesSpent });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentSession, studentId]);



  // Fetch streak
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${url}/api/activity/${studentId}`);
        if (res.data.success && res.data.data) {
          const { totalTimeSpent, dailyLogs } = res.data.data;
          const savedData = JSON.parse(sessionStorage.getItem("studyTimer"));
          if (!savedData || savedData.totalToday === 0)
            setTotalToday(totalTimeSpent * 60);

          if (dailyLogs && dailyLogs.length > 0) {
            const sorted = dailyLogs.map((l) => new Date(l.date)).sort((a, b) => b - a);
            let streak = 1;
            for (let i = 0; i < sorted.length - 1; i++) {
              const diffDays = (sorted[i] - sorted[i + 1]) / (1000 * 60 * 60 * 24);
              if (diffDays === 1) streak++;
              else if (diffDays > 1) break;
            }
            setStreakDays(streak);
          } else setStreakDays(0);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (studentId) fetchActivity();
  }, [studentId]);

  // Auto pause if navigating away
  // 🔥 Handle tab change + route change with 10-minute grace period
  useEffect(() => {
    let tabAwayTimeout;

    const checkAllowedRoute = () => {
      return allowedRoutes.some((route) => {
        if (route.includes(":")) {
          const baseRoute = route.split("/:")[0];
          return location.pathname.startsWith(baseRoute);
        }
        return location.pathname === route || location.pathname === route + "/";
      });
    };

    const handleVisibilityChange = () => {
      const isAllowed = checkAllowedRoute();

      if (document.hidden) {
        // 👀 User switched to another tab
        if (tabAwayTimeout) clearTimeout(tabAwayTimeout);

        // Continue running for 10 minutes before pausing
        tabAwayTimeout = setTimeout(() => {
          if (isRunning) handlePause();
        }, 10 * 60 * 1000); // 10 minutes

      } else {
        // 👁️‍🗨️ User came back
        if (tabAwayTimeout) clearTimeout(tabAwayTimeout);
        if (isAllowed && !isRunning) handleStart();
      }
    };

    const handleRouteChange = () => {
      const isAllowed = checkAllowedRoute();
      if (!isAllowed && isRunning) handlePause();
      else if (isAllowed && !isRunning && !document.hidden) handleStart();
    };

    // Run once when page loads
    handleRouteChange();

    // Attach listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleRouteChange);
    window.addEventListener("blur", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleRouteChange);
      window.removeEventListener("blur", handleVisibilityChange);
      if (tabAwayTimeout) clearTimeout(tabAwayTimeout);
    };
  }, [location.pathname, isRunning]);


  // ✅ Fallback-safe stats
  const sDetails = [
    {
      name: "Enrolled Courses",
      no: dashboardData?.summary?.enrolledCourses?.total ?? 0,
      icons: IoBookSharp,
      sup: "All available courses",
    },
    {
      name: "Skill Rating",
      no: dashboardData?.summary?.skillRating ?? 0,
      icons: GiTargetShot,
      sup: "Based on your progress",
    },
    {
      name: "Assessments",
      no: `${dashboardData?.summary?.assessments?.completed ?? 0}/${dashboardData?.summary?.assessments?.total ?? 0
        }`,
      icons: MdAssessment,
      sup: "Completed assessments",
    },
    {
      name: "Live Webinars",
      no: dashboardData?.summary?.webinars?.total ?? 0,
      icons: MdLiveTv,
      sup: `${dashboardData?.summary?.webinars?.recorded ?? 0} recordings available`,
    },
    {
      name: "Learning Streak",
      no: `${streakDays || 0} days`,
      icons: FaFire,
      sup: streakDays > 3 ? "🔥 Keep it up!" : "Start learning daily!",
    },
  ];

  const courses = dashboardData?.lists?.courses ?? [];
  const assignments = dashboardData?.lists?.assessments ?? [];
  const user = student;

  return (
    <main>
      <DasboardHeader view={show2} setShow2={setShow2} userType={'student'}/>
      <section className="student-cover flex">
        <Dasnav min={show2} />
        <div className="s-details-cover w-full pt-30 p-5 bg-white">
          <div className="student-details">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || "Student"}
              </h1>
              <p className="text-gray-500">
                Continue your learning journey with courses and live webinars!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {sDetails.map((item, i) => {
                const Icon = item.icons;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{item.name}</span>
                      <Icon className="text-gray-500 text-lg" />
                    </div>
                    <div className="text-2xl font-bold mt-2">{item.no}</div>
                    <p className="text-sm text-gray-500 mt-auto">{item.sup}</p>
                  </div>
                );
              })}
            </div>

            {/* Timer + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Timer */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-gray-800 font-semibold mb-2">Daily Active Time</h2>
                <p className="text-gray-500 text-sm mb-4">Track your learning hours today</p>

                <div className="bg-blue-50 rounded-xl py-6 text-center mb-4">
                  <h3 className="text-gray-700 text-sm">Current Session</h3>
                  <p className="text-3xl font-mono font-bold text-blue-600">
                    {formatTime(currentSession)}
                  </p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Today</p>
                    <p className="font-mono font-bold text-lg">
                      {formatTime(totalToday + (isRunning ? currentSession : 0))}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                    {calculateHours(totalToday + (isRunning ? currentSession : 0))}h
                  </span>
                </div>

                <div className="timer-bts flex gap-2">
                  <button
                    onClick={handleToggle}
                    className={`flex items-center justify-center w-full font-semibold py-2 rounded-xl transition ${isRunning
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                  >
                    {isRunning ? (
                      <>
                        <BsPauseCircle className="mr-2 text-lg" /> Pause Timer
                      </>
                    ) : (
                      <>
                        <BsPlayCircle className="mr-2 text-lg" /> Start Timer
                      </>
                    )}
                  </button>
                  <button
                    onClick={handlePause}
                    className="p-3 bg-gray-100 rounded-xl"
                  >
                    <LuTimerReset className="text-lg" />
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Timer pauses automatically after inactivity
                </p>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-gray-800 font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/student/assessment")}
                    className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2"
                  >
                    <FaCheckCircle /> <span>View Assessments</span>
                  </button>
                  <button
                    onClick={() => navigate("/student/skillrating")}
                    className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2"
                  >
                    <GiTargetShot /> <span>Skill Rating</span>
                  </button>
                  <button
                    onClick={() => navigate("/student/achievements")}
                    className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2"
                  >
                    <FaCheckCircle /> <span>Achievements</span>
                  </button>
                  <button
                    onClick={() => navigate("/student/support")}
                    className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2"
                  >
                    <FaCheckCircle /> <span>Get Support</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Courses + Upcoming */}
            <div className="stud-bot w-full flex flex-col lg:flex-row gap-2 mt-6">
            <div className="student-bot w-full flex gap-2 mt-6">
              {/* Courses */}
              <div className="c-details pt-2 w-full lg:w-2/3">
                <div className="c-head flex justify-between p-4">
                  <h2 className="text-3xl font-bold">Continue Learning</h2>
                  <button className="border border-gray-200 hover:bg-green-600 hover:text-white transition rounded-xl py-2 font-medium flex items-center justify-center space-x-2 p-3">
                    <FaFilter /> <span>Filter</span>
                  </button>
                </div>

                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                    {courses.map((course) => (
                      <div
                        key={course._id}
                        className="bg-white card-box shadow-md rounded-3xl overflow-hidden"
                      >
                        <img
                          src={course.thumbnail || Code}
                          alt="course"
                          className="w-full h-60 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">
                            {course.courseTitle || "Untitled Course"}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {course.courseCategory || "General"} •{" "}
                            {course.courseLevel || "Beginner"}
                          </p>
                          <a
                            onClick={() =>
                              navigate(`/student/mycourses/videoplayer/${course._id}`)
                            }
                            className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-6 mb-5 cursor-pointer"
                          >
                            Continue Learning
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 p-5">No courses available.</p>
                )}
              </div>

              {/* Upcoming */}
              <div className="c-upcome flex flex-col pt-8 gap-5 p-3 w-full lg:w-1/3">
                <h1 className="text-2xl font-bold pb-5">Upcoming</h1>
                {assignments.length > 0 ? (
                  assignments.map((item, i) => (
                    <div
                      key={i}
                      className="upcome-box flex flex-col bg-white rounded-3xl border border-gray-300 p-4 w-full"
                    >
                      <div className="flex justify-between mb-3">
                        <span>
                          <small className="bg-gray-400 text-white px-3 py-1 rounded-xl">
                            Pending
                          </small>
                        </span>
                        <span>
                          <small className="bg-yellow-500 text-white px-3 py-1 rounded-xl">
                            New
                          </small>
                        </span>
                      </div>
                      <h4 className="mb-1">{item.title || "Untitled Assessment"}</h4>
                      <small className="text-gray-400 mb-3">
                        {item.courseName || "General Course"}
                      </small>
                      <button
                        onClick={() => navigate(`/student/assessment`)}
                        className="w-full bg-blue-500 text-white hover:bg-blue-800 p-1 rounded-2xl font-bold"
                      >
                        Start Assessment
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No pending assessments 🎯</p>
                )}

              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
