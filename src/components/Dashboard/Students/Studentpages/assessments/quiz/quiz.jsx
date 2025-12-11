import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { RiFocus2Line } from "react-icons/ri";
import { FiCheckCircle } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import BackToDashboard from "../../../../../common/backDashboard/BackDashboard";
import axios from "axios";
// // import BACKEND_URL from "../../../../../../api/Api";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(0);
  const { id } = useParams();
  // const BACKEND_URL = url;

  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [fetchData, setfetchData] = useState({})

  //useEffect for Timer
  useEffect(() => {
    if (!timeLeft || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResult(true); // Auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult]);


  // ✅ Fetch quiz from backend using ID
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/assessments/${id}`);
        if (res.data.success && res.data.data) {
          const item = res.data.data;
          setfetchData(res.data.data)
          setTitle(item.title || "Untitled Assessment");
          const formatted = (item.questions || []).map((q) => ({
            id: q._id,
            question: q.questionText,
            options: q.options || [],
            answer: q.answer,
          }));
          setQuestions(formatted);

          // NEW: set timer
          if (item.durationMinutes) {
            setTimeLeft(item.durationMinutes * 60); // Convert minutes → seconds
          }

          console.log(res.data.data)
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (showResult) {
      const user = JSON.parse(localStorage.getItem("user"));

    const submissionData = {
      assesmentTitle:fetchData.title,
      assesmentCourse:fetchData.course,
      assessmentId: id,
      studentId: user?._id || "unknown",
      studentName: user?.name || "Guest User",
      studentEmail: user?.email || "unknown@example.com",
      studentPhoto: user?.photoURL || "",
      provider: user?.provider || "",
      role: user?.role || "student",
        totalQuestions: questions.length,
        correctAnswers: score,
        percentage,
        timeTaken,
        startedAt: new Date(startTime),
        submittedAt: new Date(),

        // 👇👇 ADD THIS
        skills: fetchData.skills || [],

        answers: questions.map((q, i) => ({
          questionId: q.id,
          questionText: q.question,
          selectedAnswer: selected[i],
          correctAnswer: q.answer,
          isCorrect: selected[i] === q.answer,
        })),
      };

      axios
        .post(`http://localhost:5000/api/submissions/submit`, submissionData)
        .then((res) => {
          console.log("✅ Quiz submission saved successfully:", res.data);
        })
        .catch((err) => {
          console.error("❌ Error saving submission:", err);
        });
    }
  }, [showResult]);



  // 🧮 Quiz Logic
  const total = questions.length;
  const handleSelect = (option) => {
    if (selected[current]) return;
    setSelected({ ...selected, [current]: option });
    if (option === questions[current].answer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (current < total - 1) setCurrent(current + 1);
    else setShowResult(true);
  };
  const handlePrevious = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const progress = ((current + 1) / total) * 100;
  const percentage = Math.round((score / total) * 100);
  const answeredCount = Object.keys(selected).length;
  const timeTaken = Math.round((Date.now() - startTime) / 1000);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading quiz...
      </div>
    );

  if (!questions.length)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        No questions found for this assessment ❌
      </div>
    );

  return (
    <>
      <div className="bg-gray-50 min-h-screen p-6">
        <BackToDashboard />

        {!showResult ? (
          <>
            <div className="quiz-cover flex pt-10 flex-col justify-center w-full md:w-3/4 lg:w-1/2 mx-auto items-center gap-4">
              {/* Quiz Header */}
              <div className="quize-top w-full rounded-2xl border-2 shadow-md border-gray-200 p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <div className="px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2">
                    ⏳
                    <span>
                      {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                      {String(timeLeft % 60).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    Question {current + 1} of {total}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Question and Answers */}
                <div className="quiz-q">
                  <h3 className="text-xl font-medium mb-5">
                    {questions[current].question}
                  </h3>

                  <div className="space-y-4">
                    {questions[current].options.map((option, index) => {
                      const isSelected = selected[current] === option;
                      const isCorrect = option === questions[current].answer;

                      return (
                        <button
                          key={index}
                          onClick={() => handleSelect(option)}
                          className={`w-full text-left border rounded-xl py-3 px-4 transition ${isSelected
                            ? isCorrect
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-blue-400"
                            }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={current === 0}
                    className={`px-5 py-2 rounded-3xl ${current === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                  >
                    Previous
                  </button>

                  <p className="text-md font-medium text-gray-700">
                    ✅ Answered:{" "}
                    <span className="text-blue-600">{answeredCount}</span> /{" "}
                    {total}
                  </p>

                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-3xl text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {current === total - 1 ? "Finish" : "Next"}
                  </button>
                </div>
              </div>

              {/* Quiz Bottom Section */}
              <div className="quiz-bot w-full rounded-2xl border-2 border-gray-200 p-4 shadow-md bg-white flex flex-col items-center">
                <h3 className="font-medium mb-3">Question Navigator</h3>
                <div className="flex gap-3 flex-wrap justify-center items-center">
                  {questions.map((q, i) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrent(i)}
                      className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl text-sm font-medium ${current === i
                        ? "bg-blue-600 text-white"
                        : selected[i]
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          // ✅ Result Section
          <div className="max-w-4xl w-full mt-10 mx-auto bg-white p-10 rounded-2xl shadow-md text-center">
            <div className="flex flex-col items-center mb-8">
              {percentage >= 70 ? (
                <FaCheckCircle className="text-green-500 text-6xl mb-3" />
              ) : (
                <FaTimesCircle className="text-red-500 text-6xl mb-3" />
              )}
              <h2 className="text-2xl font-semibold mb-2">Quiz Completed!</h2>
              <p className="text-gray-600 mb-4">{title}</p>
              <h1 className="text-5xl font-bold mb-2">{percentage}%</h1>
              <p className="text-gray-500">
                You need <span className="font-semibold">70%</span> to pass
              </p>
              <span
                className={`mt-3 px-4 py-1 rounded-full text-sm font-medium ${percentage >= 70
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {percentage >= 70 ? "PASSED" : "FAILED"}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 flex flex-col justify-center items-center p-4 rounded-xl">
                <RiFocus2Line className="text-4xl text-blue-500" />
                <p className="text-sm text-gray-500 mb-1">
                  Questions Answered
                </p>
                <h3 className="text-xl font-bold">
                  {Math.round((answeredCount / total) * 100)}%
                </h3>
              </div>
              <div className="bg-gray-50 p-4 flex flex-col justify-center items-center rounded-xl">
                <FiCheckCircle className="text-4xl text-green-500" />
                <p className="text-sm text-gray-500 mb-1">Correct Answers</p>
                <h3 className="text-xl font-bold">{score}</h3>
              </div>
              <div className="bg-gray-50 p-4 flex flex-col justify-center items-center rounded-xl">
                <MdAccessTime className="text-4xl text-blue-500" />
                <p className="text-sm text-gray-500 mb-1">Time Taken</p>
                <h3 className="text-xl font-bold">{timeTaken}s</h3>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-10 flex-wrap">
              <button onClick={() => navigate("/student/progress")} className="px-6 py-2 border border-blue-500 text-blue-600 rounded-3xl hover:bg-blue-50">
                View Progress
              </button>
              <button className="px-6 py-2 border border-green-500 text-green-600 rounded-3xl hover:bg-green-50">
                View Certificates
              </button>
              <button onClick={()=>navigate("/student/assessment")} className="px-6 py-2 border border-blue-500 text-blue-600 rounded-3xl hover:bg-blue-50">
                Done
              </button>

            </div>

            {/* Question Review */}
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-4">Question Review</h3>
              <div className="space-y-4">
                {questions.map((q, i) => {
                  const isCorrect = selected[i] === q.answer;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 border rounded-xl ${isCorrect
                        ? "border-green-300 bg-green-50"
                        : "border-red-300 bg-red-50"
                        }`}
                    >
                      <h4 className="font-medium mb-2">
                        Question {i + 1}: {q.question}
                      </h4>
                      <p className="text-sm">
                        {isCorrect ? (
                          <span className="text-green-700 font-medium">
                            ✅ Correct
                          </span>
                        ) : (
                          <span className="text-red-700 font-medium">
                            ❌ Incorrect
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Correct answer:{" "}
                        <span className="font-semibold text-gray-800">
                          {q.answer}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
