import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
// // import BACKEND_URL from "../../../../../api/Api";
const OneCourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courses/single/${courseId}`);
      setCourse(res.data.course);
    } catch (err) {
      console.error("Error loading course:", err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

 if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      className="px-5 md:px-20 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="back mb-10">
        <button
          onClick={() => window.history.back()}
          className="bg-white shadow-md font-bold hover:bg-green-400 hover:text-white transition-all text-lg rounded-full py-2 px-4 text-center"
        >
          &larr; Back to My Courses
        </button>
      </div>
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.img
          key={course.thumbnail}
          src={course.thumbnail}
          alt=""
          className="w-full rounded-2xl shadow-xl object-cover max-h-[350px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {course.courseTitle}
          </h1>

          <p className="text-gray-600 text-lg">{course.courseDescription}</p>

          <div className="flex flex-wrap gap-4 mt-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm">
              {course.courseCategory}
            </span>

            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm">
              {course.courseLevel}
            </span>

            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm">
              {course.subcriptionPlan}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Chapters Section */}
      <h2 className="text-2xl font-bold mt-14 mb-4">📚 Course Chapters</h2>

      <div className="space-y-6">
        {course.chapters.map((chap, i) => (
          <motion.div
            key={i}
            className="p-5 border rounded-2xl shadow-sm bg-white hover:shadow-md transition cursor-pointer"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {i + 1}. {chap.lessonName}
            </h3>

            <p className="text-gray-600 mt-1">{chap.lessonDescription}</p>

            {/* Video Section */}
            {chap.lessonVideoURL && (
              <motion.video
                width="100%"
                controls
                className="rounded-xl mt-4 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <source src={chap.lessonVideoURL} />
              </motion.video>
            )}

            {/* PDFs Section */}
            {chap.lessonPdf && chap.lessonPdf.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-lg font-semibold">📄 Lesson PDFs</h4>

                {chap.lessonPdf.map((pdf, index) => (
                  <a
                    key={index}
                    href={pdf.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-gray-100 p-2 rounded-lg text-blue-600 hover:bg-gray-200 transition"
                  >
                    👉 {pdf.name}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OneCourseDetails;
