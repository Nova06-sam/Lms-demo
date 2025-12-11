import { useEffect, useRef } from "react";
import Hls from "hls.js";

function HlsPlayer({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
  }, [url]);

  return <video ref={videoRef} controls width="800" />;
}

export default HlsPlayer;
