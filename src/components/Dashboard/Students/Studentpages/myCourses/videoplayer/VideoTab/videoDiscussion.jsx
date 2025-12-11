// import React, { useState } from "react";
// import { FaThumbsUp, FaReply, FaEllipsisV } from "react-icons/fa";

// export default function VideoDiscussion() {
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       user: "Mike Chen",
//       time: "2 hours ago",
//       text: "Great explanation of useEffect! Could you provide more examples of cleanup functions?",
//       likes: 8,
//       replies: 3,
//       initials: "MC",
//       color: "bg-blue-500",
//     },
//     {
//       id: 2,
//       user: "Emma Wilson",
//       time: "1 day ago",
//       text: "I'm having trouble understanding the dependency array. When should it be empty vs when should it include variables?",
//       likes: 12,
//       replies: 5,
//       initials: "EW",
//       color: "bg-green-500",
//     },
//     {
//       id: 3,
//       user: "Alex Thompson",
//       time: "2 days ago",
//       text: "This course is amazing! The practical examples really help understand the concepts.",
//       likes: 15,
//       replies: 2,
//       initials: "AT",
//       color: "bg-yellow-500",
//     },
//   ]);

//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = () => {
//     if (newComment.trim() === "") return;
//     const newItem = {
//       id: Date.now(),
//       user: "You",
//       time: "Just now",
//       text: newComment,
//       likes: 0,
//       replies: 0,
//       initials: "U",
//       color: "bg-gray-500",
//     };
//     setComments([newItem, ...comments]);
//     setNewComment("");
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       {/* Title */}
//       <div className="flex justify-between ">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Discussion</h2>
//         <button className="bg-blue-600 p-2 mb-3 rounded-xl text-white">Ask Question</button>
//       </div>

//       {/* Input Section */}
//       <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
//         <textarea
//           placeholder="Ask a question or share your thoughts..."
//           className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
//           rows={3}
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <div className="flex justify-end mt-3">
//           <button
//             onClick={handleAddComment}
//             className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
//           >
//             Post
//           </button>
//         </div>
//       </div>

//       {/* Comments Section */}
//       <div className="space-y-4">
//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row sm:justify-between sm:items-start"
//           >
//             {/* Left Section */}
//             <div className="flex gap-4">
//               <div
//                 className={`w-10 h-10 ${comment.color} text-white rounded-full flex items-center justify-center font-semibold`}
//               >
//                 {comment.initials}
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-medium text-gray-800">{comment.user}</h3>
//                   <p className="text-xs text-gray-500">{comment.time}</p>
//                 </div>
//                 <p className="text-gray-700 text-sm mt-1">{comment.text}</p>

//                 {/* Like and reply section */}
//                 <div className="flex items-center gap-5 mt-3 text-gray-500 text-sm">
//                   <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
//                     <FaThumbsUp /> {comment.likes}
//                   </div>
//                   <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
//                     <FaReply /> {comment.replies} replies
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Section (3-dot menu) */}
//             <div className="mt-3 sm:mt-0 sm:self-start">
//               <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-gray-600" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaReply, FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
// // import BACKEND_URL from "../../../../../../../api/Api";

export default function VideoDiscussion({ lessonId }) {
  // const backend_url = "http://localhost:5000";
  const { courseId } = useParams();
  const [likedItems, setLikedItems] = useState(new Set());

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReply, setActiveReply] = useState(null); // track which comment/reply user is replying to
  const userDetail=JSON.parse(localStorage.getItem('user'))
  console.log(userDetail)

  /* 🔹 Fetch discussion data for this lesson */
  useEffect(() => {
    const fetchDiscussion = async () => {
      if (!lessonId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/discussion/${courseId}/${lessonId}`);
        setComments(res.data.discussion || []);
      } catch (error) {
        console.log("Error fetching discussion:", error);
      }
    };
    fetchDiscussion();
  }, [lessonId, courseId]);

  /* 🔹 Add new comment */
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const res = await axios.post(`http://localhost:5000/api/discussion/${courseId}/${lessonId}/comment`, {
        userName: userDetail.name,
        userPhoto: userDetail.photoURL,
        commentText: newComment,
      });
      setComments(res.data.discussion);
      setNewComment("");
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  /* 🔹 Add reply or nested reply */
  const handleAddReply = async (commentId, parentReplyId = null) => {
    if (replyText.trim() === "") return;
    try {
      const res = await axios.post(`http://localhost:5000/api/discussion/${courseId}/${lessonId}/${commentId}/reply`, {
        userName: userDetail.name,
        userPhoto: userDetail.photoURL,
        replyText,
        parentReplyId,
      });
      setComments(res.data.discussion);
      setReplyText("");
      setActiveReply(null);
    } catch (error) {
      console.log("Error adding reply:", error);
    }
  };

  /* 🔹 Like a comment or reply */
 const handleLike = async (commentId, replyId = null) => {
  const itemKey = replyId ? `${commentId}-${replyId}` : commentId;

  // ✅ Prevent double like
  if (likedItems.has(itemKey)) {
    console.log("Already liked");
    return;
  }

  try {
    const url = replyId
      ? `http://localhost:5000/api/discussion/${courseId}/${lessonId}/${commentId}/${replyId}/like`
      : `http://localhost:5000/api/discussion/${courseId}/${lessonId}/${commentId}/like`;

    await axios.patch(url);

    // ✅ Add to likedItems so user can’t like again
    setLikedItems((prev) => new Set(prev).add(itemKey));

    // 🔁 Refresh the comments after like
    const res = await axios.get(`http://localhost:5000/api/discussion/${courseId}/${lessonId}`);
    setComments(res.data.discussion);
  } catch (error) {
    console.log("Error liking:", error);
  }
};


  /* 🔹 Recursive render replies */
  const renderReplies = (replies, parentId) =>
    replies.map((reply) => (
      <div key={reply._id} className="ml-10 mt-3 border-l border-gray-200 pl-4">
        <div className="flex items-center gap-2">
          <img
            src={reply.userPhoto}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h4 className="font-medium text-gray-700 text-sm">{reply.userName}</h4>
          <span className="text-xs text-gray-400">
            {new Date(reply.createdAt).toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{reply.replyText}</p>
        <div className="flex gap-4 mt-1 text-sm text-gray-500">
          <button
            onClick={() => handleLike(parentId, reply._id)}
            className="hover:text-blue-600 flex items-center gap-1"
          >
            <FaThumbsUp /> {reply.likes}
          </button>
          <button
            onClick={() => setActiveReply(reply._id)}
            className="hover:text-blue-600 flex items-center gap-1"
          >
            <FaReply /> Reply
          </button>
        </div>

        {activeReply === reply._id && (
          <div className="ml-6 mt-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="w-full border rounded-xl p-2 text-sm"
            />
            <button
              onClick={() => handleAddReply(parentId, reply._id)}
              className="bg-blue-600 text-white px-4 py-1 rounded-lg mt-2 text-sm"
            >
              Reply
            </button>
          </div>
        )}

        {reply.replies?.length > 0 && renderReplies(reply.replies, parentId)}
      </div>
    ));

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Discussion</h2>

      {/* Add new comment */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-5">
        <textarea
          placeholder="Ask a question or share your thoughts..."
          className="w-full border rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <img
                src={comment.userPhoto}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-800">{comment.userName}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-2">{comment.commentText}</p>

            <div className="flex gap-5 mt-3 text-gray-500 text-sm">
              <button
                onClick={() => handleLike(comment._id)}
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FaThumbsUp /> {comment.likes}
              </button>
              <button
                onClick={() => setActiveReply(comment._id)}
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <FaReply /> Reply
              </button>
            </div>

            {activeReply === comment._id && (
              <div className="mt-3 ml-8">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full border rounded-xl p-2 text-sm"
                />
                <button
                  onClick={() => handleAddReply(comment._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg mt-2 text-sm"
                >
                  Reply
                </button>
              </div>
            )}

            {/* 🔁 Render replies recursively */}
            {comment.replies?.length > 0 && renderReplies(comment.replies, comment._id)}
          </div>
        ))}
      </div>
    </div>
  );
}
