import React from "react";
import './achievement.css'
import {
    FaTrophy,
    FaBolt,
    FaCheckCircle,
    FaStar,
    FaLock,
} from "react-icons/fa";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";

const Achievements = () => {
    const stats = [
        {
            label: "Total Points",
            value: "2450",
            color: "bg-yellow-100 text-yellow-700",
            icon: <FaTrophy />,
        },
        {
            label: "Day Streak",
            value: "7",
            color: "bg-orange-100 text-orange-700",
            icon: <FaBolt />,
        },
        {
            label: "Courses Done",
            value: "3",
            color: "bg-green-100 text-green-700",
            icon: <FaCheckCircle />,
        },
        {
            label: "Badges Earned",
            value: "4",
            color: "bg-purple-100 text-purple-700",
            icon: <FaStar />,
        },
        {
            label: "Best Streak",
            value: "12",
            color: "bg-blue-100 text-blue-700",
            icon: <FaBolt />,
        },
    ];

    const earnedBadges = [
        {
            title: "Top Performer",
            desc: "Achieved 90%+ on 5 assessments",
            type: "Achievement",
            date: "Oct 28, 2025",
            color: "text-yellow-500",
            bgColor: "bg-yellow-100",
            icon: <FaTrophy />,
        },
        {
            title: "Consistent Learner",
            desc: "Maintained a 7-day learning streak",
            type: "Engagement",
            date: "Nov 2, 2025",
            color: "text-orange-500",
            bgColor: "bg-orange-100",
            icon: <FaBolt />,
        },
        {
            title: "Quick Starter",
            desc: "Completed first course module",
            type: "Progress",
            date: "Oct 15, 2025",
            color: "text-blue-500",
            bgColor: "bg-blue-100",
            icon: <FaCheckCircle />,
        },
        {
            title: "Code Master",
            desc: "Solved 10 coding challenges",
            type: "Achievement",
            date: "Oct 20, 2025",
            color: "text-purple-500",
            bgColor: "bg-purple-100",
            icon: <FaStar />,
        },
    ];

    const lockedBadges = [
        {
            title: "Perfect Score",
            desc: "Achieved 100% on any assessment",
            type: "Achievement",
        },
        {
            title: "Knowledge Seeker",
            desc: "Complete 10 courses",
            type: "Progress",
        },
    ];

    return (
        <>
            <section className="pt-6">
                <BackToDashboard/>
                <div className=" bg-gray-50 p-6 md:p-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Achievements & Gamification
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Track your achievements, badges, and learning milestones
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-4 mb-10">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition"
                            >
                                <div className={`text-2xl mb-2 ${stat.color} p-3 rounded-full`}>
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Level Progress */}
                    <div className="bg-blue-600 level-main achi-level rounded-xl p-6 text-white mb-10">
                        <div className="flex justify-between lev-cover items-center mb-2">
                            <div className="lev-txt">
                                <p className="text-lg font-semibold">Current Level</p>
                                <p className="text-2xl font-bold">Level 5</p>
                            </div>
                            <div className="lev-txt">
                                <p className="text-lg font-semibold">Next Level</p>
                                <p className="text-2xl font-bold">Level 6</p>
                            </div>
                        </div>
                        <div className="flex justify-between py-3">
                            <p>2450/3800 xp</p>
                            <p>65%</p>
                        </div>
                        <div className="w-full bg-blue-300 rounded-full h-3 mb-2">
                            <div
                                className="bg-white h-3 rounded-full"
                                style={{ width: "65%" }}
                            ></div>
                        </div>
                        <p className="text-sm text-blue-100">
                            1,350 XP needed to reach Level 6
                        </p>
                    </div>

                    {/* Earned Badges */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Earned Badges
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                            {earnedBadges.map((badge, i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md flex flex-col justify-center items-center gap-1 transition"
                                >
                                    <div
                                        className={`text-3xl mb-3 flex justify-center ${badge.bgColor} p-3 rounded-full`}
                                    >
                                        {React.cloneElement(badge.icon, { className: badge.color })}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                                        {badge.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center mt-1">
                                        {badge.desc}
                                    </p>
                                    <button className="text-xs text-gray-500 text-center mt-2 bg-gray-200 p-1 px-3 rounded-2xl">
                                        {badge.type}
                                    </button>
                                    <p className="text-xs text-gray-400 text-center mt-1">
                                        Earned {badge.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Locked Badges */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Locked Badges
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                            {lockedBadges.map((badge, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-100 border  hover:bg-white transition-all duration-75 cursor-pointer border-gray-200 rounded-xl p-5 text-center opacity-70 flex flex-col items-center justify-center"
                                >
                                    <div className="lock bg-gray-600 p-3 rounded-full">
                                        <FaLock className="text-gray-400 text-3xl" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-600">
                                        {badge.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">{badge.desc}</p>
                                    <p className="text-xs text-white mt-2 bg-gray-400 px-2 py-1 rounded-2xl ">
                                        {badge.type}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Leaderboard Position
                        </h2>
                        <p className="text-sm text-gray-500 mb-3">Your ranking among peers</p>
                        {/* insider */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 rounded-lg p-4">
                            <div className="lead-left flex justify-center items-center gap-2 mb-3 sm:mb-0">
                                <p className="text-white p-4 bg-blue-500 rounded-full font-bold text-xl">#12</p>
                                <div className="lead-txt">
                                    <h1 className="font-bold">You're in the Top 15%</h1>
                                    <p className="text-sm text-gray-500">
                                        Out of 324 learners in your cohort
                                    </p>
                                </div>
                            </div>
                            <button className="mt-3 sm:mt-0 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-600 hover:text-white transition-colors duration-200">
                                View Full Leaderboard
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Achievements;