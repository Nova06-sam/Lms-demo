import React from "react";
import { FaStar } from "react-icons/fa";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";

const courses = [
    {
        id: 1,
        title: "Complete React Development",
        students: 1247,
        revenue: "$18,750",
        rating: 4.8,
        completion: 78,
        engagement: 85,
        status: "Trending",
    },
    {
        id: 2,
        title: "Advanced JavaScript Patterns",
        students: 892,
        revenue: "$13,380",
        rating: 4.9,
        completion: 85,
        engagement: 92,
        status: "Trending",
    },
    {
        id: 3,
        title: "Node.js Backend Development",
        students: 634,
        revenue: "$9,510",
        rating: 4.7,
        completion: 72,
        engagement: 79,
        status: "Declining",
    },
];

const CourseAnalytics = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 md:px-10">
            <div className="w-full max-w-6xl space-y-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            {/* Course Info */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {course.title}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {course.students} students • {course.revenue} revenue •{" "}
                                    <span className="inline-flex items-center">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        {course.rating} rating
                                    </span>
                                </p>
                            </div>

                            {/* Status Tag */}
                            <div className="flex items-center">
                                {course.status === "Trending" ? (
                                    <span className="flex items-center gap-1 bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                                        <HiArrowTrendingUp />
                                        <small>{course.status}</small>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                        <HiArrowTrendingDown />
                                        <small>{course.status}</small>
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="mt-4 grid md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Completion Rate</p>
                                <div className="cover flex justify-between gap-2 items-center">
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${course.completion}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {course.completion}%
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-2">Student Engagement</p>
                               <div className="cover flex justify-between gap-2 items-center">
                                   <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${course.engagement}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {course.engagement}%
                                </p>
                               </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-2">Revenue per Student</p>
                                <p className="text-lg font-semibold text-gray-900">$15</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseAnalytics;
