import React, { useState, useEffect } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LiaCheckCircle } from "react-icons/lia";
import { GoClock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { url } from "../../../../../../../config";

export default function Assessments({ courseTitle }) {
  // const backend_url = url;
  const navigate = useNavigate();

  const [click, setClick] = useState("Available");
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [summary, setSummary] = useState({});

  // ✅ Fetch all assignments (pending + completed) for this course & student
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
      const user = JSON.parse(localStorage.getItem("user"));

const res = await axios.post(`http://localhost:5000/api/assessments/course/student`, {
  courseTitle: courseTitle,
  studentId: user._id,
});



        if (res.data.success) {
          // Combine pending + completed into single array
          const all = [
            ...res.data.completed.map((a) => ({ ...a, status: "completed" })),
            ...res.data.pending.map((a) => ({ ...a, status: "published" })),
          ];
          setAssessments(all);
          setSummary({
            total: res.data.total,
            completed: res.data.completedCount,
            pending: res.data.pendingCount,
          });
        }
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching student course assignments:", error);
      }
    };

    fetchAssessments();
  }, [courseTitle]);

  // ✅ Handle file upload for Subjective/Coding
  const handleFileUpload = async (e, assessmentId, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "text/plain", "application/zip"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only .pdf, .txt, or .zip files");
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

    try {
      const res = await axios.post(`http://localhost:5000/api/submissions/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ File uploaded successfully!");
        window.location.reload(); // optional auto-refresh
      } else {
        alert("❌ Upload failed, please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file.");
    }
  };

  // ✅ Filter buttons
  const buttons = [
    { label: "Available", status: "published" },
    { label: "Completed", status: "completed" },
  ];

  // ✅ Filter data by current tab
  const filteredAssessments = assessments.filter(
    (a) =>
      (click === "Available" && a.status === "published") ||
      (click === "Completed" && a.status === "completed")
  );

  return (
    <div className="p-5 sm:p-10 bg-gray-100 min-h-screen">
      {/* Summary Info */}
      <div className="flex gap-6 mb-6 text-gray-700">
        <p>Total: <b>{summary.total || 0}</b></p>
        <p>Completed: <b className="text-green-600">{summary.completed || 0}</b></p>
        <p>Pending: <b className="text-yellow-600">{summary.pending || 0}</b></p>
      </div>

      {/* Filter Buttons */}
      <div className="Filter-Buttons flex flex-wrap gap-2 sm:gap-4 mt-4 bg-gray-200 rounded-full w-fit px-3 py-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => setClick(btn.label)}
            className={`btn rounded-full px-5 py-1.5 text-sm sm:text-base font-medium transition ${
              click === btn.label ? "bg-white shadow-md" : "hover:bg-white"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 space-y-5">
        {filteredAssessments.length === 0 ? (
          <p className="text-gray-500">No assessments found for this category.</p>
        ) : (
          filteredAssessments.map((data) => (
            <div
              key={data.id}
              className="p-5 sm:p-7 bg-white rounded-xl shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 shadow-xl rounded-2xl text-2xl text-white bg-blue-500">
                    <LiaCheckCircle />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-semibold">
                      {data.title}
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {data.course}
                    </p>
                  </div>
                </div>

                {/* Available */}
                {click === "Available" && (
                  <div className="flex flex-wrap justify-start md:justify-end gap-3">
                    <span className="text-sm bg-green-400 rounded-full py-1 px-3 text-white mt-6">
                      Available
                    </span>

                    {data.type === "MCQ" ? (
                      <Link
                        to={`/student/assessment/quiz/${data.id}`}
                        className="flex items-center gap-2 text-sm sm:text-base bg-blue-500 rounded-xl text-white px-4 py-1 hover:bg-blue-600"
                      >
                        <FaRegCirclePlay />
                        Start Assessment
                      </Link>
                    ) : (data.type === "Subjective" || data.type === "Coding") && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div>
                          <label htmlFor={`upload-${data.id}`} className="block text-sm text-gray-600 mb-1">
                            Upload your {data.type} answer:
                          </label>
                          <input
                            id={`upload-${data.id}`}
                            type="file"
                            accept=".pdf,.txt,.zip"
                            onChange={(e) => handleFileUpload(e, data.id, data.type)}
                            className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer hover:border-blue-400 transition"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Completed */}
                {click === "Completed" && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Completed</p>
                    <button
                      onClick={() => setSelectedAssessment(data)}
                      className="text-sm border border-gray-300 bg-gray-100 rounded-full px-4 py-1 mt-1 hover:bg-gray-200"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Details Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white rounded-xl shadow-xl w-11/12 sm:w-2/3 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-5">
              <div className="bg-gray-50 p-3 rounded-lg border">
                <b>Type:</b>
                <p>{selectedAssessment.type}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border">
                <b>Submitted:</b>
                <p>{new Date(selectedAssessment.submittedAt).toLocaleString()}</p>
              </div>
              {selectedAssessment.percentage && (
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <b>Percentage:</b>
                  <p>{selectedAssessment.percentage}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



