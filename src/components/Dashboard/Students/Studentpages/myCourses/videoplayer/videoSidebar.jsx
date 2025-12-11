

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// // import BACKEND_URL from "../../../../../../api/Api";
export default function VideoSidebar({ data, onLessonClick }) {
  const { courseId } = useParams();
  // const backend_url = "http://localhost:5000";
  const [lessons, setlessons] = useState([]);
  const [totallesson, settotallesson] = useState('' || 0)
  const [completelesson, setcompletelesson] = useState('' || 0)
  const progressPercentage = totallesson === 0 ? 0 : Math.round((completelesson / totallesson) * 100);
  const [durations, setDurations] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        setlessons(res.data.chapters);
        settotallesson(res.data.chapters.length);
        res.data.chapters.forEach((lesson) => {
          if (lesson.lessonVideoURL) {
            getVideoDuration(lesson.lessonVideoURL, (minutes) => {
              setDurations(prev => ({
                ...prev,
                [lesson._id]: minutes
              }));
            });
          }
        });
      } catch (error) {
        console.log(`Error fetching in VideoSidebar: ${error}`);
      }
    };
    fetchData();
  }, [courseId]);

  const handlefunction = (id) => {
    console.log("Clicked lesson ID:", id);
    onLessonClick(id); // ✅ send lessonId to parent
  };

  const getVideoDuration = (url, callback) => {
    const video = document.createElement("video");
    video.src = url;
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const minutes = (video.duration / 60).toFixed(2);
      callback(minutes);
    };

    video.onerror = () => callback(null);
  };

  return (
    <div className="p-6">
      <Link 
        onClick={() => window.history.back()}
      className="mb-4 hover:bg-green-400 text-lg rounded-full p-2 w-50 -ml-5 -mt-2.5">
        &larr; Back to Course
      </Link>
      <h2 className="text-lg font-bold mb-4">Course Progress</h2>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>{completelesson} of {totallesson} lessons completed</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li
            onClick={() => handlefunction(lesson._id)}
            key={lesson._id}
            className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-blue-50"
          >
            <div>
              <p className="font-medium">{lesson.lessonName}</p>
              <p className="text-xs text-gray-400">{durations[lesson._id] ? `${durations[lesson._id]} min` : "Loading..."}</p>
            </div>
            <video
              src={lesson.lessonVideoURL}
              preload="metadata"
              className="hidden"
              crossOrigin="anonymous"
              onLoadedMetadata={(e) => {
                const seconds = e.target.duration;
                const minutes = (seconds / 60).toFixed(2);
                setDurations((prev) => ({ ...prev, [lesson._id]: minutes }));
              }}
            />
            {lesson.completed && <FaCheckCircle className="text-green-500" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
