// ScheduleWebinar.jsx (parent)
import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";

import BasicInfo from "./basicinfo/basicinfo";
import Content from "./WebinarContent/webinarContent";
import PreviewPublish from "./webinarPreview/webinarPreview";
import Schedule from "./webinarSchedule/webinarSchedule";
import Settings from "./webinarSettings/webinarSettings";
import BackToDashboard from "../../../../../common/backDashboard/BackDashboard";
// import BACKEND_URL from "../../../../../../api/Api";

export default function ScheduleWebinar() {
  const { id } = useParams(); // ✅ FIXED — now id exists

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    tags: "",
    thumbnail: null,

    // Schedule
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    duration: "",
    maxParticipants: "",
    timezone: "UTC",
    registrationDeadline: "",

    // Content
    agenda: [],

    // Settings
    recordSession: true,
    confirmationEmail: true,
    reminder24: true,
    reminder15: true,
    enableQA: true,
    enableChat: true,
    enablePolls: false,
  });

  // useEffect(() => {
  //     if (id) {
  //         // Fetch webinar details
  //         axios.get(`http://localhost:5000/api/webinar/${id}`)
  //             .then((res) => {
  //                 const data = res.data.data;

  //                 // Put backend data inside formData
  //                 setFormData(prev => ({
  //                     ...prev,
  //                     title: data.title || "",
  //                     description: data.description || "",
  //                     category: data.category || "",
  //                     level: data.level || "Beginner",
  //                     tags: Array.isArray(data.tags)
  //     ? data.tags.join(", ")
  //     : data.tags || "",
  //                     thumbnail: data.thumbnail || null,

  //                     date: data.date || "",
  //                     time: data.time || "",
  //                     duration: data.duration || "",
  //                     maxParticipants: data.maxParticipants || "",
  //                     timezone: data.timezone || "UTC",
  //                     registrationDeadline:data.registrationDeadline ||"",

  //                     presentationFile: null,
  //                     videoUrl: data.videoUrl || "",
  //                     resources: data.resources || [],
  //                     agenda: Array.isArray(data.agenda) ? data.agenda : [],


  //                     recordSession: data.recordSession ?? true,
  //                     confirmationEmail: data.confirmationEmail ?? true,
  //                     reminder24: data.reminder24 ?? true,
  //                     reminder15: data.reminder15 ?? true,
  //                     enableQA: data.enableQA ?? true,
  //                     enableChat: data.enableChat ?? true,
  //                     enablePolls: data.enablePolls ?? false,
  //                 }));

  //                 toast.success("Form prefilled for editing!");
  //             })
  //             .catch(err => {
  //                 console.log(err);
  //                 toast.error("Failed to load webinar data");
  //             });
  //     }
  // }, [id]);

  useEffect(() => {
    console.log("🔄 useEffect triggered with id:", id);

    if (id && id !== "undefined") {
      console.log("📡 Fetching webinar data for ID:", id);

      axios.get(`http://localhost:5000/api/webinar/${id}`)
        .then((res) => {
        console.log("✅ Webinar data received:", res.data);
        const data = res.data.data || res.data; // Handle both response formats

        if (!data) {
          toast.error("No webinar data found");
          return;
        }

        // Handle agenda: ensure it's an array
        let agendaData = [];
        if (data.agenda && Array.isArray(data.agenda)) {
          agendaData = data.agenda;
        } else if (data.webinarSchedule?.sessions) {
          // Extract topics from sessions
          agendaData = data.webinarSchedule.sessions.map(session => ({
            date: session.date,
            topic: session.topic || ""
          }));
        }

        // Handle tags: convert array to comma-separated string
        let tagsString = "";
        if (Array.isArray(data.tags)) {
          tagsString = data.tags.join(", ");
        } else if (typeof data.tags === 'string') {
          tagsString = data.tags;
        }

        // Get schedule data
        const schedule = data.webinarSchedule || {};

        setFormData(prev => ({
          ...prev,
          // Basic Info
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          level: data.level || "Beginner",
          tags: tagsString,
          thumbnail: data.thumbnail || null,

          // Schedule - Use webinarSchedule data first, fall back to direct fields
          startDate: schedule.startDate || data.startDate || data.date || "",
          endDate: schedule.endDate || data.endDate || "",
          startTime: schedule.startTime || data.startTime || data.time || "",
          endTime: schedule.endTime || data.endTime || "",
          duration: data.duration || "1 hour",
          maxParticipants: data.maxParticipants || data.limit || "100",
          timezone: data.timezone || "UTC",
          registrationDeadline: data.registrationDeadline || "",

          // Content
          videoUrl: data.videoUrl || "",
          resources: data.resources || [],
          agenda: agendaData,

          // Settings
          recordSession: data.recordSession ?? true,
          confirmationEmail: data.confirmationEmail ?? true,
          reminder24: data.reminder24 ?? true,
          reminder15: data.reminder15 ?? true,
          enableQA: data.enableQA ?? true,
          enableChat: data.enableChat ?? true,
          enablePolls: data.enablePolls ?? false,
        }));

        console.log("✅ Form data updated for editing");
        toast.success("Webinar data loaded for editing!");
      })
          .catch(err => {
            console.error("❌ Error loading webinar:", err.response?.data || err.message);
            toast.error(`Failed to load webinar: ${ err.response?.data?.message || err.message }`);
          });
    } else {
      console.log("🆕 Creating new webinar (no id provided)");
      // Reset form for new webinar
      setFormData({
        title: "",
        description: "",
        category: "",
        level: "Beginner",
        tags: "",
        thumbnail: null,
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        duration: "",
        maxParticipants: "",
        timezone: "UTC",
        registrationDeadline: "",
        agenda: [],
        recordSession: true,
        confirmationEmail: true,
        reminder24: true,
        reminder15: true,
        enableQA: true,
        enableChat: true,
        enablePolls: false,
      });
    }
  }, [id]); // ✅ Only re-run when id changes


  const totalSteps = 5;

  // --- Validation Functions ---
  const validateBasicInfo = () => {
    let errors = [];
    if (!formData.title.trim()) errors.push("Title is required.");
    if (!formData.description.trim()) errors.push("Description is required.");
    if (!formData.category.trim()) errors.push("Category is required.");
    if (!formData.tags.trim()) errors.push("Tags is required.");
    if (!formData.thumbnail) errors.push("Thumbnail is required.");

    if (errors.length > 0) {
      toast.error(errors.join("\n"), { position: "top-center", autoClose: 3000 });
      return false;
    }
    toast.success("Basic Info validated successfully!");
    return true;
  };

  const validateSchedule = () => {
    let errors = [];

    // required checks for the new fields
    if (!formData.startDate) errors.push("Start date is required.");
    if (!formData.startTime) errors.push("Start time is required.");
    if (!formData.endDate) errors.push("End date is required.");
    if (!formData.endTime) errors.push("End time is required.");
    if (!formData.duration) errors.push("Duration is required.");
    if (!formData.maxParticipants) errors.push("Max participants required.");
    if (!formData.registrationDeadline) errors.push("Registration deadline is required.");

    // date range validation
    if (formData.startDate && formData.endDate) {
      const s = new Date(formData.startDate);
      const e = new Date(formData.endDate);
      if (s > e) errors.push("End date must be the same or after start date.");
    }

    // if same day, ensure startTime < endTime
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startTime &&
      formData.endTime &&
      formData.startDate === formData.endDate
    ) {
      const toMinutes = (t) => {
        const [hh = 0, mm = 0] = String(t).split(":").map(Number);
        return hh * 60 + mm;
      };
      if (toMinutes(formData.startTime) >= toMinutes(formData.endTime)) {
        errors.push("For the same day, end time must be after start time.");
      }
    }

    // registration deadline should not be after endDate
    if (formData.registrationDeadline && formData.endDate) {
      if (new Date(formData.registrationDeadline) > new Date(formData.endDate)) {
        errors.push("Registration deadline cannot be after the webinar end date.");
      }
    }

    if (errors.length > 0) {
      toast.error(errors.join("\n"), { position: "top-center", autoClose: 3000 });
      return false;
    }
    toast.success("Schedule validated successfully!");
    return true;
  };

  const validateContent = () => {
    let errors = [];
    // If you want to require at least one agenda item stored in parent state:
    if (!formData.agenda || formData.agenda.length === 0) errors.push("Agenda is required.");

    if (errors.length > 0) {
      toast.error(errors.join("\n"), { position: "top-center", autoClose: 3000 });
      return false;
    }
    toast.success("Content validated successfully!");
    return true;
  };

  const validateSettings = () => {
    let errors = [];
    // no required settings for now
    if (errors.length > 0) {
      toast.error(errors.join("\n"), { position: "top-center", autoClose: 3000 });
      return false;
    }
    toast.success("Settings validated successfully!");
    return true;
  };

  // --- Step Change Logic ---
  const nextStep = () => {
    let valid = true;
    if (step === 1) valid = validateBasicInfo();
    if (step === 2) valid = validateSchedule();
    if (step === 3) valid = validateContent();
    if (step === 4) valid = validateSettings();

    if (valid && step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Update form data function (kept for convenience)
  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const steps = ["BasicInfo", "Schedule", "Content", "Settings", "Preview"];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <BackToDashboard/>
      {/* <div className="h-15 border-b-1 border-gray-300 shadow-md fixed flex justify-between p-3 w-full backdrop-blur top-0 ">
        <button className="ml-10 text-xl">Back to Dashboard</button>
        <div className="mr-10 flex gap-5">
          <button className="border-1 border-gray-200 w-40 rounded-xl hover:bg-green-500 hover:text-white">
            Save Draft
          </button>
          <button className="bg-blue-500 text-white w-40 rounded-xl hover:bg-blue-400">
            Preview
          </button>
        </div>
      </div> */}

      <div className="p-20">
        <div className="p-5">
          <h1 className="text-4xl font-semibold">Schedule New Webinar</h1>
          <p className="text-gray-500 pt-3">Create an engaging live session for your students</p>
        </div>

        <div className="flex justify-between gap-5 mb-8 bg-gray-50 rounded-full p-2">
          {steps.map((s, index) => (
            <button
              key={s}
              onClick={() => setStep(index + 1)}
              className={`w-50 p-2 rounded-full text-sm font-medium transition ${step === index + 1
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white hover:bg-gray-100"
                }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {step === 1 && (
            <BasicInfo
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 2 && (
            <Schedule
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 3 && (
            <Content
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 4 && (
            <Settings
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 5 && (
            <PreviewPublish
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
