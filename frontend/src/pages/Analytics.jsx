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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const sessionsRes = await API.get("/sessions");
      const goalRes = await API.get("/goal");

      setSessions(sessionsRes.data);
      setGoal(goalRes.data.target || 0);
    } catch (error) {
      console.error(error);
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

      <h1 className="text-4xl font-bold mb-8">
        Study Analytics Dashboard
      </h1>

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

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Analytics;