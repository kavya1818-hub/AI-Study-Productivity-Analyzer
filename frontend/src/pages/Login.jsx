import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email,
        })
      );

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:block relative">

        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
          alt="Study"
          className="w-full h-screen object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-16 text-white">

          <h1 className="text-6xl font-bold mb-4">
            StudyAI
          </h1>

          <p className="text-xl mb-10 max-w-lg">
            Smart Study Tracking, Learning Analytics,
            Goal Management and AI Productivity Insights.
          </p>

          <div className="space-y-5 text-lg">

            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <span>Track Study Sessions Efficiently</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <span>Visualize Learning Analytics</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <span>Achieve Your Study Goals</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <span>Get AI Productivity Insights</span>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center bg-slate-100">

        <div className="bg-white w-[500px] p-12 rounded-3xl shadow-2xl">

          <div className="text-center mb-8">

            <div className="text-6xl mb-4">
              🎓
            </div>

            <h2 className="text-4xl font-bold text-blue-600">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue your learning journey
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition duration-300"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;