import React, { useState } from "react";
import { FaThumbsUp, FaReply, FaEllipsisV } from "react-icons/fa";

export default function WebVideoDiscussion() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Mike Chen",
      time: "2 hours ago",
      text: "Great explanation of useEffect! Could you provide more examples of cleanup functions?",
      likes: 8,
      replies: 3,
      initials: "MC",
      color: "bg-blue-500",
    },
    {
      id: 2,
      user: "Emma Wilson",
      time: "1 day ago",
      text: "I'm having trouble understanding the dependency array. When should it be empty vs when should it include variables?",
      likes: 12,
      replies: 5,
      initials: "EW",
      color: "bg-green-500",
    },
    {
      id: 3,
      user: "Alex Thompson",
      time: "2 days ago",
      text: "This course is amazing! The practical examples really help understand the concepts.",
      likes: 15,
      replies: 2,
      initials: "AT",
      color: "bg-yellow-500",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newItem = {
      id: Date.now(),
      user: "You",
      time: "Just now",
      text: newComment,
      likes: 0,
      replies: 0,
      initials: "U",
      color: "bg-gray-500",
    };
    setComments([newItem, ...comments]);
    setNewComment("");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="flex justify-between ">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Discussion</h2>
        <button className="bg-blue-600 p-2 mb-3 rounded-xl text-white">Ask Question</button>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <textarea
          placeholder="Ask a question or share your thoughts..."
          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row sm:justify-between sm:items-start"
          >
            {/* Left Section */}
            <div className="flex gap-4">
              <div
                className={`w-10 h-10 ${comment.color} text-white rounded-full flex items-center justify-center font-semibold`}
              >
                {comment.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-800">{comment.user}</h3>
                  <p className="text-xs text-gray-500">{comment.time}</p>
                </div>
                <p className="text-gray-700 text-sm mt-1">{comment.text}</p>

                {/* Like and reply section */}
                <div className="flex items-center gap-5 mt-3 text-gray-500 text-sm">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                    <FaThumbsUp /> {comment.likes}
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                    <FaReply /> {comment.replies} replies
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section (3-dot menu) */}
            <div className="mt-3 sm:mt-0 sm:self-start">
              <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
