import React, { useRef, useState, useEffect, useMemo } from "react";
import { FaRegEdit, FaEye, FaClock } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
import axios from "axios"
// // import BACKEND_URL from "../../../../../api/Api";
import { data } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";

/* ---------- helpers (logic-only) ---------- */
const COURSE_LABELS = {
  react: "Complete React Development",
  node: "Node & Express",
  dsa: "DSA Basics",
};



const formatDuration = (m) => {
  const mins = Number(m) || 0;
  if (mins >= 60 && mins % 60 === 0) {
    const h = mins / 60;
    return `${h} ${h === 1 ? "hour" : "hours"}`;
  }
  return `${mins} mins`;
};

/* ---------- Desktop Header ---------- */
function DesktopHeader() {
  return (
    <div className="flex items-center justify-between gap-4 md:gap-6 w-full">
      <div className="a-txt">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Assessment Management
        </h1>
        <p className="mt-2 text-slate-500">
          Create, manage, and grade assessments for your students
        </p>
      </div>
      <div className="abtn">
          <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            // reset fields for fresh create
            setTitle("");
            setCourse("");
            setAssessmentType("MCQ");
            setQuestions([]);
            toastInfo("Opening form...");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2.5 text-white text-sm font-semibold hover:bg-green-600 shadow-sm md:px-5 md:py-2.5 transition-colors"
        >
          <span className="text-lg leading-none">＋</span>
          <span className="hidden sm:inline">Create Assessment</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>
    </div>
  );
}



/* ---------- Question Editors ---------- */
function MCQQuestionEditor({ q, onChange, onRemove }) {
  const MAX_OPTIONS = 4;

  const update = (patch) => onChange(q.id, { ...q, ...patch });

  const handleOptionChange = (idx, value) => {
    const next = [...(q.options || [])];
    next[idx] = value;
    update({ options: next });
  };

  const addOption = () => {
    if ((q.options || []).length >= MAX_OPTIONS) return;
    update({ options: [...(q.options || []), ""] });
  };

  const removeOption = (idx) => {
    const next = (q.options || []).filter((_, i) => i !== idx);
    update({ options: next });
  };




  return (
    <div className="rounded-2xl border  border-blue-100 bg-blue-50/40 px-4 py-4 sm:px-5 sm:py-5 pt-15">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
            MCQ Question
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Type your question, add up to <b>4</b> options, then specify the
            answer.
          </p>

          <div className="mt-4 space-y-3">
            <Field label="Question">
              <input
                type="text"
                value={q.text}
                onChange={(e) => update({ text: e.target.value })}
                placeholder="e.g., What does React use to efficiently update the UI?"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Field>

            {/* Options */}
            <div className="space-y-2">
              <div className="mb-1.5 text-sm font-medium text-slate-700">
                Options ({(q.options || []).length}/4)
              </div>
              <div className="space-y-2">
                {(q.options || []).map((opt, idx) => (
                  <div
                    key={`${q.id}-opt-${idx}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(idx)}
                      className="shrink-0 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
                      aria-label="Remove option"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addOption}
                disabled={(q.options || []).length >= MAX_OPTIONS}
                className={[
                  "mt-2 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold shadow-sm transition-colors",
                  (q.options || []).length >= MAX_OPTIONS
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700",
                ].join(" ")}
              >
                ＋ Add Option
              </button>
            </div>

            {/* Answer */}
            <Field label="Answer">
              <input
                type="text"
                value={q.answer || ""}
                onChange={(e) => update({ answer: e.target.value })}
                placeholder="Type the correct answer"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Field>

            <p className="text-xs text-slate-500">
              Tip: You can add multiple MCQ questions. The “Answer” can be free
              text.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end sm:justify-center">
          <button
            type="button"
            onClick={() => onRemove(q.id)}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Remove Question
          </button>
        </div>
      </div>
    </div>
  );
}

function SimpleQuestionEditor({ q, onChange, onRemove, label = "Question" }) {
  const update = (patch) => onChange(q.id, { ...q, ...patch });

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
            {q.type} Question
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Click “Add Question” to add your Questions.
          </p>

          <div className="mt-4 space-y-3">
            <Field label={label}>
              <input
                type="text"
                value={q.text}
                onChange={(e) => update({ text: e.target.value })}
                // placeholder={`Type your ${q.type.toLowerCase()} prompt`}
                placeholder={`Type your ${q.type?.toLowerCase() || "question"} prompt`}

                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Field>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end sm:justify-center">
          <button
            type="button"
            onClick={() => onRemove(q.id)}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Remove Question
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Detail Modal ---------- */
function AssessmentDetailModal({ assessment, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!assessment) return null;

  const pill =
    assessment.status === "published"
      ? "bg-blue-100 text-blue-700"
      : "bg-slate-100 text-slate-600";

  const qs = assessment.questions || [];

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                {assessment.title}
              </h3>
              <p className="text-sm text-slate-500">
                {assessment.subtitle || "—"}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex  items-center rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {assessment.type}
                </span>
                <span className={`px-3 py-0.5 text-xs font-medium rounded-full ${pill}`}>
                  {assessment.status}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-700">
                  {assessment.qns} questions
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-700">{assessment.duration}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-700">{assessment.score}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              ✕ Close
            </button>
          </div>

          <div className="p-5 space-y-4  max-h-[70vh] overflow-auto">
            {qs.length === 0 ? (
              <div className="rounded-lg  border border-slate-200 p-4 text-sm text-slate-600">
                No stored questions for this assessment.
              </div>
            ) : (
              qs.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex   items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600 font-semibold">
                          Q{idx + 1}:
                        </span>
                        <h4 className=" font-semibold text-lg">
                          {q.text || <em className="text-gray-600">{q.questionText}</em>}
                        </h4>
                      </div>

                      {assessment.type === "MCQ" && (<div className="mt-3 space-y-2">
                        <div className="mt-2 text-sm">
                          <span className="font-medium text-slate-700">Answer:</span>{" "}
                          <span className="text-slate-800">
                            {q.answer || <em className="text-slate-400">—</em>}
                          </span>
                        </div>
                      </div>)}

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main ---------- */
export default function TeachAssessments() {
  // const BACKEND_URL = url;

  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [activeTab, setActiveTab] = useState("my");
  const [openAssessment, setOpenAssessment] = useState(null); // <= for details modal


  //Skills 
  const [skills, setSkills] = useState([]);

  const skillOptions = ["Technical", "Problem Solving", "Comprehension", "Coding", "Critical Thinking"];
  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      requestAnimationFrame(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }, [showForm]);


  const [assessments, setAssessments] = useState([]);
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/assessments/all`);
        if (res.data.success) {
          const fetched = res.data.data.map((item) => ({
            id: item._id,
            title: item.title,
            subtitle: item.course || "Unassigned",
            instructions: item.instructions,
            courseKey: item.course,
            type: item.assessmentType,
            qns: item.questions?.length || 0,
            duration: `${item.durationMinutes || 0} mins`,
            score: `${item.maxScore || 0} points`,
            submissions: 0,
            avg: `${item.maxScore || 0} points`,
            status: item.status,
            questions: item.questions || [],
            startDate: item.startDate,
            endDate: item.endDate,
          }));
          setAssessments(fetched);
          console.log(res.data)
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };


    fetchAssessments();
  }, []);


  // student Answer submition & grading................
  const [studentSubmition, setStudentSubmition] = useState([]);
  const [gradeData, setGradeData] = useState({});
  const totalStudentSubmissions = studentSubmition.length;


  useEffect(() => {
    const fetchStudentSubmition = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/submissions/all`);
        if (res.data.success) {
          const fetched = res.data.data.map((item) => ({
            submissionId: item._id,
            assessmentId: item.assessmentId,
            assesmentTitle: item.assesmentTitle || "Unassigned",
            assesmentCourse: item.assesmentCourse || "Unassigned",
            studentId: item.studentId,
            studentName: item.studentName,
            studentEmail: item.studentEmail,
            totalQuestions: item.totalQuestions,
            correctAnswers: item.correctAnswers,
            percentage: item.percentage,
            timeTaken: item.timeTaken,
            assessmentType: item.assessmentType,
            filePath: item.filePath,
            startedAt: item.startedAt,
            submittedAt: item.submittedAt,
            passed: item.passed,
            status: item.status,
            // ✅ GRADING DATA
            marks: item.marks || 0,
            feedback: item.feedback || "",
            grade: item.grade || false,
          }));

          setStudentSubmition(fetched);
          console.log("student answer Submit 😀:", res.data);
        }
      } catch (error) {
        console.error("Error fetching studentSubmition:", error);
      }
    };

    fetchStudentSubmition();
  }, []);

  const handleInputChange = (id, field, value) => {
    setStudentSubmition(prev =>
      prev.map(sub =>
        sub.submissionId === id ? { ...sub, [field]: value } : sub
      )
    );
  };







  const pendingItems = useMemo(
    () => [
      {
        id: "p1",
        student: "Alice Johnson",
        avatar: "#",
        assessmentTitle: "State Management Analysis",
        type: "Subjective",
        time: "Nov 3, 2025 • 2:30 PM",
      },
      {
        id: "p2",
        student: "Bob Smith",
        avatar: "#",
        assessmentTitle: "Build a Todo App",
        type: "Coding",
        time: "Nov 3, 2025 • 1:15 PM",
      },
      {
        id: "p3",
        student: "Carol Davis",
        avatar: "#",
        assessmentTitle: "State Management Analysis",
        type: "Subjective",
        time: "Nov 2, 2025 • 4:45 PM",
      },
    ],
    []
  );

  const pendingCount = pendingItems.length;
  const totalSubmissions = (assessments || []).reduce(
    (sum, a) => sum + (a.submissions?.length || 0),
    0
  );


  // ---- Assessment form state ----
  const [editingId, setEditingId] = useState(null); // if set => editing existing assessment
  const [assessmentType, setAssessmentType] = useState("MCQ"); // MCQ | Subjective | Coding
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(""); // course key like 'react'
  const [instructions, setInstructions] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [maxScore, setMaxScore] = useState(100);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [courses, setCourses] = useState([]); // store backend data


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/teacher/gettitle`); // your backend API
        if (res.data.success) {
          // Filter out null or empty values
          const validCourses = res.data.data.filter((item) => item);
          console.log(res.data.data)
          setCourses(validCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);


  // ---- Questions (dynamic) ----
  // Each question: { id, type: 'MCQ'|'Subjective'|'Coding', text, options?:[], answer?:string }
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const id = `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    if (assessmentType === "MCQ") {
      setQuestions((prev) => [
        ...prev,
        { id, type: "MCQ", text: "", options: [], answer: "" },
      ]);
    } else if (assessmentType === "Subjective") {
      setQuestions((prev) => [...prev, { id, type: "Subjective", text: "" }]);
    } else {
      setQuestions((prev) => [...prev, { id, type: "Coding", text: "" }]);
    }
  };

  const updateQuestion = (id, updated) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)));
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // ---- Toast helpers ----
  const toastInfo = (msg) => toast.info(msg);
  const toastSuccess = (msg) => toast.success(msg);
  const toastError = (msg) => toast.error(msg);
  const toastWarn = (msg) => toast.warn(msg);

  // ---- append/update dashboard (shared by Save / Draft) ----
  const createOrUpdateAssessment = (status) => {
    const safeTitle = title.trim() || "Untitled Assessment";
    const savedQuestions = questions.map((q) => (q.options ? { ...q, options: [...q.options] } : { ...q }));

    if (editingId) {
      // update existing
      setAssessments((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? {
              ...a,
              title: safeTitle,
              subtitle: COURSE_LABELS[course] || a.subtitle || "Unassigned",
              courseKey: course || a.courseKey,
              type: assessmentType,
              qns: savedQuestions.length,
              duration: formatDuration(durationMinutes),
              score: `${Number(maxScore) || 0} points`,
              status,
              questions: savedQuestions,
            }
            : a
        )
      );
    } else {
      // create new
      const newItem = {
        id: Date.now(),
        title: safeTitle,
        subtitle: COURSE_LABELS[course] || "Unassigned",
        courseKey: course || "",
        type: assessmentType,
        qns: savedQuestions.length,
        duration: formatDuration(durationMinutes),
        score: `${Number(maxScore) || 0} points`,
        submissions: 0,
        avg: "—",
        status,
        questions: savedQuestions,
      };
      setAssessments((prev) => [newItem, ...prev]); // prepend
    }
  };

  // ---- Save / Draft / Cancel ----
  const handleSave = async () => {
    if (!title.trim()) return toastError("Please enter an assessment title.");
    if (!course) return toastWarn("Please select a course.");
    if (questions.length === 0) return toastWarn("Please add at least one question.");

    try {
      const payload = {
        title,
        assessmentType,
        instructions,
        course,
        durationMinutes,
        maxScore,
        startDate,
        endDate,
        skills,
        questions: questions.map(({ text, options, answer, type }) => ({
          questionText: text,
          options: type === "MCQ" ? options : [],
          answer: type === "MCQ" ? answer : "",
        })),
        status: "published",

      };

      let res;
      if (editingId) {
        // ✅ UPDATE existing assessment
        res = await axios.put(`http://localhost:5000/api/assessments/${editingId}`, payload);
      } else {
        // 🆕 CREATE new assessment
        res = await axios.post(`http://localhost:5000/api/assessments/create`, payload);
      }

      if (res.data.success) {
        toastSuccess(editingId ? "Assessment updated successfully! ✅" : "Assessment created successfully! 🎉");
        resetAndClose();
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to save assessment");
    }
  };




  const handleSaveDraft = async () => {
    try {
      const payload = {
        title,
        assessmentType,
        instructions,
        course,
        durationMinutes,
        maxScore,
        startDate,
        endDate,
        skills,
        questions: questions.map(({ text, options, answer, type }) => ({
          questionText: text,
          options: type === "MCQ" ? options : [],
          answer: type === "MCQ" ? answer : "",
        })),
        status: "draft",
      };

      let res;
      if (editingId) {
        // ✅ UPDATE existing draft
        res = await axios.put(`http://localhost:5000/api/assessments/${editingId}`, payload);
      } else {
        // 🆕 CREATE new draft
        res = await axios.post(`http://localhost:5000/api/assessments/create`, payload);
      }

      if (res.data.success) {
        toastSuccess(editingId ? "Draft updated successfully 💾" : "Draft saved successfully 💾");
        resetAndClose();
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to save draft");
    }
  };


  const handleCancel = () => {
    toastInfo("Creation cancelled.");
    resetAndClose();
  };

  const resetAndClose = () => {
    setTitle("");
    setCourse("");
    setInstructions("");
    setAssessmentType("MCQ");
    setDurationMinutes(30);
    setMaxScore(100);
    setStartDate("");
    setEndDate("");
    setQuestions([]);
    setShowForm(false);
    setEditingId(null);
  };

  const openDetails = (a) => setOpenAssessment(a);
  const closeDetails = () => setOpenAssessment(null);


  // Edit Assessment
  const handleEditAssessment = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/assessments/${selectedAssessmentId}`,
        payload
      );

      if (res.data.success) {
        toastSuccess("Assessment edited successfully! 🎉");
        resetAndClose();
      }
    } catch (err) {
      console.error("Edit assessment error:", err);
      toastError("Failed to edit assessment");
    }
  };

  //delete assesment

  const handleDeleteAssessment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assessment?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/assessments/${id}`);
      if (res.data.success) {
        toast.success("Assessment deleted successfully! 🗑️");

        // Remove from frontend list
        setAssessments((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error("Delete assessment error:", err);
      toast.error("Failed to delete assessment ❌");
    }
  };




  // ---- Delete from dashboard ----
  // const handleDelete = (id) => {
  //   setAssessments((prev) => prev.filter((a) => a.id !== id));
  //   if (openAssessment && openAssessment.id === id) {
  //     setOpenAssessment(null);
  //   }
  //   toastSuccess("Assessment deleted.");
  // };

  // ---- Edit flow for drafts ----
  const startEdit = async (assessment) => {
    try {
      // ✅ fetch full data from backend using ID
      const res = await axios.get(`http://localhost:5000/api/assessments/${assessment.id}`);

      if (res.data.success && res.data.data) {
        const item = res.data.data;

        // ✅ populate all fields safely
        setEditingId(item._id);
        setTitle(item.title || "");
        setCourse(item.course || "");
        setInstructions(item.instructions || "");
        setAssessmentType(item.assessmentType || "MCQ");
        setDurationMinutes(item.durationMinutes || 30);
        setMaxScore(item.maxScore || 100);

        // ✅ Format date for input type="date"
        setStartDate(item.startDate ? item.startDate.split("T")[0] : "");
        setEndDate(item.endDate ? item.endDate.split("T")[0] : "");

        // ✅ load questions (backend stores them with questionText)
        const formattedQuestions = (item.questions || []).map((q) => ({
          id: q._id || `q-${Math.random().toString(36).slice(2, 7)}`,
          type: item.assessmentType,
          text: q.questionText || "",
          options: q.options || [],
          answer: q.answer || "",
        }));
        setQuestions(formattedQuestions);

        setShowForm(true);
        console.log(res.data.data)
        toast.info("Editing assessment loaded successfully ✏️");
      } else {
        toast.error("Failed to load assessment details ❌");
      }
    } catch (err) {
      console.error("Error loading assessment:", err);
      toast.error("Error fetching assessment details ❌");
    }
  };




  return (
    <div className="min-h-screen bg-[#F7F9FB]  text-slate-900">
      <ToastContainer position="top-center" autoClose={3000} newestOnTop />

      {/* Sticky top bar */}
      <BackToDashboard />
      {/* Desktop header */}
      <div className="hidden pt-14 md:block flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-4 border-b border-slate-200">
        <DesktopHeader />
        {/* <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            // reset fields for fresh create
            setTitle("");
            setCourse("");
            setAssessmentType("MCQ");
            setQuestions([]);
            toastInfo("Opening form...");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2.5 text-white text-sm font-semibold hover:bg-green-600 shadow-sm md:px-5 md:py-2.5 transition-colors"
        >
          <span className="text-lg leading-none">＋</span>
          <span className="hidden sm:inline">Create Assessment</span>
          <span className="sm:hidden">Create</span>
        </button> */}
      </div>

      {/* KPI Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <KPI title="Total Assessments" value={assessments.length} sub={`${assessments.filter(a => a.status === 'published').length} published`} icon="▦" />
        <KPI title="Pending Grading" value={studentSubmition.filter(s => !s.grade).length} sub="Awaiting review" icon="🕒" />
        <KPI title="Total Submissions" value={studentSubmition.length} sub="All time" icon="👥" />
        <KPI title="Questions Added" value={questions.length} sub="In current form" icon="❓" />
      </section>

      {/* Tabs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="overflow-x-auto no-scrollbar pb-1">
          <div className="inline-flex gap-1 rounded-full bg-slate-100 p-1">
            <Tab active={activeTab === "my"} onClick={() => setActiveTab("my")}>
              My Assessments ({assessments.length})
            </Tab>
            <Tab active={activeTab === "pending"} onClick={() => setActiveTab("pending")}>
              Pending Grading ({studentSubmition.filter(s => !s.grade).length})
            </Tab>
          </div>
        </div>
      </nav>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 md:mt-6 space-y-4 md:space-y-5">
        {activeTab === "my" &&
          assessments.map((a) => (
            <AssessmentRow
              key={a.id}
              {...a}
              onOpen={() => openDetails(a)}
              onDelete={() => handleDeleteAssessment(a.id)}
              onEdit={() => startEdit(a)}
            />
          ))}

        {activeTab === "pending" && (
          <div className="overflow-x-auto">
            <PendingRow
              studentSubmition={studentSubmition}
              // handleGrade={handleGrade}
              handleInputChange={handleInputChange}
            />
          </div>
        )}

      </main>

      {/* Create form (inline) */}
      {showForm && (
        <section ref={formRef} className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4 sm:p-5 md:p-6 border-b border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold">
                {editingId ? "Edit Assessment" : "Create New Assessment"}
              </h2>
              <p className="text-slate-500 mt-1">
                Fill in the details to create a new assessment
              </p>
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid gap-5 md:grid-cols-2">
                {/* Left */}
                <div className="space-y-5">
                  <Field label="Assessment Title">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., React Fundamentals Quiz"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Field>

                  <Field label="Assessment Type">
                    <select
                      value={assessmentType}
                      onChange={(e) => setAssessmentType(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="MCQ">MCQ</option>
                      <option value="Subjective">Subjective</option>
                      <option value="Coding">Coding</option>
                    </select>
                  </Field>

                  <Field label="Instructions">
                    <textarea
                      rows={4}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Enter assessment instructions for students..."
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Field>
                </div>

                {/* Right */}
                <div className="space-y-5">
                  <Field label="Course">
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select course</option>
                      {courses.map((courseName, index) => (
                        <option key={courseName || index} value={courseName}>
                          {courseName}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Duration (minutes)">
                      <input
                        type="number"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(Number(e.target.value || 0))}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </Field>
                    <Field label="Max Score">
                      <input
                        type="number"
                        value={maxScore}
                        onChange={(e) => setMaxScore(Number(e.target.value || 0))}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Start Date">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </Field>
                    <Field label="End Date">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </Field>
                  </div>
                  {/* Skills Covered - Chip Toggle */}
                  <div className="mt-6">
                    <h3 className="text-base sm:text-md font-semibold text-gray-600 mb-3">
                      Skills Covered
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {skillOptions.map((skill) => {
                        const active = skills.includes(skill);

                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
            ${active
                                ? "bg-blue-600 border-blue-600 text-white shadow"
                                : "bg-white border-slate-300 text-slate-700 hover:bg-blue-50"
                              }
          `}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Add Question trigger (green) */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 sm:px-5 py-2.5 text-white font-semibold hover:bg-green-700 shadow-sm transition-colors"
                >
                  ＋ Add Question
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  The question editor appears below. It adapts to the selected{" "}
                  <b>Assessment Type</b>.
                </p>
              </div>

              {/* Question editors list */}
              {questions.length > 0 && (
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                      Questions({questions.length})
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge>{assessmentType}</Badge>
                    </div>
                  </div>

                  {questions.map((q) =>
                    q.type === "MCQ" ? (
                      <MCQQuestionEditor
                        key={q.id}
                        q={q}
                        onChange={updateQuestion}
                        onRemove={removeQuestion}
                      />
                    ) : (
                      <SimpleQuestionEditor
                        key={q.id}
                        q={q}
                        onChange={updateQuestion}
                        onRemove={removeQuestion}
                        label="Question"
                      />
                    )
                  )}

                  {/* Add another */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 sm:px-5 py-2.5 font-medium text-slate-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      ＋ Add Another Question
                    </button>
                  </div>
                </div>
              )}

              {/* Final footer buttons (for assessment + questions) */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 sm:px-5 py-2.5 text-white font-semibold hover:bg-green-600 shadow-sm transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="rounded-full border border-slate-300 px-4 sm:px-5 py-2.5 font-medium text-slate-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-full px-4 sm:px-5 py-2.5 font-medium text-slate-500 hover:text-green-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Details Modal */}
      {openAssessment && (
        <AssessmentDetailModal assessment={openAssessment} onClose={closeDetails} />
      )}

      <div className="h-10" />
    </div>
  );
}

/* ---------- Small presentational components ---------- */
function KPI({ title, value, sub, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="font-semibold text-slate-700">{title}</p>
        <span className="text-slate-400" aria-hidden>
          {icon}
        </span>
      </div>
      <div className="mt-3 sm:mt-4 text-xl sm:text-2xl tracking-tight">{value}</div>
      <div className="mt-1 text-xs sm:text-sm text-slate-400">{sub}</div>
    </div>
  );
}

function Tab({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={[
        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500",
        active ? "bg-white text-slate-900 shadow-sm" : "text-slate-700 hover:bg-white/70",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function AssessmentRow({
  id,
  title,
  subtitle,
  type,
  qns,
  duration,
  score,
  submissions,
  avg,
  status,
  onOpen,
  onDelete,
  onEdit,
}) {
  const pill =
    status === "published" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600";

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onOpen) onOpen();
      }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xl"
          aria-hidden
        >
          ✓
        </div>

        <div className="flex-1  min-w-0">
          <div className="flex items-cente justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
              {title}
            </h3>
            <span className={`px-3 mt-2 py-0.5  text-xs font-medium rounded-full ${pill}`}>
              {status}
            </span>
          </div>

          <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1  text-sm text-slate-600">
            <span>
              Type: <b>{type}</b>
            </span>
            <span>
              Questions: <b>{qns}</b>
            </span>
            <span>
              Duration: <b>{duration}</b>
            </span>
            <span>
              Score: <b>{score}</b>
            </span>
            <span>
              Submissions: <b>{submissions}</b>
            </span>
            <span>
              Avg Score: <b>{avg}</b>
            </span>
          </div>
        </div>

        <div className="flex items-center  gap-2 self-start">
          {/* Edit button only when draft (per requirement) */}
          {status === "draft" && (
            <IconBtn
              ariaLabel="Edit"
              onClick={(e) => {
                // IconBtn already stops propagation; still call onEdit if present.
                if (onEdit) onEdit(e);
              }}
            >
              <FaRegEdit />
            </IconBtn>
          )}
          <IconBtn ariaLabel="Preview" onClick={onOpen}>
            <FaEye />
          </IconBtn>

          <IconBtn ariaLabel="Delete" onClick={onDelete}>
            <RiDeleteBin6Line />
          </IconBtn>


        </div>
      </div>
    </div>
  );
}

function PendingRow({ studentSubmition = [] }) {
  // const BACKEND_URL = url;
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);





  const handleGradeSubmit = async () => {
    try {
      if (!selectedSub || !selectedSub.submissionId) {
        toast.error("Invalid submission");
        return;
      }

      if (marks === "" || marks < 0 || marks > 100) {
        toast.error("Enter valid marks (0-100)");
        return;
      }

      setLoading(true);

      const response = await axios.put(
        `http://localhost:5000/api/submissions/grade/${selectedSub.submissionId}`,
        { marks: Number(marks) }
      );

      if (response.data.success) {
        toast.success("Graded Successfully");

        setShowGradeModal(false);
        setMarks("");
        setSelectedSub(null);
        // fetchStudentSubmissions();
      }

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };








  if (!studentSubmition.length) {
    return (
      <tr>
        <td colSpan="6" className="text-center py-4">
          No Pending Submissions
        </td>
      </tr>
    );
  }

  const getRandomBg = () => {
    const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      {studentSubmition.map((sub, data) => (
        <div key={data} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 mb-10 shadow-sm">

          <div className="flex items-center gap-4">

            <div
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-black text-3xl font-bold"
              style={{ backgroundColor: getRandomBg() }}
            >
              {sub.studentName?.slice(0, 1).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">
                  <h3 className="font-semibold">{sub.studentName}</h3>
                  <h3>{sub.studentEmail}</h3>
                  <h3>{sub.assesmentTitle}</h3>
                  <h3>{sub.assesmentCourse}</h3>
                </div>

                <div className="flex items-center gap-2">
                  {sub.status === "completed" && sub.marks ? (
                    <span className="text-green-600 font-bold">✅ Completed</span>
                  ) : (
                    <span className="text-orange-500 font-bold">⏳ Pending</span>
                  )}

                  <button
                    onClick={() => {
                      setSelectedSub(sub);
                      setShowGradeModal(true);
                      console.log("Selected SUB =>", sub)
                    }}
                    className="rounded-full bg-blue-600 px-3 py-1 text-white text-sm font-semibold"
                  >
                    Grade Now
                  </button>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <CalendarIcon className="h-4 w-4" />
                <span className="mr-3">{sub.submittedAt}</span>
                <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {sub.assessmentType || "MCQ"}
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {sub.assessmentType === "MCQ" ? (
                    "MCQ"
                  ) : sub.filePath ? (
                    <a
                      href={sub.filePath}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 text-blue-600 font-semibold hover:underline"
                    >
                      <span><FaDownload /></span> <span>Download Now</span>
                    </a>
                  ) : (
                    <span className="text-black">{sub.percentage}%</span>
                  )}
                </span>

              </div>

              {/* ✅ SHOW MARKS & GRADE AFTER COMPLETED */}
              {sub.status === "completed" && (
                <div className="mt-2 text-green-700 font-semibold">
                  Marks: {sub.marks} / 100 | Grade: {sub.grade}
                </div>
              )}
            </div>
          </div>

          {/* ✅ GRADE MODAL */}
          {showGradeModal && selectedSub && (
            <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">

                <h2 className="text-lg font-semibold">Grade Assessment</h2>
                <p>{selectedSub.studentName}</p>
                <p className="text-sm">{selectedSub.assesmentTitle}</p>

                {/* MARKS INPUT */}
                <input
                  type="number"
                  placeholder="Enter Marks /100"
                  className="w-full border rounded p-2"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />




                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowGradeModal(false)}
                    className="px-4 py-1 border rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleGradeSubmit}
                    disabled={loading}
                    className="px-4 py-1 bg-blue-600 text-white rounded"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}





/* ---------- Small UI helpers ---------- */
function IconBtn({ children, ariaLabel, onClick }) {
  // Stop bubbling to avoid opening card; still allow an action when provided
  const handle = (e) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };
  return (
    <button
      aria-label={ariaLabel}
      onClick={handle}
      className="h-8 w-8 sm:h-9 sm:w-9 grid place-items-center rounded-full border border-slate-200 hover:bg-green-50 hover:border-green-300 transition-colors"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}

function Field({ label, children }) {
  const id = useMemo(() => Math.random().toString(36).slice(2), []);
  return (
    <label className="block" htmlFor={id}>
      <div className="mb-1.5 text-sm font-medium text-slate-700">{label}</div>
      {React.cloneElement(children, { id })}
    </label>
  );
}

function Pill({ children, color = "yellow" }) {
  const styles =
    color === "yellow" ? "bg-yellow-100 text-yellow-800" : "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

function Badge({ children, variant = "solid" }) {
  const styles =
    variant === "muted"
      ? "border border-slate-200 text-slate-600"
      : "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

/* tiny inline icons using react-icons with className passthrough */
function ClockIcon({ className = "" }) {
  return <FaClock className={className} />;
}
function CalendarIcon({ className = "" }) {
  return <FiCalendar className={className} />;
}
