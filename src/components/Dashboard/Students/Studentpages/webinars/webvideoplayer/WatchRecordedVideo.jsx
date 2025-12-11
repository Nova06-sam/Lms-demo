import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// // import BACKEND_URL from "../../../../../../api/Api";

function WatchRecordedVideo(singleRecordedVideo) {
    const [cookiesSet, setCookiesSet] = useState(false);

    const location = useLocation();
    const video = location.state?.video;

    // const videoUrl =`https://d166uawg0zphm1.cloudfront.net/ivs/v1/819220939727/1yPHy9Gr78eV/2025/11/27/9/50/miMz0FZDix6D/media/hls/master.m3u8`;



    useEffect(() => {
        // Call only once when component loads
        axios
            .get(`http://localhost:5000/api/cookie/video/auth`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("cookie success", res.data);
                setCookiesSet(true); // Tell UI cookies are ready
            })
            .catch((err) => {
                console.log("cookie error", err.response?.data);
            });
    }, []);

    if (!cookiesSet) {
        return <p>Loading video…</p>;
    }

    return (
        <div>
            <h1>{video?.title}</h1>
            <video
                src={video?.recordingUrl}
                controls
                autoPlay
                muted
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    );
}

export default WatchRecordedVideo;












// import axios from "axios";

// function WatchRecordedVideo() {
//     const videoUrl = "https://d166uawg0zphm1.cloudfront.net/ivs/v1/819220393727/ieF7lrgRTo1n/2025/11/21/9/54/mNim28wDCfI/media/hls/master.m3u8";


//     const res = axios.get("http://localhost:5000/api/cookie/video/auth", {
//         withCredentials: true
//     }).then((res) => {
//         console.log("cookie success", res.data);
//     })
//         .catch(err => {
//             console.log("cookie error", err.response?.data);
//         });
//     console.log("cookie", res.data)

//     // useEffect(() => {
//     //     // 1) Get signed cookies before playing video
//     //     fetch("http://localhost:5000/api/cookie/video/auth", {
//     //         method: "GET",
//     //         credentials: "include"
//     //     });
//     // }, []);

//     return (
//         <video
//             src={videoUrl}
//             controls
//             autoPlay
//             style={{ width: "100%", height: "auto" }}
//         />
//     );
// }

// export default WatchRecordedVideo;