import React, { useState, useEffect } from "react";
import axios from "axios"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaCalendarAlt, FaClock, FaUsers, FaVideo } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import Code from '../../../assets/code.jpg'
import { IoBookOutline } from "react-icons/io5";
import TeachDas from "./teachDasnav/teachDas";
import './Teach.css';
import DasboardHeader from "../../common/dasHeader/dasboardHeader";
import { Link } from "react-router-dom";
// // import BACKEND_URL from "../../../api/Api";
export default function Teach() {
    const [Tnav, setTnav] = useState(false);
    const [totalCourse, setTotalCourse] = useState(0)
    const [activeCourse, setActiveCourse] = useState(0)
    const [draftCourse, setDraftCourse] = useState(0)
    const [totalStudents, setTotalStudents] = useState(0)
    const [activeWebinar, setActiveWebinar] = useState(0)
    const [completedWebinar, setCompletedWebinar] = useState(0);
    const [inplanningWebinar, setInplanningWebinar] = useState(0)
    const [inPlanningWebinar, setInPlanningWebinar] = useState(0)
    const [studentGrowthData, setStudentGrowthData] = useState([]);
    const [studentChange, setStudentChange] = useState(0)
    const [webinars, setWebinars] = useState([])
    const [courses, setCourses] = useState([])



    // board data
    const board = [
        { title: 'Total Courses', no: totalCourse, sup: `${draftCourse} in draft`, icon: IoBookOutline },
        { title: 'Active Courses', no: activeCourse, sup: 'Currently published', icon: FiCheckCircle },
        { title: 'Total Students', no: totalStudents, sup: `${studentChange >= 0 ? '+' : ''}${studentChange}% from last month`, icon: FaUsers },
        { title: 'Live Webinars', no: activeWebinar, sup: `${inPlanningWebinar} in planning`, icon: FaVideo },
    ]

    //get all course
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/courses/all/courses`)
                if (Array.isArray(res.data))
                    setCourses(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])
    //get total course
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/courses/all/courses`)
                if (Array.isArray(res.data)) {
                    setTotalCourse(res.data.length)
                }
                else if (Array.isArray(res.data.course)) {
                    setTotalCourse(res.data.course.length)
                }
            } catch (err) {
                console.log(err);

            }
        }
        fetchData()
    }, [])

    //get active and draft course
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/courses/all/courses`)
                if (Array.isArray(res.data)) {
                    const Activecount = res.data.filter(course => course.status == "published").length
                    const Draftcount = res.data.filter(course => course.status == "draft").length
                    setActiveCourse(Activecount)
                    setDraftCourse(Draftcount)
                }

            } catch (err) {
                console.log(err);

            }
        }
        fetchData()
    }, []
    )

    //get all webinars
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/webinar/all`)
                if (Array.isArray(res.data.data)) {
                    setWebinars(res.data.data)
                }
            } catch (err) {
                console.log(err);

            }
        }
        fetchData()
    }, [])

    //get active and inplanning webinars
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/webinar/all`);

                // The actual webinars array
                const webinars = res.data.data;

                if (Array.isArray(webinars)) {
                    const active = webinars.filter((w) => w.status === "schedule").length;
                    const Inplanning = webinars.filter((w) => w.status === "in-planning").length;
                    const completed = webinars.filter((w) => w.status === "completed").length;

                    setActiveWebinar(active);
                    setInPlanningWebinar(Inplanning);
                    setCompletedWebinar(completed);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);


    //get total students
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/students`)
                if (Array.isArray(res.data)) {
                    const count = res.data.length
                    setTotalStudents(count)
                }
            } catch (err) {
                console.log(err);

            }
        }
        fetchData()
    }, [])

    // Chart Data
    useEffect(() => {
        const fetchLastSixMonths = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/students`);
                const students = Array.isArray(res.data) ? res.data : res.data.data;

                const now = new Date();
                const lastSix = [];
                for (let i = 5; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    lastSix.push({
                        month: d.toLocaleString("en-US", { month: "short" }),
                        year: d.getFullYear(),
                        students: 0
                    });
                }

                students.forEach(student => {
                    try {
                        const createdDate = new Date(student.createdAt?.$date || student.createdAt);
                        if (isNaN(createdDate)) return;

                        const monthStr = createdDate.toLocaleString("en-US", { month: "short" });
                        const year = createdDate.getFullYear();

                        const monthData = lastSix.find(m => m.year === year && m.month === monthStr);
                        if (monthData) monthData.students += 1;
                    } catch (e) {
                        console.log("Error parsing student date", student, e);
                    }
                });

                setStudentGrowthData(lastSix);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLastSixMonths();
    }, []);

    //upgarde from previous month
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/students`);
                const students = Array.isArray(res.data) ? res.data : res.data.data;

                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
                const lastMonth = lastMonthDate.getMonth();
                const lastMonthYear = lastMonthDate.getFullYear();

                let currentMonthCount = 0;
                let lastMonthCount = 0;

                students.forEach(student => {
                    const createdDate = new Date(student.createdAt?.$date || student.createdAt);
                    if (isNaN(createdDate)) return;

                    const month = createdDate.getMonth();
                    const year = createdDate.getFullYear();

                    if (year === currentYear && month === currentMonth) currentMonthCount += 1;
                    if (year === lastMonthYear && month === lastMonth) lastMonthCount += 1;
                });

                const change = lastMonthCount === 0
                    ? 100
                    : ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;

                setStudentChange(Math.round(change));  // e.g., 8.2
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);




    //     { month: "Jan", students: 150 },
    //     { month: "Feb", students: 180 },
    //     { month: "Mar", students: 210 },
    //     { month: "Apr", students: 270 },
    //     { month: "May", students: 300 },
    //     { month: "Jun", students: 330 },
    // ];

    // Top Students
    const topStudents = [
        { id: 1, name: "Alice Johnson", course: "React Development", score: 98, image: Code },
        { id: 2, name: "Bob Smith", course: "JavaScript Patterns", score: 92, image: Code },
        { id: 3, name: "Carol Davis", course: "React Development", score: 89, image: null },
    ];


    return (
        <>
            <main>
                <DasboardHeader Tview={Tnav} setTnav={setTnav} userType="teacher" />
                <section className="flex">
                    <TeachDas min={Tnav} />
                    {/* overall teach */}
                    <div className="teach-main bg-gray-50 p-5 py-5 pt-30">
                        {/* Header */}
                        <div className="mb-5">
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Welcome back, Dr.!
                            </h1>
                            <p className="text-gray-500">
                                Here's how your courses and webinars are performing this month.
                            </p>
                        </div>
                        {/* Top Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {board.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <div key={i}>
                                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                            <div className="t-box flex justify-between items-center">
                                                <p className="text-sm text-gray-500">{item.title}</p>
                                                <Icon className="text-lg text-gray-500" />
                                            </div>
                                            <h2 className="text-2xl font-semibold mt-1">{item.no}</h2>
                                            <p className="text-xs text-gray-400 mt-1">{item.sup}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Student Growth & Top Students */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                                <h3 className="text-lg font-medium mb-2">Student Growth</h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    Monthly student enrollment trends
                                </p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={studentGrowthData}>
                                        <XAxis dataKey="month" />
                                        <Tooltip />
                                        <Bar dataKey="students" fill="#2563eb" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-white p-6 px-8 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-medium mb-4">Top Performing Students</h3>
                                {topStudents.map((student, index) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between py-3 px-2 border-b border-gray-100 last:border-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* student id no */}
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center" >{student.id}</div>
                                            {/* student image or first letter */}
                                            {student.image ? (<>
                                                <div className="teach-top-student rounded-full overflow-hidden bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                                    <img src={Code} alt={student.name} />
                                                </div>
                                            </>) : (
                                                <>
                                                    <div className="teach-top-student rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                                        {student.name.split(" ")[0][0]}
                                                    </div>
                                                </>
                                            )}
                                            {/* student name and course */}
                                            <div>
                                                <p className="text-gray-800 text-sm font-medium">{student.name}</p>
                                                <p className="text-xs text-gray-500">{student.course}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col ">
                                            <p
                                                className="text-lg"
                                            >{student.score}%</p>
                                            <p> {student.score}%</p>
                                        <div className="t-top-cover relative bg-gray-700">
                                            <p className="w-10 h-1 absolute  rounded-3xl bg-blue-600"></p>
                                            <h1 className=" bg-sky-600 absolute rounded-3xl" style={{ width: `${student.score}` }}></h1>
                                        </div>
                                    </div>

                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Upcoming Webinars */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg font-medium">Upcoming Live Webinars</h3>
                            <Link to={"/teacher/scheduleWebinar"}><button className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-2xl hover:bg-blue-700 transition">
                                + Schedule Webinar
                            </button></Link>
                        </div>
                        {/* {webinars
                            .filter(w=>w.status=="schedule")
                            .map((w, idx) => (
                                
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 p-2"
                                >
                                    <div className="txt cover flex justify-between w-full rounded-2xl px-2 border border-gray-400 hover:bg-gray-200">
                                        <div className="p-3 ">
                                            <h4 className="font-medium text-gray-800">{w.title}</h4>
                                            <div className="flex gap-3 text-sm text-gray-500 mt-1">
                                                <div className="w-box flex gap-1 justify-center items-center">
                                                    <FaCalendarAlt />
                                                    <small className="text-gray-400">{formattedDateTime.replace(",", " at")}</small>
                                                </div>
                                                <div className="w-box flex gap-1 justify-center items-center">
                                                    <FaClock />
                                                    <small className="text-gray-400">{w.duration}</small>
                                                </div>
                                                <div className="w-box flex gap-1 justify-center items-center">
                                                    <FaUsers />
                                                    <small className="text-gray-400">{w.registered} registered</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3 sm:mt-0">
                                            <span className="text-white text-sm font-medium rounded-2xl bg-green-500 px-2 py-1">
                                                scheduled
                                            </span>
                                            <div className="icon-box p-2 cursor-pointer hover:text-white rounded-2xl hover:bg-green-700 bg-gray-200 border border-gray-500">
                                                <MdOutlineEdit className=" cursor-pointer text-2xl " />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                        {webinars
                            .filter(w => w.status === "schedule")
                            .map((w, idx) => {

                                // ✅ FORMAT DATE INSIDE MAP BLOCK
                                const formattedDateTime = new Date(
                                    w.webinarSchedule?.sessions?.[0]?.startDateTime
                                ).toLocaleString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "America/New_York",
                                });

                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 p-2"
                                    >
                                        <div className="txt cover flex justify-between w-full rounded-2xl px-2 border border-gray-400 hover:bg-gray-200">
                                            <div className="p-3 ">
                                                <h4 className="font-medium text-gray-800">{w.title}</h4>

                                                <div className="flex gap-3 text-sm text-gray-500 mt-1">
                                                    <div className="w-box flex gap-1 justify-center items-center">
                                                        <FaCalendarAlt />
                                                        <small className="text-gray-400">
                                                            {formattedDateTime.replace(",", " at")}
                                                        </small>
                                                    </div>

                                                    <div className="w-box flex gap-1 justify-center items-center">
                                                        <FaClock />
                                                        <small className="text-gray-400">{w.duration}</small>
                                                    </div>

                                                    <div className="w-box flex gap-1 justify-center items-center">
                                                        <FaUsers />
                                                        <small className="text-gray-400">{w.registered} registered</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 mt-3 sm:mt-0">
                                                <span className="text-white text-sm font-medium rounded-2xl bg-green-500 px-2 py-1">
                                                    scheduled
                                                </span>

                                                <div className="icon-box p-2 cursor-pointer hover:text-white rounded-2xl hover:bg-green-700 bg-gray-200 border border-gray-500">
                                                    <MdOutlineEdit className="cursor-pointer text-2xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                    </div>

                    {/* Course Performance */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-medium mb-5">Course Performance</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {courses
                                .filter(c => c.status == "published")
                                .map((course, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                                    >
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-4 w-full flex flex-col gap-2">
                                            <h4 className="font-semibold text-gray-800">
                                                {course.title}
                                            </h4>
                                            <div className="w-full flex flex-col gap-2">
                                                <div className="top flex justify-between">
                                                    <div className="t-left">
                                                        <small className="text-gray-400">students</small>
                                                        <p>{course.students}</p>
                                                    </div>
                                                    <div className="t-right">
                                                        <small className="text-gray-400">students</small>
                                                        <p>⭐{course.rating}</p>
                                                    </div>
                                                </div>
                                                <div className="bottom flex justify-between">
                                                    <div className="t-left">
                                                        <small className="text-gray-400">Completion</small>
                                                        <p>{course.rating}</p>
                                                    </div>
                                                    <div className="t-right">
                                                        <small className="text-gray-400">Status</small>
                                                        <p className="text-[10px] bg-gray-400 p-1 rounded-2xl">{course.status}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </main >
        </>
    );
};