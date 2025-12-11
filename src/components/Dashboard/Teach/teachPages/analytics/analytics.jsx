import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import BackToDashboard from "../../../../common/backDashboard/BackDashboard";
import Student from "./students/students";
import './analytics.css';
import EngagementAnalytics from "./engagement/engagement";
import { MdPeopleOutline } from "react-icons/md";
import { RiFocus2Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";
import { LiaCertificateSolid } from "react-icons/lia";
import CourseAnalytics from "./courses/courses";
import StudentGeoDistribution from "./geoGraphic/geoGraphic";
export default function Analytics() {
    // Sample data

    const start = [

        { title: "Total Students", value: "2,773", change: "+12.5%", positive: true, icon: MdPeopleOutline },
        { title: "Total Revenue", value: "$41,640", change: "+8.3%", positive: true, icon: RiFocus2Line },
        { title: "Average Rating", value: "4.7", change: "+2.1%", positive: true, icon: FaRegStar },
        { title: "Completion Rate", value: "76%", change: "-3.2%", positive: false, icon: LiaCertificateSolid },

    ]

    const tabs = ["Overview", "Courses", "Students", "Engagement", "Geographic"];
    const [check, setCheck] = useState('Overview')

    const data = [
        { month: "Jan", value: 120 },
        { month: "Feb", value: 160 },
        { month: "Mar", value: 240 },
        { month: "Apr", value: 300 },
        { month: "May", value: 340 },
        { month: "Jun", value: 380 },
        { month: "Jul", value: 420 },
        { month: "Aug", value: 460 },
        { month: "Sep", value: 500 },
        { month: "Oct", value: 540 },
        { month: "Nov", value: 580 },
    ];

    const progressData = [
        { name: "Completed", value: 76, color: "#22c55e" },
        { name: "In Progress", value: 18, color: "#f59e0b" },
        { name: "Not Started", value: 6, color: "#6b7280" },
    ];

    const activityData = [
        { time: "00:00", value: 60 },
        { time: "04:00", value: 30 },
        { time: "08:00", value: 80 },
        { time: "12:00", value: 150 },
        { time: "16:00", value: 230 },
        { time: "20:00", value: 190 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            {/* Header */}
            <BackToDashboard />
            <div className="mb-8">
                <h1 className="text-3xl font-bold pt-10 text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Comprehensive insights into your course performance and student engagement.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {start.map((card, idx) => {
                    const Icon = card.icon
                    return (
                        <div
                            key={idx}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md"
                        >
                            <div className="flex  justify-between items-baseline-last">
                                <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
                                <Icon className="text-lg" />
                            </div>

                            <p className="text-2xl font-semibold text-gray-900 mt-2">{card.value}</p>
                            <p
                                className={`text-sm mt-2 ${card.positive ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {card.change} from last month
                            </p>
                        </div>
                    )
                })}
            </div>

            {/* Tabs */}
            <div className="flex tabs flex-wrap border-b border-gray-200 mb-6 text-sm font justify-between bg-gray-200 px-5 py-2 rounded-3xl">
                {tabs.map((item, i) => {
                    return (
                        <button
                            onClick={() => setCheck(item)}
                            className={`px-4 py-1 rounded-3xl ' ${check === item ? ' bg-white shadow-md' : 'hover:bg-white'}`}>{item}</button>
                    )
                })}
            </div>


            {check === "Overview" &&
                <div className="cover-bot">
                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Line Chart */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
                            {/* Title */}
                            <h2 className="text-lg font-semibold text-gray-800">
                                Enrollment & Revenue Trends
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Monthly student enrollments and revenue
                            </p>

                            {/* Chart */}
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        {/* Gradient for the area */}
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.7} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>

                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                                            domain={[0, 650]}
                                        />
                                        <Tooltip
                                            cursor={{ strokeDasharray: "3 3" }}
                                            contentStyle={{
                                                backgroundColor: "white",
                                                borderRadius: "8px",
                                                border: "1px solid #e5e7eb",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Doughnut Chart */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-800 mb-4">Student Progress Distribution</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={progressData}
                                        dataKey="value"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                    >
                                        {progressData.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Area Chart */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <h3 className="font-semibold text-gray-800 mb-4">Daily Learning Activity</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={activityData}>
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10b981"
                                    fill="#10b981"
                                    fillOpacity={0.3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            }

            {/* course */}

            {check === 'Courses' &&
                <CourseAnalytics />
            }

            {check === 'Students' &&
                <Student />
            }

            {check === 'Engagement' &&
                <EngagementAnalytics />
            }

            {check === 'Geographic' &&
                <StudentGeoDistribution />
            }


            {/* Footer Buttons */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-base font-medium text-gray-900">
                        Export Analytics Data
                    </h3>
                    <p className="text-sm text-gray-500">
                        Download detailed reports for external analysis
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 sm:px-3 sm:py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition">
                        <i className="fa fa-download" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                        <i className="fa fa-file-pdf" /> Export PDF Report
                    </button>
                </div>
            </div>
        </div>
    );
};

