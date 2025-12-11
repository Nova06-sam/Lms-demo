import React from "react";
import { FaGlobe } from "react-icons/fa";
import "../../analytics/analytics.css"
const geoData = [
  { country: "United States", students: 890, percentage: 32 },
  { country: "United Kingdom", students: 567, percentage: 20 },
  { country: "Canada", students: 445, percentage: 16 },
  { country: "Australia", students: 334, percentage: 12 },
  { country: "Germany", students: 278, percentage: 10 },
  { country: "Others", students: 259, percentage: 10 },
];

const StudentGeoDistribution = () => {
  return (
    <div className=" bg-gray-50 flex flex-col items-center py-2 px-1 md:px-10">
      <div className="w-full max-w-5xl space-y-6">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Student Geographic Distribution
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Where your students are located
          </p>

          <div className="flex flex-col gap-3">
            {geoData.map((item, index) => (
              <div
                key={index}
                className="flex grap  justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-2 border border-gray-200">
                    <FaGlobe className="text-gray-500 w-4 h-4" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.country}
                  </p>
                </div>

                <div className="flex items-center grap gap-1 mt-3 sm:mt-0">
                  <p className="text-sm bg-green-500 text-white px-2 py-1 rounded-2xl">
                    {item.students} students
                  </p>
                  <div className="flex items-center gap-2 w-40">
                    <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default StudentGeoDistribution;
