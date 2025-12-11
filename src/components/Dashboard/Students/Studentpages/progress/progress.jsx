import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { LiaCheckCircle } from "react-icons/lia";
import { CiTrophy } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { TiFlashOutline } from "react-icons/ti";
import BackToDashboard from '../../../../common/backDashboard/BackDashboard';

// API Service functions
const progressAPI = {
    // Get overall progress stats
    getProgressStats: async () => {
        try {
            const response = await fetch('/api/progress/stats', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch progress stats');
            return await response.json();
        } catch (error) {
            console.error('Error fetching progress stats:', error);
            throw error;
        }
    },

    // Get course progress data
    getCourseProgress: async () => {
        try {
            const response = await fetch('/api/progress/courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch course progress');
            return await response.json();
        } catch (error) {
            console.error('Error fetching course progress:', error);
            throw error;
        }
    },

    // Get activity data
    getActivityData: async (week) => {
        try {
            const response = await fetch(`/api/progress/activity?week=${week}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch activity data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching activity data:', error);
            throw error;
        }
    },

    // Get achievements
    getAchievements: async () => {
        try {
            const response = await fetch('/api/progress/achievements', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch achievements');
            return await response.json();
        } catch (error) {
            console.error('Error fetching achievements:', error);
            throw error;
        }
    },

    // Get grades
    getGrades: async () => {
        try {
            const response = await fetch('/api/progress/grades', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch grades');
            return await response.json();
        } catch (error) {
            console.error('Error fetching grades:', error);
            throw error;
        }
    },

    // Update course progress
    updateCourseProgress: async (courseId, progressData) => {
        try {
            const response = await fetch(`/api/progress/courses/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(progressData)
            });
            if (!response.ok) throw new Error('Failed to update course progress');
            return await response.json();
        } catch (error) {
            console.error('Error updating course progress:', error);
            throw error;
        }
    }
};

// Constants for fallback data
const FALLBACK_STATS_CARDS = [
    {
        id: 1,
        title: "Overall Progress",
        icon: <IoBookOutline />,
        number: "68%",
        content: (
            <div className="w-[95%] h-3 bg-gray-300 rounded-full overflow-hidden shadow-sm">
                <div className="w-[40%] bg-blue-500 h-3 rounded-full"></div>
            </div>
        ),
    },
    {
        id: 2,
        title: "Total Learning Time",
        icon: <LiaCheckCircle />,
        number: "85h",
        content: "Across all courses",
    },
    {
        id: 3,
        title: "Average Grade",
        icon: <CiTrophy />,
        number: "91%",
        content: "Excellent performance!",
    },
    {
        id: 4,
        title: "Achievements",
        icon: <MdErrorOutline />,
        number: 2,
        content: "Out of 4 available",
    },
];

const TAB_BUTTONS = ["CourseProgress", "Activity", "Achievements", "Grades"];

// Sub-components for better organization
const ProgressBar = ({ percentage, className = "" }) => (
    <div className={`h-2.5 bg-blue-100 rounded-full ${className}`}>
        <div
            className="h-2.5 bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: percentage }}
        ></div>
    </div>
);

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
);

const ErrorMessage = ({ message, onRetry }) => (
    <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-4">{message}</div>
        {onRetry && (
            <button
                onClick={onRetry}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
                Try Again
            </button>
        )}
    </div>
);

const StatCard = ({ title, icon, number, content, loading }) => (
    <div className="border border-gray-200 shadow-md bg-white p-5 rounded-xl h-40 hover:shadow-lg transition">
        <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{title}</p>
            <span className="text-2xl text-blue-600">{icon}</span>
        </div>
        {loading ? (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
        ) : (
            <>
                <h1 className="text-3xl py-3 font-semibold">{number}</h1>
                <div className="text-sm text-gray-500">{content}</div>
            </>
        )}
    </div>
);

const CourseProgressItem = ({ course, loading }) => {
    if (loading) {
        return (
            <div className="bg-white border-2 border-gray-300 w-full rounded-3xl p-5 mt-5 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-5">
                        <div className="h-20 w-20 rounded-xl bg-gray-200"></div>
                        <div className="space-y-2">
                            <div className="h-6 bg-gray-200 rounded w-48"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-12"></div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mt-2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-2 border-gray-300 w-full rounded-3xl p-5 mt-5">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-5">
                    <img
                        className="h-20 w-20 rounded-xl object-cover"
                        src={course.img}
                        alt={course.title}
                    />
                    <div>
                        <h1 className="font-semibold text-lg">{course.title}</h1>
                        <p className="text-gray-500">{course.instructor}</p>
                    </div>
                </div>
                <button className="flex gap-1 bg-blue-50 rounded-full h-8 px-3 items-center text-gray-700">
                    <span className="font-medium">{course.completion}</span>
                    <span>complete</span>
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <p className="text-gray-500 text-sm">Lessons</p>
                    <p className="font-medium">{course.lessons}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Time Spent</p>
                    <p className="font-medium">{course.timeSpent}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Current Grade</p>
                    <p className="font-medium">{course.currentGrade}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Last Activity</p>
                    <p className="font-medium">{course.lastActivity}</p>
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <p className="font-medium">Progress</p>
                    <p className="font-medium">{course.progress}</p>
                </div>
                <ProgressBar percentage={course.progress} />
                <p className="text-gray-500 text-sm mt-2">
                    Currently learning: <span className="font-medium">{course.currentlyLearning}</span>
                </p>
            </div>
        </div>
    );
};

const ActivityChart = ({ data, loading, error, onRetry }) => {
    if (loading) {
        return (
            <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 border border-gray-100 animate-pulse">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded-full w-32"></div>
                </div>
                <div className="grid grid-cols-7 gap-4">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-full h-20 bg-gray-200 rounded-2xl"></div>
                            <div className="h-4 bg-gray-200 rounded w-8 mt-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-12 mt-1"></div>
                            <div className="h-4 bg-gray-200 rounded w-8 mt-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={onRetry} />;
    }

    const totalLessons = data.reduce((sum, d) => sum + d.lessons, 0);
    const totalHours = data.reduce((sum, d) => sum + d.hours, 0);
    const maxHours = Math.max(...data.map((d) => d.hours));

    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center flex-wrap mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Weekly Activity</h2>
                    <p className="text-gray-500 text-sm">Your learning activity for this week</p>
                </div>
                <div className="bg-blue-50 text-blue-600 text-sm px-4 py-2 rounded-full font-medium">
                    {totalLessons} lessons completed
                </div>
            </div>

            <div className="mb-8">
                <p className="text-gray-700 font-medium">This Week</p>
                <p className="text-gray-500 text-sm">{totalHours.toFixed(1)} hours total</p>
            </div>

            <div className="grid grid-cols-7 gap-4">
                {data.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-end text-center">
                        <div className="relative w-full h-20 rounded-2xl bg-blue-100 flex items-end justify-center">
                            <div
                                className="bg-blue-600 w-full rounded-2xl transition-all duration-500"
                                style={{ height: `${(day.hours / maxHours) * 100}%` }}
                            ></div>
                        </div>
                        <div className="mt-2 text-gray-700 text-sm font-medium">{day.hours}h</div>
                        <div className="text-gray-500 text-xs">{day.lessons} lessons</div>
                        <div className="text-gray-600 text-sm font-semibold mt-1">{day.day}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AchievementCard = ({ achievement, loading }) => {
    if (loading) {
        return (
            <div className="flex gap-4 p-5 rounded-xl border-2 bg-gray-100 border-gray-300 animate-pulse">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-48"></div>
                    <div className="h-8 bg-gray-300 rounded-full w-32"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex gap-4 p-5 rounded-xl border-2 ${achievement.earned ? 'bg-blue-100 border-blue-300' : 'bg-gray-100 border-gray-300'
            }`}>
            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-2xl ${achievement.earned ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                {achievement.logo}
            </div>
            <div className="flex-1">
                <h1 className="flex gap-2 items-center text-lg font-semibold">
                    {achievement.title}
                    {achievement.earned && <LiaCheckCircle className="text-blue-600 text-xl" />}
                </h1>
                <p className="text-gray-500 mt-1">{achievement.subTitle}</p>
                <button className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${achievement.earned
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                    }`}>
                    {achievement.buttonText}
                </button>
            </div>
        </div>
    );
};

const GradeItem = ({ grade, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-2xl animate-pulse">
                <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                </div>
            </div>
        );
    }

    const getGradeStatus = (score) => {
        if (score >= 90) return { text: 'excellent', class: 'bg-green-500 text-white' };
        if (score >= 80) return { text: 'good', class: 'bg-blue-500 text-white' };
        if (score >= 70) return { text: 'average', class: 'bg-amber-400 text-white' };
        return { text: 'needs improvement', class: 'bg-red-500 text-white' };
    };

    const status = getGradeStatus(grade.score);

    return (
        <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-2xl hover:border-blue-300 transition">
            <div>
                <h3 className="font-semibold">{grade.title}</h3>
                <p className="text-gray-500 text-sm">{grade.course}</p>
                <p className="text-gray-400 text-xs mt-1">{grade.date}</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <h1 className="flex items-center gap-1">
                        <span className="text-2xl font-bold">{grade.score}</span>
                        <span className="text-gray-500">/ {grade.total}</span>
                        <LiaCheckCircle className="text-green-600 text-xl" />
                    </h1>
                    <button className={`px-3 py-1 rounded-full text-xs font-medium ${status.class}`}>
                        {status.text}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Progress() {
    const [activeTab, setActiveTab] = useState("CourseProgress");
    const [loading, setLoading] = useState({
        stats: true,
        courses: true,
        activity: true,
        achievements: true,
        grades: true
    });
    const [error, setError] = useState({
        stats: null,
        courses: null,
        activity: null,
        achievements: null,
        grades: null
    });
    const [data, setData] = useState({
        stats: FALLBACK_STATS_CARDS,
        courses: [],
        activity: [],
        achievements: [],
        grades: []
    });

    // Fetch all data on component mount
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            await Promise.all([
                fetchProgressStats(),
                fetchCourseProgress(),
                fetchActivityData(),
                fetchAchievements(),
                fetchGrades()
            ]);
        } catch (error) {
            console.error('Error fetching all data:', error);
        }
    };

    const fetchProgressStats = async () => {
        setLoading(prev => ({ ...prev, stats: true }));
        setError(prev => ({ ...prev, stats: null }));
        try {
            const stats = await progressAPI.getProgressStats();
            setData(prev => ({ ...prev, stats }));
        } catch (error) {
            setError(prev => ({ ...prev, stats: error.message }));
            // Use fallback data on error
            setData(prev => ({ ...prev, stats: FALLBACK_STATS_CARDS }));
        } finally {
            setLoading(prev => ({ ...prev, stats: false }));
        }
    };

    const fetchCourseProgress = async () => {
        setLoading(prev => ({ ...prev, courses: true }));
        setError(prev => ({ ...prev, courses: null }));
        try {
            const courses = await progressAPI.getCourseProgress();
            setData(prev => ({ ...prev, courses }));
        } catch (error) {
            setError(prev => ({ ...prev, courses: error.message }));
        } finally {
            setLoading(prev => ({ ...prev, courses: false }));
        }
    };

    const fetchActivityData = async () => {
        setLoading(prev => ({ ...prev, activity: true }));
        setError(prev => ({ ...prev, activity: null }));
        try {
            const activity = await progressAPI.getActivityData('current');
            setData(prev => ({ ...prev, activity }));
        } catch (error) {
            setError(prev => ({ ...prev, activity: error.message }));
        } finally {
            setLoading(prev => ({ ...prev, activity: false }));
        }
    };

    const fetchAchievements = async () => {
        setLoading(prev => ({ ...prev, achievements: true }));
        setError(prev => ({ ...prev, achievements: null }));
        try {
            const achievements = await progressAPI.getAchievements();
            setData(prev => ({ ...prev, achievements }));
        } catch (error) {
            setError(prev => ({ ...prev, achievements: error.message }));
        } finally {
            setLoading(prev => ({ ...prev, achievements: false }));
        }
    };

    const fetchGrades = async () => {
        setLoading(prev => ({ ...prev, grades: true }));
        setError(prev => ({ ...prev, grades: null }));
        try {
            const grades = await progressAPI.getGrades();
            setData(prev => ({ ...prev, grades }));
        } catch (error) {
            setError(prev => ({ ...prev, grades: error.message }));
        } finally {
            setLoading(prev => ({ ...prev, grades: false }));
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "CourseProgress":
                return (
                    <div className="space-y-5">
                        {loading.courses ? (
                            [...Array(2)].map((_, i) => (
                                <CourseProgressItem key={i} loading={true} />
                            ))
                        ) : error.courses ? (
                            <ErrorMessage
                                message={error.courses}
                                onRetry={fetchCourseProgress}
                            />
                        ) : (
                            data.courses.map((course) => (
                                <CourseProgressItem key={course.id} course={course} />
                            ))
                        )}
                    </div>
                );

            case "Activity":
                return (
                    <ActivityChart
                        data={data.activity}
                        loading={loading.activity}
                        error={error.activity}
                        onRetry={fetchActivityData}
                    />
                );

            case "Achievements":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {loading.achievements ? (
                            [...Array(4)].map((_, i) => (
                                <AchievementCard key={i} loading={true} />
                            ))
                        ) : error.achievements ? (
                            <ErrorMessage
                                message={error.achievements}
                                onRetry={fetchAchievements}
                            />
                        ) : (
                            data.achievements.map((achievement) => (
                                <AchievementCard key={achievement.id} achievement={achievement} />
                            ))
                        )}
                    </div>
                );

            case "Grades":
                return (
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h3 className="text-2xl font-semibold mb-1">Quiz & Assessment Results</h3>
                        <p className="text-gray-500 mb-6">Your recent quiz scores and assessments</p>
                        <div className="space-y-4">
                            {loading.grades ? (
                                [...Array(3)].map((_, i) => (
                                    <GradeItem key={i} loading={true} />
                                ))
                            ) : error.grades ? (
                                <ErrorMessage
                                    message={error.grades}
                                    onRetry={fetchGrades}
                                />
                            ) : (
                                data.grades.map((grade) => (
                                    <GradeItem key={grade.id} grade={grade} />
                                ))
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <BackToDashboard />

            {/* Header */}
            <div className="mt-8 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
                <p className="text-gray-600 mt-2">
                    Track your learning journey and celebrate your achievements.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {data.stats.map((card) => (
                    <StatCard
                        key={card.id}
                        {...card}
                        loading={loading.stats}
                    />
                ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex overflow-x-auto mt-10 bg-gray-200 rounded-full p-1">
                {TAB_BUTTONS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 whitespace-nowrap rounded-full px-4 py-2 font-medium transition-all ${activeTab === tab
                            ? "bg-white shadow-sm text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {renderTabContent()}
            </div>
        </div>
    );
}