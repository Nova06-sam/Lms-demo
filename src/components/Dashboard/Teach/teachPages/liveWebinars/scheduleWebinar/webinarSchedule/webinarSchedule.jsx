// // webinarSchedule.jsx (Schedule component)
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Schedule({ formData, setFormData, nextStep, prevStep }) {
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         // This uses the functional setter pattern — requires the real setFormData from parent.
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };
//     console.log(formData)
//     const validateForm = () => {
//         const newErrors = {};

//         // Required field check (updated field names)
//         [
//             "startDate",
//             "endDate",
//             "startTime",
//             "endTime",
//             "duration",
//             "timezone",
//             "maxParticipants",
//             "registrationDeadline",
//         ].forEach((field) => {
//             if (!formData[field] || String(formData[field]).trim() === "") {
//                 newErrors[field] = "Required";
//             }
//         });

//         // Date range validation: startDate <= endDate
//         if (formData.startDate && formData.endDate) {
//             const s = new Date(formData.startDate);
//             const e = new Date(formData.endDate);
//             if (s > e) {
//                 newErrors.endDate = "End date must be the same or after start date";
//             }
//         }

//         // Time range validation: if same day, startTime < endTime
//         if (
//             formData.startDate &&
//             formData.endDate &&
//             formData.startTime &&
//             formData.endTime &&
//             formData.startDate === formData.endDate
//         ) {
//             // convert "HH:MM" to minutes for comparison
//             const timeToMinutes = (t) => {
//                 const [hh, mm] = t.split(":").map(Number);
//                 return hh * 60 + mm;
//             };
//             const st = timeToMinutes(formData.startTime);
//             const et = timeToMinutes(formData.endTime);
//             if (st >= et) {
//                 newErrors.endTime = "End time must be after start time for the same day";
//             }
//         }

//         // Registration deadline validation: cannot be after the webinar end date
//         if (
//             formData.endDate &&
//             formData.registrationDeadline &&
//             new Date(formData.registrationDeadline) > new Date(formData.endDate)
//         ) {
//             newErrors.registrationDeadline = "Deadline cannot be after the webinar end date";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const valid = validateForm();

//         if (valid) {
//             toast.success("✅ Schedule saved successfully!");
//             setTimeout(() => nextStep(), 800);
//         } else {
//             toast.error("⚠️ Please fill all required fields correctly!");
//         }
//     };
//     return (
//         <div className="grid md:grid-cols-3 gap-8">
//             {/* Left: Form */}
//             <form
//                 onSubmit={handleSubmit}
//                 className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm"
//             >
//                 <h3 className="text-xl font-semibold mb-2">Schedule & Timing</h3>
//                 <p className="text-lg text-gray-500 mb-6">
//                     When will your webinar take place?
//                 </p>

//                 <div className="flex flex-col gap-5">
//                     {/* Start & End Date */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">Start Date *</label>
//                             <input
//                                 name="startDate"
//                                 type="date"
//                                 value={formData.startDate || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.startDate ? "border-red-500" : "border-gray-300"
//                                     } rounded-lg px-4 py-2`}
//                             />
//                             {errors.startDate && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-1">End Date *</label>
//                             <input
//                                 name="endDate"
//                                 type="date"
//                                 value={formData.endDate || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.endDate ? "border-red-500" : "border-gray-300"
//                                     } rounded-lg px-4 py-2`}
//                             />
//                             {errors.endDate && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Start & End Time */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">Start Time *</label>
//                             <input
//                                 name="startTime"
//                                 type="time"  
//                                 value={formData.startTime || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.startTime ? "border-red-500" : "border-gray-300"
//                                     } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
//                             />
//                             {errors.startTime && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-1">End Time *</label>
//                             <input
//                                 name="endTime"
//                                 type="time"
//                                 value={formData.endTime || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.endTime ? "border-red-500" : "border-gray-300"
//                                     } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
//                             />
//                             {errors.endTime && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Duration & Timezone */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Duration (hours) *
//                             </label>
//                             <select
//                                 name="duration"
//                                 value={formData.duration || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.duration
//                                     ? "border-red-500"
//                                     : "border-gray-300"
//                                     } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
//                             >
//                                 <option value="30 minutes">30 minutes</option>
//                                 <option value="1 hour">1 hour</option>
//                                 <option value="1.5 hour">1.5 hour</option>
//                                 <option value="2 hour">2 hour</option>
//                                 <option value="3 hour">3 hour</option>
//                             </select>
//                             {errors.duration && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.duration}
//                                 </p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-1">Timezone *</label>
//                             <select
//                                 name="timezone"
//                                 value={formData.timezone || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.duration
//                                     ? "border-red-500"
//                                     : "border-gray-300"
//                                     } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
//                             >
//                                 <option value="">Eastern Time(EST)</option>
//                                 <option value="Centerl Time">Centerl Time(CST)</option>
//                                 <option value="Mountain Time">Mountain Time(MST)</option>
//                                 <option value="Pacific Time">Pacific Time(PST)</option>
//                                 <option value="Indian Standard Time">Indian Standard Time (IST)</option>
//                                 <option value="UTC">UTC</option>
//                             </select>
//                             {errors.timezone && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.timezone}</p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Max Participants & Deadline */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Max Participants *
//                             </label>
//                             <input
//                                 name="maxParticipants"
//                                 type="number"
//                                 value={formData.maxParticipants || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.maxParticipants ? "border-red-500" : "border-gray-300"
//                                     } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
//                             />
//                             {errors.maxParticipants && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.maxParticipants}
//                                 </p>
//                             )}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Registration Deadline *
//                             </label>
//                             <input
//                                 name="registrationDeadline"
//                                 type="date"
//                                 value={formData.registrationDeadline || ""}
//                                 onChange={handleChange}
//                                 className={`w-full border ${errors.registrationDeadline
//                                     ? "border-red-500"
//                                     : "border-gray-300"
//                                     } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
//                             />
//                             {errors.registrationDeadline && (
//                                 <p className="text-red-500 text-sm mt-1">
//                                     {errors.registrationDeadline}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-between mt-6">
//                         <button
//                             type="button"
//                             onClick={prevStep}
//                             className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-green-500 hover:text-white"
//                         >
//                             Previous
//                         </button>
//                         <button
//                             type="submit"
//                             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//                         >
//                             Next: Content
//                         </button>
//                     </div>
//                 </div>
//             </form>

//             {/* Right: Quick Tips */}
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
//                                 <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
//                                 {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }


// webinarSchedule.jsx (Schedule component)
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Schedule({ formData, setFormData, nextStep, prevStep }) {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Required field check
        [
            "startDate",
            "endDate",
            "startTime",
            "endTime",
            "duration",
            "timezone",
            "maxParticipants",
            "registrationDeadline",
        ].forEach((field) => {
            if (!formData[field] || String(formData[field]).trim() === "") {
                newErrors[field] = "Required";
            }
        });

        // Date range validation
        if (formData.startDate && formData.endDate) {
            const s = new Date(formData.startDate);
            const e = new Date(formData.endDate);
            if (s > e) {
                newErrors.endDate = "End date must be the same or after start date";
            }
        }

        // Time range validation
        if (
            formData.startDate &&
            formData.endDate &&
            formData.startTime &&
            formData.endTime &&
            formData.startDate === formData.endDate
        ) {
            const timeToMinutes = (t) => {
                const [hh, mm] = t.split(":").map(Number);
                return hh * 60 + mm;
            };
            const st = timeToMinutes(formData.startTime);
            const et = timeToMinutes(formData.endTime);
            if (st >= et) {
                newErrors.endTime = "End time must be after start time for the same day";
            }
        }

        // Registration deadline validation
        if (
            formData.endDate &&
            formData.registrationDeadline &&
            new Date(formData.registrationDeadline) > new Date(formData.endDate)
        ) {
            newErrors.registrationDeadline = "Deadline cannot be after the webinar end date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const valid = validateForm();

        if (valid) {
            // Show success toast with webinar details
            toast.success(
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">✅ Webinar Scheduled Successfully!</span>
                    <span className="text-sm mt-1">
                        <strong>When:</strong> {new Date(formData.startDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })} at {formData.startTime}
                    </span>
                    <span className="text-sm">
                        <strong>Duration:</strong> {formData.duration}
                    </span>
                    <span className="text-sm">
                        <strong>Max Participants:</strong> {formData.maxParticipants}
                    </span>
                </div>,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                }
            );
            
            // Move to next step after a short delay
            setTimeout(() => nextStep(), 800);
        } else {
            // Show error toast
            toast.error(
                <div className="flex flex-col">
                    <span className="font-semibold">⚠️ Please Complete All Required Fields</span>
                    <span className="text-sm">Check the highlighted fields above</span>
                </div>,
                {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    theme: "colored",
                }
            );
        }
    };

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Form */}
            <form
                onSubmit={handleSubmit}
                className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm"
            >
                <h3 className="text-xl font-semibold mb-2">Schedule & Timing</h3>
                <p className="text-lg text-gray-500 mb-6">
                    When will your webinar take place?
                </p>

                <div className="flex flex-col gap-5">
                    {/* Start & End Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date *</label>
                            <input
                                name="startDate"
                                type="date"
                                value={formData.startDate || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.startDate ? "border-red-500" : "border-gray-300"
                                    } rounded-lg px-4 py-2`}
                            />
                            {errors.startDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">End Date *</label>
                            <input
                                name="endDate"
                                type="date"
                                value={formData.endDate || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.endDate ? "border-red-500" : "border-gray-300"
                                    } rounded-lg px-4 py-2`}
                            />
                            {errors.endDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                            )}
                        </div>
                    </div>

                    {/* Start & End Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Time *</label>
                            <input
                                name="startTime"
                                type="time"  
                                value={formData.startTime || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.startTime ? "border-red-500" : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">End Time *</label>
                            <input
                                name="endTime"
                                type="time"
                                value={formData.endTime || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.endTime ? "border-red-500" : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
                            />
                            {errors.endTime && (
                                <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
                            )}
                        </div>
                    </div>

                    {/* Duration & Timezone */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Duration (hours) *
                            </label>
                            <select
                                name="duration"
                                value={formData.duration || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.duration
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
                            >
                                <option value="30 minutes">30 minutes</option>
                                <option value="1 hour">1 hour</option>
                                <option value="1.5 hour">1.5 hour</option>
                                <option value="2 hour">2 hour</option>
                                <option value="3 hour">3 hour</option>
                            </select>
                            {errors.duration && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.duration}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Timezone *</label>
                            <select
                                name="timezone"
                                value={formData.timezone || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.timezone
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
                            >
                                <option value="">Select Timezone</option>
                                <option value="Eastern Time (EST)">Eastern Time (EST)</option>
                                <option value="Central Time (CST)">Central Time (CST)</option>
                                <option value="Mountain Time (MST)">Mountain Time (MST)</option>
                                <option value="Pacific Time (PST)">Pacific Time (PST)</option>
                                <option value="Indian Standard Time (IST)">Indian Standard Time (IST)</option>
                                <option value="UTC">UTC</option>
                            </select>
                            {errors.timezone && (
                                <p className="text-red-500 text-sm mt-1">{errors.timezone}</p>
                            )}
                        </div>
                    </div>

                    {/* Max Participants & Deadline */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Max Participants *
                            </label>
                            <input
                                name="maxParticipants"
                                type="number"
                                min="1"
                                value={formData.maxParticipants || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.maxParticipants ? "border-red-500" : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
                            />
                            {errors.maxParticipants && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.maxParticipants}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Registration Deadline *
                            </label>
                            <input
                                name="registrationDeadline"
                                type="date"
                                value={formData.registrationDeadline || ""}
                                onChange={handleChange}
                                className={`w-full border ${errors.registrationDeadline
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
                            />
                            {errors.registrationDeadline && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.registrationDeadline}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
                        >
                            ← Previous
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                        >
                            Save Schedule & Continue
                            <span className="text-lg">→</span>
                        </button>
                    </div>
                </div>
            </form>

            {/* Right: Quick Tips */}
            <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-semibold mb-3">Quick Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li>
                            <strong>Timing:</strong> Schedule at least 1 week in advance.
                        </li>
                        <li>
                            <strong>Duration:</strong> 1–2 hours is ideal for engagement.
                        </li>
                        <li>
                            <strong>Timezone:</strong> Choose based on your target audience.
                        </li>
                        <li>
                            <strong>Capacity:</strong> Start small for better interaction.
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-semibold mb-3">Schedule Preview</h4>
                    <div className="text-sm space-y-2">
                        {formData.startDate && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">
                                    {new Date(formData.startDate).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                        {formData.startTime && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-medium">{formData.startTime}</span>
                            </div>
                        )}
                        {formData.duration && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-medium">{formData.duration}</span>
                            </div>
                        )}
                        {formData.timezone && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Timezone:</span>
                                <span className="font-medium">{formData.timezone}</span>
                            </div>
                        )}
                        {formData.maxParticipants && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Max Participants:</span>
                                <span className="font-medium">{formData.maxParticipants}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
                    <h4 className="font-semibold text-blue-800 mb-2">✅ Ready to Proceed?</h4>
                    <p className="text-sm text-blue-700">
                        Once you complete this schedule, you'll move on to adding content and materials for your webinar.
                    </p>
                </div>
            </div>
        </div>
    );
}