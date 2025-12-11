import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import axios from "axios";
// import BACKEND_URL from "../../../../../../api/Api";

export default function ViewerPlayer({ match }) {
  const webinarId = match?.params?.id || new URLSearchParams(window.location.search).get("id");
  const videoRef = useRef(null);
  const [webinar, setWebinar] = useState(null);

  useEffect(() => {
    if (!webinarId) return;
    (async () => {
      const res = await axios.get(`http://localhost:5000/api/webinar/${webinarId}`);
      setWebinar(res.data.data);
    })();
  }, [webinarId]);

  useEffect(() => {
    if (!webinar) return;
    const url = webinar.ivs.playbackUrl;
    if (!url) return;

    const video = videoRef.current;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    }
  }, [webinar]);

  return (
    <div style={{ padding: 20 }}>
      <h2>{webinar?.title || "Live"}</h2>
      <video ref={videoRef} controls style={{ width: '100%' }} />
    </div>
  );
}
