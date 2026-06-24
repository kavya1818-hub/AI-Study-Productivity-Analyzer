import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Goals() {
  const navigate = useNavigate();

  const [goal, setGoal] = useState("");
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    fetchGoal();
    fetchSessions();
  }, []);

  const fetchGoal = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await API.get(
      `/goal?email=${user.email}`
    );

    if (res.data.target) {
      setGoal(res.data.target);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchSessions = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await API.get(
      `/sessions?email=${user.email}`
    );

    const hours = res.data.reduce(
      (sum, session) =>
        sum + Number(session.duration),
      0
    );

    setTotalHours(hours);
  } catch (error) {
    console.log(error);
  }
};

  const goalProgress =
    goal > 0
      ? Math.min(
          100,
          Math.round((totalHours / goal) * 100)
        )
      : 0;

  const saveGoal = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    await API.post("/goal", {
      email: user.email,
      target: Number(goal),
    });

    alert("Goal Saved Successfully!");
    navigate("/dashboard");
  } catch (error) {
    alert("Failed to save goal");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">

        <h1 className="text-3xl font-bold mb-6">
          🎯 Study Goal Tracker
        </h1>

        <p className="text-gray-600 mb-6">
          Set your target study hours and
          track your progress.
        </p>

        <input
          type="number"
          placeholder="Enter Target Hours"
          value={goal}
          onChange={(e) =>
            setGoal(e.target.value)
          }
          className="w-full border p-3 rounded mb-6"
        />

        <div className="mb-6">

          <p className="mb-2">
            Current Study Hours: {totalHours}
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

        <button
          onClick={saveGoal}
          className="w-full bg-purple-600 text-white p-3 rounded"
        >
          Save Goal
        </button>

      </div>

    </div>
  );
}

export default Goals;