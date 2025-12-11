import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Week 1", Videos: 4.2, Quizzes: 2.1, Assignments: 1.8 },
  { name: "Week 2", Videos: 3.8, Quizzes: 1.9, Assignments: 2.2 },
  { name: "Week 3", Videos: 4.5, Quizzes: 2.3, Assignments: 2.0 },
  { name: "Week 4", Videos: 4.1, Quizzes: 2.0, Assignments: 1.9 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const EngagementAnalytics = () => {
  return (
    <div className=" bg-gray-50 flex flex-col items-center py-5 px-2 md:px-10">
      <div className="w-full max-w-6xl space-y-6">
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Weekly Engagement Metrics
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Student activity across different learning methods
          </p>

          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={data} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend
                  wrapperStyle={{
                    fontSize: "14px",
                  }}
                />
                <Bar dataKey="Videos" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Quizzes" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="Assignments"
                  fill={COLORS[2]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default EngagementAnalytics;
