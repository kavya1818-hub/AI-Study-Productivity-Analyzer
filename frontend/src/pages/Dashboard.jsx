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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white">

        <div>
          <h1 className="text-5xl font-bold">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-blue-100 mt-2 text-lg">
            Track your productivity and improve your study habits.
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow"
        >
          Logout
        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <h3 className="font-semibold text-gray-500">
            📚 Total Study Hours
          </h3>

          <p className="text-3xl font-bold mt-2">
            {totalHours}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-500">
           ⚡ Productivity Score
          </h3>

          <p className="text-3xl font-bold mt-2">
            {productivityScore}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-500">
           🔥 Current Streak
          </h3>

          <p className="text-3xl font-bold mt-2">
            {streak}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-500">
            📖 Study Sessions
          </h3>

          <p className="text-5xl font-extrabold text-blue-600 mt-3">
            {totalSessions}
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <Link to="/study-session">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition-all duration-300">
              Start Study Session
            </button>
          </Link>

          <Link to="/analytics">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition-all duration-300">
              View Analytics
            </button>
          </Link>

          <Link to="/goals">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow transition-all duration-300">
              Set Goal
            </button>
          </Link>

        </div>

      </div>

      {/* Latest Session */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Latest Session
        </h2>

        {latestSession ? (
<div className="grid md:grid-cols-2 gap-5">

  <div className="bg-blue-50 rounded-xl p-4">
    <p className="text-gray-500">📘 Subject</p>
    <h3 className="text-2xl font-bold text-blue-600">
      {latestSession.subject}
    </h3>
  </div>

  <div className="bg-green-50 rounded-xl p-4">
    <p className="text-gray-500">⏱ Duration</p>
    <h3 className="text-2xl font-bold text-green-600">
      {latestSession.duration} Hours
    </h3>
  </div>

  <div className="bg-yellow-50 rounded-xl p-4">
    <p className="text-gray-500">🎯 Focus</p>
    <h3 className="text-2xl font-bold text-yellow-600">
      {latestSession.focus}/10
    </h3>
  </div>

  <div className="bg-purple-50 rounded-xl p-4">
    <p className="text-gray-500">📅 Date</p>
    <h3 className="text-2xl font-bold text-purple-600">
      {latestSession.date}
    </h3>
  </div>

</div>
        ) : (
          <p>No sessions recorded.</p>
        )}

      </div>

      {/* Goal Progress */}
<div className="bg-white p-8 rounded-2xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Goal Progress
        </h2>

        <p className="mb-3">
          Goal: {goal} Hours
        </p>

        <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">

          <div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-8 rounded-full flex items-center justify-center text-white font-bold"
            style={{
              width: `${goalProgress}%`,
            }}
          >
            {goalProgress}%
          </div>

        </div>

      </div>

      {/* AI Insights */}
      
<div className="bg-white p-8 rounded-2xl shadow-lg mb-8">

  <h2 className="text-2xl font-bold mb-6">
    AI Insights
  </h2>

  {totalSessions === 0 ? (

    <p className="text-gray-500">
      Start studying to unlock AI recommendations.
    </p>

  ) : (

    <div className="grid md:grid-cols-2 gap-5">

      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-5">
        <h3 className="font-semibold text-blue-700">
          📚 Study Time
        </h3>

        <p className="text-2xl font-bold mt-2">
          {totalHours} Hours
        </p>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-5">
        <h3 className="font-semibold text-green-700">
          ✅ Sessions Completed
        </h3>

        <p className="text-2xl font-bold mt-2">
          {totalSessions}
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-5">
        <h3 className="font-semibold text-yellow-700">
          ⚡ Productivity Score
        </h3>

        <p className="text-2xl font-bold mt-2">
          {productivityScore}%
        </p>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-xl p-5">
        <h3 className="font-semibold text-purple-700">
          🎯 Goal Progress
        </h3>

        <p className="text-2xl font-bold mt-2">
          {goalProgress}%
        </p>
      </div>

      <div className="md:col-span-2 bg-gray-50 border-l-4 border-indigo-500 rounded-xl p-5">

        <h3 className="font-semibold text-indigo-700 mb-3">
          💡 AI Recommendation
        </h3>

        <p className="text-gray-700 leading-7">

          {productivityScore >= 80
            ? "Excellent work! Your study consistency is outstanding. Keep following the same schedule to maintain high productivity."

            : productivityScore >= 60
            ? "Good progress! Try reducing distractions and increasing your focus level to improve productivity."

            : "Your productivity is currently below average. Study in shorter focused sessions, avoid distractions, and follow a daily timetable."}

        </p>

      </div>

    </div>

  )}

</div>
{/* Achievements */}
<div className="bg-white p-8 rounded-2xl shadow-lg mt-8">

  <h2 className="text-2xl font-bold mb-6">
    🏆 Achievements
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    <div
      className={`rounded-xl p-5 text-center shadow ${
        totalSessions >= 1
          ? "bg-green-100"
          : "bg-gray-100"
      }`}
    >
      <div className="text-5xl mb-2">🎉</div>

      <h3 className="font-bold">
        First Session
      </h3>
      <p className="text-sm text-gray-600">
        Complete your first study session.
      </p>
      <p className="mt-3 font-bold text-green-600">
        {totalSessions >= 1 ? "✅ Unlocked" : "🔒 Locked"}
      </p>
    </div>

    <div
      className={`rounded-xl p-5 text-center shadow ${
        totalHours >= 10
          ? "bg-yellow-100"
          : "bg-gray-100"
      }`}
    >
      <div className="text-5xl mb-2">⏰</div>

      <h3 className="font-bold">
        10 Study Hours
      </h3>
      <p className="text-sm text-gray-600">
        Study for at least 10 hours.
      </p>
      <p className="mt-3 font-bold text-yellow-600">
        {totalHours >= 10 ? "✅ Unlocked" : "🔒 Locked"}
      </p>
    </div>

    <div
      className={`rounded-xl p-5 text-center shadow ${
        productivityScore >= 80
          ? "bg-blue-100"
          : "bg-gray-100"
      }`}
    >
      <div className="text-5xl mb-2">⚡</div>

      <h3 className="font-bold">
        Productivity Pro
      </h3>

      <p className="text-sm text-gray-600">
        Reach 80% productivity.
      </p>
      <p className="mt-3 font-bold text-blue-600">
        {productivityScore >= 80 ? "✅ Unlocked" : "🔒 Locked"}
      </p>
    </div>

    <div
      className={`rounded-xl p-5 text-center shadow ${
        goalProgress >= 100
          ? "bg-purple-100"
          : "bg-gray-100"
      }`}
    >
      <div className="text-5xl mb-2">🎯</div>

      <h3 className="font-bold">
        Goal Achiever
      </h3>
      <p className="mt-3 font-bold text-purple-600">
        {goalProgress >= 100 ? "✅ Unlocked" : "🔒 Locked"}
      </p>

      <p className="text-sm text-gray-600">
        Complete your study goal.
      </p>
    </div>

  </div>

</div>
</div>

);

}
export default Dashboard;