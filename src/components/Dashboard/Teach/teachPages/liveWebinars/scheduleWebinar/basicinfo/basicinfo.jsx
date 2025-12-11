// import React, { useState } from "react";
// import { FiPlus, FiTrash2 } from "react-icons/fi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaUpload } from "react-icons/fa6";

// export default function BasicInfo({ formData, setFormData, nextStep }) {

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "thumbnail") {
//             setFormData({ ...formData, thumbnail: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };


//     return (
//         <div className="grid md:grid-cols-3 gap-8">
//             {/* Left: Form */}

//             <form
//                 onSubmit={(e) => { e.preventDefault(); nextStep(); }}
//                 className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm"
//             >
//                 <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
//                 <p className="text-lg text-gray-500 mb-6">
//                     Essential details about your webinar
//                 </p>

//                 <div className="flex flex-col gap-5">
//                     {/* Title */}
//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Webinar Title *
//                         </label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             placeholder="e.g., Advanced React Patterns Live Session"
//                             className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"}
//                         />
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Description *
//                         </label>
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             rows="4"
//                             placeholder="Describe what participants will learn..."
//                             className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"}
//                         />
//                     </div>

//                     {/* Category & Level */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Category *
//                             </label>
//                             <select
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleChange}
//                                 className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"}
//                             >
//                                 <option value="">Select a category</option>
//                                 <option value="frontend">Frontend</option>
//                                 <option value="backend">Backend</option>
//                                 <option value="fullstack">Full Stack</option>
//                                 <option value="ai">AI / ML</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Level
//                             </label>
//                             <select
//                                 name="level"
//                                 value={formData.level}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                             >
//                                 <option value="Beginner">Beginner</option>
//                                 <option value="Intermediate">Intermediate</option>
//                                 <option value="Advanced">Advanced</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Tags */}
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Tags</label>
//                         <input
//                             type="text"
//                             name="tags"
//                             value={formData.tags}
//                             onChange={handleChange}
//                             placeholder="react, javascript, hooks"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                         />
//                     </div>

//                     {/* Thumbnail Upload */}
//                     <div>
//                         <label className="block text-sm font-medium mb-1">
//                             Webinar Thumbnail *
//                         </label>
//                         <div
//                             className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"}
//                         >
//                             <input
//                                 type="file"
//                                 id="thumbnail"
//                                 name="thumbnail"
//                                 accept="image/*"
//                                 onChange={handleChange}
//                                 className="hidden"
//                             />
//                             <label
//                                 htmlFor="thumbnail"
//                                 className="cursor-pointer flex flex-col items-center justify-center text-gray-600"
//                             >
//                                 <FaUpload className="text-2xl mb-2" />
//                                 <span>
//                                     Upload webinar thumbnail (16:9 ratio recommended)
//                                 </span>
//                             </label>
//                             {formData.thumbnail && (
//                                 <p className="text-sm text-green-600 mt-2">
//                                     {formData.thumbnail.name}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Next Button */}
//                     <div className="flex justify-end">
//                         <button
//                             type="submit"
//                             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//                         >
//                             Next: Schedule
//                         </button>
//                     </div>
//                 </div>
//             </form>

//             {/* Right: Quick Tips & Checklist */}
//             <div className="space-y-6">
//                 <div className="bg-white p-5 rounded-2xl shadow-sm">
//                     <h4 className="font-semibold mb-3">Quick Tips</h4>
//                     <ul className="text-sm text-gray-600 space-y-2">
//                         <li>
//                             <strong>Title:</strong> Keep it short and clear.
//                         </li>
//                         <li>
//                             <strong>Timing:</strong> 1–2 hours is ideal for engagement.
//                         </li>
//                         <li>
//                             <strong>Capacity:</strong> Start small for better interaction.
//                         </li>
//                     </ul>
//                 </div>

//                 <div className="bg-white p-5 rounded-2xl shadow-sm">
//                     <h4 className="font-semibold mb-3">Webinar Checklist</h4>
//                     <ul className="text-sm text-gray-600 space-y-2">
//                         {[
//                             "Title and description complete",
//                             "Date and time scheduled",
//                             "Agenda prepared",
//                             "Materials ready",
//                             "Test equipment",
//                         ].map((item, i) => (
//                             <li key={i} className="flex items-center gap-2">
//                                 <input type="checkbox" className="w-3 h-3 bg-gray-300 rounded-sm"></input>
//                                 {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { FaUpload, FaTimes } from "react-icons/fa";
import { BsImage } from "react-icons/bs";

export default function BasicInfo({ formData, setFormData, nextStep }) {
    const [thumbnailPreview, setThumbnailPreview] = useState(formData.thumbnailPreview || "");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === "tags") {
            setFormData({ ...formData, [name]: value });
        } else if (name === "thumbnail") {
            if (files && files[0]) {
                const file = files[0];
                processThumbnailFile(file);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const processThumbnailFile = (file) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error("Please upload an image file (JPEG, PNG, GIF, WebP)");
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size should be less than 5MB");
            return;
        }
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setThumbnailPreview(previewUrl);
        
        setFormData({ 
            ...formData, 
            thumbnail: file,
            thumbnailPreview: previewUrl 
        });
        
        toast.success("Thumbnail uploaded successfully!");
    };

    const handleRemoveThumbnail = () => {
        setThumbnailPreview("");
        setFormData({ 
            ...formData, 
            thumbnail: null,
            thumbnailPreview: "" 
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        toast.info("Thumbnail removed");
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processThumbnailFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title.trim()) {
            toast.error("Webinar title is required");
            return;
        }
        if (!formData.description.trim()) {
            toast.error("Webinar description is required");
            return;
        }
        if (!formData.category) {
            toast.error("Please select a category");
            return;
        }
        if (!formData.thumbnail && !thumbnailPreview) {
            toast.error("Please upload a thumbnail");
            return;
        }
        
        nextStep();
    };

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Form */}
            <form
                onSubmit={handleSubmit}
                className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
            >
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Basic Information</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Essential details about your webinar
                </p>

                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Webinar Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Advanced React Patterns Live Session"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe what participants will learn..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    {/* Category & Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                            >
                                <option value="">Select a category</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="fullstack">Full Stack</option>
                                <option value="ai">AI / ML</option>
                                <option value="datascience">Data Science</option>
                                <option value="devops">DevOps</option>
                                <option value="mobile">Mobile Development</option>
                                <option value="design">Design</option>
                                <option value="business">Business</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Level
                            </label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="All Levels">All Levels</option>
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="react, javascript, hooks, web development"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Add relevant keywords to help participants find your webinar
                        </p>
                    </div>

                    {/* Thumbnail Upload with Preview */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Webinar Thumbnail *
                        </label>
                        
                        {/* Thumbnail Preview */}
                        {thumbnailPreview && (
                            <div className="mb-4">
                                <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border border-gray-300">
                                    <img 
                                        src={thumbnailPreview} 
                                        alt="Thumbnail preview" 
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveThumbnail}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-md"
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {formData.thumbnail?.name || "Current thumbnail"}
                                </p>
                            </div>
                        )}

                        {/* Upload Area - FIXED: No onClick on div, only on label */}
                        <div 
                            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all
                                ${isDragging 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : thumbnailPreview 
                                        ? 'border-blue-300 bg-blue-50 hover:border-blue-400' 
                                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {thumbnailPreview ? (
                                <>
                                    <BsImage className="text-3xl text-blue-500 mb-2" />
                                    <p className="text-blue-600 font-medium">Drag & drop or click to change thumbnail</p>
                                </>
                            ) : (
                                <>
                                    <FaUpload className="text-3xl text-gray-400 mb-3" />
                                    <p className="text-gray-600 font-medium mb-1">
                                        Drag & drop or click to upload thumbnail
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Recommended: 1280x720 px (16:9 ratio), Max 5MB
                                    </p>
                                </>
                            )}
                            
                            {/* File input with label */}
                            <div className="mt-4 relative">
                                <label
                                    htmlFor="thumbnail"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition inline-block"
                                >
                                    {thumbnailPreview ? "Change File" : "Choose File"}
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    id="thumbnail"
                                    name="thumbnail"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        
                        {!thumbnailPreview && (
                            <p className="text-xs text-gray-500 mt-2">
                                PNG, JPG, GIF, WebP up to 5MB
                            </p>
                        )}
                    </div>

                    {/* Next Button */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm hover:shadow-md"
                        >
                            Next: Schedule
                        </button>
                    </div>
                </div>
            </form>

            {/* Right: Quick Tips & Checklist */}
            <div className="space-y-6">
                {/* Quick Tips Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Quick Tips
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-gray-700">Title:</strong> Keep it short, clear, and compelling.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-gray-700">Thumbnail:</strong> Use high-quality, relevant images (16:9 ratio).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-gray-700">Description:</strong> Highlight key takeaways and benefits.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span><strong className="text-gray-700">Tags:</strong> Use relevant keywords for better discoverability.</span>
                        </li>
                    </ul>
                </div>

                {/* Checklist Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Basic Info Checklist
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                        {[
                            { id: 1, text: "Clear and descriptive title", checked: !!formData.title.trim() },
                            { id: 2, text: "Detailed webinar description", checked: !!formData.description.trim() },
                            { id: 3, text: "Category selected", checked: !!formData.category },
                            { id: 4, text: "Thumbnail uploaded", checked: !!thumbnailPreview },
                        ].map((item) => (
                            <li key={item.id} className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded flex items-center justify-center ${item.checked ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'} border`}>
                                    {item.checked && (
                                        <span className="text-green-500 text-xs">✓</span>
                                    )}
                                </div>
                                <span className={item.checked ? "text-gray-700" : "text-gray-500"}>
                                    {item.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{[
                                !!formData.title.trim(),
                                !!formData.description.trim(),
                                !!formData.category,
                                !!thumbnailPreview
                            ].filter(Boolean).length}/4</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ 
                                    width: `${([
                                        !!formData.title.trim(),
                                        !!formData.description.trim(),
                                        !!formData.category,
                                        !!thumbnailPreview
                                    ].filter(Boolean).length / 4) * 100}%` 
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Category Info Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">Category Guide</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-gray-700"><strong>Frontend:</strong> React, Vue, Angular, UI/UX</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-gray-700"><strong>Backend:</strong> Node.js, Python, Java, APIs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <span className="text-gray-700"><strong>AI/ML:</strong> Machine Learning, Data Science</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            <span className="text-gray-700"><strong>DevOps:</strong> Docker, Kubernetes, CI/CD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
