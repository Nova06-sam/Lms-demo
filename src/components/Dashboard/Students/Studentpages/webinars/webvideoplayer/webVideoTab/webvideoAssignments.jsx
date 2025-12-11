import React from "react";

export default function WebVideoAssignments() {
  const assignments = [
    {
      title: "Build a Todo App with useState",
      description: "Create a functional todo application using React hooks",
      dueDate: "Dec 28, 2024",
      points: 100,
      status: "pending",
      buttonText: "Continue",
    },
    {
      title: "useEffect Practice Exercise",
      description:
        "Implement data fetching and cleanup in a React component",
      dueDate: "Dec 30, 2024",
      points: 75,
      status: "not started",
      buttonText: "Start Assignment",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "pending") return "bg-blue-100 text-blue-600";
    if (status === "not started") return "bg-gray-100 text-gray-600";
    return "bg-green-100 text-green-600";
  };

  const getButtonColor = (status) => {
    if (status === "pending" || status === "not started")
      return "bg-blue-600 hover:bg-blue-700";
    return "bg-green-600 hover:bg-green-700";
  };

  return (
    <div className="p-8 bg-gray-50 ">
      {assignments.map((task, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm p-6 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-all"
        >
          {/* Left Section */}
          <div>
            <div className="flex items-center gap-3 mb-1 justify-between">
              <h3 className="font-semibold text-gray-800">{task.title}</h3>
              <span
                className={`text-xs px-2 py-0.5  rounded-full font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
            <p className="text-xs text-gray-500">
              Due: {task.dueDate} • {task.points} points
            </p>
          </div>

          {/* Right Section */}
          <button
            className={`mt-4 sm:mt-0 text-white text-sm font-medium px-5 py-2 rounded-full transition ${getButtonColor(
              task.status
            )}`}
          >
            {task.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}
