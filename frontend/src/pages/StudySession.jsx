import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudySession() {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [focus, setFocus] = useState("");
  const [distractions, setDistractions] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const session = {
        email: user.email,
        subject: subject.trim(),
        duration: Number(duration),
        focus: Number(focus),
        distractions: Number(distractions),
        notes,
        date: new Date().toISOString(),
      };

      await API.post("/sessions", session);

      alert("Study Session Saved!");

      setSubject("");
      setDuration("");
      setFocus("");
      setDistractions("");
      setNotes("");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to save session");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h2 className="text-3xl font-bold mb-6">
          Study Session Tracker
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Duration (Hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Focus Level (1-10)"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Distractions"
            value={distractions}
            onChange={(e) => setDistractions(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Save Session
          </button>

        </form>

      </div>
    </div>
  );
}

export default StudySession;