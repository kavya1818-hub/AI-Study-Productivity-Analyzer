import { useEffect, useState } from "react";
import API from "../services/api";

function TestAPI() {
  const [message, setMessage] = useState("");
  const [sessions, setSessions] = useState([]);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const homeRes = await API.get("/");
      setMessage(homeRes.data.message);

      const sessionRes = await API.get("/sessions");
      setSessions(sessionRes.data);

      const goalRes = await API.get("/goal");
      setGoal(goalRes.data.target || 0);
    } catch (error) {
      console.error(error);
      setMessage("Backend Not Connected");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        {message}
      </h1>

      <div className="bg-gray-100 p-5 rounded mb-6">
        <h2 className="text-2xl font-bold mb-3">
          Goal
        </h2>

        <p>
          Target Hours: {goal}
        </p>
      </div>

      <div className="bg-gray-100 p-5 rounded">

        <h2 className="text-2xl font-bold mb-3">
          Sessions
        </h2>

        {sessions.length === 0 ? (
          <p>No Sessions Found</p>
        ) : (
          sessions.map((session) => (
            <div
              key={session._id}
              className="border p-3 mb-3 rounded bg-white"
            >
              <p>
                <strong>Subject:</strong>{" "}
                {session.subject}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {session.duration}
              </p>

              <p>
                <strong>Focus:</strong>{" "}
                {session.focus}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {session.date}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default TestAPI;