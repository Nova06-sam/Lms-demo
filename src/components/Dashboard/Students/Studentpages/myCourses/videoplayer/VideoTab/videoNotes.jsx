import React, { useState, useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { FiTrash2, FiImage, FiEdit3, FiCheck, FiX } from "react-icons/fi";
import axios from "axios";
// import { url } from "../../../../../../../config";

export default function VideoNotes({ courseId, lessonId }) {
  // const backend_url = url;
  const user = JSON.parse(localStorage.getItem("user"));

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [isSketchMode, setIsSketchMode] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const canvasRef = useRef(null);

  // 🧩 Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!user?._id || !courseId) return;
        const res = await axios.post(`http://localhost:5000/api/videonotes/fetch`, {
          studentId: user._id,
          courseId,
          lessonId,
        });

        if (res.data.success) setNotes(res.data.data);
      } catch (err) {
        console.error("Error fetching video notes:", err);
      }
    };
    fetchNotes();
  }, [courseId,lessonId]);

  // 📝 Save Text Note
  const handleSaveText = async () => {
    if (!note.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/videonotes`, {
        studentId: user._id,
        courseId,
        lessonId: lessonId || null,
        text: note.trim(),
      });
      if (res.data.success) {
        setNotes([res.data.data, ...notes]);
        setNote("");
      }
    } catch (error) {
      console.error("Error saving text note:", error);
    }
  };

  // 🎨 Save Sketch Note
  const handleSaveSketch = async () => {
    try {
      const imageData = await canvasRef.current.exportImage("png");
      const res = await axios.post(`http://localhost:5000/api/videonotes`, {
        studentId: user._id,
        courseId,
        lessonId: lessonId || null,
        sketch: imageData,
      });
      if (res.data.success) {
        setNotes([res.data.data, ...notes]);
        canvasRef.current.clearCanvas();
        setIsSketchMode(false);
      }
    } catch (error) {
      console.error("Error saving sketch:", error);
    }
  };

  // 🗑️ Delete Note
  const handleDeleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/videonotes/${id}`);
      if (res.data.success) {
        setNotes(notes.filter((n) => n._id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ✏️ Start Editing
  const startEditing = (note) => {
    setEditingNoteId(note._id);
    setEditedText(note.text);
  };

  // ❌ Cancel Editing
  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditedText("");
  };

  // 💾 Save Edited Note
  const saveEdit = async (id) => {
    if (!editedText.trim()) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/videonotes/${id}`, { text: editedText });
      if (res.data.success) {
        setNotes(notes.map((n) => (n._id === id ? res.data.data : n)));
        setEditingNoteId(null);
        setEditedText("");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lesson Notes</h2>
        <button
          onClick={() => setIsSketchMode(!isSketchMode)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
        >
          <FiImage />
          {isSketchMode ? "Text Mode" : "Sketch Mode"}
        </button>
      </div>

      {/* 🎨 Sketch Mode */}
      {isSketchMode ? (
        <div>
          <ReactSketchCanvas
            ref={canvasRef}
            width="100%"
            height="300px"
            strokeWidth={3}
            strokeColor="black"
            className="border rounded-lg mb-3"
          />
          <div className="flex justify-between">
            <button
              onClick={() => canvasRef.current.clearCanvas()}
              className="text-sm border border-gray-400 rounded-lg px-3 py-1 text-gray-700 hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={handleSaveSketch}
              className="text-sm bg-green-600 text-white rounded-lg px-4 py-1 hover:bg-green-700"
            >
              Save Sketch
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ✍️ Text Mode */}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your notes here..."
            className="w-full p-3 border rounded-lg mb-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">Your notes are stored securely</p>
            <button
              onClick={handleSaveText}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              Save Note
            </button>
          </div>
        </>
      )}

      {/* 🧾 Display All Notes */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">My Notes</h3>
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm">No notes yet for this course.</p>
        ) : (
          notes.map((n) => (
            <div
              key={n._id}
              className="bg-gray-100 rounded-lg p-3 mb-3 flex justify-between items-start"
            >
              <div className="flex-1 mr-3">
                {n.sketch ? (
                  <img src={n.sketch} alt="Sketch" className="rounded-lg border mb-2 w-full" />
                ) : editingNoteId === n._id ? (
                  <>
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full border rounded-lg p-2 mb-2 text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(n._id)}
                        className="flex items-center gap-1 text-green-600 border border-green-500 px-3 py-1 rounded-lg text-sm hover:bg-green-50"
                      >
                        <FiCheck /> Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="flex items-center gap-1 text-gray-600 border border-gray-400 px-3 py-1 rounded-lg text-sm hover:bg-gray-50"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm mb-2">{n.text}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 items-center">
                {!n.sketch && editingNoteId !== n._id && (
                  <button
                    onClick={() => startEditing(n)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FiEdit3 />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNote(n._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
