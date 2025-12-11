import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChapterUploadForm({ onAddChapter, onCancel, index }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    // Watch the PDF files to display selected files
    const pdfFiles = watch("pdfFiles");
    const chapterFile = watch("chapterFile");

    const onSubmit = (data) => {
        // Create chapter object
        const newChapter = {
            id: Date.now(), // Unique ID
            chapterName: data.chapterName,
            description: data.description,
            notes: data.notes || "",
            timestamp: new Date().toISOString(),
            videoFile: data.chapterFile[0] || null,
            pdfFiles: data.pdfFiles ? Array.from(data.pdfFiles) : []
        };

        // Pass the chapter data back to parent component
        onAddChapter(newChapter);

        // ✅ Validation success
        toast.success("🎥 Chapter uploaded successfully!");

        // Log the chapter data
        console.log("=== NEW CHAPTER ADDED ===");
        console.log("Chapter Details:", newChapter);

        reset();
    };

    const onError = (errors) => {
        // ❌ Validation failed - show specific errors
        console.log("❌ Form Errors:", errors);
        toast.error("⚠️ Please fill all required fields correctly!");
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">Upload New Chapter</h2>
            <p className="text-gray-500 mb-6">
                Please provide Chapter details and required files.
            </p>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
                {/* Chapter Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Chapter Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("chapterName", {
                            required: "Chapter name is required",
                            minLength: { value: 3, message: "At least 3 characters required" },
                        })}
                        placeholder="Enter Chapter name"
                        className={`w-full border ${errors.chapterName ? "border-red-500" : "border-gray-300"
                            } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.chapterName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.chapterName.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                            minLength: { value: 10, message: "Minimum 10 characters required" },
                        })}
                        placeholder="Write a short description"
                        rows="4"
                        className={`w-full border ${errors.description ? "border-red-500" : "border-gray-300"
                            } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Chapter Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Upload Video Chapter <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        {...register("chapterFile", { required: "Video file is required" })}
                        className={`w-full border ${errors.chapterFile ? "border-red-500" : "border-gray-300"
                            } rounded-lg px-3 py-2 cursor-pointer`}
                    />
                    {errors.chapterFile && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.chapterFile.message}
                        </p>
                    )}

                    {/* Display selected video file info */}
                    {chapterFile && chapterFile.length > 0 && (
                        <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-700">
                                Selected Video: {chapterFile[0].name}
                            </p>
                            <p className="text-xs text-blue-600">
                                Size: {(chapterFile[0].size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    )}
                </div>

                {/* Multiple PDF Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Upload PDF Files (Optional)
                    </label>
                    <input
                        type="file"
                        accept="application/pdf"
                        multiple
                        {...register("pdfFiles")}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
                    />
                    <p className="text-gray-400 text-xs mt-1">
                        You can select multiple PDF files. Hold Ctrl (or Cmd on Mac) to select multiple files.
                    </p>

                    {/* Display selected PDF files */}
                    {pdfFiles && pdfFiles.length > 0 && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Selected PDF Files ({pdfFiles.length}):
                            </p>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                                {Array.from(pdfFiles).map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        <span className="truncate flex-1">{file.name}</span>
                                        <span className="text-xs text-gray-400">
                                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Additional Notes (Optional)
                    </label>
                    <textarea
                        {...register("notes")}
                        placeholder="Any additional information about this chapter..."
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Upload Chapter
                    </button>
                </div>
            </form>

            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}