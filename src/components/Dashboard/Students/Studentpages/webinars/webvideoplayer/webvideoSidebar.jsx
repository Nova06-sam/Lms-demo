// import React from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// export default function WebVideoSidebar({ webinar, onSelectSession }) {
//   const navigate = useNavigate();

//   if (!webinar) {
//     return (
//       <div className="p-6">
//         <p>Loading sessions...</p>
//       </div>
//     );
//   }

//   // ✅ FIX: Extract sessions correctly from DB structure
//   const sessions =
//     webinar?.webinarSchedule?.sessions ||
//     webinar?.sessions ||
//     [];

//   return (
//     <div className="p-6">
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-4 hover:bg-green-400 text-lg rounded-full p-2 border hover:text-white"
//       >
//         ← Back To Dashboard
//       </button>

//       <h2 className="text-lg font-bold mb-4">Sessions</h2>

//       {sessions.length === 0 ? (
//         <p>No Sessions Available</p>
//       ) : (
//         <ul className="space-y-3">
//           {sessions.map((session, index) => (
//             <li 
//               key={index}
//               onClick={() => onSelectSession(session)}   // <--- LET USER SELECT A SESSION
//               className="p-3 border rounded-lg bg-white shadow hover:bg-gray-50 cursor-pointer"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold">{session.topic}</p>

//                   <p className="text-xs text-gray-500">
//                     {session.date} — {session.status}
//                   </p>

//                   <p className="text-xs text-gray-400">
//                     {new Date(session.startDateTime).toLocaleTimeString()} -{" "}
//                     {new Date(session.endDateTime).toLocaleTimeString()}
//                   </p>
//                 </div>

//                 {session.status === "completed" && (
//                   <FaCheckCircle className="text-green-500 text-xl" />
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }




import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function WebVideoSidebar({ webinar, onSelectSession, }) {
  const navigate = useNavigate();

  if (!webinar) {
    return (
      <div className="p-6">
        <p>Loading sessions...</p>
      </div>
    );
  }

  // Extract sessions from webinarSchedule
  const sessions = webinar?.webinarSchedule?.sessions || [];

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 hover:bg-green-100 text-gray-700 rounded-lg border hover:text-green-700 transition flex items-center gap-2"
      >
        ← Back
      </button>

      <h2 className="text-lg font-bold mb-4 text-gray-800">Sessions</h2>

      {sessions.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No sessions available
        </div>
      ) : (
        <ul className="space-y-3">
          {sessions.map((session, index) => (
            <li
              key={session._id || index}
              onClick={() => onSelectSession(session)}
              className={`p-3 border rounded-lg cursor-pointer transition ${session.status === "completed"
                  ? "bg-green-50 border-green-200"
                  : "bg-white hover:bg-gray-50"
                }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{session.topic || `Session ${index + 1}`}</p>

                  <div className="text-xs text-gray-500 mt-1">
                    {session.date && (
                      <p className="flex items-center gap-1">
                        📅 {session.date}
                      </p>
                    )}

                    {session.startDateTime && session.endDateTime && (
                      <p className="mt-1">
                        {new Date(session.startDateTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })} - {" "}
                        {new Date(session.endDateTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                </div>

                {session.status === "completed" && (
                  <FaCheckCircle className="text-green-500 text-xl ml-2" />
                )}
              </div>

              {session.status && session.status !== "completed" && (
                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${session.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {session.status}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}