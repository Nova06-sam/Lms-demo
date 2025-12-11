import React, { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

export default function Settings({ formData, setFormData, nextStep, prevStep }) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: formData,
  });

  const watchRecordSession = watch("recordSession");
  const watchEnableQA = watch("enableQA");

  const onSubmit = async (data) => {
    try {
      // Simulate async save
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData((prev) => ({ ...prev, ...data }));
      toast.success("✅ Webinar settings saved successfully!");
      nextStep();
    } catch (error) {
      toast.error("❌ Failed to save settings");
    }
  };


  return (
    <div>
      {/* Toast Container - ADD THIS */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="grid md:grid-cols-3 gap-8">

        {/* Left: Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm  space-y-6 transition-all duration-300"
        >
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Webinar Settings</h2>
            <p className="text-gray-500 text-sm mt-1">
              Configure your webinar preferences & participant options
            </p>
          </div>

          {/* Record Session */}
          <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex-1">
              <p className="font-medium text-gray-800">Record Session</p>
              <p className="text-sm text-gray-500 mt-1">
                {watchRecordSession
                  ? "Participants can view recording after the live session."
                  : "Recording will not be saved."}
              </p>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("recordSession")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Registration Settings */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Registration Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  {...register("confirmationEmail", { required: true })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                />
                <div>
                  <span className="font-medium text-gray-800">
                    Send confirmation email
                  </span>
                  <p className="text-sm text-gray-500">
                    Automatically confirm registrations
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  {...register("reminder24")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                />
                <div>
                  <span className="font-medium text-gray-800">
                    Send 24-hour reminder
                  </span>
                  <p className="text-sm text-gray-500">
                    Notifies users a day before the session
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  {...register("reminder15")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                />
                <div>
                  <span className="font-medium text-gray-800">
                    Send 15-minute reminder
                  </span>
                  <p className="text-sm text-gray-500">
                    Sends a short reminder before start
                  </p>
                </div>
              </label>
            </div>
            {errors.confirmationEmail && (
              <p className="text-sm text-red-500 mt-2 bg-red-50 p-2 rounded">
                ⚠️ Please enable confirmation email.
              </p>
            )}
          </div>

          {/* Interaction Settings */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Interaction Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  {...register("enableQA")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                />
                <div>
                  <span className="font-medium text-gray-800">Enable Q&A</span>
                  <p className="text-sm text-gray-500">
                    {watchEnableQA
                      ? "Participants can ask live questions."
                      : "Q&A will be disabled."}
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  {...register("enableChat")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                />
                <div>
                  <span className="font-medium text-gray-800">Enable Chat</span>
                  <p className="text-sm text-gray-500">
                    Allow attendees to chat during the webinar
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  {...register("enablePolls")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                />
                <div>
                  <span className="font-medium text-gray-800">Enable Polls</span>
                  <p className="text-sm text-gray-500">
                    Add interactive polls to increase engagement
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              ← Previous
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Next: Preview →"
              )}
            </button>
          </div>
        </form>

        {/* Right: Quick Tips & Checklist */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h4 className="font-semibold mb-3">Quick Tips</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <strong>Title:</strong> Keep it short and clear.
              </li>
              <li>
                <strong>Timing:</strong> 1–2 hours is ideal for engagement.
              </li>
              <li>
                <strong>Capacity:</strong> Start small for better interaction.
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h4 className="font-semibold mb-3">Webinar Checklist</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {[
                "Title and description complete",
                "Date and time scheduled",
                "Agenda prepared",
                "Materials ready",
                "Test equipment",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3 bg-gray-300 rounded-sm"></input>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
