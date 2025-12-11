import React, { useState, useRef } from "react";
import axios from "axios";

export default function VideoPlayer({ title, subtitle, videoUrl, studentId, videoId, courseId }) {
    const videoRef = useRef(null);

    // const [watchSeconds, setWatchSeconds] = useState(0);
    // const lastSent = useRef(0);

    // if (!studentId) console.log("⚠ No studentId passed");
    // if (!videoId) console.log("⚠ No videoId passed from VideoMain");

    // const handleTimeUpdate = () => {
    //     const current = Math.floor(videoRef.current.currentTime);
    //     setWatchSeconds(current);

    //     if (current - lastSent.current >= 5) {
    //         sendProgressToServer(current);
    //         lastSent.current = current;
    //     }
    // };

    // const sendProgressToServer = async (seconds) => {
    //     await axios.post("http://localhost:5000/api/video/progress", {
    //         studentId: studentId,
    //         videoId: videoId,
    //         watchedSeconds: seconds
    //     });
    // };

    return (
        <div className="video-section pb-10">
            <h2>{title}</h2>
            <p>{subtitle}</p>

            <video
                className=" w-full pt-5"
                controls
                src={videoUrl}
                ref={videoRef}
                // onTimeUpdate={handleTimeUpdate}
                // onEnded={() => sendProgressToServer(videoRef.current.duration)}
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                // onPlay={() => console.log(`Student ${studentId ?? "N/A"} started ${title}`)}
            />
        </div>
    );
}
