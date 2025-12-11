import React from "react";
import { FiDownload } from "react-icons/fi";
import { HiDocumentText } from "react-icons/hi";

export default function WebVideoResources() {
    const resources = [
        { title: "React Documentation", type: "Link" },
        { title: "Code Examples", type: "File" },
        { title: "Cheat Sheet", type: "Pdf" },
        { title: "Exercise Files", type: "Zip" },
    ];

    return (
        <div className="p-8 bg-gray-50 ">
            {/* Heading */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Course Resources
            </h2>

            {/* Resource Grid */}
            <div className="grid md:grid-cols-2 gap-4 ">
                {resources.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-full">
                                <HiDocumentText className="text-blue-500 text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.type}</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition">
                            <FiDownload className="text-gray-600 text-lg" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <hr className="border-gray-200 mb-4" />
        </div>
    );
}
