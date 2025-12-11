

import React, { useEffect, useState } from "react";
import VideoSidebar from "./videoSidebar";
import VideoTabs from "./videTabs";
import VideoPlayer from "./videoPlayer";
import VideoNotes from "./VideoTab/videoNotes";
import VideoResources from "./VideoTab/videoResources";
import VideoAssignments from "./VideoTab/videoAssignments";
import VideoDiscussion from "./VideoTab/videoDiscussion";
import { CiHeart } from "react-icons/ci";
import { FiShare } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router-dom";
// // import BACKEND_URL from "../../../../../../api/Api";

export default function VideoMain() {
  // const backend_url = "http://localhost:5000";
  const [activeTab, setActiveTab] = useState("notes");
  const { courseId } = useParams();
  const [courseData, setcourseData] = useState({});
  const [lessonID, setlessonID] = useState("");

  // const studentId = localStorage.getItem("studentId");

  // Fetch course data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/single/${courseId}`);
        setcourseData(res.data.course);
        console.log("course deatils", res.data.course)
      } catch (error) {
        console.log(`Error fetching in VideoMain: ${error}`);
      }
    };
    fetchData();
  }, [courseId]);

  useEffect(() => {
    if (courseData?.chapters?.length > 0 && !lessonID) {
      console.log("Auto-selecting:", courseData.chapters[0]._id);
      setlessonID(courseData.chapters[0]._id);
    }
  }, [courseData]);

  // ✅ receive lessonId from sidebar (child)
  const handleLessonSelect = (id) => {
    console.log("✅ Received lesson ID from child:", id);
    setlessonID(id);
  };

  // ✅ find the selected lesson from chapters
  const selectedChapter =
    courseData.chapters?.find((ch) => ch._id === lessonID);

  console.log("selected lesson", selectedChapter, "title", courseData.courseTitle)

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-white shadow-sm border-r">
        {/* ✅ Pass the callback here */}
        <VideoSidebar data={courseData} onLessonClick={handleLessonSelect} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Complete {courseData.courseTitle} Course
            </h1>
            <p className="text-gray-500 mb-6">by Sarah Johnson</p>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-2 text-center border-2 border-gray-300 h-10 text-lg rounded-xl p-2 cursor-pointer hover:bg-blue-400 hover:border-gray-50 hover:text-white ">
              <span className="py-1">
                <FiShare />
              </span>
              <span>Share</span>
            </div>
            <span className="border-2 border-gray-300 h-10 text-3xl rounded-xl py-1 px-1 w-11 cursor-pointer hover:bg-green-400 hover:border-gray-50 hover:text-red-600 ">
              <CiHeart />
            </span>
          </div>
        </div>

        {/* ✅ Dynamic Video Player */}
        {selectedChapter ? (
          <VideoPlayer
            title={selectedChapter.lessonName}
            subtitle={selectedChapter.lessonDescription}
            videoUrl={selectedChapter.lessonVideoURL}
            // studentId={studentId}
            videoId={selectedChapter._id}
            courseId={courseId}
          />
        ) : (
          <VideoPlayer />
        )}

        {/* Tabs */}
        <VideoTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "notes" && <VideoNotes courseId={courseId} lessonId={lessonID} />}
        {activeTab === "resources" && <VideoResources pdfs={selectedChapter?.lessonPdf || []} />}
        {activeTab === "assignments" && <VideoAssignments courseTitle={courseData.courseTitle} />}
        {activeTab === "discussion" && <VideoDiscussion lessonId={lessonID} />}

      </div>
    </div>
  );
}
