import React from "react";

export default function VideoTabs({ activeTab, setActiveTab }) {
  const tabs = ["notes", "resources", "assignments", "discussion"];

  return (
    <div className="flex gap-4 mb-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 capitalize font-medium ${
            activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
