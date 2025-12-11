import React from "react";
import { useState, useEffect } from "react";
import './skillanalysis.css';
import { FiTrendingUp, FiTarget, FiAward, FiCheckCircle } from "react-icons/fi";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
import axios from "axios";
// // import BACKEND_URL from "../../../../../api/Api";


export default function SkillsAnalysis() {
    const [overallRating, setOverallRating] = useState(0);
    const [totalAssessments, setTotalAssessments] = useState(0);

    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);


    const studentId = "691d796d5dc47bc643374f11"; // Replace with actual logged-in student ID

    const getStatus = (rating) => {
        if (rating >= 75) {
            return {
                text: "Improved",
                color: "text-green-600",
                bg: "bg-green-100",
                icon: <FiTrendingUp />
            };
        } else if (rating >= 50) {
            return {
                text: "Stable",
                color: "text-blue-600",
                bg: "bg-blue-100",
                icon: <FiTarget />
            };
        } else if (rating >= 25) {
            return {
                text: "Needs Attention",
                color: "text-orange-600",
                bg: "bg-orange-100",
                icon: <FiAward />
            };
        } else {
            return {
                text: "Critical",
                color: "text-red-600",
                bg: "bg-red-100",
                icon: <FiCheckCircle />
            };
        }
    };


    const recommendations = [
        {
            title: "Practice more coding challenges",
            desc: "Your coding proficiency (73%) has room for improvement",
        },
        {
            title: "Complete more problem-solving assessments",
            desc: "Increase from 8 to 12+ assessments for better accuracy",
        },
    ];

    const achievements = [
        {
            title: "Technical Excellence",
            desc: "Achieved 85%+ in Technical Skills",
            date: "Nov 2, 2025",
        },
        {
            title: "Problem Solver",
            desc: "Completed 5 coding challenges",
            date: "Oct 28, 2025",
        },
        {
            title: "Quick Learner",
            desc: "Improved by 15% in one month",
            date: "Oct 15, 2025",
        },
    ];

    const iconMap = {
        "Technical": "🧠",
        "Problem Solving": "🧩",
        "Comprehension": "📘",
        "Coding": "⚡",
        "Critical Thinking": "💡",
    };



    useEffect(() => {
        fetchStudentSkills();
    }, []);

    const fetchStudentSkills = async () => {

        try {
            // 🔹 1. Fetch ALL assessments (correct total count)
            const assessRes = await axios.get(`http://localhost:5000/api/assessments/all`);
            const allAssessmentsRaw = Array.isArray(assessRes.data.data) ? assessRes.data.data : [];
            const allAssessments = allAssessmentsRaw.filter(a => a.status === "published");
            setTotalAssessments(allAssessments.length);

            // 🔹 2. Fetch ONLY student submissions (passed/pending)
            const stuRes = await axios.get(`http://localhost:5000/api/submissions/student/${studentId}`);
            const studentSubs = Array.isArray(stuRes.data.data) ? stuRes.data.data : [];

            const skillMap = {};



            // STEP 1: Count TOTAL assessments per skill
            allAssessments.forEach((a) => {
                if (Array.isArray(a.skills)) {
                    a.skills.forEach((skill) => {
                        if (!skillMap[skill]) {
                            skillMap[skill] = { title: skill, total: 0, completed: 0 };
                        }
                        skillMap[skill].total += 1;
                    });
                }
            });

            // STEP 2: Count COMPLETED (passed) for student
            studentSubs.forEach((sub) => {
                if (sub.passed && Array.isArray(sub.skills)) {
                    sub.skills.forEach((skill) => {
                        if (skillMap[skill]) {
                            skillMap[skill].completed += 1;
                        }
                    });
                }
            });

            // STEP 3: Format data for frontend
            const formatted = Object.values(skillMap).map((s) => ({
                title: s.title,
                passed: s.completed,   // number of passed assessments
                total: s.total,        // total assessments for this skill
                rating: s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0,
                icon: iconMap[s.title] || "⭐",
            }));

            setSkillsData(formatted);

            // STEP 4: Overall rating
            const totalCompleted = Object.values(skillMap).reduce((acc, cur) => acc + cur.completed, 0);
            const totalAssessments = Object.values(skillMap).reduce((acc, cur) => acc + cur.total, 0);

            const overall = totalAssessments > 0
                ? Math.round((totalCompleted / totalAssessments) * 100)
                : 0;

            setOverallRating(overall);

        } catch (err) {
            console.error("Error fetching skills:", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <main className="pt-3">
                <BackToDashboard />
                <section className="skills p-6 pt-13 ">
                    {/* title */}
                    <div className="s-title mb-4">
                        <h1 className="text-3xl font-bold mb-1">Skill Rating Analytics</h1>
                        <p className="text-gray-400">Track your skill development based on assessment performance and learning pace</p>
                    </div>
                    {/* skill Rating */}
                    <div className="s-rating bg-blue-500 flex justify-between p-5 rounded-2xl">
                        <div className="s-r-left flex gap-2 flex-col">
                            <p className="text-white">overall skill Rating</p>
                            <h1 className="text-white text-2xl"><span className="text-5xl font-bold">{overallRating}</span>/100</h1>
                            <p className="text-white">Based on {totalAssessments} Assesments</p>
                        </div>
                        {/* circle design */}
                        <div className="text-6xl crl-design flex justify-center items-center">
                            <FiTarget className="text-white text-8xl" />
                        </div>
                    </div>
                    {/* Skill Breakdown */}
                    <div className="skill-break pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Skill Breakdown
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {skillsData.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="skill-icon bg-green-400 p-2 rounded-2xl">
                                                <span className="text-2xl">{skill.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {skill.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">{skill.passed} / {skill.total} Completed</p>
                                            </div>
                                        </div>
                                        {(() => {
                                            const status = getStatus(skill.rating);
                                            return (
                                                <span className={`text-xs ${status.color} ${status.bg} px-2 py-1 rounded-full flex items-center gap-1`}>
                                                    {status.icon} {status.text}
                                                </span>
                                            );
                                        })()}

                                    </div>
                                    <div className="text-sm text-gray-600 mb-1">
                                        Current Rating
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${skill.rating}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {skill.rating}/100
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*Recent Achievements */}
                    <div className="Skill-achivements">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Recent Achievements
                        </h2>
                        <div className="bg-white rounded-xl flex flex-col gap-4 border border-gray-200 shadow-sm p-5 mb-10">
                            <p className="text-gray-500 text-sm">
                                Milestones based on your performance
                            </p>
                            {achievements.map((a, i) => (
                                <div key={i} className="flex border border-gray-400 justify-between hover:bg-gray-200 cursor-pointer transition-all duration-75 items-center p-3 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <FiAward className="text-blue-600 text-lg" />
                                        <div>
                                            <p className="font-medium text-gray-800">{a.title}</p>
                                            <p className="text-sm text-gray-500">{a.desc}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">{a.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Improvement Recommendations */}
                    <div className="skill-recommendation">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Improvement Recommendations
                        </h2>
                        <div className="bg-white border-dashed border-2 border-gray-200 rounded-xl p-5">
                            <p className="text-gray-500 text-sm mb-3">
                                Focus areas to enhance your skills
                            </p>
                            <ul className="space-y-3">
                                {recommendations.map((rec, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <FiCheckCircle className="text-blue-600 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-800">{rec.title}</p>
                                            <p className="text-sm text-gray-500">{rec.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}