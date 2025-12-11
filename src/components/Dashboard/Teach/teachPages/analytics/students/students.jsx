import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    course: "React Development",
    avg: 98,
    hours: 45,
    avatar: "",
  },
  {
    id: 2,
    name: "Bob Smith",
    course: "JavaScript Patterns",
    avg: 92,
    hours: 38,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Carol Davis",
    course: "React Development",
    avg: 89,
    hours: 42,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const data = [
  { name: "Desktop", value: 45, color: "#3b82f6" },
  { name: "Mobile", value: 35, color: "#10b981" },
  { name: "Tablet", value: 20, color: "#f59e0b" },
];

const Student = () => {
  return (
    <div className=" bg-gray-50 flex flex-col items-center py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Top Performing Students */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Students</h2>
          <p className="text-sm text-gray-500 mb-6">
            Students with highest scores and engagement
          </p>

          <div className="space-y-4">
            {students.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center  justify-between bg-white border-2 border-gray-50 hover:bg-gray-100 transition p-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    {student.avatar ? (
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.course}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{student.avg}% avg</p>
                  <p className="text-xs text-gray-500">{student.hours}h spent</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Device Usage */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-900">Device Usage</h2>
          <p className="text-sm text-gray-500 mb-4">
            How students access your courses
          </p>

          <div className="w-full h-52">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {data.map((item) => (
              <div key={item.name} className="flex justify-between w-40 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </div>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
