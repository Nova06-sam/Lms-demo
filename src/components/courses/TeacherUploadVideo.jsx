import React, { useState } from "react";
import axios from "axios";
// // import BACKEND_URL from "../../api/Api";

const TeacherUploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setMessage("Please select a video to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("VideoFile", video);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setUploading(true);
      setMessage("");

      const res = await axios.post(
        `http://localhost:5000/api/courses/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      setMessage("✅ Video uploaded successfully!");
      console.log("Response:", res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };


  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">📤 Upload Video (Teacher)</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        ></textarea>

        <input type="file" accept="video/*" onChange={handleFileChange} className="underline "/>

        {uploading && (
          <div className="mt-2 hover:bg-gray-600 p-2 rounded transition">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1 text-gray-500">Uploading {progress}%</p>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}



    </div>
  );
};

export default TeacherUploadVideo;
