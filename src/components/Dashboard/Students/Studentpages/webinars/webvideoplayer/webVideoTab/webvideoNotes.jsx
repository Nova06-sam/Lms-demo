import React, { useState } from "react";

export default function WebVideoNotes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    { time: "2:15", text: "useEffect is called after every render by default.", date: "2 days ago" },
    { time: "8:45", text: "Cleanup function prevents memory leaks.", date: "2 days ago" },
  ]);

  const handleSave = () => {
    if (note.trim()) {
      setNotes([{ time: "4:32", text: note, date: "Just now" }, ...notes]);
      setNote("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Lesson Notes</h2>

      {/* Add Note */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full p-3 border rounded-lg mb-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">Auto-saved at 4:32</p>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
        >
          Save Note
        </button>
      </div>

      {/* Previous Notes */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Previous Notes</h3>
        {notes.map((n, index) => (
          <div key={index} className="flex justify-between bg-gray-100 rounded-lg p-3 mb-2">
            <p className="text-sm"><span className="font-semibold">{n.time}</span> — {n.text}</p>
            <p className="text-xs text-gray-400">{n.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
