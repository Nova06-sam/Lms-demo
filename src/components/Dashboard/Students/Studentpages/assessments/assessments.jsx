// import React, { useState, useEffect } from "react";
// import { FaRegCirclePlay } from "react-icons/fa6";
// import { IoBookOutline } from "react-icons/io5";
// import { LiaCheckCircle } from "react-icons/lia";
// import { CiTrophy } from "react-icons/ci";
// import { MdErrorOutline } from "react-icons/md";
// import { GoClock } from "react-icons/go";
// import { Link, useNavigate } from "react-router-dom";
// import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
// import axios from "axios";
// import { url } from "../../../../../config";
// import "./assessments.css";

// export default function Assessments() {
//   const backend_url = url;
//   const navigate = useNavigate();

//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [pendingFile, setPendingFile] = useState(null);
//   const [pendingAssessment, setPendingAssessment] = useState(null);
//   const [pendingType, setPendingType] = useState(null);


//   const [click, setClick] = useState("Available");
//   const [assessments, setAssessments] = useState([]);
//   const [card, setCard] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [selectedAssessment, setSelectedAssessment] = useState(null);

//   const totalAvailable = assessments.filter(a => a.status === "published").length;
//   const totalCompleted = assessments.filter(a => a.status === "completed").length;
//   const totalPending = assessments.filter(a => a.status === "draft").length;


//   // ✅ Fetch assessments from backend and compute dashboard cards dynamically
//   useEffect(() => {
//     const fetchAssessments = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const [assessRes, submitRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/assessments/all`),
//           axios.get(`http://localhost:5000/api/submissions/student/${user?._id}`)
//         ]);

//         if (assessRes.data.success) {
//           setSubmissions(submitRes.data.data || []);
//           const completedIds = submitRes.data.data.map((s) => s.assessmentId);

//           const fetched = assessRes.data.data.map((item) => {
//             const submission = submitRes.data.data.find((s) => s.assessmentId === item._id);
//             return {
//               id: item._id,
//               title: item.title,
//               course: item.course || "Unassigned",
//               type: item.assessmentType,
//               duration: `${item.durationMinutes || 0} mins`,
//               score: item.maxScore || 0,
//               status: completedIds.includes(item._id)
//                 ? "completed" 
//                 : item.status === "published"
//                   ? "published"
//                   : "draft",
//               performance: submission?.score || null, // 👈 real performance
//               feedback: submission?.feedback || "No feedback yet",
//               submittedAt: submission?.submittedAt,
//              grade: submission?.grade,

//              correctAnswers: submission?.correctAnswers,
//     totalQuestions: submission?.totalQuestions,
//     timeTaken: submission?.timeTaken,
//     marks:submission?.marks,

//      // ADD THIS ↓↓↓↓↓
//     answers: submission?.answers || [],
//     passed: submission?.passed || false              
              
//             };
//           });

//           setAssessments(fetched);
//           console.log(assessRes.data)

//         }

//       } catch (error) {
//         console.error("Error fetching assessments:", error);
//       }
//     };

//     fetchAssessments();
//   }, []);


//   const handleFileUpload = async (e, assessmentId, type, assesmentCourse, assesmentTitle) => {
//     const file = e.target.files[0];
//     if (!file) return;


//     const allowedTypes = ["application/pdf", "text/plain", "application/zip"];
//     if (!allowedTypes.includes(file.type)) {
//       alert("Please upload only .pdf, .txt, or .zip files");
//       return;
//     }


//     const user = JSON.parse(localStorage.getItem("user"));
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("studentId", user?._id);
//     formData.append("studentName", user?.name || "Unknown");
//     formData.append("studentEmail", user?.email || "unknown@gmail.com");
//     formData.append("assessmentId", assessmentId);
//     formData.append("assessmentType", type);
//     formData.append("assesmentCourse", assesmentCourse)
//     formData.append("assesmentTitle", assesmentTitle)

//     try {
//       const res = await axios.post(`http://localhost:5000/api/submissions/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         alert("✅ File uploaded successfully!");
//       } else {
//         alert("❌ Upload failed, please try again.");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Error uploading file.");
//     }
//   };

//   const confirmUpload = async () => {
//     if (!pendingFile) return;

//     const allowedTypes = ["application/pdf", "text/plain", "application/zip"];
//     if (!allowedTypes.includes(pendingFile.type)) {
//       alert("Please upload only .pdf, .txt, or .zip files");
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem("user"));
//     const formData = new FormData();
//     formData.append("file", pendingFile);
//     formData.append("studentId", user?._id);
//     formData.append("studentName", user?.name || "Unknown");
//     formData.append("studentEmail", user?.email || "unknown@gmail.com");
//     formData.append("assessmentId", pendingAssessment);
//     formData.append("assessmentType", pendingType);

//     try {
//       const res = await axios.post(`http://localhost:5000/api/submissions/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         alert("✅ File uploaded successfully!");
//       } else {
//         alert("❌ Upload failed, please try again.");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Error uploading file.");
//     }

//     // Close modal
//     setShowUploadModal(false);
//     setPendingFile(null);
//     setPendingAssessment(null);
//     setPendingType(null);
//   };




//   // ✅ Filter buttons
//   const buttons = [
//     { label: "Available", status: "published", count: totalAvailable },
//     { label: "Completed", status: "completed", count: totalCompleted },
//     { label: "Upcomming", status: "draft", count: totalPending },
//   ];

//   // ✅ Filter data by current tab
//   const filteredAssessments = assessments.filter(
//     (a) =>
//       (click === "Available" && a.status === "published") ||
//       (click === "Completed" && a.status === "completed") ||
//       (click === "Upcomming" && a.status === "draft")
//   );

//   return (
//     <div className="p-5 sm:p-10 bg-gray-100 min-h-screen">
//       <BackToDashboard />

//       {/* Title */}
//       <div className="mt-10">
//         <h1 className="text-3xl sm:text-4xl font-semibold">
//           Assessments & Evaluations
//         </h1>
//         <p className="text-gray-500 mt-2 text-sm sm:text-base">
//           Complete assessments to track your progress and earn skill ratings.
//         </p>
//       </div>

//       {/* Dashboard Cards */}
//       <div className="main-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
//         {card.map((item) => (
//           <div
//             key={item.id}
//             className="border border-gray-200 shadow-md bg-white p-5 rounded-xl h-40 hover:shadow-lg transition"
//           >
//             <div className="flex justify-between items-center">
//               <p className="text-lg font-medium">{item.title}</p>
//               <span className="text-2xl text-blue-600">{item.icon}</span>
//             </div>

//             <h1 className="text-3xl py-3 font-semibold">{item.number}</h1>

//             {typeof item.text === "string" ? (
//               <p className="text-sm text-gray-500">{item.text}</p>
//             ) : (
//               <div className="text-sm text-gray-500">{item.text}</div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Filter Buttons */}
//       <div className="Filter-Buttons flex flex-wrap gap-2 sm:gap-4 mt-10 bg-gray-200 rounded-full w-fit px-3 py-2">
//         {buttons.map((btn) => (
//           <button
//             key={btn.label}
//             onClick={() => setClick(btn.label)}
//             className={`btn rounded-full px-5 py-1.5 text-sm sm:text-base font-medium transition ${click === btn.label ? "bg-white shadow-md" : "hover:bg-white"
//               }`}
//           >
//             {btn.label} ({btn.count})
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="mt-6 space-y-5">
//         {filteredAssessments.length === 0 ? (
//           <p className="text-gray-500">No assessments found for this category.</p>
//         ) : (
//           filteredAssessments.map((data) => (
//             <div
//               key={data.id}
//               className="p-5 sm:p-7 bg-white rounded-xl shadow-sm hover:shadow-md"
//             >
//               <div className="flex flex-col md:flex-row justify-between gap-4">
//                 <div className="flex items-start gap-3">
//                   <div className="p-3 shadow-xl rounded-2xl text-2xl text-white bg-blue-500">
//                     <LiaCheckCircle />
//                   </div>
//                   <div>
//                     <h1 className="text-lg sm:text-xl font-semibold">
//                       {data.title}
//                     </h1>
//                     <p className="text-gray-600 text-sm sm:text-base">
//                       {data.course}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Available */}
//                 {click === "Available" && (
//                   <div className="flex flex-wrap justify-start md:justify-end gap-3">
//                     <span className="text-sm bg-green-400 rounded-full py-1 px-3 text-white mt-6">
//                       Available
//                     </span>
//                     {data.type === "MCQ" ? (
//                       <Link
//                         to={`/student/assessment/quiz/${data.id}`}
//                         className="flex items-center gap-2 text-sm sm:text-base bg-blue-500 rounded-xl text-white px-4 py-1 hover:bg-blue-600"
//                       >
//                         <FaRegCirclePlay />
//                         Start Assessment
//                       </Link>
//                     ) : (data.type === "Subjective" || data.type === "Coding") && (
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//                         <div>
//                           <label htmlFor={`upload-${data.id}`} className="block text-sm text-gray-600 mb-1">
//                             Upload your {data.type} answer:
//                           </label>
//                           <input
//                             id={`upload-${data.id}`}
//                             type="file"
//                             accept=".pdf,.txt,.zip"
//                             onChange={(e) => handleFileUpload(e, data.id, data.type, data.course, data.title)}

//                             // onChange={(e) => {
//                             //     const file = e.target.files[0];
//                             //     if (!file) return;

//                             //     setPendingFile(file);
//                             //     setPendingAssessment(data.id);
//                             //     setPendingType(data.type);
//                             //     setShowUploadModal(true);
//                             // }}

//                             className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer hover:border-blue-400 transition"
//                           />
//                         </div>
//                       </div>
//                     )}



//                   </div>
//                 )}

//                 {/* Completed */}
//                 {click === "Completed" && (
//                   <div className="text-right">

//                     <p className="text-sm text-gray-600">{data.status}</p>
//                     <button
//                       onClick={() => {
//                         const submission = submissions.find(
//                           (s) => s.assessmentId === data.id
//                         );
//                         if (submission) {
//                           setSelectedAssessment({ ...data, submission });
//                         } else {
//                           alert("No submission details found!");
//                         }
//                       }}
//                       className="text-sm border border-gray-300 bg-gray-100 rounded-full px-4 py-1 mt-1 hover:bg-gray-200"
//                     >
//                       View Details
//                     </button>

//                   </div>
//                 )}


//                 {/* Pending Review */}
//                 {click === "Pending Review" && (
//                   <div className="flex justify-end">
//                     <div className="flex gap-1 text-sm bg-yellow-500 rounded-xl text-white px-4 py-1 items-center">
//                       <GoClock />
//                       <p>Under Review</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {click === "Pending Review" && (
//                 <p className="mt-4 text-gray-700 text-sm sm:text-base">
//                   Your submission is being reviewed by the trainer.
//                 </p>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//       {selectedAssessment && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 overflow-auto">
//           <div className="bg-white rounded-xl shadow-xl w-11/12 sm:w-2/3 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setSelectedAssessment(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//             >
//               ✖
//             </button>

//             <h2 className="text-2xl font-semibold mb-2 text-blue-600">
//               {selectedAssessment.title}
//             </h2>
//             <p className="text-gray-600 mb-4">{selectedAssessment.course}</p>

//             {/* Summary */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-5">
//               <div className="bg-gray-50 p-3 rounded-lg border">
//                 <b>Student:</b>
//                 <p>{selectedAssessment.submission.studentName}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg border">
//                 <b>Email:</b>
//                 <p>{selectedAssessment.submission.studentEmail}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg border">
//                 <b>Score:</b>
//                 {/* <p>{selectedAssessment.correctAnswers} / {selectedAssessment.totalQuestions}</p> */}
//                 <p>{selectedAssessment.marks}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg border">
//                 <b>Grade:</b>
//                 <p>{selectedAssessment.submission.grade}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg border">
//                 <b>Time Taken:</b>
//                 <p>{selectedAssessment.timeTaken}s</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg border">
//                 <b>Status:</b>
//                 <p className={selectedAssessment.submission.passed ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
//                   {selectedAssessment.submission.passed ? "Passed" : "Failed"}
//                 </p>
//               </div>
//             </div>

//             {/* Submitted time */}
//             <p className="text-gray-500 text-sm mb-4">
//               Submitted at:{" "}
//               {new Date(selectedAssessment.submission.submittedAt).toLocaleString()}
//             </p>

//             {/* Question Breakdown */}
//             <h3 className="text-lg font-semibold mb-2">Answer Details</h3>
//             <div className="space-y-3">
//               {selectedAssessment.answers.map((ans, idx) => (
//                 <div
//                   key={ans._id}
//                   className={`p-4 rounded-lg border ${ans.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"}`}
//                 >
//                   <p className="font-medium text-gray-800">
//                     Q{idx + 1}. {ans.questionText}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <b>Correct Answer:</b> {ans.correctAnswer}
//                   </p>
//                   <p
//                     className={`mt-1 text-sm font-semibold ${ans.isCorrect ? "text-green-600" : "text-red-600"
//                       }`}
//                   >
//                     {ans.isCorrect ? "✅ Correct" : "❌ Incorrect"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {showUploadModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 sm:w-96">
//             <h2 className="text-lg font-semibold mb-3">Confirm Upload</h2>
//             <p className="text-gray-600 mb-5">
//               Are you sure you want to upload <b>{pendingFile?.name}</b>?
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 className="px-4 py-2 rounded-lg border"
//                 onClick={() => setShowUploadModal(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//                 onClick={() => confirmUpload()}
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { LiaCheckCircle } from "react-icons/lia";
import { CiTrophy } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
import axios from "axios";
// // import BACKEND_URL from "../../../../../api/Api";
import "./assessments.css";

export default function Assessments() {
  // const BACKEND_URL = url;
  const navigate = useNavigate();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingAssessment, setPendingAssessment] = useState(null);
  const [pendingType, setPendingType] = useState(null);

  const [click, setClick] = useState("Available");
  const [assessments, setAssessments] = useState([]);
  const [card, setCard] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch assessments and submissions
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const studentId = user?._id;

        const [assessRes, submitRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/assessments/all`),
          axios.get(`http://localhost:5000/api/submissions/student/${studentId}`)
        ]);

        // Get completed assessment IDs
        const completedIds = submitRes.data?.data?.map(s => s.assessmentId) || [];
        
        // Process assessments with submission data
        const fetchedAssessments = assessRes.data?.data?.map(item => {
          const submission = submitRes.data?.data?.find(s => s.assessmentId === item._id);
          const isCompleted = completedIds.includes(item._id);
          
          return {
            id: item._id,
            title: item.title,
            course: item.course || "Unassigned",
            type: item.assessmentType,
            duration: `${item.durationMinutes || 0} mins`,
            maxScore: item.maxScore || 0,
            status: item.status || "draft",
            isCompleted: isCompleted,
            submission: submission || null,
            performance: submission?.score || null,
            grade: submission?.grade || "Not graded",
            correctAnswers: submission?.correctAnswers || 0,
            totalQuestions: submission?.totalQuestions || 0,
            timeTaken: submission?.timeTaken || 0,
            marks: submission?.marks || 0,
            passed: submission?.passed || false,
            answers: submission?.answers || [],
            submittedAt: submission?.submittedAt
          };
        }) || [];

        setAssessments(fetchedAssessments);
        setSubmissions(submitRes.data?.data || []);
        
        // Update card statistics
        const totalAvailable = fetchedAssessments.filter(a => 
          a.status === "published" && !a.isCompleted
        ).length;
        const totalCompleted = fetchedAssessments.filter(a => a.isCompleted).length;
        const totalUpcoming = fetchedAssessments.filter(a => 
          a.status === "draft" || a.status === "scheduled"
        ).length;

        setCard([
          {
            id: 1,
            title: "Available Assessments",
            number: totalAvailable,
            icon: <IoBookOutline />,
            text: "Ready to take"
          },
          {
            id: 2,
            title: "Completed",
            number: totalCompleted,
            icon: <LiaCheckCircle />,
            text: "Finished assessments"
          },
          {
            id: 3,
            title: "Upcoming",
            number: totalUpcoming,
            icon: <GoClock />,
            text: "Scheduled for later"
          },
          {
            id: 4,
            title: "Success Rate",
            number: totalCompleted > 0 
              ? `${Math.round((fetchedAssessments.filter(a => a.passed).length / totalCompleted) * 100)}%`
              : "0%",
            icon: <CiTrophy />,
            text: "Pass rate"
          }
        ]);

      } catch (error) {
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  // ✅ Filter buttons with dynamic counts
  const buttons = [
    { 
      label: "Available", 
      status: "available", 
      count: assessments.filter(a => a.status === "published" && !a.isCompleted).length 
    },
    { 
      label: "Completed", 
      status: "completed", 
      count: assessments.filter(a => a.isCompleted).length 
    },
    { 
      label: "Upcoming", 
      status: "upcoming", 
      count: assessments.filter(a => a.status === "draft" || a.status === "scheduled").length 
    },
  ];

  // ✅ Filter assessments based on current tab
  const filteredAssessments = assessments.filter(a => {
    if (click === "Available") {
      return a.status === "published" && !a.isCompleted;
    } else if (click === "Completed") {
      return a.isCompleted;
    } else if (click === "Upcoming") {
      return a.status === "draft" || a.status === "scheduled";
    }
    return false;
  });

  const handleFileUpload = async (e, assessmentId, type, course, title) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "text/plain", "application/zip"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload only .pdf, .txt, or .zip files");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentId", user?._id);
    formData.append("studentName", user?.name || "Unknown");
    formData.append("studentEmail", user?.email || "unknown@gmail.com");
    formData.append("assessmentId", assessmentId);
    formData.append("assessmentType", type);
    formData.append("assesmentCourse", course);
    formData.append("assesmentTitle", title);

    try {
      const res = await axios.post(`http://localhost:5000/api/submissions/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("✅ File uploaded successfully!");
        // Refresh assessments to update status
        window.location.reload();
      } else {
        toast.error("❌ Upload failed, please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading file.");
    }
  };

  // Handle refresh after assessment completion
  const refreshAssessments = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const [assessRes, submitRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/assessments/all`),
        axios.get(`http://localhost:5000/api/submissions/student/${user?._id}`)
      ]);

      const completedIds = submitRes.data?.data?.map(s => s.assessmentId) || [];
      const updatedAssessments = assessRes.data?.data?.map(item => ({
        ...item,
        isCompleted: completedIds.includes(item._id)
      })) || [];

      setAssessments(updatedAssessments);
    } catch (error) {
      console.error("Error refreshing assessments:", error);
    }
  };

  // Check URL for completion status
  useEffect(() => {
    const checkCompletionStatus = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const completed = urlParams.get('completed');
      if (completed === 'true') {
        refreshAssessments();
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    checkCompletionStatus();
  }, []);

  return (
    <div className="p-5 sm:p-10 bg-gray-100 min-h-screen">
      <BackToDashboard />

      {/* Title */}
      <div className="mt-10">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Assessments & Evaluations
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Complete assessments to track your progress and earn skill ratings.
        </p>
      </div>

      {/* Dashboard Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="main-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {card.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 shadow-md bg-white p-5 rounded-xl h-40 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">{item.title}</p>
                  <span className="text-2xl text-blue-600">{item.icon}</span>
                </div>
                <h1 className="text-3xl py-3 font-semibold">{item.number}</h1>
                <p className="text-sm text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="Filter-Buttons flex flex-wrap gap-2 sm:gap-4 mt-10 bg-gray-200 rounded-full w-fit px-3 py-2">
            {buttons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => setClick(btn.label)}
                className={`btn rounded-full px-5 py-1.5 text-sm sm:text-base font-medium transition ${
                  click === btn.label 
                    ? "bg-white shadow-md text-blue-600" 
                    : "hover:bg-white hover:text-gray-800 text-gray-600"
                }`}
              >
                {btn.label} ({btn.count})
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 space-y-5">
            {filteredAssessments.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {click === "Available" ? "No Available Assessments" :
                   click === "Completed" ? "No Completed Assessments" :
                   "No Upcoming Assessments"}
                </h3>
                <p className="text-gray-500">
                  {click === "Available" 
                    ? "All assessments have been completed. Check the Completed tab to view results."
                    : click === "Completed"
                    ? "You haven't completed any assessments yet. Check the Available tab."
                    : "No upcoming assessments scheduled."
                  }
                </p>
              </div>
            ) : (
              filteredAssessments.map((data) => (
                <div
                  key={data.id}
                  className="p-5 sm:p-7 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 shadow-xl rounded-2xl text-2xl text-white ${
                        data.isCompleted ? "bg-green-500" : "bg-blue-500"
                      }`}>
                        {data.isCompleted ? <LiaCheckCircle /> : <IoBookOutline />}
                      </div>
                      <div>
                        <h1 className="text-lg sm:text-xl font-semibold">
                          {data.title}
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {data.course}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {data.type}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {data.duration}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Max Score: {data.maxScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Available Assessments */}
                    {click === "Available" && !data.isCompleted && (
                      <div className="flex flex-wrap justify-start md:justify-end gap-3 items-center">
                        <span className="text-sm bg-green-100 text-green-700 rounded-full py-1 px-3 font-medium">
                          Available
                        </span>
                        {data.type === "MCQ" ? (
                          <Link
                            to={`/student/assessment/quiz/${data.id}`}
                            className="flex items-center gap-2 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-2 transition"
                          >
                            <FaRegCirclePlay />
                            Start Assessment
                          </Link>
                        ) : (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div>
                              <label htmlFor={`upload-${data.id}`} className="block text-sm text-gray-600 mb-1">
                                Upload your {data.type} answer:
                              </label>
                              <input
                                id={`upload-${data.id}`}
                                type="file"
                                accept=".pdf,.txt,.zip"
                                onChange={(e) => handleFileUpload(e, data.id, data.type, data.course, data.title)}
                                className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer hover:border-blue-400 transition"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Completed Assessments */}
                    {click === "Completed" && data.isCompleted && (
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm rounded-full py-1 px-3 font-medium ${
                            data.passed 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {data.passed ? "Passed" : "Failed"}
                          </span>
                          <span className="text-sm bg-blue-100 text-blue-700 rounded-full py-1 px-3">
                            Score: {data.marks}/{data.maxScore}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedAssessment(data)}
                          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-4 py-2 transition"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {/* Upcoming Assessments */}
                    {click === "Upcoming" && (
                      <div className="flex justify-end">
                        <div className="flex gap-2 text-sm bg-yellow-100 text-yellow-700 rounded-xl px-4 py-2 items-center">
                          <GoClock />
                          <p>Scheduled</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Assessment Details Modal */}
          {selectedAssessment && selectedAssessment.submission && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 overflow-auto p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setSelectedAssessment(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                  ✖
                </button>

                <h2 className="text-2xl font-semibold mb-2 text-blue-600">
                  {selectedAssessment.title}
                </h2>
                <p className="text-gray-600 mb-4">{selectedAssessment.course}</p>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-5">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <b>Student:</b>
                    <p className="truncate">{selectedAssessment.submission.studentName}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <b>Score:</b>
                    <p className="text-lg font-semibold">
                      {selectedAssessment.marks}/{selectedAssessment.maxScore}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <b>Grade:</b>
                    <p className={`text-lg font-semibold ${
                      selectedAssessment.grade === "A" ? "text-green-600" :
                      selectedAssessment.grade === "B" ? "text-blue-600" :
                      selectedAssessment.grade === "C" ? "text-yellow-600" :
                      selectedAssessment.grade === "D" ? "text-orange-600" :
                      "text-red-600"
                    }`}>
                      {selectedAssessment.grade}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <b>Status:</b>
                    <p className={`font-medium ${
                      selectedAssessment.passed ? "text-green-600" : "text-red-600"
                    }`}>
                      {selectedAssessment.passed ? "✅ Passed" : "❌ Failed"}
                    </p>
                  </div>
                </div>

                {/* Detailed Results */}
                {selectedAssessment.type === "MCQ" && selectedAssessment.answers.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-3 border-b pb-2">Question Analysis</h3>
                    <div className="space-y-3 mb-6">
                      {selectedAssessment.answers.map((ans, idx) => (
                        <div
                          key={ans._id || idx}
                          className={`p-4 rounded-lg border ${
                            ans.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
                          }`}
                        >
                          <p className="font-medium text-gray-800 mb-2">
                            Q{idx + 1}. {ans.questionText}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <b>Your Answer:</b>
                              <p className={ans.isCorrect ? "text-green-600" : "text-red-600"}>
                                {ans.selectedAnswer}
                              </p>
                            </div>
                            <div>
                              <b>Correct Answer:</b>
                              <p className="text-green-600">{ans.correctAnswer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Submission Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Submission Details</h4>
                  <div className="text-sm text-gray-600">
                    <p><b>Submitted at:</b> {new Date(selectedAssessment.submittedAt).toLocaleString()}</p>
                    <p><b>Time Taken:</b> {selectedAssessment.timeTaken} seconds</p>
                    <p><b>Correct Answers:</b> {selectedAssessment.correctAnswers} out of {selectedAssessment.totalQuestions}</p>
                    {selectedAssessment.submission.feedback && (
                      <p className="mt-2"><b>Feedback:</b> {selectedAssessment.submission.feedback}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}