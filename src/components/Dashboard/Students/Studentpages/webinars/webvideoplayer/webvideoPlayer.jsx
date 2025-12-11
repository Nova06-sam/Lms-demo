import React, { useEffect, useState } from "react";

export default function WebVideoPlayer({ webinarId, title, subtitle }) {
  const [live, setLive] = useState(false);
  const [playbackUrl, setPlaybackUrl] = useState("");
  const [recordings, setRecordings] = useState([]);

  // LOAD WEBINAR INFO
  useEffect(() => {
    fetch(`/api/webinar/all`)
      .then(res => res.json())
      .then(data => {
        const w = data.data.find(x => x._id === webinarId);
        if (w?.ivs?.playbackUrl) setPlaybackUrl(w.ivs.playbackUrl);
      });
  }, [webinarId]);

  // POLL STREAM STATUS
  useEffect(() => {
    const check = async () => {
      const res = await fetch(`/api/webinar/${webinarId}/stream-status`);
      const json = await res.json();
      setLive(json.live);
    };
    check();
    const t = setInterval(check, 6000);
    return () => clearInterval(t);
  }, [webinarId]);

  // LOAD RECORDINGS
  useEffect(() => {
    fetch(`/api/webinar/${webinarId}/recordings`)
      .then(r => r.json())
      .then(j => setRecordings(j.items || []));
  }, [webinarId]);

  return (
    <div className="video-section pb-10">
      <h2>{title}</h2>
      <p>{subtitle}</p>

      {/* LIVE PLAYER */}
      {/* {live && playbackUrl && (
        <video
          className="w-full pt-5"
          controls
          autoPlay
          src={playbackUrl}
        />
      )} */}

      {/* RECORDINGS */}
      {/* {!live && recordings.length > 0 && (
        <div className="pt-5">
          <h3>Recorded Sessions</h3>
          {recordings.map(r => (
            <div key={r.key} className="my-3">
              <video controls className="w-full" src={r.url} />
            </div>
          ))}
        </div>
      )} */}

      {/* NOT LIVE / NO RECORDINGS */}
      {/* {!live && recordings.length === 0 && (
        <p className="pt-5">No recordings available yet.</p>
      )} */}
    </div>
  );
}
