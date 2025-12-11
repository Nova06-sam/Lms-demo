import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function LivePlayer({ playbackUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!playbackUrl) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(playbackUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      return () => hls.destroy();
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = playbackUrl;

      console.log(playbackUrl)
    }
  }, [playbackUrl]);

  console.log("Rendering LivePlayer with URL:", playbackUrl);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      playsInline
      style={{ width: "100%", maxHeight: "500px" }}
    ></video>
  );
}
