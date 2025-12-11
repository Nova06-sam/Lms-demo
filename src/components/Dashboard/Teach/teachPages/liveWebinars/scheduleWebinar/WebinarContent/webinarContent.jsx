// // webinarContent.jsx
// import React, { useState, useEffect } from "react";
// import { FiPlus, FiTrash2 } from "react-icons/fi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Content({ formData, setFormData, nextStep, prevStep }) {
//   // Initialize local agenda from parent if available, else single empty row
//   const [agenda, setAgenda] = useState(
//     Array.isArray(formData.agenda) && formData.agenda.length > 0
//       ? 
//         formData.agenda.map((it) => ({
//           date:
//             typeof it.date === "string" && it.date.includes("-") ? it.date : it.date || "",
//           topic: it.topic || ""
//         }))
//       : [{ date: "", topic: "" }]
//   );

//   // keep parent in sync if parent changes (e.g., when editing)
//   useEffect(() => {
//     if (Array.isArray(formData.agenda) && formData.agenda.length > 0) {
//       setAgenda(
//         formData.agenda.map((it) => ({
//           date: it.date || "",
//           topic: it.topic || ""
//         }))
//       );
//     }
//   }, [formData.agenda]);

//   const handleAgendaChange = (i, field, value) => {
//     const updated = [...agenda];
//     updated[i][field] = value;
//     setAgenda(updated);
//   };

//   const addItem = () => {
//     setAgenda([...agenda, { date: "", topic: "" }]);
//   };

//   const removeItem = (i) => {
//     const updated = agenda.filter((_, idx) => idx !== i);
//     setAgenda(updated.length ? updated : [{ date: "", topic: "" }]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // New validation: date + topic required
//     const emptyAgenda = agenda.some((a) => !a.date || !a.topic);
//     if (emptyAgenda) {
//       return toast.error("Please complete all agenda fields!");
//     }

//     // Normalize agenda to match backend schema: { date: "YYYY-MM-DD", topic: "..." }
//     const normalized = agenda.map((a) => ({
//       date: a.date, // date input already gives YYYY-MM-DD
//       topic: a.topic
//     }));

//     // Save to parent state (this is the crucial fix)
//     setFormData((prev) => ({ ...prev, agenda: normalized }));

//     toast.success("✅ Content saved!");
//     setTimeout(() => nextStep(), 500);
//   };

//   return (
//     <div className="grid md:grid-cols-3 gap-8">
//       {/* Left: Form */}
//       <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
//         <h3 className="text-xl font-semibold mb-2">Content & Agenda</h3>
//         <p className="text-lg text-gray-500 mb-6">Structure your webinar content</p>

//         {/* Agenda Section */}
//         <div className="mb-6">
//           <h4 className="font-medium mb-2">Session Agenda</h4>

//           {agenda.map((item, i) => (
//             <div key={i} className="flex flex-col sm:flex-row gap-3 mb-3">
//               <input
//                 type="date"
//                 value={item.date}
//                 onChange={(e) => handleAgendaChange(i, "date", e.target.value)}
//                 className="border border-gray-300 rounded-lg p-2 flex-1"
//               />

//               <input
//                 value={item.topic}
//                 onChange={(e) => handleAgendaChange(i, "topic", e.target.value)}
//                 placeholder="Topic/Activity"
//                 className="border border-gray-300 rounded-lg p-2 flex-1"
//               />

//               <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-700">
//                 <FiTrash2 />
//               </button>
//             </div>
//           ))}

//           <button type="button" onClick={addItem} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
//             <FiPlus /> Add Item
//           </button>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-green-500 hover:text-white"
//           >
//             Previous
//           </button>
//           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             Next: Settings
//           </button>
//         </div>

//         <ToastContainer position="bottom-right" autoClose={2000} />
//       </form>

//       {/* Right: Tips & Checklist (unchanged) */}
//       <div className="space-y-6">
//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <h4 className="font-semibold mb-3">Quick Tips</h4>
//           <ul className="text-sm text-gray-600 space-y-2">
//             <li>
//               <strong>Title:</strong> Keep it short and clear.
//             </li>
//             <li>
//               <strong>Timing:</strong> 1–2 hours is ideal for engagement.
//             </li>
//             <li>
//               <strong>Capacity:</strong> Start small for better interaction.
//             </li>
//           </ul>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <h4 className="font-semibold mb-3">Webinar Checklist</h4>
//           <ul className="text-sm text-gray-600 space-y-2">
//             {[
//               "Title and description complete",
//               "Date and time scheduled",
//               "Agenda prepared",
//               "Materials ready",
//               "Test equipment"
//             ].map((item, i) => (
//               <li key={i} className="flex items-center gap-2">
//                 <input type="checkbox" className="w-3 h-3 bg-gray-300 rounded-sm" />
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }




// webinarContent.jsx
import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Content({ formData, setFormData, nextStep, prevStep }) {
  // Initialize local agenda from parent if available, else single empty row
  const [agenda, setAgenda] = useState(
    Array.isArray(formData.agenda) && formData.agenda.length > 0
      ? 
        formData.agenda.map((it) => ({
          date:
            typeof it.date === "string" && it.date.includes("-") ? it.date : it.date || "",
          topic: it.topic || ""
        }))
      : [{ date: "", topic: "" }]
  );

  // Sync with parent when it changes externally
  useEffect(() => {
    if (Array.isArray(formData.agenda) && formData.agenda.length > 0) {
      setAgenda(
        formData.agenda.map((it) => ({
          date: it.date || "",
          topic: it.topic || ""
        }))
      );
    }
  }, [formData.agenda]);

  const handleAgendaChange = (i, field, value) => {
    const updated = [...agenda];
    updated[i][field] = value;
    setAgenda(updated);
  };

  const addItem = () => {
    setAgenda([...agenda, { date: "", topic: "" }]);
  };

  const removeItem = (i) => {
    const updated = agenda.filter((_, idx) => idx !== i);
    setAgenda(updated.length ? updated : [{ date: "", topic: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // New validation: date + topic required
    const emptyAgenda = agenda.some((a) => !a.date || !a.topic);
    if (emptyAgenda) {
      toast.error("Please complete all agenda fields!");
      return;
    }

    // Normalize agenda to match backend schema
    const normalized = agenda.map((a) => ({
      date: a.date, // date input already gives YYYY-MM-DD
      topic: a.topic
    }));

    try {
      // Save to parent state with a Promise to ensure state is updated
      await new Promise((resolve) => {
        setFormData((prev) => {
          const newData = { ...prev, agenda: normalized };
          resolve(newData);
          return newData;
        });
      });

      toast.success("✅ Content saved!");
      setTimeout(() => nextStep(), 500);
    } catch (error) {
      toast.error("Failed to save content");
      console.error(error);
    }
  };

  // Alternative: Save to parent state immediately on changes
  useEffect(() => {
    // Only save if agenda has actual content (not just the initial empty row)
    const hasContent = agenda.some(item => item.date || item.topic);
    if (hasContent) {
      const normalized = agenda.map((a) => ({
        date: a.date,
        topic: a.topic
      }));
      
      // Debounce to prevent too many updates
      const timeoutId = setTimeout(() => {
        setFormData((prev) => ({ ...prev, agenda: normalized }));
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [agenda, setFormData]);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Left: Form */}
      <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Content & Agenda</h3>
        <p className="text-lg text-gray-500 mb-6">Structure your webinar content</p>

        {/* Agenda Section */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Session Agenda</h4>

          {agenda.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="date"
                value={item.date}
                onChange={(e) => handleAgendaChange(i, "date", e.target.value)}
                className="border border-gray-300 rounded-lg p-2 flex-1"
              />

              <input
                value={item.topic}
                onChange={(e) => handleAgendaChange(i, "topic", e.target.value)}
                placeholder="Topic/Activity"
                className="border border-gray-300 rounded-lg p-2 flex-1"
              />

              <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-700">
                <FiTrash2 />
              </button>
            </div>
          ))}

          <button type="button" onClick={addItem} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <FiPlus /> Add Item
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-green-500 hover:text-white"
          >
            Previous
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Next: Settings
          </button>
        </div>

        <ToastContainer position="bottom-right" autoClose={2000} />
      </form>

      {/* Right: Tips & Checklist (unchanged) */}
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
              "Test equipment"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <input type="checkbox" className="w-3 h-3 bg-gray-300 rounded-sm" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}