import React, { useEffect, useState } from "react";
import axios from "axios";
// import BACKEND_URL from "../../../../../../api/Api";

export default function BroadcastWebinar({ match }) {
  const webinarId = match?.params?.id || new URLSearchParams(window.location.search).get("id");
  const [webinar, setWebinar] = useState(null);

  useEffect(() => {
    if (!webinarId) return;
    (async () => {
      const res = await axios.get(`http://localhost:5000/api/webinar/${webinarId}`);
      setWebinar(res.data.data);
    })();
  }, [webinarId]);

  if (!webinar) return <div>Loading...</div>;

  const ingest = webinar.ivs.ingestEndpoint; // may be host or full rtmps://...
  const streamKey = webinar.ivs.streamKey;

  return (
    <div style={{ padding: 20 }}>
      <h2>Instructor Broadcast</h2>
      <p><strong>Ingest (RTMPS) endpoint:</strong> {ingest}</p>
      <p><strong>Stream Key:</strong> {streamKey}</p>

      <h3>OBS / Encoder</h3>
      <p>Server (RTMPS): <code>{ingest}</code></p>
      <p>Stream Key: <code>{streamKey}</code></p>
      <p>In OBS set Service → Custom → paste Server & Stream Key.</p>
    </div>
  );
}
