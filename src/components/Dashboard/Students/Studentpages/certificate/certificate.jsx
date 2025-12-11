import React from "react";
import { FiDownload, FiShare2, FiCheckCircle } from "react-icons/fi";
import { GiAchievement } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
import { LuClock4 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import Code from '../../../../../assets/code.jpg'
import { MdOutlineDateRange } from "react-icons/md";
export default function Certification() {
    const summaryStats = [
        { title: "Earned Certificates", value: 2, subtitle: "Ready to download", icon: GiAchievement, },
        { title: "In Progress", value: 2, subtitle: "Certificates pending", icon: LuClock4 },
        { title: "Average Grade", value: "92%", subtitle: "Excellent performance!", icon: FaRegStar },
        { title: "Skills Earned", value: 9, subtitle: "Verified skills", icon: IoMdCheckmarkCircleOutline },
    ];

    const round = {
        width: '60px',
        height: '60px',
        background: "blue",
        "border-radius": '50%',
    }
    const bg = {
        'background-color': 'rgb(102, 99, 99,0.7)'
    }
    const earnedCertificates = [
        {
            id: 1,
            title: "Python for Data Science - Advanced",
            author: "Dr. Emily Rodriguez",
            date: "Dec 15, 2024",
            verified: true,
            grade: 94,
            skills: ["Python Programming", "Data Analysis", "Machine Learning", "Pandas"],
            credentialId: "PDS-2024-001247",
            image: Code,
        },
        {
            id: 2,
            title: "Complete JavaScript Bootcamp",
            author: "John Stevens",
            date: "Nov 28, 2024",
            verified: true,
            grade: 89,
            skills: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming"],
            credentialId: "JS-2024-000892",
            image: Code,
        },
    ];

    const progressCertificates = [
        {
            id: 1,
            title: "Complete React Development Course",
            author: "Sarah Johnson",
            progress: 75,
            requirements: "Complete all modules and pass final assessment",
            expected: "Dec 28, 2024",
            image: Code,
        },
        {
            id: 2,
            title: "UI/UX Design Fundamentals",
            author: "Mike Chen",
            progress: 40,
            requirements: "Submit portfolio project and pass peer review",
            expected: "Jan 15, 2025",
            image: Code,
        },
    ];

    const achievements = [
        {
            title: "Quick Learner",
            desc: "Earned first certificate in under 30 days",
            date: "Nov 28, 2024",
        },
        {
            title: "Excellence Award",
            desc: "Achieved 90+ grade on all certificates",
            date: "Dec 15, 2024",
        },
        {
            title: "Multi-Skilled",
            desc: "Earn certificates in 3 different categories",
            progress: "2/3",
        },
    ];

    return (
        <>
            <section>
                <BackToDashboard />
                <div className=" bg-gray-50 px-6 py-8 pt-15 md:px-12">
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Certificates</h1>
                    <p className="text-gray-600 mb-8">
                        Showcase your learning achievements and earned credentials
                    </p>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
                        {summaryStats.map((stat, i) => {
                            const Icon = stat.icon
                            return (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border border-gray-200 p-5 s shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex justify-between mb-4">
                                        <h3 className="text-sm text-gray-500">{stat.title}</h3>
                                        <Icon className="text-xl text-gray-500" />
                                    </div>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                                    <p className="text-xs text-green-600 mt-1">{stat.subtitle}</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Earned Certificates */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Earned Certificates
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {earnedCertificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                            >
                                <div className="relative group">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full object-cover"
                                    />
                                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full z-20">
                                        Grade: {cert.grade}%
                                    </span>
                                    <div style={bg} className="absolute inset-0 cer-over flex flex-col items-center justify-center text-white text-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <GiAchievement className="text-5xl text-blue-600" />
                                        <p className="text-lg font-semibold">{cert.title}</p>
                                        <p className="text-sm">Certificate of Completion</p>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <p className="text-gray-700 font-medium">{cert.title}</p>
                                    <p className="text-sm text-gray-500 mb-2">by {cert.author}</p>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                        <p className="flex justify-center gap-1"><FiCheckCircle className="mt-1" />Verified</p>
                                        <p className="flex justify-center gap-1"><MdOutlineDateRange className="mt-1" />{cert.date}</p>
                                    </div>
                                    <h1 className="mb-2 text-gray-600 font-bold">Skills Earned:</h1>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {cert.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="bg-blue-50 text-gray-500 text-xs px-3 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <hr className="mb-2 border border-gray-400" />
                                    <p className="text-xs text-gray-400 mb-3">
                                        Credential ID: {cert.credentialId}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                                            <FiDownload /> Download
                                        </button>
                                        <button className="text-gray-600 hover:text-blue-600 flex items-center gap-2 text-sm">
                                            <FiShare2 /> Share
                                        </button>
                                        <button>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Certificates In Progress */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Certificates in Progress
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {progressCertificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-start gap-4 mb-3">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{cert.title}</h3>
                                        <p className="text-sm text-gray-500">by {cert.author}</p>
                                    </div>
                                </div>
                                <div className="mb-2 flex justify-between text-sm text-gray-600">
                                    <span>Progress</span>
                                    <span>{cert.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full mb-3 overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${cert.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Requirements: {cert.requirements}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Expected: {cert.expected}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Certificate Achievements */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Certificate Achievements
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {achievements.map((a, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-xl p-6 flex justify-center flex-col items-center shadow-sm hover:shadow-md transition"
                            >
                                <div style={round} className="mb-3 flex items-center justify-center"><GiAchievement className="text-white text-3xl" /></div>
                                <h3 className="font-semibold text-gray-800">{a.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{a.desc}</p>
                                {a.progress ? (
                                    <div className="w-full">
                                        <div className="flex justify-between">
                                            <p className="text-sm text-gray-600 mb-2">Progress</p>
                                            <p className="text-sm text-gray-600 mb-2">{a.progress}</p>
                                        </div>
                                        <div className="w-full bg-gray-200 h-2 rounded-full mb-3 overflow-hidden">
                                            <div className="bg-blue-600 h-2 rounded-full"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="text-xs bg-blue-600 p-1 px-3 rounded-3xl text-white">
                                        Earned on {a.date}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}
