// import React, { useState, useEffect } from 'react';
// import { MdCloudUpload } from "react-icons/md";
// import { FcVideoFile } from "react-icons/fc";
// import { LuFileText } from "react-icons/lu";
// import { LiaCheckCircleSolid } from "react-icons/lia";
// import { HiDotsVertical } from "react-icons/hi";
// import { Send } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
// import ChapterUploadForm from './chapterUploadForm';

// import { useNavigate, useParams } from "react-router-dom";

// export default function CreateCourse() {
//     const navigate = useNavigate();
//     const { courseId } = useParams();
//     const [click, setClick] = useState("Basics");
//     const [fileName, setFileName] = useState("");
//     const [activeForms, setActiveForms] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false)
//     const buttons = ["Basics", "Content", "Settings", "Publish"];

//     const [formData, setFormData] = useState({
//         // basic
//         title: '',
//         description: '',
//         category: '',
//         level: '',
//         thumbnail: null,
//         existingThumbnail: "",

//         // content
//         chapters: [],

//         // settings
//         courseCategory: '',
//         enrollmentLimit: '',
//         courseThumbnail: '',
//     });

//     const getSignedUrl = async (file) => {
//         const res = await axios.get(
//             "http://localhost:5000/api/s3/upload-url",
//             {
//                 params: {
//                     fileName: file.name,
//                     fileType: file.type
//                 }
//             }
//         );

//         return res.data;
//     };
//     // const { uploadUrl, finalUrl } = res.data;

//     const uploadToS3 = async (file, uploadUrl) => {
//         await axios.put(uploadUrl, file, {
//             headers: { "Content-Type": file.type },
//             onUploadProgress: (e) => {
//                 console.log(`Upload: ${Math.round((e.loaded / e.total) * 100)}%`);
//             }
//         });
//     };

//     useEffect(() => {
//         if (courseId) {
//             axios.get(`http://localhost:5000/api/courses/${courseId}`)
//                 .then(res => {
//                     const c = res.data;

//                     setFormData({
//                         title: c.courseTitle,
//                         description: c.courseDescription,
//                         category: c.courseCategory,
//                         level: c.courseLevel,
//                         thumbnail: c.thumbnail,
//                         chapters: c.chapters?.map((ch, i) => ({
//                             id: ch._id || i, // or Date.now()
//                             chapterName: ch.lessonName,
//                             description: ch.lessonDescription,
//                             notes: ch.lessonNotes,

//                             videoUrl: ch.lessonVideoURL,
//                             videoFile: null,

//                             pdfFiles: [],
//                         })),
//                         courseCategory: c.subcriptionPlan,
//                         enrollmentLimit: c.enrollmentLimit,
//                     });
//                 });
//         }
//     }, [courseId]);





//     // Handle file selection
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFileName(file.name);
//             setFormData(prev => ({
//                 ...prev,
//                 thumbnail: file
//             }));
//         } else {
//             setFileName("");
//             setFormData(prev => ({
//                 ...prev,
//                 thumbnail: null
//             }));
//         }
//     };

//     // Handle input changes
//     const handleInputChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     // Form validation
//     const validateCurrentStep = () => {
//         switch (click) {
//             case "Basics":
//                 if (!formData.title.trim()) {
//                     toast.error("Course title is required");
//                     return false;
//                 }
//                 if (!formData.description.trim()) {
//                     toast.error("Course description is required");
//                     return false;
//                 }
//                 if (!formData.category) {
//                     toast.error("Please select a category");
//                     return false;
//                 }
//                 if (!formData.level) {
//                     toast.error("Please select a level");
//                     return false;
//                 }
//                 if (!formData.thumbnail) {
//                     toast.error("Please upload a thumbnail");
//                     return false;
//                 }
//                 return true;

//             case "Content":
//                 if (formData.chapters.length === 0) {
//                     toast.error("Please add at least one chapter");
//                     return false;
//                 }
//                 return true;

//             case "Settings":
//                 if (!formData.courseCategory) {
//                     toast.error("Please select a course Subcription Plan");
//                     return false;
//                 }
//                 return true;

//             default:
//                 return true;
//         }
//     };

//     // Navigation functions
//     const nextStep = () => {
//         if (validateCurrentStep()) {
//             const currentIndex = buttons.indexOf(click);
//             if (currentIndex < buttons.length - 1) {
//                 setClick(buttons[currentIndex + 1]);
//             }
//         }
//     };

//     const prevStep = () => {
//         const currentIndex = buttons.indexOf(click);
//         if (currentIndex > 0) {
//             setClick(buttons[currentIndex - 1]);
//         }
//     };

//     // Chapter management
//     const handleAddForm = () => {
//         setActiveForms((prev) => [...prev, Date.now()]);
//     };

//     const handleCancelForm = (formId) => {
//         setActiveForms((prev) => prev.filter((id) => id !== formId));
//     };

//     const handleAddChapter = (newChapter, formId) => {
//         const updatedChapters = [...formData.chapters, newChapter];
//         setFormData(prev => ({
//             ...prev,
//             chapters: updatedChapters
//         }));
//         setActiveForms((prev) => prev.filter((id) => id !== formId));
//         toast.success("Chapter added successfully!");
//     };

//     // Delete chapter
//     const handleDeleteChapter = (chapterId) => {
//         const updatedChapters = formData.chapters.filter(chapter => chapter.id !== chapterId);
//         setFormData(prev => ({
//             ...prev,
//             chapters: updatedChapters
//         }));
//         toast.info("Chapter deleted successfully!");
//     };




//     // Final submission
//     const handlePublish = async () => {
//         if (!validateCurrentStep()) return;

//         // const updatedChapters = formData.chapters.map(ch => ({ ...ch }));

//         // 1️⃣ Upload all chapter videos to S3 BEFORE sending formData
//         // for (let i = 0; i < updatedChapters.length; i++) {
//         //     const chapter = updatedChapters[i];

//         //     if (chapter.videoFile instanceof File) {
//         //         const { uploadUrl, finalUrl } = await getSignedUrl(chapter.videoFile);

//         //         await fetch(uploadUrl, {
//         //             method: "PUT",
//         //             headers: { "Content-Type": chapter.videoFile.type },
//         //             body: chapter.videoFile
//         //         });

//         //        updatedChapters[i].uploadedVideoUrl = finalUrl; 

//         //     }
//         // }

//         // await uploadToS3(chapter.videoFile, uploadUrl);
//         // setFormData(prev => {
//         //     const updated = [...prev.chapters];
//         //     updated[i] = { ...updated[i], uploadedVideoUrl: finalUrl };
//         //     return { ...prev, chapters: updated };
//         // });

//         // formData.chapters[i].uploadedVideoUrl = finalUrl;

//         // console.log("Sending chapters:", updatedChapters);

//         // setFormData(prev => ({ ...prev, chapters: updatedChapters }));

//         const fd = new FormData();

//         // Basic details
//         fd.append("courseTitle", formData.title);
//         fd.append("courseDescription", formData.description);
//         fd.append("courseCategory", formData.category);
//         fd.append("courseLevel", formData.level);
//         fd.append("subcriptionPlan", formData.courseCategory);
//         fd.append("enrollmentLimit", formData.enrollmentLimit);
//         fd.append("teacherId", "64a7f0f5c2f1b2e4d5a6b7c8");
//         fd.append("status", "published");

//         // Thumbnail image
//         if (formData.thumbnail instanceof File) {
//             fd.append("thumbnail", formData.thumbnail);
//         }
//         formData.chapters.forEach((chapter, index) => {
//             fd.append(`lessonName[]`, chapter.chapterName);
//             fd.append(`lessonDescription[]`, chapter.description);
//             fd.append(`lessonNotes[]`, chapter.notes);

//             if (chapter.videoFile instanceof File) {
//                 fd.append(`lessonVideoURL-${index}`, chapter.videoFile);
//             }
//             if (chapter.pdfFiles && chapter.pdfFiles.length > 0) {
//                 chapter.pdfFiles.forEach((pdf, pdfIndex) => {
//                     if (pdf instanceof File)
//                         fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
//                 });
//             }

//         });
//         //     const videoUrl = chapter.uploadedVideoUrl || chapter.videoUrl || "";
//         //     fd.append("lessonVideoURL[]", videoUrl);

//         //     (chapter.pdfFiles || []).forEach((pdf, pdfIndex) => {
//         //     if (pdf instanceof File) {
//         //         fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
//         //     }
//         // });

//         try {

//             if (courseId) {
//                 // EDIT MODE
//                 await axios.put(
//                     `http://localhost:5000/api/courses/update/${courseId}`,
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 );
//                 navigate('/teacher/mycourse')
//                 toast.success("Course updated successfully! ✨");

//             }
//             else {
//                 // CREATE MODE
//                 await axios.post(
//                     "http://localhost:5000/api/courses/upload",
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 ).then(res => console.log(res.data))
//                     .catch(err => console.error('Upload Error:', err.response?.data || err));

//                 toast.success("Course published successfully! 🚀");
                
//                 navigate('/teacher/mycourse')
//             }
//         } catch (error) {
//             console.error("🔥 Upload Error:", error.response ? error.response.data : error);
//             toast.error("Failed to upload course");
//         }
//     }
//     // console.log("videoFile =", chapter.videoFile);
//     // lesson video
//     // if (chapter.videoFile instanceof File) {
//     //     fd.append(`lessonVideoURL-${index}`, chapter.videoFile);
//     // }
//     //     const lessonVideoURL = chapter.uploadedVideoUrl || chapter.videoUrl || "";

//     //     fd.append("lessonVideoURL[]", lessonVideoURL);

//     //     if (chapter.pdfFiles && chapter.pdfFiles.length > 0) {
//     //         chapter.pdfFiles.forEach((pdf, pdfIndex) => {
//     //             if (pdf instanceof File)
//     //                 fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
//     //         });
//     //     }

//     //     console.log("=== FormData for Chapter", index,{
//     //       chapterName:  chapter.chapterName,
//     //         videoUrl: chapter.videoUrl || chapter.uploadedVideoUrl,
//     // });

//     // for (let pair of fd.entries()) {
//     //     console.log("FD:", pair[0], pair[1], pair[1] instanceof File);
//     // }


//     // await axios.post(
//     //     "http://localhost:5000/api/courses/create",
//     //     fd,
//     //     { headers: { "Content-Type": "multipart/form-data" } }
//     // );

//     // navigate('/teacher/mycourse')



//     //handle draft

//     const handleSaveDraft = async () => {
//         // Draft should skip validations except title
//         if (!formData.title.trim()) {
//             toast.error("Course title is required to save draft");
//             return;
//         }

//         const fd = new FormData();

//         // Basic
//         fd.append("courseTitle", formData.title);
//         fd.append("courseDescription", formData.description || "");
//         fd.append("courseCategory", formData.category || "");
//         fd.append("courseLevel", formData.level || "");
//         fd.append("subcriptionPlan", formData.courseCategory || "");
//         fd.append("enrollmentLimit", formData.enrollmentLimit || "");
//         fd.append("teacherId", "64a7f0f5c2f1b2e4d5a6b7c8");

//         // ⭐⭐ IMPORTANT — Add status = draft ⭐⭐
//         fd.append("status", "draft");

//         // Thumbnail
//         if (formData.thumbnail) {
//             fd.append("thumbnail", formData.thumbnail);
//         }

//         // Chapters (optional)
//         formData.chapters.forEach((chapter, index) => {
//             fd.append(`lessonName[]`, chapter.chapterName || "");
//             fd.append(`lessonDescription[]`, chapter.description || "");
//             fd.append(`lessonNotes[]`, chapter.notes || "");

//             // video
//             if (chapter.videoFile instanceof File) {
//                 fd.append(`lessonVideoURL-${index}`, chapter.videoFile);
//             }

//             // pdfs
//             if (chapter.pdfFiles && chapter.pdfFiles.length > 0) {
//                 chapter.pdfFiles.forEach((pdf, pdfIndex) => {
//                     if (pdf instanceof File)
//                         fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
//                 });
//             }
//         });

//         try {

//             if (courseId) {
//                 // EDIT MODE
//                 await axios.put(
//                     `http://localhost:5000/api/courses/update/${courseId}`,
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 );

//                 toast.success("Course updated successfully! ✨");

//             } else {
//                 // CREATE MODE
//                 await axios.post(
//                     "http://localhost:5000/api/courses/upload",
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 );

//                 toast.success("Course published successfully! 🚀");
//             }

//         } catch (error) {
//             console.error("🔥 Upload Error:", error.response ? error.response.data : error);
//             toast.error("Failed to upload course");
//         }

//     };

//     // const handleSaveDraft = () => {
//     //     console.log("Draft Data:", formData);
//     //     toast.success("Course saved as draft! 💾");
//     // };

//     return (
//         <div className="p-10 bg-gray-100 min-h-screen">
//             <ToastContainer position="top-center" autoClose={3000} />

//             {/* Title */}
//             <div>
//                 <h1 className="text-4xl font-semibold">Create Course</h1>
//             </div>

//             {/* Progress Steps */}
//             <div className="flex justify-around mt-10 bg-gray-200 rounded-full px-3 py-1">
//                 {buttons.map((btn) => (
//                     <button
//                         key={btn}
//                         onClick={() => setClick(btn)}
//                         className={`w-100 rounded-full px-5 py-1 font-medium transition ${click === btn ? "bg-white shadow-md" : ""
//                             }`}
//                     >
//                         {btn}
//                     </button>
//                 ))}
//             </div>

//             {/* Tab Content */}
//             <div className="mt-6">
//                 {/* Basics Tab */}
//                 {click === "Basics" && (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                             Course Information
//                         </h2>
//                         <p className="text-sm text-gray-500 mb-6">
//                             Basic details about your course
//                         </p>

//                         <div className="space-y-6">
//                             {/* Course Title */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Course Title *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.title}
//                                     onChange={(e) => handleInputChange('title', e.target.value)}
//                                     placeholder="e.g., Complete Web Development Bootcamp"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                                 />
//                             </div>

//                             {/* Course Description */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Course Description *
//                                 </label>
//                                 <textarea
//                                     rows="4"
//                                     value={formData.description}
//                                     onChange={(e) => handleInputChange('description', e.target.value)}
//                                     placeholder="Describe what students will learn in this course..."
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                                 ></textarea>
//                             </div>

//                             {/* Category and Level */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Category *
//                                     </label>
//                                     <select
//                                         value={formData.category}
//                                         onChange={(e) => handleInputChange('category', e.target.value)}
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                                     >
//                                         <option value="">Select a category</option>
//                                         <option value="Web Development">Web Development</option>
//                                         <option value="Mobile Development">Mobile Development</option>
//                                         <option value="Data Science">Data Science</option>
//                                         <option value="Design">Design</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Level *
//                                     </label>
//                                     <select
//                                         value={formData.level}
//                                         onChange={(e) => handleInputChange('level', e.target.value)}
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                                     >
//                                         <option value="">Select level</option>
//                                         <option value="Beginner">Beginner</option>
//                                         <option value="Intermediate">Intermediate</option>
//                                         <option value="Advanced">Advanced</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Thumbnail Upload */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Course Thumbnail *
//                                 </label>
//                                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-indigo-400 transition">
//                                     <MdCloudUpload className="text-4xl text-gray-500 mb-2" />
//                                     <p className="text-gray-600 text-sm mb-2">
//                                         Upload course thumbnail (16:9 ratio recommended)
//                                     </p>

//                                     {fileName && (
//                                         <p className="text-gray-500 text-sm mt-2 mb-2">
//                                             {fileName}
//                                         </p>
//                                     )}

//                                     <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer">
//                                         Choose File
//                                         <input
//                                             type="file"
//                                             onChange={handleFileChange}
//                                             className="hidden"
//                                             accept="image/*"
//                                         />
//                                     </label>
//                                 </div>
//                             </div>

//                             {/* Navigation Buttons */}
//                             <div className="flex justify-end mt-6">
//                                 <button
//                                     onClick={nextStep}
//                                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//                                 >
//                                     Next: Content
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content Tab */}
//                 {click === "Content" && (
//                     <div className="flex justify-center">
//                         <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-6">
//                             <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
//                             <p className="text-gray-500 mb-6">
//                                 Add chapters and lessons to your course. At least one chapter is required.
//                             </p>

//                             {/* Add Chapter Button */}
//                             <button
//                                 onClick={handleAddForm}
//                                 className="w-full text-center bg-gray-100 hover:bg-green-600 hover:text-white py-3 rounded-lg mb-5 transition font-medium"
//                             >
//                                 + Add Chapter
//                             </button>

//                             {/* Active Forms */}
//                             {activeForms.map((formId) => (
//                                 <div key={formId} className="mb-6 border border-gray-200 rounded-xl">
//                                     <div className="bg-gray-50 px-4 py-3 rounded-t-xl flex justify-between items-center">
//                                         <h3 className="font-semibold text-gray-700">New Chapter Form</h3>
//                                         <button
//                                             onClick={() => handleCancelForm(formId)}
//                                             className="text-red-500 hover:text-red-700 text-lg"
//                                         >
//                                             ✕
//                                         </button>
//                                     </div>
//                                     <div className="p-4">
//                                         <ChapterUploadForm
//                                             index={formData.chapters.length}
//                                             onAddChapter={(chapter) => handleAddChapter(chapter, formId)}
//                                             onCancel={() => handleCancelForm(formId)}
//                                         />
//                                     </div>
//                                 </div>
//                             ))}

//                             {/* Saved Chapters */}
//                             {formData.chapters.length === 0 && activeForms.length === 0 ? (
//                                 <div className="text-center py-10 text-gray-500">
//                                     <p>No chapters added yet. Click "Add Chapter" to get started.</p>
//                                 </div>
//                             ) : (
//                                 formData.chapters.map((chapter, i) => (
//                                     <div key={chapter.id} className="border border-gray-200 bg-white rounded-xl mt-5 p-5 shadow-sm">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <h1 className="font-medium text-lg text-gray-800">{chapter.chapterName}</h1>
//                                                 <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
//                                             </div>
//                                             <div className="relative">
//                                                 <button
//                                                     onClick={() => setShowDropdown(!showDropdown)}
//                                                     className="hover:bg-gray-200 p-2 rounded-xl text-gray-500">
//                                                     <HiDotsVertical />
//                                                 </button>
//                                                 <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hover:block z-10 ${showDropdown ? 'visible' : 'hidden'}`}>
//                                                     <button
//                                                         onClick={() => handleDeleteChapter(chapter.id)}
//                                                         className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
//                                                     >
//                                                         Delete Chapter
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Video File */}
//                                         {chapter.videoFile && (
//                                             <div className="flex justify-between items-center mt-4 p-3 bg-blue-50 rounded-lg">
//                                                 <div className="flex gap-2 items-center">
//                                                     <FcVideoFile className="text-xl" />
//                                                     <span className="font-medium text-gray-700">{chapter.videoFile.name}</span>
//                                                 </div>
//                                                 <span className="text-xs bg-white border rounded-full px-3 py-1 border-gray-300">
//                                                     {chapter.videoFile.sizeMB} MB
//                                                 </span>
//                                             </div>
//                                         )}

//                                         {/* PDF Files */}
//                                         {chapter.pdfFiles?.length > 0 && (
//                                             <div className="mt-3 bg-gray-50 p-3 rounded-lg">
//                                                 <p className="text-sm font-medium mb-2 text-gray-700">Attached PDFs ({chapter.pdfFiles.length}):</p>
//                                                 <div className="space-y-2">
//                                                     {chapter.pdfFiles.map((pdf, id) => (
//                                                         <div key={id} className="flex justify-between items-center text-sm bg-white p-2 rounded">
//                                                             <div className="flex gap-2 items-center">
//                                                                 <LuFileText className="text-gray-600" />
//                                                                 <span className="text-gray-700">{pdf.name}</span>
//                                                             </div>
//                                                             <span className="text-xs text-gray-500">{pdf.sizeMB} MB</span>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Additional Notes */}
//                                         {chapter.notes && (
//                                             <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
//                                                 <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
//                                                 <p className="text-sm text-gray-600">{chapter.notes}</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))
//                             )}

//                             {/* Chapter Count and Validation Status */}
//                             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm font-medium text-gray-700">
//                                         Total Chapters: <span className="font-bold">{formData.chapters.length}</span>
//                                     </span>
//                                     {formData.chapters.length === 0 ? (
//                                         <span className="text-red-500 text-sm">⚠️ At least one chapter required</span>
//                                     ) : (
//                                         <span className="text-green-500 text-sm">✅ Ready to proceed</span>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Navigation Buttons */}
//                             <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
//                                 <button
//                                     onClick={prevStep}
//                                     className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
//                                 >
//                                     Previous
//                                 </button>
//                                 <button
//                                     onClick={nextStep}
//                                     disabled={formData.chapters.length === 0}
//                                     className={`px-6 py-2 rounded-lg transition ${formData.chapters.length === 0
//                                         ? "bg-gray-400 cursor-not-allowed text-gray-200"
//                                         : "bg-blue-600 hover:bg-blue-700 text-white"
//                                         }`}
//                                 >
//                                     Next: Settings
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Settings Tab */}
//                 {click === "Settings" && (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                             Course Settings
//                         </h2>
//                         <p className="text-gray-500 mb-6 mt-2">
//                             Configure course availability and access
//                         </p>

//                         <div className="space-y-6">
//                             <div>
//                                 <label className="block text-xl text-gray-700 mb-1">
//                                     Course Category *
//                                 </label>
//                                 <select
//                                     value={formData.courseCategory}
//                                     onChange={(e) => handleInputChange('courseCategory', e.target.value)}
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none mt-2"
//                                 >
//                                     <option value="">Select category</option>
//                                     <option value="Free">Free</option>
//                                     <option value="Premium">Premium</option>
//                                     <option value="Subscription Only">Subscription Only</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-xl text-gray-700 mb-2">
//                                     Enrollment Limit
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={formData.enrollmentLimit}
//                                     onChange={(e) => handleInputChange('enrollmentLimit', e.target.value)}
//                                     placeholder="Leave empty for unlimited"
//                                     className="w-full border border-gray-300 mt-2 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                                 />
//                             </div>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between mt-6">
//                             <button
//                                 onClick={prevStep}
//                                 className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 onClick={nextStep}
//                                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//                             >
//                                 Next: Publish
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Publish Tab */}
//                 {click === "Publish" && (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                             Publish Course
//                         </h2>
//                         <p className="text-gray-500 mb-6 mt-2">
//                             Review and publish your course
//                         </p>

//                         <div className='text-center'>
//                             <div className='flex justify-center mb-4'>
//                                 <LiaCheckCircleSolid className='text-7xl text-green-500' />
//                             </div>
//                             <h2 className='p-2 text-2xl font-semibold'>Ready to Publish!</h2>
//                             <p className='p-2 text-gray-500'>Your course is ready to be published and available to students.</p>

//                             {/* Course Preview */}
//                             <div className="mt-6 p-6 bg-gray-50 rounded-lg text-left">
//                                 <h3 className="font-semibold text-lg mb-4 border-b pb-2">Course Preview</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div>
//                                         <p><strong>Title:</strong> {formData.title || "Not set"}</p>
//                                         <p><strong>Description:</strong> {formData.description ? `${formData.description.substring(0, 50)}...` : "Not set"}</p>
//                                         <p><strong>Category:</strong> {formData.category || "Not set"}</p>
//                                     </div>
//                                     <div>
//                                         <p><strong>Level:</strong> {formData.level || "Not set"}</p>
//                                         <p><strong>Course Type:</strong> {formData.courseCategory || "Not set"}</p>
//                                         <p><strong>Total Chapters:</strong> {formData.chapters.length}</p>
//                                         <p><strong>Enrollment Limit:</strong> {formData.enrollmentLimit || "Unlimited"}</p>
//                                     </div>
//                                 </div>

//                                 {/* Chapters Summary */}
//                                 {formData.chapters.length > 0 && (
//                                     <div className="mt-4">
//                                         <h4 className="font-medium mb-2">Chapters:</h4>
//                                         <div className="space-y-2 max-h-40 overflow-y-auto">
//                                             {formData.chapters.map((chapter, index) => (
//                                                 <div key={chapter.id} className="text-sm bg-white p-2 rounded border">
//                                                     <p><strong>Chapter {index + 1}:</strong> {chapter.chapterName}</p>
//                                                     <p className="text-gray-600">PDFs: {chapter.pdfFiles?.length || 0}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Navigation Buttons */}
//                             <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
//                                 <button
//                                     onClick={prevStep}
//                                     className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto"
//                                 >
//                                     Previous
//                                 </button>
//                                 <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                                     <button
//                                         onClick={handleSaveDraft}
//                                         className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto"
//                                     >
//                                         Save as Draft
//                                     </button>
//                                     <button
//                                         onClick={handlePublish}
//                                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center w-full sm:w-auto transition"
//                                     >
//                                         <Send size={16} />
//                                         <span>Publish Course</span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
// -------------------------------sathis bor code----------------------------

// my complete code

import React, { useState, useEffect, useRef } from 'react';
import { MdCloudUpload } from "react-icons/md";
import { FcVideoFile } from "react-icons/fc";
import { LuFileText } from "react-icons/lu";
import { LiaCheckCircleSolid } from "react-icons/lia";
import { HiDotsVertical } from "react-icons/hi";
import { Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import ChapterUploadForm from './chapterUploadForm';
import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
import { useNavigate, useParams } from "react-router-dom";
// // import BACKEND_URL from '../../../../../api/Api';

export default function CreateCourse() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [click, setClick] = useState("Basics");
    const [fileName, setFileName] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [activeForms, setActiveForms] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownOpenForChapter, setDropdownOpenForChapter] = useState(null);
    const buttons = ["Basics", "Content", "Settings", "Publish"];
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        // basic
        title: '',
        description: '',
        category: '',
        level: '',
        thumbnail: null,
        existingThumbnail: "",

        // content
        chapters: [],

        // settings
        courseCategory: '',
        enrollmentLimit: '',
        courseThumbnail: '',
    });

    const getSignedUrl = async (file) => {
        const res = await axios.get(
            `http://localhost:5000/api/s3/upload-url`,
            {
                params: {
                    fileName: file.name,
                    fileType: file.type
                }
            }
        );

        return res.data;
    };

    const uploadToS3 = async (file, uploadUrl) => {
        await axios.put(uploadUrl, file, {
            headers: { "Content-Type": file.type },
            onUploadProgress: (e) => {
                console.log(`Upload: ${Math.round((e.loaded / e.total) * 100)}%`);
            }
        });
    };

    useEffect(() => {
        if (courseId) {
            axios.get(`http://localhost:5000/api/courses/${courseId}`)
                .then(res => {
                    const c = res.data;
                    
                    // Set thumbnail preview if it exists
                    if (c.thumbnail) {
                        setThumbnailPreview(c.thumbnail);
                    }

                    setFormData({
                        title: c.courseTitle,
                        description: c.courseDescription,
                        category: c.courseCategory,
                        level: c.courseLevel,
                        thumbnail: c.thumbnail ? null : null, // Keep as null to maintain existing logic
                        existingThumbnail: c.thumbnail || "",
                        chapters: c.chapters?.map((ch, i) => ({
                            id: ch._id || i,
                            chapterName: ch.lessonName,
                            description: ch.lessonDescription,
                            notes: ch.lessonNotes,

                            videoUrl: ch.lessonVideoURL,
                            videoFile: null,

                            pdfFiles: [],
                        })),
                        courseCategory: c.subcriptionPlan,
                        enrollmentLimit: c.enrollmentLimit,
                    });
                });
        }
    }, [courseId]);

    // Handle file selection with preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setThumbnailPreview(previewUrl);
            setFileName(file.name);
            
            setFormData(prev => ({
                ...prev,
                thumbnail: file
            }));
            
            toast.success("Thumbnail uploaded successfully!");
        } else {
            setFileName("");
            setFormData(prev => ({
                ...prev,
                thumbnail: null
            }));
        }
    };

    // Handle removing thumbnail
    const handleRemoveThumbnail = () => {
        setThumbnailPreview("");
        setFileName("");
        setFormData(prev => ({
            ...prev,
            thumbnail: null,
            existingThumbnail: ""
        }));
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        
        toast.info("Thumbnail removed");
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Form validation
    const validateCurrentStep = () => {
        switch (click) {
            case "Basics":
                if (!formData.title.trim()) {
                    toast.error("Course title is required");
                    return false;
                }
                if (!formData.description.trim()) {
                    toast.error("Course description is required");
                    return false;
                }
                if (!formData.category) {
                    toast.error("Please select a category");
                    return false;
                }
                if (!formData.level) {
                    toast.error("Please select a level");
                    return false;
                }
                if (!formData.thumbnail && !formData.existingThumbnail) {
                    toast.error("Please upload a thumbnail");
                    return false;
                }
                return true;

            case "Content":
                if (formData.chapters.length === 0) {
                    toast.error("Please add at least one chapter");
                    return false;
                }
                return true;

            case "Settings":
                if (!formData.courseCategory) {
                    toast.error("Please select a course Subcription Plan");
                    return false;
                }
                return true;

            default:
                return true;
        }
    };

    // Navigation functions
    const nextStep = () => {
        if (validateCurrentStep()) {
            const currentIndex = buttons.indexOf(click);
            if (currentIndex < buttons.length - 1) {
                setClick(buttons[currentIndex + 1]);
            }
        }
    };

    const prevStep = () => {
        const currentIndex = buttons.indexOf(click);
        if (currentIndex > 0) {
            setClick(buttons[currentIndex - 1]);
        }
    };

    // Chapter management
    const handleAddForm = () => {
        setActiveForms((prev) => [...prev, Date.now()]);
    };

    const handleCancelForm = (formId) => {
        setActiveForms((prev) => prev.filter((id) => id !== formId));
    };

    const handleAddChapter = (newChapter, formId) => {
        const updatedChapters = [...formData.chapters, newChapter];
        setFormData(prev => ({
            ...prev,
            chapters: updatedChapters
        }));
        setActiveForms((prev) => prev.filter((id) => id !== formId));
        toast.success("Chapter added successfully!");
    };

    // Delete chapter
    const handleDeleteChapter = (chapterId) => {
        const updatedChapters = formData.chapters.filter(chapter => chapter.id !== chapterId);
        setFormData(prev => ({
            ...prev,
            chapters: updatedChapters
        }));
        setDropdownOpenForChapter(null);
        toast.info("Chapter deleted successfully!");
    };

    // Toggle dropdown for specific chapter
    const toggleDropdown = (chapterId) => {
        setDropdownOpenForChapter(dropdownOpenForChapter === chapterId ? null : chapterId);
    };

    // Final submission
    const handlePublish = async () => {
        if (!validateCurrentStep()) return;

        const fd = new FormData();

        // Basic details
        fd.append("courseTitle", formData.title);
        fd.append("courseDescription", formData.description);
        fd.append("courseCategory", formData.category);
        fd.append("courseLevel", formData.level);
        fd.append("subcriptionPlan", formData.courseCategory);
        fd.append("enrollmentLimit", formData.enrollmentLimit);
        fd.append("teacherId", "64a7f0f5c2f1b2e4d5a6b7c8");
        fd.append("status", "published");

        // Thumbnail image - handle both new file and existing URL
        if (formData.thumbnail instanceof File) {
            fd.append("thumbnail", formData.thumbnail);
        } else if (formData.existingThumbnail) {
            // If we have existing thumbnail URL but no new file
            fd.append("thumbnailUrl", formData.existingThumbnail);
        }

        // Add chapters
        formData.chapters.forEach((chapter, index) => {
            fd.append(`lessonName[]`, chapter.chapterName);
            fd.append(`lessonDescription[]`, chapter.description);
            fd.append(`lessonNotes[]`, chapter.notes);

            if (chapter.videoFile instanceof File) {
                fd.append(`lessonVideoURL-${index}`, chapter.videoFile);
            }
            if (chapter.pdfFiles && chapter.pdfFiles.length > 0) {
                chapter.pdfFiles.forEach((pdf, pdfIndex) => {
                    if (pdf instanceof File)
                        fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
                });
            }
        });

        try {
            if (courseId) {
                // EDIT MODE
                await axios.put(
                    `http://localhost:5000/api/courses/update/${courseId}`,
                    fd,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                navigate('/teacher/mycourse')
                toast.success("Course updated successfully! ✨");

            }
            else {
                // CREATE MODE
                await axios.post(
                    `http://localhost:5000/api/courses/upload`,
                    fd,
                    { headers: { "Content-Type": "multipart/form-data" } }
                ).then(res => console.log(res.data))
                    .catch(err => console.error('Upload Error:', err.response?.data || err));

                toast.success("Course published successfully! 🚀");
                
                navigate('/teacher/mycourse')
            }
        } catch (error) {
            console.error("🔥 Upload Error:", error.response ? error.response.data : error);
            toast.error("Failed to upload course");
        }
    };

    // Handle draft
    const handleSaveDraft = async () => {
        // Draft should skip validations except title
        if (!formData.title.trim()) {
            toast.error("Course title is required to save draft");
            return;
        }

        const fd = new FormData();

        // Basic
        fd.append("courseTitle", formData.title);
        fd.append("courseDescription", formData.description || "");
        fd.append("courseCategory", formData.category || "");
        fd.append("courseLevel", formData.level || "");
        fd.append("subcriptionPlan", formData.courseCategory || "");
        fd.append("enrollmentLimit", formData.enrollmentLimit || "");
        fd.append("teacherId", "64a7f0f5c2f1b2e4d5a6b7c8");

        // ⭐⭐ IMPORTANT — Add status = draft ⭐⭐
        fd.append("status", "draft");

        // Thumbnail - handle both new file and existing URL
        if (formData.thumbnail instanceof File) {
            fd.append("thumbnail", formData.thumbnail);
        } else if (formData.existingThumbnail) {
            fd.append("thumbnailUrl", formData.existingThumbnail);
        }

        // Chapters (optional)
        formData.chapters.forEach((chapter, index) => {
            fd.append(`lessonName[]`, chapter.chapterName || "");
            fd.append(`lessonDescription[]`, chapter.description || "");
            fd.append(`lessonNotes[]`, chapter.notes || "");

            // video
            if (chapter.videoFile instanceof File) {
                fd.append(`lessonVideoURL-${index}`, chapter.videoFile);
            }

            // pdfs
            if (chapter.pdfFiles && chapter.pdfFiles.length > 0) {
                chapter.pdfFiles.forEach((pdf, pdfIndex) => {
                    if (pdf instanceof File)
                        fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
                });
            }
        });

        try {
            if (courseId) {
                // EDIT MODE
                await axios.put(
                    `http://localhost:5000/api/courses/update/${courseId}`,
                    fd,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                toast.success("Course saved as draft! 💾");
                setTimeout(() => {
                    navigate('/teacher/mycourse');
                }, 1500);

            } else {
                // CREATE MODE
                await axios.post(
                    `http://localhost:5000/api/courses/upload`,
                    fd,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                toast.success("Course saved as draft! 💾");
                setTimeout(() => {
                    navigate('/teacher/mycourse');
                }, 1500);
            }

        } catch (error) {
            console.error("🔥 Upload Error:", error.response ? error.response.data : error);
            toast.error("Failed to save draft");
        }
    };

    return (
        <div className="p-10 bg-gray-100 pt-20 min-h-screen">
            <ToastContainer position="top-center" autoClose={3000} />
            <BackToDashboard />
            {/* Title */}
            <div>
                <h1 className="text-4xl font-semibold">
                    {courseId ? "Edit Course" : "Create Course"}
                </h1>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-around mt-10 bg-gray-200 rounded-full px-3 py-1">
                {buttons.map((btn) => (
                    <button
                        key={btn}
                        onClick={() => setClick(btn)}
                        className={`w-100 rounded-full px-5 py-1 font-medium transition ${click === btn ? "bg-white shadow-md" : ""
                            }`}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {/* Basics Tab - UPDATED WITH THUMBNAIL PREVIEW */}
                {click === "Basics" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                            Course Information
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Basic details about your course
                        </p>

                        <div className="space-y-6">
                            {/* Course Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Complete Web Development Bootcamp"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            {/* Course Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Description *
                                </label>
                                <textarea
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Describe what students will learn in this course..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                ></textarea>
                            </div>

                            {/* Category and Level */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile Development">Mobile Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Design">Design</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Level *
                                    </label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => handleInputChange('level', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    >
                                        <option value="">Select level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            {/* Thumbnail Upload with Preview */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Thumbnail *
                                </label>
                                
                                {/* Thumbnail Preview */}
                                {thumbnailPreview && (
                                    <div className="mb-4">
                                        <div className="relative w-64 h-36 rounded-lg overflow-hidden border border-gray-300">
                                            <img 
                                                src={thumbnailPreview} 
                                                alt="Thumbnail preview" 
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={handleRemoveThumbnail}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {fileName || "Current thumbnail"}
                                        </p>
                                    </div>
                                )}

                                <div className={`border-2 border-dashed ${thumbnailPreview ? 'border-green-300' : 'border-gray-300'} rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-indigo-400 transition`}>
                                    <MdCloudUpload className="text-4xl text-gray-500 mb-2" />
                                    <p className="text-gray-600 text-sm mb-2">
                                        {thumbnailPreview ? "Click to change thumbnail" : "Upload course thumbnail (16:9 ratio recommended)"}
                                    </p>

                                    {fileName && !thumbnailPreview && (
                                        <p className="text-gray-500 text-sm mt-2 mb-2">
                                            {fileName}
                                        </p>
                                    )}

                                    <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition">
                                        {thumbnailPreview ? "Change File" : "Choose File"}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={nextStep}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Next: Content
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Tab - UPDATED with better dropdown handling */}
                {click === "Content" && (
                    <div className="flex justify-center">
                        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-6">
                            <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
                            <p className="text-gray-500 mb-6">
                                Add chapters and lessons to your course. At least one chapter is required.
                            </p>

                            {/* Add Chapter Button */}
                            <button
                                onClick={handleAddForm}
                                className="w-full text-center bg-gray-100 hover:bg-green-600 hover:text-white py-3 rounded-lg mb-5 transition font-medium"
                            >
                                + Add Chapter
                            </button>

                            {/* Active Forms */}
                            {activeForms.map((formId) => (
                                <div key={formId} className="mb-6 border border-gray-200 rounded-xl">
                                    <div className="bg-gray-50 px-4 py-3 rounded-t-xl flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-700">New Chapter Form</h3>
                                        <button
                                            onClick={() => handleCancelForm(formId)}
                                            className="text-red-500 hover:text-red-700 text-lg"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <ChapterUploadForm
                                            index={formData.chapters.length}
                                            onAddChapter={(chapter) => handleAddChapter(chapter, formId)}
                                            onCancel={() => handleCancelForm(formId)}
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Saved Chapters */}
                            {formData.chapters.length === 0 && activeForms.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">
                                    <p>No chapters added yet. Click "Add Chapter" to get started.</p>
                                </div>
                            ) : (
                                formData.chapters.map((chapter, i) => (
                                    <div key={chapter.id} className="border border-gray-200 bg-white rounded-xl mt-5 p-5 shadow-sm">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h1 className="font-medium text-lg text-gray-800">{chapter.chapterName}</h1>
                                                <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                                            </div>
                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleDropdown(chapter.id)}
                                                    className="hover:bg-gray-200 p-2 rounded-xl text-gray-500">
                                                    <HiDotsVertical />
                                                </button>
                                                {dropdownOpenForChapter === chapter.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                                        <button
                                                            onClick={() => handleDeleteChapter(chapter.id)}
                                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                                        >
                                                            Delete Chapter
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Video File */}
                                        {chapter.videoFile && (
                                            <div className="flex justify-between items-center mt-4 p-3 bg-blue-50 rounded-lg">
                                                <div className="flex gap-2 items-center">
                                                    <FcVideoFile className="text-xl" />
                                                    <span className="font-medium text-gray-700">{chapter.videoFile.name}</span>
                                                </div>
                                                <span className="text-xs bg-white border rounded-full px-3 py-1 border-gray-300">
                                                    {chapter.videoFile.sizeMB} MB
                                                </span>
                                            </div>
                                        )}

                                        {/* PDF Files */}
                                        {chapter.pdfFiles?.length > 0 && (
                                            <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                                                <p className="text-sm font-medium mb-2 text-gray-700">Attached PDFs ({chapter.pdfFiles.length}):</p>
                                                <div className="space-y-2">
                                                    {chapter.pdfFiles.map((pdf, id) => (
                                                        <div key={id} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                                                            <div className="flex gap-2 items-center">
                                                                <LuFileText className="text-gray-600" />
                                                                <span className="text-gray-700">{pdf.name}</span>
                                                            </div>
                                                            <span className="text-xs text-gray-500">{pdf.sizeMB} MB</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Additional Notes */}
                                        {chapter.notes && (
                                            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                                                <p className="text-sm text-gray-600">{chapter.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}

                            {/* Chapter Count and Validation Status */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        Total Chapters: <span className="font-bold">{formData.chapters.length}</span>
                                    </span>
                                    {formData.chapters.length === 0 ? (
                                        <span className="text-red-500 text-sm">⚠️ At least one chapter required</span>
                                    ) : (
                                        <span className="text-green-500 text-sm">✅ Ready to proceed</span>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={formData.chapters.length === 0}
                                    className={`px-6 py-2 rounded-lg transition ${formData.chapters.length === 0
                                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                >
                                    Next: Settings
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {click === "Settings" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                            Course Settings
                        </h2>
                        <p className="text-gray-500 mb-6 mt-2">
                            Configure course availability and access
                        </p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xl text-gray-700 mb-1">
                                    Course Category *
                                </label>
                                <select
                                    value={formData.courseCategory}
                                    onChange={(e) => handleInputChange('courseCategory', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none mt-2"
                                >
                                    <option value="">Select category</option>
                                    <option value="Free">Free</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Subscription Only">Subscription Only</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xl text-gray-700 mb-2">
                                    Enrollment Limit
                                </label>
                                <input
                                    type="number"
                                    value={formData.enrollmentLimit}
                                    onChange={(e) => handleInputChange('enrollmentLimit', e.target.value)}
                                    placeholder="Leave empty for unlimited"
                                    className="w-full border border-gray-300 mt-2 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Next: Publish
                            </button>
                        </div>
                    </div>
                )}

                {/* Publish Tab - UPDATED with thumbnail preview */}
                {click === "Publish" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                            Publish Course
                        </h2>
                        <p className="text-gray-500 mb-6 mt-2">
                            Review and publish your course
                        </p>

                        <div className='text-center'>
                            <div className='flex justify-center mb-4'>
                                <LiaCheckCircleSolid className='text-7xl text-green-500' />
                            </div>
                            <h2 className='p-2 text-2xl font-semibold'>Ready to Publish!</h2>
                            <p className='p-2 text-gray-500'>Your course is ready to be published and available to students.</p>

                            {/* Course Preview with Thumbnail */}
                            <div className="mt-6 p-6 bg-gray-50 rounded-lg text-left">
                                <h3 className="font-semibold text-lg mb-4 border-b pb-2">Course Preview</h3>
                                
                                {/* Thumbnail Preview in Publish tab */}
                                {thumbnailPreview && (
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Thumbnail:</h4>
                                        <div className="w-64 h-36 rounded-lg overflow-hidden border border-gray-300">
                                            <img 
                                                src={thumbnailPreview} 
                                                alt="Course thumbnail" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p><strong>Title:</strong> {formData.title || "Not set"}</p>
                                        <p><strong>Description:</strong> {formData.description ? `${formData.description.substring(0, 50)}...` : "Not set"}</p>
                                        <p><strong>Category:</strong> {formData.category || "Not set"}</p>
                                        <p><strong>Level:</strong> {formData.level || "Not set"}</p>
                                    </div>
                                    <div>
                                        <p><strong>Course Type:</strong> {formData.courseCategory || "Not set"}</p>
                                        <p><strong>Total Chapters:</strong> {formData.chapters.length}</p>
                                        <p><strong>Enrollment Limit:</strong> {formData.enrollmentLimit || "Unlimited"}</p>
                                        <p><strong>Thumbnail:</strong> {thumbnailPreview ? "✅ Uploaded" : "❌ Not set"}</p>
                                    </div>
                                </div>

                                {/* Chapters Summary */}
                                {formData.chapters.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-medium mb-2">Chapters:</h4>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {formData.chapters.map((chapter, index) => (
                                                <div key={chapter.id} className="text-sm bg-white p-2 rounded border">
                                                    <p><strong>Chapter {index + 1}:</strong> {chapter.chapterName}</p>
                                                    <p className="text-gray-600">PDFs: {chapter.pdfFiles?.length || 0}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
                                <button
                                    onClick={prevStep}
                                    className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto"
                                >
                                    Previous
                                </button>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={handleSaveDraft}
                                        className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        onClick={handlePublish}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center w-full sm:w-auto transition"
                                    >
                                        <Send size={16} />
                                        <span>Publish Course</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}






// import React, { useState, useEffect, useRef } from 'react';
// import { MdCloudUpload } from "react-icons/md";
// import { FcVideoFile } from "react-icons/fc";
// import { LuFileText } from "react-icons/lu";
// import { LiaCheckCircleSolid } from "react-icons/lia";
// import { HiDotsVertical } from "react-icons/hi";
// import { Send } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
// import ChapterUploadForm from './chapterUploadForm';
// import BackToDashboard from '../../../../common/backDashboard/BackDashboard';
// import { useNavigate, useParams } from "react-router-dom";

// export default function CreateCourse() {
//     const navigate = useNavigate();
//     const { courseId } = useParams();
//     const [click, setClick] = useState("Basics");
//     const [fileName, setFileName] = useState("");
//     const [thumbnailPreview, setThumbnailPreview] = useState("");
//     const [activeForms, setActiveForms] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const buttons = ["Basics", "Content", "Settings", "Publish"];
//     const fileInputRef = useRef(null);

//     const [formData, setFormData] = useState({
//         // basic
//         title: '',
//         description: '',
//         category: '',
//         level: '',
//         thumbnail: null,
//         thumbnailPreview: "",

//         // content
//         chapters: [],

//         // settings
//         courseCategory: '',
//         enrollmentLimit: '',
//     });

//     useEffect(() => {
//         if (courseId) {
//             axios.get(`http://localhost:5000/api/courses/${courseId}`)
//                 .then(res => {
//                     const c = res.data;
                    
//                     setFormData({
//                         title: c.courseTitle,
//                         description: c.courseDescription,
//                         category: c.courseCategory,
//                         level: c.courseLevel,
//                         thumbnail: c.thumbnail || null,
//                         thumbnailPreview: c.thumbnail || "",
//                         chapters: c.chapters || [],
//                         courseCategory: c.subcriptionPlan,
//                         enrollmentLimit: c.enrollmentLimit,
//                     });
                    
//                     if (c.thumbnail) {
//                         setThumbnailPreview(c.thumbnail);
//                         setFileName("Current thumbnail");
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Error fetching course:", error);
//                     toast.error("Failed to load course data");
//                 });
//         }
//     }, [courseId]);

//     // Handle drag and drop events
//     const handleDragOver = (e) => {
//         e.preventDefault();
//         setIsDragging(true);
//     };

//     const handleDragLeave = (e) => {
//         e.preventDefault();
//         setIsDragging(false);
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         setIsDragging(false);
//         const file = e.dataTransfer.files[0];
//         if (file) {
//             processThumbnailFile(file);
//         }
//     };

//     // Handle file selection for thumbnail
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             processThumbnailFile(file);
//         }
//     };

//     const processThumbnailFile = (file) => {
//         // Validate file type
//         const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
//         if (!validTypes.includes(file.type)) {
//             toast.error("Please upload an image file (JPEG, PNG, GIF, WebP)");
//             return;
//         }
        
//         // Validate file size (max 5MB)
//         if (file.size > 5 * 1024 * 1024) {
//             toast.error("File size should be less than 5MB");
//             return;
//         }
        
//         setFileName(file.name);
        
//         // Create preview URL
//         const previewUrl = URL.createObjectURL(file);
//         setThumbnailPreview(previewUrl);
        
//         setFormData(prev => ({
//             ...prev,
//             thumbnail: file,
//             thumbnailPreview: previewUrl
//         }));
        
//         toast.success("Thumbnail uploaded successfully!");
//     };

//     // Handle thumbnail removal
//     const handleRemoveThumbnail = () => {
//         setFileName("");
//         setThumbnailPreview("");
//         setFormData(prev => ({
//             ...prev,
//             thumbnail: null,
//             thumbnailPreview: ""
//         }));
//         if (fileInputRef.current) {
//             fileInputRef.current.value = "";
//         }
//         toast.info("Thumbnail removed");
//     };

//     // Handle input changes
//     const handleInputChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     // Form validation
//     const validateCurrentStep = () => {
//         switch (click) {
//             case "Basics":
//                 if (!formData.title.trim()) {
//                     toast.error("Course title is required");
//                     return false;
//                 }
//                 if (!formData.description.trim()) {
//                     toast.error("Course description is required");
//                     return false;
//                 }
//                 if (!formData.category) {
//                     toast.error("Please select a category");
//                     return false;
//                 }
//                 if (!formData.level) {
//                     toast.error("Please select a level");
//                     return false;
//                 }
//                 if (!formData.thumbnail && !thumbnailPreview) {
//                     toast.error("Please upload a thumbnail");
//                     return false;
//                 }
//                 return true;

//             case "Content":
//                 if (formData.chapters.length === 0) {
//                     toast.error("Please add at least one chapter");
//                     return false;
//                 }
//                 return true;

//             case "Settings":
//                 if (!formData.courseCategory) {
//                     toast.error("Please select a course Subscription Plan");
//                     return false;
//                 }
//                 return true;

//             default:
//                 return true;
//         }
//     };

//     // Navigation functions
//     const nextStep = () => {
//         if (validateCurrentStep()) {
//             const currentIndex = buttons.indexOf(click);
//             if (currentIndex < buttons.length - 1) {
//                 setClick(buttons[currentIndex + 1]);
//             }
//         }
//     };

//     const prevStep = () => {
//         const currentIndex = buttons.indexOf(click);
//         if (currentIndex > 0) {
//             setClick(buttons[currentIndex - 1]);
//         }
//     };

//     // Chapter management
//     const handleAddForm = () => {
//         setActiveForms((prev) => [...prev, Date.now()]);
//     };

//     const handleCancelForm = (formId) => {
//         setActiveForms((prev) => prev.filter((id) => id !== formId));
//     };

//     const handleAddChapter = (newChapter, formId) => {
//         const updatedChapters = [...formData.chapters, newChapter];
//         setFormData(prev => ({
//             ...prev,
//             chapters: updatedChapters
//         }));
//         setActiveForms((prev) => prev.filter((id) => id !== formId));
//         toast.success("Chapter added successfully!");
//     };

//     // Delete chapter
//     const handleDeleteChapter = (chapterId) => {
//         const updatedChapters = formData.chapters.filter(chapter => chapter.id !== chapterId);
//         setFormData(prev => ({
//             ...prev,
//             chapters: updatedChapters
//         }));
//         toast.info("Chapter deleted successfully!");
//         setShowDropdown(null);
//     };

//     // Final submission
//     const handlePublish = async () => {
//         if (!validateCurrentStep()) return;

//         const fd = new FormData();

//         // Basic details
//         fd.append("courseTitle", formData.title);
//         fd.append("courseDescription", formData.description);
//         fd.append("courseCategory", formData.category);
//         fd.append("courseLevel", formData.level);
//         fd.append("subcriptionPlan", formData.courseCategory);
//         fd.append("enrollmentLimit", formData.enrollmentLimit || "");
//         fd.append("teacherId", localStorage.getItem("teacherId") || "64a7f0f5c2f1b2e4d5a6b7c8");
//         fd.append("status", "published");

//         // Thumbnail image
//         if (formData.thumbnail instanceof File) {
//             fd.append("thumbnail", formData.thumbnail);
//         } else if (thumbnailPreview && !thumbnailPreview.startsWith('blob:')) {
//             // If it's a URL from existing thumbnail
//             fd.append("thumbnailUrl", thumbnailPreview);
//         }

//         // Add chaptersx 
//         formData.chapters.forEach((chapter, index) => {
//             fd.append(`lessonName[]`, chapter.chapterName);
//             fd.append(`lessonDescription[]`, chapter.description);
//             fd.append(`lessonNotes[]`, chapter.notes || "");

//             // lesson video
//             if (chapter.videoFile instanceof File) {
//                 fd.append(`lessonVideoURL-${index}`, chapter.videoFile);
//             }
            
//             // PDF files
//             if (chapter.pdfFiles && chapter.pdfFiles.length > 0) {
//                 chapter.pdfFiles.forEach((pdf, pdfIndex) => {
//                     if (pdf instanceof File) {
//                         fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
//                     }
//                 });
//             }
//         });

//         try {
//             if (courseId) {
//                 // EDIT MODE
//                 const response = await axios.put(
//                     `http://localhost:5000/api/courses/update/${courseId}`,
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 );
                
//                 toast.success("🎉 Course updated successfully!");
//                 setTimeout(() => {
//                     navigate('/teacher/mycourse');
//                 }, 1500);

//             } else {
//                 // CREATE MODE
//                 const response = await axios.post(
//                     "http://localhost:5000/api/courses/upload",
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 );
                
//                 toast.success("🚀 Course published successfully!");
//                 setTimeout(() => {
//                     navigate('/teacher/mycourse');
//                 }, 1500);
//             }

//         } catch (error) {
//             console.error("Upload Error:", error.response ? error.response.data : error);
//             toast.error("❌ Failed to upload course. Please try again.");
//         }
//     };

//     // Handle draft save
//     const handleSaveDraft = async () => {
//         if (!formData.title.trim()) {
//             toast.error("Course title is required to save draft");
//             return;
//         }

//         const fd = new FormData();

//         // Basic
//         fd.append("courseTitle", formData.title);
//         fd.append("courseDescription", formData.description || "");
//         fd.append("courseCategory", formData.category || "");
//         fd.append("courseLevel", formData.level || "");
//         fd.append("subcriptionPlan", formData.courseCategory || "");
//         fd.append("enrollmentLimit", formData.enrollmentLimit || "");
//         fd.append("teacherId", localStorage.getItem("teacherId") || "64a7f0f5c2f1b2e4d5a6b7c8");
//         fd.append("status", "draft");

//         // Thumbnail
//         if (formData.thumbnail instanceof File) {
//             fd.append("thumbnail", formData.thumbnail);
//         } else if (thumbnailPreview && !thumbnailPreview.startsWith('blob:')) {
//             fd.append("thumbnailUrl", thumbnailPreview);
//         }

//         // Chapters (optional)
//         formData.chapters.forEach((chapter, index) => {
//             fd.append(`lessonName[]`, chapter.chapterName || "");
//             fd.append(`lessonDescription[]`, chapter.description || "");
//             fd.append(`lessonNotes[]`, chapter.notes || "");

//             // video
//             if (chapter.videoFile instanceof File) {
//                 fd.append(`lessonVideoURL-${index}`, chapter.videoFile);
//             }

//             // pdfs
//             if (chapter.pdfFiles && chapter.pdfFiles.length > 0) {
//                 chapter.pdfFiles.forEach((pdf, pdfIndex) => {
//                     if (pdf instanceof File)
//                         fd.append(`lessonPdf-${index}-${pdfIndex}`, pdf);
//                 });
//             }
//         });

//         try {
//             if (courseId) {
//                 // EDIT MODE for draft
//                 await axios.put(
//                     `http://localhost:5000/api/courses/update/${courseId}`,
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 );

//                 toast.success("💾 Draft saved successfully!");
//                 setTimeout(() => {
//                     navigate('/teacher/mycourse');
//                 }, 1500);

//             } else {
//                 // CREATE MODE for draft
//                 await axios.post(
//                     "http://localhost:5000/api/courses/upload",
//                     fd,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                 );

//                 toast.success("💾 Draft saved successfully!");
//                 setTimeout(() => {
//                     navigate('/teacher/mycourse');
//                 }, 1500);
//             }

//         } catch (error) {
//             console.error("Draft Save Error:", error.response ? error.response.data : error);
//             toast.error("❌ Failed to save draft. Please try again.");
//         }
//     };

//     // Toggle dropdown for chapters
//     const toggleDropdown = (chapterId) => {
//         setShowDropdown(showDropdown === chapterId ? null : chapterId);
//     };

//     return (
//         <div className="p-10 bg-gray-100 pt-20 min-h-screen">
//             <ToastContainer 
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
            
//             <BackToDashboard/>
            
//             {/* Title */}
//             <div>
//                 <h1 className="text-4xl font-semibold">
//                     {courseId ? "Edit Course" : "Create Course"}
//                 </h1>
//                 <p className="text-gray-500 mt-2">
//                     {courseId ? "Update your course details" : "Build your new course step by step"}
//                 </p>
//             </div>

//             {/* Progress Steps */}
//             <div className="flex flex-wrap justify-around mt-10 bg-gray-200 rounded-full px-3 py-1">
//                 {buttons.map((btn) => (
//                     <button
//                         key={btn}
//                         onClick={() => setClick(btn)}
//                         className={`w-full sm:w-auto rounded-full px-5 py-2 sm:py-1 font-medium transition my-1 sm:my-0 ${click === btn ? "bg-white shadow-md text-blue-600" : "text-gray-600 hover:text-gray-800"
//                             }`}
//                     >
//                         {btn}
//                     </button>
//                 ))}
//             </div>

//             {/* Tab Content */}
//             <div className="mt-6">
//                 {/* Basics Tab */}
//                 {click === "Basics" && (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                             Course Information
//                         </h2>
//                         <p className="text-sm text-gray-500 mb-6">
//                             Basic details about your course
//                         </p>

//                         <div className="space-y-6">
//                             {/* Course Title */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Course Title *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.title}
//                                     onChange={(e) => handleInputChange('title', e.target.value)}
//                                     placeholder="e.g., Complete Web Development Bootcamp"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
//                                 />
//                             </div>

//                             {/* Course Description */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Course Description *
//                                 </label>
//                                 <textarea
//                                     rows="4"
//                                     value={formData.description}
//                                     onChange={(e) => handleInputChange('description', e.target.value)}
//                                     placeholder="Describe what students will learn in this course..."
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
//                                 ></textarea>
//                             </div>

//                             {/* Category and Level */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Category *
//                                     </label>
//                                     <select
//                                         value={formData.category}
//                                         onChange={(e) => handleInputChange('category', e.target.value)}
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
//                                     >
//                                         <option value="">Select a category</option>
//                                         <option value="Web Development">Web Development</option>
//                                         <option value="Mobile Development">Mobile Development</option>
//                                         <option value="Data Science">Data Science</option>
//                                         <option value="Design">Design</option>
//                                         <option value="Business">Business</option>
//                                         <option value="Marketing">Marketing</option>
//                                         <option value="Photography">Photography</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Level *
//                                     </label>
//                                     <select
//                                         value={formData.level}
//                                         onChange={(e) => handleInputChange('level', e.target.value)}
//                                         className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
//                                     >
//                                         <option value="">Select level</option>
//                                         <option value="Beginner">Beginner</option>
//                                         <option value="Intermediate">Intermediate</option>
//                                         <option value="Advanced">Advanced</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Thumbnail Upload */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Course Thumbnail *
//                                 </label>
                                
//                                 {/* Thumbnail Preview */}
//                                 {thumbnailPreview && (
//                                     <div className="mb-4">
//                                         <div className="relative w-64 h-36 rounded-lg overflow-hidden border border-gray-300">
//                                             <img 
//                                                 src={thumbnailPreview} 
//                                                 alt="Thumbnail preview" 
//                                                 className="w-full h-full object-cover"
//                                             />
//                                             <button
//                                                 onClick={handleRemoveThumbnail}
//                                                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
//                                             >
//                                                 ✕
//                                             </button>
//                                         </div>
//                                         <p className="text-sm text-gray-500 mt-1">
//                                             {fileName || "Current thumbnail"}
//                                         </p>
//                                     </div>
//                                 )}

//                                 {/* Upload Area - FIXED: Removed onClick from container */}
//                                 <div 
//                                     className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : thumbnailPreview ? 'border-blue-300' : 'border-gray-300'} rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 transition`}
//                                     onDragOver={handleDragOver}
//                                     onDragLeave={handleDragLeave}
//                                     onDrop={handleDrop}
//                                 >
//                                     <MdCloudUpload className="text-4xl text-gray-500 mb-2" />
//                                     <p className="text-gray-600 text-sm mb-2">
//                                         {thumbnailPreview ? "Drag & drop or click to change thumbnail" : "Drag & drop or click to upload thumbnail"}
//                                     </p>
//                                     <p className="text-gray-500 text-xs mb-3">
//                                         Recommended: 1280x720 px (16:9 ratio), Max 5MB
//                                     </p>

//                                     {/* File input with label - Only one click handler here */}
//                                     <div className="relative">
//                                         <label 
//                                             htmlFor="thumbnail-upload"
//                                             className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg cursor-pointer transition inline-block"
//                                         >
//                                             {thumbnailPreview ? "Change File" : "Choose File"}
//                                         </label>
//                                         <input
//                                             id="thumbnail-upload"
//                                             ref={fileInputRef}
//                                             type="file"
//                                             onChange={handleFileChange}
//                                             className="hidden"
//                                             accept="image/*"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Navigation Buttons */}
//                             <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
//                                 <button
//                                     onClick={nextStep}
//                                     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//                                 >
//                                     Next: Content
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content Tab */}
//                 {click === "Content" && (
//                     <div className="flex justify-center">
//                         <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-6">
//                             <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
//                             <p className="text-gray-500 mb-6">
//                                 Add chapters and lessons to your course. At least one chapter is required.
//                             </p>

//                             {/* Add Chapter Button */}
//                             <button
//                                 onClick={handleAddForm}
//                                 className="w-full text-center bg-gray-100 hover:bg-green-600 hover:text-white py-3 rounded-lg mb-5 transition font-medium"
//                             >
//                                 + Add Chapter
//                             </button>

//                             {/* Active Forms */}
//                             {activeForms.map((formId) => (
//                                 <div key={formId} className="mb-6 border border-gray-200 rounded-xl">
//                                     <div className="bg-gray-50 px-4 py-3 rounded-t-xl flex justify-between items-center">
//                                         <h3 className="font-semibold text-gray-700">New Chapter Form</h3>
//                                         <button
//                                             onClick={() => handleCancelForm(formId)}
//                                             className="text-red-500 hover:text-red-700 text-lg"
//                                         >
//                                             ✕
//                                         </button>
//                                     </div>
//                                     <div className="p-4">
//                                         <ChapterUploadForm
//                                             index={formData.chapters.length}
//                                             onAddChapter={(chapter) => handleAddChapter(chapter, formId)}
//                                             onCancel={() => handleCancelForm(formId)}
//                                         />
//                                     </div>
//                                 </div>
//                             ))}

//                             {/* Saved Chapters */}
//                             {formData.chapters.length === 0 && activeForms.length === 0 ? (
//                                 <div className="text-center py-10 text-gray-500">
//                                     <p>No chapters added yet. Click "Add Chapter" to get started.</p>
//                                 </div>
//                             ) : (
//                                 formData.chapters.map((chapter, i) => (
//                                     <div key={chapter.id} className="border border-gray-200 bg-white rounded-xl mt-5 p-5 shadow-sm">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <h1 className="font-medium text-lg text-gray-800">{chapter.chapterName}</h1>
//                                                 <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
//                                             </div>
//                                             <div className="relative">
//                                                 <button
//                                                     onClick={() => toggleDropdown(chapter.id)}
//                                                     className="hover:bg-gray-200 p-2 rounded-xl text-gray-500 transition">
//                                                     <HiDotsVertical />
//                                                 </button>
//                                                 {showDropdown === chapter.id && (
//                                                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
//                                                         <button
//                                                             onClick={() => handleDeleteChapter(chapter.id)}
//                                                             className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
//                                                         >
//                                                             Delete Chapter
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         {/* Video File */}
//                                         {chapter.videoFile && (
//                                             <div className="flex justify-between items-center mt-4 p-3 bg-blue-50 rounded-lg">
//                                                 <div className="flex gap-2 items-center">
//                                                     <FcVideoFile className="text-xl" />
//                                                     <span className="font-medium text-gray-700">{chapter.videoFile.name}</span>
//                                                 </div>
//                                                 <span className="text-xs bg-white border rounded-full px-3 py-1 border-gray-300">
//                                                     {chapter.videoFile.sizeMB} MB
//                                                 </span>
//                                             </div>
//                                         )}

//                                         {/* PDF Files */}
//                                         {chapter.pdfFiles?.length > 0 && (
//                                             <div className="mt-3 bg-gray-50 p-3 rounded-lg">
//                                                 <p className="text-sm font-medium mb-2 text-gray-700">Attached PDFs ({chapter.pdfFiles.length}):</p>
//                                                 <div className="space-y-2">
//                                                     {chapter.pdfFiles.map((pdf, id) => (
//                                                         <div key={id} className="flex justify-between items-center text-sm bg-white p-2 rounded">
//                                                             <div className="flex gap-2 items-center">
//                                                                 <LuFileText className="text-gray-600" />
//                                                                 <span className="text-gray-700">{pdf.name}</span>
//                                                             </div>
//                                                             <span className="text-xs text-gray-500">{pdf.sizeMB} MB</span>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Additional Notes */}
//                                         {chapter.notes && (
//                                             <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
//                                                 <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
//                                                 <p className="text-sm text-gray-600">{chapter.notes}</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))
//                             )}

//                             {/* Chapter Count and Validation Status */}
//                             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm font-medium text-gray-700">
//                                         Total Chapters: <span className="font-bold">{formData.chapters.length}</span>
//                                     </span>
//                                     {formData.chapters.length === 0 ? (
//                                         <span className="text-red-500 text-sm">⚠️ At least one chapter required</span>
//                                     ) : (
//                                         <span className="text-green-500 text-sm">✅ Ready to proceed</span>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Navigation Buttons */}
//                             <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
//                                 <button
//                                     onClick={prevStep}
//                                     className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
//                                 >
//                                     Previous
//                                 </button>
//                                 <button
//                                     onClick={nextStep}
//                                     disabled={formData.chapters.length === 0}
//                                     className={`px-6 py-3 rounded-lg transition font-medium ${formData.chapters.length === 0
//                                         ? "bg-gray-400 cursor-not-allowed text-gray-200"
//                                         : "bg-blue-600 hover:bg-blue-700 text-white"
//                                         }`}
//                                 >
//                                     Next: Settings
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Settings Tab */}
//                 {click === "Settings" && (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                             Course Settings
//                         </h2>
//                         <p className="text-gray-500 mb-6 mt-2">
//                             Configure course availability and access
//                         </p>

//                         <div className="space-y-6">
//                             <div>
//                                 <label className="block text-xl text-gray-700 mb-1">
//                                     Course Category *
//                                 </label>
//                                 <select
//                                     value={formData.courseCategory}
//                                     onChange={(e) => handleInputChange('courseCategory', e.target.value)}
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none mt-2"
//                                 >
//                                     <option value="">Select category</option>
//                                     <option value="Free">Free</option>
//                                     <option value="Premium">Premium</option>
//                                     <option value="Subscription Only">Subscription Only</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-xl text-gray-700 mb-2">
//                                     Enrollment Limit
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={formData.enrollmentLimit}
//                                     onChange={(e) => handleInputChange('enrollmentLimit', e.target.value)}
//                                     placeholder="Leave empty for unlimited"
//                                     className="w-full border border-gray-300 mt-2 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
//                                 />
//                             </div>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
//                             <button
//                                 onClick={prevStep}
//                                 className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 onClick={nextStep}
//                                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//                             >
//                                 Next: Publish
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Publish Tab - UPDATED WITH THUMBNAIL PREVIEW */}
//                 {click === "Publish" && (
//                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                             Publish Course
//                         </h2>
//                         <p className="text-gray-500 mb-6 mt-2">
//                             Review and publish your course
//                         </p>

//                         <div className='text-center'>
//                             <div className='flex justify-center mb-4'>
//                                 <LiaCheckCircleSolid className='text-7xl text-green-500' />
//                             </div>
//                             <h2 className='p-2 text-2xl font-semibold'>Ready to Publish!</h2>
//                             <p className='p-2 text-gray-500'>Your course is ready to be published and available to students.</p>

//                             {/* Course Preview */}
//                             <div className="mt-6 p-6 bg-gray-50 rounded-lg text-left">
//                                 <h3 className="font-semibold text-lg mb-4 border-b pb-2">Course Preview</h3>
                                
//                                 {/* Thumbnail Preview */}
//                                 {thumbnailPreview && (
//                                     <div className="mb-4">
//                                         <h4 className="font-medium mb-2">Thumbnail:</h4>
//                                         <div className="w-full max-w-md h-48 rounded-lg overflow-hidden border border-gray-300">
//                                             <img 
//                                                 src={thumbnailPreview} 
//                                                 alt="Course thumbnail" 
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                     </div>
//                                 )}
                                
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div>
//                                         <p><strong>Title:</strong> {formData.title || "Not set"}</p>
//                                         <p><strong>Description:</strong> {formData.description ? `${formData.description.substring(0, 80)}...` : "Not set"}</p>
//                                         <p><strong>Category:</strong> {formData.category || "Not set"}</p>
//                                         <p><strong>Level:</strong> {formData.level || "Not set"}</p>
//                                     </div>
//                                     <div>
//                                         <p><strong>Course Type:</strong> {formData.courseCategory || "Not set"}</p>
//                                         <p><strong>Enrollment Limit:</strong> {formData.enrollmentLimit || "Unlimited"}</p>
//                                         <p><strong>Total Chapters:</strong> {formData.chapters.length}</p>
//                                         <p><strong>Total Videos:</strong> {formData.chapters.filter(ch => ch.videoFile).length}</p>
//                                     </div>
//                                 </div>

//                                 {/* Chapters Summary */}
//                                 {formData.chapters.length > 0 && (
//                                     <div className="mt-4">
//                                         <h4 className="font-medium mb-2">Chapters ({formData.chapters.length}):</h4>
//                                         <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
//                                             {formData.chapters.map((chapter, index) => (
//                                                 <div key={chapter.id} className="text-sm bg-white p-3 rounded border hover:bg-gray-50 transition">
//                                                     <p className="font-medium">Chapter {index + 1}: {chapter.chapterName}</p>
//                                                     <div className="flex justify-between text-xs text-gray-500 mt-1">
//                                                         <span>PDFs: {chapter.pdfFiles?.length || 0}</span>
//                                                         <span>{chapter.videoFile ? "✅ Has video" : "❌ No video"}</span>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Navigation Buttons */}
//                             <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-6 border-t border-gray-200">
//                                 <button
//                                     onClick={prevStep}
//                                     className="border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto font-medium"
//                                 >
//                                     Previous
//                                 </button>
//                                 <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                                     <button
//                                         onClick={handleSaveDraft}
//                                         className="border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto font-medium"
//                                     >
//                                         Save as Draft
//                                     </button>
//                                     <button
//                                         onClick={handlePublish}
//                                         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center w-full sm:w-auto transition font-medium"
//                                     >
//                                         <Send size={16} />
//                                         <span>Publish Course</span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }