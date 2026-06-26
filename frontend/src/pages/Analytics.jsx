import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useState, useEffect } from "react";
import API from "../services/api";

function Analytics() {

  const [sessions, setSessions] = useState([]);
  const [goal, setGoal] = useState(0);
  const [editingSession, setEditingSession] = useState(null);
  const [editForm, setEditForm] = useState({
  subject: "",
  duration: "",
  focus: "",
  distractions: "",
  notes: "",
});
  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("LocalStorage User:", user);

    const sessionsRes = await API.get("/sessions", {
      params: {
        email: user?.email,
      },
    });

    console.log("Sessions Response:", sessionsRes);

    const goalRes = await API.get("/goal", {
      params: {
        email: user?.email,
      },
    });

    console.log("Goal Response:", goalRes);

    setSessions(sessionsRes.data);
    setGoal(goalRes.data.target || 0);
  } catch (err) {
    console.error("Analytics Error:", err);
  }
};

  const totalHours = sessions.reduce(
    (sum, session) => sum + Number(session.duration),
    0
  );

  const avgFocus =
    sessions.length > 0
      ? (
          sessions.reduce(
            (sum, session) => sum + Number(session.focus),
            0
          ) / sessions.length
        ).toFixed(1)
      : 0;

  const productivity =
    sessions.length > 0
      ? Math.round(
          sessions.reduce(
            (sum, session) =>
              sum +
              Number(session.duration) *
                Number(session.focus),
            0
          ) / sessions.length
        )
      : 0;

  const goalProgress =
    goal > 0
      ? Math.min(
          100,
          Math.round((totalHours / goal) * 100)
        )
      : 0;

  const subjectData = [];

  sessions.forEach((session) => {
    const existing = subjectData.find(
      (item) => item.subject === session.subject
    );

    if (existing) {
      existing.hours += Number(session.duration);
    } else {
      subjectData.push({
        subject: session.subject,
        hours: Number(session.duration),
      });
    }
  });

  const focusTrend = sessions.map(
    (session, index) => ({
      session: `S${index + 1}`,
      focus: Number(session.focus),
    })
  );
  const deleteSession = async (id) => {
  if (!window.confirm("Delete this session?")) return;

  try {
    await API.delete(`/sessions/${id}`);

    fetchData();

    alert("Session deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to delete session.");
  }
};

const editSession = (session) => {
  setEditingSession(session);
  setEditForm({
    subject: session.subject,
    duration: session.duration,
    focus: session.focus,
    distractions: session.distractions,
    notes: session.notes,
  });

};
const saveEditedSession = async () => {
  try {

    await API.put(
      `/sessions/${editingSession._id}`,
      editForm
    );

    alert("Session Updated!");

    setEditingSession(null);

    fetchData();

  } catch (error) {

    console.error(error);

    alert("Update Failed");

  }
};

const now = new Date();
const weeklyHours = sessions
  .filter((session) => {
    if (!session.date) return false;

    const parts = session.date.split("/");

    const d = new Date(
      parts[2],
      parts[1] - 1,
      parts[0]
    );

    const diff =
      (now - d) / (1000 * 60 * 60 * 24);

    return diff <= 7;
  })
  .reduce(
    (sum, session) =>
      sum + Number(session.duration),
    0
  );

const monthlyHours = sessions
  .filter((session) => {
    if (!session.date) return false;

    const parts = session.date.split("/");

    const d = new Date(
      parts[2],
      parts[1] - 1,
      parts[0]
    );

    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  })
  .reduce(
    (sum, session) =>
      sum + Number(session.duration),
    0
  );

const exportCSV = () => {
  const headers = [
    "Subject",
    "Hours",
    "Focus",
    "Distractions",
    "Date",
  ];

  const rows = sessions.map((session) => [
    session.subject,
    session.duration,
    session.focus,
    session.distractions,
    session.date,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "StudyAnalytics.csv";

  link.click();
};

const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Study Analytics Report", 14, 20);

  autoTable(doc, {
    startY: 30,

    head: [[
      "Subject",
      "Hours",
      "Focus",
      "Distractions",
      "Date",
    ]],

    body: sessions.map((session) => [
      session.subject,
      session.duration,
      session.focus,
      session.distractions,
      session.date,
    ]),
  });

  doc.save("StudyAnalytics.pdf");
};

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold">
    Study Analytics Dashboard
  </h1>

  <div className="flex gap-3">

    <button
      onClick={exportPDF}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl shadow"
    >
      Export PDF
    </button>

    <button
      onClick={exportCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow"
    >
      Export CSV
    </button>

  </div>

</div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">
            Total Sessions
          </h3>
          <p className="text-3xl font-bold mt-2">
            {sessions.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">
            Total Hours
          </h3>
          <p className="text-3xl font-bold mt-2">
            {totalHours}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">
            Average Focus
          </h3>
          <p className="text-3xl font-bold mt-2">
            {avgFocus}/10
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 font-semibold">
            Productivity
          </h3>
          <p className="text-3xl font-bold mt-2">
            {productivity}%
          </p>
        </div>

      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">

  <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-lg p-6">

    <h3 className="text-xl font-semibold">
      📅 Weekly Study Hours
    </h3>

    <p className="text-5xl font-bold mt-4">
      {weeklyHours}
    </p>

    <p className="mt-2 text-green-100">
      Hours studied in the last 7 days
    </p>

  </div>

  <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-2xl shadow-lg p-6">

    <h3 className="text-xl font-semibold">
      📈 Monthly Study Hours
    </h3>

    <p className="text-5xl font-bold mt-4">
      {monthlyHours}
    </p>

    <p className="mt-2 text-indigo-100">
      Hours studied this month
    </p>

  </div>

</div>
      {/* Goal Progress */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Goal Progress
        </h2>

        <p className="mb-2">
          Goal: {goal} Hours
        </p>

        <div className="w-full bg-gray-200 rounded-full h-6">

          <div
            className="bg-purple-600 h-6 rounded-full text-white text-center"
            style={{
              width: `${goalProgress}%`,
            }}
          >
            {goalProgress}%
          </div>

        </div>

      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Hours by Subject
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={subjectData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="hours"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Pie + Line Charts */}
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Subject Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>

              <Pie
                data={subjectData}
                dataKey="hours"
                nameKey="subject"
                outerRadius={120}
                label
              >
                {subjectData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Focus Trend
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={focusTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#10B981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Performance Insights
        </h2>

        <ul className="space-y-2">

          <li>
            📚 Total Study Time: {totalHours} Hours
          </li>

          <li>
            🎯 Average Focus Level: {avgFocus}/10
          </li>

          <li>
            📈 Productivity Score: {productivity}%
          </li>

          <li>
            {productivity >= 70
              ? "🔥 Excellent performance!"
              : productivity >= 50
              ? "✅ Good consistency."
              : "⚠️ Focus needs improvement."}
          </li>

        </ul>

      </div>

      {/* Session History Table */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Session History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-blue-600 text-white">

                <th className="p-3">
                  Subject
                </th>

                <th className="p-3">
                  Hours
                </th>

                <th className="p-3">
                  Focus
                </th>

                <th className="p-3">
                  Distractions
                </th>

                <th className="p-3">
                  Date
                </th>
                <th className="p-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {sessions.map((session, index) => (

                <tr
                  key={index}
                  className="border-b text-center hover:bg-gray-100"
                >

                  <td className="p-3">
                    {session.subject}
                  </td>

                  <td className="p-3">
                    {session.duration}
                  </td>

                  <td className="p-3">
                    {session.focus}/10
                  </td>

                  <td className="p-3">
                    {session.distractions}
                  </td>

                  <td className="p-3">
                    {session.date}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                      onClick={() => editSession(session)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                      onClick={() => deleteSession(session._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                        </button>
                      </div>
                      </td>
                    </tr>

              ))}
            </tbody>

          </table>

        </div>

      </div>
      {editingSession && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

    <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Edit Study Session
      </h2>

      <div className="space-y-4">

        <input
          className="w-full border p-3 rounded"
          placeholder="Subject"
          value={editForm.subject}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              subject: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="w-full border p-3 rounded"
          placeholder="Duration"
          value={editForm.duration}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              duration: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="w-full border p-3 rounded"
          placeholder="Focus"
          value={editForm.focus}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              focus: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="w-full border p-3 rounded"
          placeholder="Distractions"
          value={editForm.distractions}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              distractions: e.target.value,
            })
          }
        />

        <textarea
          className="w-full border p-3 rounded"
          placeholder="Notes"
          value={editForm.notes}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              notes: e.target.value,
            })
          }
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setEditingSession(null)}
          className="px-5 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>

        <button
          onClick={saveEditedSession}
          className="px-5 py-2 bg-blue-600 text-white rounded"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}

export default Analytics;