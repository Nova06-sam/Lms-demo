import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white shadow-md rounded-4xl overflow-hidden w-full sm:w-72 mt-[-50px]">
      <img
        src={course.thumbnail || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={course.courseTitle}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{course.courseTitle}</h3>
        <p className="text-sm text-gray-500 mb-2">
          by {course.instructor || "Instructor"}
        </p>

        <div className="mb-3 mt-6">
          <div className="flex justify-between">
            <p className="text-sm">Progress</p>
            <p className="text-sm">{course.progress || 0}%</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${course.progress || 0}%` }}
            ></div>
          </div>
        </div>

        <Link
          to={`/student/mycourses/videoplayer/${course._id}`}
          className="block bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-6 mb-5"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
};
