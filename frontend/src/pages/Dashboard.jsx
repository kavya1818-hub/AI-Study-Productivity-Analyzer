import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [sessions, setSessions] = useState([]);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  try {
    const sessionsRes = await API.get(
      `/sessions?email=${user.email}`
    );

    const goalRes = await API.get(
      `/goal?email=${user.email}`
    );

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

  const totalSessions = sessions.length;

  const productivityScore =
    totalSessions === 0
      ? 0
      : Math.round(
          sessions.reduce(
            (sum, session) =>
              sum +
              Number(session.duration) *
                Number(session.focus),
            0
          ) / totalSessions
        );

  const latestSession =
    totalSessions > 0
      ? sessions[sessions.length - 1]
      : null;

  const goalProgress =
    goal > 0
      ? Math.min(
          100,
          Math.round((totalHours / goal) * 100)
        )
      : 0;

  const streak =
    sessions.length === 0
      ? 0
      : sessions.length;

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Track your productivity and improve your study habits.
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-500">
            Total Study Hours
          </h3>

          <p className="text-3xl font-bold mt-2">
            {totalHours}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-500">
            Productivity Score
          </h3>

          <p className="text-3xl font-bold mt-2">
            {productivityScore}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-500">
            Current Streak
          </h3>

          <p className="text-3xl font-bold mt-2">
            {streak}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-500">
            Study Sessions
          </h3>

          <p className="text-3xl font-bold mt-2">
            {totalSessions}
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <Link to="/study-session">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
              Start Study Session
            </button>
          </Link>

          <Link to="/analytics">
            <button className="bg-green-600 text-white px-5 py-3 rounded-lg">
              View Analytics
            </button>
          </Link>

          <Link to="/goals">
            <button className="bg-purple-600 text-white px-5 py-3 rounded-lg">
              Set Goal
            </button>
          </Link>

        </div>

      </div>

      {/* Latest Session */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Latest Session
        </h2>

        {latestSession ? (
          <div className="space-y-2">

            <p>
              <strong>Subject:</strong>{" "}
              {latestSession.subject}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {latestSession.duration} Hours
            </p>

            <p>
              <strong>Focus:</strong>{" "}
              {latestSession.focus}/10
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {latestSession.date}
            </p>

          </div>
        ) : (
          <p>No sessions recorded.</p>
        )}

      </div>

      {/* Goal Progress */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Goal Progress
        </h2>

        <p className="mb-3">
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

      {/* AI Insights */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          AI Insights
        </h2>

        {totalSessions === 0 ? (
          <p>
            Start studying to unlock AI recommendations.
          </p>
        ) : (
          <ul className="space-y-2">

            <li>
              📌 Total Study Time:
              {" "}
              {totalHours} Hours
            </li>

            <li>
              📌 Completed
              {" "}
              {totalSessions}
              {" "}
              Sessions
            </li>

            <li>
              📌 Productivity Score:
              {" "}
              {productivityScore}%
            </li>

            <li>
              {productivityScore >= 70
                ? "🔥 Excellent consistency!"
                : productivityScore >= 50
                ? "✅ Good progress. Stay focused."
                : "⚠️ Focus needs improvement."}
            </li>

            <li>
              🎯 Goal Completion:
              {" "}
              {goalProgress}%
            </li>

          </ul>
        )}

      </div>

    </div>
  );
}

export default Dashboard;